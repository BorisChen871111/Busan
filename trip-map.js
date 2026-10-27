const MAP_REGIONS=['廣安里','海雲台','青沙浦','西面／田浦','南浦／中央洞','影島','金海機場','機張／奧西利亞','松亭','松島','沙上','大淵／慶星大','機張北側','昌原・市外'];
const MAP_COLORS={'景點':'#527d98','咖啡廳':'#986d45','購物':'#627e68','餐廳':'#ad6350','蛋糕':'#946383','拍貼':'#77709d','住宿參考':'#526d82'};
let mapCategory='',mapRegion='廣安里',mapSearch='',selectedPlace='';
function mapMatches(p){return (!mapCategory||p.category===mapCategory)&&(!mapRegion||p.region===mapRegion)&&(!mapSearch||[p.name,p.address,p.note,p.id,p.region].join(' ').toLowerCase().includes(mapSearch.toLowerCase()))}
function tripMap(){document.body.classList.add('mobile-map-view');$('#content').innerHTML=`<section class="phone-map"><div class="map-heading"><span class="eyebrow">BUSAN / POCKET MAP</span><h2>我的釜山地圖</h2><p>看真實街道與海岸，找到下一站。</p></div><div id="map-mode-content"></div></section>`;renderMapMode()}
function renderMapMode(){
 if(coastalMap){coastalMap.remove();coastalMap=null;}
 $('#map-mode-content').innerHTML=`<div class="map-browse-layout"><section class="area-overview"><div class="map-filters"><label>選擇區域<select id="map-region" aria-label="地圖區域"><option value="">全部收藏（${PLACES.length} 筆）</option>${MAP_REGIONS.map(r=>`<option ${mapRegion===r?'selected':''}>${r}</option>`).join('')}</select></label><label>地點分類<select id="map-category" aria-label="地圖分類"><option value="">全部類別</option>${Object.keys(MAP_COLORS).map(c=>`<option ${c===mapCategory?'selected':''}>${c}</option>`).join('')}</select></label></div><div class="real-map-shell"><div class="real-map-bar"><span class="map-live-dot"></span><strong>我的釜山收藏</strong><button id="show-map-area">顯示這區全部</button></div><div id="real-map" role="region" aria-label="釜山收藏互動地圖"></div><div class="real-map-footer"><span id="real-map-label" role="status"></span></div></div><p class="map-caption">點圓圈展開附近收藏，點標記看店名。雙指縮放；導航用 Naver。</p><div class="map-legend">${Object.entries(MAP_COLORS).map(([k,v])=>`<span><i style="background:${v}"></i>${k}</span>`).join('')}</div><div class="stay-note">住宿周邊：All Sunday 廣安店附近<br><small>H01 是貝果店參考點，非 Airbnb 門牌。</small></div><p id="tile-status" class="map-caption" role="status"></p></section><section class="area-results"><div class="place-tools"><label for="map-search">找店名或地址</label><input type="search" id="map-search" aria-label="搜尋地圖收藏" placeholder="搜尋全部收藏，例如 LIBERTA" value="${esc(mapSearch)}"></div><h3 id="map-count" tabindex="-1"></h3><div id="map-directory"></div></section></div><details class="map-sources"><summary>查看六份原始 Naver 清單</summary>${COLLECTIONS.map(c=>external(c.url,`${c.label} · ${c.count} 筆`)).join('')}</details>`;
 paintMap();updateRealMap();
}
function paintMap(){const places=PLACES.filter(mapMatches);$('#map-count').textContent=`${mapRegion||'全部區域'} · ${places.length} 個地點`;$('#map-directory').innerHTML=places.length?places.map(p=>`<article class="phone-place ${selectedPlace===p.id?'expanded':''}"><button class="place-expand" data-place="${p.id}" aria-expanded="${selectedPlace===p.id}"><span class="category-mark" style="color:${MAP_COLORS[p.category]}">${p.category} · ${p.id}</span><strong>${esc(p.name)}</strong><span class="place-sub">${esc(p.region)}<span>${selectedPlace===p.id?'收起 −':'在地圖查看 ＋'}</span></span></button>${selectedPlace===p.id?'<div id="map-detail" class="inline-place-detail"></div>':`<div class="quick-map">${external(p.url||map(p.address),'Naver 地圖')}</div>`}</article>`).join(''):'<p class="empty">沒有符合的地點，請換個關鍵字或分類。</p>';if(selectedPlace){const p=places.find(p=>p.id===selectedPlace);if(p)placeDetail(p)}}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.mapRegion){mapRegion=b.dataset.mapRegion;mapSearch='';selectedPlace='';renderMapMode();$('#map-count').focus({preventScroll:true})}if(b.id==='show-map-area'){selectedPlace='';paintMap();updateRealMap()}if(b.dataset.place){selectedPlace=selectedPlace===b.dataset.place?'':b.dataset.place;paintMap();focusSavedPlace(selectedPlace);}});
document.addEventListener('input',e=>{if(e.target.id==='map-search'){mapSearch=e.target.value;if(mapSearch){mapRegion='';$('#map-region').value='';document.querySelectorAll('.area-pin').forEach(p=>{p.classList.remove('chosen');p.setAttribute('aria-pressed','false')})}selectedPlace='';paintMap();updateRealMap()}});
document.addEventListener('change',e=>{if(e.target.id==='map-category'){mapCategory=e.target.value;selectedPlace='';paintMap();updateRealMap()}if(e.target.id==='map-region'){mapRegion=e.target.value;mapSearch='';selectedPlace='';renderMapMode()}});
function placeDetail(p){if(!p)return;$('#map-detail').innerHTML=`<span class="tag">${esc(p.id)} · ${esc(p.category)}</span><h3>${esc(p.name)}</h3><p>${esc(p.address)}</p>${p.note?`<div class="notice">${esc(p.note)}</div>`:''}${external(p.url||map(p.address),'開啟 Naver 地點／地址')}<p class="map-help">地址按收藏清單保留；地址搜尋仍請核對店名與入口。</p>${external(p.source,'查看原收藏清單')}`}


let coastalMap=null,coastalCluster=null,coastalMarkers=new Map();
const COASTAL_TILE_URL='https://tile.openstreetmap.org/{z}/{x}/{y}.png';
function updateRealMap(){
 const host=$('#real-map');if(!host)return;
 if(typeof L==='undefined'){host.innerHTML='<p class="notice">地圖元件未載入，請重新整理。下方收藏與 Naver 連結仍可使用。</p>';return}
 if(!coastalMap){
  coastalMap=L.map(host,{scrollWheelZoom:false,zoomControl:false,minZoom:6,maxZoom:19}).setView([35.154,129.12],14);
  L.control.zoom({position:'bottomright',zoomInTitle:'放大',zoomOutTitle:'縮小'}).addTo(coastalMap);
  const tiles=L.tileLayer(COASTAL_TILE_URL,{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'}).addTo(coastalMap);
  tiles.on('tileerror',()=>{const hint=$('#tile-status');if(hint)hint.textContent='底圖暫時未載入，請確認網路或稍後重整。收藏清單與 Naver 連結仍可使用。'});
  coastalCluster=L.markerClusterGroup({maxClusterRadius:42,showCoverageOnHover:false,spiderfyOnMaxZoom:true,zoomToBoundsOnClick:true,iconCreateFunction:c=>L.divIcon({html:`<span>${c.getChildCount()}</span>`,className:'coast-cluster',iconSize:[44,44]})}).addTo(coastalMap);
 }
 coastalCluster.clearLayers();coastalMarkers.clear();
 const visible=PLACES.filter(mapMatches),located=visible.filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng));
 located.forEach(p=>{
  const icon=L.divIcon({className:'coast-pin',html:`<span style="--pin:${MAP_COLORS[p.category]}">${esc(p.id)}</span>`,iconSize:[44,44],iconAnchor:[22,36],popupAnchor:[0,-30]});
  const marker=L.marker([p.lat,p.lng],{icon,title:p.name,alt:p.name,keyboard:true});
  marker.bindPopup(`<div class="saved-map-popup"><span class="tag">${esc(p.category)} · ${esc(p.id)}</span><h3>${esc(p.name)}</h3><p>${esc(p.address)}</p>${p.id==='H01'?'<p>住宿周邊參考，非 Airbnb 門牌。</p>':''}${external(p.url||map(p.address),'在 Naver 查看／導航')}</div>`,{maxWidth:265,minWidth:180});
  marker.on('click',()=>{selectedPlace=p.id;paintMap();$('#real-map-label').textContent=p.name});
  coastalMarkers.set(p.id,marker);coastalCluster.addLayer(marker);
 });
 $('#real-map-label').textContent=`${mapRegion||'全部區域'} · ${located.length} 個收藏標記${visible.length>located.length?'（另有未定位地點）':''}`;
 if(located.length)coastalMap.fitBounds(L.latLngBounds(located.map(p=>[p.lat,p.lng])),{padding:[32,32],maxZoom:16});
 else coastalMap.setView([35.154,129.12],12);
}
function focusSavedPlace(id){
 const marker=coastalMarkers.get(id);if(!marker)return;
 const p=PLACES.find(p=>p.id===id);$('#real-map-label').textContent=p.name;
 $('#real-map').scrollIntoView({block:'center',behavior:'smooth'});
 coastalCluster.zoomToShowLayer(marker,()=>marker.openPopup());
}
