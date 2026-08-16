import Link from "next/link"

export default function Inbox() {
  const emails = [
    {
      id: 1,
      sender: "Prof. Martinez",
      subject: "HW3 Due Friday — Final Reminder",
      time: "10:23 AM",
      tag: "Assignment",
      tagColor: "bg-yellow-100 text-yellow-700",
      due: "Due Fri",
      dueColor: "text-orange-500",
      read: false,
    },
    {
      id: 2,
      sender: "UIUC Housing",
      subject: "Package Ready for Pickup — Lot G",
      time: "9:41 AM",
      tag: "Package",
      tagColor: "bg-blue-100 text-blue-700",
      due: "Ready now",
      dueColor: "text-green-500",
      read: false,
    },
    {
      id: 3,
      sender: "Financial Aid",
      subject: "Your Aid Disbursement Has Been Processed",
      time: "8:54 AM",
      tag: "Notification",
      tagColor: "bg-gray-100 text-gray-600",
      due: null,
      read: false,
    },
    {
      id: 4,
      sender: "IS 202 Instructor",
      subject: "Reflection Paper #4 — Guidelines Updated",
      time: "10:23 AM",
      tag: "Assignment",
      tagColor: "bg-yellow-100 text-yellow-700",
      due: "Due May 5",
      dueColor: "text-orange-500",
      read: true,
    },
    {
      id: 5,
      sender: "Cory (iSchool)",
      subject: "Your Advising Appointment Confirmed — Apr 16",
      time: "10:23 AM",
      tag: "Appointment",
      tagColor: "bg-purple-100 text-purple-700",
      due: null,
      read: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-4 pt-6 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">5 unread</span>
          </div>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2D5A4E] text-white flex items-center justify-center text-sm font-medium">C</div>
            <div className="w-8 h-8 rounded-full bg-teal-400 text-white flex items-center justify-center text-sm font-medium">C</div>
            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-lg">+</div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-400">
          Search emails...
        </div>
      </div>

      <div className="px-4 py-3 pb-24">
        <p className="text-xs text-gray-400 font-medium mb-2 mt-1">Today</p>

        {emails.slice(0, 3).map((email) => (
          <Link href="/email" key={email.id} className="block bg-white rounded-2xl p-4 mb-2 shadow-sm">
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2">
                {!email.read && <div className="w-2 h-2 rounded-full bg-[#2D5A4E]"></div>}
                <span className="font-semibold text-gray-900 text-sm">{email.sender}</span>
              </div>
              <span className="text-xs text-gray-400">{email.time}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2 ml-4">{email.subject}</p>
            <div className="flex items-center justify-between ml-4">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${email.tagColor}`}>
                {email.tag}
              </span>
              {email.due && (
                <span className={`text-xs font-medium ${email.dueColor}`}>{email.due}</span>
              )}
            </div>
          </Link>
        ))}

        <p className="text-xs text-gray-400 font-medium mb-2 mt-3">Yesterday</p>

        {emails.slice(3).map((email) => (
          <Link href="/email" key={email.id} className="block bg-white rounded-2xl p-4 mb-2 shadow-sm opacity-75">
            <div className="flex justify-between items-start mb-1">
              <span className="font-semibold text-gray-900 text-sm">{email.sender}</span>
              <span className="text-xs text-gray-400">{email.time}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{email.subject}</p>
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${email.tagColor}`}>
                {email.tag}
              </span>
              {email.due && (
                <span className={`text-xs font-medium ${email.dueColor}`}>{email.due}</span>
              )}
            </div>
          </Link>
        ))}
      </div>

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