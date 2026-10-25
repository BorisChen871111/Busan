# 慢慢，釜山

無需建置、無外部套件的繁體中文手機友善行程網站。日期按最後需求設為 **2026/11/8–11/11**，住宿廣安里，11/10 領蛋糕；去程 11/8 07:40 桃園 T1 → 10:50 金海；回程 11/11 22:10 金海 → 11/12 00:25 桃園 T1。時間依訂單截圖，航空公司／航班號待補。

## GitHub Pages

1. 建立 GitHub repository，將此資料夾的 **內容** 上傳至 repository 根目錄（index.html 在最外層）。
2. Settings → Pages → Build and deployment → Deploy from a branch，選 main 與 /(root)，Save。
3. 發布後使用 Pages 提供的 https 網址，並確認 Enforce HTTPS。儲存庫網址不是網站網址。
4. 若上傳整個 busan-trip 子資料夾，網址需加 /busan-trip/。所有資源使用相對路徑，支援專案子路徑。
5. 手機開啟網站，匯入電腦匯出的 busan-backup.json。瀏覽器的資料不會同步回 repository。

網站已發布至 GitHub Pages；公開頁面本身不是私密資料庫。啟用 Firebase 後，個人資料由 Google 登入與 Firestore Rules 隔離。不要上傳護照、卡號、票券 QR 或私人備份。

## 修改與預覽

- `data.js`：每日時間、餐廳清單、官方來源。
- `app.js`：頁籤、備忘、連結編輯、搜尋、匯出匯入。
- `style.css`：桌面與手機排版。
- 本機於此資料夾執行 `python -m http.server 4173`，瀏覽 http://localhost:4173。
- `node --check app.js`、`node --check data.js`、`node --check sw.js` 可檢查語法。
- 地圖已加入原收藏座標；有 Naver place ID 的店家直連原地點，其餘使用地址搜尋。

## 離線與備份

HTTPS 或 localhost 下會安裝 Service Worker 快取。首次完整載入後重整，再以飛航模式測試四個頁籤。地圖和外站影片不能離線；票券另存手機。瀏覽器可能清除快取，不以離線快取取代備份。修改版本時更新 sw.js 的 CACHE 名稱。

匯入會確認後取代目前連結、備忘、記帳和勾選。舊版備份仍可匯入，記帳會設為空白。資料存在網站來源對應的 localStorage，改網域、瀏覽器、裝置或清除網站資料都不會保留，請先匯出。

## 行程假設

交通為規劃估值，未查實際即時班次；飯店確切地址待補。Luge／藍線未訂票，餐廳未預訂。蛋糕地址和 19:00 關門由使用者提供，需確認週二接單。官方來源與查核日期顯示於「行前與交通」。SES 資格／週日金海櫃台未證實，僅保留詢問與教學欄位。無人機秀、未確認限定香不列保證活動。

## 本次更新

### 行程編輯與跨裝置同步（2026-10-24）

「每日行程」可在手機或電腦直接編輯日期、標題、路線、提醒與每個時間點，也可新增、刪除及調整順序。既有 localStorage 會自動補入預設行程，JSON 備份現在包含行程資料。

時間點的地點欄位使用完整 http / https 連結。舊資料若仍保存 Naver 搜尋關鍵字，只在顯示時轉成可直接開啟的搜尋網址，不會重建或覆蓋使用者已儲存的行程。

跨裝置功能使用 Firebase Authentication（Google 登入）與 Cloud Firestore。網站可先維持本機模式；要啟用雲端同步：

1. 建立 Firebase 專案並註冊 Web app。
2. Authentication 啟用 Google 登入，Authorized domains 加入 borischen871111.github.io。
3. 建立 Cloud Firestore，將 firebase-rules.txt 內容發布為規則。規則允許登入者確認固定行程文件尚未建立，讓第一位登入者成為擁有者；文件建立後只有擁有者與受邀 Email 可以讀取。
4. 將 Firebase 主控台提供的 firebaseConfig 貼入 sync-config.js 的 window.BUSAN_SYNC_CONFIG。
5. 提交並推送後，在每台裝置使用同一 Google 帳號登入。

Firebase Web config 不是私密金鑰；Firestore Rules 才是存取控制。規則只允許共享行程的擁有者與受邀 Email 讀寫資料。不要將 service account、私鑰或其他伺服器密鑰加入 repository。

同步採 Firestore 即時監聽，每次本機變更延遲約 700ms 後自動寫入，不需要按手動同步。第一個建立共享行程的登入者為擁有者，可在「裝置同步」加入其他 Google Email；受邀帳號登入後共同讀寫 trips/busan-2026。受邀裝置首次連線會優先採用共享雲端內容；若裝置在受邀前已登入而被拒絕，可按「重新連線」重建監聽。完整行程以 JSON 字串存入 stateJson，避免 Standard edition 不支援陣列內再包含陣列。Firebase Console 必須發布 repository 內最新版 firebase-rules.txt，舊版 users/{uid}/trips 文件暫時保留供首次遷移。

新增 budget.js：花費新增／修改／刪除、按日篩選與 KRW／TWD 分別加總。金額採整數最小單位計算，避免小數誤差。執行 node budget.test.cjs 可驗證金額驗證與加總。

更新 GitHub 請覆蓋 index.html、style.css、data.js、app.js、sw.js，並新增 budget.js。先匯出本機備份，保持原網域與路徑可繼續讀取既有資料。重新整理載入新版本；手機離線請實機複驗。

交通建議按區域規劃，已匯入 Naver 收藏，Airbnb 精確門牌尚待提供；時間不是即時導航，沒有虛構 Uber 報價。

## 真實收藏地圖（2026-10-24）

使用 Leaflet + OpenStreetMap 底圖與網站自訂標記，沒有嵌入 Google 地圖。83 筆 Naver 收藏＋1 個住宿周邊參考，共 84 筆；座標來自使用者提供的六份公開 Naver 收藏資料，保存於 locations.js。新增兩個蛋糕收藏不變更 trove.cake 的取貨行程。

支援拖曳、雙指縮放、區域／類別篩選、跨區文字搜尋、群組展開、點標記彈出店名與地址，以及清單定位。相同座標的收藏會在放大後展開，原收藏編號保留。所有定位是收藏點，並非實地確認商店入口；H01 與 All Sunday 共用座標，Airbnb 精確地址仍待房東提供。

資料為此次匯入快照，之後修改 Naver 清單不會自動同步。新增兩個蛋糕收藏為 K02、K03，K01 維持 trove.cake。昌原拍貼收藏仍標示市外。

底圖需連網。使用瀏覽器正常 HTTP 快取，不預抓或離線下載地圖磚；保留 OpenStreetMap attribution。圖資使用政策：https://operations.osmfoundation.org/policies/tiles/ 。服務無可用性保證，底圖失敗時仍可查看收藏及 Naver 連結。COASTAL_TILE_URL 可切換服務來源。

vendor/ 內含 Leaflet 1.9.4 與 MarkerCluster 1.5.3，以及對應授權。上傳 GitHub 時請包含整個 vendor/、locations.js 及其餘網站檔案。localStorage key 不變；更新前仍建議匯出備份。

使用 HTTP 本機伺服器或 GitHub Pages HTTPS 預覽，不以 file:// 當正式地圖預覽（底圖請求須有正常來源資訊）。開啟 index.html#map 可直接進入地圖頁。手機寬度以 iframe 檢查；實體手機觸控仍需使用者複驗。
