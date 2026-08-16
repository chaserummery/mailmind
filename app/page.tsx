import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#2D5A4E] flex flex-col items-center justify-center px-6">
      
      <div className="text-center mb-8">
        <h1 className="text-white text-4xl font-bold mb-2">MailMind</h1>
        <p className="text-green-200 text-sm">Your AI inbox assistant for student life — organized for you.</p>
      </div>

      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
        
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">University email</label>
          <input
            type="email"
            placeholder="chase@illinois.edu"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••••"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Sign In 按钮 — 现在点击会跳转到 /inbox */}
        <Link href="/brief">
          <button className="w-full bg-[#2D5A4E] text-white rounded-lg py-3 text-sm font-medium mb-4">
            Sign In
          </button>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-400 text-xs">or continue with</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <Link href="/brief">
          <button className="w-full border border-gray-200 rounded-lg py-3 text-sm text-gray-600 flex items-center justify-center gap-2">
            <span>G</span> Continue with Google
          </button>
        </Link>

        <p className="text-center text-xs text-gray-400 mt-6">
          Don't have an account? <span className="text-[#2D5A4E] cursor-pointer">Sign up free</span>
        </p>
      </div>

    </div>
  )
}