import Link from "next/link"

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* 顶部 */}
      <div className="bg-white px-4 pt-6 pb-3 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      </div>

      <div className="px-4 py-6 space-y-4">

        {/* 用户头像 */}
        <div className="flex flex-col items-center py-4">
          <div className="w-20 h-20 rounded-full bg-[#2D5A4E] text-white flex items-center justify-center text-3xl font-bold mb-3">
            C
          </div>
          <p className="text-lg font-bold text-gray-900">Chase</p>
          <p className="text-sm text-gray-400">chase@illinois.edu</p>
        </div>

        {/* 关联账号 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-400 font-medium mb-3">LINKED ACCOUNTS</p>
          <div className="space-y-3">
            {[
              { name: "Chase (Primary)", email: "chase@illinois.edu", color: "bg-[#2D5A4E]", connected: true },
              { name: "Cathy (Personal)", email: "cathy@personal.edu", color: "bg-teal-400", connected: true },
            ].map((account, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${account.color} text-white flex items-center justify-center text-sm font-bold`}>
                    C
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{account.name}</p>
                    <p className="text-xs text-gray-400">{account.email}</p>
                  </div>
                </div>
                {account.connected && (
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-500 text-xs">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 设置 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-400 font-medium mb-3">ALL SETTINGS</p>
          <div className="space-y-4">
            {[
              { label: "Auto-sorted by keywords", on: true },
              { label: "AI summaries", on: true },
            ].map((setting, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-gray-800">{setting.label}</span>
                <div className={`w-10 h-6 rounded-full ${setting.on ? "bg-[#2D5A4E]" : "bg-gray-200"} relative`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 ${setting.on ? "right-1" : "left-1"} shadow-sm`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 더 많은 설정 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-400 font-medium mb-3">ALL SETTINGS</p>
          <div className="space-y-4">
            {[
              { label: "Language", value: "English" },
              { label: "Notifications", value: "On" },
            ].map((setting, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-gray-800">{setting.label}</span>
                <span className="text-sm text-gray-400">{setting.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 로그아웃 */}
        <Link href="/">
          <button className="w-full bg-white border border-red-200 text-red-400 rounded-2xl py-3 text-sm font-medium shadow-sm">
            Sign Out
          </button>
        </Link>

      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-8 py-3 flex justify-around">
        <Link href="/inbox" className="flex flex-col items-center gap-1">
          <span className="text-gray-400 text-xl">⌂</span>
          <span className="text-xs text-gray-400">Inbox</span>
        </Link>
        <Link href="/tools" className="flex flex-col items-center gap-1">
          <span className="text-gray-400 text-xl">⚙</span>
          <span className="text-xs text-gray-400">Tools</span>
        </Link>
        <button className="flex flex-col items-center gap-1">
          <span className="text-[#2D5A4E] text-xl">◯</span>
          <span className="text-xs text-[#2D5A4E] font-medium">Profile</span>
        </button>
      </div>

    </div>
  )
}