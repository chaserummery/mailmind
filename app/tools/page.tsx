"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"

interface Todo {
  task: string
  from: string
  due?: string
  priority: "high" | "medium" | "low"
}

export default function Tools() {
  const { data: session } = useSession()
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [done, setDone] = useState<number[]>([])

  useEffect(() => {
    if (session?.accessToken) {
      fetchTodos()
    }
  }, [session])

  async function fetchTodos() {
    setLoading(true)
    try {
      const emailsRes = await fetch("/api/gmail", {
        headers: { Authorization: `Bearer ${session!.accessToken as string}` },
      })
      const emailsData = await emailsRes.json()

      if (!emailsData.emails?.length) {
        setLoading(false)
        return
      }

      const todosRes = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails: emailsData.emails }),
      })
      const todosData = await todosRes.json()
      setTodos(todosData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function toggleDone(i: number) {
    setDone((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    )
  }

  const priorityColor: Record<string, string> = {
    high: "text-red-500",
    medium: "text-orange-400",
    low: "text-gray-400",
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-4 pt-6 pb-3 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Today's Tasks</h1>
        <p className="text-xs text-gray-400 mt-0.5">Extracted from your inbox by AI</p>
      </div>

      <div className="px-4 py-4">
        {loading ? (
          <div className="space-y-3 mt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="h-3 bg-gray-100 rounded animate-pulse mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2"></div>
              </div>
            ))}
            <p className="text-center text-xs text-gray-400 mt-4">
              Reading your emails and extracting tasks...
            </p>
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-gray-500 text-sm">No action items found!</p>
            <p className="text-gray-400 text-xs mt-1">Your inbox looks clear.</p>
          </div>
        ) : (
          <div className="space-y-2 mt-2">
            {todos.map((todo, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-4 shadow-sm transition-opacity ${
                  done.includes(i) ? "opacity-40" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleDone(i)}
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                      done.includes(i)
                        ? "bg-[#2D5A4E] border-[#2D5A4E]"
                        : "border-gray-300"
                    }`}
                  >
                    {done.includes(i) && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </button>
                  <div className="flex-1">
                    <p className={`text-sm font-medium text-gray-900 ${done.includes(i) ? "line-through" : ""}`}>
                      {todo.task}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">{todo.from}</span>
                      {todo.due && (
                        <>
                          <span className="text-gray-300">·</span>
                          <span className="text-xs text-orange-500 font-medium">
                            {todo.due}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs font-medium ${priorityColor[todo.priority] || "text-gray-400"}`}>
                    {todo.priority}
                  </span>
                </div>
              </div>
            ))}
            <p className="text-center text-xs text-gray-400 mt-3">
              {todos.length - done.length} tasks remaining
            </p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-8 py-3 flex justify-around">
        <Link href="/inbox" className="flex flex-col items-center gap-1">
          <span className="text-gray-400 text-xl">⌂</span>
          <span className="text-xs text-gray-400">Inbox</span>
        </Link>
        <button className="flex flex-col items-center gap-1">
          <span className="text-[#2D5A4E] text-xl">⚙</span>
          <span className="text-xs text-[#2D5A4E] font-medium">Tasks</span>
        </button>
        <Link href="/profile" className="flex flex-col items-center gap-1">
          <span className="text-gray-400 text-xl">◯</span>
          <span className="text-xs text-gray-400">Profile</span>
        </Link>
      </div>
    </div>
  )
}