import { GoogleGenerativeAI } from "@google/generative-ai";

import { GEMINI_API_KEY } from "../utils/constants.js";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default model;