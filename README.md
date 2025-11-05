# Study Connect

학습용 웹서비스: 캘린더, 스터디룸(화상채팅/화면공유) 예제. Next.js 14 + TypeScript + TailwindCSS 기반.

## 요구사항
- Node.js 18+

## 설치 및 실행
```bash
npm install
npm run dev
```

- 개발 서버: http://localhost:3000

## 기능
- 홈(`/`): 소개와 이동 버튼
- 캘린더(`/calendar`): react-big-calendar, 로컬스토리지 기반 일정 CRUD
- 스터디룸(`/study`): Daily 방 URL 입력 후 참여/나가기, 화면공유

## Daily 방 URL
- Daily 대시보드에서 도메인/룸을 만든 뒤 URL을 입력하세요.
  - 예: https://your-domain.daily.co/test-room

## 배포
- Vercel에 그대로 배포 가능

## 기술 스택
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- @daily-co/daily-js
- react-big-calendar

# Study-Connect
