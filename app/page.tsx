import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-bold">스터디를 연결하다, Study Connect</h1>
        <p className="text-gray-600">캘린더 관리와 실시간 스터디룸을 한 곳에서.</p>
        <div className="flex justify-center gap-3 pt-2">
          <Link href="/calendar" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">캘린더로 이동</Link>
          <Link href="/study" className="px-4 py-2 rounded-md border hover:bg-gray-50">스터디룸 보기</Link>
        </div>
      </section>
      <section className="grid sm:grid-cols-2 gap-6">
        <div className="p-5 rounded-lg border">
          <h2 className="font-semibold mb-2">실습 중심 학습</h2>
          <p className="text-sm text-gray-600">Next.js, TypeScript, Tailwind로 구성된 교육용 예제입니다.</p>
        </div>
        <div className="p-5 rounded-lg border">
          <h2 className="font-semibold mb-2">실시간 협업</h2>
          <p className="text-sm text-gray-600">Daily SDK로 화상채팅과 화면공유를 체험해 보세요.</p>
        </div>
      </section>
    </div>
  )
}

