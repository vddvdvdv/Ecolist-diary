import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { CheckIcon, XIcon, ChevronRightIcon, StarIcon } from '../components/icons'

const quizQuestions = [
  {
    id: 1,
    question: 'Hansı məişət əşyası zibilliyə çürüməsi ən çox vaxt aparır?',
    options: ['Plastik şüşə', 'Şüşə banka', 'Alüminium qutu'],
    correct: 1,
    explanation: 'Şüşə bankalar çürümək üçün 1 milyon ilə qədər vaxt tələb edə bilər.'
  },
  {
    id: 2,
    question: 'Bir ton kağızı təkrar emal etmək neçə ağacı qoruyur?',
    options: ['5 ağac', '17 ağac', '50 ağac'],
    correct: 1,
    explanation: 'Bir ton kağızı təkrar emal etmək təxminən 17 ağacı xilas edir.'
  },
  {
    id: 3,
    question: 'Dünyada ən böyük karbon udma mənbəyi hansıdır?',
    options: ['Tropik meşələr', 'Okeanlar', 'Buzlaqlar'],
    correct: 1,
    explanation: 'Okeanlar atmosferdəki CO2-nin təxminən 30%-ni udur.'
  },
]

export default function Quiz() {
  const { updatePoints } = useAuth()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)
  const navigate = useNavigate()

  const question = quizQuestions[currentQuestion]
  const isCorrect = selectedAnswer === question?.correct

  const handleAnswer = (index) => {
    if (isAnswered) return
    setSelectedAnswer(index)
    setIsAnswered(true)
    if (index === question.correct) {
      setScore(score + 15)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setShowResults(true)
      if (!hasCompleted) {
        // Save quiz completion
        const completedQuizzes = JSON.parse(localStorage.getItem('ekolist_completed_quizzes') || '[]')
        completedQuizzes.push({
          date: new Date().toISOString(),
          score,
          totalQuestions: quizQuestions.length,
        })
        localStorage.setItem('ekolist_completed_quizzes', JSON.stringify(completedQuizzes))
        
        // Add points
        updatePoints(score)
        setHasCompleted(true)
      }
    }
  }

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card p-8 text-center">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <StarIcon className="w-12 h-12 text-yellow-accent" filled />
          </div>
          <h1 className="text-3xl font-black text-text-light dark:text-text-dark mb-2">
            Təbriklər!
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
            Viktorinani tamamladın!
          </p>
          <div className="bg-primary/20 rounded-xl p-6 mb-6">
            <p className="text-4xl font-black text-primary">{score}</p>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">bonus xal qazandın</p>
          </div>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-6">
            {quizQuestions.length} sualdan {Math.floor(score / 15)}-ni düzgün cavabladın!
          </p>
          <div className="flex gap-3">
            <button onClick={() => navigate('/home')} className="btn-secondary flex-1">
              Ana Səhifə
            </button>
            <button 
              onClick={() => {
                setCurrentQuestion(0)
                setSelectedAnswer(null)
                setIsAnswered(false)
                setScore(0)
                setShowResults(false)
              }} 
              className="btn-primary flex-1"
            >
              Yenidən Oyna
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-black text-text-light dark:text-text-dark">Həftəlik Eko Viktorina</h1>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-sm text-text-secondary-light dark:text-text-secondary-dark mb-2">
          <span>Sual {currentQuestion + 1}/{quizQuestions.length}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-bar-fill"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="card p-6">
        <p className="text-lg text-text-light dark:text-text-dark text-center mb-6">
          {question.question}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-xl text-left font-medium transition-all border-2 ${
                isAnswered
                  ? index === question.correct
                    ? 'bg-green-500/20 border-green-500 text-green-500'
                    : index === selectedAnswer
                    ? 'bg-red-500/20 border-red-500 text-red-500'
                    : 'bg-card-light dark:bg-card-dark border-transparent opacity-50'
                  : 'bg-card-light dark:bg-card-dark border-transparent hover:border-primary'
              }`}
            >
              <span className="mr-2">{String.fromCharCode(65 + index)})</span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div className={`card p-6 ${isCorrect ? 'bg-primary/20 border-primary/30' : 'bg-red-500/10 border-red-500/20'}`}>
          <div className="flex items-center gap-3 mb-2">
            {isCorrect ? (
              <>
                <StarIcon className="w-8 h-8 text-yellow-accent" filled />
                <p className="text-xl font-bold text-text-light dark:text-text-dark">
                  Düzgün! +15 Bonus Xal
                </p>
              </>
            ) : (
              <>
                <XIcon className="w-8 h-8 text-red-500" />
                <p className="text-xl font-bold text-text-light dark:text-text-dark">
                  Səhv!
                </p>
              </>
            )}
          </div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            {question.explanation}
          </p>
          <button 
            onClick={nextQuestion}
            className={`mt-4 ${isCorrect ? 'btn-primary' : 'btn-secondary'} w-full`}
          >
            {currentQuestion < quizQuestions.length - 1 ? 'Növbəti Sual' : 'Nəticələri Gör'}
            <ChevronRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      )}
    </div>
  )
}

