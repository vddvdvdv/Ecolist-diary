// Mock responses for chatbot when API is unavailable
export const mockResponses = {
  // Greetings
  greetings: [
    'Salam! Mən Ekolist Diary AI köməkçisiyəm. Sizə necə kömək edə bilərəm? 🌱',
    'Salam! Ekolist Diary-də xoş gəlmisiniz! Sualınız nədir?',
    'Salam! Ekoloji fəaliyyətlərinizdə sizə kömək etməkdən məmnunam!',
  ],
  
  // Common questions and answers
  faq: {
    'xal necə qazanılır': 'Xal qazanmaq üçün:\n• Gündəlik qeyd yazın (+10-50 xal)\n• Missiyaları tamamlayın (+20-100 xal)\n• Streak davam etdirin (+25+ xal)\n• Viktorina həll edin (+15 xal)\n• Dostları dəvət edin (+50 xal)',
    'missiya': 'Missiyalar ekoloji fəaliyyətləri təşviq etmək üçündür. Missiyalar səhifəsindən mövcud missiyaları görə bilərsiniz. Hər missiyanı tamamladıqda xal və badge qazanırsınız.',
    'eko-pet': 'Eko-Pet virtual pet sistemidir. Xal qazandıqca pet-iniz böyüyür və inkişaf edir. Pet-ə su verə, enerjiləndirə və təmizləyə bilərsiniz.',
    'leaderboard': 'Leaderboard-da ən yaxşı performans göstərən istifadəçiləri görə bilərsiniz. Xal toplayaraq yüksək yerlərə çıxa bilərsiniz.',
    'gündəlik': 'Gündəlik səhifəsində ekoloji fəaliyyətlərinizi qeyd edə bilərsiniz. Hər qeyd üçün xal qazanırsınız və təsirinizi izləyə bilərsiniz.',
    'xəritə': 'Xəritə səhifəsində yaxınlıqdakı parklar, təkrar emal məntəqələri və digər ekoloji yerləri görə bilərsiniz.',
    'achievements': 'Achievements səhifəsində qazandığınız badge-ləri və sertifikatları görə bilərsiniz.',
    'profil': 'Profil səhifəsində məlumatlarınızı redaktə edə, dil və tema seçimləri edə bilərsiniz.',
  },
  
  // Helpful responses
  help: [
    'Mən sizə platforma haqqında məlumat verə, suallarınıza cavab verə və ekoloji fəaliyyətlərə təşviq edə bilərəm.',
    'Platformada gündəlik qeyd yaza, missiyalar tamamlayaraq xal qazana, Eko-Pet-inizə qulluq edə və leaderboard-da yüksək yerlərə çıxa bilərsiniz.',
    'Ekoloji fəaliyyətlərinizi qeyd edərək planetimizə müsbət təsir göstərə bilərsiniz. Hər fəaliyyət xal qazandırır və sizə yeni imkanlar açır.',
  ],
  
  // Encouragement
  encouragement: [
    'Əla iş görürsünüz! Ekoloji fəaliyyətləriniz planetimiz üçün çox vacibdir. 🌍',
    'Davam edin! Hər kiçik addım böyük fərq yaradır. 🌱',
    'Sizin kimi istifadəçilər sayəsində planetimiz daha yaşıl olur. Təşəkkürlər! 💚',
  ],
}

// Smart response generator based on user input
export function generateMockResponse(userMessage, userData = {}) {
  const message = userMessage.toLowerCase().trim()
  
  // Check for greetings
  if (message.match(/salam|hello|hi|merhaba|привет/)) {
    return mockResponses.greetings[Math.floor(Math.random() * mockResponses.greetings.length)]
  }
  
  // Check for FAQ keywords
  for (const [keyword, answer] of Object.entries(mockResponses.faq)) {
    if (message.includes(keyword)) {
      return answer
    }
  }
  
  // Check for help requests
  if (message.match(/kömək|yardım|help|помощь|yardım/)) {
    return mockResponses.help[Math.floor(Math.random() * mockResponses.help.length)]
  }
  
  // Check for encouragement requests
  if (message.match(/təşəkkür|thanks|thank|спасибо|teşekkür/)) {
    return mockResponses.encouragement[Math.floor(Math.random() * mockResponses.encouragement.length)]
  }
  
  // Check for user stats queries
  if (message.match(/xal|points|puan|очки|баллы/)) {
    const points = userData.points || 0
    const level = userData.level || 1
    return `Sizin cari xalınız: ${points} xal\nSəviyyəniz: Level ${level}\n\nXal qazanmaq üçün:\n• Gündəlik qeyd yazın\n• Missiyaları tamamlayın\n• Streak davam etdirin`
  }
  
  // Check for mission queries
  if (message.match(/missiya|mission|görev|миссия/)) {
    return 'Missiyalar səhifəsindən mövcud missiyaları görə bilərsiniz. Hər missiyanı tamamladıqda xal və badge qazanırsınız. Missiyaları tamamlamaq üçün sübut (foto/video) yükləməlisiniz.'
  }
  
  // Check for diary queries
  if (message.match(/gündəlik|diary|günlük|дневник/)) {
    return 'Gündəlik səhifəsində ekoloji fəaliyyətlərinizi qeyd edə bilərsiniz. Hər qeyd üçün 10-50 xal qazanırsınız. Qeydlərinizə şəkil əlavə edə bilərsiniz.'
  }
  
  // Default response
  const defaultResponses = [
    'Bağışlayın, sualınızı tam başa düşə bilmədim. Zəhmət olmasa daha ətraflı izah edin.',
    'Bu sual üçün daha çox məlumat lazımdır. Platforma haqqında suallarınız varsa, mənə soruşa bilərsiniz.',
    'Sualınızı başa düşmədim. Xal sistemi, missiyalar, Eko-Pet və ya digər funksiyalar haqqında soruşa bilərsiniz.',
  ]
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

// Get user statistics from database
export async function getUserStats(userId) {
  try {
    // Try to get from localStorage first
    const userStr = localStorage.getItem('ekolist_user')
    if (userStr) {
      const user = JSON.parse(userStr)
      return {
        points: user.points || 0,
        level: user.level || 1,
        streak: user.streak || 0,
      }
    }
    
    // Try to get from IndexedDB if available
    if (typeof window !== 'undefined' && window.indexedDB) {
      const db = await new Promise((resolve, reject) => {
        const request = indexedDB.open('EkolistDiaryDB', 1)
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })
      
      if (db) {
        const transaction = db.transaction(['users'], 'readonly')
        const store = transaction.objectStore('users')
        const request = store.get(userId)
        
        return new Promise((resolve) => {
          request.onsuccess = () => {
            const user = request.result
            resolve({
              points: user?.points || 0,
              level: user?.level || 1,
              streak: user?.streak || 0,
            })
          }
          request.onerror = () => resolve({ points: 0, level: 1, streak: 0 })
        })
      }
    }
    
    return { points: 0, level: 1, streak: 0 }
  } catch (error) {
    console.error('Error getting user stats:', error)
    return { points: 0, level: 1, streak: 0 }
  }
}

