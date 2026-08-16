import Link from "next/link"

export default function EmailDetail() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* 顶部导航 */}
      <div className="bg-white px-4 pt-6 pb-3 border-b border-gray-100 flex items-center gap-3">
        <Link href="/inbox" className="text-gray-400 text-sm">← Inbox</Link>
        <span className="text-gray-900 font-semibold">Email</span>
      </div>

      {/* 邮件头部 */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-white">
              PM
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Prof. Martinez</p>
              <p className="text-xs text-gray-400">To: Chase • 10:23AM</p>
            </div>
          </div>
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
            Assignment
          </span>
        </div>
      </div>

      {/* AI Summary 卡片 */}
      <div className="mx-4 mt-4 bg-[#2D5A4E] rounded-2xl p-4 text-white">
        <p className="text-xs font-semibold mb-2 opacity-70">AI Summary</p>
        <p className="text-sm font-medium mb-1">HW3 is due this Friday May 2 at 11:59 PM</p>
        <p className="text-xs opacity-80">No late submissions without documented emergency. Contact TA by Wednesday for help.</p>
      </div>

      {/* 邮件正文 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4">
        <p className="text-sm text-gray-600 leading-relaxed mb-3">Hi everyone,</p>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          This is a reminder that Homework 3 is due this{" "}
          <span className="font-bold text-gray-900">Friday, May 2nd at 11:59 PM</span>.
          Please submit via Canvas under the Assignments tab.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          Late submissions will not be accepted without a documented emergency.
          Reach out to the TA at support@illinois.edu no later than Wednesday if you need help.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">Good luck,</p>
        <p className="text-sm text-gray-600">Prof. Martinez</p>
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