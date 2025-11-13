import Image from 'next/image'
import Link from 'next/link'

const mainLinks = [
  { name: '홈', href: '/' },
  { name: '캘린더', href: '/calendar' },
  { name: '스터디룸', href: '/studyroom' },
  { name: '멘토 찾기', href: '/mentors' },
  { name: '커뮤니티', href: '/community' },
  { name: '데모 스터디', href: '/study' },
]

const featureHighlights = [
  {
    title: '일정과 집중 관리',
    description: '캘린더에서 팀 일정과 개인 일정을 한 번에 계획하고, 잊지 않도록 리마인드합니다.',
    icon: '📅',
  },
  {
    title: '실시간 협업',
    description: 'Daily · Jitsi 기반 스터디룸으로 영상·화면 공유와 공동 학습을 실시간으로 진행해요.',
    icon: '💬',
  },
  {
    title: '학습 인사이트',
    description: '커뮤니티와 멘토 연결로 학습 방향을 잡고, 나의 프로필로 성장 여정을 기록하세요.',
    icon: '🌱',
  },
]

const experienceLinks = [
  {
    title: '멘토와 함께 성장하기',
    description: '전문 멘토와 1:1 커리어 상담, 스터디 코칭을 예약해 보세요.',
    cta: '멘토 살펴보기',
    href: '/mentors',
  },
  {
    title: '학습 커뮤니티 합류',
    description: '다른 학습자와 인사이트를 나누고, 질문과 답변으로 서로를 도와요.',
    cta: '커뮤니티 참여',
    href: '/community',
  },
  {
    title: '나의 학습 기록 정리',
    description: '관심 분야, 포트폴리오, 참여한 스터디를 정리해 맞춤 추천을 받으세요.',
    cta: '프로필 관리',
    href: '/profile',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 text-gray-800 pt-4">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-5 pb-16">
        <header className="glass-panel relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-fuchsia-500 text-white">
          <div className="pointer-events-none absolute -top-20 -right-12 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-purple-400/20 blur-3xl" />
          <div className="relative flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                Study Flow
              </p>
              <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
                스터디부터 멘토링까지,
                <br />
                Study Connect 하나로.
              </h1>
              <p className="text-sm text-purple-50/90 md:text-base">
                팀 일정 관리, 실시간 스터디룸, 멘토 연결, 커뮤니티까지 학습 여정을 자연스럽게
                이어 주는 플랫폼입니다. 필요한 기능만 골라 빠르게 시작하세요.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/calendar"
                  className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-purple-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-50"
                >
                  캘린더 살펴보기
                </Link>
                <Link
                  href="/studyroom"
                  className="rounded-2xl border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  스터디룸 체험하기
                </Link>
              </div>
            </div>
            <div className="glass-panel-dark relative mx-auto w-full max-w-sm space-y-5 bg-white/10 text-white">
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-purple-100">
                <span>오늘의 포커스</span>
                <span className="rounded-full bg-white/20 px-3 py-1">3개의 세션</span>
              </div>
              <div className="rounded-2xl bg-white/95 p-5 text-gray-700 shadow-lg ring-1 ring-purple-100">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-purple-400">
                  <span>스터디룸</span>
                  <span>20:00 · 온라인</span>
                </div>
                <h2 className="mt-3 text-lg font-semibold text-purple-700">React 실전 리뷰</h2>
                <p className="text-xs text-gray-500">
                  진행 상태와 과제 공유, 코드 리뷰로 마무리하는 시간입니다.
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((item) => (
                      <span
                        key={item}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-400 text-xs font-semibold text-white ring-2 ring-white"
                      >
                        S{item}
                      </span>
                    ))}
                  </div>
                  <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
                    실시간 협업
                  </span>
                </div>
              </div>
              <p className="text-xs text-purple-100">
                학습 기록과 다음 일정을 한 화면에서 확인하고, 팀과 함께 성장하세요.
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {featureHighlights.map((feature) => (
            <div
              key={feature.title}
              className="glass-panel flex flex-col gap-4 bg-white/95 text-left transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <span className="text-3xl" aria-hidden>
                {feature.icon}
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-purple-700">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {experienceLinks.map((section) => (
            <div
              key={section.title}
              className="glass-panel flex h-full flex-col justify-between bg-white/95 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-purple-700">{section.title}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </div>
              <Link href={section.href} className="gradient-button mt-6 self-start">
                {section.cta}
              </Link>
            </div>
          ))}
        </section>

        <section className="glass-panel-dark flex flex-col gap-4 overflow-hidden bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-500 text-white shadow-2xl md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">지금 바로 팀 학습을 시작하세요</h2>
            <p className="text-sm text-purple-100">
              캘린더 &gt; 스터디룸 &gt; 커뮤니티로 이어지는 워크플로우를 경험하고, 필요한 기능만
              선택해 나만의 스터디 습관을 만들어 보세요.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/calendar"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-purple-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-50"
            >
              캘린더 열기
            </Link>
            <Link
              href="/study"
              className="rounded-2xl border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              데모 스터디 둘러보기
            </Link>
          </div>
        </section>

        <footer className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Study Connect · 함께 성장하는 학습 커뮤니티
        </footer>
      </div>
    </div>
  )
}

