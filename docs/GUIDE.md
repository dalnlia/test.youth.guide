# 내 자취 스타일 테스트 — 프로젝트 가이드

> gobang.kr 바이럴용 퍼스널리티 퀴즈. GitHub Pages 정적 배포(HTML+CSS+JS).

---

## 폴더 구조

```
jachwi-test/
├── index.html          # 앱 진입점, save-card(이미지 저장용 카드) 마크업 포함
├── quiz.js             # 전체 로직 (질문 데이터, 점수 계산, 렌더링, 공유)
├── style.css           # 디자인 시스템 및 컴포넌트 스타일
├── 시작.bat             # 로컬 서버 실행 + 브라우저 오픈
├── images/
│   ├── start.png       # 시작 화면 (타이틀 + 캐릭터 통합 이미지)
│   ├── 1_bangguseok.png ~ 8_mirae.png  # 유형별 캐릭터 이미지 (투명 PNG)
│   └── og/
│       └── og_default.png  # OG 기본 이미지
└── docs/
    ├── GUIDE.md        # 이 문서
    └── 기획서.md        # 초기 기획 문서
```

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 언어 | Vanilla JS, HTML, CSS (프레임워크 없음) |
| 폰트 | Pretendard (CDN) |
| 이미지 저장 | html2canvas 1.4.1 (CDN, 결과 저장 시 로드) |
| 공유 | Web Share API (모바일) / clipboard fallback (PC) |
| 테스트 카운트 | Google Sheets Apps Script (`?action=count`) + localStorage 캐시 |
| 배포 | GitHub Pages (`dalnlia/test.youth.guide`) |

---

## 화면 흐름

```
시작화면 → Q1 → Q2 → ... → Q8 → 결과화면
                                      ↓
                              유형 상세 팝업 (가로 스크롤 카드 클릭)
```

---

## 점수 계산 로직

- 8개 질문, 각 질문마다 4개 선택지
- 각 선택지는 1개 유형에 +1점 부여
- 모든 질문 완료 후 가장 높은 점수의 유형이 결과
- 동점 시: `secondary` 점수(선택 순서 기반 가중치)로 타이브레이커

```js
// quiz.js 핵심 구조
scores[type] += 1
// 결과: Object.entries(scores).sort([...]).at(0)
```

---

## 유형 목록 (8종)

| 키 | 유형명 | 이미지 파일 |
|----|--------|------------|
| bangguseok | 집콕 마스터 | 1_bangguseok.png |
| hyoryul | 효율 중독자 | 2_hyoryul.png |
| gasungbi | 갓성비 장인 | 3_gasungbi.png |
| social | 인간 아지트 | 4_social.png |
| dieter | 통장 다이어터 | 5_jeokja.png |
| mental | 멘탈 수호자 | 6_mental.png |
| jibak | 동네 토박이 | 7_jibak.png |
| mirae | 플랜 B 보유자 | 8_mirae.png |

---

## 유형별 등장 질문 매핑

각 질문의 선택지 번호(①②③④):

| Q | 질문 요약 | ① | ② | ③ | ④ |
|---|----------|---|---|---|---|
| 1 | 주말 약속 없다 | 집콕 | 효율 | 갓성비 | 인간 |
| 2 | 자취방 양보 못 하는 건 | 집콕 | 효율 | 갓성비 | 동네 |
| 3 | 전자레인지 고장 | 멘탈 | 갓성비 | 통장 | 플랜B |
| 4 | 녹초로 귀가 | 집콕 | 효율 | 인간 | 동네 |
| 5 | 이사할 때 내 모습 | 동네 | 플랜B | 갓성비 | 인간 |
| 6 | 악몽 내용 | 멘탈 | 동네 | 통장 | 효율 |
| 7 | 첫 자취 친구에게 조언 | 집콕 | 플랜B | 통장 | 멘탈 |
| 8 | 내 자취 추구미 | 플랜B | 멘탈 | 인간 | 통장 |

### 유형별 등장 횟수

모든 유형이 정확히 **4회** 등장 (균등 분포)

---

## 유형별 결과 재현 치트키

각 유형이 나오는 4문항은 핵심 번호, 나머지 4문항은 다른 유형이 4점에 도달하지 않도록 계산한 최적 선택지예요.

| 유형 | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 |
|------|----|----|----|----|----|----|----|----|
| 집콕 마스터 | **①** | **①** | ② | **①** | ① | ④ | **①** | ③ |
| 효율 중독자 | **②** | **②** | ① | **②** | ① | **④** | ④ | ③ |
| 갓성비 장인 | **③** | **③** | **②** | ① | **③** | ① | ① | ① |
| 인간 아지트 | **④** | ① | ① | **③** | **④** | ① | ① | **③** |
| 동네 토박이 | ① | **④** | ① | **④** | **①** | **②** | ① | ① |
| 통장 다이어터 | ① | ① | **③** | ① | ② | **③** | **③** | **④** |
| 멘탈 수호자 | ① | ① | **①** | ① | ① | **①** | **④** | **②** |
| 플랜 B 보유자 | ① | ① | **④** | ① | **②** | ① | **②** | **①** |

> **굵은 숫자** = 해당 유형 점수 획득 선택지

---

## 외부 연동

### Google Sheets (테스트 카운트 및 행동 로그)
- Apps Script URL: `quiz.js` 상단 `SHEET_URL` 상수
- `?action=count` → 총 테스트 수 반환 (JSON `{ count: N }`)
- `?action=log` (기본) → 유형 결과 기록
- 카운트는 `localStorage('jachwi_count')`에 캐시되어 재방문 시 즉시 표시

#### 로그 컬럼 구조
| 컬럼 | 내용 |
|------|------|
| 타임스탬프 | 이벤트 발생 시각 |
| 버튼 | `테스트 시작` / `테스트완료` / `링크 복사` / `내 자취방 찾으러 가기` / `이미지 저장` |
| 유형 | 결과 유형명 (테스트 시작 시점은 `-`) |
| 유저ID | `u_xxxxxxxx` 형태의 랜덤 ID |

#### 유저ID 생성 기준
- 브라우저 탭을 처음 열 때 랜덤 생성 → `sessionStorage`에 저장
- **같은 탭** 안에서는 동일 ID 유지 (다시하기 버튼 포함)
- **탭을 닫거나 새로 열면** 새 ID 생성 → 동일인이어도 별개 유저로 카운팅
- `localStorage`로 변경하면 탭을 닫아도 같은 기기에서 동일 ID 유지 가능

#### 피벗 뷰 수식 (시트2 A1에 붙여넣기)
```
=LET(ids, SORT(UNIQUE(FILTER(CTAlog!D2:D, CTAlog!D2:D<>"", CTAlog!D2:D<>"-"))),
{"유저ID","타임스탬프","유형","테스트시작","테스트완료","링크복사","CTA클릭","이미지저장";
 ids,
 BYROW(ids, LAMBDA(id, MINIFS(CTAlog!A2:A, CTAlog!D2:D, id))),
 BYROW(ids, LAMBDA(id, IFERROR(VLOOKUP(id, FILTER({CTAlog!D2:D, CTAlog!C2:C}, CTAlog!C2:C<>"-", CTAlog!C2:C<>""), 2, 0), ""))),
 BYROW(ids, LAMBDA(id, COUNTIFS(CTAlog!D2:D, id, CTAlog!B2:B, "테스트 시작")>0)),
 BYROW(ids, LAMBDA(id, COUNTIFS(CTAlog!D2:D, id, CTAlog!B2:B, "테스트완료")>0)),
 BYROW(ids, LAMBDA(id, COUNTIFS(CTAlog!D2:D, id, CTAlog!B2:B, "링크 복사")>0)),
 BYROW(ids, LAMBDA(id, COUNTIFS(CTAlog!D2:D, id, CTAlog!B2:B, "내 자취방 찾으러 가기")>0)),
 BYROW(ids, LAMBDA(id, COUNTIFS(CTAlog!D2:D, id, CTAlog!B2:B, "이미지 저장")>0))
})
```

---

## 배포 정보

- **개인 계정 배포**: `https://dalnlia.github.io/test.youth.guide/`
- **OG 캐시 초기화**: `https://developers.kakao.com/tool/clear/og`

---

## 배포 체크리스트

- [ ] `index.html` OG URL (`og:url`, `og:image`) 실제 도메인으로 수정
