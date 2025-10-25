"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { animalData } from "@/lib/data"

export default function AnimalInfoPage({ params }: { params: { id: string } }) {
  const [showHologram, setShowHologram] = useState(false)

  const animal = Object.values(animalData)
    .flat()
    .find((a) => a.id === params.id)

  if (!animal) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-emerald-900 mb-4">Animal not found</h1>
          <Link href="/habitats">
            <Button>Back to Habitats</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/habitats">
          <Button variant="outline" className="mb-6 bg-transparent">
            ← Back to Habitats
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Info */}
          <div>
            <h1 className="text-4xl font-bold text-emerald-900 mb-2">{animal.name}</h1>
            <p className="text-lg text-emerald-700 mb-6">{animal.species}</p>

            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold text-emerald-900 mb-4">About</h2>
              <p className="text-emerald-800 mb-4">{animal.description}</p>

              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-emerald-900">Diet:</p>
                  <p className="text-emerald-800">{animal.diet}</p>
                </div>
                <div>
                  <p className="font-semibold text-emerald-900">Habitat:</p>
                  <p className="text-emerald-800">{animal.habitat}</p>
                </div>
                <div>
                  <p className="font-semibold text-emerald-900">Conservation Status:</p>
                  <p className="text-emerald-800">{animal.conservationStatus}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold text-emerald-900 mb-4">Fun Facts</h2>
              <ul className="space-y-2">
                {animal.funFacts.map((fact, idx) => (
                  <li key={idx} className="text-emerald-800 flex gap-2">
                    <span className="text-emerald-600">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Right Column - Hologram Viewer */}
          <div>
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-bold text-emerald-900 mb-4">3D Hologram Viewer</h2>

              {showHologram ? (
                <div className="bg-black rounded-lg overflow-hidden mb-4">
                  <div className="aspect-video bg-black flex items-center justify-center relative">
                    <video src={animal.videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-emerald-100 to-blue-100 rounded-lg aspect-video flex items-center justify-center mb-4">
                  <img
                    src={animal.image || "/placeholder.svg"}
                    alt={animal.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}

              <Button
                onClick={() => setShowHologram(!showHologram)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mb-4"
              >
                {showHologram ? "Hide Hologram" : "View in 3D (Hologram)"}
              </Button>

              <Link href={`/quiz/${animal.id}`} className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Take Quiz</Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
