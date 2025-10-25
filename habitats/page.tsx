"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const habitats = [
  {
    id: "forest",
    name: "Forest",
    description: "Dense woodlands and tropical rainforests",
    color: "from-green-600 to-emerald-700",
    image: "/dense-forest-habitat-with-trees.jpg",
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Deep seas and coral reefs",
    color: "from-blue-600 to-cyan-700",
    image: "/ocean-underwater-coral-reef.jpg",
  },
  {
    id: "desert",
    name: "Desert",
    description: "Arid landscapes and sand dunes",
    color: "from-amber-600 to-orange-700",
    image: "/desert-sand-dunes-landscape.jpg",
  },
  {
    id: "arctic",
    name: "Arctic",
    description: "Frozen tundra and ice fields",
    color: "from-blue-300 to-cyan-400",
    image: "/arctic-ice-snow-landscape.jpg",
  },
]

export default function HabitatsPage() {
  const handleHabitatSelect = (habitatId: string) => {
    localStorage.setItem("selectedHabitat", habitatId)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-emerald-900 mb-4 text-center">Select a Habitat</h1>
        <p className="text-center text-emerald-700 mb-12 text-lg">
          Choose a habitat to discover the amazing animals that live there
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {habitats.map((habitat) => (
            <Card key={habitat.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`bg-gradient-to-br ${habitat.color} h-48 relative overflow-hidden`}>
                <img
                  src={habitat.image || "/placeholder.svg"}
                  alt={habitat.name}
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-emerald-900 mb-2">{habitat.name}</h2>
                <p className="text-emerald-700 mb-4">{habitat.description}</p>
                <Link href={`/animals?habitat=${habitat.id}`}>
                  <Button
                    onClick={() => handleHabitatSelect(habitat.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Explore
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
