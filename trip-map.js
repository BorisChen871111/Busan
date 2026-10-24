const MAP_REGIONS=['廣安里','海雲台','青沙浦','西面／田浦','南浦／中央洞','影島','金海機場','機張／奧西利亞','松亭','松島','沙上','大淵／慶星大','機張北側','昌原・市外'];
const MAP_COLORS={'景點':'#527d98','咖啡廳':'#986d45','購物':'#627e68','餐廳':'#ad6350','蛋糕':'#946383','拍貼':'#77709d','住宿參考':'#526d82'};
let mapCategory='',mapRegion='廣安里',mapSearch='',mapDay='0',selectedPlace='',mapMode='places';
function mapMatches(p){return (!mapCategory||p.category===mapCategory)&&(!mapRegion||p.region===mapRegion)&&(!mapSearch||[p.name,p.address,p.note,p.id,p.region].join(' ').toLowerCase().includes(mapSearch.toLowerCase()))}
function tripMap(){document.body.classList.add('mobile-map-view');$('#content').innerHTML=`<section class="phone-map"><div class="map-heading"><span class="eyebrow">BUSAN / POCKET MAP</span><h2>我的釜山地圖</h2><p>看真實街道與海岸，找到下一站。</p></div><div class="map-mode" aria-label="地圖模式"><button data-map-mode="places" aria-pressed="${mapMode==='places'}">真實地圖</button><button data-map-mode="routes" aria-pressed="${mapMode==='routes'}">每日交通</button></div><div id="map-mode-content"></div></section>`;renderMapMode()}
function renderMapMode(){
 if(coastalMap){coastalMap.remove();coastalMap=null;}
 document.querySelectorAll('[data-map-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mapMode===mapMode)));
 if(mapMode==='routes'){renderRoute();return}
 $('#map-mode-content').innerHTML=`<div class="map-browse-layout"><section class="area-overview"><div class="map-filters"><label>選擇區域<select id="map-region" aria-label="地圖區域"><option value="">全部收藏（${PLACES.length} 筆）</option>${MAP_REGIONS.map(r=>`<option ${mapRegion===r?'selected':''}>${r}</option>`).join('')}</select></label><label>地點分類<select id="map-category" aria-label="地圖分類"><option value="">全部類別</option>${Object.keys(MAP_COLORS).map(c=>`<option ${c===mapCategory?'selected':''}>${c}</option>`).join('')}</select></label></div><div class="real-map-shell"><div class="real-map-bar"><span class="map-live-dot"></span><strong>我的釜山收藏</strong><button id="show-map-area">顯示這區全部</button></div><div id="real-map" role="region" aria-label="釜山收藏互動地圖"></div><div class="real-map-footer"><span id="real-map-label" role="status"></span></div></div><p class="map-caption">點圓圈展開附近收藏，點標記看店名。雙指縮放；導航用 Naver。</p><div class="map-legend">${Object.entries(MAP_COLORS).map(([k,v])=>`<span><i style="background:${v}"></i>${k}</span>`).join('')}</div><div class="stay-note">住宿周邊：All Sunday 廣安店附近<br><small>H01 是貝果店參考點，非 Airbnb 門牌。</small></div><p id="tile-status" class="map-caption" role="status"></p></section><section class="area-results"><div class="place-tools"><label for="map-search">找店名或地址</label><input type="search" id="map-search" aria-label="搜尋地圖收藏" placeholder="搜尋全部收藏，例如 LIBERTA" value="${esc(mapSearch)}"></div><h3 id="map-count" tabindex="-1"></h3><div id="map-directory"></div></section></div><details class="map-sources"><summary>查看六份原始 Naver 清單</summary>${COLLECTIONS.map(c=>external(c.url,`${c.label} · ${c.count} 筆`)).join('')}</details>`;
 paintMap();updateRealMap();
}
function paintMap(){const places=PLACES.filter(mapMatches);$('#map-count').textContent=`${mapRegion||'全部區域'} · ${places.length} 個地點`;$('#map-directory').innerHTML=places.length?places.map(p=>`<article class="phone-place ${selectedPlace===p.id?'expanded':''}"><button class="place-expand" data-place="${p.id}" aria-expanded="${selectedPlace===p.id}"><span class="category-mark" style="color:${MAP_COLORS[p.category]}">${p.category} · ${p.id}</span><strong>${esc(p.name)}</strong><span class="place-sub">${esc(p.region)}<span>${selectedPlace===p.id?'收起 −':'在地圖查看 ＋'}</span></span></button>${selectedPlace===p.id?'<div id="map-detail" class="inline-place-detail"></div>':`<div class="quick-map">${external(p.url||map(p.address),'Naver 地圖')}</div>`}</article>`).join(''):'<p class="empty">沒有符合的地點，請換個關鍵字或分類。</p>';if(selectedPlace){const p=places.find(p=>p.id===selectedPlace);if(p)placeDetail(p)}}
function renderRoute(){const d=Number(mapDay),days=window.getTripDays?window.getTripDays():DAYS,x=days[d]||days[0];$('#map-mode-content').innerHTML=`<div class="route-day-picker">${days.map((x,i)=>`<button data-map-day="${i}" aria-pressed="${i===d}"><span>Day ${i+1}</span><strong>${x.date}</strong></button>`).join('')}</div><div class="phone-route-head"><h3>${x.title}</h3><p>${x.route}</p></div><ol class="phone-route">${(TRANSPORT[d]||[]).map((x,i)=>`<li><span class="route-step">${i+1}</span><div><span class="route-method">${x[1]}</span><h4>${x[0]}</h4><p>${x[2]}</p></div></li>`).join('')}</ol><div class="notice">時間為規劃估值；出發時再用 Naver 查班次、Uber 查車資。下車前記得索取收據。</div><button class="full-button" data-tab="plan">查看完整每日行程</button>`}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.mapMode){mapMode=b.dataset.mapMode;renderMapMode()}if(b.dataset.mapDay!==undefined){mapDay=b.dataset.mapDay;renderRoute()}if(b.dataset.mapRegion){mapRegion=b.dataset.mapRegion;mapSearch='';selectedPlace='';renderMapMode();$('#map-count').focus({preventScroll:true})}if(b.id==='show-map-area'){selectedPlace='';paintMap();updateRealMap()}if(b.dataset.place){selectedPlace=selectedPlace===b.dataset.place?'':b.dataset.place;paintMap();focusSavedPlace(selectedPlace);}});
document.addEventListener('input',e=>{if(e.target.id==='map-search'){mapSearch=e.target.value;if(mapSearch){mapRegion='';$('#map-region').value='';document.querySelectorAll('.area-pin').forEach(p=>{p.classList.remove('chosen');p.setAttribute('aria-pressed','false')})}selectedPlace='';paintMap();updateRealMap()}});
document.addEventListener('change',e=>{if(e.target.id==='map-category'){mapCategory=e.target.value;selectedPlace='';paintMap();updateRealMap()}if(e.target.id==='map-region'){mapRegion=e.target.value;mapSearch='';selectedPlace='';renderMapMode()}});
function placeDetail(p){if(!p)return;const tips={'金海機場':'抵達帶行李優先 Uber 到廣安里；回程地鐵 2 號線到沙上轉輕軌。','沙上':'機場輕軌與 2 號線轉乘區；83 沙上店只作轉乘順路候選。','西面／田浦':'Day 2 南浦搭 1 號線到西面，再步行串聯田浦；回廣安里搭 2 號線往萇山。','南浦／中央洞':'Day 2 白淺灘後搭 Uber 過橋；BIFF、富平與市場以步行串聯。','影島':'Day 2 建議 Uber 到白淺灘；中里海女村與文化展示館海女村是不同收藏，不當成同一地點。','廣安里':'住宿同區，短程優先步行。以你提供的廣安路61番街28號作周邊參考，Airbnb 門牌未確認。','海雲台':'Day 3 由廣安里 Uber 至尾浦，再串聯沙灘／海理團路；領蛋糕後直接 Uber 回住宿。','青沙浦':'Day 3 尾浦搭膠囊列車到青沙浦，咖啡店擇一；回程海岸列車，不把各家咖啡全排進同一餐。','松亭':'原行程未排，想搭列車延伸到松亭須刪減青沙浦停留，保留 16:45 領蛋糕。','機張／奧西利亞':'Day 4 Luge 優先 Uber 往返；Coralani 可替換附近午餐後休息，不另追加遠程咖啡。','機張北側':'Wave On 位於機張更北側，離 Luge 所在區域較遠，不排返程日；想去需另刪一段主行程。','大淵／慶星大':'位於 2 號線沿線，僅作順路候選；龍沼路拍貼收藏未提供店名。','松島':'此處只是收藏住宿點，不是本次飯店；松島天空步道可替換 Day 2 西面購物。','昌原・市外':'位於釜山市外，四天行程不安排專程跨城。'};
$('#map-detail').innerHTML=`<span class="tag">${esc(p.id)} · ${esc(p.category)}</span><h3>${esc(p.name)}</h3><p>${esc(p.address)}</p>${p.note?`<div class="notice">${esc(p.note)}</div>`:''}<p>${tips[p.region]||''}</p>${external(p.url||map(p.address),'開啟 Naver 地點／地址')}<p class="map-help">地址按收藏清單保留；地址搜尋仍請核對店名與入口。</p>${external(p.source,'查看原收藏清單')}`}



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
