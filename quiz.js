// ===== CONFIG =====
const BASE = 'images/';
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwJebOavBCbLZXdGy_J5V0Nm8rEi6Ga3yF1Z9cADWezP4mmAqWlHJ4oq1isv_E4svNkhA/exec';

// 페이지 로드 즉시 카운트 fetch 시작 (showStart보다 먼저)
const countPromise = fetch(SHEET_URL + '?action=count')
  .then(r => r.json())
  .catch(() => null);

// ===== QUESTIONS =====
const questions = [
  {
    q: "주말에 아무 약속이 없다. 내 기분은?",
    options: [
      { emoji: "🛏️", text: "드디어...! 집에서 뒹굴어야겠다", types: ["집콕 마스터"] },
      { emoji: "📚", text: "잘됐다! 자기계발 루틴 지켜야지", types: ["효율 중독자"] },
      { emoji: "💸", text: "지출 없는 주말, 이번 주도 절약 성공이야!", types: ["갓성비 장인"] },
      { emoji: "📱", text: "누구한테 연락하지? 당장 번개로 만나!", types: ["인간 아지트"] }
    ]
  },
  {
    q: "자취방 고를 때 절대 양보 못 하는 건?",
    options: [
      { emoji: "🏢", text: "에세냉 다 있는 풀옵션 신축", types: ["집콕 마스터"] },
      { emoji: "🚇", text: "역까지 걸어서 3분 컷!", types: ["효율 중독자"] },
      { emoji: "💰", text: "보증금, 월세 무조건 최저가", types: ["갓성비 장인"] },
      { emoji: "📅", text: "얼마나 오래 살 수 있는지!", types: ["동네 토박이"] }
    ]
  },
  {
    q: "전자레인지가 고장났다! 내 반응은?",
    options: [
      { emoji: "😱", text: "안에 있는 거 다 버려야 되나..? 허둥지둥한다", types: ["멘탈 수호자"] },
      { emoji: "💸", text: "수리비 vs 새 제품, 일단 가격 비교해야지", types: ["갓성비 장인"] },
      { emoji: "😭", text: "돈 나갈 생각에 머리가 아프다", types: ["통장 다이어터"] },
      { emoji: "📋", text: "비상금 모아둬서 다행이다ㅎㅎ", types: ["플랜 B 보유자"] }
    ]
  },
  {
    q: "녹초가 된 몸으로 귀가! 내 심정은?",
    options: [
      { emoji: "🛋️", text: "아 빨리 침대에 누워야 해", types: ["집콕 마스터"] },
      { emoji: "🏃", text: "지하철 오래 타서 기빨리네", types: ["효율 중독자"] },
      { emoji: "🔔", text: "아쉬운데 오늘 놀 사람 없나 (연락 확인)", types: ["인간 아지트"] },
      { emoji: "🏚️", text: "집이 마음에 안 들어..", types: ["동네 토박이"] }
    ]
  },
  {
    q: "이사할 때 내 모습은?",
    options: [
      { emoji: "📦", text: "생각만 해도 벌써 지쳐", types: ["동네 토박이"] },
      { emoji: "🗺️", text: "이사 갈 동네 카페, 편의점 미리 지도 찍어둬야지", types: ["플랜 B 보유자"] },
      { emoji: "💸", text: "이삿짐 업체 견적 비교해야겠다", types: ["갓성비 장인"] },
      { emoji: "🙌", text: "새 동네 새 이웃! 새 인연 기대돼", types: ["인간 아지트"] }
    ]
  },
  {
    q: "악몽을 꿨다! 무슨 내용이었냐면..",
    options: [
      { emoji: "😵", text: "친구한테 빌려준 돈 못 돌려받는 꿈", types: ["멘탈 수호자"] },
      { emoji: "😰", text: "아무것도 모르는 낯선 동네에서 길 잃는 꿈", types: ["동네 토박이"] },
      { emoji: "💰", text: "통장 잔액이 딱 0원인 꿈", types: ["통장 다이어터"] },
      { emoji: "🕐", text: "4시간 동안 출퇴근하는 꿈", types: ["효율 중독자"] }
    ]
  },
  {
    q: "첫 자취 시작하는 친구에게 나는 뭐라고 말하냐면..",
    options: [
      { emoji: "🛁", text: "\"옵션이 중요하지, 풀옵션인지 먼저 봐!\"", types: ["집콕 마스터"] },
      { emoji: "🗺️", text: "\"5년 뒤 계획 생각하고 위치를 골라!\"", types: ["플랜 B 보유자"] },
      { emoji: "💸", text: "\"관리비, 공과금 꼭 미리 확인해봐! 생각보다 많이 나와\"", types: ["통장 다이어터"] },
      { emoji: "🔐", text: "\"보증금 안전한지 무조건 먼저 알아봐!\"", types: ["멘탈 수호자"] }
    ]
  },
  {
    q: "내 자취 추구미는?",
    options: [
      { emoji: "🗓️", text: "지금 안정되면 나머지 인생 계획도 술술 풀릴 것 같아", types: ["플랜 B 보유자"] },
      { emoji: "🛡️", text: "괜한 불안 없이 맘 놓고 살 수 있으면 그걸로 충분해", types: ["멘탈 수호자"] },
      { emoji: "🤝", text: "이웃이랑 인사 나누는 따뜻한 분위기였음 좋겠어", types: ["인간 아지트"] },
      { emoji: "🪴", text: "고정으로 나가는 돈만 줄어도 삶이 달라질 것 같아", types: ["통장 다이어터"] }
    ]
  }
];

// ===== RESULTS =====
const RESULT_KEY_MAP = {
  "집콕 마스터":    "bangguseok",
  "효율 중독자":    "hyoryul",
  "갓성비 장인":    "gasungbi",
  "인간 아지트":    "social",
  "통장 다이어터":  "dieter",
  "멘탈 수호자":    "mental",
  "동네 토박이":    "jibak",
  "플랜 B 보유자": "mirae"
};

const RESULT_KEY_REVERSE = Object.fromEntries(
  Object.entries(RESULT_KEY_MAP).map(([k, v]) => [v, k])
);

const results = {
  "집콕 마스터": {
    img: BASE + '1_bangguseok.png',
    name: "집콕 마스터",
    sub: '"이불 밖은 위험해!"',
    desc: "주말에 약속 없으면 오히려 에너지가 풀충전되는 찐 집순이, 집돌이! 배달과 OTT만 있으면 한 달도 거뜬하게 버텨요. 집 안에서의 쾌적함과 인프라가 삶의 질 그 자체예요.",
    link: "https://gobang.kr/youth/notices/guide?tab=happy-house"
  },
  "효율 중독자": {
    img: BASE + '2_hyoryul.png',
    name: "효율 중독자",
    sub: '"길바닥에 버리는 시간? 내 사전엔 없다."',
    desc: "이동 시간에 기 빨리는 걸 세상에서 제일 싫어해요. 역에서 집까지 1분 컷이어야 직성이 풀려요. 아낀 시간으로 운동도 하고, 공부도 하고, 침대에 더 누워 있는 효율 끝판왕이에요.",
    link: "https://gobang.kr/youth/notices/guide?tab=youth-safe-house"
  },
  "갓성비 장인": {
    img: BASE + '3_gasungbi.png',
    name: "갓성비 장인",
    sub: '"아낄 땐 아끼고, 누릴 건 누린다!"',
    desc: "돈 새는 건 싫지만 삶의 퀄리티는 포기 못 해요. 목돈 부담은 줄이고, 감성 자취 라이프는 챙기고 싶은 야무진 현실파! 할인 쿠폰, 이벤트는 놓칠 수 없어요.",
    link: "https://gobang.kr/youth/notices/guide?tab=purchase-rental"
  },
  "인간 아지트": {
    img: BASE + '4_social.png',
    name: "인간 아지트",
    sub: '"집에서도 사람 냄새 나야지!"',
    desc: "퇴근하고 불 꺼진 집에 혼자 들어가면 괜히 적적해져요. 집은 단순히 쉬는 공간이 아니라, 사람들과 취향도 나누고 소소한 이야기도 나누는 아지트 같은 곳이면 좋겠어요!",
    link: "https://gobang.kr/youth/notices/guide?tab=social"
  },
  "통장 다이어터": {
    img: BASE + '5_jeokja.png',
    name: "통장 다이어터",
    sub: '"통장아.. 이번 달도 버텨보자!"',
    desc: "할인, 적립, 쿠폰은 일단 챙기고 보는 타입! 무지출 챌린지 영상에 괜히 눈길이 가고, 고정으로 빠져나가는 돈은 특히 아까워요. 소비는 신중하게, 만족감은 크게 챙기고 싶은 현실파예요.",
    link: "https://gobang.kr/youth/notices/guide?tab=jeonse-rental"
  },
  "멘탈 수호자": {
    img: BASE + '6_mental.png',
    name: "멘탈 수호자",
    sub: '"마음의 평화가 제일 중요해!"',
    desc: "작은 스트레스도 은근 오래 남는 편이에요. 그래서 괜한 걱정거리나 불안 요소는 미리 치워두고 싶어요. 내 마음이 편한 게 결국 제일 큰 행복이라고 생각해요.",
    link: "https://gobang.kr/youth/notices/guide?tab=deundeun"
  },
  "동네 토박이": {
    img: BASE + '7_jibak.png',
    name: "동네 토박이",
    sub: '"익숙한 게 최고야!"',
    desc: "새로운 환경에 적응하는 것보다 익숙한 곳에서 편하게 지내는 걸 좋아해요. 한 번 정 붙이면 오래 가는 타입이라 동네 맛집도 단골도 자연스럽게 늘어나요.",
    link: "https://gobang.kr/youth/notices/guide?tab=long-term-jeonse"
  },
  "플랜 B 보유자": {
    img: BASE + '8_mirae.png',
    name: "플랜 B 보유자",
    sub: '"일단 계획부터 세워볼게?"',
    desc: "준비한 만큼 마음도 편해진다고 믿는 J 인간! 큰 그림을 그리는 걸 좋아해요. 하고 싶은 일도, 모아야 할 돈도, 이루고 싶은 목표도 미리 정리해 두는 타입이에요.",
    link: "https://gobang.kr/youth/notices/guide?tab=national-rental"
  }
};

// ===== STATE =====
let currentQ = -1;
let scores = {};
let secondary = {};
let currentResult = null;

function resetScores() {
  Object.keys(results).forEach(k => {
    scores[k] = 0;
    secondary[k] = 0;
  });
}
resetScores();

// ===== SCORING =====
function selectOption(idx) {
  const q = questions[currentQ];
  const chosen = q.options[idx];

  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    if (i === idx) btn.classList.add('selected');
    btn.style.pointerEvents = 'none';
  });

  chosen.types.forEach(t => {
    if (scores[t] !== undefined) scores[t]++;
  });

  // 2차 보조점수: 선택 위치가 앞일수록 강한 선호 → 높은 boost
  const boost = (q.options.length - idx) * 0.1;
  chosen.types.forEach(t => {
    if (secondary[t] !== undefined) secondary[t] += boost;
  });

  setTimeout(() => {
    currentQ++;
    if (currentQ < questions.length) showQuestion();
    else showResult();
  }, 250);
}

function getTopResult() {
  const sorted = Object.entries(scores).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    if (secondary[b[0]] !== secondary[a[0]]) return secondary[b[0]] - secondary[a[0]];
    return Math.random() - 0.5;
  });
  return sorted[0][0];
}

// ===== UTILS =====
const userId = (() => {
  let id = sessionStorage.getItem('gobang_uid');
  if (!id) { id = 'u_' + Math.random().toString(36).slice(2, 10); sessionStorage.setItem('gobang_uid', id); }
  return id;
})();

function logCTA(button) {
  const type = currentResult ? currentResult.name : '-';
  new Image().src = SHEET_URL + '?' + new URLSearchParams({ button, type, userId });
}

function render(html) {
  const card = document.getElementById('card-content');
  card.innerHTML = html;
  card.classList.remove('fade-in');
  void card.offsetWidth;
  card.classList.add('fade-in');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ===== SCREENS =====
function getFriendTypeName() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get('r');
  if (!key) return null;
  return RESULT_KEY_REVERSE[key] ?? null;
}

function showStart() {
  render(`
    <div class="start-screen">
      <div class="friend-banner" id="start-count">👋 <span id="start-count-text"></span></div>
      <img class="start-img" src="${BASE}start.png" alt="내 자취 스타일은?" />
      <div class="start-sub">8개 질문으로 알아보는<br>나에게 딱 맞는 자취 스타일!</div>
      <button class="start-btn" onclick="startQuiz()">테스트 시작</button>
      <div class="page-footer">gobang.kr</div>
    </div>
  `);

  const cached = localStorage.getItem('jachwi_count');
  if (cached) {
    const el = document.getElementById('start-count');
    const txt = document.getElementById('start-count-text');
    if (el && txt) {
      txt.innerHTML = '총 <strong>' + Number(cached).toLocaleString() + '명</strong>이 테스트했어요!';
      requestAnimationFrame(() => el.classList.add('visible'));
    }
  }

  countPromise.then(data => {
    if (!data || !data.count) return;
    localStorage.setItem('jachwi_count', data.count);
    const el = document.getElementById('start-count');
    const txt = document.getElementById('start-count-text');
    if (el && txt) {
      txt.innerHTML = '총 <strong>' + data.count.toLocaleString() + '명</strong>이 테스트했어요!';
      if (!el.classList.contains('visible')) {
        requestAnimationFrame(() => el.classList.add('visible'));
      }
    }
  });
}

function startQuiz() {
  logCTA('테스트 시작');
  currentQ = 0;
  resetScores();
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQ];
  const progress = Math.round((currentQ / questions.length) * 100);
  const optionsHtml = q.options.map((o, i) => `
    <button class="option-btn" onclick="selectOption(${i})">
      <span class="emoji-badge">${o.emoji}</span>
      <span>${o.text}</span>
    </button>
  `).join('');

  render(`
    <div class="progress-wrap">
      <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
      <span class="progress-text">${currentQ + 1}/${questions.length}</span>
    </div>
    <div class="q-badge">Q${currentQ + 1}</div>
    <div class="q-text">${q.q}</div>
    <div class="options">${optionsHtml}</div>
  `);
}

function showResult(overrideKey) {
  const topKey = overrideKey || getTopResult();
  const r = results[topKey];
  currentResult = r;

  const urlKey = RESULT_KEY_MAP[topKey];
  window.history.replaceState(null, '', window.location.pathname + '?r=' + urlKey);

  if (!overrideKey) logCTA('테스트완료');

  render(`
    <div class="result-screen">
      <div class="progress-wrap">
        <div class="progress-bar"><div class="progress-fill" style="width:100%"></div></div>
        <span class="progress-text">완료!</span>
      </div>
      <div class="result-badge">내 자취 스타일</div>
      <img class="result-img" src="${r.img}" alt="${r.name}" />
      <div class="result-name">${r.name}</div>
      <div class="result-sub">${r.sub}</div>
      <div class="result-desc">${r.desc}</div>
      <div class="result-buttons">
        <button class="result-cta" id="cta-btn">
          내 자취방 찾으러 가기
        </button>
        <div class="result-secondary-btns">
          <button class="result-retry" onclick="showStart()"><span class="btn-icon">🔄</span><span>다시 테스트</span></button>
          <button class="result-share-btn" onclick="copyLink()"><span class="btn-icon">🔗</span><span>결과 공유</span></button>
          <button class="result-save-btn" onclick="saveImage()"><span class="btn-icon">💾</span><span>이미지 저장</span></button>
        </div>
      </div>
      <div class="all-types-wrap">
        <div class="all-types-label">다른 자취 스타일도 궁금하다면?</div>
        <div class="all-types-scroll">
          ${Object.entries(results).map(([key, val]) => `
            <button class="type-mini-card ${key === topKey ? 'is-mine' : ''}" onclick="openTypeModal('${key}')">
              <img src="${val.img}" alt="${val.name}" />
              <div class="type-mini-name">${val.name.replace(/ ([^ ]+)$/, '<br>$1')}</div>
            </button>
          `).join('')}
        </div>
      </div>
      <div class="page-footer">gobang.kr</div>
    </div>
  `);

  const ctaBtn = document.getElementById('cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', function() {
      logCTA('내 자취방 찾으러 가기');
      window.open(r.link, '_blank');
    });
  }

  const scrollEl = document.querySelector('.all-types-scroll');
  if (scrollEl) {
    scrollEl.addEventListener('wheel', function(e) {
      if (e.deltaY !== 0) {
        e.preventDefault();
        scrollEl.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }
}

// ===== TYPE MODAL =====
function openTypeModal(key) {
  const r = results[key];
  if (!r) return;

  const existing = document.getElementById('type-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'type-modal';
  modal.className = 'type-modal-overlay';
  modal.innerHTML = `
    <div class="type-modal-box">
      <button class="type-modal-close" id="modal-close">✕</button>
      <div class="result-badge">자취 스타일</div>
      <img class="result-img" src="${r.img}" alt="${r.name}" />
      <div class="result-name">${r.name}</div>
      <div class="result-sub">${r.sub}</div>
      <div class="result-desc">${r.desc}</div>
    </div>
  `;
  document.body.appendChild(modal);

  requestAnimationFrame(() => modal.classList.add('is-open'));

  document.getElementById('modal-close').addEventListener('click', closeTypeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeTypeModal();
  });
}

function closeTypeModal() {
  const modal = document.getElementById('type-modal');
  if (!modal) return;
  modal.classList.remove('is-open');
  setTimeout(() => modal.remove(), 250);
}

// ===== SHARE =====
function copyLink() {
  logCTA('링크 복사');
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({ title: '내 자취 스타일 테스트 🏠', text: '8개 질문으로 알아보는 나에게 딱 맞는 자취 스타일!', url })
      .catch(() => {});
  } else {
    navigator.clipboard.writeText(url)
      .then(() => showToast('🔗 링크가 복사됐어요!'))
      .catch(() => { prompt('아래 링크를 복사해서 공유해요!', url); });
  }
}

function shareKakao() {
  if (!currentResult) return;
  logCTA('카카오 공유');
  const r = currentResult;
  const urlKey = RESULT_KEY_MAP[r.name];
  const shareUrl = 'https://dalnlia.github.io/test.youth.guide/?r=' + urlKey;
  const ogImageUrl = 'https://dalnlia.github.io/test.youth.guide/images/og/og_' + urlKey + '.png';

  if (!window.Kakao || !Kakao.isInitialized()) {
    showToast('카카오 공유를 불러오는 중이에요. 잠시 후 다시 시도해주세요.');
    return;
  }

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: r.name + ' — 내 자취 스타일 테스트',
      description: r.sub + '\n나는 어떤 스타일일까? 테스트해봐!',
      imageUrl: ogImageUrl,
      link: { mobileWebUrl: shareUrl, webUrl: shareUrl }
    },
    buttons: [{
      title: '나도 테스트하기',
      link: { mobileWebUrl: shareUrl, webUrl: shareUrl }
    }]
  });
}

function saveImage() {
  if (!currentResult) return;
  logCTA('이미지 저장');
  const r = currentResult;

  if (typeof html2canvas === 'undefined') {
    showToast('⏳ 이미지 생성 중...');
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = () => _doSaveImage(r);
    document.head.appendChild(script);
    return;
  }
  _doSaveImage(r);
}

function _doSaveImage(r) {

  document.getElementById('save-img').src = r.img;
  document.getElementById('save-name').textContent = r.name;
  document.getElementById('save-sub').textContent = r.sub;
  document.getElementById('save-desc').textContent = r.desc;

  const saveCard = document.getElementById('save-card');
  saveCard.style.left = '0';
  saveCard.style.zIndex = '9999';
  showToast('⏳ 이미지 생성 중...');

  setTimeout(() => {
    html2canvas(document.getElementById('save-card-inner'), {
      scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#FFFFFF'
    }).then(canvas => {
      saveCard.style.left = '-9999px';
      saveCard.style.zIndex = '-1';
      const link = document.createElement('a');
      link.download = '내_자취_스타일_' + r.name + '.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('🎉 이미지가 저장됐어요!');
    }).catch(() => {
      saveCard.style.left = '-9999px';
      showToast('저장에 실패했어요. 다시 시도해주세요.');
    });
  }, 500);
}

// ===== INIT =====
const initType = getFriendTypeName();
if (initType) {
  showResult(initType);
} else {
  showStart();
}
