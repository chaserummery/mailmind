// @ts-nocheck
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function EmailDetail() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const emailId = searchParams.get("id")

  const [email, setEmail] = useState(null)
  const [summary, setSummary] = useState(null)
  const [loadingEmail, setLoadingEmail] = useState(true)
  const [loadingSummary, setLoadingSummary] = useState(true)

  useEffect(() => {
    if (session?.accessToken && emailId) {
      fetchEmail()
    }
  }, [session, emailId])

  async function fetchEmail() {
    try {
      const response = await fetch(`/api/gmail/message?id=${emailId}`, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      })
      const data = await response.json()
      setEmail(data)
      setLoadingEmail(false)
      // 邮件加载好之后，生成 AI summary
      generateSummary(data.body || data.snippet)
    } catch (error) {
      console.error(error)
      setLoadingEmail(false)
    }
  }

  async function generateSummary(content) {
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailContent: content }),
      })
      const data = await response.json()
      setSummary(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingSummary(false)
    }
  }

  if (loadingEmail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#2D5A4E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 顶部导航 */}
      <div className="bg-white px-4 pt-6 pb-3 border-b border-gray-100 flex items-center gap-3">
        <Link href="/inbox" className="text-gray-400 text-sm">← Inbox</Link>
        <span className="text-gray-900 font-semibold">Email</span>
      </div>

      {/* 邮件头部 */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2D5A4E] flex items-center justify-center text-sm font-bold text-white">
              {email?.sender?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{email?.sender}</p>
              <p className="text-xs text-gray-400">
                {email?.date ? new Date(email.date).toLocaleString() : ""}
              </p>
            </div>
          </div>
        </div>
        <p className="font-medium text-gray-900 mt-3 text-sm">{email?.subject}</p>
      </div>

      {/* AI Summary 卡片 */}
      <div className="mx-4 mt-4 bg-[#2D5A4E] rounded-2xl p-4 text-white">
        <p className="text-xs font-semibold mb-2 opacity-70">AI Summary</p>
        {loadingSummary ? (
          <div className="space-y-2">
            <div className="h-3 bg-white opacity-20 rounded animate-pulse"></div>
            <div className="h-3 bg-white opacity-20 rounded animate-pulse w-3/4"></div>
          </div>
        ) : summary ? (
          <>
            <p className="text-sm font-medium mb-2">{summary.summary}</p>
            {summary.dueDate && (
              <p className="text-xs opacity-80 mb-2">📅 Due: {summary.dueDate}</p>
            )}
            {summary.actionItems?.length > 0 && (
              <div className="mt-2 space-y-1">
                {summary.actionItems.map((item, i) => (
                  <p key={i} className="text-xs opacity-80">• {item}</p>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-sm opacity-80">Could not generate summary.</p>
        )}
      </div>

      {/* 邮件正文 */}
      <div className="mx-4 mt-4 mb-24 bg-white rounded-2xl p-4">
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
          {email?.body || email?.snippet}
        </p>
      </div>

      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 flex gap-3">
        <button className="flex-1 bg-[#2D5A4E] text-white rounded-xl py-3 text-sm font-medium">
          ✓ Mark Done
        </button>
        <button className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-3 text-sm font-medium">
          Reply
        </button>
      </div>

    </div>
  )
}