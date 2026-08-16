"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Todo {
  task: string
  from: string
  due?: string
  priority: "high" | "medium" | "low"
}

interface BriefData {
  todos: Todo[]
  totalEmails: number
  importantCount: number
  actionCount: number
}

export default function Brief() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [time, setTime] = useState("")
  const [data, setData] = useState<BriefData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") router.push("/")
  }, [status])

  useEffect(() => {
    const h = new Date().getHours()
    if (h < 12) setTime("Good morning")
    else if (h < 17) setTime("Good afternoon")
    else setTime("Good evening")
  }, [])

  useEffect(() => {
    if (session?.accessToken) fetchBrief()
  }, [session])

  async function fetchBrief() {
    setLoading(true)
    try {
      const emailsRes = await fetch("/api/gmail", {
        headers: { Authorization: `Bearer ${session!.accessToken as string}` },
      })
      const emailsData = await emailsRes.json()
      const emails = emailsData.emails ?? []

      const todosRes = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails }),
      })
      const todos: Todo[] = await todosRes.json()

      setData({
        todos,
        totalEmails: emails.length,
        importantCount: todos.length,
        actionCount: todos.filter((t) => t.priority === "high").length,
      })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const firstName = session?.user?.name?.split(" ")[0] ?? "there"
  const today = data?.todos.filter((t) => t.priority === "high") ?? []
  const upcoming = data?.todos.filter((t) => t.priority !== "high") ?? []

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-[#2D5A4E] px-5 pt-10 pb-8">
        <p className="text-green-200 text-sm mb-1">{time}</p>
        <h1 className="text-white text-2xl font-bold">{firstName} 👋</h1>
        <p className="text-green-300 text-xs mt-1">Here's what needs your attention today.</p>
      </div>

      <div className="px-4 py-5 space-y-4">

        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="h-3 bg-gray-100 rounded animate-pulse mb-3 w-1/3" />
                <div className="h-3 bg-gray-100 rounded animate-pulse mb-2 w-3/4" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
              </div>
            ))}
            <p className="text-center text-xs text-gray-400">Analyzing your inbox...</p>
          </>
        ) : (
          <>
            {/* Today */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-900">🔥 Today</h2>
                <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full font-medium">
                  {today.length} tasks
                </span>
              </div>
              {today.length === 0 ? (
                <p className="text-xs text-gray-400">No urgent tasks — you're good 🎉</p>
              ) : (
                <div className="space-y-3">
                  {today.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-800 font-medium">{item.task}</p>
                        <p className="text-xs text-gray-400">
                          {item.from}
                          {item.due && <> · <span className="text-orange-500">{item.due}</span></>}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming */}
            {upcoming.length > 0 && (
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">📅 Upcoming</h2>
                <div className="space-y-2">
                  {upcoming.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-700">{item.task}</p>
                        <p className="text-xs text-gray-400">
                          {item.from}
                          {item.due && <> · {item.due}</>}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inbox Intelligence */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">📬 Inbox Intelligence</h2>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { num: String(data?.totalEmails ?? 0), label: "emails" },
                  { num: String(data?.importantCount ?? 0), label: "need action" },
                  { num: String(data?.actionCount ?? 0), label: "urgent" },
                ].map((s, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-[#2D5A4E]">{s.num}</p>
                    <p className="text-xs text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ask MailMind */}
            <div className="bg-[#2D5A4E] rounded-2xl p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-white mb-3">✨ Ask MailMind</h2>
              <div className="space-y-2">
                {[
                  "What do I need to do this week?",
                  "What am I waiting for?",
                  "Show me emails I haven't replied to",
                ].map((q, i) => (
                  <button key={i} className="w-full text-left bg-white/10 hover:bg-white/20 text-green-100 text-xs rounded-xl px-3 py-2.5 transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-8 py-3 flex justify-around">
        <button className="flex flex-col items-center gap-1">
          <span className="text-[#2D5A4E] text-xl">☀</span>
          <span className="text-xs text-[#2D5A4E] font-medium">Brief</span>
        </button>
        <Link href="/inbox" className="flex flex-col items-center gap-1">
          <span className="text-gray-400 text-xl">⌂</span>
          <span className="text-xs text-gray-400">Inbox</span>
        </Link>
        <Link href="/tools" className="flex flex-col items-center gap-1">
          <span className="text-gray-400 text-xl">⚙</span>
          <span className="text-xs text-gray-400">Tasks</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1">
          <span className="text-gray-400 text-xl">◯</span>
          <span className="text-xs text-gray-400">Profile</span>
        </Link>
      </div>
    </div>
  )
}