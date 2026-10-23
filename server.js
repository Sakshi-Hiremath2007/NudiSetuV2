require("dotenv").config();

const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "20kb" }));

// Serve the NudiSetuV2 website files.
app.use(express.static(__dirname));

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    aiConfigured: Boolean(ai),
    message: "NudiSetu server is running!",
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body?.message;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Please enter a message.",
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        error: "Message is too long. Please use 2000 characters or fewer.",
      });
    }

    if (!ai) {
      return res.status(503).json({
        error: "Gemini is not configured. Check your private .env file.",
      });
    }

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: message.trim(),
      config: {
        systemInstruction:
          "You are NudiSetu's friendly Kannada learning assistant. Help beginners learn Kannada using clear English explanations, Kannada script, simple transliterations, and short examples. Be encouraging. If unsure about a translation, say so rather than guessing.",
      },
    });

    res.json({
      reply: response.text || "Sorry, I couldn't generate a reply. Try again.",
    });
  } catch (error) {
    console.error("Gemini request failed:", error.message);

    res.status(500).json({
      error: "Sorry, the AI assistant could not reply. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`NudiSetu server running at http://localhost:${PORT}`);
});
