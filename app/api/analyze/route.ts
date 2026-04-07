import { generateObject } from "ai"
import { gateway } from "@ai-sdk/gateway"
import { z } from "zod"

const analysisSchema = z.object({
  verdict: z.enum(["overpriced", "fair", "undervalued"]),
  explanation: z.string(),
  insights: z.array(z.string()).length(3),
})

export async function POST(req: Request) {
  try {
    const { rent, city, sqft } = await req.json()

    const pricePerSqft = rent / sqft

    const { object } = await generateObject({
      model: gateway("openai/gpt-4o-mini"),
      schema: analysisSchema,
      prompt: `You are a helpful real estate AI assistant. Analyze this rental apartment:

Monthly Rent: $${rent}
City: ${city}
Square Footage: ${sqft} sq ft
Price per sq ft: $${pricePerSqft.toFixed(2)}/sq ft

Based on typical rental markets in ${city}, determine if this rental is:
- "overpriced" - significantly above market rate
- "fair" - within reasonable market range  
- "undervalued" - below market rate, a good deal

Provide:
1. A verdict (overpriced, fair, or undervalued)
2. A brief, friendly explanation (1-2 sentences, casual tone)
3. Exactly 3 comparison insights that help the renter understand how this compares to the local market

Be helpful and conversational. Use numbers and percentages where relevant.`,
    })

    return Response.json(object)
  } catch (error) {
    console.error("Analysis error:", error)
    return Response.json(
      { error: "Failed to analyze rental" },
      { status: 500 }
    )
  }
}
