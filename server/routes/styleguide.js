import OpenAI from "openai";
import express from "express";
const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

import StyleGuide from "../models/styleguideModel.js";
import authenticateToken from "../middleware/authMiddleware.js";

router.post("/generate", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const { purpose, targetgroup, language, specifications, examples } = req.body;

  let promptText =
    "Could you analyse the information and text content I provide and create a very detailed style guide that includes grammar rules, punctuation preferences, formatting guidelines, vocabulary usage, tone of voice, language, target audience and brand guidelines? The style guide should be designed in such a way that it can be passed on to copywriters and give them comprehensive instructions on how to write copy in the same style. Here are the details and examples:\n\n";

  promptText += "Information:\n";

  [purpose, targetgroup, language, specifications].forEach((category) => {
    category.forEach((item) => {
      promptText += `- ${item.title}: ${item.description}\n`;
    });
  });

  promptText += "\nTextexamples:\n";
  examples.forEach((example, index) => {
    promptText += `Example ${index + 1}: ${example}\n`;
  });

  promptText +=
    "\nBased on these examples, please analyze and extract key elements that should influence the style guide. How can these examples guide the tone and style of the content?";
  console.log("Generated promptText:", promptText);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a skilled professional in creating helpful style guides.",
        },
        { role: "user", content: promptText },
      ],
      max_tokens: 500,
    });

    const content = response.choices[0].message.content;
    console.log("Content received from OpenAI:", content);

    const newStyleGuide = new StyleGuide({
      userId,
      content,
    });
    await newStyleGuide.save();

    res.json({
      message: "Style guide created successfully",
      content: content,
      styleGuideId: newStyleGuide._id.toString(),
    });
  } catch (error) {
    console.error("Error generating style guide:", error);
    res.status(500).json({
      message: "Failed to generate style guide",
      error: error.message,
    });
  }
});

router.get("/:userId", authenticateToken, async (req, res) => {
  try {
    const styleGuide = await StyleGuide.findOne({ userId: req.params.userId });
    if (!styleGuide) {
      return res.status(404).json({ message: "Style guide not found" });
    }
    res.json(styleGuide);
  } catch (error) {
    console.error("Error retrieving style guide:", error);
    res.status(500).json({
      message: "Failed to retrieve style guide",
      error: error.message,
    });
  }
});

router.post("/generate-posts", authenticateToken, async (req, res) => {
  const { topic, styleGuideId } = req.body;

  if (!topic || !styleGuideId) {
    return res.status(400).json({
      message:
        "Missing required fields: topic and styleGuideId must be provided.",
    });
  }

  try {
    const styleGuide = await StyleGuide.findById(styleGuideId);
    if (!styleGuide) {
      return res.status(404).json({ message: "Style guide not found" });
    }

    if (!styleGuide.content) {
      return res
        .status(400)
        .json({ message: "Style guide content is missing" });
    }

    const exampleSchema = {
      posts: [
        {
          topic: "Agiles Projektmanagement",
          title: "Die Vorteile agiler Methoden in der Projektumsetzung",
          content:
            "Im dynamischen Umfeld der Projektarbeit bietet das agile Projektmanagement zahlreiche Vorteile gegenüber traditionellen Ansätzen. Durch die Anwendung agiler Prinzipien können Projektmanager:innen und Teams schneller auf Veränderungen reagieren; eine höhere Produktqualität wird erreicht und die Kundenzufriedenheit steigt. Außerdem fördert agiles Management die Transparenz und verbesserte Kommunikation innerhalb des Teams. In der heutigen schnelllebigen Welt ist es entscheidend, dass Teams effektiv kommunizieren und Problemlösungen zeitnah umsetzen können. Agile Methoden, wie Scrum und Kanban, unterteilen Projekte in kleine, handhabbare Einheiten, was eine kontinuierliche Überprüfung und Anpassung der Projektziele ermöglicht. Diese Flexibilität führt zu einer effizienteren Arbeitsweise und reduziert das Risiko von Projektüberschreitungen. Letztendlich tragen agile Praktiken dazu bei, die Teamdynamik zu stärken und eine Kultur der kontinuierlichen Verbesserung zu fördern, was wiederum die Gesamtleistung des Teams und die Ergebnisqualität erhöht.",
        },
      ],
    };

    const promptText = `Create three different LinkedIn posts on the topic "${topic}", strictly following the guidelines and tone of voice found in the style guide: ${styleGuide.content}. Ensure the response adheres to the specified JSON schema. Each post should be a minimum of 200 words and a maximum of 400 words.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: `You are an helpful assistant tasked with creating LinkedIn posts based on specific topics and style guidelines. Return the response as a valid JSON object with fields for topic, title, and content for each post, adhering to the following schema: ${JSON.stringify(
            exampleSchema
          )}`,
        },
        { role: "user", content: promptText },
      ],
      response_format: { type: "json_object" },
      max_tokens: 1200,
    });

    if (
      response &&
      response.choices &&
      response.choices[0] &&
      response.choices[0].message &&
      response.choices[0].message.content
    ) {
      const responseData = JSON.parse(response.choices[0].message.content);

      if (responseData && responseData.posts) {
        const sanitizedPosts = responseData.posts.map((post) => ({
          topic: post.topic || "No topic provided",
          title: post.title || "No title provided",
          content: post.content || "No content provided",
        }));

        console.log("Sanitized posts:", sanitizedPosts);
        res.json(sanitizedPosts);
      } else {
        throw new Error("Posts data is missing in the response");
      }
    } else {
      throw new Error("Invalid response format received from OpenAI");
    }
  } catch (error) {
    console.error("Error during the request processing:", error);
    res.status(500).json({
      message: "Failed to process the request",
      error: error.message,
    });
  }
});
export default router;
