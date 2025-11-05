import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Study Connect',
  description: '스터디를 연결하다, Study Connect',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <nav className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-10">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-6">
            <Link href="/" className="font-semibold text-lg">Study Connect</Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/" className="hover:text-blue-600">홈</Link>
              <Link href="/calendar" className="hover:text-blue-600">캘린더</Link>
              <Link href="/study" className="hover:text-blue-600">스터디룸</Link>
            </div>
          </div>
        </nav>
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">{children}</main>
        <footer className="border-t py-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} Study Connect</footer>
      </body>
    </html>
  )
}

