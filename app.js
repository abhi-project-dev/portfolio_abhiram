document.documentElement.classList.add("js");

const XENO_STORAGE_KEY = "xeno-chat-history-v1";
const XENO_CONFIG = {
  apiKey: "",
  apiEndpoint: ""
};

const resumeData = {
  name: "Abhiram Thallapally",
  title: "Computer Science graduate specializing in AI and Machine Learning",
  email: "abhiramthalapally0@gmail.com",
  phone: "+91 95025 23875",
  github: "https://github.com/abhi-project-dev",
  linkedin: "https://www.linkedin.com/in/abhiram-thallapally",
  selfIntro: "Hi, I’m Abhiram Thallapally, a Computer Science graduate specializing in AI and Machine Learning. I build real-world projects combining AI, full-stack development, and data-driven applications. My work includes a thyroid disease prediction system with over 90% accuracy, a full-stack budgeting tool, and multiple interactive dashboards and tools. I focus on creating practical, scalable solutions with strong UI/UX and measurable impact. I’m currently seeking opportunities in Software Development, AI/ML, and Data Analytics.",
  skills: {
    languages: ["Python", "Java", "JavaScript", "SQL"],
    aiMl: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Regression", "Classification", "Model Evaluation"],
    fullStack: ["HTML5", "CSS3", "React.js", "Node.js", "REST APIs", "JWT authentication", "MySQL"],
    data: ["Tableau", "Power BI", "Matplotlib", "Statistical Analysis", "Data Visualization"],
    tools: ["Git", "GitHub", "VS Code", "PyCharm", "Eclipse", "Docker", "Deployment"]
  },
  projects: [
    "Interactive Thyroid Disease Prediction: Python, Scikit-learn, Pandas, and NumPy model with 90%+ accuracy and an interactive prediction UI.",
    "Interactive Budgeting Tool: Java, Spring Boot, React, MySQL, JWT authentication, expense tracking, savings goals, and dashboard visualizations.",
    "Personal Developer Portfolio: responsive HTML, CSS, and JavaScript portfolio with project demos, filters, certificates, resume content, and Xeno AI Assistant.",
    "Weather Dashboard: Open-Meteo API app with current weather, seven-day forecasts, and sunrise/sunset visualization.",
    "GitHub Profile Analyzer: public GitHub API dashboard for repository stats, language mix, and portfolio health scoring.",
    "Financial Calculator: client-side FD, EMI, SIP, and basic calculator with real-time results.",
    "ML demos: house price prediction, spam email classifier, movie recommendation system, image classifier, and ATS resume validator.",
    "JavaScript project lab: Xeno assistant UI, image generator UI, memory card game, Snake canvas game, and Tic Tac Toe AI opponent."
  ],
  certifications: [
    "AWS Academy Cloud Foundations",
    "AWS Academy Machine Learning Foundations",
    "Full Stack Development",
    "Cyber Security Audits",
    "AI/ML internship and project certifications"
  ],
  education: "B.Tech Computer Science, Artificial Intelligence and Machine Learning, 2025"
};

function initPortfolio() {
  const header = document.querySelector("[data-header]");
  const revealItems = document.querySelectorAll(".reveal,[data-reveal]");
  const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];
  const sections = navLinks.map(l => document.querySelector(l.getAttribute("href"))).filter(Boolean);
  const year = document.querySelector("#year");
  const projectFilterButtons = [...document.querySelectorAll(".project-filter .filter-button")];
  const projectCards = [...document.querySelectorAll(".project-card")];
  const projectCount = document.querySelector("#project-count");
  const certFilterButtons = [...document.querySelectorAll(".cert-filter .filter-button")];
  const certCards = [...document.querySelectorAll(".cert-card")];

  if (year) year.textContent = String(new Date().getFullYear());
  if (projectCount && projectCards.length) projectCount.textContent = String(projectCards.length).padStart(2, "0");

  const toggleHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
  toggleHeader();
  window.addEventListener("scroll", toggleHeader, { passive: true });

  const setProjectFilter = f => {
    projectFilterButtons.forEach(b => b.classList.toggle("is-active", b.dataset.projectFilter === f));
    projectCards.forEach(c => c.classList.toggle("is-hidden", !(f === "all" || c.dataset.projectCategory === f)));
  };

  const setCertFilter = f => {
    certFilterButtons.forEach(b => b.classList.toggle("is-active", b.dataset.filter === f));
    certCards.forEach(c => c.classList.toggle("is-hidden", !(f === "all" || c.dataset.category === f)));
  };

  projectFilterButtons.forEach(b => b.addEventListener("click", () => setProjectFilter(b.dataset.projectFilter)));
  certFilterButtons.forEach(b => b.addEventListener("click", () => setCertFilter(b.dataset.filter)));
  if (projectCards.length) setProjectFilter("all");
  if (certCards.length) setCertFilter("all");

  if ("IntersectionObserver" in window) {
    const ro = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        obs.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealItems.forEach(i => ro.observe(i));

    if (sections.length && navLinks.length) {
      const no = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const curr = `#${e.target.id}`;
          navLinks.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === curr));
        });
      }, { threshold: 0.3, rootMargin: "-25% 0px -45% 0px" });
      sections.forEach(s => no.observe(s));
    }
  } else {
    revealItems.forEach(i => i.classList.add("is-visible"));
  }
}

function getStoredHistory() {
  try {
    return JSON.parse(localStorage.getItem(XENO_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function storeHistory(history) {
  try {
    localStorage.setItem(XENO_STORAGE_KEY, JSON.stringify(history.slice(-40)));
  } catch {
    // localStorage can fail in private mode; chat still works for the session.
  }
}

function cleanText(text) {
  return String(text)
    .split("\n")
    .map(line => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function buildLocalResponse(prompt) {
  const q = prompt.toLowerCase();

  if (q.includes("tell me about yourself") || q.includes("summarize my profile") || q.includes("about yourself")) {
    return resumeData.selfIntro;
  }

  if (q.includes("interview") || q.includes("pitch")) {
    return "Interview pitch:\n\nAbhiram Thallapally is a Computer Science graduate focused on AI, machine learning, and full-stack development. He has built a thyroid disease prediction system with 90%+ accuracy, a Java/Spring Boot budgeting platform with React and MySQL, and several web, finance, and ML demos that are easy to try from the portfolio.\n\nFor an interview, I’d position him as someone who can learn quickly, connect model/backend logic to usable interfaces, and contribute across software development, AI/ML, and data analytics work.";
  }

  if (q.includes("hire") || q.includes("why should") || q.includes("recruiter")) {
    return "Recruiter view:\n\nAbhiram is a strong fit for entry-level software, AI/ML, full-stack, or data roles because he has hands-on projects across the stack, not just coursework. He can work with Python and ML libraries, build Java/React/MySQL applications, and present results through clean web interfaces.\n\nBest proof points:\n1. Thyroid prediction model with 90%+ accuracy.\n2. Full-stack budgeting tool with authentication and dashboards.\n3. A portfolio that includes live demos, certificates, and Xeno AI Assistant as a built-in guide.";
  }

  if (q.includes("explain") && q.includes("project") || q.includes("projects") || q.includes("ai projects")) {
    return `Projects overview:\n\n1. Thyroid Disease Prediction: ML classification system using Python, Scikit-learn, Pandas, and NumPy with 90%+ accuracy.\n\n2. Interactive Budgeting Tool: full-stack finance app using Java, Spring Boot, React, MySQL, and JWT authentication.\n\n3. Dashboards and tools: weather dashboard, GitHub profile analyzer, crypto dashboard, financial calculator, and browser-based JavaScript demos.\n\n4. ML demos: house price prediction, spam email classifier, movie recommender, image classifier, and ATS resume validator.\n\nThe common thread is practical, user-facing software with measurable impact and strong UI/UX.`;
  }

  if (q.includes("skill") || q.includes("tech stack") || q.includes("python") || q.includes("java") || q.includes("javascript")) {
    return `Core skills:\n\nLanguages: ${resumeData.skills.languages.join(", ")}.\nAI/ML: ${resumeData.skills.aiMl.join(", ")}.\nFull-stack: ${resumeData.skills.fullStack.join(", ")}.\nData and visualization: ${resumeData.skills.data.join(", ")}.\nTools: ${resumeData.skills.tools.join(", ")}.`;
  }

  if (q.includes("cert")) {
    return `Certifications include ${resumeData.certifications.join(", ")}. These support Abhiram's AI/ML, cloud, full-stack, and security foundation.`;
  }

  if (q.includes("education") || q.includes("graduate") || q.includes("degree")) {
    return `Education: ${resumeData.education}. The portfolio is focused on AI/ML, full-stack development, and data analytics roles.`;
  }

  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("linkedin") || q.includes("github")) {
    return `Contact Abhiram:\n\nEmail: ${resumeData.email}\nPhone: ${resumeData.phone}\nGitHub: ${resumeData.github}\nLinkedIn: ${resumeData.linkedin}\n\nIf you are reviewing him for a role, the fastest next step is email or LinkedIn.`;
  }

  if (q.includes("thyroid")) {
    return "The thyroid disease prediction project is an AI/ML classification system built with Python, Scikit-learn, Pandas, and NumPy. It predicts thyroid disorder risk through an interactive UI and reports 90%+ accuracy with clear confidence-based output.";
  }

  if (q.includes("budget")) {
    return "The interactive budgeting tool is a full-stack finance application using Java, Spring Boot, React, MySQL, and JWT authentication. It supports income and expense tracking, savings goals, and dashboard visualizations.";
  }

  if (q.includes("resume") || q.includes("cv")) {
    return "The resume highlights AI/ML, full-stack development, data analysis, certifications, and project-based experience. You can download it from the Download Resume button in the portfolio or ask me about any section.";
  }

  return "I’m Xeno AI Assistant, Abhiram’s built-in portfolio copilot. I work as a personal recruiter assistant, portfolio guide, and interview helper. Ask me about his projects, skills, certifications, education, contact details, or why he may be a good fit for a role.";
}

async function getAssistantResponse(prompt) {
  if (!XENO_CONFIG.apiKey || !XENO_CONFIG.apiEndpoint) {
    return buildLocalResponse(prompt);
  }

  try {
    const response = await fetch(XENO_CONFIG.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${XENO_CONFIG.apiKey}`
      },
      body: JSON.stringify({ prompt, resumeData })
    });

    if (!response.ok) throw new Error("Assistant API failed");
    const data = await response.json();
    return data.reply || buildLocalResponse(prompt);
  } catch {
    return `${buildLocalResponse(prompt)}\n\nNote: live API response was unavailable, so I used the built-in portfolio knowledge base.`;
  }
}

function initChat() {
  const widget = document.querySelector("[data-xeno-widget]");
  if (!widget) return;

  const launcher = widget.querySelector("[data-xeno-toggle]");
  const panel = widget.querySelector("[data-xeno-panel]");
  const close = widget.querySelector("[data-xeno-close]");
  const status = widget.querySelector("[data-xeno-status]");
  const messagesEl = widget.querySelector("[data-xeno-messages]");
  const form = widget.querySelector("[data-xeno-form]");
  const input = widget.querySelector("[data-xeno-input]");
  const mic = widget.querySelector("[data-xeno-mic]");
  const voiceSelect = widget.querySelector("[data-xeno-voice]");
  const clear = widget.querySelector("[data-xeno-clear]");
  const promptButtons = [...widget.querySelectorAll("[data-xeno-prompt]")];
  const openButtons = [...document.querySelectorAll("[data-xeno-open]")];
  let robotTimer;

  const flashRobot = (className, duration = 700) => {
    window.clearTimeout(robotTimer);
    widget.classList.add(className);
    robotTimer = window.setTimeout(() => widget.classList.remove(className), duration);
  };

  const setRobotState = (className, active) => {
    widget.classList.toggle(className, active);
  };

  const state = {
    history: getStoredHistory(),
    voiceGender: voiceSelect?.value || "robot",
    voices: [],
    busy: false
  };

  const setOpen = open => {
    widget.classList.toggle("is-open", open);
    launcher?.setAttribute("aria-expanded", String(open));
    panel?.setAttribute("aria-hidden", String(!open));
    if (open) {
      flashRobot("is-reacting", 760);
      setTimeout(() => input?.focus(), 180);
    }
  };

  const setStatus = text => {
    if (status) status.textContent = text;
  };

  const scrollToBottom = () => {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };

  const addMessage = (role, text, save = true) => {
    const bubble = document.createElement("div");
    bubble.className = `xeno-message xeno-message--${role}`;
    bubble.textContent = cleanText(text);
    messagesEl.appendChild(bubble);
    scrollToBottom();

    if (save) {
      state.history.push({ role, text: cleanText(text), time: Date.now() });
      storeHistory(state.history);
    }

    return bubble;
  };

  const showTyping = () => {
    const bubble = document.createElement("div");
    bubble.className = "xeno-message xeno-message--assistant";
    bubble.innerHTML = '<span class="xeno-typing" aria-label="Xeno is typing"><i></i><i></i><i></i></span>';
    messagesEl.appendChild(bubble);
    scrollToBottom();
    return bubble;
  };

  const renderHistory = () => {
    messagesEl.innerHTML = "";
    if (!state.history.length) {
      addMessage("assistant", "Hi, I’m Xeno AI Assistant. I’m built into this portfolio to help as a personal recruiter assistant, portfolio guide, and interview helper. Ask me about Abhiram’s skills, projects, certifications, contact details, or why he could be a good fit for a role.", true);
      return;
    }
    state.history.forEach(item => addMessage(item.role, item.text, false));
  };

  const loadVoices = () => {
    state.voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  };

  window.speechSynthesis?.addEventListener("voiceschanged", loadVoices);
  loadVoices();

  async function handleSend(message) {
    const prompt = cleanText(message || input.value);
    if (!prompt || state.busy) return;

    state.busy = true;
    setStatus("Thinking...");
    flashRobot("is-reacting", 620);
    setRobotState("is-thinking", true);
    addMessage("user", prompt);
    input.value = "";
    const typing = showTyping();

    try {
      const reply = await getAssistantResponse(prompt);
      typing.remove();
      addMessage("assistant", reply);
      setRobotState("is-thinking", false);
      setRobotState("is-talking", true);
      speakResponse(reply, state.voiceGender, state.voices, {
        onEnd: () => setRobotState("is-talking", false)
      });
      window.setTimeout(() => setRobotState("is-talking", false), Math.min(6500, Math.max(1800, reply.length * 22)));
      setStatus("Portfolio guide ready");
    } catch {
      typing.remove();
      setRobotState("is-thinking", false);
      const fallback = "I hit an unexpected error, but typed chat still works. Try asking about skills, projects, certifications, or contact details.";
      addMessage("assistant", fallback);
      setStatus("Recovered with fallback");
    } finally {
      state.busy = false;
    }
  }

  function handleVoiceStart() {
    startVoiceInput({
      onStart: () => {
        mic?.classList.add("is-listening");
        flashRobot("is-reacting", 900);
        setStatus("Listening...");
      },
      onResult: transcript => {
        mic?.classList.remove("is-listening");
        setStatus("Voice captured");
        handleSend(transcript);
      },
      onError: message => {
        mic?.classList.remove("is-listening");
        setStatus(message);
        addMessage("assistant", message);
      }
    });
  }

  window.sendMessage = handleSend;
  window.speakResponse = text => speakResponse(text, state.voiceGender, state.voices);

  launcher?.addEventListener("click", () => setOpen(!widget.classList.contains("is-open")));
  close?.addEventListener("click", () => setOpen(false));
  openButtons.forEach(button => button.addEventListener("click", () => setOpen(true)));
  form?.addEventListener("submit", event => {
    event.preventDefault();
    handleSend();
  });
  input?.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  });
  promptButtons.forEach(button => button.addEventListener("click", () => handleSend(button.dataset.xenoPrompt)));
  mic?.addEventListener("click", handleVoiceStart);
  voiceSelect?.addEventListener("change", () => {
    state.voiceGender = voiceSelect.value;
    const voiceLabel = voiceSelect.value === "robot" ? "Robot" : (voiceSelect.value === "female" ? "Female" : "Male");
    setStatus(`${voiceLabel} voice selected`);
  });
  clear?.addEventListener("click", () => {
    state.history = [];
    storeHistory([]);
    renderHistory();
    setStatus("Chat cleared");
  });

  renderHistory();
}

function speakResponse(text, gender = "robot", voices = [], lifecycle = {}) {
  if (!("speechSynthesis" in window)) {
    lifecycle.onEnd?.();
    return;
  }
  const utterance = new SpeechSynthesisUtterance(cleanText(text));
  const availableVoices = voices.length ? voices : window.speechSynthesis.getVoices();
  const preferred = availableVoices.find(voice => {
    const name = voice.name.toLowerCase();
    if (gender === "robot") return /google|microsoft|english|daniel|alex|david|mark|guy|ryan/.test(name);
    return gender === "female"
      ? /female|samantha|victoria|karen|zira|susan|aria|jenny|natasha/.test(name)
      : /male|daniel|alex|david|mark|guy|ryan/.test(name);
  }) || availableVoices.find(voice => voice.lang?.startsWith("en"));

  if (preferred) utterance.voice = preferred;
  utterance.rate = gender === "robot" ? 0.82 : 0.98;
  utterance.pitch = gender === "robot" ? 0.58 : (gender === "female" ? 1.08 : 0.88);
  utterance.onstart = () => lifecycle.onStart?.();
  utterance.onend = () => lifecycle.onEnd?.();
  utterance.onerror = () => lifecycle.onEnd?.();
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function startVoiceInput({ onStart, onResult, onError } = {}) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    onError?.("Voice input is not supported in this browser. Typed chat is fully available.");
    return;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => onStart?.();
    recognition.onresult = event => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript) onResult?.(transcript);
      else onError?.("I could not detect speech. Please try again or type your question.");
    };
    recognition.onerror = event => {
      const message = event.error === "not-allowed"
        ? "Microphone permission was blocked. Allow mic access or use typed chat."
        : "Voice input had trouble starting. Typed chat is available as a fallback.";
      onError?.(message);
    };
    recognition.onend = () => document.querySelector("[data-xeno-mic]")?.classList.remove("is-listening");
    recognition.start();
  } catch {
    onError?.("Voice input could not start. Please try again or use typed chat.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initPortfolio();
  initChat();
});

window.initChat = initChat;
window.sendMessage = window.sendMessage || (() => {});
window.speakResponse = window.speakResponse || speakResponse;
window.startVoiceInput = window.startVoiceInput || startVoiceInput;
