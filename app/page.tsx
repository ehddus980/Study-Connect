import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent animate-pulse">
          스터디를 연결하다, Study Connect
        </h1>
        <p className="text-lg text-purple-600 font-medium">캘린더 관리와 실시간 스터디룸을 한 곳에서.</p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/calendar" className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:from-violet-600 hover:to-fuchsia-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
            캘린더로 이동
          </Link>
          <Link href="/study" className="px-6 py-3 rounded-lg border-2 border-violet-400 text-violet-600 font-semibold hover:bg-violet-50 hover:border-violet-500 hover:shadow-lg transition-all duration-200">
            스터디룸 보기
          </Link>
        </div>
      </section>
      <section className="grid sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border-2 border-violet-300 bg-gradient-to-br from-violet-100 via-purple-100 to-fuchsia-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <h2 className="font-bold mb-3 text-xl text-violet-900">🎓 실습 중심 학습</h2>
          <p className="text-sm text-violet-800">Next.js, TypeScript, Tailwind로 구성된 교육용 예제입니다.</p>
        </div>
        <div className="p-6 rounded-xl border-2 border-fuchsia-300 bg-gradient-to-br from-fuchsia-100 via-pink-100 to-violet-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <h2 className="font-bold mb-3 text-xl text-fuchsia-900">🤝 실시간 협업</h2>
          <p className="text-sm text-fuchsia-800">Daily SDK로 화상채팅과 화면공유를 체험해 보세요.</p>
        </div>
      </section>
    </div>
  )
}

