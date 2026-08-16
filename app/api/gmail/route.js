export async function GET(request) {
    const authHeader = request.headers.get("authorization")
    const accessToken = authHeader?.replace("Bearer ", "")
  
    if (!accessToken) {
      return Response.json({ error: "No access token" }, { status: 401 })
    }
  
    try {
      // 获取邮件列表（最近10封）
      const listResponse = await fetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10&q=is:inbox",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
  
      const listData = await listResponse.json()
  
      if (!listData.messages) {
        return Response.json({ emails: [] })
      }
  
      // 获取每封邮件的详情
      const emails = await Promise.all(
        listData.messages.map(async (msg) => {
          const msgResponse = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          const msgData = await msgResponse.json()
  
          const headers = msgData.payload?.headers || []
          const subject = headers.find((h) => h.name === "Subject")?.value || "(no subject)"
          const from = headers.find((h) => h.name === "From")?.value || "Unknown"
          const date = headers.find((h) => h.name === "Date")?.value || ""
  
          // 提取发件人名字
          const senderName = from.includes("<")
            ? from.split("<")[0].trim().replace(/"/g, "")
            : from
  
          return {
            id: msg.id,
            subject,
            sender: senderName,
            date,
            snippet: msgData.snippet || "",
          }
        })
      )
  
      return Response.json({ emails })
    } catch (error) {
      console.error(error)
      return Response.json({ error: "Failed to fetch emails" }, { status: 500 })
    }
  }