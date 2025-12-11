import { GoogleGenAI, Type } from "@google/genai";
import { StrategyItem, EmailResult, SocialResult } from "../types";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    // Ideally this comes from process.env.API_KEY as per instructions
    const apiKey = process.env.API_KEY || ''; 
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    } else {
      console.warn("API Key is missing. AI features will be simulated or fail.");
    }
  }
  return aiClient;
};

export const generateConsultantResponse = async (
  history: { role: string; parts: { text: string }[] }[],
  userMessage: string
): Promise<string> => {
  const client = getAiClient();
  
  if (!client) {
    return "I'm currently offline (API Key missing). Please contact our team directly via the form below!";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are 'Nexus', the advanced AI consultant for Digital Complement. 
    Digital Complement is a software agency specializing in:
    1. AI Tools & Custom AI Agents (Chatbots, Data Analyzers).
    2. Business Automation (Workflow streamlining, Zapier/Make integrations).
    3. Website Creation & Maintenance (React, Modern UI/UX).
    4. Social Media Support (Content strategy, automated posting).
    
    Target Audience: Real Estate Agencies and Small Businesses.
    
    Your goal is to be helpful, professional, and demonstrate technical competence. 
    Keep answers concise (under 100 words) unless asked for details.
    Encourage the user to book a consultation or fill out the contact form for specific quotes.
    If asked about pricing, say it depends on the project scope but we offer competitive packages for small businesses.`;

    const chat = client.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "I apologize, I processed that but couldn't generate a text response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my knowledge base right now. Please try again later or use the contact form.";
  }
};

export const generateBusinessStrategy = async (businessDescription: string): Promise<StrategyItem[]> => {
  const client = getAiClient();
  
  if (!client) {
    // Fallback mock data
    return [
      {
        title: "Intelligent Lead Capture",
        description: "Deploy an AI chatbot to engage website visitors 24/7, qualifying leads instantly.",
        impact: "Increase lead conversion by 40%",
        tools: ["Custom AI Agent", "CRM Integration"]
      },
      {
        title: "Automated Follow-ups",
        description: "Set up automated email and SMS sequences triggered by specific user actions.",
        impact: "Save 10+ hours/week",
        tools: ["Make.com", "Email Marketing"]
      },
      {
        title: "Content Generation Engine",
        description: "Generate social media posts and blog articles tailored to your audience automatically.",
        impact: "3x Social Engagement",
        tools: ["GenAI Content API", "Social Scheduler"]
      }
    ];
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following business type: "${businessDescription}". 
      Suggest 3 specific, high-impact AI or Automation strategies that Digital Complement could build for them.
      Focus on efficiency, cost-saving, or revenue generation.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "A catchy title for the strategy." },
              description: { type: Type.STRING, description: "A brief 1-sentence explanation." },
              impact: { type: Type.STRING, description: "Estimated quantifiable impact." },
              tools: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "List of 1-2 technologies used."
              }
            },
            required: ["title", "description", "impact", "tools"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response generated");
    return JSON.parse(text) as StrategyItem[];
  } catch (error) {
    console.error("Strategy Generation Error:", error);
    throw error;
  }
};

export const generateEmailDraft = async (recipient: string, topic: string): Promise<EmailResult> => {
  const client = getAiClient();
  
  if (!client) {
    return {
      subject: "Unlock Your Business Potential with AI",
      body: `Hi ${recipient},\n\nI noticed you're looking into ${topic} and I wanted to reach out.\n\nAt Digital Complement, we specialize in helping businesses like yours automate workflows and increase efficiency. I'd love to show you how our latest AI tools can help you achieve your goals.\n\nAre you free for a quick call this week?\n\nBest,\nDigital Complement Team`
    };
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a professional cold email to "${recipient}" regarding "${topic}".
      The tone should be professional, persuasive, and concise.
      Return a JSON object with 'subject' and 'body' fields.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING, description: "A compelling email subject line." },
            body: { type: Type.STRING, description: "The email body text. Use \\n for line breaks." }
          },
          required: ["subject", "body"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response generated");
    return JSON.parse(text) as EmailResult;
  } catch (error) {
    console.error("Email Generation Error:", error);
    throw error;
  }
};

export const generateSocialPost = async (platform: string, topic: string): Promise<SocialResult> => {
  const client = getAiClient();
  
  if (!client) {
    return {
      hook: "Ready to revolutionize your workflow? 🚀",
      content: `AI isn't just the future—it's here now. By automating ${topic}, businesses are saving hours every week. Don't get left behind!`,
      hashtags: ["#AI", "#Automation", "#DigitalTransformation", "#TechTrends"]
    };
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a viral social media post for ${platform} about "${topic}".
      Include a catchy hook, the main content, and relevant hashtags.
      Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hook: { type: Type.STRING, description: "A short, attention-grabbing opening line." },
            content: { type: Type.STRING, description: "The main post content. Include emojis where appropriate." },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 5 relevant hashtags." }
          },
          required: ["hook", "content", "hashtags"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response generated");
    return JSON.parse(text) as SocialResult;
  } catch (error) {
    console.error("Social Generation Error:", error);
    throw error;
  }
};