'use client'
import React, { useEffect, useRef, useState } from 'react'
import Message from '../components/Message'
import './globals.css'

export default function Page() {
  const [messages, setMessages] = useState([]) // {role, text}
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    // auto-scroll to bottom when messages change
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, loading])

  async function sendMessage() {
    if (!text.trim() || loading) return
    const userMsg = { role: 'user', text: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setText('')
    setLoading(true)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text })
      })

      const json = await res.json()
      // prefer `reply`, fallback to error string
      const botText = json?.reply ?? (json?.error ? `Error: ${json.error}` : 'No response')
      setMessages(prev => [...prev, { role: 'bot', text: botText }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Network error: ' + err.message }])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <main className="app-root">
      <header className="app-header">
        <div className="brand">
          <div className="logo">🤖</div>
          <div>
            <h1>Gemini Chat</h1>
            <p className="subtitle">Small demo using Google Gemini (server-side)</p>
          </div>
        </div>
      </header>

      <section className="chat-area">
        <div className="messages" ref={listRef}>
          {messages.length === 0 && !loading && (
            <div className="welcome">Say hi — ask anything.</div>
          )}
          {messages.map((m, i) => <Message key={i} role={m.role} text={m.text} />)}

          {loading && (
            <div className="msg bot typing">
              <div className="bubble">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}
        </div>

        <form className="composer" onSubmit={(e) => { e.preventDefault(); sendMessage() }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a message and press Enter to send..."
            rows={1}
            className="inputbox"
            disabled={loading}
          />
          <button type="submit" className="send" disabled={loading || !text.trim()}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </section>

      <footer className="app-footer">
        <small>Gemini Chat</small>
      </footer>
    </main>
  )
}
