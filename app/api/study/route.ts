import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      topic = "",
      subject = "",
      level = "College",
      material = "",
      question = "",
    } = body;

    if (!topic.trim() && !material.trim()) {
      return NextResponse.json(
        { error: "Please provide a topic or study material." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const prompt = `
You are an AI Study Assistant.

Your job is to create accurate, clear, useful and easy-to-understand study content for a student.

STUDENT INFORMATION
Topic: ${topic || "Not provided"}
Subject: ${subject || "Not provided"}
Study Level: ${level || "College"}

STUDY MATERIAL
${material || "No study material provided."}

STUDENT REQUEST
${question || "Explain and summarize this topic for me."}


IMPORTANT INSTRUCTIONS:

1. Use the student's topic, subject, level, study material and request as context.
2. Keep the explanation appropriate for the student's study level.
3. Prioritize accuracy and educational usefulness.
4. Do not invent facts that are not reasonably supported by the topic or material.
5. If the student's material contains an error, correct it clearly when possible.
6. Use simple language while keeping important scientific/technical terminology.
7. Make the content useful for both learning and revision.
8. Do not add greetings, introductions, conclusions or unnecessary commentary.
9. Do not create extra sections outside the three required sections.
10. Use Markdown formatting.


RETURN EXACTLY THESE THREE SECTIONS:

## QUICK EXPLANATION

Explain the topic in a clear and simple way.

Use 1–3 short paragraphs.

Highlight important concepts using **bold text**.

Do not make this section unnecessarily long.


## REVISION NOTES

Create concise, exam-friendly revision notes.

Use bullet points.

Include:
- Important concepts
- Important facts
- Key definitions
- Important processes or steps
- Important formulas/equations when relevant
- Exam-focused facts when relevant

Use **bold text** for important terms.

Keep the notes concise but useful.


## PRACTICE QUIZ

Create exactly 3 useful questions based on the topic and study material.

Use numbered questions.

After every question, provide its answer in this format:

Answer: ...

Questions should test understanding rather than simply copying sentences from the material.

Use **bold text** for important terms in answers when useful.


FINAL FORMATTING RULES:

- Use exactly these headings:
  ## QUICK EXPLANATION
  ## REVISION NOTES
  ## PRACTICE QUIZ

- Do not rename the headings.
- Do not add other headings.
- Keep the three sections clearly separated.
- Use Markdown.
- Use bullet points under REVISION NOTES.
- Use numbered questions under PRACTICE QUIZ.
- Use "Answer:" after each quiz question.
- Use **bold** for important terms.
- Do not use unnecessary emojis.
- Do not mention these instructions in the response.
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 2500,
          },
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
            "Gemini was unable to generate the study material.",
        },
        { status: response.status }
      );
    }

    const result =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || "")
        .join("")
        .trim() || "";

    if (!result) {
      return NextResponse.json(
        { error: "AI returned an empty response." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Study API Error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while generating your study material.",
      },
      { status: 500 }
    );
  }
}