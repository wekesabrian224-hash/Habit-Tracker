import { useState, useRef, useEffect } from "react";
import "../styles/garden.css";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_MODEL = "gpt-4o-mini";

const SUGGESTIONS = [
  "How do I build a morning routine?",
  "Tips for staying hydrated?",
  "How do I build a reading habit?",
];

function buildSystemPrompt(habits) {
  const habitsContext =
    habits && habits.length > 0
      ? habits
          .map((h) => `- ${h.title} (${h.category}, streak: ${h.streak || 0} days, done today: ${h.completedToday ? "yes" : "no"})`)
          .join("\n")
      : "No habits created yet.";

  return `You are Growth Coach, a warm, encouraging assistant inside a habit-tracking app called Habit Garden, where completing habits grows virtual plants.

User's current habits:
${habitsContext}

Keep replies short (2-4 sentences), calm, supportive, and practical. Occasional plant emoji (🌱🌸🌿) are welcome but don't overdo it.`;
}

export function GrowthCoachView({ habits = [] }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (customText) => {
    const text = (customText ?? input).trim();
    if (!text || loading) return;

    const userMsg = { id: `u-${Date.now()}`, role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    if (!OPENAI_API_KEY) {
      setMessages((prev) => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          role: "assistant",
          content:
            "I'm not connected yet — add VITE_OPENAI_API_KEY to a .env file at your project root and restart the dev server. 🌱",
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: [
            { role: "system", content: buildSystemPrompt(habits) },
            ...nextMessages.slice(-8).map((m) => ({ role: m.role, content: m.content })),
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody?.error?.message || `Request failed (${res.status})`);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || "I'm here whenever you're ready to grow! 🌿";

      setMessages((prev) => [...prev, { id: `c-${Date.now()}`, role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Growth Coach API error:", err);
      setError(err.message || "Something went wrong reaching the coach.");
      setMessages((prev) => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          role: "assistant",
          content: "I had a little hiccup there — mind trying again in a moment? 🌱",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="coach-view">
      <header className="coach-header">
        <div className="coach-avatar">🌿</div>
        <div>
          <h1>Growth Coach</h1>
          <p>Always here to help you grow</p>
        </div>
      </header>

      <div className="coach-messages">
        {messages.length === 0 && (
          <div className="coach-welcome">
            <h2>Hi! I'm your Growth Coach.</h2>
            <p>Ask me about building habits or staying consistent 🌿</p>
            <div className="coach-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`coach-msg coach-msg-${m.role}`}>
            {m.content}
          </div>
        ))}

        {loading && <div className="coach-typing">Coach is thinking…</div>}
        {error && <div className="coach-error">⚠ {error}</div>}
        <div ref={endRef} />
      </div>

      <form
        className="coach-input-bar"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your coach anything…"
        />
        <button type="submit" disabled={!input.trim() || loading}>
          Send
        </button>
      </form>
    </div>
  );
}

export default GrowthCoachView;