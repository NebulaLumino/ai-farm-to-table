import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
export async function POST(req: NextRequest) {
  try {
    const { location, cuisine, focus } = await req.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: "https://api.deepseek.com/v1" });
    const prompt = `Map a detailed farm-to-table supply chain for a ${cuisine !== "Any" ? cuisine + " " : ""}restaurant in ${location || "your area"}. Focus: ${focus}.\n\nInclude:\n1. **Local Producers by Category** - Specific types of farms/producers for produce, proteins, dairy, grains, specialty items (name the types, e.g. "grass-fed beef ranches", "organic vegetable farms", "artisanal cheese makers")\n2. **Seasonal Availability Calendar** - When each product category is freshest locally (spring/summer/fall/winter)\n3. **Distance & Logistics** - Typical sourcing distances, delivery frequency, cold chain considerations\n4. **Certifications to Look For** - Organic, non-GMO, GAP-certified, animal welfare ratings\n5. **Estimated Cost Impact** - Price premium for local vs. conventional sourcing (percentage)\n6. **Sustainability Benefits** - Carbon footprint reduction, food miles, land use\n7. **How to Build Relationships** - Questions to ask, farm visits, CSA programs\n8. **Menu Planning by Season** - Sample seasonal menu highlights\n\nFormat with markdown headers and tables.`;
    const completion = await openai.chat.completions.create({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], max_tokens: 1800, temperature: 0.7 });
    return NextResponse.json({ output: completion.choices[0]?.message?.content || "No map generated." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Generation failed" }, { status: 500 });
  }
}
