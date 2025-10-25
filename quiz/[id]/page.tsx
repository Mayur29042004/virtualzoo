"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { animalData } from "@/lib/data"

export default function QuizPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const animal = Object.values(animalData)
    .flat()
    .find((a) => a.id === params.id)

  const questions = animal?.quiz || []

  useEffect(() => {
    localStorage.setItem(`quiz-${params.id}`, JSON.stringify({ score, currentQuestion }))
  }, [score, currentQuestion, params.id])

  if (!animal) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-emerald-900 mb-4">Quiz not found</h1>
          <Link href="/habitats">
            <Button>Back to Habitats</Button>
          </Link>
        </div>
      </main>
    )
  }

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    if (answerIndex === questions[currentQuestion].answer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setShowResult(true)
      localStorage.setItem(`quiz-${params.id}-score`, JSON.stringify(score))
    }
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50 flex items-center justify-center px-4">
        <Card className="p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4">Quiz Complete!</h1>
          <div className="text-6xl font-bold text-emerald-600 mb-4">
            {score}/{questions.length}
          </div>
          <p className="text-2xl text-emerald-800 mb-6">
            {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good Job!" : "Keep Learning!"}
          </p>
          <p className="text-emerald-700 mb-8">
            You scored {percentage}% on the {animal.name} quiz.
          </p>
          <div className="space-y-3">
            <Link href={`/animal-info/${animal.id}`} className="block">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Learn More</Button>
            </Link>
            <Link href="/habitats" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                Back to Habitats
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    )
  }

  const question = questions[currentQuestion]

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href={`/animal-info/${animal.id}`}>
          <Button variant="outline" className="mb-6 bg-transparent">
            ← Back
          </Button>
        </Link>

        <Card className="p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold text-emerald-900">{animal.name} Quiz</h1>
              <span className="text-emerald-700 font-semibold">
                Question {currentQuestion + 1}/{questions.length}
              </span>
            </div>
            <div className="w-full bg-emerald-200 rounded-full h-2">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-emerald-900 mb-6">{question.q}</h2>

          <div className="space-y-3 mb-8">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === null
                    ? "border-emerald-300 hover:border-emerald-600 hover:bg-emerald-50"
                    : selectedAnswer === idx
                      ? idx === question.answer
                        ? "border-green-600 bg-green-50"
                        : "border-red-600 bg-red-50"
                      : idx === question.answer
                        ? "border-green-600 bg-green-50"
                        : "border-emerald-300"
                }
                ${selectedAnswer !== null ? "cursor-default" : "cursor-pointer"}
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === null
                        ? "border-emerald-400"
                        : selectedAnswer === idx
                          ? idx === question.answer
                            ? "border-green-600 bg-green-600"
                            : "border-red-600 bg-red-600"
                          : idx === question.answer
                            ? "border-green-600 bg-green-600"
                            : "border-emerald-300"
                    }`}
                  >
                    {selectedAnswer !== null && (
                      <span className="text-white text-sm">
                        {selectedAnswer === idx && idx === question.answer && "✓"}
                        {selectedAnswer === idx && idx !== question.answer && "✗"}
                        {selectedAnswer !== idx && idx === question.answer && "✓"}
                      </span>
                    )}
                  </div>
                  <span className="text-emerald-900">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {selectedAnswer !== null && (
            <Button onClick={handleNext} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              {currentQuestion === questions.length - 1 ? "See Results" : "Next Question"}
            </Button>
          )}
        </Card>
      </div>
    </main>
  )
}
