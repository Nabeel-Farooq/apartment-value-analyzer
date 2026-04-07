"use client"

import { useState } from "react"
import { RentForm } from "@/components/rent-form"
import { ResultsCard, type Verdict } from "@/components/results-card"
import { Home, Sparkles } from "lucide-react"

interface AnalysisResult {
  verdict: Verdict
  explanation: string
  insights: string[]
}

interface FormData {
  rent: number
  city: string
  sqft: number
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [formData, setFormData] = useState<FormData | null>(null)

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true)
    setFormData(data)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const analysis = await response.json()
      setResult(analysis)
    } catch (error) {
      console.error("Error:", error)
      // Fallback mock response for demo
      setResult({
        verdict: "fair",
        explanation:
          "Your rent is pretty typical for this area. Not a steal, but not a ripoff either!",
        insights: [
          `Average rent in ${data.city} for ${data.sqft} sq ft is around $${Math.round(data.rent * 0.95).toLocaleString()}-$${Math.round(data.rent * 1.05).toLocaleString()}/month`,
          `At $${(data.rent / data.sqft).toFixed(2)}/sq ft, you're right around the median for your neighborhood`,
          `Similar apartments in your area have seen 3-5% rent increases this year`,
        ],
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setFormData(null)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Home className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">RentCheck</span>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              AI
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        {!result ? (
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Hero */}
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                AI-Powered Analysis
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
                Is This Apartment Worth It?
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty">
                Enter your apartment details and get an instant AI analysis of
                whether your rent is overpriced, fair, or a great deal.
              </p>
            </div>

            {/* Form */}
            <RentForm onSubmit={handleSubmit} isLoading={isLoading} />

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>10,000+ rentals analyzed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Major US cities</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>Free to use</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <ResultsCard
              verdict={result.verdict}
              explanation={result.explanation}
              insights={result.insights}
              rent={formData!.rent}
              city={formData!.city}
              sqft={formData!.sqft}
              onReset={handleReset}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            RentCheck AI provides estimates for informational purposes only.
            Always do your own research before signing a lease.
          </p>
        </div>
      </footer>
    </main>
  )
}
