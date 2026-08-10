import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      topic,
      subject,
      level,
      material,
    } = body;

    if (!topic?.trim() && !material?.trim()) {
      return NextResponse.json(
        {
          error: "Please provide a topic or study material.",
        },
        { status: 400 }
      );
    }

    const prompt = `
You are an AI Study Assistant.

Create a practice quiz for a student.

Student Information:
Topic: ${topic || "Not provided"}
Subject: ${subject || "Not provided"}
Study Level: ${level || "College"}

Study Material:
${material || "No material provided"}

Create exactly 5 useful practice questions.

Rules:
- Questions must be based on the topic and study material.
- Keep difficulty appropriate for the student's study level.
- Mix conceptual and factual questions where appropriate.
- Keep questions clear and easy to understand.
- Give the correct answer after every question.
- Do not add explanations outside the quiz.
- Use Markdown.
- Do not use unnecessary headings.

Return exactly this format:

1. **Question:** ...
   **Answer:** ...

2. **Question:** ...
   **Answer:** ...

3. **Question:** ...
   **Answer:** ...

4. **Question:** ...
   **Answer:** ...

5. **Question:** ...
   **Answer:** ...
`;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Gemini API key is missing.",
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "Gemini failed to generate the quiz.",
        },
        { status: response.status }
      );
    }

    const quiz =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!quiz) {
      return NextResponse.json(
        {
          error: "No quiz was generated.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      result: quiz,
    });

  } catch (error) {
    console.error("Quiz Route Error:", error);

    return NextResponse.json(
      {
        error: "Unable to generate quiz. Please try again.",
      },
      { status: 500 }
    );
  }
}