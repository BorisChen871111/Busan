(function(){
  const FILE='assets/le-plage-guide.enc?v=20';
  let objectURLs=[];
  function clear(){objectURLs.forEach(URL.revokeObjectURL);objectURLs=[]}
  function decodeKey(value){
    const normalized=String(value||'').replace(/-/g,'+').replace(/_/g,'/');
    const padded=normalized+'='.repeat((4-normalized.length%4)%4),binary=atob(padded),bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
    return bytes;
  }
  function pageURL(base64,mime){
    const binary=atob(base64),bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
    const url=URL.createObjectURL(new Blob([bytes],{type:mime}));objectURLs.push(url);return url;
  }
  async function decrypt(value){
    const response=await fetch(FILE,{cache:'force-cache'});if(!response.ok)throw Error('download');
    const bytes=new Uint8Array(await response.arrayBuffer());
    if(bytes.length<33||new TextDecoder().decode(bytes.slice(0,4))!=='BPG1')throw Error('format');
    const nonce=bytes.slice(4,16),sealed=bytes.slice(16),key=await crypto.subtle.importKey('raw',decodeKey(value),{name:'AES-GCM'},false,['decrypt']);
    const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:nonce},key,sealed),data=JSON.parse(new TextDecoder().decode(plain));
    if(data.version!==1||!Array.isArray(data.pages)||data.pages.length!==9)throw Error('content');
    return data;
  }
  async function mount(value){
    const host=document.querySelector('#stay-guide-pages');if(!host)return;clear();
    host.innerHTML='<div class="guide-loading"><span></span><strong>正在安全載入住宿指南…</strong></div>';
    try{
      const data=await decrypt(value);if(!document.querySelector('#stay-guide-pages'))return;
      const urls=data.pages.map(page=>pageURL(page,data.mime||'image/jpeg'));
      host.innerHTML=urls.map((url,index)=>`<figure class="guide-page"><a href="${url}" target="_blank" rel="noopener" aria-label="放大查看住宿指南第 ${index+1} 頁"><img src="${url}" alt="Le plage 住宿指南第 ${index+1} 頁" loading="${index<2?'eager':'lazy'}"></a><figcaption>${String(index+1).padStart(2,'0')} / ${String(urls.length).padStart(2,'0')} · 點一下可放大</figcaption></figure>`).join('');
    }catch(error){
      host.innerHTML='<div class="notice"><strong>住宿指南目前無法解密。</strong><br>請重新連線；若仍無法查看，請由擁有者重新設定指南金鑰。</div>';
    }
  }
  window.StayGuide={mount,clear};
})();
