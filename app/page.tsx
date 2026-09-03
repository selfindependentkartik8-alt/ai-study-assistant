"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

type StudyData = {
  topic: string;
  subject: string;
  level: string;
  material: string;
  question: string;
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [quizLoading, setQuizLoading] = useState(false);
 const [quizResult, setQuizResult] = useState("");

  const [study, setStudy] = useState<StudyData>({
    topic: "",
    subject: "",
    level: "College",
    material: "",
    question: "",
  });

  const updateField = (field: keyof StudyData, value: string) => {
    setStudy((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =================================================
  // AI STUDY HANDLER
  // =================================================

  const handleStudy = async () => {
    if (!study.topic.trim() && !study.material.trim()) {
      alert("Please enter a topic or your study material.");
      return;
    }

    setLoading(true);
    setGenerated(false);

    try {
      const response = await fetch("/api/study", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(study),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      console.log("AI Result:", data.result);

setAiResult(data.result);
setGenerated(true);

      setTimeout(() => {
        document
          .getElementById("study-result")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to generate study material."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleQuiz = async () => {
  if (!study.topic.trim() && !study.material.trim()) {
    alert("Please enter a topic or study material first.");
    return;
  }

  setQuizLoading(true);

  try {
    const response = await fetch("/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(study),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to generate quiz.");
    }

    setQuizResult(data.result);

    setTimeout(() => {
      document
        .getElementById("quiz-result")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);

  } catch (error) {
    console.error(error);

    alert(
      error instanceof Error
        ? error.message
        : "Unable to generate quiz."
    );
  } finally {
    setQuizLoading(false);
  }
};

  // =================================================
  // RESET STUDY
  // =================================================

  const resetStudy = () => {
    setGenerated(false);

    setStudy({
      topic: "",
      subject: "",
      level: "College",
      material: "",
      question: "",
    });

    setTimeout(() => {
      document
        .getElementById("study-assistant")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-red-950 via-red-950/60 to-black text-white">

      {/* ================================================= */}
      {/* BACKGROUND GLOW */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[600px] w-[800px] max-w-[100vw] -translate-x-1/2 rounded-full bg-red-500/20 blur-[150px]" />

      <div className="pointer-events-none absolute left-[-180px] top-[45%] h-[350px] w-[350px] rounded-full bg-red-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[55%] h-[350px] w-[350px] rounded-full bg-red-600/10 blur-[140px]" />

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="relative z-20 mx-4 mt-5 rounded-3xl border border-red-400/10 bg-zinc-950/70 px-4 py-4 shadow-2xl shadow-red-950/20 backdrop-blur-2xl sm:mx-auto sm:max-w-6xl sm:px-6">

        <div className="flex items-center justify-between gap-4">

          {/* Logo + Brand */}

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-red-400/20 bg-white/10">

              <img
                src="/logo.png"
                alt="KrishAIWorks"
                className="h-full w-full rounded-full object-cover"
              />

            </div>

            <div className="min-w-0">

              <h2 className="truncate text-sm font-bold text-white sm:text-base">
                KrishAIWorks
              </h2>

              <p className="text-[10px] text-zinc-500 sm:text-xs">
                AI Solutions That Work
              </p>

            </div>

          </div>

          {/* Desktop Navigation */}

          <div className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">

            <a
              href="#home"
              className="transition hover:text-red-300"
            >
              Home
            </a>

            <a
              href="#features"
              className="transition hover:text-red-300"
            >
              Features
            </a>

            <a
              href="#how"
              className="transition hover:text-red-300"
            >
              How To Use
            </a>

            <a
              href="#faq"
              className="transition hover:text-red-300"
            >
              FAQ
            </a>

            <a
              href="https://www.instagram.com/krishaiworks/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-red-500 px-5 py-2 font-medium text-white shadow-lg shadow-red-500/20 transition hover:bg-red-400"
            >
              Follow
            </a>

          </div>

          {/* Mobile Menu Button */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs text-red-300 transition hover:bg-red-500/20 md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>

        </div>

      </nav>

      {/* ================================================= */}
      {/* MOBILE MENU */}
      {/* ================================================= */}

      {menuOpen && (
        <div className="relative z-30 mx-4 mt-2 rounded-3xl border border-red-400/10 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur-xl md:hidden">

          <div className="flex flex-col gap-1">

            <a
              href="#home"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-red-500/10 hover:text-red-300"
            >
              Home
            </a>

            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-red-500/10 hover:text-red-300"
            >
              Features
            </a>

            <a
              href="#how"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-red-500/10 hover:text-red-300"
            >
              How To Use
            </a>

            <a
              href="#faq"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-red-500/10 hover:text-red-300"
            >
              FAQ
            </a>

            <a
              href="https://www.instagram.com/krishaiworks/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-2xl bg-red-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-400"
            >
              Follow
            </a>

          </div>

        </div>
      )}

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section
        id="home"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-20 pt-16 text-center sm:px-8 sm:pt-24"
      >

        {/* Badge */}

        <div className="rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs text-red-200">
          ✨ Powered by Gemini AI
        </div>

        <p className="mt-4 text-xs text-zinc-500">

          Built by{" "}

          <span className="font-semibold text-red-400">
            KrishAIWorks
          </span>

        </p>

        {/* Heading */}

        <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">

          Study Smarter

          <br />

          <span className="bg-gradient-to-r from-red-300 via-red-500 to-red-600 bg-clip-text text-transparent">
            With AI.
          </span>

        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">

          Turn your study material into simple explanations, summaries,
          questions and useful revision content with the help of AI.

        </p>

        {/* Pills */}

        <div className="mt-7 flex max-w-full flex-wrap justify-center gap-2.5">

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300">
            📚 Smart Study
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300">
            🧠 AI Tutor
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300">
            🎯 Exam Focused
          </span>

        </div>

        {/* ================================================= */}
        {/* STUDY ASSISTANT */}
        {/* ================================================= */}

        <div
          id="study-assistant"
          className="mt-12 w-full max-w-4xl"
        >

          <div className="w-full min-w-0 rounded-[2rem] border border-red-400/10 bg-zinc-950/60 p-4 shadow-2xl shadow-red-950/30 backdrop-blur-2xl sm:p-7">

            <div className="mb-6 text-left">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                AI Study Assistant
              </p>

              <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
                Let's make studying easier.
              </h2>

              <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                Add your topic or study material and let AI help you learn.
              </p>

            </div>

            <div className="w-full min-w-0 space-y-4">

              {/* Topic */}

              <div className="w-full min-w-0 text-left">

                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Topic
                </label>

                <input
                  type="text"
                  value={study.topic}
                  onChange={(e) =>
                    updateField("topic", e.target.value)
                  }
                  placeholder="e.g. Cell Biology, Photosynthesis, Newton's Laws..."
                  className="box-border block h-14 w-full min-w-0 max-w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10 sm:px-5"
                />

              </div>

              {/* Subject */}

              <div className="w-full min-w-0 text-left">

                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Subject
                </label>

                <input
                  type="text"
                  value={study.subject}
                  onChange={(e) =>
                    updateField("subject", e.target.value)
                  }
                  placeholder="e.g. Biology, Physics, Chemistry..."
                  className="box-border block h-14 w-full min-w-0 max-w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10 sm:px-5"
                />

              </div>

              {/* Level */}

              <div className="w-full min-w-0 text-left">

                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Study Level
                </label>

                <select
                  value={study.level}
                  onChange={(e) =>
                    updateField("level", e.target.value)
                  }
                  className="box-border block h-14 w-full min-w-0 max-w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10 sm:px-5"
                >
                  <option>School</option>
                  <option>College</option>
                  <option>University</option>
                  <option>Competitive Exam</option>
                </select>

              </div>

              {/* Material */}

              <div className="w-full min-w-0 text-left">

                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Study Material / Notes
                </label>

                <textarea
                  value={study.material}
                  onChange={(e) =>
                    updateField("material", e.target.value)
                  }
                  placeholder="Paste your notes, textbook content or study material here..."
                  rows={7}
                  className="box-border block w-full min-w-0 max-w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-zinc-600 transition focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10 sm:px-5"
                />

              </div>

              {/* Question */}

              <div className="w-full min-w-0 text-left">

                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  What do you want AI to help with?
                </label>

                <textarea
                  value={study.question}
                  onChange={(e) =>
                    updateField("question", e.target.value)
                  }
                  placeholder="e.g. Explain this simply, summarize it, make revision notes..."
                  rows={4}
                  className="box-border block w-full min-w-0 max-w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-zinc-600 transition focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10 sm:px-5"
                />

              </div>

              {/* Generate */}

              <button
                type="button"
                onClick={handleStudy}
                disabled={loading}
                className="box-border h-14 w-full max-w-full rounded-2xl bg-red-500 px-5 text-sm font-semibold text-white shadow-xl shadow-red-500/20 transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "✨ Preparing Your Study Material..."
                  : "✨ Study With AI"}
              </button>

            </div>

            <p className="mt-4 text-left text-xs text-zinc-600">
              AI-generated study content should be reviewed for accuracy.
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* RESULT */}
        {/* ================================================= */}

        {generated && (
  <div
    id="study-result"
    className="mt-10 w-full max-w-4xl min-w-0 text-left"
  >
    <div className="w-full min-w-0 rounded-[2rem] border border-red-400/10 bg-zinc-950/70 p-4 shadow-2xl shadow-red-950/30 backdrop-blur-2xl sm:p-8">

      {/* Result Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            🧠 AI Study Result
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Your personalized study content is ready.
          </p>
        </div>

        <span className="w-fit rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-medium text-red-300">
          Completed
        </span>

      </div>


      {/* Topic */}

      <div className="mt-7 rounded-2xl border border-white/5 bg-black/30 p-5 sm:p-7">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
          Study Topic
        </p>

        <h3 className="mt-3 text-xl font-semibold text-white">
          {study.topic || "Your Study Material"}
        </h3>

        {study.subject && (
          <p className="mt-2 text-sm text-zinc-500">
            {study.subject} • {study.level}
          </p>
        )}

      </div>


      {/* AI Result */}

      <div className="mt-5 rounded-2xl border border-red-400/10 bg-black/30 p-5 sm:p-7">

  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
    AI Explanation & Study Material
  </p>

  <div className="mt-6">

    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="mt-8 mb-4 rounded-xl border border-red-400/10 bg-red-500/10 px-4 py-3 text-lg font-bold tracking-wide text-red-300">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="mt-8 mb-4 rounded-xl border border-red-400/10 bg-red-500/10 px-4 py-3 text-base font-bold tracking-wide text-red-300">
            {children}
          </h2>
        ),

        h3: ({ children }) => (
          <h3 className="mt-7 mb-3 rounded-lg bg-red-500/5 px-3 py-2 text-sm font-bold uppercase tracking-[0.15em] text-red-400">
            {children}
          </h3>
        ),

        p: ({ children }) => (
          <p className="mb-4 text-sm leading-8 text-zinc-300">
            {children}
          </p>
        ),

        ul: ({ children }) => (
          <ul className="mb-5 ml-5 list-disc space-y-3 text-sm leading-7 text-zinc-300 marker:text-red-400">
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="mb-5 ml-5 list-decimal space-y-4 text-sm leading-7 text-zinc-300 marker:font-bold marker:text-red-400">
            {children}
          </ol>
        ),

        li: ({ children }) => (
          <li className="pl-1">
            {children}
          </li>
        ),

        strong: ({ children }) => (
          <strong className="font-semibold text-white">
            {children}
          </strong>
        ),

        em: ({ children }) => (
          <em className="text-red-200">
            {children}
          </em>
        ),

        code: ({ children }) => (
          <code className="rounded-md bg-white/10 px-1.5 py-0.5 text-red-200">
            {children}
          </code>
        ),
      }}
    >
      {aiResult}
    </ReactMarkdown>

  </div>

</div>


      {/* Quiz */}

      <div className="mt-5 rounded-2xl border border-white/5 bg-black/30 p-5 sm:p-7">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
          Practice Quiz
        </p>

        <h3 className="mt-3 text-lg font-semibold text-white">
          Test your understanding.
        </h3>

        <p className="mt-2 text-sm leading-7 text-zinc-500">
          Generate practice questions based on your study material.
        </p>

       <button
  type="button"
  onClick={handleQuiz}
  disabled={quizLoading}
  className="mt-5 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
>
  {quizLoading ? "🧠 Generating Quiz..." : "📝 Generate Quiz"}
</button>

{quizResult && (
  <div
    id="quiz-result"
    className="mt-6 rounded-2xl border border-red-400/10 bg-black/30 p-5 sm:p-7"
  >
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
      Generated Quiz
    </p>

    <div
  id="quiz-result"
  className="mt-5 space-y-5"
>
  {quizResult
    .split(/\n(?=\d+\.)/)
    .filter((question) => question.trim())
    .map((question, index) => {
      const parts = question.split(/\*\*Answer:\*\*/i);

      const questionText = parts[0]
        .replace(/^\d+\.\s*/, "")
        .replace(/\*\*Question:\*\*/i, "")
        .trim();

      const answerText = parts[1]?.trim() || "";

      return (
        <div
          key={index}
          className="rounded-2xl border border-white/5 bg-white/[0.03] p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
            Question {index + 1}
          </p>

          <p className="mt-3 text-sm leading-7 text-zinc-200">
            {questionText}
          </p>

          {answerText && (
            <div className="mt-5 rounded-xl border border-red-400/10 bg-red-500/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                Answer
              </p>

              <p className="mt-2 text-sm leading-7 text-zinc-300">
                {answerText}
              </p>
            </div>
          )}
        </div>
      );
    })}
</div>
  </div>
)}

      </div>


      {/* Actions */}

      <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">

        <button
          type="button"
          onClick={() =>
            navigator.clipboard.writeText(aiResult)
          }
          className="w-full rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 sm:w-auto"
        >
          📋 Copy Result
        </button>

        <button
          type="button"
          onClick={resetStudy}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/10 sm:w-auto"
        >
          🔄 New Study Session
        </button>

      </div>

    </div>
  </div>
)}

      </section>

      {/* ================================================= */}
      {/* FEATURES */}
      {/* ================================================= */}

      <section
        id="features"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
            Why Use It
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Study smarter, not harder.
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Turn complicated study material into simple,
            useful and exam-focused learning content.
          </p>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <FeatureCard
            icon="🧠"
            title="Simple Explanations"
            description="Understand difficult concepts through clear and easy-to-follow AI explanations."
          />

          <FeatureCard
            icon="📝"
            title="Smart Revision"
            description="Convert your study material into concise revision notes and important points."
          />

          <FeatureCard
            icon="🎯"
            title="Exam Focused"
            description="Practice important concepts and prepare yourself with AI-generated questions."
          />

        </div>

      </section>

      {/* ================================================= */}
      {/* HOW TO USE */}
      {/* ================================================= */}

      <section
        id="how"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
            How To Use
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Three simple steps.
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Turn your study material into useful learning content in just a
            few simple steps.
          </p>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <StepCard
            number="01"
            title="Add Your Topic"
            description="Enter the topic, subject and your study level to give AI the right context."
          />

          <StepCard
            number="02"
            title="Add Study Material"
            description="Paste your notes, textbook content or any material you want help understanding."
          />

          <StepCard
            number="03"
            title="Study With AI"
            description="Let AI turn your material into explanations, revision notes and practice questions."
          />

        </div>

      </section>

      {/* ================================================= */}
      {/* FAQ */}
      {/* ================================================= */}

      <section
        id="faq"
        className="relative z-10 mx-auto w-full max-w-3xl px-4 py-24 sm:px-8"
      >

        <div className="text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
            FAQ
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-10 space-y-4">

          <Faq
            question="What can the AI Study Assistant do?"
            answer="It can help explain topics, summarize study material, create revision notes and generate practice questions."
          />

          <Faq
            question="Can I use my own notes?"
            answer="Yes. Paste your notes, textbook content or other study material and use it as the context for your study session."
          />

          <Faq
            question="Which study levels are supported?"
            answer="You can choose School, College, University or Competitive Exam depending on your learning needs."
          />

          <Faq
            question="Can I use it for exam preparation?"
            answer="Yes. The assistant is designed to help create concise revision material and exam-focused practice content."
          />

        </div>

      </section>

      {/* ================================================= */}
      {/* CTA */}
      {/* ================================================= */}

      <section className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 sm:px-8">

        <div className="rounded-[2rem] border border-red-400/10 bg-red-950/20 px-5 py-14 text-center shadow-2xl shadow-red-950/30 backdrop-blur-xl sm:px-12">

          <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-red-400/20 bg-white/5">

            <img
              src="/logo.png"
              alt="KrishAIWorks"
              className="h-full w-full rounded-full object-cover"
            />

          </div>

          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
            Make studying easier with AI.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500">
            Turn your study material into simple explanations, revision notes
            and useful practice content.
          </p>

          <a
            href="#study-assistant"
            className="mt-8 inline-flex rounded-xl bg-red-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-400"
          >
            ✨ Start Studying
          </a>

        </div>

      </section>

     {/* ================================================= */}
{/* FOOTER */}
{/* ================================================= */}

<footer className="relative z-10 border-t border-white/5 px-4 py-14">

  <div className="mx-auto w-full max-w-6xl">

    {/* RELATED TOOLS */}

    <div className="mb-12">

      <div className="mx-auto max-w-2xl text-center">

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
          Explore More
        </p>

        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          More AI Study Tools
        </h2>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          Explore more AI-powered tools to study smarter, organize
          information and learn more effectively.
        </p>

      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* SMART NOTES */}

        <a
          href="https://smartnotes.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-red-400/20 hover:bg-red-400/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-400/10 bg-red-400/10 text-lg">
            📝
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-red-300">
            Smart Notes
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Organize information and create smarter study notes.
          </p>

        </a>

        {/* PDF AI SUMMARIZER */}

        <a
          href="https://pdfaisummarizer.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-red-400/20 hover:bg-red-400/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-400/10 bg-red-400/10 text-lg">
            📄
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-red-300">
            PDF AI Summarizer
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Summarize lengthy PDF documents and extract key information.
          </p>

        </a>

        {/* YOUTUBE AI SUMMARIZER */}

        <a
          href="https://youtubeaisummarizer.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-red-400/20 hover:bg-red-400/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-400/10 bg-red-400/10 text-lg">
            ▶️
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-red-300">
            YouTube AI Summarizer
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Turn lengthy YouTube videos into concise useful summaries.
          </p>

        </a>

        {/* WORD COUNTER */}

        <a
          href="https://wordcounterreadingtime.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-red-400/20 hover:bg-red-400/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-400/10 bg-red-400/10 text-lg">
            🔢
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-red-300">
            Word Counter & Reading Time
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Count words and estimate reading time for your study content.
          </p>

        </a>

      </div>

    </div>

    {/* FOOTER MAIN */}

    <div className="border-t border-white/5 pt-8">

      <div className="flex flex-col items-center justify-between gap-7 sm:flex-row">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-red-400/20 bg-white/5">

            <img
              src="/logo.png"
              alt="KrishAIWorks"
              className="h-full w-full rounded-full object-cover"
            />

          </div>

          <div>

            <p className="font-semibold text-white">
              KrishAIWorks
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              AI Solutions That Work
            </p>

          </div>

        </div>

        <p className="text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} KrishAIWorks. Built with AI.
        </p>

      </div>

    </div>

  </div>

</footer>
    </main>
  );
}

/* ================================================= */
/* FEATURE CARD */
/* ================================================= */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-3xl border border-white/5 bg-zinc-950/40 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-red-400/20">

      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-400/10 bg-red-500/10 text-xl transition group-hover:bg-red-500/15">
        {icon}
      </div>

      <h3 className="mt-6 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        {description}
      </p>

    </div>
  );
}

/* ================================================= */
/* STEP CARD */
/* ================================================= */

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-3xl border border-white/5 bg-zinc-950/40 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-red-400/15">

      <span className="text-sm font-bold text-red-400">
        {number}
      </span>

      <h3 className="mt-5 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        {description}
      </p>

    </div>
  );
}

/* ================================================= */
/* FAQ */
/* ================================================= */

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-white/5 bg-zinc-950/40 p-5 backdrop-blur-xl transition hover:border-red-400/15">

      <summary className="cursor-pointer list-none text-sm font-medium text-zinc-200 sm:text-base">

        <div className="flex items-center justify-between gap-4">

          <span>{question}</span>

          <span className="text-xl text-red-400 transition group-open:rotate-45">
            +
          </span>

        </div>

      </summary>

      <p className="mt-4 text-sm leading-7 text-zinc-500">
        {answer}
      </p>

    </details>
  );
}