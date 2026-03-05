export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { messages, systemPrompt } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // API 키 문제나 잔액 부족 시 상세 에러 반환
      return res.status(response.status).json({ 
        error: data.error?.message || "AI 서버 응답 에러",
        type: data.error?.type 
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "서버 연결 실패: " + error.message });
  }
}
