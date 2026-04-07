"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowRight, Building2, MapPin, Maximize2 } from "lucide-react"

const CITIES = [
  "New York City",
  "San Francisco",
  "Los Angeles",
  "Seattle",
  "Boston",
  "Chicago",
  "Miami",
  "Austin",
  "Denver",
  "Washington D.C.",
]

interface RentFormProps {
  onSubmit: (data: { rent: number; city: string; sqft: number }) => void
  isLoading: boolean
}

export function RentForm({ onSubmit, isLoading }: RentFormProps) {
  const [rent, setRent] = useState("")
  const [city, setCity] = useState("")
  const [sqft, setSqft] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rent && city && sqft) {
      onSubmit({
        rent: parseFloat(rent),
        city,
        sqft: parseFloat(sqft),
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <Label htmlFor="rent" className="text-sm font-medium text-foreground">
          Monthly Rent
        </Label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            $
          </span>
          <Input
            id="rent"
            type="number"
            placeholder="2,500"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            className="pl-8 h-14 text-lg bg-card border-border rounded-xl"
            required
          />
          <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city" className="text-sm font-medium text-foreground">
          City
        </Label>
        <div className="relative">
          <Select value={city} onValueChange={setCity} required>
            <SelectTrigger className="h-14 text-lg bg-card border-border rounded-xl">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {CITIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <MapPin className="absolute right-10 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sqft" className="text-sm font-medium text-foreground">
          Square Footage
        </Label>
        <div className="relative">
          <Input
            id="sqft"
            type="number"
            placeholder="750"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            className="h-14 text-lg bg-card border-border rounded-xl pr-16"
            required
          />
          <span className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            sq ft
          </span>
          <Maximize2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !rent || !city || !sqft}
        className="w-full h-14 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-pulse">Analyzing...</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Check My Rent
            <ArrowRight className="h-5 w-5" />
          </span>
        )}
      </Button>
    </form>
  )
}
