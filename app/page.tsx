import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">스터디를 연결하다, Study Connect</h1>
        <p className="text-purple-700">캘린더 관리와 실시간 스터디룸을 한 곳에서.</p>
        <div className="flex justify-center gap-3 pt-2">
          <Link href="/calendar" className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg transition-all">캘린더로 이동</Link>
          <Link href="/study" className="px-4 py-2 rounded-md border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 transition-all">스터디룸 보기</Link>
        </div>
      </section>
      <section className="grid sm:grid-cols-2 gap-6">
        <div className="p-5 rounded-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-shadow">
          <h2 className="font-semibold mb-2 text-purple-800">실습 중심 학습</h2>
          <p className="text-sm text-purple-700">Next.js, TypeScript, Tailwind로 구성된 교육용 예제입니다.</p>
        </div>
        <div className="p-5 rounded-lg border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50 hover:shadow-lg transition-shadow">
          <h2 className="font-semibold mb-2 text-pink-800">실시간 협업</h2>
          <p className="text-sm text-pink-700">Daily SDK로 화상채팅과 화면공유를 체험해 보세요.</p>
        </div>
      </section>
    </div>
  )
}

