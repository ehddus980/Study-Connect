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
        <nav className="w-full border-b-2 border-violet-200 bg-gradient-to-r from-violet-100/80 via-purple-100/80 to-fuchsia-100/80 backdrop-blur supports-[backdrop-filter]:bg-violet-100/60 sticky top-0 z-10 shadow-md">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-6">
            <Link href="/" className="font-bold text-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Study Connect</Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/" className="text-violet-700 hover:text-violet-900 font-medium transition-colors">홈</Link>
              <Link href="/calendar" className="text-violet-700 hover:text-violet-900 font-medium transition-colors">캘린더</Link>
              <Link href="/study" className="text-violet-700 hover:text-violet-900 font-medium transition-colors">스터디룸</Link>
            </div>
          </div>
        </nav>
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">{children}</main>
        <footer className="border-t-2 border-violet-200 bg-gradient-to-r from-violet-50 to-fuchsia-50 py-6 text-center text-sm text-violet-700">© {new Date().getFullYear()} Study Connect</footer>
      </body>
    </html>
  )
}

