"use client"

import { useState, useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import Link from "next/link"

export default function Inbox() {
  const { data: session, status } = useSession()
  const [emails, setEmails] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.accessToken) {
      fetchEmails()
    }
  }, [session])

  async function fetchEmails() {
    setLoading(true)
    try {
      const response = await fetch("/api/gmail", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      const data = await response.json()
      if (data.emails) setEmails(data.emails)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // 未登录状态
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#2D5A4E] flex flex-col items-center justify-center px-6">
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl font-bold mb-2">MailMind</h1>
          <p className="text-green-200 text-sm">Your AI inbox assistant for student life</p>
        </div>
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
          <button
            onClick={() => signIn("google")}
            className="w-full bg-[#2D5A4E] text-white rounded-lg py-3 text-sm font-medium flex items-center justify-center gap-2"
          >
            Connect Gmail
          </button>
        </div>
      </div>
    )
  }

  // 加载中
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#2D5A4E] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Loading your emails...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white px-4 pt-6 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              {emails.length}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#2D5A4E] text-white flex items-center justify-center text-sm font-medium">
            {session?.user?.name?.[0] || "U"}
          </div>
        </div>
        <div className="bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-400">
          Search emails...
        </div>
      </div>

      {/* 邮件列表 */}
      <div className="px-4 py-3 pb-24">
        {emails.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            No emails found
          </div>
        ) : (
          emails.map((email) => (
            <Link
              href={`/email?id=${email.id}`}
              key={email.id}
              className="block bg-white rounded-2xl p-4 mb-2 shadow-sm"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-gray-900 text-sm">{email.sender}</span>
                <span className="text-xs text-gray-400">
                  {new Date(email.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-1">{email.subject}</p>
              <p className="text-xs text-gray-400 truncate">{email.snippet}</p>
            </Link>
          ))
        )}
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-8 py-3 flex justify-around">
        <button className="flex flex-col items-center gap-1">
          <span className="text-[#2D5A4E] text-xl">⌂</span>
          <span className="text-xs text-[#2D5A4E] font-medium">Inbox</span>
        </button>
        <Link href="/tools" className="flex flex-col items-center gap-1">
          <span className="text-gray-400 text-xl">⚙</span>
          <span className="text-xs text-gray-400">Tools</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1">
          <span className="text-gray-400 text-xl">◯</span>
          <span className="text-xs text-gray-400">Profile</span>
        </Link>
      </div>
    </div>
  )
}