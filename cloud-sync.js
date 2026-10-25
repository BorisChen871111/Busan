(function(){
  const VERSION='13.1.0',BASE=`https://www.gstatic.com/firebasejs/${VERSION}`;
  let api=null,auth=null,db=null,user=null,unsubscribe=null,receive=()=>{},report=()=>{},getLocal=()=>null,pushTimer=null,ready=false;
  let sharing={ownerUid:'',ownerEmail:'',members:[]};
  const snapshot=value=>JSON.parse(JSON.stringify(value));
  const packState=value=>JSON.stringify(snapshot(value));
  function unpackState(data){
    if(typeof data?.stateJson==='string'){try{return JSON.parse(data.stateJson)}catch{return null}}
    return data?.state?snapshot(data.state):null;
  }
  function emit(state,detail=''){report({state,detail,user:user?{name:user.displayName||'',email:user.email||''}:null,configured:!!window.BUSAN_SYNC_CONFIG,sharing:{...sharing,isOwner:!!user&&sharing.ownerUid===user.uid}})}
  async function init(options){
    receive=options.receive;report=options.report;getLocal=options.getLocal;
    const config=window.BUSAN_SYNC_CONFIG;
    if(!config){emit('unconfigured','需要先加入 Firebase 專案設定');return}
    try{
      emit('loading','正在載入同步服務');
      const [appMod,authMod,storeMod]=await Promise.all([import(`${BASE}/firebase-app.js`),import(`${BASE}/firebase-auth.js`),import(`${BASE}/firebase-firestore.js`)]);
      const app=appMod.initializeApp(config);auth=authMod.getAuth(app);db=storeMod.getFirestore(app);api={...authMod,...storeMod};ready=true;
      await authMod.setPersistence(auth,authMod.browserLocalPersistence);
      let redirectError=null;try{await authMod.getRedirectResult(auth)}catch(error){redirectError=error}
      authMod.onAuthStateChanged(auth,next=>{user=next;if(unsubscribe){unsubscribe();unsubscribe=null}sharing={ownerUid:'',ownerEmail:'',members:[]};if(!user){emit('signed-out','登入後才會跨裝置同步');return}watch()});
      if(redirectError)emit('error',friendly(redirectError));
    }catch(error){emit('error',friendly(error))}
  }
  function ref(){return api.doc(db,'trips','busan-2026')}
  function legacyRef(){return api.doc(db,'users',user.uid,'trips','busan-2026')}
  function setSharing(data){sharing={ownerUid:data.ownerUid||'',ownerEmail:data.ownerEmail||'',members:Array.isArray(data.members)?data.members:[]}}
  function watch(){
    emit('syncing','正在比對雲端資料');let first=true;
    unsubscribe=api.onSnapshot(ref(),async snap=>{
      if(!snap.exists()){
        if(first){first=false;try{const old=await api.getDoc(legacyRef()),legacy=old.exists()?old.data():null,legacyState=unpackState(legacy),local=getLocal();if(legacyState&&Number(legacy.updatedAt||legacyState.updatedAt||0)>Number(local.updatedAt||0))receive(legacyState)}catch{}await pushNow()}
        return;
      }
      first=false;const remote=snap.data(),remoteState=unpackState(remote),local=getLocal();setSharing(remote);
      // A newly invited device always starts from the shared cloud copy. The
      // owner keeps timestamp comparison so the original latest local plan can
      // seed or recover the shared trip without being replaced.
      if(remoteState&&sharing.ownerUid!==user.uid)receive(remoteState);
      else if(remoteState&&Number(remote.updatedAt||0)>Number(local.updatedAt||0))receive(remoteState);
      else if(Number(local.updatedAt||0)>Number(remote.updatedAt||0))await pushNow();
      emit('synced',`已自動同步 · ${new Date(Number(remote.updatedAt||Date.now())).toLocaleString('zh-TW')}`);
    },error=>emit('error',friendly(error)));
  }
  async function signIn(){
    if(!ready){emit('error','Firebase 尚未設定完成');return}
    const provider=new api.GoogleAuthProvider();
    try{await api.signInWithPopup(auth,provider)}catch(error){
      if(String(error?.code||'').includes('popup-blocked')){try{await api.signInWithRedirect(auth,provider)}catch(redirectError){emit('error',friendly(redirectError))}return}
      emit('error',friendly(error));
    }
  }
  async function signOutUser(){if(auth)await api.signOut(auth)}
  function retry(){
    if(!user||!ready)return;
    if(unsubscribe){unsubscribe();unsubscribe=null}
    sharing={ownerUid:'',ownerEmail:'',members:[]};watch();
  }
  function queue(){if(!user||!ready)return;clearTimeout(pushTimer);pushTimer=setTimeout(pushNow,700)}
  async function pushNow(){
    if(!user||!ready)return;
    try{
      const state=snapshot(getLocal()),stateJson=packState(state),ownerUid=sharing.ownerUid||user.uid,ownerEmail=sharing.ownerEmail||user.email,members=sharing.members.length?sharing.members:[user.email];
      await api.setDoc(ref(),{stateJson,updatedAt:Number(state.updatedAt||Date.now()),ownerUid,ownerEmail,members});setSharing({ownerUid,ownerEmail,members});emit('synced',`已自動同步 · ${new Date().toLocaleString('zh-TW')}`);
    }catch(error){emit('error',friendly(error))}
  }
  async function addMember(email){
    const value=String(email||'').trim().toLowerCase();if(!user||sharing.ownerUid!==user.uid)throw Error('owner-only');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))throw Error('invalid-email');
    try{await api.updateDoc(ref(),{members:api.arrayUnion(value)});emit('syncing','正在加入共享帳號')}catch(error){emit('error',friendly(error));throw error}
  }
  async function removeMember(email){
    const value=String(email||'').trim().toLowerCase();if(!user||sharing.ownerUid!==user.uid||value===sharing.ownerEmail)return;
    try{await api.updateDoc(ref(),{members:api.arrayRemove(value)});emit('syncing','正在移除共享帳號')}catch(error){emit('error',friendly(error))}
  }
  function friendly(error){
    const code=error?.code||'';
    if(code.includes('popup-closed'))return '登入視窗已關閉，請再按一次登入。';
    if(code.includes('invalid-argument'))return 'Firestore 不接受舊版資料格式，請重新整理網站後再試。';
    if(code.includes('permission-denied'))return 'Firestore 拒絕存取：請發布最新版 Rules；新帳號需先由擁有者加入 Email。';
    if(code.includes('failed-precondition'))return 'Firestore 尚未完成建立，請稍候再試。';
    if(code.includes('unauthorized-domain'))return 'Firebase 尚未授權 borischen871111.github.io 網域。';
    if(code.includes('unavailable'))return '目前網路無法連到 Firebase，恢復連線後會再同步。';
    return `同步失敗${code?`（${code}）`:''}，請檢查 Firebase 設定。`;
  }
  window.CloudSync={init,signIn,signOut:signOutUser,queue,pushNow,retry,addMember,removeMember,get configured(){return !!window.BUSAN_SYNC_CONFIG}};
})();
