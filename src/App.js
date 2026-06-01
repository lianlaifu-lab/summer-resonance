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
      "你们的酒店顺序本身是合理的：先住金兰海湾，减少晚到当天折腾；再上竹岛住一晚，把 VinWonders 和海滩体验一次做透；最后回芽庄市区收尾，方便吃海鲜、逛夜市、看教堂和泥浴。",
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
    </Card>
  );
}

export default function App() {
  const [lang, setLang] = useState("zh");
  const [hotelZone, setHotelZone] = useState("city");
  const c = localeCopy[lang];

  const zoneHotels = useMemo(() => {
    if (hotelZone === "city") return hotelOptions.city;
    if (hotelZone === "island") return hotelOptions.island;
    return hotelOptions.camRanh;
  }, [hotelZone]);

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
      <div
        style={{
          background: "linear-gradient(180deg, #0e2d4d 0%, #1b5a87 100%)",
          color: "#fff",
          padding: "28px 20px 22px",
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

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: 20 }}>
        <Card>
          <div style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 6 }}>
            {c.quickTitle}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: "#334155" }}>
            {c.quickText}
          </div>
        </Card>

        <div style={{ display: "grid", gap: 14 }}>
          <Card accent>
            <SectionTitle title={c.overviewTitle} sub={c.overviewSub} />
            <BulletList items={c.overviewBullets} />
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
                  <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4 }}>
                    {b.name}
                  </div>
                  <div style={{ marginTop: 4, color: "#6b7280", fontSize: 13 }}>
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
              <div style={{ fontSize: 14, lineHeight: 1.7, color: "#334155" }}>
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
              <div style={{ fontWeight: 900, fontSize: 17, color: "#0e2d4d" }}>
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
              <div style={{ fontWeight: 900, fontSize: 17, color: "#0e2d4d" }}>
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
            <div style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 8 }}>
              {c.hotelAdvice}
            </div>
            <BulletList items={c.hotelAdviceItems} />
          </Card>
        </div>

        <SectionTitle title={c.itineraryTitle} sub={c.itinerarySub} />
        <div style={{ display: "grid", gap: 14 }}>
          {itinerary.map((d) => (
            <Card key={d.date} accent={d.date === "7/11" || d.date === "7/12"}>
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
                  <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4 }}>
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
                    <span style={{ color: "#0e2d4d", fontWeight: 900 }}>•</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <SectionTitle title={c.tipsTitle} sub={c.tipsSub} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 14,
          }}
        >
          <Card>
            <div style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 8 }}>
              {lang === "zh" ? "签证与证件" : "비자와 서류"}
            </div>
            <BulletList
              items={
                lang === "zh"
                  ? [
                      "护照有效期至少 6 个月。",
                      "越南签证政策请以出发前官方信息为准，不要只看攻略旧文。",
                      "把酒店订单、返程票、保险都放在手机和纸质备份里。",
                    ]
                  : [
                      "여권 유효기간은 최소 6개월 이상이어야 합니다.",
                      "베트남 비자 정책은 출발 전 공식 정보를 기준으로 확인하세요.",
                      "호텔 예약, 귀국 항공권, 보험 서류는 휴대폰과 종이 모두 보관하세요.",
                    ]
              }
            />
          </Card>
          <Card>
            <div style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 8 }}>
              {lang === "zh" ? "天气和装备" : "날씨와 준비물"}
            </div>
            <BulletList
              items={
                lang === "zh"
                  ? [
                      "7 月很热，防晒霜、帽子、太阳镜一定要带足。",
                      "四岛游和海边活动建议准备一套干衣服。",
                      "带一双好走的鞋，教堂、寺庙、市场都需要步行。",
                    ]
                  : [
                      "7월은 매우 덥기 때문에 선크림, 모자, 선글라스가 필수입니다.",
                      "사섬투어와 해변 일정에는 마른 옷 한 세트를 준비하세요.",
                      "성당, 사원, 시장을 걸어다닐 수 있는 편한 신발을 가져가세요.",
                    ]
              }
            />
          </Card>
          <Card>
            <div style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 8 }}>
              {lang === "zh" ? "预订顺序" : "예약 순서"}
            </div>
            <BulletList
              items={
                lang === "zh"
                  ? [
                      "先锁酒店，再订 VinWonders 和四岛游。",
                      "热门日期尽量提前订可退改产品。",
                      "包船和私家车尽量找酒店/大平台代订，减少踩坑。",
                    ]
                  : [
                      "먼저 호텔을 확정한 뒤 VinWonders와 사섬투어를 예약하세요.",
                      "인기 날짜는 취소·변경 가능한 상품을 미리 잡는 것이 좋습니다.",
                      "전세 보트나 프라이빗 차량은 호텔 또는 대형 플랫폼을 통해 예약하는 것이 안전합니다.",
                    ]
              }
            />
          </Card>
          <Card>
            <div style={{ fontWeight: 900, color: "#0e2d4d", marginBottom: 8 }}>
              {lang === "zh" ? "最后一晚建议" : "마지막 밤 추천"}
            </div>
            <BulletList
              items={
                lang === "zh"
                  ? [
                      "如果 7/16 是早航班，最后一晚最好住金兰方向。",
                      "如果 7/16 航班晚，最后一晚继续住市区更方便补逛。",
                      "这一晚不要再折腾太远的点，减少变动风险。",
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
