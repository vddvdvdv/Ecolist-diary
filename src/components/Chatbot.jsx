import { useState, useRef, useEffect } from 'react'
import { MessageCircleIcon, XIcon, SendIcon } from '../components/icons'
import { useAuth } from '../context/AuthContext'
import { generateMockResponse, getUserStats } from '../utils/chatbotMockData'

const GEMINI_API_KEY = 'AIzaSyDTReqRoIrj1D37KNUkTc6lxTZ3KVGMzdI'
// Try gemini-1.5-flash first, fallback to gemini-pro if needed
const GEMINI_API_URLS = [
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`
]

const systemPrompt = `Sən Ekolist Diary platformasının AI köməkçisisən. Platforma ekoloji gündəlik, missiyalar, eko-pet, xal sistemi, leaderboard və digər ekoloji fəaliyyətlər üçündür. 

Platforma haqqında məlumat:
- İstifadəçilər gündəlik ekoloji fəaliyyətlərini qeyd edirlər
- Hər fəaliyyət üçün xal qazanırlar
- Missiyalar tamamlayaraq bonus xal qazana bilərlər
- Eko-Pet virtual pet sistemidir
- Leaderboard-da ən yaxşı istifadəçilər görünür
- Xəritədə yaxınlıqdakı eko-yerlər göstərilir
- Sertifikat generatoru var
- Achievements və badge sistemi var

İstifadəçilərə platforma haqqında məlumat ver, suallarına cavab ver və ekoloji fəaliyyətlərə təşviq et. Cavablarını qısa, dəqiq və Azərbaycan dilində ver.`

export default function Chatbot() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Salam! Mən Ekolist Diary AI köməkçisiyəm. Sizə necə kömək edə bilərəm? 🌱',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [useMockData, setUseMockData] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Build conversation history
      const conversationHistory = messages
        .slice(-5) // Son 5 mesajı götür
        .map(msg => `${msg.role === 'user' ? 'İstifadəçi' : 'Köməkçi'}: ${msg.content}`)
        .join('\n')

      const prompt = `${systemPrompt}\n\n${conversationHistory}\n\nİstifadəçi: ${userMessage.content}\n\nKöməkçi:`

      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }

      // Try different API endpoints
      let lastError = null
      let response = null
      let data = null

      for (const apiUrl of GEMINI_API_URLS) {
        try {
          response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
          })

          if (response.ok) {
            data = await response.json()
            break // Success, exit loop
          } else {
            const errorData = await response.json().catch(() => ({}))
            lastError = { status: response.status, data: errorData }
            // If 404, try next URL
            if (response.status === 404) {
              continue
            }
            // For other errors, throw immediately
            throw new Error(`API xətası: ${response.status} - ${errorData?.error?.message || 'Naməlum xəta'}`)
          }
        } catch (fetchError) {
          lastError = fetchError
          // If it's a network error, don't try other URLs
          if (fetchError.message.includes('Failed to fetch') || fetchError.message.includes('NetworkError')) {
            throw fetchError
          }
          // For 404, continue to next URL
          continue
        }
      }

      // If we tried all URLs and still no success, use mock data
      if (!data) {
        console.log('API unavailable, using mock data')
        setUseMockData(true)
        
        // Get user stats for personalized response
        const userStats = await getUserStats(user?.id || 'default')
        
        // Generate mock response
        const mockResponse = generateMockResponse(userMessage.content, {
          points: user?.points || userStats.points,
          level: user?.level || userStats.level,
          streak: user?.streak || userStats.streak,
        })
        
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: mockResponse,
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, assistantMessage])
        return
      }

      // Handle different response structures
      let responseText = ''
      if (data.candidates && data.candidates.length > 0) {
        responseText = data.candidates[0]?.content?.parts?.[0]?.text || ''
      } else if (data.text) {
        responseText = data.text
      }
      
      if (!responseText) {
        responseText = 'Bağışlayın, cavab ala bilmədim. Zəhmət olmasa yenidən cəhd edin.'
      }

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: responseText.trim(),
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chatbot error:', error)
      
      // On error, use mock data
      setUseMockData(true)
      
      // Get user stats for personalized response
      const userStats = await getUserStats(user?.id || 'default')
      
      // Generate mock response
      const mockResponse = generateMockResponse(userMessage.content, {
        points: user?.points || userStats.points,
        level: user?.level || userStats.level,
        streak: user?.streak || userStats.streak,
      })
      
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: mockResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: 'Salam! Mən Ekolist Diary AI köməkçisiyəm. Sizə necə kömək edə bilərəm? 🌱',
        timestamp: new Date()
      }
    ])
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-primary rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all z-50 flex items-center justify-center group"
          title="Chatbot"
          aria-label="Chatbot aç"
        >
          <MessageCircleIcon className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-8rem)] sm:h-[600px] max-h-[600px] bg-card-light dark:bg-card-dark rounded-xl shadow-2xl border border-border-light dark:border-border-dark flex flex-col z-50 animate-slideUp">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark bg-primary/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <MessageCircleIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-text-light dark:text-text-dark">Ekolist AI Köməkçi</h3>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Onlayn</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="p-2 hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors"
                title="Söhbəti təmizlə"
              >
                <svg className="w-4 h-4 text-text-secondary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors"
                title="Bağla"
              >
                <XIcon className="w-5 h-5 text-text-secondary-light" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border border-border-light dark:border-border-dark'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-background-light dark:bg-background-dark rounded-lg p-3 border border-border-light dark:border-border-dark">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border-light dark:border-border-dark">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Mesaj yazın..."
                disabled={isLoading}
                className="flex-1 input-field text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SendIcon className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-2 text-center">
              {useMockData ? 'Mock data ilə işləyir' : 'AI tərəfindən gücləndirilmişdir'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

