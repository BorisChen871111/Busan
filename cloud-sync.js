(function(){
  const VERSION='13.1.0', BASE=`https://www.gstatic.com/firebasejs/${VERSION}`;
  let api=null,auth=null,db=null,user=null,unsubscribe=null,receive=()=>{},report=()=>{},getLocal=()=>null,pushTimer=null,ready=false;
  const snapshot=s=>JSON.parse(JSON.stringify(s));
  function emit(state,detail=''){report({state,detail,user:user?{name:user.displayName||'',email:user.email||''}:null,configured:!!window.BUSAN_SYNC_CONFIG})}
  async function init(options){
    receive=options.receive;report=options.report;getLocal=options.getLocal;
    const config=window.BUSAN_SYNC_CONFIG;
    if(!config){emit('unconfigured','需要先加入 Firebase 專案設定');return}
    try{
      emit('loading','正在載入同步服務');
      const [appMod,authMod,storeMod]=await Promise.all([import(`${BASE}/firebase-app.js`),import(`${BASE}/firebase-auth.js`),import(`${BASE}/firebase-firestore.js`)]);
      const app=appMod.initializeApp(config);auth=authMod.getAuth(app);db=storeMod.getFirestore(app);
      api={...authMod,...storeMod};ready=true;
      authMod.onAuthStateChanged(auth,next=>{user=next;if(unsubscribe){unsubscribe();unsubscribe=null}if(!user){emit('signed-out','登入後才會跨裝置同步');return}watch()});
    }catch(error){emit('error',friendly(error))}
  }
  function ref(){return api.doc(db,'users',user.uid,'trips','busan-2026')}
  function watch(){
    emit('syncing','正在比對雲端資料');
    let first=true;
    unsubscribe=api.onSnapshot(ref(),async snap=>{
      if(!snap.exists()){if(first){first=false;await pushNow()}return}
      first=false;const remote=snap.data(),local=getLocal();
      if(remote.state&&Number(remote.updatedAt||0)>Number(local.updatedAt||0))receive(snapshot(remote.state));
      else if(Number(local.updatedAt||0)>Number(remote.updatedAt||0))await pushNow();
      emit('synced',`已同步 · ${new Date(Number(remote.updatedAt||Date.now())).toLocaleString('zh-TW')}`);
    },error=>emit('error',friendly(error)));
  }
  async function signIn(){if(!ready){emit('error','Firebase 尚未設定完成');return}try{await api.signInWithPopup(auth,new api.GoogleAuthProvider())}catch(error){emit('error',friendly(error))}}
  async function signOutUser(){if(auth)await api.signOut(auth)}
  function queue(){if(!user||!ready)return;clearTimeout(pushTimer);pushTimer=setTimeout(pushNow,700)}
  async function pushNow(){if(!user||!ready)return;try{const state=snapshot(getLocal());await api.setDoc(ref(),{state,updatedAt:Number(state.updatedAt||Date.now())});emit('synced',`已同步 · ${new Date().toLocaleString('zh-TW')}`)}catch(error){emit('error',friendly(error))}}
  function friendly(error){const code=error?.code||'';if(code.includes('popup-closed'))return '登入視窗已關閉';if(code.includes('permission-denied'))return 'Firestore 規則尚未正確設定';return '同步失敗，請檢查網路與 Firebase 設定'}
  window.CloudSync={init,signIn,signOut:signOutUser,queue,pushNow,get configured(){return !!window.BUSAN_SYNC_CONFIG}};
})();

