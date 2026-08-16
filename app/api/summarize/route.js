import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request) {
  try {
    const { emailContent } = await request.json()

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are an AI assistant helping university students organize their emails.

Analyze the email below and respond with ONLY a JSON object, no other text, no markdown, no backticks.

Email:
${emailContent}

Respond with exactly this format:
{"summary": "one sentence summary", "dueDate": "due date or null", "actionItems": ["action 1", "action 2"]}`,
        },
      ],
    })

    const text = message.content[0].text.trim()
    
    // 提取 JSON，防止 Claude 加了多余文字
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return Response.json({ 
        summary: "Failed to parse summary", 
        dueDate: null, 
        actionItems: [] 
      })
    }
    
    const parsed = JSON.parse(jsonMatch[0])
    return Response.json(parsed)

  } catch (error) {
    console.error(error)
    return Response.json({ 
      summary: "Error generating summary", 
      dueDate: null, 
      actionItems: [] 
    }, { status: 500 })
  }
}