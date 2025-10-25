"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { animalData } from "@/lib/data"

export default function AnimalsPage() {
  const searchParams = useSearchParams()
  const habitatId = searchParams.get("habitat") || localStorage.getItem("selectedHabitat") || "forest"

  const animals = animalData[habitatId as keyof typeof animalData] || []

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/habitats">
          <Button variant="outline" className="mb-6 bg-transparent">
            ← Back to Habitats
          </Button>
        </Link>

        <h1 className="text-4xl font-bold text-emerald-900 mb-2 text-center capitalize">{habitatId} Animals</h1>
        <p className="text-center text-emerald-700 mb-12 text-lg">Click on any animal to learn more and view in 3D</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <Card key={animal.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-emerald-100 to-blue-100 overflow-hidden">
                <img
                  src={animal.image || "/placeholder.svg"}
                  alt={animal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-emerald-900 mb-2">{animal.name}</h2>
                <p className="text-sm text-emerald-700 mb-4">{animal.species}</p>
                <Link href={`/animal-info/${animal.id}`}>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Learn More</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
