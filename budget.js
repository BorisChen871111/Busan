/* Integer minor units avoid decimal rounding errors when adding expenses. */
const Budget = (()=>{
 const dates=['行前','11/08','11/09','11/10','11/11','11/12'];
 function amount(text,currency){if(!['KRW','TWD'].includes(currency))return null;const re=currency==='KRW'?/^\d{1,9}$/:/^\d{1,9}(\.\d{1,2})?$/;if(!re.test(String(text)))return null;const n=Math.round(Number(text)*(currency==='TWD'?100:1));return n>0&&Number.isSafeInteger(n)?n:null}
 function valid(rows){return Array.isArray(rows)&&rows.length<=1000&&rows.every(x=>x&&typeof x.name==='string'&&x.name.trim().length>0&&x.name.length<=100&&dates.includes(x.date)&&['KRW','TWD'].includes(x.currency)&&Number.isSafeInteger(x.minor)&&x.minor>0&&x.minor<=99999999999)}
 function totals(rows,date=''){return rows.filter(x=>!date||x.date===date).reduce((a,x)=>{a[x.currency]+=x.minor;return a},{KRW:0,TWD:0})}
 function format(n,c){return new Intl.NumberFormat('zh-TW',{style:'currency',currency:c,minimumFractionDigits:c==='KRW'?0:2,maximumFractionDigits:c==='KRW'?0:2}).format(n/(c==='TWD'?100:1))}
 return {dates,amount,valid,totals,format};
})();
if(typeof module!=='undefined')module.exports=Budget;
