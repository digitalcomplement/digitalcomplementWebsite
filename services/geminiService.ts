import { GoogleGenAI, Type } from "@google/genai";
import { StrategyItem, EmailResult, SocialResult } from "../types";

/**
 * PRODUCTION SECURITY NOTE:
 * In a pure client-side application (like this React app), the API Key is visible in the browser network traffic.
 * To safeguard your key in production:
 * 1. Go to Google Cloud Console > APIs & Services > Credentials.
 * 2. Edit your API Key.
 * 3. Under "Application restrictions", select "Websites".
 * 4. Add your production domain (e.g., https://digitalcomplement.com/*).
 * 
 * This prevents others from stealing your key and using it on their own sites.
 */

// --- CONFIGURATION ---
const MAX_INPUT_LENGTH = 500; // Prevent token exhaustion attacks
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 Minute
const MAX_REQUESTS_PER_WINDOW = 10; // Allow 10 requests per minute per user

// --- RATE LIMITER ---
class RateLimiter {
  private requestCount = 0;
  private windowStart = Date.now();

  check(): boolean {
    const now = Date.now();
    if (now - this.windowStart > RATE_LIMIT_WINDOW_MS) {
      this.requestCount = 0;
      this.windowStart = now;
    }
    if (this.requestCount >= MAX_REQUESTS_PER_WINDOW) {
      console.warn("Rate limit exceeded. Switching to simulation mode.");
      return false; 
    }
    this.requestCount++;
    return true;
  }
}

const rateLimiter = new RateLimiter();
let aiClient: GoogleGenAI | null = null;
let isMockMode = false;

// --- INITIALIZATION ---
const getAiClient = () => {
  if (aiClient) return aiClient;

  let apiKey = '';

  // 1. Try Vite Standard (import.meta.env) - Safe for browser
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    // @ts-ignore
    apiKey = import.meta.env.VITE_API_KEY || '';
  }

  // 2. Fallback to process.env (Safe check to avoid crashing if process is undefined)
  if (!apiKey && typeof process !== 'undefined' && process.env) {
    apiKey = process.env.REACT_APP_API_KEY || 
             process.env.VITE_API_KEY || 
             process.env.API_KEY || 
             '';
  }

  if (apiKey && !apiKey.startsWith('YOUR_')) {
    try {
      aiClient = new GoogleGenAI({ apiKey });
      isMockMode = false;
    } catch (e) {
      console.error("Failed to initialize Gemini Client:", e);
      isMockMode = true;
    }
  } else {
    console.warn("API Key missing or invalid. App running in SIMULATION MODE.");
    isMockMode = true;
  }
  return aiClient;
};

// --- HELPER: INPUT SANITIZATION ---
const sanitizeInput = (input: string): string => {
  return input.trim().slice(0, MAX_INPUT_LENGTH);
};

// --- MOCK DATA GENERATORS (Fallback for Production Stability) ---
const getMockStrategy = (business: string): StrategyItem[] => [
  {
    title: "AI Customer Onboarding",
    description: `Deploy a custom agent to welcome new ${business || 'clients'} and collect requirements automatically.`,
    impact: "Save 12+ hrs/week",
    tools: ["Voiceflow", "OpenAI"]
  },
  {
    title: "Automated Lead Nurturing",
    description: "Connect your CRM to email marketing to follow up with leads instantly based on behavior.",
    impact: "Increase conversions by 35%",
    tools: ["HubSpot", "Make.com"]
  },
  {
    title: "Predictive Inventory",
    description: "Use historical data to predict stock needs and automate reordering before you run out.",
    impact: "Reduce overhead by 20%",
    tools: ["Custom Python Script", "Pandas"]
  }
];

const getMockEmail = (recipient: string, topic: string): EmailResult => ({
  subject: `Opportunity to streamline operations for ${recipient}`,
  body: `Hi ${recipient},\n\nI hope you're having a great week.\n\nI was looking at your work regarding ${topic} and noticed some huge opportunities for automation.\n\nAt Digital Complement, we help businesses reclaim their time using AI. I'd love to share a few ideas tailored to your needs.\n\nAre you open to a 10-minute chat this Thursday?\n\nBest regards,\nThe Digital Complement Team`
});

const getMockSocial = (platform: string, topic: string): SocialResult => ({
  hook: "Stop working harder, start working smarter. 💡",
  content: `We just helped another client automate their ${topic} workflow and the results are incredible. \n\n✅ 0 Manual Errors\n✅ 50% Faster Turnaround\n✅ Happy Team\n\nIs your business ready for the next level?`,
  hashtags: [`#${platform.replace(/\s/g, '')}`, "#Automation", "#GrowthHacking", "#AI"]
});

// --- API FUNCTIONS ---

export const generateConsultantResponse = async (
  history: { role: string; parts: { text: string }[] }[],
  userMessage: string
): Promise<string> => {
  const cleanInput = sanitizeInput(userMessage);
  
  // Safe execution wrapper to prevent app crash
  let client;
  try {
     client = getAiClient();
  } catch (e) {
     console.error("Client Init Error", e);
     return "I'm operating in offline mode right now. Please contact us via email!";
  }

  const canProceed = rateLimiter.check();

  if (!client || !canProceed || isMockMode) {
    // Simulated intelligent responses based on keywords
    const lower = cleanInput.toLowerCase();
    if (lower.includes('price') || lower.includes('cost')) return "Our pricing is tailored to your specific needs. Typically, small automation projects start around $1,500, while full AI agents vary. Shall we book a call to get you a quote?";
    if (lower.includes('real estate')) return "For Real Estate, we specialize in 24/7 lead qualification bots and automated follow-up sequences. It ensures you never miss a viewing request!";
    if (lower.includes('contact') || lower.includes('email')) return "You can reach us at hello@digitalcomplement.com or use the form at the bottom of the page!";
    return "That's a great question! Digital Complement specializes in AI Agents, Web Dev, and Automation. Could you tell me a bit more about your specific business needs so I can advise better?";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are 'Nexus', the AI consultant for Digital Complement. 
    Expertise: AI Agents, Automation (Zapier/Make), Web Dev, Social Media.
    Audience: Real Estate & Small Business.
    Tone: Professional, Innovative, Helpful.
    Goal: Briefly explain benefits and guide them to the 'Contact' form.
    Constraint: Keep response under 80 words.`;

    const chat = client.chats.create({
      model: model,
      config: { systemInstruction, temperature: 0.7 },
      history: history,
    });

    const result = await chat.sendMessage({ message: cleanInput });
    return result.text || "I processed that, but couldn't generate a response. Please try asking differently.";
  } catch (error) {
    console.error("Gemini API Error (Chat):", error);
    return "I'm having trouble connecting to the neural network. Please try again in a moment.";
  }
};

export const generateBusinessStrategy = async (businessDescription: string): Promise<StrategyItem[]> => {
  const cleanInput = sanitizeInput(businessDescription);
  
  let client;
  try { client = getAiClient(); } catch (e) { client = null; }
  
  const canProceed = rateLimiter.check();

  if (!client || !canProceed || isMockMode) {
    await new Promise(r => setTimeout(r, 1500)); // Fake loading delay for realism
    return getMockStrategy(cleanInput);
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze: "${cleanInput}". Suggest 3 high-impact AI/Automation strategies.
      Return JSON array with title, description (1 sentence), impact (quantifiable), tools (array of strings).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              impact: { type: Type.STRING },
              tools: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["title", "description", "impact", "tools"]
          }
        }
      }
    });

    return JSON.parse(response.text || '[]') as StrategyItem[];
  } catch (error) {
    console.error("Strategy API Error:", error);
    return getMockStrategy(cleanInput); // Graceful fallback
  }
};

export const generateEmailDraft = async (recipient: string, topic: string): Promise<EmailResult> => {
  const cleanRecipient = sanitizeInput(recipient);
  const cleanTopic = sanitizeInput(topic);
  
  let client;
  try { client = getAiClient(); } catch (e) { client = null; }
  
  const canProceed = rateLimiter.check();

  if (!client || !canProceed || isMockMode) {
    await new Promise(r => setTimeout(r, 1500));
    return getMockEmail(cleanRecipient, cleanTopic);
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a professional cold email to "${cleanRecipient}" about "${cleanTopic}".
      Return JSON with subject and body. Keep it persuasive.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            body: { type: Type.STRING }
          },
          required: ["subject", "body"]
        }
      }
    });

    return JSON.parse(response.text || '{}') as EmailResult;
  } catch (error) {
    console.error("Email API Error:", error);
    return getMockEmail(cleanRecipient, cleanTopic);
  }
};

export const generateSocialPost = async (platform: string, topic: string): Promise<SocialResult> => {
  const cleanTopic = sanitizeInput(topic);
  
  let client;
  try { client = getAiClient(); } catch (e) { client = null; }
  
  const canProceed = rateLimiter.check();

  if (!client || !canProceed || isMockMode) {
    await new Promise(r => setTimeout(r, 1500));
    return getMockSocial(platform, cleanTopic);
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a viral ${platform} post about "${cleanTopic}".
      Return JSON with hook, content, hashtags (array).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hook: { type: Type.STRING },
            content: { type: Type.STRING },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["hook", "content", "hashtags"]
        }
      }
    });

    return JSON.parse(response.text || '{}') as SocialResult;
  } catch (error) {
    console.error("Social API Error:", error);
    return getMockSocial(platform, cleanTopic);
  }
};
