import { useMemo, useState, useEffect } from "react";

const localeCopy = {
  zh: {
    appTitle: "芽庄（Nha Trang）旅游全攻略",
    appSub: "一键中/韩翻译 · 情侣出行 · 7月9日–16日 · 市区 + 珍珠岛",
    toggle: "切换为韩语",
    tabs: ["总览", "景点攻略", "酒店日程", "旅行计划", "实用提示"],
    overviewTitle: "这趟行程的核心逻辑",
    overviewSub: "把 7 晚切成 3 个节奏：机场缓冲、岛上深玩、城市收尾。",
    overviewBullets: [
      "酒店顺序本身是合理的：先住金兰海湾，减少晚到当天折腾；再上竹岛住一晚，把 VinWonders 和海滩体验一次做透；最后回芽庄市区收尾，方便吃海鲜、逛夜市、看教堂和泥浴。",
      "芽庄市区景点很集中，陈富海滩一线、占婆塔片区、教堂/大坝市场/龙山寺这几组点都适合按区域串联，不需要每天跨很远。",
      "7 月属于旺季，海边、缆车、热门酒店和一日游通常都要提前订，尤其是万豪系和珍珠岛相关产品。",
    ],
    geoTitle: "地理位置与交通",
    geoSub: "先搞清楚芽庄怎么分布，后面就不会乱。",
    cityTitle: "市区景点",
    citySub: "适合和酒店、海滩、夜市穿插安排。",
    islandTitle: "海上与岛上玩法",
    islandSub: "芽庄最值钱的就是海上活动。",
    hotelTitle: "酒店日程与深度攻略",
    hotelSub:
      "按时间顺序排布的入住清单，附带真实的硬件、餐饮、周边与钛金会员权益剖析。",
    itineraryTitle: "逐日行程",
    itinerarySub: "按你们已订酒店排出来的可执行版本。",
    foodTitle: "必吃美食与餐厅",
    foodSub: "海鲜自助、本地海鲜、越南小吃、咖啡甜品推荐。",
    tipsTitle: "实用提示",
    tipsSub: "这些会直接影响体验和可行性。",
    note: "说明：此文件为单文件 React 组件。结合了小红书滑动相册与动态滚动监听，是一套极其完善的定制旅行 App 级网页。",
    quickTitle: "一键韩语翻译说明",
    quickText:
      "点击顶部按钮即可把整页切换为韩语版本；中文与韩语使用同一套结构，便于核对与修改。",
  },
  ko: {
    appTitle: "냐짱(Nha Trang) 여행 완전 가이드",
    appSub:
      "원클릭 중/한 번역 · 커플 여행 · 7월 9일–16일 · 시내 + 빈펄 아일랜드",
    toggle: "중국어로 전환",
    tabs: ["전체", "명소 가이드", "호텔 일정", "일정", "실용 팁"],
    overviewTitle: "이번 여행의 핵심 구조",
    overviewSub:
      "7박을 3가지 리듬으로 나눕니다: 공항 완충, 섬에서의 깊은 체류, 시내 마무리.",
    overviewBullets: [
      "예약한 호텔 순서 자체가 합리적입니다. 먼저 깜라인 해변 쪽에 머물며 늦은 도착의 피로를 줄이고, 그다음 혼쩨(Hon Tre) 섬에서 1박하며 VinWonders와 해변을 충분히 즐긴 뒤, 마지막에는 냐짱 시내에서 해산물, 야시장, 성당, 머드배스를 편하게 즐길 수 있습니다.",
      "냐짱 시내의 주요 명소는 매우 가까운 편입니다. 쩐푸 해변, 포나가르 참탑, 성당/담시장/롱선사 구역은 지역별로 묶어 다니면 효율적입니다.",
      "7월은 성수기이므로 해변 액티비티, 케이블카, 인기 호텔, 일일 투어는 미리 예약하는 편이 좋습니다.",
    ],
    geoTitle: "위치와 교통",
    geoSub: "냐짱의 구성을 먼저 이해하면 일정이 훨씬 쉬워집니다.",
    cityTitle: "도심 명소",
    citySub: "호텔, 해변, 야시장과 함께 묶어 다니기 좋습니다.",
    islandTitle: "바다와 섬 액티비티",
    islandSub: "냐짱의 핵심은 역시 해상 체험입니다.",
    hotelTitle: "호텔 일정 및 상세 가이드",
    hotelSub:
      "시간 순서대로 배열된 숙박 목록과 하드웨어, 식음료, 멤버십 혜택에 대한 실제 분석입니다.",
    itineraryTitle: "일자별 일정",
    itinerarySub: "이미 예약한 호텔 흐름에 맞춘 실행 가능한 버전입니다.",
    tipsTitle: "실용 팁",
    tipsSub: "체감 만족도와 일정 실현 가능성에 직접 영향을 줍니다.",
    note: "안내: 이 파일은 단일 React 컴포넌트로 구성된 맞춤형 여행 앱 수준의 웹페이지입니다.",
    quickTitle: "원클릭 한국어 번역 안내",
    quickText:
      "상단 버튼을 누르면 전체 페이지가 한국어로 전환됩니다. 중국어/한국어는 같은 구조를 사용해 확인과 수정이 쉽습니다.",
  },
};

const hotelItineraryList = [
  {
    date: "7/9 - 7/10 (第 1 晚)",
    name: "Wyndham Grand KN Paradise Cam Ranh",
    brand: {
      zh: "温德姆至尊 (Wyndham Grand) · 大型高尔夫度假村",
      ko: "윈덤 그랜드 · 대형 골프 리조트",
    },
    price: "约 300-600 元/晚",
    hardware: {
      zh: "2018年开业。占地极大的高尔夫度假村，拥有27洞球场和私人海滩俱乐部，硬件宏伟且极新。",
      ko: "2018년 오픈. 27홀 골프장과 전용 비치 클럽을 갖춘 초대형 리조트로 시설이 웅장하고 새롭습니다.",
    },
    service: {
      zh: "标准五星服务。因占地面积过大，出行高度依赖电瓶车 (Buggy)，旺季可能需要等待 10-15 分钟。",
      ko: "표준 5성급 서비스. 부지가 너무 넓어 버기카(Buggy)에 크게 의존하며, 성수기엔 10~15분 대기가 발생할 수 있습니다.",
    },
    meals: {
      zh: "自助早餐丰盛，涵盖东西方菜系。由于周边点不到外卖，第一晚落地后建议直接在房间内或酒店餐厅解决宵夜。",
      ko: "조식 뷔페가 매우 풍성합니다. 주변 배달이 불가하므로 첫날 도착 후에는 호텔 내에서 식사를 해결하는 것을 추천합니다.",
    },
    traffic: {
      zh: "距金兰机场仅 10-15 分钟车程，作为晚航班落地缓冲是完美的战略选择；距芽庄市区较远，约 45-60 分钟。",
      ko: "깜라인 공항에서 10~15분 거리로 늦은 밤 도착 시 완충용으로 완벽한 전략적 위치입니다. 냐짱 시내까지는 45~60분 소요.",
    },
    commerce: {
      zh: "彻底的“荒郊野外”，周边为高尔夫球场和荒地，【完全没有便利店】。务必在机场先买好水和零食。",
      ko: "주변은 골프장과 공터뿐이며 【편의점이 전혀 없습니다】. 공항에서 미리 간식과 물을 사오는 것이 필수입니다.",
    },
    benefits: {
      zh: "非万豪系。温德姆会员视房态可享延迟退房。作为第一晚主要用于洗漱补觉，无需强求高级权益，安心休息即可。",
      ko: "메리어트 계열 아님. 윈덤 회원은 상황에 따라 레잇 체크아웃 가능. 첫날 밤은 휴식과 수면이 목적이므로 혜택 부담이 적습니다.",
    },
  },
  {
    date: "7/10 - 7/11 (第 2 晚)",
    name: "The Westin Resort & Spa Cam Ranh",
    brand: {
      zh: "万豪高级 (Premium) · 威斯汀",
      ko: "메리어트 프리미엄 · 웨스틴",
    },
    price: "约 600-1000 元/晚",
    hardware: {
      zh: "【2024年全新开业】主打健康与焕活体验，全配标志性“天梦之床”，设施极新，审美在线且极具度假感。",
      ko: "【2024년 신규 오픈】 웰빙과 리프레시를 강조하며, 시그니처 '헤븐리 베드'를 갖춘 최신식 고급 시설입니다.",
    },
    service: {
      zh: "新开业酒店员工热情极高，服务响应快，整体营造出极其放松且现代的海滨度假氛围。",
      ko: "신규 호텔다운 열정적인 서비스와 빠른 응대로, 완벽하고 현대적인 해변 휴양 분위기를 제공합니다.",
    },
    meals: {
      zh: "主打 Eat Well 菜单，健康早餐备受好评；酒店内的海鲜餐厅水准很高，非常适合海滨晚餐。",
      ko: "Eat Well 웰빙 조식이 호평을 받으며, 호텔 내 해산물 레스토랑의 수준이 높아 해변 저녁 식사로 제격입니다.",
    },
    traffic: {
      zh: "位于金兰海湾度假村地带核心，打车或呼叫 Grab 前往机场约 15 分钟，去芽庄市区约 40 分钟。",
      ko: "깜라인 해변 리조트 단지 핵심에 위치하며, 공항까지 15분, 시내까지 40분 정도 소요됩니다.",
    },
    commerce: {
      zh: "同属金兰海湾，周边依然缺乏独立商业区和便利店，消费基本需要在酒店内完成。",
      ko: "마찬가지로 깜라인 해변이라 독립적인 상권이나 편의점이 없어 소비는 주로 호텔 내에서 이루어집니다.",
    },
    benefits: {
      zh: "钛金待遇极佳：极大概率直升带私人泳池的别墅或绝美尊贵海景房；含双早；无传统酒廊。配合 4PM 延迟退房，情侣度假感直接拉满。",
      ko: "티타늄 혜택 최고: 풀빌라 또는 프리미엄 오션뷰 룸으로 업그레이드될 확률이 높습니다. 2인 조식 제공(라운지 없음). 4PM 레잇 체크아웃과 최고의 조합입니다.",
    },
  },
  {
    date: "7/11 - 7/12 (第 3 晚)",
    name: "Nha Trang Marriott Resort & Spa, Hon Tre Island",
    brand: { zh: "万豪 (Marriott) · 经典奢华", ko: "메리어트 · 클래식 럭셔리" },
    price: "约 800-1300 元/晚",
    hardware: {
      zh: "前身是著名的珍珠岛度假村，翻牌万豪。拥有经典的法式与东南亚融合建筑、超大室外泳池与极佳的私家沙滩。",
      ko: "구 빈펄 리조트를 메리어트로 리브랜딩. 클래식한 프렌치/동남아 건축 양식에 초대형 야외 수영장과 훌륭한 전용 해변을 갖춤.",
    },
    service: {
      zh: "经过万豪标准化培训，服务专业。岛上区域极其宽广，进出房间及前往沙滩均可随时呼叫 Buggy 接送。",
      ko: "메리어트 표준 교육을 받은 전문 서비스. 섬 내부 이동 시 언제든 버기카를 호출할 수 있습니다.",
    },
    meals: {
      zh: "酒店内自助餐非常丰盛（晚餐约 80万越南盾/人）。也可选择去连通的 VinWonders 乐园内吃快餐。",
      ko: "호텔 내 조식/석식 뷔페가 매우 풍성합니다(인당 약 800k VND). VinWonders 테마파크 내 패스트푸드도 가능.",
    },
    traffic: {
      zh: "进出需乘坐 24 小时免费快艇或跨海缆车上岛；上岛后去乐园等地方主要依赖酒店专属 Buggy。",
      ko: "24시간 무료 스피드보트나 케이블카로 섬에 진출입하며, 섬 내부에서는 주로 호텔 전용 버기카로 이동합니다.",
    },
    commerce: {
      zh: "岛上绝对封闭，【完全没有便利店】。强烈建议在进岛前，于市区买好足够的饮用水、零食和泡面带上岛。",
      ko: "섬 내부가 완전히 독립되어 있어 【편의점이 전혀 없습니다】. 입도 전 시내에서 물, 간식, 컵라면을 넉넉히 사오는 것을 강력 추천합니다.",
    },
    benefits: {
      zh: "钛金厚道：大概率升海景套房或独栋别墅；通常配有酒廊待遇。最关键的是 4PM 延迟退房，等于在岛上免费多赚大半天乐园时间！",
      ko: "티타늄 혜택 우수: 오션뷰 스위트나 풀빌라 업그레이드 확률이 높으며 보통 라운지 혜택이 제공됩니다. 4PM 레잇 체크아웃으로 섬을 반나절 더 즐길 수 있는 것이 핵심!",
    },
  },
  {
    date: "7/12 - 7/13 (第 4 晚)",
    name: "Four Points by Sheraton Nha Trang",
    brand: {
      zh: "万豪精选 (Select) · 福朋喜来登",
      ko: "메리어트 셀렉트 · 포포인츠 바이 쉐라톤",
    },
    price: "约 450-800 元/晚",
    hardware: {
      zh: "2020年开业的高层现代地标建筑，客房极具现代感，顶楼的无边泳池和玻璃健身房视野极其震撼。",
      ko: "2020년 오픈한 고층 현대식 랜드마크. 객실이 모던하며, 루프탑 인피니티 풀과 유리 피트니스 센터의 전망이 압도적입니다.",
    },
    service: {
      zh: "高效、年轻且快捷。兼顾商务与城市休闲，前台办理入住与退房的速度在当地评价较高。",
      ko: "효율적이고 젊은 감각. 비즈니스와 휴양을 겸비했으며, 프런트 데스크의 빠른 일처리가 좋은 평가를 받습니다.",
    },
    meals: {
      zh: "自助早餐性价比极高，种类丰富；顶楼的高空酒吧 (Altitude) 是芽庄极具人气的夜生活打卡地。",
      ko: "조식 뷔페의 가성비가 아주 훌륭합니다. 최상층 루프탑 바(Altitude)는 냐짱에서 매우 인기 있는 야간 명소입니다.",
    },
    traffic: {
      zh: "位于市区陈富海滩偏北侧，打车随叫随到，去著名景点“婆那加占婆塔”比市中心其他酒店更近。",
      ko: "시내 쩐푸 해변 북쪽에 위치하며 택시 잡기가 아주 쉽습니다. 유명 명소인 '포나가르 참탑'과 더 가깝습니다.",
    },
    commerce: {
      zh: "极其便利。楼下左转就是便利店和咖啡馆；晚餐可以直接溜达到著名的“清霜海鲜”吃平价大排档。",
      ko: "아주 편리합니다. 1층 바로 옆에 편의점과 카페가 있으며, 저녁엔 유명 가성비 식당 '탄스엉 해산물'에 걸어갈 수 있습니다.",
    },
    benefits: {
      zh: "钛金通常会升级至高空全海景房或角房（该店套房极少）；含双人早餐及 4PM 延迟退房。注意该店无行政酒廊。",
      ko: "티타늄은 보통 고층 풀 오션뷰 룸이나 코너룸으로 업그레이드됩니다(스위트룸 수량 적음). 2인 조식 및 4PM 레잇 체크아웃. 라운지는 없습니다.",
    },
  },
  {
    date: "7/13 - 7/14 (第 5 晚)",
    name: "Sheraton Nha Trang Hotel & Spa",
    brand: {
      zh: "万豪高级 (Premium) · 喜来登",
      ko: "메리어트 프리미엄 · 쉐라톤",
    },
    price: "约 700-1000 元/晚",
    hardware: {
      zh: "2010年开业的芽庄老牌重磅地标。虽部分客房有年代感，但保养极佳，大堂与公共区域尽显经典五星奢华。",
      ko: "2010년 오픈한 냐짱의 대표적인 클래식 랜드마크. 객실에 연식이 조금 있지만 관리가 훌륭하며 로비는 5성급의 고급스러움을 풍깁니다.",
    },
    service: {
      zh: "员工服务极其老道、专业，门童和礼宾部对周边的熟悉度极高，真正做到“有求必应”。",
      ko: "직원들의 서비스가 매우 노련하고 전문적입니다. 컨시어지가 주변 정보에 밝아 완벽한 응대를 제공합니다.",
    },
    meals: {
      zh: "自助早餐极其丰盛（当地水准Top级别）；一楼的海鲜自助晚餐口碑极高；酒廊热食能直接当正餐。",
      ko: "조식 뷔페가 현지 최고 수준으로 풍성합니다. 1층 해산물 뷔페의 평가가 높고, 라운지 핫푸드도 정식 식사로 손색이 없습니다.",
    },
    traffic: {
      zh: "霸占芽庄市区最核心的十字路口！下楼过一条马路即是专属私人沙滩区，打车去夜市和大坝市场都在起步价内。",
      ko: "냐짱 시내 가장 중심 사거리를 차지합니다! 길 하나 건너면 전용 해변이며, 야시장 및 담 시장까지 택시 기본요금입니다.",
    },
    commerce: {
      zh: "极度繁华。被各种便利店、网红咖啡厅、按摩店和小吃街 360 度包围，晚上下楼闭眼逛即可。",
      ko: "극도로 번화함. 편의점, 유명 카페, 마사지 샵, 먹자골목에 360도로 둘러싸여 있어 밤에 걷기만 해도 좋습니다.",
    },
    benefits: {
      zh: "极其厚道：钛金大概率升套或高层海景；包含极佳的行政酒廊待遇（下午茶+晚间欢乐时光），含双早，完美适配 4PM 退房。",
      ko: "티타늄 업그레이드(스위트 또는 고층 오션뷰)가 매우 후합니다. 퀄리티 높은 클럽 라운지(해피아워)가 제공되며 4PM 레잇 체크아웃과 최고의 조합입니다.",
    },
  },
  {
    date: "7/14 - 7/15 (最后一晚)",
    name: "Wyndham Grand KN Paradise Cam Ranh",
    brand: {
      zh: "温德姆至尊 (Wyndham Grand) · 大型高尔夫度假村",
      ko: "윈덤 그랜드 · 대형 골프 리조트",
    },
    price: "约 300-600 元/晚",
    hardware: {
      zh: "再次回到此酒店，享受宽敞的客房与完善的高尔夫/海滨硬件设施，给长途行程收尾。",
      ko: "다시 이 호텔로 돌아와 넓은 객실과 해변/골프 시설을 즐기며 긴 일정을 마무리합니다.",
    },
    service: {
      zh: "有了第一晚的经验，这次更能熟练运用 Buggy 和酒店各项服务时间表。",
      ko: "첫날의 경험을 바탕으로 버기카 및 호텔 서비스 시간을 더 효율적으로 이용할 수 있습니다.",
    },
    meals: {
      zh: "依然建议在度假村内用餐。或在离开芽庄市区前，先饱餐一顿海鲜大餐，并采购好晚上的零食带来。",
      ko: "여전히 리조트 내 식사를 권장하며, 시내에서 출발하기 전에 해산물을 든든히 먹고 간식을 사오는 것이 좋습니다.",
    },
    traffic: {
      zh: "战略意义极大：这里距离金兰机场仅十几分钟！能最大限度保证返程当天的从容，绝对避免市区堵车误机的风险。",
      ko: "전략적으로 아주 중요한 위치: 깜라인 공항까지 불과 10여 분! 귀국 당일 시내 교통체증 위험 없이 여유롭게 출발할 수 있습니다.",
    },
    commerce: {
      zh: "此时已经不需要购物，安静的荒郊环境正好适合整理行李、收拾心情。",
      ko: "이제 쇼핑은 필요 없으므로, 조용한 외곽 환경에서 짐을 정리하고 마음을 차분히 하기에 딱 좋습니다.",
    },
    benefits: {
      zh: "作为回国前的缓冲站，重点在于高效休息和极短的送机距离，抛开高级会员执念，安心踏上归途。",
      ko: "귀국 전 완충지로서 편안한 휴식과 짧은 공항 이동거리에 초점을 맞춥니다. 멤버십 혜택에 얽매이지 않고 편안히 귀국길에 오르세요.",
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
    img: "/p1.png", // 👈 替换为你的 p1 图
    where: { zh: "芽庄市区以北，丐河北岸", ko: "냐짱 북쪽, 까이 강 북단" },
    time: { zh: "1 - 1.5 小时", ko: "1 ~ 1.5시간" },
    price: { zh: "约 30,000 VND", ko: "약 30,000 VND" },
    note: {
      zh: "建于公元7-12世纪的印度教遗址，供奉占婆女神。不仅有着“小吴哥窟”般的深厚历史底蕴，经典的红砖塔身配上蓝天极具异域风情。建议下午 4 点左右光线最柔和时去，最适合拍高质感的双人合影。",
      ko: "7~12세기에 지어진 힌두교 건축물로 '작은 앙코르와트'라 불리며, 참파 왕국의 여신을 모십니다. 붉은 벽돌이 이국적인 분위기를 냅니다. 오후 4시경 부드러운 빛일 때 인생 커플 사진을 찍는 것을 추천합니다.",
    },
  },
  {
    name: { zh: "钟屿石岬角 / 五指岩", ko: "혼쫑 / 오지암" },
    en: "Hon Chong Promontory",
    img: "/p2.png", // 👈 替换为你的 p2 图
    where: { zh: "占婆塔向北，海岸线旁", ko: "참탑 북쪽의 해안가" },
    time: { zh: "45 分钟 - 1 小时", ko: "45분 ~ 1시간" },
    price: { zh: "约 30,000 VND", ko: "약 30,000 VND" },
    note: {
      zh: "法国经典电影《情人》的取景地。巨大的花岗岩交错延伸入海，自带电影浪漫感。全网最推荐的隐藏玩法：不要光看石头，一定要在岩石旁的滴漏咖啡馆，点一杯当地冰咖啡（Cà phê sữa đá），吹海风看日落，极其惬意。",
      ko: "프랑스 영화 '연인'의 촬영지입니다. 거대한 화강암이 바다로 이어지는 영화 같은 풍경이 특징입니다. 바위 옆 카페에서 베트남 연유 커피(Cà phê sữa đá)를 마시며 바닷바람과 일몰을 즐기는 것이 최고의 포인트입니다.",
    },
  },
  {
    name: { zh: "芽庄大教堂", ko: "냐짱 대성당" },
    en: "Nha Trang Cathedral",
    img: "/p3.png", // 👈 替换为你的 p3 图
    where: { zh: "市中心十字路口，近火车站", ko: "시내 중심, 기차역 근처" },
    time: { zh: "30 - 45 分钟", ko: "30 ~ 45분" },
    price: {
      zh: "免费（遇门口骗子勿给钱，可自愿捐赠）",
      ko: "무료 (입구에서 돈을 요구하는 사기꾼 주의, 자율 기부)",
    },
    note: {
      zh: "建于1928年的纯石头法式哥特建筑。拥有极美的玫瑰玻璃窗，阳光透过时色彩斑斓，建筑本身极具历史庄严感。注意：这是神圣的宗教场所，男士也请务必注意穿着，不要穿背心和不过膝的短裤。",
      ko: "1928년에 지어진 100% 돌로 된 프랑스 고딕 양식 건축물입니다. 아름다운 스테인드글라스 창문이 포인트입니다. 신성한 종교 시설이므로 남성도 민소매나 무릎 위 반바지 등 노출이 심한 옷은 피해야 합니다.",
    },
  },
  {
    name: { zh: "龙山寺", ko: "롱선사" },
    en: "Long Son Pagoda",
    img: "/p4.jpg", // 👈 注意：这里是 .jpg！
    where: { zh: "市中心偏西侧", ko: "시내 중심 서쪽" },
    time: { zh: "45 - 60 分钟", ko: "45 ~ 60분" },
    price: { zh: "免费", ko: "무료" },
    note: {
      zh: "芽庄最大的佛教寺庙。爬上150级台阶后，能近距离仰望标志性的 24 米高白色大佛，并俯瞰整个芽庄市区的全景。寺庙安静祥和，树木葱郁，很适合傍晚来散步消食。",
      ko: "냐짱에서 가장 큰 불교 사원입니다. 150개의 계단을 오르면 24m 높이의 거대한 백불상과 냐짱 시내 전경을 한눈에 볼 수 있습니다. 조용하고 평화로워 해 질 무렵 산책하기 좋습니다.",
    },
  },
  {
    name: { zh: "大坝市场", ko: "담 시장" },
    en: "Dam Market",
    img: "/p5.png", // 👈 替换为你的 p5 图
    where: { zh: "市中心", ko: "시내 중심" },
    time: { zh: "1 小时左右", ko: "약 1시간" },
    price: { zh: "免费入场", ko: "입장 무료" },
    note: {
      zh: "芽庄规模最大的传统市场，环形建筑十分醒目。里面能体验到最浓郁的越南市井气息，是买伴手礼（咖啡豆、腰果、夏威夷果、果干）的绝佳去处。避雷提示：买东西一定要狠狠砍价，至少按对半砍！",
      ko: "냐짱 최대 규모의 전통 시장으로 원형 건물이 독특합니다. 현지 분위기를 물씬 느낄 수 있으며 커피, 캐슈넛, 건과일 등 기념품을 사기 좋습니다. 주의: 물건을 살 때는 반드시 흥정하세요(반값부터 시작)!",
    },
  },
  {
    name: { zh: "泥浴体验 (I-Resort)", ko: "머드배스 (I-Resort)" },
    en: "I-Resort Mineral Hot Springs",
    img: "/p6.png", // 👈 替换为你的 p6 图
    where: { zh: "市区以北，距离中心约 7km", ko: "시내 북쪽, 중심에서 약 7km" },
    time: { zh: "2.5 - 3 小时", ko: "2.5 ~ 3시간" },
    price: {
      zh: "基础双人私密泥浴约 350,000 VND/人",
      ko: "프라이빗 2인 머드배스 약 350,000 VND/1인",
    },
    note: {
      zh: "芽庄最具特色的理疗项目！富含矿物质的泥浆对皮肤极好且非常解乏。相比老牌塔巴泥浴，小红书更推荐 I-Resort，环境更高级、干净，有热带雨林感。两人泡完私密池后再游个泳，满血复活。",
      ko: "냐짱의 명물인 미네랄 머드배스로 피부 미용과 피로 회복에 탁월합니다. I-Resort는 열대우림 분위기의 더 고급스럽고 깨끗한 환경을 제공합니다. 프라이빗 탕에서 피로를 풀고 수영장까지 즐기면 완벽합니다.",
    },
  },
];

const islandHighlights = [
  {
    name: { zh: "黑岛 / 木岛 潜水", ko: "혼문 섬 (Hon Mun) 다이빙" },
    en: "Hon Mun Island Diving",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    where: {
      zh: "从 Cầu Đá 码头乘快艇出发",
      ko: "Cầu Đá 부두에서 스피드보트로 출발",
    },
    time: {
      zh: "大半天 (通常 8:00 - 14:00)",
      ko: "반나절 (보통 8:00 - 14:00)",
    },
    price: {
      zh: "精品深潜/浮潜一日游约 400-600 元人民币",
      ko: "프리미엄 스쿠버/스노클링 일일 투어 약 80,000~120,000 KRW",
    },
    note: {
      zh: "全网口碑一致推荐：芽庄水质最好、珊瑚最美的国家级海洋保护区！强烈建议抛弃走马观花且水质浑浊的“普通四岛游”，直接报黑岛的精品一日游。即使没有潜水证，也能在教练一对一带领下安全体验极其震撼的水下世界。",
      ko: "냐짱에서 수질이 가장 좋고 산호가 아름다운 국가 지정 해양 보호 구역입니다! 저렴하고 복잡한 일반 4섬 투어 대신, 수중 환경이 압도적인 '혼문 섬 스쿠버다이빙/스노클링 일일 투어'를 강력히 추천합니다. 초보자도 전문 강사와 함께 안전하게 즐길 수 있습니다.",
    },
  },
  {
    name: { zh: "VinWonders 珍珠岛乐园", ko: "VinWonders 냐짱" },
    en: "VinWonders Nha Trang",
    img: "/p7.png",
    where: { zh: "竹岛 (Hon Tre)", ko: "혼쩨 섬 (Hon Tre)" },
    time: { zh: "一整天", ko: "하루 종일" },
    price: {
      zh: "成人通票约 1,050,000 VND",
      ko: "성인 종일권 약 1,050,000 VND",
    },
    note: {
      zh: "集惊险游乐、动物园、超大水上乐园于一体的巨型主题乐园。必玩项目：跨海缆车、高山飞车（需排队）和夜间水上剧场的 Tata Show。既然你们第三晚住在岛上的万豪酒店，完美策略是：利用万豪 4PM 延迟退房的钛金特权，把乐园时间拆分为两个半天，玩累了随时叫 Buggy 回房间洗澡休息！",
      ko: "놀이공원, 워터파크, 동물원이 결합된 초대형 테마파크입니다. 해상 케이블카, 알파인 코스터, 야간 Tata Show가 핵심입니다. 섬 내 메리어트 호텔에 투숙하시니, 티타늄 혜택인 4PM 레잇 체크아웃을 적극 활용해 1.5일 동안 여유롭게 모든 시설을 즐기고 버기카로 편하게 호텔을 오가세요!",
    },
  },
  {
    name: { zh: "蚕岛 奢华泥浴与度假", ko: "혼땀 섬 (Hon Tam) 럭셔리 투어" },
    en: "Hon Tam Island Resort",
    img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    where: {
      zh: "从 Cầu Đá 码头乘船约 20 分钟",
      ko: "Cầu Đá 부두에서 배로 20분 소요",
    },
    time: { zh: "半天", ko: "반나절" },
    price: {
      zh: "上岛+高端泥浴套餐约 600,000 VND",
      ko: "입장+고급 머드배스 패키지 약 600,000 VND",
    },
    note: {
      zh: "如果不喜欢硬核潜水，也不想去市区的挤泥浴，蚕岛是你们完美的奢华平替。岛上提供顶级的接送服务、五星级水准的阶梯式无边泳池和极其宽敞的岛上独立泥浴池。整体体验非常有“高级感”，环境极其出片，适合情侣悠闲躺平。",
      ko: "다이빙이나 시내의 붐비는 머드배스가 끌리지 않는다면 혼땀 섬이 완벽한 럭셔리 대안입니다. 5성급 계단식 인피니티 풀과 넓고 프라이빗한 고급 머드배스를 갖추고 있습니다. 분위기가 매우 고급스럽고 사진 찍기에 최고라 커플의 여유로운 휴양에 완벽합니다.",
    },
  },
];

const foodRecommendations = [
  {
    category: { zh: "海鲜自助", ko: "해산물 뷔페" },
    name: { zh: "Ngon Gallery Nha Trang", ko: "Ngon Gallery Nha Trang" },
    tag: { zh: "无限龙虾 · 高端自助", ko: "무제한 랍스터 · 고급 뷔페" },
    price: "约 1,000,000 VND 起 / 人",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Ngon+Gallery+Nha+Trang",
    desc: {
      zh: "芽庄最有代表性的海鲜自助之一，主打无限龙虾与多国菜品，适合晚餐或纪念日。位置在陈富路一带，环境和出品都偏高端。",
      ko: "냐짱을 대표하는 고급 해산물 뷔페 중 하나로, 무제한 랍스터와 다양한 양식/현지 요리가 강점입니다. 기념일 저녁 식사로 잘 맞습니다.",
    },
    menu: {
      zh: ["无限龙虾", "烤生蚝 / 扇贝", "刺身 / 沙拉", "牛排 / 甜品台"],
      ko: [
        "무제한 랍스터",
        "굴구이 / 가리비",
        "사시미 / 샐러드",
        "스테이크 / 디저트",
      ],
    },
  },
  {
    category: { zh: "本地海鲜", ko: "현지 해산물" },
    name: { zh: "Thanh Suong Seafood", ko: "Thanh Suong Seafood" },
    tag: { zh: "本地人常去 · 价格透明", ko: "현지인 인기 · 가격 투명" },
    price: "约 250,000 - 400,000 VND / 人",
    img: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=1200&q=80",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Thanh+Suong+Seafood+Nha+Trang",
    desc: {
      zh: "芽庄很常见的海鲜排档类型，适合点一桌虾、螃蟹、贝类配炒饭或海鲜面。适合想吃得新鲜又不想花太多的人。",
      ko: "냐짱에서 흔히 볼 수 있는 해산물 식당 스타일로, 새우·게·조개류에 볶음밥이나 해산물면을 곁들이기 좋습니다.",
    },
    menu: {
      zh: ["蒜蓉烤龙虾", "葱油烤扇贝", "海鲜炒面", "蟹 / 虾 / 贝类"],
      ko: ["갈릭 랍스터", "파기름 가리비", "해산물 볶음면", "게 / 새우 / 조개"],
    },
  },
  {
    category: { zh: "本地烧烤", ko: "현지 바비큐" },
    name: { zh: "Lac Canh Restaurant", ko: "Lac Canh Restaurant" },
    tag: { zh: "炭烤牛肉 · 老牌名店", ko: "숯불 소고기 · 오래된 명점" },
    price: "约 200,000 - 350,000 VND / 人",
    img: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Lac+Canh+Restaurant+Nha+Trang",
    desc: {
      zh: "芽庄很有名的炭烤牛肉店，适合多人一起点肉类和烤菜。整体更偏热闹、接地气，属于本地常吃的类型。",
      ko: "냐짱의 유명한 숯불 소고기 집으로, 여러 명이 함께 고기와 구이류를 먹기 좋습니다. 분위기는 소박하고 활기찬 편입니다.",
    },
    menu: {
      zh: ["炭烤牛肉", "烤虾", "烤鱿鱼", "米饭 / 米纸卷"],
      ko: ["숯불 소고기", "구운 새우", "구운 오징어", "밥 / 라이스페이퍼"],
    },
  },
  {
    category: { zh: "越南小吃", ko: "베트남 스트리트 푸드" },
    name: { zh: "Nem Nuong Dang Van Quyen", ko: "Nem Nuong Dang Van Quyen" },
    tag: { zh: "烤肉春卷 · 必吃", ko: "구운 돼지고기 춘권 · 필수" },
    price: "约 40,000 - 90,000 VND / 人",
    img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=80",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Nem+Nuong+Dang+Van+Quyen+Nha+Trang",
    desc: {
      zh: "芽庄非常典型的 nem nướng 老店，通常会配米纸、生菜、香草和蘸酱一起吃。适合当午餐、下午加餐或晚餐前垫一口。",
      ko: "냐짱의 대표적인 nem nướng 맛집으로, 라이스페이퍼·상추·허브·소스와 함께 싸 먹습니다. 점심이나 간식으로 딱 좋습니다.",
    },
    menu: {
      zh: ["Nem nướng", "米纸卷", "炸春卷", "越南香草"],
      ko: ["넴느엉", "라이스페이퍼롤", "튀김춘권", "허브류"],
    },
  },
  {
    category: { zh: "越南小吃", ko: "베트남 스트리트 푸드" },
    name: { zh: "Bánh Căn 51 Tô Hiến Thành", ko: "Bánh Căn 51 Tô Hiến Thành" },
    tag: { zh: "小饼 + 海鲜蘸酱", ko: "미니 팬케이크 + 해산물 소스" },
    price: "约 30,000 - 70,000 VND / 人",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Banh+Can+51+To+Hien+Thanh+Nha+Trang",
    desc: {
      zh: "适合想尝芽庄本地小吃的人，常见是小铁盘现做的 bánh căn，配海鲜、鸡蛋和蘸酱。份量不大，但很有地方特色。",
      ko: "냐짱 로컬 간식을 맛보고 싶을 때 좋은 곳입니다. 작은 틀에서 즉석으로 굽는 bánh căn에 해산물, 계란, 소스를 곁들입니다.",
    },
    menu: {
      zh: ["Bánh căn", "Bánh xèo", "海鲜蘸酱", "蛋 / 虾 / 鱿鱼"],
      ko: ["반깐", "반쎄오", "해산물 소스", "계란 / 새우 / 오징어"],
    },
  },
  {
    category: { zh: "面包", ko: "바게트" },
    name: { zh: "Banh Mi Phan", ko: "Banh Mi Phan" },
    tag: { zh: "平价三明治 · 出餐快", ko: "가성비 샌드위치 · 빠른 제공" },
    price: "约 25,000 - 40,000 VND / 个",
    img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1200&q=80",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Banh+Mi+Phan+Nha+Trang",
    desc: {
      zh: "芽庄很方便的一类越南法棍店，适合早餐、赶路或夜宵。出餐快、价格低，口味稳定，适合随手吃一个。",
      ko: "냐짱에서 편하게 먹기 좋은 베트남식 바게트 가게입니다. 아침·이동 중·야식 모두 잘 맞고, 가격도 부담이 적습니다.",
    },
    menu: {
      zh: ["烤肉法棍", "鸡肉法棍", "素食法棍", "牛油果 / 蛋"],
      ko: ["고기 바게트", "치킨 바게트", "채식 바게트", "아보카도 / 계란"],
    },
  },
  {
    category: { zh: "咖啡饮品", ko: "커피 / 음료" },
    name: { zh: "CCCP Coffee", ko: "CCCP Coffee" },
    tag: { zh: "椰子咖啡 · 强冷气", ko: "코코넛 커피 · 에어컨 강함" },
    price: "约 45,000 - 70,000 VND / 杯",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=CCCP+Coffee+Nha+Trang",
    desc: {
      zh: "很适合中午避暑或者安排拍照休息。常见推荐是椰子咖啡、冰沙和各种甜饮，属于市区里比较舒服的中途停靠点。",
      ko: "한낮에 더위를 피하거나 사진 찍고 쉬기 좋습니다. 코코넛 커피, 스무디, 달콤한 음료가 대표적이며 시내 중간 휴식지로 좋습니다.",
    },
    menu: {
      zh: ["椰子咖啡", "芒果冰沙", "冰拿铁", "甜饮 / 冰沙"],
      ko: ["코코넛 커피", "망고 스무디", "아이스 라테", "달콤한 음료 / 스무디"],
    },
  },
  {
    category: { zh: "甜品", ko: "디저트" },
    name: { zh: "Sweet Secret", ko: "Sweet Secret" },
    tag: { zh: "蛋糕甜品 · 高分口碑", ko: "케이크 디저트 · 높은 평점" },
    price: "约 50,000 - 120,000 VND / 份",
    img: "https://images.unsplash.com/photo-1464306076886-da185f6a9d6b?auto=format&fit=crop&w=1200&q=80",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Sweet+Secret+Nha+Trang",
    desc: {
      zh: "适合饭后补一个甜点，环境通常更偏安静和精致。比较适合情侣旅行里当作下午茶或晚餐收尾。",
      ko: "식사 후 디저트를 넣기 좋은 곳으로, 분위기가 비교적 조용하고 깔끔합니다. 커플 여행의 애프터눈 티나 식사 마무리로 잘 맞습니다.",
    },
    menu: {
      zh: ["芝士蛋糕", "慕斯蛋糕", "冰淇淋", "咖啡 / 茶"],
      ko: ["치즈케이크", "무스케이크", "아이스크림", "커피 / 차"],
    },
  },
  {
    category: { zh: "面包 / 烘焙", ko: "베이커리" },
    name: { zh: "Củi Bánh Mì", ko: "Củi Bánh Mì" },
    tag: { zh: "现烤面包 · 更适合早餐", ko: "갓 구운 빵 · 아침용" },
    price: "约 30,000 - 60,000 VND / 份",
    img: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=1200&q=80",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Cui+Banh+Mi+Nha+Trang",
    desc: {
      zh: "更偏烘焙店气质，适合做早餐、带走或和咖啡一起点。想吃得清爽一点时，这类店很实用。",
      ko: "베이커리 성격이 강해서 아침식사, 테이크아웃, 커피와 함께 주문하기 좋습니다. 가볍게 먹고 싶을 때 실용적입니다.",
    },
    menu: {
      zh: ["现烤法棍", "火腿三明治", "奶油面包", "甜点面包"],
      ko: ["갓 구운 바게트", "햄 샌드위치", "크림빵", "디저트 빵"],
    },
  },
];

const itinerary = [
  {
    date: "7/9",
    title: { zh: "晚到，先落地休息", ko: "늦은 도착, 먼저 휴식" },
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
    title: { zh: "市区核心日", ko: "시내 핵심 일정" },
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
    title: { zh: "缓冲回金兰海湾", ko: "깜라인 해변으로 다시 이동" },
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

function HotelItineraryCard({ h, lang }) {
  return (
    <Card accent>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          flexWrap: "wrap",
          paddingBottom: 16,
          marginBottom: 16,
          borderBottom: "1px dashed #dbe3ea",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-block",
              background: "#e07055",
              color: "#fff",
              padding: "4px 10px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 900,
              marginBottom: 8,
            }}
          >
            {h.date}
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#0e2d4d" }}>
            {h.name}
          </div>
          <div
            style={{
              color: "#6b7280",
              fontSize: 14,
              marginTop: 6,
              fontWeight: 700,
            }}
          >
            {lang === "zh" ? h.brand.zh : h.brand.ko}
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#111" }}>
            {h.price}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        <InfoItem
          icon="🏛️"
          title={lang === "zh" ? "历史与硬件" : "역사 및 시설"}
          text={lang === "zh" ? h.hardware.zh : h.hardware.ko}
        />
        <InfoItem
          icon="🛎️"
          title={lang === "zh" ? "服务水平" : "서비스 수준"}
          text={lang === "zh" ? h.service.zh : h.service.ko}
        />
        <InfoItem
          icon="🍳"
          title={lang === "zh" ? "餐饮与早午餐" : "식음료 및 조식"}
          text={lang === "zh" ? h.meals.zh : h.meals.ko}
        />
        <InfoItem
          icon="🚕"
          title={lang === "zh" ? "周边交通" : "주변 교통"}
          text={lang === "zh" ? h.traffic.zh : h.traffic.ko}
        />
        <InfoItem
          icon="🛍️"
          title={lang === "zh" ? "周边商业" : "주변 상권"}
          text={lang === "zh" ? h.commerce.zh : h.commerce.ko}
        />
        <InfoItem
          icon="💎"
          title={lang === "zh" ? "钛金会员权益" : "티타늄 멤버십 혜택"}
          text={lang === "zh" ? h.benefits.zh : h.benefits.ko}
        />
      </div>
    </Card>
  );
}

function InfoItem({ icon, title, text }) {
  return (
    <div style={{ fontSize: 14, lineHeight: 1.6 }}>
      <div
        style={{
          fontWeight: 800,
          color: "#0e2d4d",
          marginBottom: 6,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span>{icon}</span> <span>{title}</span>
      </div>
      <div style={{ color: "#334155" }}>{text}</div>
    </div>
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
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            width: 150,
            height: 150,
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid #e8e0d4",
            background: "linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%)",
            position: "relative",
          }}
        >
          {f.img ? (
            <img
              src={f.img}
              alt={lang === "zh" ? f.name.zh : f.name.ko}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
                fontWeight: 800,
                fontSize: 13,
                textAlign: "center",
                padding: 12,
              }}
            >
              {lang === "zh" ? "暂无图片" : "이미지 없음"}
            </div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
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
              <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 10px",
                    borderRadius: 999,
                    background: "#edf4fb",
                    color: "#0e2d4d",
                    fontSize: 12,
                    fontWeight: 800,
                    marginBottom: 6,
                  }}
                >
                  {lang === "zh" ? f.category.zh : f.category.ko}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 10px",
                    borderRadius: 999,
                    background: "#fff4ed",
                    color: "#c2410c",
                    fontSize: 12,
                    fontWeight: 800,
                    marginLeft: 8,
                    marginBottom: 6,
                  }}
                >
                  {lang === "zh" ? f.tag.zh : f.tag.ko}
                </span>
              </div>
            </div>
            <div
              style={{
                background: "#fef2f2",
                color: "#dc2626",
                padding: "6px 10px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              {f.price}
            </div>
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 14,
              color: "#334155",
              lineHeight: 1.75,
            }}
          >
            {lang === "zh" ? f.desc.zh : f.desc.ko}
          </div>
          {f.menu && (
            <div style={{ marginTop: 12 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#0e2d4d",
                  marginBottom: 8,
                }}
              >
                {lang === "zh" ? "推荐菜单" : "추천 메뉴"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(lang === "zh" ? f.menu.zh : f.menu.ko).map((item) => (
                  <span
                    key={item}
                    style={{
                      display: "inline-block",
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      color: "#334155",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
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
                borderRadius: 10,
              }}
            >
              📍 {lang === "zh" ? "Google Maps 导航" : "Google 지도 열기"}
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}

function ImageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    if (width > 0) {
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <div style={{ marginTop: 22, width: "100%" }}>
      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div
        className="hide-scroll"
        onScroll={handleScroll}
        style={{
          display: "flex",
          width: "100%",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          borderRadius: 12,
          backgroundColor: "#f4f4f5",
        }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            style={{
              flex: "0 0 100%",
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
                maxHeight: 450,
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
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
              width: activeIndex === idx ? 18 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: activeIndex === idx ? "#0e2d4d" : "#cbd5e1",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("zh");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleScrollSpy = () => {
      const tabKeys = ["overview", "spots", "hotels", "itinerary", "tips"];
      let currentActive = 0;
      for (let i = 0; i < tabKeys.length; i++) {
        const el = document.getElementById(`section-${tabKeys[i]}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 85) {
            currentActive = i;
          }
        }
      }
      setActiveTab(currentActive);
    };
    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const c = localeCopy[lang];

  const tabKeys = ["overview", "spots", "hotels", "itinerary", "tips"];
  const scrollToSection = (idx) => {
    setActiveTab(idx);
    const el = document.getElementById(`section-${tabKeys[idx]}`);
    if (el) {
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
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(14, 45, 77, 0.3), rgba(14, 45, 77, 0.9)), url('/bg.jpg')",
          backgroundSize: "cover",
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
                {s.img && (
                  <div
                    style={{
                      width: "100%",
                      height: 160,
                      borderRadius: 12,
                      overflow: "hidden",
                      marginBottom: 14,
                    }}
                  >
                    <img
                      src={s.img}
                      alt={s.en}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                )}
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
                {s.img && (
                  <div
                    style={{
                      width: "100%",
                      height: 160,
                      borderRadius: 12,
                      overflow: "hidden",
                      marginBottom: 14,
                    }}
                  >
                    <img
                      src={s.img}
                      alt={s.en}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                )}
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

        {/* 锚点 2：酒店日程区 */}
        <div id="section-hotels">
          <SectionTitle title={c.hotelTitle} sub={c.hotelSub} />
          <div style={{ display: "grid", gap: 20 }}>
            {hotelItineraryList.map((h, idx) => (
              <HotelItineraryCard key={idx} h={h} lang={lang} />
            ))}
          </div>
        </div>

        {/* 锚点 3：旅行计划区 */}
        <div id="section-itinerary">
          <SectionTitle title={c.foodTitle} sub={c.foodSub} />
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
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            <Card>
              <div
                style={{
                  fontWeight: 900,
                  color: "#0e2d4d",
                  marginBottom: 8,
                  fontSize: 16,
                }}
              >
                {lang === "zh" ? "🛂 签证与行程规划" : "🛂 비자 및 여행 준비"}
              </div>
              <BulletList
                items={
                  lang === "zh"
                    ? [
                        "护照有效期至少 6 个月。签证政策请以出发前官方最新信息为准。",
                        "务必提前订好酒店，经济实惠且干净的酒店长期处于满房状态。",
                        "按照景点的时间预约进入，提前或延迟都可能被拒之门外，千万别错过。",
                        "把酒店订单、返程票、保险等证件，放在手机和纸质备份里。",
                      ]
                    : [
                        "여권 유효기간은 최소 6개월 이상이어야 하며, 비자 정책은 최신 공식 정보를 확인하세요.",
                        "호텔은 무조건 미리 예약하세요. 가성비 좋고 깔끔한 곳은 항상 만실입니다.",
                        "관광지 예약 시간은 엄수해야 합니다. 너무 일찍 가거나 지각하면 입장이 불가할 수 있습니다.",
                        "호텔 예약, 귀국 항공권, 보험 서류는 휴대폰과 종이 모두 보관하세요.",
                      ]
                }
              />
            </Card>

            <Card>
              <div
                style={{
                  fontWeight: 900,
                  color: "#0e2d4d",
                  marginBottom: 8,
                  fontSize: 16,
                }}
              >
                {lang === "zh"
                  ? "💰 现金、交通与套路"
                  : "💰 현금, 교통 및 바가지 피하기"}
              </div>
              <BulletList
                items={
                  lang === "zh"
                    ? [
                        "一定要带现金！很多小店不可刷卡且不收美金。机场 ATM 刷 VISA 取款最方便汇率也公道，绝不要找私人换钱防被骗。",
                        "市区赶时间优选 Grab 摩托车。高峰期极其堵车，打车或公交会浪费大量时间。",
                        "在越南骑乘摩托车【必须】戴好安全帽，否则警察会直接罚款。",
                        "街边的各种热情搭讪轻易不要理会，绝大多数都是付费服务或套路陷阱。",
                      ]
                    : [
                        "현금 지참 필수! 작은 가게는 카드나 달러를 받지 않습니다. 공항 ATM(VISA) 출금이 가장 안전하며, 사설 환전소는 피하세요.",
                        "시내에서 급할 땐 Grab 오토바이가 최고입니다. 출퇴근 시간에는 차가 매우 막혀 택시/버스는 비효율적입니다.",
                        "오토바이를 탈 때는 반드시 헬멧을 착용하세요. 미착용 시 경찰에게 벌금을 냅니다.",
                        "길거리의 과도한 호객 행위는 무시하세요. 대부분 유료 서비스나 바가지입니다.",
                      ]
                }
              />
            </Card>

            <Card>
              <div
                style={{
                  fontWeight: 900,
                  color: "#0e2d4d",
                  marginBottom: 8,
                  fontSize: 16,
                }}
              >
                {lang === "zh"
                  ? "🍍 饮食与点单防坑"
                  : "🍍 식음료 및 레스토랑 주의사항"}
              </div>
              <BulletList
                items={
                  lang === "zh"
                    ? [
                        "酒店绝对不允许带榴莲进入！违规会被高额罚款，买完必须在外面吃掉。",
                        "不要在 Grab 上买鲜切水果，又贵又不好吃，通常是不熟的；没见过颜色的艳丽水果也不要轻易尝试。",
                        "一定要随身携带纸巾，绝大多数餐厅是不提供免费纸巾的。",
                        "网红餐厅都需要排队，请合理安排时间。越南辣椒辣度极高，千万不要大口吃辣椒！",
                        "看不懂菜单不要随便乱点，最稳妥的做法是看别人吃什么，指着要一份一样的。",
                      ]
                    : [
                        "호텔 내 두리안 반입 절대 금지! 적발 시 큰 벌금이 부과되므로 밖에서 다 드세요.",
                        "Grab에서 컷팅 과일을 배달시키지 마세요 (비싸고 덜 익음). 화려한 색의 낯선 과일도 주의하세요.",
                        "무료 휴지가 없는 식당이 많으니 개인 티슈를 꼭 챙기세요.",
                        "유명 맛집은 항상 대기가 있습니다. 또한, 베트남 고추는 상상 이상으로 매우니 조금만 드세요!",
                        "메뉴를 모를 땐 다른 테이블의 음식을 가리켜 같은 걸로 주문하는 것이 가장 안전합니다.",
                      ]
                }
              />
            </Card>

            <Card>
              <div
                style={{
                  fontWeight: 900,
                  color: "#0e2d4d",
                  marginBottom: 8,
                  fontSize: 16,
                }}
              >
                {lang === "zh"
                  ? "🏖️ 游玩项目与购物"
                  : "🏖️ 관광 액티비티 및 쇼핑"}
              </div>
              <BulletList
                items={
                  lang === "zh"
                    ? [
                        "如果想好好体验潜水，千万别去走马观花的四岛跳岛游。推荐【黑岛一日】，水质更清、珊瑚和鱼很多。",
                        "海钓如果没有经验和实力就别想了，不仅暴晒而且根本钓不到鱼。",
                        "进按摩店一定要提前问好价格。越南没有给小费习惯，精油按摩非常解乏但需要提前预约。",
                        "别在越南买翡翠等玉石特产，越南根本不产这些！也不要买药店的保健品或纪念品店的高价纪念品。",
                        "不要特意去订做一套奥黛，很挑人穿尤其是男生，直接租一套体验即可。",
                      ]
                    : [
                        "제대로 된 스쿠버다이빙을 원한다면 4섬 투어 대신 '혼문(Mun) 섬' 일일 투어를 추천합니다. 물이 맑고 산호가 많습니다.",
                        "낚시 초보라면 바다 낚시는 포기하세요. 햇볕만 뜨겁고 고기는 안 잡혀 만족도가 낮습니다.",
                        "마사지 샵 입장 전 가격을 꼭 확인하세요. 팁은 의무가 아니며, 아로마 마사지는 사전 예약이 필수입니다.",
                        "베트남은 옥/비취 산지가 아니니 보석류는 절대 사지 마세요. 약국 건강식품이나 고가 기념품도 피하세요.",
                        "비싼 돈 주고 아오자이를 맞춤 제작할 필요 없이, 대여해서 사진만 찍는 것이 훨씬 합리적입니다.",
                      ]
                }
              />
            </Card>

            <Card>
              <div
                style={{
                  fontWeight: 900,
                  color: "#0e2d4d",
                  marginBottom: 8,
                  fontSize: 16,
                }}
              >
                {lang === "zh"
                  ? "⛅ 天气、装备与收尾"
                  : "⛅ 날씨, 준비물 및 귀국 일정"}
              </div>
              <BulletList
                items={
                  lang === "zh"
                    ? [
                        "7 月属于旺季且天气极热，防晒霜、帽子、太阳镜一定要带足。",
                        "四岛游和海边活动建议多准备一套干衣服。逛大教堂、寺庙等需要一双好走的鞋，且穿着不能过于暴露。",
                        "【返程最后一晚】如果 7/16 是早航班，最后一晚务必住金兰机场方向；如果是晚班机，可继续住市区补逛，不要折腾太远的点以免误机。",
                      ]
                    : [
                        "7월은 성수기이며 매우 덥습니다. 선크림, 모자, 선글라스를 충분히 챙기세요.",
                        "해양 액티비티 시 마른 여벌 옷이 필요합니다. 성당, 사원 방문을 위해 편한 신발을 신고, 노출이 심한 옷은 피하세요.",
                        "【귀국 마지막 밤】 7/16 이른 비행기라면 공항 근처(깜라인)에 숙박하고, 늦은 비행기라면 시내에 머물며 쇼핑을 마무리하세요. 무리한 이동은 피하세요.",
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
