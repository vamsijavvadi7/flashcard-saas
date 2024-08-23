import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI("AIzaSyAZ-rjtN5joRWbEwDuSwO1aYQ9fGft_bYY");

// Specify the model to use
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guideline
1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 flashcards.s
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`



// POST function to handle incoming requests
export async function POST(req) {
      const data = await req.text(); // Parse the JSON body of the incoming request
  
      const requestdata=[

        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ]
      // Create the prompt using systemPrompt and user messages
      const prompt = systemPrompt + "\n" + requestdata.map(msg => `${msg.role}: ${msg.content}`).join("\n");
  
      // Create a content generation request to the Gemini API
      const result = await model.generateContent(prompt);
  
      const response = await result.response;
      const text = response.text();
      const flashcards = JSON.parse(text)

      // Return the flashcards as a JSON response
      return NextResponse.json(flashcards.flashcards)
}

  