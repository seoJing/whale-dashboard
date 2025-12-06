# Whale Dashboard - Project Summary

## 프로젝트 개요

네이버 웨일 브라우저 사이드바를 활용한 스마트워치 스타일 대시보드 확장 프로그램

## 구현 완료된 기능

### 1. 시계 위젯 (Clock Widget)

-   **아날로그 시계**: 시침, 분침, 초침이 동작하는 원형 시계
-   **디지털 시계**: 시:분:초 + 날짜 표시
-   **모드 전환**: 버튼 클릭으로 아날로그/디지털 전환

### 2. 슬라이더 패널 (Slider Panel)

-   **스와이프 제스처**: 터치/드래그로 위젯 전환
-   **도트 네비게이션**: 현재 위치 표시 및 직접 이동
-   **스마트워치 UX**: 가로 스크롤 방식

### 3. Todo 위젯

-   할 일 추가/삭제
-   완료 체크박스
-   localStorage 자동 저장

### 4. 타이머 위젯 (Pomodoro)

-   Work 모드: 25분
-   Break 모드: 5분
-   시작/일시정지/리셋 기능
-   자동 모드 전환

### 5. 캘린더 위젯

-   현재 월 달력 표시
-   오늘 날짜 하이라이트

### 6. 북마크 위젯

-   URL + 제목 저장
-   클릭하여 새 탭에서 열기
-   localStorage 저장

## 기술 스택

### Frontend

-   **React 19.2.0**: 최신 React
-   **TypeScript**: 타입 안정성
-   **Vite 7**: 빠른 빌드 도구
-   **Tailwind CSS 4**: 유틸리티 CSS

### 아키텍처

-   **FSD (Feature-Sliced Design)**: 확장 가능한 구조
    -   `app`: 앱 초기화
    -   `pages`: 레이아웃
    -   `widgets`: 독립적 UI 블록
    -   `features`: 사용자 액션
    -   `entities`: 비즈니스 엔티티
    -   `shared`: 공통 코드

### 코드 품질

-   **TypeScript Strict Mode**: 엄격한 타입 체크
-   **ESLint**: 코드 린팅
-   **Path Aliases**: `@app`, `@widgets` 등 깔끔한 import

## 파일 구조

```
whale-dashboard/
├── src/
│   ├── app/                    # 앱 진입점
│   │   ├── providers/          # Context Providers
│   │   └── styles/             # 글로벌 스타일
│   ├── pages/
│   │   └── sidebar/            # 사이드바 메인 페이지
│   ├── widgets/
│   │   ├── clock/              # 시계 (아날로그/디지털)
│   │   ├── slider-panel/       # 스와이프 컨테이너
│   │   ├── todo/               # 할 일 관리
│   │   ├── timer/              # 뽀모도로 타이머
│   │   ├── calendar/           # 달력
│   │   └── bookmarks/          # 북마크 관리
│   ├── entities/
│   │   ├── todo/               # Todo 타입 정의
│   │   └── bookmark/           # Bookmark 타입 정의
│   └── shared/
│       ├── ui/                 # Button, Card 컴포넌트
│       ├── lib/                # storage, whale-api 유틸
│       ├── config/             # 상수 설정
│       └── types/              # 공통 타입
├── public/
│   ├── manifest.json           # 웨일 확장앱 설정
│   └── icons/                  # 확장앱 아이콘
└── dist/                       # 빌드 결과물

총 40개 TypeScript/TSX 파일 생성
```

## 설치 및 실행

### 개발 모드

```bash
pnpm install
pnpm dev
```

### 프로덕션 빌드

```bash
pnpm build
```

### 웨일 브라우저에 설치

1. `whale://extensions` 접속
2. 개발자 모드 활성화
3. "압축 해제된 확장앱 로드" 클릭
4. `dist` 폴더 선택

## 주요 기술적 특징

### 1. FSD 아키텍처

-   레이어별 명확한 책임 분리
-   확장성 있는 구조
-   순환 참조 방지

### 2. 타입 안정성

-   `verbatimModuleSyntax` 사용
-   모든 컴포넌트 타입 정의
-   엄격한 타입 체크

### 3. 상태 관리

-   React Hooks 기반 (useState, useEffect, useRef)
-   localStorage를 통한 영속성
-   커스텀 훅으로 로직 분리

### 4. 스타일링

-   Tailwind CSS 4 최신 버전
-   반응형 디자인
-   스마트워치 감성의 UI

### 5. 빌드 최적화

-   Vite의 빠른 HMR
-   Tree-shaking
-   코드 스플리팅

## 다음 개선 사항 (옵션)

1. **아이콘**: 16x16 PNG 아이콘 추가
2. **테마**: 다크/라이트 모드 토글
3. **설정**: 타이머 시간 커스터마이징
4. **동기화**: Chrome Storage API로 기기 간 동기화
5. **알림**: 타이머 완료 시 알림
6. **드래그 앤 드롭**: Todo 순서 변경
7. **검색**: 북마크 검색 기능

## 성능

-   **빌드 크기**: ~204KB (gzip: ~64KB)
-   **빌드 시간**: ~764ms
-   **번들러**: Vite 7
-   **모듈 수**: 55개

## 브라우저 호환성

-   Naver Whale (Chromium 기반)
-   Chrome (manifest v2 지원)
-   Edge (manifest v2 지원)

## 라이선스

MIT

## 작성일

2025-12-05
