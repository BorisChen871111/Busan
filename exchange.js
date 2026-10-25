const Exchange=(()=>{
  const KEY='busan-exchange-rate-v1';
  const API='https://open.er-api.com/v6/latest/TWD';
  function read(){
    try{const value=JSON.parse(localStorage.getItem(KEY));return valid(value)?value:null}catch{return null}
  }
  function valid(value){return value&&Number.isFinite(value.rate)&&value.rate>0&&Number.isFinite(value.updatedAt)&&Number.isFinite(value.nextUpdate)}
  async function latest(force=false){
    const cached=read(),now=Date.now();
    if(cached&&!force&&now<cached.nextUpdate)return {...cached,cached:true};
    try{
      const response=await fetch(API,{cache:'no-store'});if(!response.ok)throw Error(`HTTP ${response.status}`);
      const data=await response.json(),rate=Number(data?.rates?.KRW);
      if(data?.result!=='success'||!Number.isFinite(rate)||rate<=0)throw Error('invalid-rate');
      const value={rate,updatedAt:Number(data.time_last_update_unix)*1000,nextUpdate:Number(data.time_next_update_unix)*1000};
      localStorage.setItem(KEY,JSON.stringify(value));return {...value,cached:false};
    }catch(error){if(cached)return {...cached,cached:true,stale:true};throw error}
  }
  function twdToKrw(amount,rate){return Number(amount)*Number(rate)}
  function krwToTwd(amount,rate){return Number(amount)/Number(rate)}
  return {latest,read,twdToKrw,krwToTwd};
})();
if(typeof module!=='undefined')module.exports=Exchange;
