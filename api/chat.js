export default async function handler(req, res) {
  const { messages, systemPrompt } = req.body;
  
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY, // Vercel 설정에서 키를 넣을 거예요
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 1000,
      system: systemPrompt,
      messages: messages,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
