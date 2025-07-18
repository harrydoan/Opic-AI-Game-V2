const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;
// MODEL mặc định không còn dùng ở đây, sẽ truyền từ component
// const MODEL = 'openai/gpt-4o-mini';

export const callOpenRouterAPI = async (prompt, model) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model || 'openchat/openchat-3.5',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenRouter API:", error);
    return "Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau.";
  }
};