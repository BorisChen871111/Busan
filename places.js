const COLLECTIONS = [{"label": "景點", "url": "https://naver.me/Fx2K8OBS", "count": 20}, {"label": "咖啡廳", "url": "https://naver.me/xCjpXNum", "count": 23}, {"label": "購物", "url": "https://naver.me/5p0coJTj", "count": 11}, {"label": "餐廳", "url": "https://naver.me/xuFZXLPa", "count": 18}, {"label": "蛋糕", "url": "https://naver.me/GmpchdSb", "count": 1}, {"label": "拍貼", "url": "https://naver.me/5VxqrIAw", "count": 8}];
const PLACES = [
  {
    "id": "S01",
    "name": "松島收藏住宿點（非本次住宿）",
    "category": "景點",
    "region": "松島",
    "address": "부산광역시 서구 송도해변로 97",
    "note": "只是收藏，非本次住宿；實際仍住廣安里。",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S02",
    "name": "新東亞市場",
    "category": "景點",
    "region": "南浦／中央洞",
    "address": "부산광역시 중구 남포동5가 92",
    "note": "",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S03",
    "name": "BIFF 廣場・地址收藏",
    "category": "景點",
    "region": "南浦／中央洞",
    "address": "부산광역시 중구 구덕로 58",
    "note": "BIFF 廣場",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S04",
    "name": "白淺灘文化村",
    "category": "景點",
    "region": "影島",
    "address": "부산광역시 영도구 영선동4가 605-3",
    "note": "白淺灘文化村",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S05",
    "name": "中里海女村",
    "category": "景點",
    "region": "影島",
    "address": "부산광역시 영도구 동삼동 640-14",
    "note": "",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S06",
    "name": "青沙浦天空步道",
    "category": "景點",
    "region": "青沙浦",
    "address": "부산광역시 해운대구 중동 산3-9",
    "note": "",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S07",
    "name": "Ocean Breeze・列車拍照點",
    "category": "景點",
    "region": "青沙浦",
    "address": "부산광역시 해운대구 중동 산34-3",
    "note": "",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S08",
    "name": "秀敏家・列車拍照點",
    "category": "景點",
    "region": "青沙浦",
    "address": "부산광역시 해운대구 중동 595-4",
    "note": "",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S09",
    "name": "釜山小鎌倉",
    "category": "景點",
    "region": "青沙浦",
    "address": "부산광역시 해운대구 중동 555-4",
    "note": "",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S10",
    "name": "青沙浦站",
    "category": "景點",
    "region": "青沙浦",
    "address": "부산광역시 해운대구 중동 555-2",
    "note": "",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S11",
    "name": "富平罐頭市場",
    "category": "景點",
    "region": "南浦／中央洞",
    "address": "부산광역시 중구 부평1길 48",
    "note": "",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S12",
    "name": "松亭站・海岸列車",
    "category": "景點",
    "region": "松亭",
    "address": "부산광역시 해운대구 송정중앙로8번길 60",
    "note": "松亭站（海岸列車）",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S13",
    "name": "海雲台海水浴場",
    "category": "景點",
    "region": "海雲台",
    "address": "부산광역시 해운대구 해운대해변로 264",
    "note": "海雲台海水浴場",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S14",
    "name": "尾浦站・膠囊上車",
    "category": "景點",
    "region": "海雲台",
    "address": "부산광역시 해운대구 달맞이길62번길 13",
    "note": "膠囊列車尾浦站（上車）",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S15",
    "name": "Money Box 西面換錢",
    "category": "景點",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 부전동 256-6 서면시장 1층 아2호",
    "note": "Money box換錢",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S16",
    "name": "老奶奶換錢所・나영환전소",
    "category": "景點",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 부전동 256-14",
    "note": "老奶奶換錢所",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S17",
    "name": "Skyline Luge 釜山",
    "category": "景點",
    "region": "機張／奧西利亞",
    "address": "부산광역시 기장군 기장읍 시랑리 산46",
    "note": "",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S18",
    "name": "BIFF 廣場・店家收藏",
    "category": "景點",
    "region": "南浦／中央洞",
    "address": "부산광역시 중구 남포동5가 83-2",
    "note": "",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S19",
    "name": "金海國際機場",
    "category": "景點",
    "region": "松島",
    "address": "부산광역시 강서구 대저2동 2350-1",
    "note": "",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "S20",
    "name": "廣安里海水浴場",
    "category": "景點",
    "region": "廣安里",
    "address": "부산광역시 수영구 광안동 192-20",
    "note": "",
    "source": "https://naver.me/Fx2K8OBS"
  },
  {
    "id": "C01",
    "name": "Go Slow・有拍貼機",
    "category": "咖啡廳",
    "region": "影島",
    "address": "부산광역시 영도구 영선동4가 1214",
    "note": "有拍貼機的咖啡廳",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C02",
    "name": "LAF 廣安里",
    "category": "咖啡廳",
    "region": "廣安里",
    "address": "부산광역시 수영구 민락동 185-6 2층",
    "note": "漂亮冰&蛋糕",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C03",
    "name": "Of One 蛋糕／咖啡",
    "category": "咖啡廳",
    "region": "海雲台",
    "address": "부산광역시 해운대구 중동 1037-2 2층",
    "note": "",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C04",
    "name": "Oozy 中央洞店",
    "category": "咖啡廳",
    "region": "南浦／中央洞",
    "address": "부산광역시 중구 중앙동5가 10-9 지상1층",
    "note": "❣️拿鐵",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C05",
    "name": "Oozy 西面站店",
    "category": "咖啡廳",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 부전동 257-13",
    "note": "❣️拿鐵",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C06",
    "name": "Mega 廣安路收藏",
    "category": "咖啡廳",
    "region": "廣安里",
    "address": "부산광역시 수영구 광안로45번길 2",
    "note": "",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C07",
    "name": "아게・影島咖啡",
    "category": "咖啡廳",
    "region": "影島",
    "address": "부산광역시 영도구 동삼동 1049-23 2, 3층",
    "note": "",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C08",
    "name": "Broni 青沙浦",
    "category": "咖啡廳",
    "region": "青沙浦",
    "address": "부산광역시 해운대구 중동 524-15 1, 2, 3층",
    "note": "",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C09",
    "name": "Coralani 機張",
    "category": "咖啡廳",
    "region": "機張／奧西利亞",
    "address": "부산광역시 기장군 기장읍 시랑리 615-1",
    "note": "",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C10",
    "name": "LIBERTA 青沙浦",
    "category": "咖啡廳",
    "region": "青沙浦",
    "address": "부산광역시 해운대구 중동 524-14 1, 2, 3층",
    "note": "❣️海景咖啡廳",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C11",
    "name": "Having Moment 影島",
    "category": "咖啡廳",
    "region": "影島",
    "address": "부산광역시 영도구 영선동4가 612 해빙모먼트",
    "note": "❣️黑芝麻拿鐵、巴斯克",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C12",
    "name": "Diart 青沙浦",
    "category": "咖啡廳",
    "region": "青沙浦",
    "address": "부산광역시 해운대구 중동 586 디아트커피",
    "note": "海雲台，Diart 麵包❣️土耳其蜂蜜奶油麵包",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C13",
    "name": "Working Holiday 海雲台",
    "category": "咖啡廳",
    "region": "海雲台",
    "address": "부산광역시 해운대구 중동 1412-7 5층",
    "note": "",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C14",
    "name": "Working Holiday 廣安里",
    "category": "咖啡廳",
    "region": "廣安里",
    "address": "부산광역시 수영구 민락동 179-3 3층 워킹홀리데이 (올리브영건물3층)",
    "note": "Working holiday早午餐 11/10",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C15",
    "name": "Mega 西面樂天店",
    "category": "咖啡廳",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 부전동 490-18",
    "note": "",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C16",
    "name": "Mega 田浦店",
    "category": "咖啡廳",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 전포동 345-1 1층",
    "note": "",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C17",
    "name": "All Sunday 廣安店",
    "category": "咖啡廳",
    "region": "廣安里",
    "address": "부산광역시 수영구 민락동 178-12 1층",
    "note": "All Sunday貝果",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C18",
    "name": "Wave On・機張北側",
    "category": "咖啡廳",
    "region": "機張北側",
    "address": "부산광역시 기장군 장안읍 월내리 553",
    "note": "機張郡❣️滿月冰咖啡，長安月內拿鐵，藍色海洋波浪蛋糕",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C19",
    "name": "La Feuille 廣安店",
    "category": "咖啡廳",
    "region": "廣安里",
    "address": "부산광역시 수영구 민락동 178-10 1~3층",
    "note": "杜拜巧克力麵包",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C20",
    "name": "Who’s Who Mumu",
    "category": "咖啡廳",
    "region": "海雲台",
    "address": "부산광역시 해운대구 중동 940-3 B1층",
    "note": "膠囊列車附近",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C21",
    "name": "Ancien 廣安里麵包",
    "category": "咖啡廳",
    "region": "廣安里",
    "address": "부산광역시 수영구 광안동 190-16 1층",
    "note": "廣安里❣️明太子、香蔥",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C22",
    "name": "自然島鹽麵包・廣安里",
    "category": "咖啡廳",
    "region": "廣安里",
    "address": "부산광역시 수영구 민락동 175-16 1층",
    "note": "自然島鹽麵包❣️廣安里分店",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "C23",
    "name": "Diart Larim 田浦",
    "category": "咖啡廳",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 전포동 337-11 4층 디아트커피 라림",
    "note": "田浦，Diart 麵包❣️土耳其蜂蜜奶油麵包",
    "source": "https://naver.me/xCjpXNum"
  },
  {
    "id": "B01",
    "name": "Hoduga 西面伴手禮",
    "category": "購物",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 부전동 502-2 1층 호두가",
    "note": "",
    "source": "https://naver.me/5p0coJTj"
  },
  {
    "id": "B02",
    "name": "樂天百貨釜山本店",
    "category": "購物",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 부전동 503-15",
    "note": "",
    "source": "https://naver.me/5p0coJTj"
  },
  {
    "id": "B03",
    "name": "Olens 廣安里",
    "category": "購物",
    "region": "廣安里",
    "address": "부산광역시 수영구 민락동 177-3 1층 106호",
    "note": "",
    "source": "https://naver.me/5p0coJTj"
  },
  {
    "id": "B04",
    "name": "Mad Dogs・旁邊是 Olive Young",
    "category": "購物",
    "region": "廣安里",
    "address": "부산광역시 수영구 민락동 179-3",
    "note": "原定位是 Mad Dogs 餐廳，備註為旁邊 Olive Young；不是已核對的 Olive Young 精確入口。",
    "source": "https://naver.me/5p0coJTj"
  },
  {
    "id": "B05",
    "name": "SCENTICA 廣安",
    "category": "購物",
    "region": "廣安里",
    "address": "부산광역시 수영구 광안동 150-53",
    "note": "Scentia 香水",
    "source": "https://naver.me/5p0coJTj"
  },
  {
    "id": "B06",
    "name": "SCENTICA 田浦",
    "category": "購物",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 전포동 686-3 1층",
    "note": "Scentia 香水",
    "source": "https://naver.me/5p0coJTj"
  },
  {
    "id": "B07",
    "name": "大創釜山西面店",
    "category": "購物",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 부전동 168-451 지하1층",
    "note": "",
    "source": "https://naver.me/5p0coJTj"
  },
  {
    "id": "B08",
    "name": "大創釜山海雲台店",
    "category": "購物",
    "region": "海雲台",
    "address": "부산광역시 해운대구 우동 618-7",
    "note": "",
    "source": "https://naver.me/5p0coJTj"
  },
  {
    "id": "B09",
    "name": "大創 Save Zone 海雲台店",
    "category": "購物",
    "region": "海雲台",
    "address": "부산광역시 해운대구 중동 1380-14",
    "note": "",
    "source": "https://naver.me/5p0coJTj"
  },
  {
    "id": "B10",
    "name": "Olive Young 海雲台站店",
    "category": "購物",
    "region": "海雲台",
    "address": "부산광역시 해운대구 우동 550-9",
    "note": "",
    "source": "https://naver.me/5p0coJTj"
  },
  {
    "id": "B11",
    "name": "Olive Young 海雲台中央店",
    "category": "購物",
    "region": "海雲台",
    "address": "부산광역시 해운대구 중동 1383-14",
    "note": "",
    "source": "https://naver.me/5p0coJTj"
  },
  {
    "id": "R01",
    "name": "烤肉的男人・南浦",
    "category": "餐廳",
    "region": "南浦／中央洞",
    "address": "부산광역시 중구 부평동2가 33-3 1층 고기굽는남자남포점",
    "note": "",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R02",
    "name": "烤肉的男人・西面",
    "category": "餐廳",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 부전동 168-367 1층 고기굽는남자",
    "note": "蘑菇拷芝士",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R03",
    "name": "影島海女村・文化展示館",
    "category": "餐廳",
    "region": "影島",
    "address": "부산광역시 영도구 동삼동 산65-1 영도해녀문화전시관 1층",
    "note": "",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R04",
    "name": "milgot 麵包",
    "category": "餐廳",
    "region": "南浦／中央洞",
    "address": "부산광역시 중구 부평동2가 72-2 1층",
    "note": "",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R05",
    "name": "尾浦家・廣安里直營",
    "category": "餐廳",
    "region": "廣安里",
    "address": "부산광역시 수영구 광안동 204-14 2층",
    "note": "",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R06",
    "name": "83 獬豸・沙上",
    "category": "餐廳",
    "region": "沙上",
    "address": "부산광역시 사상구 괘법동 536-6 1층",
    "note": "83 獬豸",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R07",
    "name": "83 獬豸・廣安里",
    "category": "餐廳",
    "region": "廣安里",
    "address": "부산광역시 수영구 민락동 34-7 1층",
    "note": "",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R08",
    "name": "83 獬豸・地址收藏",
    "category": "餐廳",
    "region": "廣安里",
    "address": "부산광역시 수영구 민락본동로19번길 59",
    "note": "83 獬豸",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R09",
    "name": "味贊王・富平",
    "category": "餐廳",
    "region": "南浦／中央洞",
    "address": "부산광역시 중구 부평동2가 56-2 1층 맛찬들 왕소금구이 부평점",
    "note": "",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R10",
    "name": "味贊王・大淵",
    "category": "餐廳",
    "region": "大淵／慶星大",
    "address": "부산광역시 남구 대연동 977-8 1층",
    "note": "",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R11",
    "name": "味贊王・西面",
    "category": "餐廳",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 부전동 516-51 맛찬들 왕소금구이 서면점",
    "note": "",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R12",
    "name": "돈소굿・西面韓牛",
    "category": "餐廳",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 부전동 514-5 1층(부전동)",
    "note": "韓牛燒肉",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R13",
    "name": "일신명품한우・富平韓牛",
    "category": "餐廳",
    "region": "南浦／中央洞",
    "address": "부산광역시 중구 부평동2가 74 일신명품한우",
    "note": "",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R14",
    "name": "螞蟻家・廣安里本店",
    "category": "餐廳",
    "region": "廣安里",
    "address": "부산광역시 수영구 광안동 194-7 1층 개미집",
    "note": "",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R15",
    "name": "水邊最高湯飯・海雲台",
    "category": "餐廳",
    "region": "海雲台",
    "address": "부산광역시 해운대구 중동 1392-35",
    "note": "",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R16",
    "name": "水邊最高湯飯・廣安",
    "category": "餐廳",
    "region": "廣安里",
    "address": "부산광역시 수영구 민락동 179-8",
    "note": "",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R17",
    "name": "烤肉的男人・廣安里",
    "category": "餐廳",
    "region": "廣安里",
    "address": "부산광역시 수영구 남천동 7-14 1층 고기굽는남자 광안리점",
    "note": "",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "R18",
    "name": "味贊王・海雲台",
    "category": "餐廳",
    "region": "海雲台",
    "address": "부산광역시 해운대구 우동 544-19 맛찬들왕소금구이 해운대점",
    "note": "",
    "source": "https://naver.me/xuFZXLPa"
  },
  {
    "id": "K01",
    "name": "trove.cake・客製化蛋糕",
    "category": "蛋糕",
    "region": "海雲台",
    "address": "부산광역시 해운대구 우동1로38번가길 19",
    "note": "",
    "source": "https://naver.me/GmpchdSb"
  },
  {
    "id": "P01",
    "name": "Hippiemond・隔壁是 picc",
    "category": "拍貼",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 전포동 677-15 1층",
    "note": "原定位是 Hippiemond 選物店，備註為隔壁 picc；不是拍貼店精確入口。",
    "source": "https://naver.me/5VxqrIAw"
  },
  {
    "id": "P02",
    "name": "Photolab Plus 田浦",
    "category": "拍貼",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 전포동 686-3 1층 포토랩플러스 전포점",
    "note": "",
    "source": "https://naver.me/5VxqrIAw"
  },
  {
    "id": "P03",
    "name": "Photolab Plus Library 廣安里",
    "category": "拍貼",
    "region": "廣安里",
    "address": "부산광역시 수영구 민락동 181-79",
    "note": "",
    "source": "https://naver.me/5VxqrIAw"
  },
  {
    "id": "P04",
    "name": "Stiikers 海雲台",
    "category": "拍貼",
    "region": "海雲台",
    "address": "부산광역시 해운대구 우동 539-10 1층 117호",
    "note": "",
    "source": "https://naver.me/5VxqrIAw"
  },
  {
    "id": "P05",
    "name": "Stiikers 昌原上南・釜山市外",
    "category": "拍貼",
    "region": "昌原・市外",
    "address": "경상남도 창원시 성산구 상남동 18-10 101호",
    "note": "位於昌原，不在釜山市內；不塞入釜山市區四日路線。",
    "source": "https://naver.me/5VxqrIAw"
  },
  {
    "id": "P06",
    "name": "龍沼路 14・未命名拍貼收藏",
    "category": "拍貼",
    "region": "大淵／慶星大",
    "address": "부산광역시 남구 용소로 14",
    "note": "原清單只有地址，店名待確認，不推定為任何品牌。",
    "source": "https://naver.me/5VxqrIAw"
  },
  {
    "id": "P07",
    "name": "Analog 西面",
    "category": "拍貼",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 전포동 686-3",
    "note": "",
    "source": "https://naver.me/5VxqrIAw"
  },
  {
    "id": "P08",
    "name": "Stiikers 西面田浦",
    "category": "拍貼",
    "region": "西面／田浦",
    "address": "부산광역시 부산진구 전포동 691-1 1층",
    "note": "",
    "source": "https://naver.me/5VxqrIAw"
  }
];

PLACES.push({id:'H01',name:'住宿周邊・All Sunday 附近（非 Airbnb 門牌）',category:'住宿參考',region:'廣安里',address:'부산 수영구 광안로61번길 28 1층',note:'這是 All Sunday 廣安店的地址，用來參考住宿區域。Airbnb 確切地址待房東通知；不要向司機說這就是住宿。Naver 顯示距廣安站 3 號出口 781 公尺。',source:'https://pcmap.place.naver.com/restaurant/1961227826/home',url:'https://pcmap.place.naver.com/restaurant/1961227826/home'});
const allSunday=PLACES.find(p=>p.id==='C17');allSunday.url='https://pcmap.place.naver.com/restaurant/1961227826/home';allSunday.note+='；道路名地址：부산 수영구 광안로61번길 28 1층。距廣安站 3 號出口 781 公尺（Naver 店家頁）。';

PLACES.find(p=>p.id==='S19').region='金海機場';
