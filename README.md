# Study Connect

학습용 웹서비스: 캘린더, 스터디룸(화상채팅/화면공유) 예제. Next.js 14 + TypeScript + TailwindCSS 기반.

## 요구사항
- 커서 ai 설치
- 커서 ai github 연동하기
- git 설치
- Node.js 18+ 웹에서 nodejs 설치
- npm 환경변수추가 자세한 방법은 구글링으로 

## 설치 및 실행
```bash
npm install
npm run dev
```

- 개발 서버: http://localhost:3000

## 기능
- 홈(`/`): 소개와 이동 버튼
- 캘린더(`/calendar`): react-big-calendar, 로컬스토리지 기반 일정 CRUD
- 스터디룸(`/study`): Jitsi Meet(공개 인스턴스 `meet.jit.si`) 기반 화상회의

## 스터디룸 사용법 (Daily/Jitsi 토글)
- 페이지: `/study`
- 상단 라디오 버튼으로 제공자 선택
  - Jitsi: 방 이름만 입력(예: `study-connect-demo`) → 시작
  - Daily: 방 URL 입력(예: `https://<subdomain>.daily.co/<room>`) → 참여
- 참고:
  - Jitsi의 공개 인스턴스(`meet.jit.si`)는 프로덕션 용도 비권장. 문서: https://jitsi.org/api/
  - Daily의 프라이빗 방은 토큰이 필요합니다. 현재 데모는 퍼블릭/링크 접근 방을 권장합니다.

## Jitsi 사용법
- 방 이름만 입력하면 됩니다. 예: `study-connect-demo`
- 공개 인스턴스: `https://meet.jit.si` (프로덕션 용도는 권장되지 않음)
- API 참조: [Jitsi External API](https://jitsi.org/api/)

## Daily 사용 시 참고
- URL 형식: `https://<your-subdomain>.daily.co/<room-name>`
- 일부 계정/도메인은 사용 전 결제수단 등록을 요구할 수 있습니다. 무료 테스트가 가능하나 Billing 설정이 필요할 수 있습니다.

## 배포
- Vercel에 그대로 배포 가능

## GitHub 연동 및 푸시
```bash
git init
git add .
git commit -m "feat: Jitsi/Daily 토글 스터디룸 및 캘린더 구현"
git branch -M main
git remote add origin https://github.com/<your-id>/<repo>.git
git push -u origin main
```

## 기술 스택
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- @daily-co/daily-js
- react-big-calendar

# Study-Connect
