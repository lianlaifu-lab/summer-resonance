import { useMemo, useState } from "react";

const localeCopy = {
  zh: {
    appTitle: "芽庄（Nha Trang）旅游全攻略",
    appSub: "一键中/韩翻译 · 情侣出行 · 7月9日–16日 · 市区 + 珍珠岛",
    toggle: "切换为韩语",
    tabs: ["总览", "景点攻略", "酒店推荐", "旅行计划", "实用提示"],
    overviewTitle: "这趟行程的核心逻辑",
    overviewSub: "把 7 晚切成 3 个节奏：机场缓冲、岛上深玩、城市收尾。",
    overviewBullets: [
      "酒店顺序本身是合理的：先住金兰海湾，减少晚到当天折腾；再上竹岛住一晚，把 VinWonders 和海滩体验一次做透；最后回芽庄市区收尾，方便吃海鲜、逛夜市、看教堂和泥浴。",
      "芽庄市区景点很集中，陈富海滩一线、占婆塔片区、教堂/大坝市场/龙山寺这几组点都适合按区域串联，不需要每天跨很远。",
      "7 月属于旺季，海边、缆车、热门酒店和一日游通常都要提前订，尤其是万豪系和珍珠岛相关产品。",
    ],
    bookingTitle: "你们的已订酒店",
    bookingSub: "按你发来的截图整理，便于核对。",
    geoTitle: "地理位置与交通",
    geoSub: "先搞清楚芽庄怎么分布，后面就不会乱。",
    cityTitle: "市区景点",
    citySub: "适合和酒店、海滩、夜市穿插安排。",
    islandTitle: "海上与岛上玩法",
    islandSub: "芽庄最值钱的就是海上活动。",
    hotelTitle: "酒店建议",
    hotelSub: "先分区域看，再按你们的预订顺序对照。",
    itineraryTitle: "逐日行程",
    itinerarySub: "按你们已订酒店排出来的可执行版本。",
    tipsTitle: "实用提示",
    tipsSub: "这些会直接影响体验和可行性。",
    buttons: {
      overview: "总览",
      spots: "景点与玩法",
      hotels: "酒店",
      itinerary: "行程",
      tips: "提示",
      city: "市区",
      island: "竹岛 / 珍珠岛",
      camRanh: "金兰海湾",
    },
    hotelAdvice: "怎么选最顺",
    hotelAdviceItems: [
      "晚到首晚：金兰海湾最省心，减少落地当天的体力消耗。",
      "珍珠岛：只住 1 晚最划算，和 VinWonders 绑在一起最顺。",
      "市区：最后两到三晚最合适，吃喝、夜市、海滩、景点都在半径很小的范围内。",
    ],
    note: "说明：此文件为单文件 React 组件，可直接放进前端项目使用。若你需要，我可以继续把它改成更像旅行 App 的交互版，或者再拆成“更适合打印的 PDF 版文案”。",
    quickTitle: "一键韩语翻译说明",
    quickText:
      "点击顶部按钮即可把整页切换为韩语版本；中文与韩语使用同一套结构，便于核对与修改。",
  },
  ko: {
    appTitle: "냐짱(Nha Trang) 여행 완전 가이드",
    appSub:
      "원클릭 중/한 번역 · 커플 여행 · 7월 9일–16일 · 시내 + 빈펄 아일랜드",
    toggle: "중국어로 전환",
    tabs: ["전체", "명소 가이드", "호텔", "일정", "실용 팁"],
    overviewTitle: "이번 여행의 핵심 구조",
    overviewSub:
      "7박을 3가지 리듬으로 나눕니다: 공항 완충, 섬에서의 깊은 체류, 시내 마무리.",
    overviewBullets: [
      "예약한 호텔 순서 자체가 합리적입니다. 먼저 깜라인 해변 쪽에 머물며 늦은 도착의 피로를 줄이고, 그다음 혼쩨(Hon Tre) 섬에서 1박하며 VinWonders와 해변을 충분히 즐긴 뒤, 마지막에는 냐짱 시내에서 해산물, 야시장, 성당, 머드배스를 편하게 즐길 수 있습니다.",
      "냐짱 시내의 주요 명소는 매우 가까운 편입니다. 쩐푸 해변, 포나가르 참탑, 성당/담시장/롱선사 구역은 지역별로 묶어 다니면 효율적입니다.",
      "7월은 성수기이므로 해변 액티비티, 케이블카, 인기 호텔, 일일 투어는 미리 예약하는 편이 좋습니다. 특히 메리어트 계열과 빈펄 관련 상품은 조기 매진될 수 있습니다.",
    ],
    bookingTitle: "이미 예약한 호텔",
    bookingSub: "보내준 스크린샷 기준으로 정리했습니다.",
    geoTitle: "위치와 교통",
    geoSub: "냐짱의 구성을 먼저 이해하면 일정이 훨씬 쉬워집니다.",
    cityTitle: "도심 명소",
    citySub: "호텔, 해변, 야시장과 함께 묶어 다니기 좋습니다.",
    islandTitle: "바다와 섬 액티비티",
    islandSub: "냐짱의 핵심은 역시 해상 체험입니다.",
    hotelTitle: "호텔 추천",
    hotelSub: "지역별로 나눠 보고, 실제 예약 순서와 대조하세요.",
    itineraryTitle: "일자별 일정",
    itinerarySub: "이미 예약한 호텔 흐름에 맞춘 실행 가능한 버전입니다.",
    tipsTitle: "실용 팁",
    tipsSub: "체감 만족도와 일정 실현 가능성에 직접 영향을 줍니다.",
    buttons: {
      overview: "전체",
      spots: "명소/활동",
      hotels: "호텔",
      itinerary: "일정",
      tips: "팁",
      city: "도심",
      island: "혼쩨 / 빈펄",
      camRanh: "깜라인",
    },
    hotelAdvice: "가장 무난한 선택",
    hotelAdviceItems: [
      "도착 첫날은 깜라인 해변이 가장 편합니다. 도착 직후 체력을 아낄 수 있습니다.",
      "혼쩨 섬은 1박만 해도 충분히 가치가 있습니다. VinWonders와 함께 묶으면 이동이 가장 깔끔합니다.",
      "시내는 마지막 2~3박에 가장 적합합니다. 식사, 야시장, 해변, 관광을 반경 안에서 모두 해결할 수 있습니다.",
    ],
    note: "안내: 이 파일은 단일 React 컴포넌트입니다. 그대로 프런트엔드 프로젝트에 넣어 사용할 수 있습니다. 원하시면 여행 앱처럼 더 인터랙티브하게 바꾸거나, 인쇄용 PDF 문안으로도 정리할 수 있습니다.",
    quickTitle: "원클릭 한국어 번역 안내",
    quickText:
      "상단 버튼을 누르면 전체 페이지가 한국어로 전환됩니다. 중국어/한국어는 같은 구조를 사용해 확인과 수정이 쉽습니다.",
  },
};

const actualBookings = [
  {
    date: "7/9 - 7/10",
    name: "Wyndham Grand KN Paradise Cam Ranh",
    zone: { zh: "金兰海湾 / 机场南侧", ko: "깜라인 해변 / 공항 남쪽" },
    why: {
      zh: "晚到第一晚最稳，先落地休息，第二天再进芽庄市区。",
      ko: "늦게 도착하는 첫날 밤에 가장 무난합니다. 먼저 쉬고 다음 날 냐짱 시내로 이동하면 됩니다.",
    },
  },
  {
    date: "7/10 - 7/11",
    name: "The Westin Resort & Spa Cam Ranh",
    zone: { zh: "金兰海湾 / 海滨度假区", ko: "깜라인 해변 / 리조트 존" },
    why: {
      zh: "继续住海湾，节奏松一点，适合休息、海滩、泳池、Spa。",
      ko: "계속 해변 리조트에 머물며 여유 있게 쉬기 좋고, 해변·수영장·스파에 적합합니다.",
    },
  },
  {
    date: "7/11 - 7/12",
    name: "Nha Trang Marriott Resort & Spa, Hon Tre Island",
    zone: { zh: "竹岛 / 珍珠岛", ko: "혼쩨 섬 / 빈펄 섬" },
    why: {
      zh: "和 VinWonders 绑定最方便，适合把乐园、海滩、缆车一次玩透。",
      ko: "VinWonders와 묶기 가장 편합니다. 테마파크, 해변, 케이블카를 한 번에 즐기기에 좋습니다.",
    },
  },
  {
    date: "7/12 - 7/13",
    name: "Four Points by Sheraton Nha Trang",
    zone: { zh: "芽庄市区 / 陈富海滩", ko: "냐짱 시내 / 쩐푸 해변" },
    why: {
      zh: "回到市区，开始把夜市、海滩、城市景点串起来。",
      ko: "시내로 돌아와 야시장, 해변, 도시 명소를 묶어서 다니기 좋습니다.",
    },
  },
  {
    date: "7/13 - 7/14",
    name: "Sheraton Nha Trang Hotel & Spa",
    zone: { zh: "芽庄市区 / 陈富海滩", ko: "냐짱 시내 / 쩐푸 해변" },
    why: {
      zh: "继续住在海滨核心区，最适合安排教堂、占婆塔、夜市、海鲜。",
      ko: "해변 핵심 지역에 머물며 성당, 참탑, 야시장, 해산물 식사를 넣기 가장 좋습니다.",
    },
  },
  {
    date: "7/14 - 7/15",
    name: "Wyndham Grand KN Paradise Cam Ranh",
    zone: { zh: "金兰海湾 / 机场方向", ko: "깜라인 해변 / 공항 방향" },
    why: {
      zh: "作为返程前缓冲很合理，尤其适合你们最后一天不想赶车。",
      ko: "귀국 전 완충 숙박으로 매우 합리적입니다. 마지막 날 차량 이동 부담을 줄일 수 있습니다.",
    },
  },
];

const transport = [
  {
    k: { zh: "机场到市区", ko: "공항 → 시내" },
    v: {
      zh: "金兰机场到芽庄市区约 35 公里，车程大约 45-60 分钟。",
      ko: "깜라인 공항에서 냐짱 시내까지 약 35km이며, 차량으로 대략 45~60분 걸립니다.",
    },
  },
  {
    k: { zh: "市区出行", ko: "시내 이동" },
    v: {
      zh: "Grab 最省心，短距离打车通常很便宜，市区景点之间移动效率高。",
      ko: "Grab이 가장 편합니다. 짧은 거리 택시는 대체로 저렴하고, 시내 명소 간 이동 효율도 좋습니다.",
    },
  },
  {
    k: { zh: "去珍珠岛", ko: "빈펄 섬 이동" },
    v: {
      zh: "从市区坐船或缆车上 Hon Tre；缆车本身就是景色体验的一部分。",
      ko: "시내에서 배 또는 케이블카로 Hon Tre 섬에 들어갑니다. 케이블카 자체가 하나의 관광 포인트입니다.",
    },
  },
  {
    k: { zh: "四岛游码头", ko: "사섬투어 출발 지점" },
    v: {
      zh: "从 Cầu Đá 码头出发更常见，建议留足集合时间。",
      ko: "보통 Cầu Đá 부두에서 출발합니다. 집결 시간을 넉넉히 잡는 것이 좋습니다.",
    },
  },
];

const cityHighlights = [
  {
    name: { zh: "婆那加占婆塔", ko: "포나가르 참탑" },
    en: "Po Nagar Cham Towers",
    where: {
      zh: "芽庄北部，离市区很近",
      ko: "냐짱 북쪽, 시내와 가깝습니다",
    },
    time: { zh: "30-60 分钟", ko: "30~60분" },
    price: { zh: "门票约 22,000 VND", ko: "입장료 약 22,000 VND" },
    note: {
      zh: "先看占婆遗迹，再去钟屿，两个点可以连着走。",
      ko: "참탑을 본 뒤 혼쫑(Hon Chong)으로 이어서 가면 동선이 좋습니다.",
    },
  },
  {
    name: { zh: "钟屿 / 五指岩", ko: "혼쫑 / 오지암" },
    en: "Hon Chong",
    where: {
      zh: "占婆塔附近，北部海岸",
      ko: "참탑 근처의 북부 해안",
    },
    time: { zh: "30-45 分钟", ko: "30~45분" },
    price: {
      zh: "通常门票很低，现场为准",
      ko: "보통 입장료가 낮으며 현장 기준",
    },
    note: {
      zh: "更适合顺路拍照，不建议单独跑一趟。",
      ko: "사진 찍기 좋은 코스이며, 이곳만 따로 가기보다는 근처 일정과 묶는 편이 좋습니다.",
    },
  },
  {
    name: { zh: "芽庄大教堂", ko: "냐짱 대성당" },
    en: "Nha Trang Cathedral",
    where: {
      zh: "市中心，靠近火车站",
      ko: "시내 중심, 기차역 근처",
    },
    time: { zh: "20-40 分钟", ko: "20~40분" },
    price: { zh: "免费，偶尔象征性捐赠", ko: "무료, 가끔 자율 기부" },
    note: {
      zh: "上午和傍晚光线最好，注意穿着别太随意。",
      ko: "아침이나 저녁 빛이 가장 좋습니다. 복장은 너무 가볍지 않게 하는 편이 좋습니다.",
    },
  },
  {
    name: { zh: "龙山寺", ko: "롱선사" },
    en: "Long Son Pagoda",
    where: {
      zh: "市中心西侧",
      ko: "시내 서쪽",
    },
    time: { zh: "45-60 分钟", ko: "45~60분" },
    price: { zh: "免费", ko: "무료" },
    note: {
      zh: "适合傍晚去，白佛和城市俯瞰都值得看。",
      ko: "해질 무렵에 가면 좋습니다. 백불상과 시내 전망을 함께 볼 수 있습니다.",
    },
  },
  {
    name: { zh: "大坝市场", ko: "담 시장" },
    en: "Dam Market",
    where: {
      zh: "市中心",
      ko: "시내 중심",
    },
    time: { zh: "30-60 分钟", ko: "30~60분" },
    price: { zh: "免费入场", ko: "입장 무료" },
    note: {
      zh: "买咖啡、腰果、果干、鱼露都适合。",
      ko: "커피, 캐슈넛, 건과일, 피쉬소스 등을 사기에 적당합니다.",
    },
  },
  {
    name: { zh: "塔巴泥浴", ko: "탑바 머드배스" },
    en: "Thap Ba Mud Bath",
    where: {
      zh: "市区北侧",
      ko: "시내 북쪽",
    },
    time: { zh: "2-3 小时", ko: "2~3시간" },
    price: {
      zh: "基础套餐约 200,000 VND 起",
      ko: "기본 패키지 약 200,000 VND부터",
    },
    note: {
      zh: "更像放松项目，不是硬核景点。",
      ko: "강한 관광지라기보다 휴식형 체험에 가깝습니다.",
    },
  },
];
const islandHighlights = [
  {
    name: { zh: "四岛游", ko: "사섬투어" },
    en: "Island Hopping Tour",
    where: {
      zh: "从 Cầu Đá 码头出发",
      ko: "Cầu Đá 부두에서 출발",
    },
    time: { zh: "半天到全天", ko: "반나절~종일" },
    price: {
      zh: "跟团约 20-50 美元/人，包船更贵",
      ko: "조인 투어는 1인 약 20~50달러, 전세는 더 비쌉니다",
    },
    note: {
      zh: "经典路线通常会含竹岛、妙岛、蚕岛、猴岛或类似组合；浮潜和午餐是核心卖点。",
      ko: "일반적으로 Hon Tre, Mun Island, Tam Island, Monkey Island 같은 조합으로 운영되며, 스노클링과 점심이 핵심입니다.",
    },
  },
  {
    name: { zh: "VinWonders 芽庄", ko: "VinWonders 냐짱" },
    en: "VinWonders Nha Trang",
    where: {
      zh: "竹岛 Hon Tre",
      ko: "Hon Tre 섬",
    },
    time: { zh: "整天最合适", ko: "하루 종일이 가장 적합" },
    price: {
      zh: "成人标准票含缆车约 1,050,000 VND",
      ko: "성인 표준권(케이블카 포함) 약 1,050,000 VND",
    },
    note: {
      zh: "如果 4 点后入园会便宜些；乐园、水上项目和缆车是连在一起的。",
      ko: "오후 4시 이후 입장은 더 저렴한 편입니다. 테마파크, 워터파크, 케이블카가 한 세트입니다.",
    },
  },
  {
    name: { zh: "竹岛海滩与度假村", ko: "혼쩨 해변과 리조트" },
    en: "Hon Tre Beach",
    where: {
      zh: "竹岛上",
      ko: "Hon Tre 섬 내부",
    },
    time: { zh: "随时", ko: "언제든지" },
    price: { zh: "住店即享", ko: "숙박객은 바로 이용 가능" },
    note: {
      zh: "适合把一整天留给海滩、泳池、Spa 和拍照。",
      ko: "해변, 수영장, 스파, 사진 촬영에 하루를 온전히 쓰기 좋습니다.",
    },
  },
];

const foodRecommendations = [
  {
    name: { zh: "巷子瓦片烤肉 (Kay BBQ)", ko: "골목 기와 구이 (Kay BBQ)" },
    tag: { zh: "小红书爆款·必吃特色", ko: "SNS 인기·필수 이색 체험" },
    price: "约 150,000 - 300,000 VND / 人",
    img: "https://loremflickr.com/500/500/bbq,pork",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Kay+BBQ+Nha+Trang",
    desc: {
      zh: "位置在市区小巷里。来芽庄必吃的传统“瓦片烤肉”，炭火泥炉加上斜放的红瓦片烤肉，带有特殊炭香。推荐：招牌五花肉、大虾、牛肉片，绝对能满足一天的蛋白质摄入需求。",
      ko: "시내 골목에 위치한 냐짱 필수 먹거리 '전통 기와 구이'. 숯불 향이 일품입니다. 추천 메뉴: 삼겹살, 대하, 소고기.",
    },
  },
  {
    name: {
      zh: "清霜海鲜 (Thanh Suong Seafood)",
      ko: "탄스엉 해산물 (Thanh Suong)",
    },
    tag: { zh: "本地老字号海鲜排档", ko: "현지인 추천 가성비 해산물" },
    price: "约 250,000 - 400,000 VND / 人",
    img: "https://loremflickr.com/500/500/seafood,shrimp",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Thanh+Suong+Seafood+Nha+Trang",
    desc: {
      zh: "在陈富海滩大道有多家分店，本地人和游客都爱去。价格全公开，海鲜新鲜分量足。必点菜单：葱油烤扇贝、蒜蓉烤龙虾、海鲜炒面。",
      ko: "쩐푸 해변에 여러 지점이 있는 유명한 식당. 가격이 투명합니다. 추천 메뉴: 가리비 파기름 구이, 갈릭 랍스터 구이, 해산물 볶음면.",
    },
  },
  {
    name: { zh: "CCCP Coffee", ko: "CCCP 커피" },
    tag: { zh: "超赞椰子咖啡 + 强冷气", ko: "최고의 코코넛 커피 + 에어컨" },
    price: "约 48,000 VND / 杯",
    img: "https://loremflickr.com/500/500/coffee,cafe",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=CCCP+Coffee+Nha+Trang",
    desc: {
      zh: "芽庄市区内的避暑天堂，军绿色俄式复古装修，冷气超足！强烈推荐：椰子冰沙咖啡（Coconut Coffee）和芒果冰沙。允许自带食物进入。",
      ko: "시내에서 가장 쾌적한 피서 카페. 에어컨이 아주 시원합니다. 강력 추천 메뉴: 코코넛 커피 스무디, 망고 스무디.",
    },
  },
  {
    name: {
      zh: "Ngon Gallery (龙虾海鲜自助)",
      ko: "Ngon Gallery (랍스터 뷔페)",
    },
    tag: { zh: "五星级浪漫·无限量龙虾", ko: "5성급 체험·무제한 랍스터" },
    price: "约 1,000,000 VND 起 / 人",
    img: "https://loremflickr.com/500/500/lobster,seafood",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Ngon+Gallery+Nha+Trang",
    desc: {
      zh: "位于市中心的高端自助餐，环境优雅，很适合晚餐。主打现点现做的无限量龙虾（芝士/黑胡椒/蒜蓉/辣椒），以及丰富的生鱼片和牛排拼盘。",
      ko: "시내 중심부에 위치한 고급 뷔페. 무제한 랍스터(치즈, 블랙페퍼, 갈릭, 칠리 맛)와 풍성한 사시미, 스테이크 플래터가 특징입니다.",
    },
  },
];

const hotelOptions = {
  city: [
    {
      name: "Sheraton Nha Trang Hotel & Spa",
      tag: { zh: "万豪系首选", ko: "메리어트 계열 우선" },
      price: "约 700-1000 元/晚",
      loc: { zh: "芽庄陈富海滩核心区", ko: "냐짱 쩐푸 해변 핵심 구역" },
      good: {
        zh: ["海景和位置都强", "适合晚上逛夜市", "万豪体系方便累积"],
        ko: [
          "오션뷰와 입지가 좋음",
          "밤에 야시장 가기 좋음",
          "메리어트 포인트 적립 가능",
        ],
      },
      bad: {
        zh: ["旺季价格高", "老牌酒店，部分房间风格偏经典"],
        ko: ["성수기 가격이 높음", "오래된 편이라 일부 객실은 클래식한 느낌"],
      },
      tips: {
        zh: [
          "会员待遇：钛金大概率升行政海景房或角套，带行政酒廊（下午茶和 Happy Hour 的热食足够解决简餐）。可以利用 4PM 延迟退房睡饱练透。",
          "周边交通：极度便利。下楼就是主干道，打车去大坝市场或夜市基本都是起步价；过马路就是酒店的私人沙滩专属躺椅。",
          "便利店与餐饮：楼下及背后的小巷里到处都是 Circle K 和本地杂货店。海鲜排档步行可达。酒店自助早餐极丰盛，若在酒店单点晚餐约 600,000 VND/人。",
        ],
        ko: [
          "멤버십 혜택: 티타늄은 클럽 오션뷰나 스위트로 업그레이드 확률이 높으며 클럽 라운지(해피아워)가 포함됩니다. 4PM 레잇 체크아웃을 활용하기 좋습니다.",
          "교통 및 주변: 매우 편리합니다. 길 건너편이 전용 해변이며, 야시장까지 택시 기본요금 거리입니다.",
          "편의점 및 식사: 호텔 1층 주변에 Circle K 등 편의점이 널려 있습니다. 조식이 훌륭하며, 호텔 내 저녁 단품 식사는 약 600,000 VND입니다.",
        ],
      },
    },
    {
      name: "Four Points by Sheraton Nha Trang",
      tag: { zh: "万豪系性价比", ko: "메리어트 가성비" },
      price: "约 450-800 元/晚",
      loc: { zh: "市区海滨大道", ko: "시내 해변 도로변" },
      good: {
        zh: ["位置好", "价格通常比喜来登友好", "适合城市观光"],
        ko: [
          "입지가 좋음",
          "쉐라톤보다 가격이 보통 더 합리적",
          "도심 관광에 적합",
        ],
      },
      bad: {
        zh: ["豪华感不如喜来登", "热门日期容易涨价"],
        ko: ["럭셔리 감은 쉐라톤보다 약함", "인기 날짜는 가격이 빨리 오름"],
      },
      tips: {
        zh: [
          "会员待遇：钛金通常升级至高空海景房，套房数量较少。无行政酒廊，但高空泳池和器械超全的健身房非常出片和实用。",
          "周边交通：打车极易，门口随时有 Grab。去著名景点婆那加占婆塔比喜来登更近。",
          "便利店与餐饮：楼下左转就是便利店和咖啡馆。早餐高峰期人多需排队，建议错峰；晚餐可以直接溜达到附近的「清霜海鲜」吃平价大排档。",
        ],
        ko: [
          "멤버십 혜택: 티타늄은 보통 고층 오션뷰로 업그레이드되며 라운지는 없지만 피트니스 센터와 고층 수영장이 아주 훌륭합니다.",
          "교통 및 주변: Grab 택시 잡기가 아주 쉬우며, 포나가르 참탑과 더 가깝습니다.",
          "편의점 및 식사: 1층 바로 옆에 편의점과 카페가 있습니다. 조식 피크 타임엔 대기가 있을 수 있으며, 저녁은 근처 해산물 식당을 추천합니다.",
        ],
      },
    },
    {
      name: "Novotel Nha Trang",
      tag: { zh: "非万豪备选", ko: "비메리어트 대안" },
      price: "约 350-650 元/晚",
      loc: { zh: "市区海边", ko: "시내 해변가" },
      good: {
        zh: ["海景位置很稳", "价格更好控", "适合预算型住法"],
        ko: ["바다 전망 위치가 좋음", "가격 관리가 쉬움", "예산형 숙박에 적합"],
      },
      bad: {
        zh: ["不是万豪", "设施风格相对常规"],
        ko: ["메리어트가 아님", "시설이 비교적 일반적"],
      },
      tips: {
        zh: [
          "配套体验：非万豪系无会员加持，但法国雅高集团的管理底子扎实，床品舒适度高。",
          "周边交通：位于市区最正中心的繁华十字路口，去哪儿都能步行或便宜打车。",
          "便利店与餐饮：被便利店和当地网红店包围。其一楼的海鲜自助晚餐（含龙虾）在当地性价比极高，折合大概 150 RMB/人，值得一试。",
        ],
        ko: [
          "호텔 경험: 메리어트는 아니지만 아코르 계열로 침구류가 편안하고 서비스가 안정적입니다.",
          "교통 및 주변: 시내 가장 중심 사거리에 있어 어디든 도보나 저렴한 택시로 이동 가능합니다.",
          "편의점 및 식사: 주변에 편의점이 가득하며, 호텔 1층 해산물 뷔페(랍스터 포함)가 가성비 좋기로 현지에서 유명합니다.",
        ],
      },
    },
  ],
  island: [
    {
      name: "Nha Trang Marriott Resort & Spa, Hon Tre Island",
      tag: { zh: "万豪岛上首选", ko: "섬 내 메리어트 우선" },
      price: "约 800-1300 元/晚",
      loc: { zh: "竹岛 Hon Tre", ko: "Hon Tre 섬" },
      good: {
        zh: ["万豪体系", "度假感强", "适合住一晚把岛上玩透"],
        ko: [
          "메리어트 계열",
          "리조트 분위기가 강함",
          "1박으로 섬을 깊게 즐기기 좋음",
        ],
      },
      bad: {
        zh: ["出入岛不如市区方便", "临时去吃夜宵不轻松"],
        ko: ["시내 접근성이 떨어짐", "야식이나 즉흥 외출이 불편함"],
      },
      tips: {
        zh: [
          "会员待遇：前身是珍珠岛酒店。钛金会员有极大概率升带私池的单卧别墅或绝美海景套（视房态）。4PM退房神技在这里等于多赚大半天海岛游。",
          "出行提示：出入岛需乘 24 小时免费快艇或跨海缆车。上岛后出行全靠呼叫酒店 Buggy。",
          "便利店与餐饮：**岛上完全没有便利店**！务必在市区买好零食、水和泡面带上岛。岛上餐饮贵且选择少，酒店自助晚餐约 800,000 VND，或者去 VinWonders 园区里吃快餐。",
        ],
        ko: [
          "멤버십 혜택: 구 빈펄 리조트를 리브랜딩했습니다. 티타늄은 풀빌라나 오션뷰 스위트로 업그레이드될 확률이 높습니다.",
          "교통 및 주변: 섬 출입 시 24시간 무료 스피드보트나 케이블카를 이용해야 하며, 섬 내부 이동은 버기카에 의존합니다.",
          "편의점 및 식사: **섬 내 편의점이 전혀 없습니다!** 시내에서 간식을 사서 들어가세요. 저녁 식사는 호텔 뷔페(약 800k VND)나 빈원더스 내부에서 해결해야 합니다.",
        ],
      },
    },
    {
      name: "Vinpearl Resort & Spa Nha Trang Bay",
      tag: { zh: "乐园联动型", ko: "테마파크 연계형" },
      price: "约 500-900 元/晚",
      loc: { zh: "竹岛 Hon Tre", ko: "Hon Tre 섬" },
      good: {
        zh: ["和 VinWonders 联动紧", "亲子和情侣都顺手", "常有含票套餐"],
        ko: [
          "VinWonders와 연결이 편함",
          "가족·커플 모두 편리",
          "입장권 포함 패키지가 자주 있음",
        ],
      },
      bad: {
        zh: ["不如万豪新", "旺季人多时体验会打折"],
        ko: ["메리어트보다 신축감이 약함", "성수기에는 사람이 많아질 수 있음"],
      },
      tips: {
        zh: [
          "出行提示：典型的巨型亲子度假村，高峰期等快艇和 Buggy 容易排队，办理入住常常需要等。",
          "便利店与餐饮：周边绝对封闭，无便利店。由于周边没吃的，极其建议在订房时直接加钱购买含三餐（FB - Full Board）的房型，吃饱直接去乐园玩。",
        ],
        ko: [
          "교통 및 주변: 대형 가족 리조트로 피크 타임엔 보트와 버기카 대기가 꽤 있습니다.",
          "편의점 및 식사: 주변에 상가가 전혀 없습니다. 예약 시 3식을 모두 제공하는 풀보드(FB) 패키지를 선택하는 것이 가장 마음 편합니다.",
        ],
      },
    },
    {
      name: "Vinpearl Luxury Nha Trang",
      tag: { zh: "私密安静型", ko: "프라이빗·조용한 타입" },
      price: "约 750-1100 元/晚",
      loc: { zh: "竹岛 Hon Tre", ko: "Hon Tre 섬" },
      good: {
        zh: ["别墅感更强", "安静、适合情侣", "度假氛围好"],
        ko: [
          "빌라 느낌이 강함",
          "조용해서 커플에게 좋음",
          "휴양 분위기가 좋음",
        ],
      },
      bad: {
        zh: ["价格不低", "离乐园要看具体位置"],
        ko: ["가격이 낮지 않음", "테마파크까지는 위치에 따라 이동이 필요"],
      },
      tips: {
        zh: [
          "出行提示：全别墅区，私密性极高，很适合情侣两人世界。呼叫 Buggy 响应服务比普通珍珠系酒店快很多。",
          "便利店与餐饮：同样无便利店。只有酒店自带的高级餐厅，单点消费较高，建议买含早晚餐（HB）的套包最划算。",
        ],
        ko: [
          "교통 및 주변: 전 객실 풀빌라로 프라이버시가 높고 커플 여행에 최고입니다. 버기카 서비스도 빠른 편입니다.",
          "편의점 및 식사: 편의점은 없습니다. 고급 레스토랑만 있어 단가가 높으므로 하프보드(HB, 조/석식) 패키지로 예약하는 것을 추천합니다.",
        ],
      },
    },
  ],
  camRanh: [
    {
      name: "Wyndham Grand KN Paradise Cam Ranh",
      tag: { zh: "落地缓冲型", ko: "도착 완충형" },
      price: "约 300-700 元/晚",
      loc: { zh: "金兰海湾", ko: "깜라인 해변" },
      good: {
        zh: ["离机场近", "适合晚到/早走", "先休息再进城"],
        ko: [
          "공항과 가까움",
          "늦게 도착하거나 일찍 출발할 때 좋음",
          "먼저 쉬고 시내로 이동 가능",
        ],
      },
      bad: {
        zh: ["离芽庄市区远", "吃喝玩乐选择少于市区"],
        ko: ["냐짱 시내와 거리가 있음", "식사·놀거리 선택이 시내보다 적음"],
      },
      tips: {
        zh: [
          "出行提示：占地面积巨大（内含大片高尔夫球场），从房间去大堂或餐厅步行极远，全靠 Buggy，通常要等 10-15 分钟，要有心理准备。打 Grab 去市区约 400,000 VND。",
          "便利店与餐饮：**重灾区！周边是荒地，外卖进不来，没有便利店**。落地当晚建议在机场先买好水和泡面。酒店晚餐偏贵且选择少，只适合做过渡落脚点。",
        ],
        ko: [
          "교통 및 주변: 리조트가 너무 넓어 버기카 의존도가 높고(10~15분 대기), 시내까지 그랩 택시비 약 400,000 VND가 나옵니다.",
          "편의점 및 식사: **주변이 공터라 배달이나 편의점이 아예 없습니다**. 공항에서 미리 물과 간식을 사오세요. 저녁 식사 선택지가 적어 잠시 머무는 용도로만 추천합니다.",
        ],
      },
    },
    {
      name: "The Westin Resort & Spa Cam Ranh",
      tag: { zh: "海湾度假型", ko: "해변 리조트형" },
      price: "约 600-1000 元/晚",
      loc: { zh: "金兰海湾", ko: "깜라인 해변" },
      good: {
        zh: ["适合纯度假", "泳池和 Spa 很适合放空", "情侣体验感好"],
        ko: [
          "순수 휴양에 적합",
          "수영장과 스파가 좋음",
          "커플 체류 만족도가 높음",
        ],
      },
      bad: {
        zh: ["不在城市核心", "需要额外时间进芽庄"],
        ko: ["도심 중심이 아님", "냐짱 시내로 갈 때 시간이 더 듦"],
      },
      tips: {
        zh: [
          "会员待遇：2024 年全新开业，硬件极佳。钛金升房极度慷慨，大概率直升带私人泳池的别墅或绝美尊贵海景房。配合 4PM 延迟退房，情侣度假感拉满。",
          "便利店与餐饮：同样荒凉无便利店。但威斯汀主打的健康早餐（Eat Well）备受好评。酒店内有极佳的健身房和海滨瑜伽。晚餐推荐在酒店内的海鲜餐厅解决，人均约 600,000 VND。",
        ],
        ko: [
          "멤버십 혜택: 2024년 신규 오픈했으며 티타늄 업그레이드가 아주 후합니다(풀빌라나 오션뷰 룸). 4PM 레잇 체크아웃과 최고의 궁합입니다.",
          "편의점 및 식사: 편의점은 없지만 웨스틴 특유의 웰빙 조식이 훌륭합니다. 커플 호캉스에 좋으며 저녁 식사는 호텔 레스토랑(인당 약 600k VND)을 추천합니다.",
        ],
      },
    },
  ],
};

const itinerary = [
  {
    date: "7/9",
    title: {
      zh: "晚到，先落地休息",
      ko: "늦은 도착, 먼저 휴식",
    },
    hotel: "Wyndham Grand KN Paradise Cam Ranh",
    tasks: {
      zh: [
        "抵达后直接去酒店，不建议当晚再进芽庄城里折腾。",
        "只安排简单晚餐和补觉。",
        "把第二天要出海/换酒店的证件和泳衣先整理好。",
      ],
      ko: [
        "도착 후 곧바로 호텔로 이동하는 것이 좋습니다. 당일 밤에 다시 냐짱 시내로 가는 것은 비효율적입니다.",
        "가벼운 저녁식사 후 바로 쉬는 일정이 적합합니다.",
        "다음 날 해양 일정이나 호텔 이동에 필요한 여권, 수영복 등을 미리 정리해 두세요.",
      ],
    },
  },
  {
    date: "7/10",
    title: {
      zh: "金兰海湾慢节奏，准备进城",
      ko: "깜라인 해변에서 여유롭게, 시내 이동 준비",
    },
    hotel: "The Westin Resort & Spa Cam Ranh",
    tasks: {
      zh: [
        "上午海滩或泳池，下午可做 Spa。",
        "如果想进芽庄市区，建议只做半日轻行程，不要塞太满。",
        "晚上早休息，给 7/11 的岛上行程留体力。",
      ],
      ko: [
        "오전에는 해변이나 수영장을 즐기고, 오후에는 스파를 넣기 좋습니다.",
        "냑짱 시내를 가고 싶다면 반나절 가벼운 일정만 넣는 것이 좋습니다.",
        "다음 날 섬 일정이 있으니 밤에는 일찍 쉬는 편이 좋습니다.",
      ],
    },
  },
  {
    date: "7/11",
    title: {
      zh: "转竹岛，住万豪岛上",
      ko: "혼쩨 섬으로 이동, 섬 내 메리어트 숙박",
    },
    hotel: "Nha Trang Marriott Resort & Spa, Hon Tre Island",
    tasks: {
      zh: [
        "白天先从市区/海湾转去码头或缆车站。",
        "上岛后优先安排海滩、泳池、入园侦查。",
        "若体力够，傍晚就把 VinWonders 或岛上散步安排进去。",
      ],
      ko: [
        "낮에는 시내/깜라인에서 부두 또는 케이블카역으로 이동합니다.",
        "섬 도착 후에는 해변, 수영장, 시설 탐색부터 하는 것이 좋습니다.",
        "체력이 괜찮다면 저녁 전 VinWonders나 섬 산책을 넣어도 좋습니다.",
      ],
    },
  },
  {
    date: "7/12",
    title: {
      zh: "回市区，进入夜生活和观光节奏",
      ko: "시내 복귀, 야시장과 관광 중심으로 전환",
    },
    hotel: "Four Points by Sheraton Nha Trang",
    tasks: {
      zh: [
        "上午可补玩岛上项目，午后回市区。",
        "下午安排占婆塔、钟屿、大教堂一类轻观光。",
        "晚上把夜市和海鲜安排上。",
      ],
      ko: [
        "오전에는 섬에서 남은 일정이 있으면 마무리하고, 오후에 시내로 돌아옵니다.",
        "오후에는 참탑, 혼쫑, 대성당 같은 가벼운 관광이 적합합니다.",
        "저녁에는 야시장과 해산물 식사를 넣으세요.",
      ],
    },
  },
  {
    date: "7/13",
    title: {
      zh: "市区核心日",
      ko: "시내 핵심 일정",
    },
    hotel: "Sheraton Nha Trang Hotel & Spa",
    tasks: {
      zh: [
        "上午龙山寺或泥浴，二选一即可。",
        "下午海滩散步、咖啡、拍照。",
        "晚餐放到海鲜街或海边餐厅。",
      ],
      ko: [
        "오전에는 롱선사 또는 머드배스 중 하나만 선택하는 편이 좋습니다.",
        "오후에는 해변 산책, 카페, 사진 촬영에 시간을 쓰세요.",
        "저녁 식사는 해산물 거리나 해변 레스토랑이 좋습니다.",
      ],
    },
  },
  {
    date: "7/14",
    title: {
      zh: "缓冲回金兰海湾",
      ko: "깜라인 해변으로 다시 이동",
    },
    hotel: "Wyndham Grand KN Paradise Cam Ranh",
    tasks: {
      zh: [
        "这一天适合收一收节奏，不要再塞太多景点。",
        "可以把购物、整理行李、酒店休息放进来。",
        "若次日早飞，这晚非常合理。",
      ],
      ko: [
        "이날은 일정 속도를 조금 줄이는 것이 좋습니다.",
        "쇼핑, 짐 정리, 호텔 휴식을 넣기에 적합합니다.",
        "다음 날 이른 비행이라면 이 숙박이 특히 합리적입니다.",
      ],
    },
  },
  {
    date: "7/15 - 7/16",
    title: {
      zh: "最后一晚请按最终订单确认",
      ko: "마지막 1박은 최종 예약에 맞춰 확인",
    },
    hotel: {
      zh: "建议补在市区或机场方向",
      ko: "시내 또는 공항 방향 숙박을 권장",
    },
    tasks: {
      zh: [
        "如果 7/16 是早航班，最后一晚尽量住金兰方向。",
        "如果 7/16 航班晚，可以继续住市区补逛。",
        "这一晚不要再切太远的点，减少变动风险。",
      ],
      ko: [
        "7/16에 이른 비행편이 있다면 마지막 밤은 깜라인 방향이 좋습니다.",
        "7/16 비행편이 늦으면 시내에 계속 머무르며 추가 관광이 가능합니다.",
        "마지막 밤에는 너무 멀리 이동하지 않는 것이 좋습니다.",
      ],
    },
  },
];

function Card({ children, accent = false }) {
  return (
    <div
      style={{
        background: "#fff",
        border: accent ? "2px solid #0e2d4d" : "1px solid #e8e0d4",
        borderRadius: 18,
        padding: 18,
        boxShadow: "0 8px 24px rgba(20,30,50,0.05)",
      }}
    >
      {children}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 10px",
        borderRadius: 999,
        background: "#edf4fb",
        color: "#0e2d4d",
        fontSize: 12,
        fontWeight: 700,
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ title, sub }) {
  return (
    <div style={{ margin: "22px 0 12px" }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: "#0e2d4d" }}>
        {title}
      </div>
      {sub ? (
        <div style={{ marginTop: 4, color: "#6b7280", fontSize: 13 }}>
          {sub}
        </div>
      ) : null}
    </div>
  );
}

function BulletList({ items }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {items.map((item, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            gap: 8,
            alignItems: "flex-start",
            fontSize: 14,
            color: "#334155",
            lineHeight: 1.65,
          }}
        >
          <span style={{ color: "#0e2d4d" }}>•</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function HotelCard({ h, lang }) {
  const good = lang === "zh" ? h.good.zh : h.good.ko;
  const bad = lang === "zh" ? h.bad.zh : h.bad.ko;
  // 获取新增的详细攻略数据
  const tips = lang === "zh" ? h.tips?.zh : h.tips?.ko;

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#0e2d4d" }}>
            {h.name}
          </div>
          <div style={{ marginTop: 4, color: "#6b7280", fontSize: 13 }}>
            {lang === "zh" ? h.loc.zh : h.loc.ko}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#e07055" }}>
            {lang === "zh" ? h.tag.zh : h.tag.ko}
          </div>
          <div style={{ marginTop: 4, fontSize: 16, fontWeight: 800 }}>
            {h.price}
          </div>
        </div>
      </div>

      {/* 优点和缺点 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          marginTop: 14,
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 800,
              color: "#16a34a",
              marginBottom: 6,
              fontSize: 13,
            }}
          >
            {lang === "zh" ? "优点" : "장점"}
          </div>
          <BulletList items={good} />
        </div>
        <div>
          <div
            style={{
              fontWeight: 800,
              color: "#dc2626",
              marginBottom: 6,
              fontSize: 13,
            }}
          >
            {lang === "zh" ? "注意" : "주의"}
          </div>
          <BulletList items={bad} />
        </div>
      </div>

      {/* 🌟 新增：深度详细攻略展示区 */}
      {tips && (
        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: "1px dashed #dbe3ea",
          }}
        >
          <div
            style={{
              fontWeight: 800,
              color: "#0e2d4d",
              marginBottom: 10,
              fontSize: 14,
            }}
          >
            {lang === "zh"
              ? "📌 隐藏细节 (周边/餐饮/待遇)"
              : "📌 상세 팁 (교통/식음료/멤버십)"}
          </div>
          <BulletList items={tips} />
        </div>
      )}
    </Card>
  );
}

function FoodCard({ f, lang }) {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {/* 左侧方形大图 */}
        <div
          style={{
            flexShrink: 0,
            width: 130,
            height: 130,
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid #e8e0d4",
            backgroundColor: "#f9f9f9",
          }}
        >
          <img
            src={f.img}
            alt="food"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        {/* 右侧文字信息 */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontSize: 19, fontWeight: 900, color: "#0e2d4d" }}>
                {lang === "zh" ? f.name.zh : f.name.ko}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#e07055",
                  fontWeight: 800,
                  marginTop: 4,
                }}
              >
                {lang === "zh" ? f.tag.zh : f.tag.ko}
              </div>
            </div>
            {/* 价格标签 */}
            <div
              style={{
                background: "#fef2f2",
                color: "#dc2626",
                padding: "6px 10px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              {f.price}
            </div>
          </div>
          {/* 详情与菜单 */}
          <div
            style={{
              marginTop: 12,
              fontSize: 14,
              color: "#334155",
              lineHeight: 1.65,
            }}
          >
            {lang === "zh" ? f.desc.zh : f.desc.ko}
          </div>

          {/* 🌟 新增：一键导航按钮 */}
          {f.mapLink && (
            <a
              href={f.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 14,
                padding: "8px 14px",
                background: "#edf4fb",
                color: "#0e2d4d",
                fontSize: 13,
                fontWeight: 800,
                textDecoration: "none",
                borderRadius: 8,
              }}
            >
              📍 {lang === "zh" ? "Google Maps 导航" : "Google 지도 안내"}
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}

// 🌟 独家定制：小红书同款滑动相册组件
function ImageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    if (width > 0) {
      // 动态计算当前滑动到了第几张图，用来控制下方的小圆点
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <div style={{ marginTop: 22, width: "100%" }}>
      {/* 隐藏原生丑陋的横向滚动条 */}
      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>

      <div
        className="hide-scroll"
        onScroll={handleScroll}
        style={{
          display: "flex",
          width: "100%", // 1. 绝对不超出文字框
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          borderRadius: 12,
          backgroundColor: "#f4f4f5", // 浅灰背景托底，让竖屏图两边不显突兀
        }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            style={{
              flex: "0 0 100%", // 3. 严格只展示一张照片的大小
              width: "100%",
              scrollSnapAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={src}
              alt={`view-${idx}`}
              style={{
                width: "100%",
                maxHeight: 450, // 限制最高高度，防止竖屏图霸占整个手机屏幕
                objectFit: "contain", // 2. 🌟 核心魔法：原比例完整展示！绝对不裁剪、不拉伸！
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      {/* 4. 底部滑动小点点指示器 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginTop: 12,
        }}
      >
        {images.map((_, idx) => (
          <div
            key={idx}
            style={{
              width: activeIndex === idx ? 18 : 6, // 划到哪张，哪个点就变成拉长的胶囊
              height: 6,
              borderRadius: 3,
              backgroundColor: activeIndex === idx ? "#0e2d4d" : "#cbd5e1",
              transition: "all 0.3s ease", // 丝滑的切换动画
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("zh");
  const [hotelZone, setHotelZone] = useState("city");

  // 新增：记录当前选中的导航栏 Tab 索引
  const [activeTab, setActiveTab] = useState(0);
  const c = localeCopy[lang];

  const zoneHotels = useMemo(() => {
    if (hotelZone === "city") return hotelOptions.city;
    if (hotelZone === "island") return hotelOptions.island;
    return hotelOptions.camRanh;
  }, [hotelZone]);

  // 新增：丝滑滚动到对应区域的控制函数
  const tabKeys = ["overview", "spots", "hotels", "itinerary", "tips"];
  const scrollToSection = (idx) => {
    setActiveTab(idx);
    const el = document.getElementById(`section-${tabKeys[idx]}`);
    if (el) {
      // 减去 70px 是为了防止吸顶导航栏遮挡住标题
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f7f4ef 0%, #fdfdfd 100%)",
        color: "#111827",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* 顶部风景背景头部区 */}
      <div
        style={{
          // 1. 这里的链接换成了你刚刚上传的本地图片 /bg.jpg
          backgroundImage:
            "linear-gradient(rgba(14, 45, 77, 0.3), rgba(14, 45, 77, 0.9)), url('/bg.jpg')",
          backgroundSize: "cover",

          // 2. 🌟 秘密武器：调整镜头位置！
          // 原来是 "center"，现在换成 "center 65%"
          // 意思是：横向居中，纵向把镜头稍微往下拉一点，刚好能拍到沙滩和椰子树的树冠。
          backgroundPosition: "center 65%",

          color: "#fff",
          padding: "48px 20px 32px",
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "start",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontSize: 30, fontWeight: 900 }}>{c.appTitle}</div>
              <div style={{ marginTop: 8, color: "#d6e6f5", fontSize: 14 }}>
                {c.appSub}
              </div>
            </div>
            <button
              onClick={() => setLang((v) => (v === "zh" ? "ko" : "zh"))}
              style={{
                border: "1px solid rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                borderRadius: 999,
                padding: "10px 16px",
                cursor: "pointer",
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              {lang === "zh" ? "한국어" : "中文"} · {c.toggle}
            </button>
          </div>
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap" }}>
            <Badge>7/9 晚到</Badge>
            <Badge>{lang === "zh" ? "市区 + 珍珠岛" : "시내 + 빈펄 섬"}</Badge>
            <Badge>{lang === "zh" ? "万豪优先" : "메리어트 우선"}</Badge>
            <Badge>
              {lang === "zh" ? "四岛游 / 泥浴" : "사섬투어 / 머드배스"}
            </Badge>
            <Badge>VinWonders</Badge>
          </div>
        </div>
      </div>

      {/* 🌟 新增：吸顶导航栏 */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #e8e0d4",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            display: "flex",
            gap: 24,
            padding: "0 20px",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {c.tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(idx)}
              style={{
                padding: "16px 0",
                background: "none",
                border: "none",
                borderBottom:
                  activeTab === idx
                    ? "3px solid #0e2d4d"
                    : "3px solid transparent",
                color: activeTab === idx ? "#0e2d4d" : "#6b7280",
                fontWeight: activeTab === idx ? 900 : 600,
                fontSize: 15,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: 20 }}>
        <Card>
          <div style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 6 }}>
            {c.quickTitle}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: "#334155" }}>
            {c.quickText}
          </div>
        </Card>

        {/* 锚点 0：总览区 */}
        <div id="section-overview">
          <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
            <Card accent>
              <SectionTitle title={c.overviewTitle} sub={c.overviewSub} />
              <BulletList items={c.overviewBullets} />

              {/* 直接调用我们刚写好的画廊引擎，把5张图传进去！ */}
              <ImageGallery
                images={[
                  "/view1.jpg",
                  "/view2.jpg",
                  "/view3.jpg",
                  "/view4.jpg",
                  "/view5.jpg",
                ]}
              />
            </Card>

            <SectionTitle title={c.bookingTitle} sub={c.bookingSub} />
            {actualBookings.map((b) => (
              <Card key={b.date}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div style={{ color: "#e07055", fontWeight: 900 }}>
                      {b.date}
                    </div>
                    <div
                      style={{ fontSize: 18, fontWeight: 900, marginTop: 4 }}
                    >
                      {b.name}
                    </div>
                    <div
                      style={{ marginTop: 4, color: "#6b7280", fontSize: 13 }}
                    >
                      {lang === "zh" ? b.zone.zh : b.zone.ko}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 10,
                    color: "#334155",
                    lineHeight: 1.7,
                    fontSize: 14,
                  }}
                >
                  {lang === "zh" ? b.why.zh : b.why.ko}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 锚点 1：景点攻略区 */}
        <div id="section-spots">
          <SectionTitle title={c.geoTitle} sub={c.geoSub} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            {transport.map((t) => (
              <Card key={lang === "zh" ? t.k.zh : t.k.ko}>
                <div
                  style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 8 }}
                >
                  {lang === "zh" ? t.k.zh : t.k.ko}
                </div>
                <div
                  style={{ fontSize: 14, lineHeight: 1.7, color: "#334155" }}
                >
                  {lang === "zh" ? t.v.zh : t.v.ko}
                </div>
              </Card>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <Card>
              <div
                style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 10 }}
              >
                {lang === "zh" ? "芽庄地图" : "냐짱 지도"}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#6b7280",
                  lineHeight: 1.7,
                  marginBottom: 10,
                }}
              >
                {lang === "zh"
                  ? "这张地图可以帮助你快速理解：金兰机场在南边，市区景点沿海滨大道和中心区分布，珍珠岛在海上。"
                  : "이 지도는 깜라인 공항이 남쪽에 있고, 시내 명소는 해변 도로와 중심 구역에 모여 있으며, 빈펄 섬은 바다 위에 있다는 점을 빠르게 이해하는 데 도움이 됩니다."}
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%",
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid #e8e0d4",
                }}
              >
                <iframe
                  title="Nha Trang Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=109.0800%2C12.1200%2C109.3200%2C12.3300&layer=mapnik&marker=12.2388%2C109.1967"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  color: "#6b7280",
                  lineHeight: 1.6,
                }}
              >
                {lang === "zh"
                  ? "地图中心点为芽庄市区附近，适合配合下面的酒店和景点清单使用。"
                  : "지도 중심점은 냐짱 시내 부근으로, 아래 호텔 및 명소 목록과 함께 보시면 편합니다."}
              </div>
            </Card>
          </div>

          <SectionTitle title={c.cityTitle} sub={c.citySub} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 14,
            }}
          >
            {cityHighlights.map((s) => (
              <Card key={s.en}>
                <div
                  style={{ fontWeight: 900, fontSize: 17, color: "#0e2d4d" }}
                >
                  {lang === "zh" ? s.name.zh : s.name.ko}
                </div>
                <div style={{ color: "#6b7280", fontSize: 13, marginTop: 2 }}>
                  {s.en}
                </div>
                <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.7 }}>
                  <div>
                    <strong>{lang === "zh" ? "位置：" : "위치: "}</strong>
                    {lang === "zh" ? s.where.zh : s.where.ko}
                  </div>
                  <div>
                    <strong>{lang === "zh" ? "时长：" : "소요 시간: "}</strong>
                    {lang === "zh" ? s.time.zh : s.time.ko}
                  </div>
                  <div>
                    <strong>{lang === "zh" ? "价格：" : "가격: "}</strong>
                    {lang === "zh" ? s.price.zh : s.price.ko}
                  </div>
                  <div style={{ marginTop: 6, color: "#334155" }}>
                    {lang === "zh" ? s.note.zh : s.note.ko}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <SectionTitle title={c.islandTitle} sub={c.islandSub} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 14,
            }}
          >
            {islandHighlights.map((s) => (
              <Card key={s.en}>
                <div
                  style={{ fontWeight: 900, fontSize: 17, color: "#0e2d4d" }}
                >
                  {lang === "zh" ? s.name.zh : s.name.ko}
                </div>
                <div style={{ color: "#6b7280", fontSize: 13, marginTop: 2 }}>
                  {s.en}
                </div>
                <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.7 }}>
                  <div>
                    <strong>{lang === "zh" ? "位置：" : "위치: "}</strong>
                    {lang === "zh" ? s.where.zh : s.where.ko}
                  </div>
                  <div>
                    <strong>{lang === "zh" ? "时长：" : "소요 시간: "}</strong>
                    {lang === "zh" ? s.time.zh : s.time.ko}
                  </div>
                  <div>
                    <strong>{lang === "zh" ? "价格：" : "가격: "}</strong>
                    {lang === "zh" ? s.price.zh : s.price.ko}
                  </div>
                  <div style={{ marginTop: 6, color: "#334155" }}>
                    {lang === "zh" ? s.note.zh : s.note.ko}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 锚点 2：酒店推荐区 */}
        <div id="section-hotels">
          <SectionTitle title={c.hotelTitle} sub={c.hotelSub} />
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 14,
            }}
          >
            {[
              ["city", c.buttons.city],
              ["island", c.buttons.island],
              ["camRanh", c.buttons.camRanh],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setHotelZone(key)}
                style={{
                  border: "1px solid #dbe3ea",
                  borderRadius: 999,
                  padding: "9px 14px",
                  cursor: "pointer",
                  background: hotelZone === key ? "#0e2d4d" : "#fff",
                  color: hotelZone === key ? "#fff" : "#0e2d4d",
                  fontWeight: 800,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            {zoneHotels.map((h) => (
              <HotelCard key={h.name} h={h} lang={lang} />
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <Card>
              <div
                style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 8 }}
              >
                {c.hotelAdvice}
              </div>
              <BulletList items={c.hotelAdviceItems} />
            </Card>
          </div>
        </div>

        {/* 锚点 3：旅行计划区（含美食和行程） */}
        <div id="section-itinerary">
          <SectionTitle
            title={lang === "zh" ? "必吃美食与餐厅" : "필수 맛집 및 레스토랑"}
            sub={
              lang === "zh"
                ? "从小红书与当地口碑中精选的打卡地，附招牌菜单"
                : "SNS 및 현지 리뷰 기반 엄선 맛집, 대표 메뉴 포함"
            }
          />
          <div style={{ display: "grid", gap: 14, marginBottom: 28 }}>
            {foodRecommendations.map((f, idx) => (
              <FoodCard key={idx} f={f} lang={lang} />
            ))}
          </div>

          <SectionTitle title={c.itineraryTitle} sub={c.itinerarySub} />
          <div style={{ display: "grid", gap: 14 }}>
            {itinerary.map((d) => (
              <Card
                key={d.date}
                accent={d.date === "7/11" || d.date === "7/12"}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div style={{ color: "#e07055", fontWeight: 900 }}>
                      {d.date}
                    </div>
                    <div
                      style={{ fontSize: 18, fontWeight: 900, marginTop: 4 }}
                    >
                      {lang === "zh" ? d.title.zh : d.title.ko}
                    </div>
                  </div>
                  <div style={{ color: "#0e2d4d", fontWeight: 800 }}>
                    {typeof d.hotel === "string"
                      ? d.hotel
                      : lang === "zh"
                      ? d.hotel.zh
                      : d.hotel.ko}
                  </div>
                </div>
                <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
                  {(lang === "zh" ? d.tasks.zh : d.tasks.ko).map((t, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        gap: 8,
                        alignItems: "flex-start",
                        fontSize: 14,
                        lineHeight: 1.7,
                      }}
                    >
                      <span style={{ color: "#0e2d4d", fontWeight: 900 }}>
                        •
                      </span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 锚点 4：实用提示区 */}
        <div id="section-tips">
          <SectionTitle title={c.tipsTitle} sub={c.tipsSub} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 14,
            }}
          >
            {/* 卡片 1：签证与行前准备 (融合原版 + 订房提示) */}
            <Card>
              <div
                style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 8 }}
              >
                {lang === "zh" ? "签证与行前准备" : "비자와 여행 준비"}
              </div>
              <BulletList
                items={
                  lang === "zh"
                    ? [
                        "护照有效期至少 6 个月。签证政策以出发前官方信息为准。",
                        "把酒店订单、返程票、保险都放在手机和纸质备份里。",
                        "大部分经济实惠又干净的酒店容易长期满房，务必一定要提前订好。",
                      ]
                    : [
                        "여권 유효기간은 최소 6개월 이상이어야 합니다. 비자 정책은 출발 전 공식 정보를 확인하세요.",
                        "호텔 예약, 귀국 항공권, 보험 서류는 휴대폰과 종이 모두 보관하세요.",
                        "가성비 좋고 깨끗한 호텔은 금방 만실이 되니 반드시 미리 예약하세요.",
                      ]
                }
              />
            </Card>

            {/* 卡片 2：天气与交通出行 (融合原版 + 交通避雷) */}
            <Card>
              <div
                style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 8 }}
              >
                {lang === "zh" ? "天气与交通出行" : "날씨와 교통 이동"}
              </div>
              <BulletList
                items={
                  lang === "zh"
                    ? [
                        "7 月很热，防晒霜、帽子、太阳镜必带；带一双好走的鞋，教堂和市场都需要步行。",
                        "市区赶时间不要打车坐公交，高峰期极度拥堵，优选摩托车 (Grab Bike)。",
                        "在越南自己骑摩托车必须带好安全帽，否则会被警察重罚款。",
                      ]
                    : [
                        "7월은 매우 더우니 선크림, 모자, 선글라스가 필수입니다. 걷기 편한 신발을 챙기세요.",
                        "출퇴근 시간 시내는 매우 막히므로 급할 때는 오토바이(Grab Bike)가 낫습니다.",
                        "직접 오토바이를 운전할 경우 헬멧을 쓰지 않으면 경찰에게 큰 벌금을 뭅니다.",
                      ]
                }
              />
            </Card>

            {/* 卡片 3：饮食与水果避坑 (全新整理) */}
            <Card>
              <div
                style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 8 }}
              >
                {lang === "zh" ? "饮食与水果避坑" : "음식 및 과일 주의사항"}
              </div>
              <BulletList
                items={
                  lang === "zh"
                    ? [
                        "不要在Grab上买鲜切水果（贵且不熟）；不要轻易尝试没见过的鲜艳水果。",
                        "酒店严禁带榴莲入内，违规会被罚款，买完务必在外面吃完。",
                        "千万别大口吃本地辣椒，辣度极高；很多餐厅不提供纸巾，一定随身携带。",
                        "看不懂菜单别乱点，最稳妥就是看别人吃什么，指着要一份一样的。",
                      ]
                    : [
                        "Grab에서 파는 컷팅 과일은 비싸고 덜 익은 경우가 많습니다. 낯선 화려한 과일은 피하세요.",
                        "호텔 내 두리안 반입은 금지(위반 시 벌금)되니 밖에서 다 드시고 들어가야 합니다.",
                        "현지 고추는 상상 이상으로 맵습니다. 식당은 대부분 티슈를 주지 않으니 꼭 챙기세요.",
                        "메뉴를 모를 때는 다른 테이블의 음식을 가리켜 주문하는 것이 가장 안전합니다.",
                      ]
                }
              />
            </Card>

            {/* 卡片 4：消费与支付避雷 (全新整理) */}
            <Card>
              <div
                style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 8 }}
              >
                {lang === "zh" ? "消费与支付避雷" : "결제 및 쇼핑 주의사항"}
              </div>
              <BulletList
                items={
                  lang === "zh"
                    ? [
                        "一定要带现金！很多小店不刷卡也不收美金。机场出来用VISA卡在ATM取现最稳，别找私人换钱防被骗。",
                        "别买特产（尤其是翡翠玉石），不买药店保健品和纪念品店的纪念品。",
                        "进按摩店一定要提前问好价格，越南没有小费习惯。街头的主动搭讪绝大多数是付费套路，轻易别理会。",
                        "不要特意去订制奥黛，很挑人穿，直接租一套体验就行。",
                      ]
                    : [
                        "카드나 달러를 안 받는 곳이 많으니 베트남 동 현금을 꼭 챙기세요. 공항 ATM에서 VISA 카드로 인출하는 것이 좋으며, 개인 환전은 피하세요.",
                        "약국의 영양제나 옥/비취 같은 특산품은 절대 사지 마세요.",
                        "베트남은 팁 문화가 없으니 마사지 샵 입장 전 꼭 총가격을 확인하세요. 길거리의 호객 행위는 무시하는 것이 좋습니다.",
                        "아오자이는 맞춤 제작보다 대여를 강력히 추천합니다.",
                      ]
                }
              />
            </Card>

            {/* 卡片 5：游玩与体验排雷 (融合原版 + 游玩避坑) */}
            <Card>
              <div
                style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 8 }}
              >
                {lang === "zh" ? "游玩与体验排雷" : "액티비티 및 투어 예약"}
              </div>
              <BulletList
                items={
                  lang === "zh"
                    ? [
                        "先锁酒店，再订乐园/四岛游；包船尽量找大平台代订，减少踩坑。",
                        "想好好体验潜水强烈推荐去“黑岛（Hon Mun）”，水质更清，别参加普通四岛游；没经验实力千万别试海钓，又晒又钓不到。",
                        "景点一定要按预约时间进，提前或延迟都进不去；网红餐厅一直排队，请合理安排时间。",
                      ]
                    : [
                        "먼저 호텔을 확정하고 테마파크/투어를 예약하세요. 프라이빗 보트는 대형 플랫폼을 이용하세요.",
                        "스쿠버다이빙은 수질이 좋은 '혼문섬(Hon Mun)'을 추천하며 일반 사섬투어는 피하세요. 초보자의 바다낚시는 비추천합니다.",
                        "관광지는 예약 시간을 엄수해야 하며, 유명 식당은 대기가 기니 시간을 잘 배분하세요.",
                      ]
                }
              />
            </Card>

            {/* 卡片 6：最后一晚建议 (完美保留原版) */}
            <Card>
              <div
                style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 8 }}
              >
                {lang === "zh" ? "最后一晚建议" : "마지막 밤 추천"}
              </div>
              <BulletList
                items={
                  lang === "zh"
                    ? [
                        "如果 7/16 是早航班，最后一晚最好住金兰机场方向酒店。",
                        "如果 7/16 航班较晚，最后一晚继续住市区更方便补逛。",
                        "这一晚不要再折腾太远的点，尽量减少变动风险。",
                      ]
                    : [
                        "7/16에 이른 비행편이라면 마지막 밤은 깜라인 쪽이 좋습니다.",
                        "7/16 비행편이 늦다면 시내에 계속 머물며 추가로 둘러보세요.",
                        "마지막 밤에는 너무 멀리 이동하지 않는 것이 좋습니다.",
                      ]
                }
              />
            </Card>
          </div>
        </div>

        <div
          style={{
            marginTop: 22,
            color: "#6b7280",
            fontSize: 12,
            lineHeight: 1.8,
          }}
        >
          <div style={{ marginBottom: 6, fontWeight: 700, color: "#334155" }}>
            {c.quickTitle}
          </div>
          <div>{c.quickText}</div>
          <div style={{ marginTop: 6 }}>{c.note}</div>
        </div>
      </div>
    </div>
  );
}
