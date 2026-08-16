import Link from "next/link"

export default function Tools() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* 顶部 */}
      <div className="bg-white px-4 pt-6 pb-3 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Tool</h1>
      </div>

      <div className="px-4 py-4 space-y-4">

        {/* Assignments */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900 text-sm">Assignments</span>
            <span className="text-xs text-gray-400">3 active</span>
          </div>
          <div className="space-y-3">
            {[
              { name: "HW3 Final Project Prototype", course: "INFO 333 • Professor Martinez", due: "Due: Today", dueColor: "text-red-500" },
              { name: "Lab 4", course: "IS 308", due: "Due: in 2 days", dueColor: "text-orange-500" },
              { name: "Final Proposal", course: "IS 226 • Professor Hendricks", due: "Due: in 3 days", dueColor: "text-orange-400" },
            ].map((item, i) => (
              <div key={i} className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 mt-0.5 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-800 font-medium">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.course}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium ${item.dueColor} flex-shrink-0 ml-2`}>{item.due}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900 text-sm">Appointments</span>
            <span className="text-xs text-gray-400">2 upcoming</span>
          </div>
          <div className="space-y-3">
            {[
              { name: "iSchool Advising", location: "408 E Green Street", time: "Tomorrow Apr 16 • 2:00PM", done: true },
              { name: "Office Hour - Pro.Chen", location: "Lincoln Hall 2070", time: "Thu, Apr 17 • 4:00 PM", done: true },
            ].map((item, i) => (
              <div key={i} className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-800 font-medium">{item.name}</p>
                  <p className="text-xs text-[#2D5A4E]">{item.location}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
                <button className="text-xs border border-[#2D5A4E] text-[#2D5A4E] px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                  ✓ Mark Done
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Package */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900 text-sm">Package</span>
            <span className="text-xs text-gray-400">1 ready</span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-800 font-medium">Presby Hall</p>
              <p className="text-xs text-gray-400">Front desk</p>
              <p className="text-xs text-[#2D5A4E] font-medium">Arrived yesterday</p>
            </div>
            <button className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full flex-shrink-0 ml-2 font-medium">
              View Picture
            </button>
          </div>
        </div>

        {/* Events */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900 text-sm">Events</span>
            <span className="text-xs text-gray-400">3 this week</span>
          </div>
          <div className="space-y-3">
            {[
              { name: "CS Colloquium — Dr. Lin", location: "DCL 1310", time: "Fri, Apr 18 • 3:00 PM", timeColor: "text-red-500" },
              { name: "iSchool Spring Showcase", location: "iSchool Building", time: "Sat, Apr 19 • 10:00 AM", timeColor: "text-gray-400" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-sm text-gray-800 font-medium">{item.name}</p>
                <p className="text-xs text-gray-400">{item.location}</p>
                <p className={`text-xs font-medium ${item.timeColor}`}>{item.time}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-8 py-3 flex justify-around">
        <Link href="/inbox" className="flex flex-col items-center gap-1">
          <span className="text-gray-400 text-xl">⌂</span>
          <span className="text-xs text-gray-400">Inbox</span>
        </Link>
        <button className="flex flex-col items-center gap-1">
          <span className="text-[#2D5A4E] text-xl">⚙</span>
          <span className="text-xs text-[#2D5A4E] font-medium">Tools</span>
        </button>
        <Link href="/profile" className="flex flex-col items-center gap-1">
          <span className="text-gray-400 text-xl">◯</span>
          <span className="text-xs text-gray-400">Profile</span>
        </Link>
      </div>

    </div>
  )
}