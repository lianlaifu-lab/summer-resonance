import { useMemo, useState, useEffect } from "react";

const localeCopy = {
  zh: {
    appTitle: "芽庄（Nha Trang）旅游全攻略",
    appSub: "一键中/韩翻译 · 情侣出行 · 7月9日–16日 · 市区 + 珍珠岛",
    toggle: "切换为韩语",
    tabs: ["总览", "景点攻略", "酒店日程", "美食推荐", "旅行计划", "实用提示"],
    overviewTitle: "行程总控面板",
    overviewSub: "5秒快速掌握：8天7晚核心节奏与避坑指南",
    overviewCards: [
      { icon: "📅", label: "行程总览", value: "8天7晚 · 7月9日-16日" },
      { icon: "💰", label: "预估预算", value: "人均约 6k-8k RMB (含机酒)" },
      {
        icon: "🏨",
        label: "住宿逻辑",
        value: "金兰过渡 → 竹岛深玩 → 市区观光 → 金兰收尾",
      },
      {
        icon: "🎯",
        label: "核心目标",
        value: "海岛放松、双人浪漫、体验万豪系满配权益",
      },
    ],
    overviewMustDos: {
      title: "🔥 必做项目",
      items: [
        "黑岛 VIP 小团深潜/浮潜",
        "VinWonders 乐园 + 跨海缆车",
        "I-Resort 矿泉私密泥浴",
        "顶楼高空酒吧看海景日落",
      ],
    },
    overviewAlerts: {
      title: "⚠️ 最高危避坑",
      items: [
        "坚决不理街边搭讪，打车只认 Grab 软件",
        "带足现金，机场 ATM 用 VISA 取现最划算",
        "防晒做足，酒店房间内绝不能吃榴莲",
      ],
    },
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
    tabs: ["전체", "명소 가이드", "호텔 일정", "맛집 추천", "일정", "실용 팁"],
    overviewTitle: "여행 마스터 컨트롤 패널",
    overviewSub: "5초 만에 파악하는 7박 8일 핵심 리듬 및 주의사항",
    overviewCards: [
      { icon: "📅", label: "총 일정", value: "7박 8일 · 7월 9일-16일" },
      {
        icon: "💰",
        label: "예상 예산",
        value: "1인 약 120-150만 원 (항공/숙박 포함)",
      },
      {
        icon: "🏨",
        label: "숙박 로직",
        value: "깜라인 완충 → 혼쩨 섬 딥다이브 → 시내 관광 → 깜라인 마무리",
      },
      {
        icon: "🎯",
        label: "핵심 목표",
        value: "해양 휴양, 커플 로맨스, 메리어트 풀 혜택 누리기",
      },
    ],
    overviewMustDos: {
      title: "🔥 필수 체험",
      items: [
        "혼문 섬 VIP 스쿠버다이빙/스노클링",
        "VinWonders 테마파크 + 해상 케이블카",
        "I-Resort 프라이빗 머드배스",
        "루프탑 바에서 오션뷰 일몰 감상",
      ],
    },
    overviewAlerts: {
      title: "⚠️ 핵심 주의사항",
      items: [
        "길거리 호객 절대 무시, 택시는 오직 Grab 앱만",
        "현금 넉넉히 준비, 공항 ATM(VISA) 인출 추천",
        "자외선 차단 필수, 호텔 객실 내 두리안 절대 금지",
      ],
    },
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

// --- 天气代码映射与组件 ---
const weatherMap = {
  0: { icon: "☀️", zh: "晴朗", ko: "맑음" },
  1: { icon: "🌤️", zh: "大部晴朗", ko: "대체로 맑음" },
  2: { icon: "⛅", zh: "多云", ko: "구름 많음" },
  3: { icon: "☁️", zh: "阴天", ko: "흐림" },
  45: { icon: "🌫️", zh: "雾", ko: "안개" },
  48: { icon: "🌫️", zh: "雾", ko: "안개" },
  51: { icon: "🌧️", zh: "毛毛雨", ko: "이슬비" },
  53: { icon: "🌧️", zh: "毛毛雨", ko: "이슬비" },
  55: { icon: "🌧️", zh: "毛毛雨", ko: "이슬비" },
  61: { icon: "🌦️", zh: "小雨", ko: "약간의 비" },
  63: { icon: "🌧️", zh: "中雨", ko: "비" },
  65: { icon: "🌧️", zh: "大雨", ko: "강한 비" },
  80: { icon: "🌦️", zh: "阵雨", ko: "소나기" },
  81: { icon: "🌧️", zh: "阵雨", ko: "소나기" },
  82: { icon: "🌧️", zh: "暴雨", ko: "폭우" },
  95: { icon: "⛈️", zh: "雷阵雨", ko: "뇌우" },
  96: { icon: "⛈️", zh: "雷暴", ko: "강한 뇌우" },
  99: { icon: "⛈️", zh: "雷暴", ko: "강한 뇌우" },
};

function WeatherWidget({ lang }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=12.2388&longitude=109.1967&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FBangkok"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.current) setWeather(data.current);
      })
      .catch((e) => console.error(e));
  }, []);

  if (!weather) return null;
  const wInfo = weatherMap[weather.weather_code] || {
    icon: "🌡️",
    zh: "未知",
    ko: "알 수 없음",
  };

  return (
    <div
      className="card-hover"
      style={{
        background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
        padding: "18px 24px",
        borderRadius: 24,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        border: "1px solid rgba(125, 211, 252, 0.5)",
        flexWrap: "wrap",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span
          style={{
            fontSize: 36,
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
          }}
        >
          {wInfo.icon}
        </span>
        <div>
          <div
            style={{
              fontWeight: 900,
              color: "#0284c7",
              fontSize: 16,
              letterSpacing: "-0.3px",
            }}
          >
            {lang === "zh" ? "芽庄实时天气" : "냐짱 실시간 날씨"}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#0369a1",
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            {lang === "zh" ? wInfo.zh : wInfo.ko}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 12,
              color: "#0369a1",
              fontWeight: 700,
              opacity: 0.8,
            }}
          >
            {lang === "zh" ? "气温" : "기온"}
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: "#0c4a6e",
              letterSpacing: "-0.5px",
            }}
          >
            {Math.round(weather.temperature_2m)}°C
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 12,
              color: "#0369a1",
              fontWeight: 700,
              opacity: 0.8,
            }}
          >
            {lang === "zh" ? "湿度" : "습도"}
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: "#0c4a6e",
              letterSpacing: "-0.5px",
            }}
          >
            {weather.relative_humidity_2m}%
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 实时汇率换算组件 ---
function CurrencyConverterWidget({ lang }) {
  const [rates, setRates] = useState(null);
  const [amount, setAmount] = useState(100);
  const [base, setBase] = useState("cny");

  useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/cny.json"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.cny) {
          setRates({ cny: 1, krw: data.cny.krw, vnd: data.cny.vnd });
        }
      })
      .catch((e) => console.error("汇率获取失败", e));
  }, []);

  const handleInputChange = (val, currency) => {
    if (val === "") {
      setAmount("");
      setBase(currency);
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setAmount(num);
      setBase(currency);
    }
  };

  const getValue = (currency) => {
    if (amount === "") return "";
    if (!rates) return "";
    if (currency === base) return amount;
    const inCny = amount / rates[base];
    return Math.round(inCny * rates[currency]);
  };

  if (!rates) return null;

  const uiText = {
    title: lang === "zh" ? "实时汇率换算" : "실시간 환율 계산기",
    cny: lang === "zh" ? "人民币 (CNY)" : "위안화 (CNY)",
    krw: lang === "zh" ? "韩元 (KRW)" : "원화 (KRW)",
    vnd: lang === "zh" ? "越南盾 (VND)" : "베트남 동 (VND)",
    tip: lang === "zh" ? "点击修改任意框即可换算" : "입력 시 자동 변환",
  };

  return (
    <div
      className="card-hover"
      style={{
        background: "#fff",
        padding: "20px 24px",
        borderRadius: 24,
        marginBottom: 20,
        border: "1px solid #f1f5f9",
        boxShadow: "0 8px 30px rgba(15,23,42,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>💱</span>
          <span
            style={{
              fontWeight: 900,
              color: "#0f172a",
              fontSize: 17,
              letterSpacing: "-0.3px",
            }}
          >
            {uiText.title}
          </span>
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#64748b",
            fontWeight: 700,
            background: "#f1f5f9",
            padding: "4px 10px",
            borderRadius: 99,
          }}
        >
          {uiText.tip}
        </div>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        <div
          className="input-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f8fafc",
            padding: "14px 18px",
            borderRadius: 16,
            border: "1px solid #e2e8f0",
            transition: "all 0.2s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: 24,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
              }}
            >
              🇨🇳
            </span>
            <span style={{ fontWeight: 800, color: "#334155", fontSize: 14 }}>
              {uiText.cny}
            </span>
          </div>
          <input
            type="number"
            className="focus-input"
            value={getValue("cny")}
            onChange={(e) => handleInputChange(e.target.value, "cny")}
            style={{
              textAlign: "right",
              border: "none",
              background: "transparent",
              fontSize: 22,
              fontWeight: 900,
              color: "#0f172a",
              width: "120px",
              outline: "none",
              fontFamily: "inherit",
            }}
            placeholder="0"
          />
        </div>

        <div
          className="input-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f8fafc",
            padding: "14px 18px",
            borderRadius: 16,
            border: "1px solid #e2e8f0",
            transition: "all 0.2s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: 24,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
              }}
            >
              🇰🇷
            </span>
            <span style={{ fontWeight: 800, color: "#334155", fontSize: 14 }}>
              {uiText.krw}
            </span>
          </div>
          <input
            type="number"
            className="focus-input"
            value={getValue("krw")}
            onChange={(e) => handleInputChange(e.target.value, "krw")}
            style={{
              textAlign: "right",
              border: "none",
              background: "transparent",
              fontSize: 22,
              fontWeight: 900,
              color: "#0f172a",
              width: "150px",
              outline: "none",
              fontFamily: "inherit",
            }}
            placeholder="0"
          />
        </div>

        <div
          className="input-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fdf4ff",
            padding: "14px 18px",
            borderRadius: 16,
            border: "1px solid #f5d0fe",
            transition: "all 0.2s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: 24,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
              }}
            >
              🇻🇳
            </span>
            <span style={{ fontWeight: 900, color: "#86198f", fontSize: 14 }}>
              {uiText.vnd}
            </span>
          </div>
          <input
            type="number"
            className="focus-input"
            value={getValue("vnd")}
            onChange={(e) => handleInputChange(e.target.value, "vnd")}
            style={{
              textAlign: "right",
              border: "none",
              background: "transparent",
              fontSize: 22,
              fontWeight: 900,
              color: "#c026d3",
              width: "180px",
              outline: "none",
              fontFamily: "inherit",
            }}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
}

const hotelItineraryList = [
  {
    date: { zh: "7/9 - 7/10 (第 1 晚)", ko: "7/9 - 7/10 (1일 차)" },
    name: "Wyndham Grand KN Paradise Cam Ranh",
    brand: {
      zh: "温德姆至尊 (Wyndham Grand) · 大型高尔夫度假村",
      ko: "윈덤 그랜드 · 대형 골프 리조트",
    },
    price: { zh: "约 300-600 元/晚", ko: "약 300-600 위안/박" },
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
    date: { zh: "7/10 - 7/11 (第 2 晚)", ko: "7/10 - 7/11 (2일 차)" },
    name: "The Westin Resort & Spa Cam Ranh",
    brand: {
      zh: "万豪高级 (Premium) · 威斯汀",
      ko: "메리어트 프리미엄 · 웨스틴",
    },
    price: { zh: "约 600-1000 元/晚", ko: "약 600-1000 위안/박" },
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
    date: { zh: "7/11 - 7/12 (第 3 晚)", ko: "7/11 - 7/12 (3일 차)" },
    name: "Nha Trang Marriott Resort & Spa, Hon Tre Island",
    brand: { zh: "万豪 (Marriott) · 经典奢华", ko: "메리어트 · 클래식 럭셔리" },
    price: { zh: "约 800-1300 元/晚", ko: "약 800-1300 위안/박" },
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
    date: { zh: "7/12 - 7/13 (第 4 晚)", ko: "7/12 - 7/13 (4일 차)" },
    name: "Four Points by Sheraton Nha Trang",
    brand: {
      zh: "万豪精选 (Select) · 福朋喜来登",
      ko: "메리어트 셀렉트 · 포포인츠 바이 쉐라톤",
    },
    price: { zh: "约 450-800 元/晚", ko: "약 450-800 위안/박" },
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
    date: { zh: "7/13 - 7/14 (第 5 晚)", ko: "7/13 - 7/14 (5일 차)" },
    name: "Sheraton Nha Trang Hotel & Spa",
    brand: {
      zh: "万豪高级 (Premium) · 喜来登",
      ko: "메리어트 프리미엄 · 쉐라톤",
    },
    price: { zh: "约 700-1000 元/晚", ko: "약 700-1000 위안/박" },
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
    date: { zh: "7/14 - 7/15 (最后一晚)", ko: "7/14 - 7/15 (마지막 밤)" },
    name: "Wyndham Grand KN Paradise Cam Ranh",
    brand: {
      zh: "温德姆至尊 (Wyndham Grand) · 大型高尔夫度假村",
      ko: "윈덤 그랜드 · 대형 골프 리조트",
    },
    price: { zh: "约 300-600 元/晚", ko: "약 300-600 위안/박" },
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
    img: "/p1.png",
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
    img: "/p2.png",
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
    img: "/p3.png",
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
    img: "/p4.jpg",
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
    img: "/p5.png",
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
    img: "/p6.png",
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
    price: {
      zh: "约 1,000,000 VND 起 / 人",
      ko: "약 1,000,000 VND 부터 / 1인",
    },
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
    name: {
      zh: "Thanh Suong Seafood (清霜海鲜)",
      ko: "Thanh Suong Seafood (탄스엉 해산물)",
    },
    tag: { zh: "本地人常去 · 价格透明", ko: "현지인 인기 · 가격 투명" },
    price: {
      zh: "约 250,000 - 400,000 VND / 人",
      ko: "약 250,000 - 400,000 VND / 1인",
    },
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
    price: {
      zh: "约 200,000 - 350,000 VND / 人",
      ko: "약 200,000 - 350,000 VND / 1인",
    },
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
    price: {
      zh: "约 40,000 - 90,000 VND / 人",
      ko: "약 40,000 - 90,000 VND / 1인",
    },
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
    price: {
      zh: "约 30,000 - 70,000 VND / 人",
      ko: "약 30,000 - 70,000 VND / 1인",
    },
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
    price: {
      zh: "约 25,000 - 40,000 VND / 个",
      ko: "약 25,000 - 40,000 VND / 개",
    },
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
    price: {
      zh: "约 45,000 - 70,000 VND / 杯",
      ko: "약 45,000 - 70,000 VND / 잔",
    },
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
    price: {
      zh: "约 50,000 - 120,000 VND / 份",
      ko: "약 50,000 - 120,000 VND / 인분",
    },
    img: "/image_6bd899.jpg",
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
    price: {
      zh: "约 30,000 - 60,000 VND / 份",
      ko: "약 30,000 - 60,000 VND / 인분",
    },
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
  /* ── 第1天 ── */
  {
    date: "7/9",
    isHighlight: false,
    mood: { zh: "🛬 落地缓冲夜", ko: "🛬 도착 완충의 밤" },
    title: { zh: "深夜抵达，先安顿再说", ko: "심야 도착, 안정적인 첫 밤" },
    hotel: "Wyndham Grand KN Paradise Cam Ranh",
    slots: [
      {
        time: { zh: "落地后", ko: "도착 후" },
        period: "night",
        icon: "✈️",
        title: {
          zh: "金兰机场落地 → 打 Grab 到酒店",
          ko: "깜라인 공항 도착 → Grab으로 호텔 이동",
        },
        desc: {
          zh: "出关后先连机场 WiFi，再呼叫 Grab（推荐 Grab Car，约 100,000-130,000 VND）。从机场到 Wyndham Grand KN Paradise 全程约 12 公里、15 分钟。路上几乎没有车，非常顺畅。",
          ko: "입국 후 공항 WiFi 연결 후 Grab Car를 호출하세요 (약 100,000~130,000 VND). 공항에서 호텔까지 약 12km, 15분 소요됩니다. 야간이라 도로가 한산합니다.",
        },
        tip: {
          zh: "⚠️ 出口处有黑车主动搭讪，一律无视，认准 Grab App 叫车。另：机场 ATM（Vietcombank/Techcombank，支持 VISA）取 200 万越盾备用，汇率比市区换钱划算。",
          ko: "⚠️ 출구 앞 불법 택시 호객꾼을 무시하고 반드시 Grab 앱을 사용하세요. 공항 ATM(Vietcombank/Techcombank, VISA 가능)에서 200만 VND를 인출해 두면 편리합니다.",
        },
        venues: null,
      },
      {
        time: { zh: "到店后", ko: "체크인 후" },
        period: "night",
        icon: "🌙",
        title: {
          zh: "宵夜 + 入睡，整理明日行李",
          ko: "야식 + 취침, 다음 날 짐 준비",
        },
        desc: {
          zh: "入住后直接叫酒店 24h 餐厅，点越南粥（Cháo gà）或炒饭果腹。周边完全没有便利店和外卖，今晚所有消费在酒店内解决。把第二天要用的泳衣、防晒、换洗放到行李顶层，方便第二天直接取用。",
          ko: "체크인 후 24시간 레스토랑에서 베트남 닭죽(Cháo gà)이나 볶음밥으로 야식을 해결하세요. 주변에 편의점·배달 완전 불가. 다음 날 쓸 수영복·선크림을 짐 맨 위에 꺼내 두세요.",
        },
        tip: {
          zh: "💡 如果在机场忘买零食了，Wyndham 大堂有小型礼品商店（价格偏贵但24h），可以买几瓶水备用。",
          ko: "💡 공항에서 간식을 못 샀다면, 윈덤 로비 기념품 상점(24시간, 가격 약간 비쌈)에서 물라도 사 두세요.",
        },
        venues: null,
      },
    ],
  },

  /* ── 第2天 ── */
  {
    date: "7/10",
    isHighlight: false,
    mood: { zh: "🌊 海滩放空 + Spa", ko: "🌊 해변 힐링 + 스파" },
    title: {
      zh: "威斯汀度假日：海滩 · Spa · 慢节奏",
      ko: "웨스틴 리조트의 하루: 해변 · 스파 · 여유",
    },
    hotel: "The Westin Resort & Spa Cam Ranh",
    slots: [
      {
        time: "07:30–09:30",
        period: "morning",
        icon: "🍳",
        title: {
          zh: "威斯汀 Eat Well 健康早餐",
          ko: "웨스틴 Eat Well 건강 조식",
        },
        desc: {
          zh: "威斯汀主打“焕活”健康理念，早餐有越南风味粥、热带水果拼盘、现榨果汁、现做蛋类和多款越南咖啡。慢慢享用，这是整趟旅程第一顿真正意义上的正式早餐。建议早餐后就去前台或 Spa 预约下午的按摩时段（旺季下午时段很容易满）。",
          ko: "웨스틴의 Eat Well 조식 메뉴는 베트남식 죽, 열대 과일, 신선한 주스, 에그 스테이션, 베트남 커피 등으로 구성됩니다. 여유롭게 즐기세요. 조식 후 바로 프런트 또는 스파 데스크에서 오후 마사지를 예약해 두세요.",
        },
        tip: null,
        venues: null,
      },
      {
        time: "09:30–12:30",
        period: "morning",
        icon: "🏖️",
        title: {
          zh: "威斯汀私人海滩 + 泳池时光",
          ko: "웨스틴 전용 해변 + 수영장 시간",
        },
        desc: {
          zh: "威斯汀有专属私人沙滩，沙子细白，沙滩椅免费，有椰子水和冰镇饮料售卖。上午是一天中最凉爽的黄金时段，建议下海游泳或在浅水区浮潜（可向前台借用面具），也是情侣拍照出片率最高的时段。务必涂好 SPF50+ 防晒，7 月紫外线极高。",
          ko: "웨스틴 전용 해변은 고운 백사장에 비치 체어 무료. 코코넛 워터와 냉음료 판매. 오전이 하루 중 가장 시원한 시간대로 수영·스노클링(프런트에서 마스크 대여 가능)·커플 사진 촬영에 최적입니다. SPF50 이상 선크림은 필수!",
        },
        tip: {
          zh: "💡 可向服务台借用浮潜面具（部分房型免费提供）。礁石附近能看到成群的热带小鱼。",
          ko: "💡 프런트에서 스노클링 마스크 무료 대여 가능 (일부 객실 포함). 근처 암초 주변에 열대어가 많습니다.",
        },
        venues: null,
      },
      {
        time: "12:30–13:30",
        period: "afternoon",
        icon: "🍽️",
        title: { zh: "酒店海滨餐厅午餐", ko: "호텔 비치 레스토랑 점심" },
        desc: {
          zh: "直接在酒店海边餐厅解决午餐，边吃边看海，体验感拉满。酒店的烤鱼配米饭、越南河粉和炸虾评价都不错，两人午餐约 600,000–900,000 VND。",
          ko: "호텔 해변 레스토랑에서 바다를 보며 점심을 즐기세요. 구운 생선 정식·베트남 쌀국수·새우튀김이 인기입니다. 2인 기준 약 600,000~900,000 VND.",
        },
        tip: null,
        venues: null,
      },
      {
        time: "14:00–17:30",
        period: "afternoon",
        altLabel: { zh: "下午活动二选一", ko: "오후 활동 선택 (둘 중 하나)" },
        tip: null,
        options: [
          {
            tag: { zh: "A 推荐 · 在地 Spa", ko: "A 추천 · 인하우스 스파" },
            icon: "🧖",
            title: {
              zh: "威斯汀天韵水疗 Heavenly Spa",
              ko: "웨스틴 헤븐리 스파",
            },
            desc: {
              zh: "2024 年随酒店全新开业的 Spa，以“焕活”为核心理念，提供精油按摩、热石按摩、越南传统草本泥包等多种项目。在自己入住的酒店做 Spa 最舒适——做完直接回房间躺着，连路都不用走！",
              ko: "2024년 호텔과 함께 신규 오픈한 스파. 아로마 마사지, 핫스톤 마사지, 베트남 전통 허브 마스크 팩 등 다양한 메뉴. 숙박 중인 호텔 스파라 마사지 후 바로 방으로 돌아올 수 있어 가장 편안합니다!",
            },
            venues: [
              {
                name: "Westin Heavenly Spa",
                address: {
                  zh: "威斯汀金兰度假村酒店内，步行 2 分钟到达",
                  ko: "웨스틴 깜라인 리조트 내, 도보 2분",
                },
                price: {
                  zh: "60 分钟约 1,200,000 VND；90 分钟约 1,800,000 VND（含双人包房设施）",
                  ko: "60분 약 1,200,000 VND; 90분 약 1,800,000 VND (커플 룸 포함)",
                },
                rating: "⭐⭐⭐⭐⭐",
                tip: {
                  zh: "早餐后立即预约！旺季（7月）下午档位极易满，尤其是 15:00-17:00 的情侣双人间。",
                  ko: "조식 후 즉시 예약하세요! 7월 성수기 오후 15:00~17:00 커플 룸은 금방 찹니다.",
                },
              },
            ],
          },
          {
            tag: {
              zh: "B 可选 · 进市区半日游",
              ko: "B 대안 · 시내 반나절 나들이",
            },
            icon: "🚕",
            title: {
              zh: "Grab 进芽庄市区轻游（仅限精力充沛时）",
              ko: "Grab으로 냐짱 시내 반나절 나들이 (체력 여유 있을 때만)",
            },
            desc: {
              zh: "叫 Grab 进市区约 40 分钟、约 150,000 VND 单程。推荐逛大坝市场（买零食、咖啡豆初步踩点）、喝杯 CCCP 椰子咖啡，傍晚在陈富海滩走走看日落后打车回来。不建议安排太多景点——第 12-13 日才是市区深度游的主场！",
              ko: "Grab으로 시내까지 약 40분, 편도 약 150,000 VND. 담 시장 예비 탐방 + CCCP 코코넛 커피 한 잔 + 쩐푸 해변 석양 산책 후 귀환을 추천. 무리하지 마세요, 본격 시내 관광은 4~5일차입니다!",
            },
            venues: null,
          },
        ],
      },
      {
        time: "18:00–20:30",
        period: "evening",
        icon: "🌅",
        title: {
          zh: "日落海景 + 威斯汀海鲜晚餐",
          ko: "석양 감상 + 웨스틴 해산물 저녁식사",
        },
        desc: {
          zh: "回到海边坐下来，看金兰湾日落。然后去酒店海鲜餐厅用晚餐，推荐让服务员展示当日渔获，现点龙虾或鱼类现做，味道极鲜。两人晚餐含龙虾约 1,200,000-1,600,000 VND。",
          ko: "해변에서 깜라인만 석양을 감상하고, 호텔 해산물 레스토랑에서 저녁을 즐기세요. 당일 어획물을 직접 보고 고르는 것을 추천합니다. 2인 랍스터 포함 기준 약 1,200,000~1,600,000 VND.",
        },
        tip: null,
        venues: null,
      },
    ],
  },

  /* ── 第3天 ── */
  {
    date: "7/11",
    isHighlight: true,
    mood: { zh: "🎢 竹岛大冒险", ko: "🎢 혼쩨 섬 어드벤처" },
    title: {
      zh: "缆车上岛 · VinWonders · Tata Show 夜间灯光秀",
      ko: "케이블카 입도 · VinWonders · Tata Show 야간 공연",
    },
    hotel: "Nha Trang Marriott Resort & Spa, Hon Tre Island",
    slots: [
      {
        time: "07:30–09:30",
        period: "morning",
        icon: "🍳",
        title: {
          zh: "威斯汀最后一顿早餐 + 整理退房",
          ko: "웨스틴 마지막 조식 + 체크아웃 준비",
        },
        desc: {
          zh: "把威斯汀早餐吃好，体力充足才能玩转全天岛上行程。提前跟前台确认退房，钛金建议争取 11:00-12:00 退房即可（不需要强求 4PM 延迟退房，把这个权益留给今晚的岛上万豪！）。",
          ko: "웨스틴 조식을 든든히 즐겨야 VinWonders를 하루 종일 즐길 수 있습니다. 프런트에서 체크아웃 시간을 확인하세요. 4PM 레잇 체크아웃 권한은 아껴두고 오늘 밤 섬 메리어트에서 사용하세요!",
        },
        tip: null,
        venues: null,
      },
      {
        time: "10:00–11:30",
        period: "morning",
        altLabel: { zh: "上岛方式二选一", ko: "섬 이동 방법 선택" },
        tip: {
          zh: "💡 到缆车站/码头前，建议先购好 VinWonders 门票（官网提前购买可用优惠码 NIHAO5 享 5% 折扣，成人约 1,050,000 VND）。",
          ko: "💡 케이블카역/선착장 출발 전, VinWonders 입장권을 공식 홈페이지에서 미리 구매하세요 (코드 NIHAO5 5% 할인, 성인 약 1,050,000 VND).",
        },
        options: [
          {
            tag: {
              zh: "A 强推 · 跨海缆车（必体验！）",
              ko: "A 강추 · 해상 케이블카 (필수 체험!)",
            },
            icon: "🚡",
            title: {
              zh: "VinWonders 跨海缆车 —— 空中俯瞰芽庄湾",
              ko: "VinWonders 해상 케이블카 — 공중에서 내려다보는 냐짱만",
            },
            desc: {
              zh: "全长 3,320 米，曾是世界最长跨海缆车的传奇！空中吊厢缓缓越过深蓝色的芽庄湾，能清晰看到珊瑚礁、渔船和远处的城市天际线。天气好时能见度极佳，单程约 15 分钟。缆车站位于陈富路海滨（打 Grab 从威斯汀约 45 分钟），缆车费已包含在 VinWonders 门票内。",
              ko: "전장 3,320m, 세계 최장 해상 케이블카였던 명물! 곤돌라가 짙푸른 냐짱만 위를 천천히 가로지르며 산호초·어선·도시 스카이라인을 한눈에 담을 수 있습니다. 날씨 좋을 때 편도 약 15분. 케이블카 비용은 VinWonders 입장권에 포함되어 있습니다.",
            },
            venues: [
              {
                name: {
                  zh: "VinWonders 缆车站 / Cáp treo Vinpearl",
                  ko: "VinWonders 케이블카역 / Cáp treo Vinpearl",
                },
                address: {
                  zh: "Đường 2 Tháng 4，陈富路海滨；从威斯汀 Grab 约 45 分钟",
                  ko: "Đường 2 Tháng 4, 쩐푸 해변 인근; 웨스틴에서 Grab 약 45분",
                },
                price: {
                  zh: "含在 VinWonders 全日票内（成人约 1,050,000 VND）",
                  ko: "VinWonders 종일권에 포함 (성인 약 1,050,000 VND)",
                },
                rating: "⭐⭐⭐⭐⭐",
                tip: {
                  zh: "排队高峰在 9:00-10:00，11:00 左右更顺；旺季强烈建议提前在官网购票！",
                  ko: "혼잡 피크: 09:00~10:00. 11시경에 타면 대기 짧음. 성수기엔 공식 사이트 사전 구매 강력 권장!",
                },
              },
            ],
          },
          {
            tag: {
              zh: "B 省时 · 万豪专属快艇",
              ko: "B 시간 절약 · 메리어트 전용 스피드보트",
            },
            icon: "🚤",
            title: {
              zh: "乘万豪 24h 免费快艇直抵岛上",
              ko: "메리어트 24시간 무료 스피드보트로 빠르게 입도",
            },
            desc: {
              zh: "万豪酒店提供 24 小时专属快艇，码头位于陈富路北侧，乘船约 15 分钟直抵岛屿码头。适合行李较多、或者已经游览过缆车的情况。缆车的壮丽视野是不可替代的——如果是第一次，强烈建议选缆车。",
              ko: "메리어트 전용 스피드보트는 쩐푸 해변 북쪽 선착장에서 24시간 운행, 약 15분이면 섬에 도착합니다. 짐이 많거나 케이블카를 이미 경험했다면 이 방법이 효율적입니다. 하지만 첫 방문이라면 케이블카를 강력 권장합니다!",
            },
            venues: null,
          },
        ],
      },
      {
        time: "12:00–13:30",
        period: "afternoon",
        icon: "🏨",
        title: {
          zh: "万豪入住 + 简单午餐",
          ko: "메리어트 체크인 + 간단한 점심",
        },
        desc: {
          zh: "抵岛后先去万豪办理入住，告知前台钛金会员身份，争取海景房或别墅房型（岛上万豪升级概率极高！）。午餐直接在酒店餐厅或 VinWonders 内快餐区解决（园内有越南快餐和多家饮品店），不需要花太多时间。行李先交前台，叫 Buggy 送进房间即可。",
          ko: "섬 도착 후 메리어트에서 체크인, 티타늄 멤버십을 알리고 오션뷰 또는 빌라 업그레이드를 요청하세요 (업그레이드 확률 매우 높음!). 점심은 호텔 레스토랑이나 VinWonders 내 푸드코트를 이용. 짐은 호텔에 맡기고 버기카로 방에 보내달라고 하세요.",
        },
        tip: {
          zh: "💡 Buggy（电瓶车）随时可以叫，不需要提前预约，打个电话或在服务点招手即可，免费！",
          ko: "💡 버기카는 언제든 호출 가능(전화 또는 서비스 포인트에서 손 들기), 무료!",
        },
        venues: null,
      },
      {
        time: "14:00–18:30",
        period: "afternoon",
        icon: "🎢",
        title: {
          zh: "VinWonders 下午全力冲刺！",
          ko: "VinWonders 오후 풀 스로틀!",
        },
        desc: {
          zh: "按优先级排攻略顺序：① 高山飞车 Alpine Coaster（排队约 20–30 分钟，情侣同乘一辆，速度感极强）→ ② 水上乐园（波浪池、高速水滑道、懒人河，夏日必玩）→ ③ 水族馆海底世界（室内凉快，展示珊瑚鱼和海洋生物）→ ④ 傍晚在喷泉广场拍照休息，等待 Tata Show 开场。",
          ko: "우선순위 공략 순서: ① 알파인 코스터(대기 20~30분, 커플 함께 탑승 가능, 스릴 만점) → ② 워터파크(파도풀·슬라이드·레이지 리버, 여름 필수) → ③ 아쿠아리움(실내, 시원함) → ④ 저녁에 분수 광장에서 사진 촬영 + Tata Show 대기.",
        },
        tip: {
          zh: "💡 水上乐园可租泳衣（约 50,000 VND），贵重物品存酒店不要带进园内。7 月旺季水区 14:00 后人稍少，建议先玩陆地项目再进水区。",
          ko: "💡 워터파크 수영복 대여 가능 (약 50,000 VND). 귀중품은 호텔에 보관하세요. 7월 성수기는 오후 2시 이후 워터파크 인파가 약간 줄어듭니다.",
        },
        venues: [
          {
            name: "VinWonders Nha Trang",
            address: {
              zh: "Hon Tre 岛内（缆车/快艇即抵）",
              ko: "혼쩨(Hon Tre) 섬 내 (케이블카·보트로 입장)",
            },
            price: {
              zh: "成人全日票约 1,050,000 VND；官网优惠码 NIHAO5 享 5% 折扣；提前 7 天购买额外 3% 折扣",
              ko: "성인 종일권 약 1,050,000 VND; 공식 사이트 코드 NIHAO5 5% 할인; 7일 전 구매 시 추가 3% 할인",
            },
            rating: "⭐⭐⭐⭐",
            tip: {
              zh: "营业约 09:00-20:00（旺季可延长）；Tata Show 每日 19:30 在 VinPearl Harbour 水上舞台，周五/周日额外有烟火表演！",
              ko: "운영 약 09:00~20:00 (성수기 연장). Tata Show 매일 19:30 빈펄 하버 수상 무대; 금·일요일엔 불꽃놀이 추가!",
            },
          },
        ],
      },
      {
        time: "19:00–21:30",
        period: "evening",
        icon: "🎭",
        title: {
          zh: "晚餐 + Tata Show 水上灯光秀",
          ko: "저녁식사 + Tata Show 수상 공연",
        },
        desc: {
          zh: "晚餐选择：① 万豪岛上自助晚餐（约 800,000 VND/人，大虾、螃蟹、龙虾、刺身一应俱全，叫 Buggy 5 分钟即到）② 或在 VinWonders 园内快餐区约 18:30 提前解决，省出时间占好 Tata Show 观赏位。19:30 准时赶到 VinPearl Harbour 的水上舞台，Tata Show 融合杂技、水中舞蹈和震撼灯光，约 40 分钟，极其精彩！周五或周日还附带 19:30–20:10 烟火表演。",
          ko: "저녁식사: ① 메리어트 섬 뷔페 (약 800,000 VND/인, 새우·게·랍스터·사시미 완비, 버기카 5분) ② 또는 VinWonders 푸드코트에서 18:30에 미리 해결하고 Tata Show 좋은 자리 선점. 19:30 빈펄 하버 수상 무대에서 Tata Show를 관람하세요. 서커스·수중 댄스·조명쇼 약 40분, 엄청난 스펙터클! 금·일요일엔 19:30~20:10 불꽃놀이 추가.",
        },
        tip: {
          zh: "🎆 如果行程中有周五或周日，强烈建议这晚住岛上看烟火 Tata Show！Show 结束后叫 Buggy 直接回房，完美收尾。",
          ko: "🎆 금요일이나 일요일이 포함되어 있다면 그날 섬에 숙박해 불꽃놀이 Tata Show를 꼭 보세요! 공연 후 버기카로 바로 객실로 귀환.",
        },
        venues: null,
      },
    ],
  },

  /* ── 第4天 ── */
  {
    date: "7/12",
    isHighlight: true,
    mood: { zh: "🏙️ 离岛返城", ko: "🏙️ 섬 출발, 시내 복귀" },
    title: {
      zh: "VinWonders 续玩 · 离岛回市区 · 占婆塔+钟屿+夜市",
      ko: "VinWonders 이어서 · 섬 출발 · 참탑+혼쫑+야시장",
    },
    hotel: "Four Points by Sheraton Nha Trang",
    slots: [
      {
        time: "08:00–11:30",
        period: "morning",
        icon: "🎡",
        title: {
          zh: "万豪早餐 + VinWonders 上午补玩",
          ko: "메리어트 조식 + VinWonders 오전 추가 체험",
        },
        desc: {
          zh: "充分利用钛金 4PM 延迟退房特权，今天不用急！早餐后轻装进乐园，重点补玩昨天没时间的项目：动物园区（园内有河马、长颈鹿、羊驼等珍稀动物，亲子区）、室内 4D 电影院、VR 互动体验区、室内游戏机区。这些项目在下午人最多，上午反而安静。11:30 前结束乐园，叫 Buggy 回房间整理行李。",
          ko: "티타늄 4PM 레잇 체크아웃을 최대한 활용하세요! 조식 후 가볍게 VinWonders 오전 세션. 어제 못 한 항목: 동물원 구역(하마·기린·알파카 등), 4D 영화관, VR 체험존, 실내 게임 코너. 오전에는 인파가 적어 더 쾌적합니다. 11:30 테마파크 마무리 후 버기카로 호텔 귀환.",
        },
        tip: null,
        venues: null,
      },
      {
        time: "12:00–14:00",
        period: "afternoon",
        icon: "🚤",
        title: {
          zh: "离岛 → 回市区 → 入住 Four Points",
          ko: "섬 출발 → 시내 이동 → 포포인츠 체크인",
        },
        desc: {
          zh: "叫 Buggy 送到快艇码头（约 5 分钟），坐 15 分钟快艇回陈富路北侧码头，出来叫 Grab 前往 Four Points by Sheraton（约 10 分钟、约 50,000 VND）。Four Points 是一栋海滨高层地标，顶楼无边泳池和全海景视角是芽庄最棒的高楼观景体验之一。",
          ko: "버기카로 스피드보트 선착장으로 이동(5분), 15분 보트로 쩐푸 해변 북쪽 선착장 귀환, Grab으로 포포인츠 바이 쉐라톤 이동(약 10분, 50,000 VND). 고층 인피니티 풀과 전망이 냐짱 최고 수준입니다.",
        },
        tip: null,
        venues: null,
      },
      {
        time: "15:00–18:30",
        period: "afternoon",
        icon: "🏛️",
        title: {
          zh: "占婆塔 + 钟屿石岬角连线（经典文化串游）",
          ko: "포나가르 참탑 + 혼쫑 연계 코스 (클래식 문화 루트)",
        },
        desc: {
          zh: "这是芽庄最经典的下午文化路线！两处景点仅相距约 1.5 公里，步行 20 分钟可连贯游览。顺序：15:00 占婆塔（建于公元 7-12 世纪，印度教建筑，红砖塔配蓝天极具异域感，约 1–1.5 小时）→ 步行 20 分钟 → 16:30 钟屿石岬角（《情人》取景地，巨大花岗岩延伸入海）→ 在岩石旁的海边小咖啡馆坐下，点一杯越南冰咖啡（Cà phê sữa đá）看夕阳，极其惬意！",
          ko: "냐짱 최고의 오후 문화 루트! 두 곳은 약 1.5km 거리로 도보 20분에 연결됩니다. 순서: 15:00 포나가르 참탑 (7~12세기 힌두 건축, 붉은 벽돌+파란 하늘 = 이국적 사진 명소, 약 1~1.5시간) → 도보 20분 → 16:30 혼쫑 (영화 '연인' 촬영지, 거대한 화강암이 바다로) → 바위 옆 해변 카페에서 베트남 연유 아이스커피(Cà phê sữa đá)와 함께 석양 감상!",
        },
        tip: {
          zh: "📍 占婆塔：2 Tháng 4，开放 07:00-18:00，票价约 30,000 VND；着装注意不能穿吊带/暴露衣物。钟屿：紧邻占婆塔，步行可达，约 30,000 VND。两处门口均有骗子拉人，直接走进正门买票即可。",
          ko: "📍 참탑: 2 Tháng 4, 07:00~18:00, 입장료 30,000 VND; 민소매·노출 과다 복장 금지. 혼쫑: 참탑에서 도보, 30,000 VND. 두 곳 모두 호객꾼 있으니 정문으로 바로 진입.",
        },
        venues: null,
      },
      {
        time: "19:00–22:00",
        period: "evening",
        altLabel: {
          zh: "晚餐 + 夜间活动选择",
          ko: "저녁식사 + 야간 활동 선택",
        },
        tip: null,
        options: [
          {
            tag: {
              zh: "A 推荐 · 海鲜 + 屋顶酒吧",
              ko: "A 추천 · 해산물 + 루프탑 바",
            },
            icon: "🦞",
            title: {
              zh: "清霜海鲜大排档 + Altitude 屋顶酒吧",
              ko: "탄스엉 해산물 + Altitude 루프탑 바",
            },
            desc: {
              zh: "步行 3 分钟去清霜海鲜（Thanh Suong），价格透明的本地海鲜排档，点大虾、螃蟹、贝类、海鲜炒面，两人吃饱约 500,000-700,000 VND。吃完步行回 Four Points，坐电梯到顶楼 Altitude Bar，俯瞰芽庄全城夜景，喝一杯鸡尾酒（约 200,000 VND），情侣收尾氛围感满分。",
              ko: "호텔에서 3분 걸어 탄스엉(Thanh Suong) 해산물 식당으로 이동. 가격 투명한 현지 식당으로 새우·게·조개·볶음면 2인 기준 500,000~700,000 VND. 식사 후 포포인츠 꼭대기 Altitude Bar에서 칵테일 한 잔(약 200,000 VND)과 함께 냐짱 야경 감상. 커플 분위기 완성!",
            },
            venues: [
              {
                name: {
                  zh: "Thanh Suong Seafood (清霜海鲜)",
                  ko: "Thanh Suong Seafood (탄스엉 해산물)",
                },
                address: {
                  zh: "Four Points 北侧步行约 3 分钟，陈富路一带",
                  ko: "포포인츠에서 북쪽 도보 3분, 쩐푸 해변 인근",
                },
                price: {
                  zh: "约 250,000–400,000 VND/人",
                  ko: "약 250,000~400,000 VND/인",
                },
                rating: "⭐⭐⭐⭐",
                tip: {
                  zh: "营业至深夜，不接受预约先到先得；旺季 20:00 前后最热闹，略需等位。",
                  ko: "심야까지 영업, 예약 불가 선착순. 성수기 20:00 전후 가장 붐비니 그 전에 가는 게 좋습니다.",
                },
              },
              {
                name: "Altitude Rooftop Bar",
                address: {
                  zh: "Four Points by Sheraton 顶楼，电梯直达",
                  ko: "포포인츠 바이 쉐라톤 최상층, 엘리베이터 직행",
                },
                price: {
                  zh: "鸡尾酒约 150,000–250,000 VND/杯",
                  ko: "칵테일 약 150,000~250,000 VND/잔",
                },
                rating: "⭐⭐⭐⭐⭐",
                tip: null,
              },
            ],
          },
          {
            tag: {
              zh: "B 可选 · 夜市街头觅食",
              ko: "B 대안 · 야시장 거리 음식 탐방",
            },
            icon: "🌃",
            title: {
              zh: "芽庄夜市 (Chợ Đêm) 街头逛吃",
              ko: "냐짱 야시장 거리 음식 투어",
            },
            desc: {
              zh: "芽庄夜市在陈富路一带，傍晚开始营业至深夜。边走边吃：Bánh mì（越南法棍，约 25,000 VND）、Nem nướng（烤肉春卷，40,000 VND 起）、热带水果摊，体验地道越南市井气息，两人花 100,000-200,000 VND 就能吃好喝好。",
              ko: "냐짱 야시장은 쩐푸 해변 일대 저녁부터 심야까지 운영. 반미(25,000 VND), 넴느엉(40,000 VND~), 열대 과일 노점을 돌아다니며 즐기세요. 2인 100,000~200,000 VND면 든든하게 즐길 수 있습니다.",
            },
            venues: null,
          },
        ],
      },
    ],
  },

  /* ── 第5天 ── */
  {
    date: "7/13",
    isHighlight: false,
    mood: { zh: "🌊 市区深度探索", ko: "🌊 시내 딥다이브" },
    title: {
      zh: "上午：潜水/泥浴二选一 · 下午寺庙 · 晚间顶级 Spa",
      ko: "오전: 다이빙/머드배스 선택 · 오후 사원 · 저녁 스파",
    },
    hotel: "Sheraton Nha Trang Hotel & Spa",
    slots: [
      {
        time: "07:30–14:00",
        period: "morning",
        altLabel: {
          zh: "上午活动（两条路线，二选一）",
          ko: "오전 활동 (두 가지 루트 중 하나 선택)",
        },
        tip: null,
        options: [
          {
            tag: {
              zh: "A 强推 · 黑岛潜水一日游",
              ko: "A 강추 · 혼문 스쿠버다이빙 일일 투어",
            },
            icon: "🤿",
            title: {
              zh: "黑岛 (Hon Mun) 精品潜水 / 浮潜一日游",
              ko: "혼문 섬 (흑도) 스쿠버다이빙 / 스노클링 일일 투어",
            },
            desc: {
              zh: "全网口碑一致的芽庄必体验项目！黑岛是越南最好的潜水点，300+ 种珊瑚、五彩热带鱼群、能见度高峰可达 20-30 米。即使没有潜水证，报体验潜水（Discover Scuba Diving）可由专业教练 1 对 1 带领下水，安全有保障。约 08:00 从 Cầu Đá 码头出发，包含快艇、装备、午餐，约 13:30 返回。务必提前 1-2 天预订！",
              ko: "냐짱 최고 수질의 다이빙 포인트! 혼문 섬은 베트남 최고의 다이빙 스폿으로 300종 이상 산호, 열대어, 최대 능견도 20~30m. 자격증 없어도 강사 1:1 체험 다이빙(Discover Scuba)으로 수중 세계를 안전하게 경험할 수 있습니다. 약 08:00 Cầu Đá 부두 출발, 장비·보트·점심 포함, 약 13:30 귀환. 1~2일 전 예약 필수!",
            },
            venues: [
              {
                name: {
                  zh: "推荐机构：Rainbow Divers Nha Trang",
                  ko: "추천 업체: Rainbow Divers Nha Trang",
                },
                address: {
                  zh: "Cầu Đá 码头集合（距喜来登打 Grab 约 10 分钟，50,000 VND）",
                  ko: "Cầu Đá 부두 (쉐라톤에서 Grab 약 10분, 50,000 VND)",
                },
                price: {
                  zh: "体验潜水（无证）约 1,200,000–1,500,000 VND/人；双气瓶持证约 1,800,000–2,500,000 VND/人；均含快艇·装备·午餐",
                  ko: "체험 다이빙(무자격) 약 1,200,000~1,500,000 VND/인; 자격증 2탱크 약 1,800,000~2,500,000 VND/인; 보트·장비·점심 포함",
                },
                rating: "⭐⭐⭐⭐⭐",
                tip: {
                  zh: "Rainbow Divers 是芽庄最老牌、口碑最好的英文潜水机构之一，安全性极高。也可通过喜来登礼宾部推荐提供中文服务的当地潜水团。",
                  ko: "Rainbow Divers는 냐짱 최고 평점의 다이빙 전문 업체입니다. 한국어/중국어 가이드 투어는 호텔 컨시어지를 통해 추천받으세요.",
                },
              },
            ],
          },
          {
            tag: {
              zh: "B 休闲版 · 泥浴温泉",
              ko: "B 여유 버전 · 머드배스 온천",
            },
            icon: "🛁",
            title: {
              zh: "I-Resort 矿泥浴 + 双人私密池（芽庄最推荐的泥浴）",
              ko: "I-Resort 미네랄 머드배스 + 2인 프라이빗 탕 (냐짱 최고 추천)",
            },
            desc: {
              zh: "09:30 叫 Grab 出发（约 20 分钟，7 公里，约 80,000 VND）。I-Resort 是芽庄最高档、环境最好的矿泥浴，坐拥热带雨林般的绿色景观。双人私密泥浆池容 2 人同时泡，20 分钟泥浆浴完毕后换去泡矿泉温泉池（有大小不同的户外温泉区），全程约 2.5–3 小时，皮肤极其滑嫩。约 12:30 叫 Grab 返回市区吃午饭。",
              ko: "09:30 Grab 출발 (약 20분, 7km, 약 80,000 VND). I-Resort는 냐짱 최고급 머드배스로 열대우림 느낌의 조경이 아름답습니다. 2인 프라이빗 탕에서 20분 머드배스 후 온천 풀(크기 다양한 야외 온천)로 이동, 전 과정 약 2.5~3시간. 피부가 실크처럼 매끄러워집니다. 약 12:30 Grab으로 시내 귀환.",
            },
            venues: [
              {
                name: {
                  zh: "I-Resort 矿泉泥浴中心",
                  ko: "I-Resort 미네랄 머드배스 센터",
                },
                address: {
                  zh: "19 Xuân Ngọc, Vĩnh Ngọc，芽庄市区北约 7 公里",
                  ko: "19 Xuân Ngọc, Vĩnh Ngọc, 냐짱 시내 북쪽 약 7km",
                },
                price: {
                  zh: "2 人私密泥浴约 350,000 VND/人；含矿泉温泉池使用权；入园费约 100,000-150,000 VND/人（两项合计约 500,000 VND/人）",
                  ko: "2인 프라이빗 머드배스 약 350,000 VND/인; 온천 풀 포함; 입장료 약 100,000~150,000 VND/인 (합계 약 500,000 VND/인)",
                },
                rating: "⭐⭐⭐⭐",
                tip: {
                  zh: "开放 08:00-17:30（最晚 16:30 入园）；旺季 10:00 前到场更舒适；记得带沐浴液或提前向园区购买。",
                  ko: "운영: 08:00~17:30 (16:30 마지막 입장). 성수기엔 오전 10시 전 도착이 쾌적. 샤워 젤을 챙기거나 현장 구매 가능.",
                },
              },
            ],
          },
        ],
      },
      {
        time: "14:30–17:30",
        period: "afternoon",
        icon: "🏯",
        title: {
          zh: "龙山寺 + 大教堂（或二选一）+ 咖啡休息",
          ko: "롱선사 + 대성당 (또는 둘 중 하나) + 카페 휴식",
        },
        desc: {
          zh: "路线推荐：先去龙山寺（22 Đường 23 Tháng 10，免费，爬 150 级台阶后俯瞰全城，24 米白色大佛近距离仰望极震撼，约 45-60 分钟）→ 打 Grab 5 分钟 → 芽庄大教堂（1 Thái Nguyên，1928 年法式哥特建筑，玫瑰花窗极美，约 30-45 分钟，注意穿着）→ 步行去 CCCP Coffee 喝一杯椰子咖啡或冰拿铁（约 55,000-70,000 VND），好好休息 30 分钟再返酒店。",
          ko: "추천 루트: 롱선사(22 Đường 23 Tháng 10, 무료, 계단 150개 오르면 24m 백불상과 냐짱 전경 감동, 약 45~60분) → Grab 5분 → 냐짱 대성당(1 Thái Nguyên, 1928년 프랑스 고딕 건축, 스테인드글라스 아름다움, 약 30~45분, 복장 주의) → 도보로 CCCP Coffee에서 코코넛 커피 또는 아이스 라테(약 55,000~70,000 VND)로 충전 후 호텔 귀환.",
        },
        tip: {
          zh: "💡 如果是 A 路线（潜水）回来较累，可以只选大教堂（无台阶，轻松）跳过龙山寺，然后直接去 Spa。",
          ko: "💡 A루트(다이빙) 후 피곤하다면 계단 없는 대성당만 선택하고 롱선사는 패스, 바로 스파로 이동해도 됩니다.",
        },
        venues: null,
      },
      {
        time: "18:00–20:00",
        period: "evening",
        altLabel: {
          zh: "晚间 Spa（提前预约！）",
          ko: "저녁 스파 (사전 예약 필수!)",
        },
        tip: {
          zh: "⚠️ 无论选 A 还是 B，当天下午一定记得再次确认预约时间，Spa 方可能会临时来电调整。",
          ko: "⚠️ A/B 중 어느 스파든 당일 오후에 예약 시간을 다시 한 번 확인하세요. 스파 측에서 조정 전화가 올 수도 있습니다.",
        },
        options: [
          {
            tag: {
              zh: "A 强推 · Sen Spa (芽庄排名第一)",
              ko: "A 강추 · Sen Spa (냐짱 평점 1위)",
            },
            icon: "🌸",
            title: {
              zh: "Sen Spa 90 分钟精油/泰式按摩",
              ko: "Sen Spa 90분 아로마/타이 마사지",
            },
            desc: {
              zh: "Google 评分 4.9 分、4,600+ 评价，TripAdvisor 芽庄 Spa 名人堂！独立别墅式小洋房，环境静谧雅致，按摩师均通过专业认证培训。服务流程：迎宾草药足浴（15 分钟）→ 90 分钟全身精油/泰式/深层按摩 → 现榨果汁收尾。两人双间体验感极其到位，是整趟旅程最值得期待的放松项目！⚠️ 因人气太高，必须至少提前 1 天预约，最好提前 2 天通过 WhatsApp 或电话预约！",
              ko: "Google 4.9점 (4,600+ 리뷰), TripAdvisor 냐짱 스파 명예의 전당! 독립 빌라 형태의 조용하고 아늑한 공간. 모든 테라피스트 전문 자격 보유. 서비스: 허브 족욕(15분) → 90분 전신 아로마/타이/딥티슈 마사지 → 신선 주스 제공. 2인 커플 룸 체험은 이번 여행 최고의 힐링 포인트! ⚠️ 매우 인기가 높아 최소 1일 전, 가급적 2일 전 WhatsApp/전화 예약 필수!",
            },
            venues: [
              {
                name: "Sen Spa Nha Trang",
                address: {
                  zh: "Số 5, Lý Thánh Tôn, TP Nha Trang（距喜来登步行约 10 分钟，打 Grab 约 5 分钟）",
                  ko: "Số 5, Lý Thánh Tôn, 냐짱 (쉐라톤에서 도보 약 10분, Grab 5분)",
                },
                price: {
                  zh: "90 分钟精油/泰式/深层按摩约 400,000–600,000 VND/人（两人合计约 1,200,000 VND 以内）",
                  ko: "90분 아로마/타이/딥티슈 마사지 약 400,000~600,000 VND/인 (2인 합계 약 1,200,000 VND 이하)",
                },
                rating: "⭐⭐⭐⭐⭐ (Google 4.9 · TripAdvisor 名人堂)",
                tip: {
                  zh: "📞 0258 382 9899；营业 08:30-20:30；WhatsApp 可预约；官网 senspanhatrang.com 可查完整价格表。小费建议每位约 2 USD（当地惯例）。",
                  ko: "📞 0258 382 9899; 영업 08:30~20:30; WhatsApp 예약 가능; senspanhatrang.com에서 전체 메뉴·가격 확인. 팁은 인당 약 2달러 권장 (현지 관례).",
                },
              },
            ],
          },
          {
            tag: {
              zh: "B 可选 · SuSpa (中国客热门，可当天约)",
              ko: "B 대안 · SuSpa (중국인 인기, 당일 예약 가능)",
            },
            icon: "🧴",
            title: {
              zh: "Su Spa 60 分钟越式精油按摩",
              ko: "Su Spa 60분 베트남식 오일 마사지",
            },
            desc: {
              zh: "中文游客口碑极佳的精油按摩店，位置很便利。越式全身精油按摩，力道偏重，非常解乏，不少人回来多次。预约比 Sen Spa 容易，当天电话预约通常也能约到。飞猪/携程提前购比现场便宜约 20-30 元。建议携带 1 万越盾小费，按摩师会很开心。",
              ko: "중국 여행자 인기 오일 마사지 샵. 위치가 매우 편리합니다. 베트남식 전신 오일 마사지로 강도 세고 전문적. Sen Spa보다 예약이 훨씬 쉽고 당일 전화 예약도 가능. 씨트립/페이저우 사전 구매 시 20~30위안 절약. 팁 10,000 VND 챙겨가면 더 좋습니다.",
            },
            venues: [
              {
                name: "Su Spa",
                address: {
                  zh: "229 Nguyễn Thiện Thuật, TP Nha Trang（距喜来登约 1.5 公里，打 Grab 5 分钟）",
                  ko: "229 Nguyễn Thiện Thuật, 냐짱 (쉐라톤에서 약 1.5km, Grab 5분)",
                },
                price: {
                  zh: "60 分钟越式精油按摩约 95–120 元人民币（通过飞猪/携程提前购买更优惠）",
                  ko: "60분 베트남식 오일 마사지 약 95~120위안 (씨트립/페이저우 사전 구매가 더 저렴)",
                },
                rating: "⭐⭐⭐⭐",
                tip: {
                  zh: "营业 09:00-22:00，中文沟通无障碍。按摩前填需求表（力道轻重、重点部位），越式需脱至内裤，属正常流程。",
                  ko: "영업: 09:00~22:00. 중국어 소통 가능. 마사지 전 요구사항 체크리스트 작성 (강도, 중점 부위). 베트남식은 속옷만 남기는 것이 정상 과정.",
                },
              },
            ],
          },
        ],
      },
      {
        time: "20:30–22:00",
        period: "evening",
        icon: "🦞",
        title: {
          zh: "喜来登晚餐：海鲜自助 or 酒廊欢乐时光",
          ko: "쉐라톤 저녁: 해산물 뷔페 또는 클럽 라운지 해피아워",
        },
        desc: {
          zh: "方案 ①：喜来登 1 楼海鲜自助晚餐，是芽庄市区最顶尖的酒店自助水准，龙虾、虾蟹、生蚝、刺身应有尽有，约 1,000,000–1,200,000 VND/人。方案 ②：如有钛金行政酒廊权益，直接去酒廊！18:00-20:00 欢乐时光，热食、鸡尾酒、点心不断，完全可以当正餐，还能俯瞰陈富海滩夜景，性价比极高。",
          ko: "방안 ①: 쉐라톤 1층 해산물 뷔페, 냐짱 호텔 뷔페 최고 수준으로 랍스터·새우·게·굴·사시미 완비, 약 1,000,000~1,200,000 VND/인. 방안 ②: 티타늄 클럽 라운지 혜택이 있다면 18:00~20:00 해피아워 이용! 핫푸드·칵테일·스낵을 정식 식사 대신 즐기며 쩐푸 해변 야경도 볼 수 있어 가성비 최고.",
        },
        tip: null,
        venues: null,
      },
    ],
  },

  /* ── 第6天 ── */
  {
    date: "7/14",
    isHighlight: false,
    mood: { zh: "🛍️ 购物收尾日", ko: "🛍️ 쇼핑 마무리 데이" },
    title: {
      zh: "大坝市场扫货 · 告别海鲜 · 返回金兰海湾",
      ko: "담 시장 쇼핑 · 작별 해산물 만찬 · 깜라인 귀환",
    },
    hotel: "Wyndham Grand KN Paradise Cam Ranh",
    slots: [
      {
        time: "08:30–10:00",
        period: "morning",
        icon: "🍳",
        title: {
          zh: "喜来登最后一顿丰盛早餐",
          ko: "쉐라톤 마지막 조식 (이번 여행 최고 조식)",
        },
        desc: {
          zh: "喜来登早餐是本次行程中口碑最好的一顿，热食种类超多，品质稳定，好好享用。吃饱了，今天下午进金兰前不需要再专门吃饭，可以撑到晚餐。",
          ko: "쉐라톤 조식은 이번 여행 중 가장 평이 좋습니다. 뜨거운 음식 종류가 많고 퀄리티가 안정적입니다. 든든히 드시면 오후 깜라인 이동 전까지 별도 식사 없이도 괜찮습니다.",
        },
        tip: null,
        venues: null,
      },
      {
        time: "10:30–12:00",
        period: "morning",
        icon: "🛒",
        title: {
          zh: "大坝市场（Chợ Đầm）集中采购伴手礼",
          ko: "담 시장(Chợ Đầm) 기념품 집중 쇼핑",
        },
        desc: {
          zh: "芽庄最大、最全的传统市场，也是买伴手礼的最高性价比去处。强烈推荐购入：① 越南咖啡豆（Trung Nguyen 中原品牌散装最香，500g 约 80,000-100,000 VND）② 盐焗腰果（按斤称，新鲜极香，500g 约 100,000-150,000 VND）③ 芒果干、菠萝蜜干、龙眼干等果干 ④ 椰子糖（Phinhdan 品牌）。砍价技巧：开口价的 5–6 折是合理成交价，先表示兴趣但不动手，多逛几家对比再出手。",
          ko: "냐짱 최대 전통 시장이자 기념품 쇼핑 최고의 장소. 추천 구매품: ① 베트남 커피(Trung Nguyen 중원 브랜드 산지 커피, 500g 약 80,000~100,000 VND) ② 소금 구운 캐슈넛(신선하고 향기로움, 500g 약 100,000~150,000 VND) ③ 망고·잭프루트·용안 건과일 ④ 코코넛 사탕(Phinhdan 브랜드). 흥정: 부르는 가격의 50~60%에 성사, 여러 가게 비교 후 구매.",
        },
        tip: {
          zh: "💡 大坝市场开放约 07:00–18:00；市场内有些摊主会主动说中文，大方沟通。买完先存车库，减轻步行负担。",
          ko: "💡 담 시장 운영 07:00~18:00. 중국어로 말걸어 오는 상인도 있습니다. 구매한 짐은 주차장에 맡겨 두고 쇼핑 계속.",
        },
        venues: [
          {
            name: { zh: "大坝市场 (Chợ Đầm)", ko: "담 시장 (Chợ Đầm)" },
            address: {
              zh: "Phan Bội Châu，芽庄市中心，打 Grab 从喜来登约 5 分钟",
              ko: "Phan Bội Châu, 냐짱 시내 중심, 쉐라톤에서 Grab 5분",
            },
            price: {
              zh: "免费入场；咖啡 1kg 约 200,000 VND，腰果 500g 约 100,000–150,000 VND",
              ko: "무료 입장. 커피 1kg 약 200,000 VND, 캐슈넛 500g 약 100,000~150,000 VND",
            },
            rating: "⭐⭐⭐⭐",
            tip: null,
          },
        ],
      },
      {
        time: "12:30–14:00",
        period: "afternoon",
        altLabel: {
          zh: "芽庄最后一顿正餐（告别大餐）",
          ko: "냐짱 마지막 식사 (작별 만찬)",
        },
        tip: null,
        options: [
          {
            tag: {
              zh: "A 豪华 · 无限龙虾自助",
              ko: "A 고급 · 무제한 랍스터 뷔페",
            },
            icon: "🦞",
            title: {
              zh: "Ngon Gallery · 芽庄代表性无限龙虾自助",
              ko: "Ngon Gallery · 냐짱 대표 무제한 랍스터 뷔페",
            },
            desc: {
              zh: "用一顿豪气的无限龙虾自助为整趟旅行画上完美句号！Ngon Gallery 是芽庄最著名的高端海鲜自助之一，主打无限龙虾 + 多国菜系（日料刺身 / 西式烤肉 / 越式海鲜），整体出品稳定，性价比在芽庄高端餐厅中属于中等水平。建议提前预订午餐场，通常比晚餐便宜约 20%。",
              ko: "무제한 랍스터 뷔페로 이번 여행에 완벽한 마침표를! Ngon Gallery는 냐짱 최고 명성의 고급 해산물 뷔페로 무제한 랍스터 + 다국적 메뉴(일식 사시미·서양 BBQ·베트남 해산물)를 제공합니다. 점 점심이 저녁보다 약 20% 저렴합니다. 사전 예약 권장.",
            },
            venues: [
              {
                name: "Ngon Gallery Nha Trang",
                address: {
                  zh: "陈富路附近（具体地址可通过 Google Maps 搜索 Ngon Gallery Nha Trang）",
                  ko: "쩐푸 해변 인근 (Google Maps에서 'Ngon Gallery Nha Trang' 검색)",
                },
                price: {
                  zh: "约 1,000,000 VND 起 / 人（无限龙虾午餐套餐）",
                  ko: "약 1,000,000 VND 이상 / 인 (무제한 랍스터 런치 패키지)",
                },
                rating: "⭐⭐⭐⭐⭐",
                tip: {
                  zh: "午餐价比晚餐低约 20%，14:00 前到性价比最高。提前电话或通过携程预约，旺季座位非常紧张。",
                  ko: "점심이 저녁보다 약 20% 저렴, 14:00 전 방문이 가성비 최고. 전화 또는 씨트립으로 사전 예약, 성수기엔 자리가 금방 찹니다.",
                },
              },
            ],
          },
          {
            tag: { zh: "B 平价 · 本地老字号", ko: "B 가성비 · 현지 老铺" },
            icon: "🥩",
            title: {
              zh: "Lac Canh · 芽庄老字号炭烤牛肉",
              ko: "Lac Canh · 냐짱 원조 숯불 소고기 맛집",
            },
            desc: {
              zh: "如果已经吃了好几顿海鲜想换口味，Lac Canh 是芽庄本地最有名的炭烤牛肉老店（家庭经营，几十年历史），就在喜来登附近，烟火气十足，两人吃饱约 350,000–500,000 VND，非常接地气。",
              ko: "해산물이 질렸다면 메뉴를 바꿔볼 시간. Lac Cach는 냐짱 현지인에게 수십 년간 사랑받는 가족 운영 숯불 소고기 식당으로 쉐라톤 근처에 있습니다. 활기찬 분위기, 2인 기준 350,000~500,000 VND.",
            },
            venues: [
              {
                name: "Lac Canh Restaurant",
                address: {
                  zh: "44 Nguyễn Bỉnh Khiêm，距喜来登步行约 10 分钟",
                  ko: "44 Nguyễn Bỉnh Khiêm, 쉐라톤에서 도보 약 10분",
                },
                price: {
                  zh: "约 200,000–350,000 VND/人",
                  ko: "약 200,000~350,000 VND/인",
                },
                rating: "⭐⭐⭐⭐",
                tip: null,
              },
            ],
          },
        ],
      },
      {
        time: "14:30–16:00",
        period: "afternoon",
        icon: "🚕",
        title: {
          zh: "Grab 返回金兰海湾，最后一夜安顿",
          ko: "Grab으로 깜라인 복귀, 마지막 밤 안착",
        },
        desc: {
          zh: "叫 Grab（从芽庄市区到 Wyndham Grand KN Paradise 约 45–55 分钟、约 350,000–450,000 VND）。抵达后趁下午时光去泳池或私人海滩放松，这是整趟旅程最后一次沙滩时光。傍晚整理行李，把要带回国的东西打包好，确认护照、机票和行李重量。",
          ko: "Grab 호출 (냐짱 시내에서 윈덤 그랜드까지 약 45~55분, 350,000~450,000 VND). 도착 후 수영장·해변에서 이번 여행 마지막 힐링. 저녁엔 귀국 짐 정리, 여권·항공권·수하물 무게 확인.",
        },
        tip: {
          zh: "⚠️ 今晚记得在手机上提前 check-in 明天的航班，减少明天机场排队时间。如有超重行李，今晚整理比明天临时处理轻松很多！",
          ko: "⚠️ 오늘 밤 내일 항공편 온라인 체크인을 미리 완료해 두세요. 초과 수하물이 있다면 지금 정리하는 것이 내일보다 훨씬 편합니다.",
        },
        venues: null,
      },
      {
        time: "19:00–22:00",
        period: "evening",
        icon: "🌙",
        title: {
          zh: "度假村轻松晚餐 + 看星空 + 早睡",
          ko: "리조트 가벼운 저녁 + 별 구경 + 일찍 취침",
        },
        desc: {
          zh: "在酒店餐厅吃一顿轻松的晚餐，最后一晚不需要再折腾出去。饭后在泳池边散散步，金兰海湾远离城市光污染，星空极美。明天赶飞机，建议 22:00 前入睡。",
          ko: "호텔 레스토랑에서 가볍게 저녁식사, 마지막 밤은 외출 불필요. 식사 후 수영장 옆 산책, 깜라인 해변은 빛 공해가 적어 별이 아름답습니다. 내일 비행이 있으니 22:00 전 취침을 권장합니다.",
        },
        tip: null,
        venues: null,
      },
    ],
  },

  /* ── 第7天 ── */
  {
    date: "7/15–16",
    isHighlight: false,
    mood: { zh: "✈️ 返程日", ko: "✈️ 귀국 일정" },
    title: {
      zh: "整理行李 · 从容去机场 · 带着美好记忆回家",
      ko: "짐 정리 · 여유로운 공항 이동 · 아름다운 추억과 함께 귀국",
    },
    hotel: {
      zh: "Wyndham Grand KN Paradise（完美的机场缓冲站）",
      ko: "윈덤 그랜드 KN 파라다이스 (완벽한 공항 완충 기지)",
    },
    slots: [
      {
        time: { zh: "航班前 2.5 小时", ko: "항공편 2.5시간 전" },
        period: "morning",
        icon: "⏰",
        title: {
          zh: "起床整理 → 叫车去金兰机场",
          ko: "기상 정리 → 공항으로 출발",
        },
        desc: {
          zh: "从 Wyndham Grand KN Paradise 到金兰国际机场（Cam Ranh International Airport）仅约 12 公里、15 分钟车程，这正是这家酒店选来压轴最核心的战略价值！提前 2.5 小时出发绝对从容，叫 Grab（约 100,000-150,000 VND）或请酒店安排送机（约 200,000-300,000 VND）。",
          ko: "윈덤 그랜드에서 깜라인 국제공항까지 불과 12km, 15분! 이것이 이 호텔을 마지막 밤 숙소로 선택한 가장 핵심적인 전략 이유입니다. 항공편 2.5시간 전 출발로 충분합니다. Grab(약 100,000~150,000 VND) 또는 호텔 차량(약 200,000~300,000 VND)을 이용하세요.",
        },
        tip: {
          zh: "💡 金兰机场规模较小，登机口不多，提前 2 小时到场绰绰有余，不用太早。出发前再次确认护照、机票、重要手信均已在手提行李！",
          ko: "💡 깜라인 공항은 규모가 작아 탑승구가 많지 않습니다. 2시간 전 도착으로 충분합니다. 출발 전 여권·항공권·주요 기념품이 기내용 짐에 있는지 재확인!",
        },
        venues: null,
      },
      {
        time: { zh: "机场内", ko: "공항 내" },
        period: "morning",
        icon: "🎁",
        title: {
          zh: "机场免税区最后采购 + 告别芽庄",
          ko: "공항 면세구역 마지막 쇼핑 + 냐짱 작별",
        },
        desc: {
          zh: "金兰机场免税区面积不大，但有几个必买选项：① Phinhdan 椰子糖（越南人气第一的纪念品糖果，机场有售）② Trung Nguyen G7 即溶咖啡小包装（真空封装，适合作礼品）③ 越南腰果（比市区略贵，但最后机会）。如有肚子饿，机场内有越南河粉简餐。登机后抓紧睡觉，带着满满的美好回忆，平安回家！",
          ko: "깜라인 공항 면세구역은 작지만: ① Phinhdan 코코넛 사탕 (베트남 1위 기념품 사탕) ② Trung Nguyen G7 인스턴트 커피 소포장 (진공 포장, 선물용 최적) ③ 베트남 캐슈넛 (시내보다 약간 비싸지만 마지막 기회). 배고프면 공항 내 베트남 쌀국수. 비행기 탑승 후 실컷 주무세요. 달콤한 추억을 가득 안고 안전하게 귀국!",
        },
        tip: null,
        venues: null,
      },
    ],
  },
];

// --- 全局 UI 组件重构 ---
function Card({ children, accent = false }) {
  return (
    <div
      className="card-hover"
      style={{
        background: "#fff",
        border: accent
          ? "2px solid #0e2d4d"
          : "1px solid rgba(241, 245, 249, 0.8)",
        borderRadius: 24, // 💡 升级为更大的 24px 现代圆角
        padding: "24px 26px", // 💡 加大留白，增强呼吸感
        boxShadow: accent
          ? "0 12px 32px rgba(14, 45, 77, 0.08)"
          : "0 8px 24px rgba(15, 23, 42, 0.03)",
        position: "relative",
        overflow: "hidden",
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
        padding: "6px 14px",
        borderRadius: 999,
        // 🌟 1. 半透明的白色底色（15% 不透明度）
        background: "rgba(255, 255, 255, 0.15)",
        // 🌟 2. 核心毛玻璃发丝特效
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)", // 兼容苹果 Safari 浏览器
        // 🌟 3. 加一圈极细的半透明白边，增强玻璃质感
        border: "1px solid rgba(255, 255, 255, 0.3)",
        // 🌟 4. 纯白文字
        color: "#ffffff",
        fontSize: 13,
        fontWeight: 800,
        marginRight: 8,
        marginBottom: 8,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // 微微的底层阴影让玻璃浮起来
      }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ title, sub }) {
  return (
    <div style={{ margin: "24px 0 16px" }}>
      <div
        style={{
          fontSize: 26,
          fontWeight: 900,
          color: "#0f172a",
          letterSpacing: "-0.5px",
        }}
      >
        {title}
      </div>
      {sub && (
        <div
          style={{
            marginTop: 6,
            color: "#64748b",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function BulletList({ items }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {items.map((item, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            fontSize: 15,
            color: "#334155",
            lineHeight: 1.7,
          }}
        >
          <span style={{ color: "#0284c7", fontSize: 18 }}>•</span>
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
          borderBottom: "1px dashed #cbd5e1",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-block",
              background: "#f97316",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 900,
              marginBottom: 10,
            }}
          >
            {lang === "zh" ? h.date.zh : h.date.ko}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#0f172a",
              letterSpacing: "-0.5px",
            }}
          >
            {h.name}
          </div>
          <div
            style={{
              color: "#64748b",
              fontSize: 14,
              marginTop: 6,
              fontWeight: 700,
            }}
          >
            {lang === "zh" ? h.brand.zh : h.brand.ko}
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: "#0f172a",
              background: "#f8fafc",
              padding: "6px 12px",
              borderRadius: 12,
            }}
          >
            {lang === "zh" ? h.price.zh : h.price.ko}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 18,
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
          color: "#0f172a",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 18 }}>{icon}</span> <span>{title}</span>
      </div>
      <div style={{ color: "#475569" }}>{text}</div>
    </div>
  );
}

function FoodCard({ f, lang }) {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          gap: 18,
          flexWrap: "wrap",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            width: 140,
            height: 140,
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid #f1f5f9",
            background: "linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%)",
            position: "relative",
          }}
        >
          {f.img ? (
            <img
              src={f.img}
              alt={lang === "zh" ? f.name.zh : f.name.ko}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
              className="img-hover"
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
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: "#0f172a",
                  letterSpacing: "-0.5px",
                }}
              >
                {lang === "zh" ? f.name.zh : f.name.ko}
              </div>
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 12px",
                    borderRadius: 999,
                    background: "#f1f5f9",
                    color: "#334155",
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  {lang === "zh" ? f.category.zh : f.category.ko}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 12px",
                    borderRadius: 999,
                    background: "#fff7ed",
                    color: "#c2410c",
                    fontSize: 12,
                    fontWeight: 800,
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
                padding: "6px 12px",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              {lang === "zh" ? f.price.zh : f.price.ko}
            </div>
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 14,
              color: "#475569",
              lineHeight: 1.75,
            }}
          >
            {lang === "zh" ? f.desc.zh : f.desc.ko}
          </div>
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
                padding: "8px 16px",
                background: "#f0f9ff",
                color: "#0284c7",
                fontSize: 13,
                fontWeight: 800,
                textDecoration: "none",
                borderRadius: 12,
                transition: "background 0.2s",
              }}
              className="btn-hover"
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
    <div style={{ marginTop: 24, width: "100%" }}>
      <div
        className="hide-scroll"
        onScroll={handleScroll}
        style={{
          display: "flex",
          width: "100%",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          borderRadius: 20,
          backgroundColor: "#f8fafc",
          border: "1px solid #f1f5f9",
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
          gap: 8,
          marginTop: 14,
        }}
      >
        {images.map((_, idx) => (
          <div
            key={idx}
            style={{
              width: activeIndex === idx ? 20 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: activeIndex === idx ? "#0e2d4d" : "#e2e8f0",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ItineraryDayCard({ d, lang }) {
  const [altChoices, setAltChoices] = useState({});
  const isZh = lang === "zh";
  const g = (obj) => (obj ? (isZh ? obj.zh : obj.ko) : "");

  const periodMeta = {
    morning: {
      border: "#fb923c",
      bg: "#fff7ed",
      label: isZh ? "上午" : "오전",
    },
    afternoon: {
      border: "#3b82f6",
      bg: "#eff6ff",
      label: isZh ? "下午" : "오후",
    },
    evening: {
      border: "#a855f7",
      bg: "#fdf4ff",
      label: isZh ? "晚间" : "저녁",
    },
    night: { border: "#22c55e", bg: "#f0fdf4", label: isZh ? "夜间" : "야간" },
  };

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
          marginBottom: 20,
          borderBottom: "1px dashed #cbd5e1",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                background: "#f97316",
                color: "#fff",
                padding: "4px 14px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 900,
              }}
            >
              {d.date}
            </span>
            <span
              style={{
                background: "#f1f5f9",
                color: "#475569",
                padding: "4px 12px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {g(d.mood)}
            </span>
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: "#0f172a",
              lineHeight: 1.4,
              letterSpacing: "-0.5px",
            }}
          >
            {g(d.title)}
          </div>
        </div>
        <div
          style={{
            fontSize: 13,
            color: "#0f172a",
            fontWeight: 700,
            textAlign: "right",
            maxWidth: 260,
            lineHeight: 1.5,
            background: "#f8fafc",
            padding: "8px 12px",
            borderRadius: 12,
          }}
        >
          🏨 {typeof d.hotel === "string" ? d.hotel : g(d.hotel)}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {d.slots.map((slot, slotIdx) => {
          const pm = periodMeta[slot.period] || periodMeta.morning;
          const hasAlt = Array.isArray(slot.options) && slot.options.length > 0;
          const chosen = altChoices[slotIdx] ?? 0;
          const active = hasAlt ? slot.options[chosen] : slot;

          return (
            <div
              key={slotIdx}
              style={{
                borderLeft: `4px solid ${pm.border}`,
                paddingLeft: 18,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -6,
                  top: 2,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: pm.border,
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 10,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{ fontWeight: 800, fontSize: 13, color: "#64748b" }}
                >
                  {typeof slot.time === "string" ? slot.time : g(slot.time)}
                </span>
                <span
                  style={{
                    background: pm.bg,
                    color: pm.border,
                    padding: "2px 10px",
                    borderRadius: 99,
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  {pm.label}
                </span>
              </div>

              {hasAlt && (
                <div style={{ marginBottom: 12 }}>
                  {slot.altLabel && (
                    <div
                      style={{
                        fontSize: 13,
                        color: "#64748b",
                        fontWeight: 700,
                        marginBottom: 8,
                      }}
                    >
                      {g(slot.altLabel)}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {slot.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setAltChoices((prev) => ({ ...prev, [slotIdx]: i }))
                        }
                        style={{
                          padding: "6px 14px",
                          borderRadius: 999,
                          border:
                            chosen === i
                              ? "2px solid #0e2d4d"
                              : "2px solid #e2e8f0",
                          background: chosen === i ? "#0e2d4d" : "#f8fafc",
                          color: chosen === i ? "#fff" : "#64748b",
                          fontSize: 13,
                          fontWeight: 800,
                          cursor: "pointer",
                          transition: "all .2s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        {g(opt.tag)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 20 }}>{active.icon ?? slot.icon}</span>
                <span
                  style={{ fontWeight: 900, fontSize: 16, color: "#0f172a" }}
                >
                  {g(active.title ?? slot.title)}
                </span>
              </div>

              {(active.desc ?? slot.desc) && (
                <div
                  style={{ fontSize: 15, lineHeight: 1.75, color: "#475569" }}
                >
                  {g(active.desc ?? slot.desc)}
                </div>
              )}

              {active.venues && active.venues.length > 0 && (
                <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                  {active.venues.map((v, vi) => (
                    <div
                      key={vi}
                      style={{
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: 16,
                        padding: "12px 16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 8,
                          flexWrap: "wrap",
                          marginBottom: 6,
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 900,
                            fontSize: 15,
                            color: "#0f172a",
                          }}
                        >
                          📍 {typeof v.name === "string" ? v.name : g(v.name)}
                        </span>
                        {v.rating && (
                          <span style={{ fontSize: 13, whiteSpace: "nowrap" }}>
                            {v.rating}
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "#475569",
                          lineHeight: 1.7,
                        }}
                      >
                        <div style={{ marginBottom: 4 }}>🗺️ {g(v.address)}</div>
                        <div>💰 {g(v.price)}</div>
                      </div>
                      {v.tip && (
                        <div
                          style={{
                            marginTop: 8,
                            fontSize: 13,
                            color: "#92400e",
                            background: "#fffbeb",
                            padding: "6px 12px",
                            borderRadius: 8,
                            lineHeight: 1.6,
                          }}
                        >
                          💡 {g(v.tip)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {slot.tip && (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    color: "#065f46",
                    background: "#ecfdf5",
                    padding: "8px 14px",
                    borderRadius: 12,
                    lineHeight: 1.65,
                  }}
                >
                  {g(slot.tip)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default function App() {
  const [lang, setLang] = useState("zh");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleScrollSpy = () => {
      const tabKeys = [
        "overview",
        "spots",
        "hotels",
        "food",
        "itinerary",
        "tips",
      ];
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
  const tabKeys = ["overview", "spots", "hotels", "food", "itinerary", "tips"];

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
        background: "#f8fafc", // 更干净的基础底色
        color: "#0f172a",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 🌟 注入全局 CSS 特效 */}
      <style>{`
        html { scroll-behavior: smooth; }
        .card-hover { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08) !important; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .focus-input:focus { background: #fff !important; border-color: #38bdf8 !important; box-shadow: inset 0 0 0 2px rgba(56, 189, 248, 0.2) !important; }
        .btn-hover:hover { opacity: 0.85; transform: scale(0.98); }
        .glass-nav { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        .img-hover:hover { transform: scale(1.05); }
      `}</style>

      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(14, 45, 77, 0.4), rgba(14, 45, 77, 0.95)), url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          color: "#fff",
          padding: "56px 20px 40px",
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              alignItems: "start",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  letterSpacing: "-0.5px",
                }}
              >
                {c.appTitle}
              </div>
              <div
                style={{
                  marginTop: 10,
                  color: "#e0f2fe",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                {c.appSub}
              </div>
            </div>
            <button
              className="btn-hover"
              onClick={() => setLang((v) => (v === "zh" ? "ko" : "zh"))}
              style={{
                border: "1px solid rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                color: "#fff",
                borderRadius: 999,
                padding: "10px 20px",
                cursor: "pointer",
                fontWeight: 800,
                fontSize: 14,
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {lang === "zh" ? "한국어" : "中文"} · {c.toggle}
            </button>
          </div>
          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap" }}>
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

      {/* 🌟 优化：iOS级悬浮药丸式（Pill）导航栏 */}
      <div
        className="glass-nav"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div
          className="hide-scroll"
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            display: "flex",
            gap: 12,
            padding: "14px 20px",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {c.tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(idx)}
              style={{
                padding: "8px 20px",
                background: activeTab === idx ? "#0f172a" : "transparent",
                color: activeTab === idx ? "#fff" : "#475569",
                fontWeight: activeTab === idx ? 800 : 600,
                fontSize: 14,
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: 20 }}>
        {/* 锚点 0：总览区 */}
        <div id="section-overview">
          <div style={{ display: "grid", gap: 16, marginTop: 4 }}>
            <WeatherWidget lang={lang} />
            <CurrencyConverterWidget lang={lang} />

            <Card accent>
              <SectionTitle title={c.overviewTitle} sub={c.overviewSub} />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                {c.overviewCards.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "#f8fafc",
                      padding: "16px 18px",
                      borderRadius: 16,
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{item.icon}</span>
                      <span
                        style={{
                          fontSize: 14,
                          color: "#64748b",
                          fontWeight: 800,
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        color: "#0f172a",
                        fontWeight: 900,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    background: "#fff7ed",
                    padding: 20,
                    borderRadius: 20,
                    border: "1px solid #fdba74",
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 900,
                      color: "#c2410c",
                      marginBottom: 14,
                    }}
                  >
                    {c.overviewMustDos.title}
                  </div>
                  <div style={{ display: "grid", gap: 12 }}>
                    {c.overviewMustDos.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          gap: 8,
                          fontSize: 14,
                          color: "#9a3412",
                          lineHeight: 1.6,
                          fontWeight: 700,
                        }}
                      >
                        <span>✅</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    background: "#fef2f2",
                    padding: 20,
                    borderRadius: 20,
                    border: "1px solid #fca5a5",
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 900,
                      color: "#b91c1c",
                      marginBottom: 14,
                    }}
                  >
                    {c.overviewAlerts.title}
                  </div>
                  <div style={{ display: "grid", gap: 12 }}>
                    {c.overviewAlerts.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          gap: 8,
                          fontSize: 14,
                          color: "#991b1b",
                          lineHeight: 1.6,
                          fontWeight: 700,
                        }}
                      >
                        <span>🚨</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

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
              gap: 16,
            }}
          >
            {transport.map((t) => (
              <Card key={lang === "zh" ? t.k.zh : t.k.ko}>
                <div
                  style={{
                    fontWeight: 900,
                    color: "#0f172a",
                    marginBottom: 10,
                    fontSize: 16,
                  }}
                >
                  {lang === "zh" ? t.k.zh : t.k.ko}
                </div>
                <div
                  style={{ fontSize: 14, lineHeight: 1.75, color: "#475569" }}
                >
                  {lang === "zh" ? t.v.zh : t.v.ko}
                </div>
              </Card>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <Card>
              <div
                style={{
                  fontWeight: 900,
                  color: "#0f172a",
                  marginBottom: 10,
                  fontSize: 16,
                }}
              >
                {lang === "zh" ? "芽庄地图" : "냐짱 지도"}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#64748b",
                  lineHeight: 1.7,
                  marginBottom: 14,
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
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
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
              gap: 16,
            }}
          >
            {cityHighlights.map((s) => (
              <Card key={s.en}>
                {s.img && (
                  <div
                    style={{
                      width: "100%",
                      height: 180,
                      borderRadius: 16,
                      overflow: "hidden",
                      marginBottom: 16,
                    }}
                  >
                    <img
                      src={s.img}
                      alt={s.en}
                      className="img-hover"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.4s ease",
                      }}
                    />
                  </div>
                )}
                <div
                  style={{ fontWeight: 900, fontSize: 18, color: "#0f172a" }}
                >
                  {lang === "zh" ? s.name.zh : s.name.ko}
                </div>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: 13,
                    marginTop: 4,
                    fontWeight: 500,
                  }}
                >
                  {s.en}
                </div>
                <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.75 }}>
                  <div style={{ color: "#334155", marginBottom: 4 }}>
                    <strong style={{ color: "#0f172a" }}>
                      {lang === "zh" ? "位置：" : "위치: "}
                    </strong>
                    {lang === "zh" ? s.where.zh : s.where.ko}
                  </div>
                  <div style={{ color: "#334155", marginBottom: 4 }}>
                    <strong style={{ color: "#0f172a" }}>
                      {lang === "zh" ? "时长：" : "소요 시간: "}
                    </strong>
                    {lang === "zh" ? s.time.zh : s.time.ko}
                  </div>
                  <div style={{ color: "#334155", marginBottom: 8 }}>
                    <strong style={{ color: "#0f172a" }}>
                      {lang === "zh" ? "价格：" : "가격: "}
                    </strong>
                    {lang === "zh" ? s.price.zh : s.price.ko}
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      color: "#475569",
                      background: "#f8fafc",
                      padding: "10px 14px",
                      borderRadius: 12,
                    }}
                  >
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
              gap: 16,
            }}
          >
            {islandHighlights.map((s) => (
              <Card key={s.en}>
                {s.img && (
                  <div
                    style={{
                      width: "100%",
                      height: 180,
                      borderRadius: 16,
                      overflow: "hidden",
                      marginBottom: 16,
                    }}
                  >
                    <img
                      src={s.img}
                      alt={s.en}
                      className="img-hover"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.4s ease",
                      }}
                    />
                  </div>
                )}
                <div
                  style={{ fontWeight: 900, fontSize: 18, color: "#0f172a" }}
                >
                  {lang === "zh" ? s.name.zh : s.name.ko}
                </div>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: 13,
                    marginTop: 4,
                    fontWeight: 500,
                  }}
                >
                  {s.en}
                </div>
                <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.75 }}>
                  <div style={{ color: "#334155", marginBottom: 4 }}>
                    <strong style={{ color: "#0f172a" }}>
                      {lang === "zh" ? "位置：" : "위치: "}
                    </strong>
                    {lang === "zh" ? s.where.zh : s.where.ko}
                  </div>
                  <div style={{ color: "#334155", marginBottom: 4 }}>
                    <strong style={{ color: "#0f172a" }}>
                      {lang === "zh" ? "时长：" : "소요 시간: "}
                    </strong>
                    {lang === "zh" ? s.time.zh : s.time.ko}
                  </div>
                  <div style={{ color: "#334155", marginBottom: 8 }}>
                    <strong style={{ color: "#0f172a" }}>
                      {lang === "zh" ? "价格：" : "가격: "}
                    </strong>
                    {lang === "zh" ? s.price.zh : s.price.ko}
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      color: "#475569",
                      background: "#f8fafc",
                      padding: "10px 14px",
                      borderRadius: 12,
                    }}
                  >
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
          <div style={{ display: "grid", gap: 24 }}>
            {hotelItineraryList.map((h, idx) => (
              <HotelItineraryCard key={idx} h={h} lang={lang} />
            ))}
          </div>
        </div>

        {/* 锚点 3：美食推荐区 */}
        <div id="section-food">
          <SectionTitle title={c.foodTitle} sub={c.foodSub} />
          <div style={{ display: "grid", gap: 16, marginBottom: 32 }}>
            {foodRecommendations.map((f, idx) => (
              <FoodCard key={idx} f={f} lang={lang} />
            ))}
          </div>
        </div>

        {/* 锚点 4：旅行计划区 */}
        <div id="section-itinerary">
          <SectionTitle title={c.itineraryTitle} sub={c.itinerarySub} />
          <div style={{ display: "grid", gap: 16, marginBottom: 32 }}>
            {itinerary.map((d, idx) => (
              <ItineraryDayCard key={idx} d={d} lang={lang} />
            ))}
          </div>
        </div>

        {/* 锚点 5：实用提示区 */}
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
                  color: "#0f172a",
                  marginBottom: 12,
                  fontSize: 17,
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
                  color: "#0f172a",
                  marginBottom: 12,
                  fontSize: 17,
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
                  color: "#0f172a",
                  marginBottom: 12,
                  fontSize: 17,
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
                  color: "#0f172a",
                  marginBottom: 12,
                  fontSize: 17,
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
                  color: "#0f172a",
                  marginBottom: 12,
                  fontSize: 17,
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
            marginTop: 32,
            paddingTop: 24,
            borderTop: "1px solid #e2e8f0",
            color: "#64748b",
            fontSize: 13,
            lineHeight: 1.8,
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: 6, fontWeight: 800, color: "#475569" }}>
            {c.quickTitle}
          </div>
          <div>{c.quickText}</div>
          <div style={{ marginTop: 8 }}>{c.note}</div>
        </div>
      </div>
    </div>
  );
}
