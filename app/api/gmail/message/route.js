export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const authHeader = request.headers.get("authorization")
    const accessToken = authHeader?.replace("Bearer ", "")
  
    if (!accessToken || !id) {
      return Response.json({ error: "Missing params" }, { status: 400 })
    }
  
    try {
      const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      const data = await response.json()
  
      const headers = data.payload?.headers || []
      const subject = headers.find((h) => h.name === "Subject")?.value || "(no subject)"
      const from = headers.find((h) => h.name === "From")?.value || "Unknown"
      const date = headers.find((h) => h.name === "Date")?.value || ""
  
      // 提取邮件正文
      let body = ""
      const getParts = (parts) => {
        if (!parts) return
        for (const part of parts) {
          if (part.mimeType === "text/plain" && part.body?.data) {
            body = Buffer.from(part.body.data, "base64").toString("utf-8")
          } else if (part.parts) {
            getParts(part.parts)
          }
        }
      }
  
      if (data.payload?.body?.data) {
        body = Buffer.from(data.payload.body.data, "base64").toString("utf-8")
      } else {
        getParts(data.payload?.parts)
      }
  
      const senderName = from.includes("<")
        ? from.split("<")[0].trim().replace(/"/g, "")
        : from
  
      return Response.json({ subject, sender: senderName, date, body, snippet: data.snippet })
    } catch (error) {
      console.error(error)
      return Response.json({ error: "Failed to fetch message" }, { status: 500 })
    }
  }