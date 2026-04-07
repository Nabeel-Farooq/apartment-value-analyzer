"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, TrendingDown, TrendingUp, Minus } from "lucide-react"

export type Verdict = "overpriced" | "fair" | "undervalued"

interface ResultsCardProps {
  verdict: Verdict
  explanation: string
  insights: string[]
  rent: number
  city: string
  sqft: number
  onReset: () => void
}

const verdictConfig = {
  overpriced: {
    emoji: "😬",
    label: "Overpriced",
    bgClass: "bg-destructive/10",
    textClass: "text-destructive",
    borderClass: "border-destructive/30",
    icon: TrendingUp,
  },
  fair: {
    emoji: "👍",
    label: "Fair Price",
    bgClass: "bg-warning/10",
    textClass: "text-warning-foreground",
    borderClass: "border-warning/30",
    icon: Minus,
  },
  undervalued: {
    emoji: "🎉",
    label: "Great Deal!",
    bgClass: "bg-success/10",
    textClass: "text-success",
    borderClass: "border-success/30",
    icon: TrendingDown,
  },
}

export function ResultsCard({
  verdict,
  explanation,
  insights,
  rent,
  city,
  sqft,
  onReset,
}: ResultsCardProps) {
  const config = verdictConfig[verdict]
  const Icon = config.icon

  return (
    <div className="w-full max-w-lg space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Verdict Card */}
      <Card
        className={`p-8 border-2 ${config.borderClass} ${config.bgClass} rounded-2xl text-center`}
      >
        <div className="space-y-4">
          <span className="text-6xl">{config.emoji}</span>
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Icon className={`h-6 w-6 ${config.textClass}`} />
              <h2
                className={`text-3xl md:text-4xl font-bold ${config.textClass}`}
              >
                {config.label}
              </h2>
            </div>
            <p className="text-muted-foreground text-lg">{explanation}</p>
          </div>
        </div>
      </Card>

      {/* Stats Summary */}
      <Card className="p-6 rounded-2xl bg-card border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">
              ${rent.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Monthly Rent</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{sqft}</p>
            <p className="text-sm text-muted-foreground">Sq Ft</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">
              ${(rent / sqft).toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">Per Sq Ft</p>
          </div>
        </div>
      </Card>

      {/* Comparison Insights */}
      <Card className="p-6 rounded-2xl bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">
          How it compares in {city}
        </h3>
        <ul className="space-y-3">
          {insights.map((insight, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-muted-foreground"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                {i + 1}
              </span>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Try Again Button */}
      <Button
        onClick={onReset}
        variant="outline"
        className="w-full h-14 text-lg font-semibold rounded-xl border-2 hover:bg-secondary transition-all duration-200"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Check Another Apartment
      </Button>
    </div>
  )
}
