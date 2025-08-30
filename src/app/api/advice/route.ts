import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { summary } = body || {};

    if (openai) {
      const prompt = `Based on this financial summary: "${summary || 'No summary provided'}". Provide one concise financial advice suggestion for improving savings, reducing debt, or optimizing investments. Keep it under 100 words.`;
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100,
      });
      const recommendation = response.choices[0]?.message?.content?.trim() || "No advice available.";
      return NextResponse.json({ recommendation, basedOn: summary ?? null });
    } else {
      // Fallback to mock
      const suggestions = [
        "Pay an extra $200 on your credit card to save $1,000 in interest.",
        "You could save $50/month by switching car insurance.",
        "Shift 10% from cash to bonds for safer alignment with your goals.",
      ];
      const pick = suggestions[Math.floor(Math.random() * suggestions.length)];
      return NextResponse.json({ recommendation: pick, basedOn: summary ?? null });
    }
  } catch (e) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
