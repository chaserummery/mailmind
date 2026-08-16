import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request) {
  try {
    const { emails } = await request.json()

    const emailsText = emails
      .map((e, i) => `Email ${i + 1} from ${e.sender}:\nSubject: ${e.subject}\n${e.snippet}`)
      .join("\n\n---\n\n")

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are an AI assistant helping a university student manage their inbox.

Analyze these emails and extract ONLY the action items that require the student to do something. Ignore promotions, newsletters, and FYI emails.

Emails:
${emailsText}

Respond with ONLY a JSON array, no other text:
[
  {
    "task": "what to do",
    "from": "who sent it",
    "due": "deadline if mentioned, otherwise null",
    "priority": "high/medium/low"
  }
]

If there are no action items, return an empty array: []`,
        },
      ],
    })

    const text = message.content[0].text.trim()
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) return Response.json([])

    const todos = JSON.parse(jsonMatch[0])
    return Response.json(todos)
  } catch (error) {
    console.error(error)
    return Response.json([])
  }
}