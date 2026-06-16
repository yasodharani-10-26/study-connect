import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // Initialize GoogleGenAI client
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API Route for Jigsaw generation
  app.post("/api/generate-jigsaw", async (req, res) => {
    try {
      const { topic, count = 4, level = "High School" } = req.body;
      if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
      }

      if (!ai) {
        return res.status(400).json({
          error: "Gemini API key is unconfigured. Please check the Secrets panel in the AI Studio UI to configure GEMINI_API_KEY, or use one of our premium pre-built Jigsaw activities."
        });
      }

      const prompt = `Create a complete Jigsaw Collaborative Learning Activity about the topic: "${topic}".
Target Education/Grade Level: ${level}
Number of Expert Topics (break down the topic into exactly this many distinct, comprehensive subtopics): ${count}

Each expert topic needs a detailed briefing guide (250-400 words of high-quality learning content in Markdown format), key takeaways, discussion prompts for their expert group meeting, and practical teaching tips on how to teach this specific subtopic to their home group.
Also, include a review quiz with exactly ${count} multiple-choice questions (1 question for each expert topic) to test if the home group successfully taught each other.

Return the result as a raw JSON matching this schema:
{
  "title": "A highly creative educational title for the Jigsaw activity",
  "description": "A motivating description of why this topic is important for collaborative learning",
  "topic": "${topic}",
  "level": "${level}",
  "expertTopics": [
    {
      "id": "topic-1",
      "title": "Clear, engaging title of this expert subtopic",
      "guide": "A detailed explanation of this subtopic in Markdown format. Keep it informative, easy to read, but rich with educational terms suitable for ${level}.",
      "keyTakeaways": ["Takeaway 1", "Takeaway 2", "Takeaway 3"],
      "discussionPrompts": ["Discussion prompt 1", "Discussion prompt 2"],
      "teachingTips": ["Tips/analogy 1", "Tips/analogy 2"]
    }
  ],
  "reviewQuiz": [
    {
      "id": "quiz-1",
      "question": "A multiple choice question testing knowledge of what was taught in the matching expert topic. Make sure correctIndex refers to the 0-based index of option in response.",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Why this option is correct and how it relates back to the expert subtopic."
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from Gemini API");
      }

      const parsedData = JSON.parse(responseText.trim());
      res.json(parsedData);
    } catch (error: any) {
      console.error("Gemini Generate Jigsaw error:", error);
      res.status(500).json({ error: error.message || "Failed to generate Jigsaw activity" });
    }
  });

  // Check if API key is active
  app.get("/api/config", (req, res) => {
    const isConfigured = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY" && process.env.GEMINI_API_KEY.trim() !== "";
    res.json({ isConfigured });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
