"use server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { location, cuisineType, seasonalWindow, budgetTier, certificationReqs, distanceRadius, menuStyle } = await req.json();
    const openai = new OpenAI({ baseURL: "https://api.deepseek.com/v1", apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are an expert in farm-to-table sourcing, sustainable agriculture, local food systems, and restaurant supply chain management. Provide detailed, actionable reports." },
        { role: "user", content: `Generate a comprehensive farm-to-table sourcing plan for a restaurant.

**Restaurant Details:**
- Location: ${location}
- Cuisine Type: ${cuisineType}
- Seasonal Window: ${seasonalWindow}
- Budget Tier: ${budgetTier}
- Certification Requirements: ${certificationReqs || "None specified"}
- Distance Radius: ${distanceRadius}
- Menu Style: ${menuStyle}

Generate a detailed report covering ALL of the following sections:

## 1. Local Supplier Recommendations
List specific categories of local suppliers to source (produce, proteins, dairy, artisanal goods) with notes on what to look for in each category.

## 2. Seasonal Availability Calendar
Month-by-month availability guide for key ingredients in ${location || "your region"}, noting what's in season and when to expect peak quality and best pricing.

## 3. Certification Checklist
Required and recommended certifications for farm-to-table sourcing (e.g., USDA Organic, GAP, Grass-Fed, Animal Welfare Approved).

## 4. Farm Visit Checklist
What to evaluate and ask when visiting potential farm suppliers — soil practices, animal welfare, food safety, delivery reliability, insurance.

## 5. Menu Integration Plan
How to design or adapt the menu around seasonal local sourcing — concept menus, how many local items to feature, pricing strategy for local premiums.

## 6. Cost Comparison Table
Compare local vs. conventional sourcing costs for common ingredients, with ROI analysis for premium local sourcing.

Format as clean markdown with clear headers, tables, and actionable checklists.` },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });
    return NextResponse.json({ output: completion.choices[0].message.content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
