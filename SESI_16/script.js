const themeToggle = document.querySelector(".theme-toggle");
const languageButtons = document.querySelectorAll("[data-language]");
const loreCard = document.querySelector(".lore-card");
const guideButton = document.querySelector(".start-button");
const guideHeading = document.querySelector("#guide");
const introHeading = document.querySelector(".wassup-guys");
const quizHint = document.querySelector(".quiz-hint");
const quizForm = document.querySelector(".quiz-form");
const quizQuestions = quizForm ? [...quizForm.querySelectorAll(".quiz-question")] : [];
const quizNextButton = quizForm?.querySelector(".quiz-next");
const quizProgress = quizForm?.querySelector(".quiz-progress");
const quizResult = document.querySelector(".quiz-result");
const quizScore = quizResult?.querySelector(".quiz-score");
const quizReset = quizForm?.querySelector(".quiz-reset");
const quizRestart = quizResult?.querySelector(".quiz-restart");
let currentQuizQuestion = 0;
let quizScoreCount = 0;

const translations = {
    en: {
        "nav.about": "About",
        "nav.socials": "Socials",
        "nav.home": "Home",
        "nav.quiz": "Quiz",
        "brand.home": "FISCH home",
        "language.choose": "Choose language",
        "theme.light": "☀️",
        "theme.dark": "🌙",
        "theme.switchToLight": "Switch to light mode",
        "theme.switchToDark": "Switch to dark mode",
        "lore.summary": "My Guide",
        "guide.title": "ok now heres the actual guide",
        "guide.level1": "noob level 1-500",
        "guide.level2": "noob level 501-1000",
        "guide.level3": "noob level 1001-1500",
        "footer.follow": "Find me online",
        "social.roblox": "Roblox profile",
        "social.youtube": "YouTube channel",
        "home.intro": "Welcome to my guide! Here's my Fisch guide.",
        "home.description": "Fisch is a Roblox experience created by Canadian video game developer WoozyNate. It was officially released on October 5, 2024. It's an open-world adventure game where the main goal is to catch fish, earn money, complete your Bestiary, and finish quests.",
        "about.title": "About Me",
        "about.intro": "Hi, I'm Abam.",
        "about.hobbies": "I like playing games and coding, especially Roblox!",
        "about.favorite": "Fisch is my favorite Roblox adventure!",
        "about.goal": "I try to make guides for other players!",
        "quiz.title": "FISCH Quiz",
        "quiz.instructions": "Pick the correct answer for each question.",
        "quiz.next": "Next question",
        "quiz.seeResults": "See results",
        "quiz.reset": "Start over",
        "quiz.complete": "Quiz complete!",
        "quiz.playAgain": "Play again",
        "quiz.progress": "Question {current} of {total}",
        "quiz.score": "You scored {score} out of {total}.",
        "quiz.question1": "Who is the developer of FISCH?",
        "quiz.question1.optionA": "WoozyNate",
        "quiz.question1.optionB": "Bamrahe",
        "quiz.question1.optionC": "WoozyBam",
        "quiz.question1.optionD": "FischNate",
        "quiz.question2": "What do players mainly catch in Fisch?",
        "quiz.question2.optionA": "Fish",
        "quiz.question2.optionB": "Butterflies",
        "quiz.question2.optionC": "Rocks",
        "quiz.question2.optionD": "Flowers",
        "quiz.question3": "Where can you check which fish you have caught?",
        "quiz.question3.optionA": "The Bestiary",
        "quiz.question3.optionB": "The map legend",
        "quiz.question3.optionC": "The boat menu",
        "quiz.question3.optionD": "The settings menu",
    },
    id: {
        "nav.about": "Tentang",
        "nav.socials": "Sosial",
        "nav.home": "Beranda",
        "nav.quiz": "Kuis",
        "brand.home": "Beranda FISCH",
        "language.choose": "Pilih bahasa",
        "theme.light": "☀️",
        "theme.dark": "🌙",
        "theme.switchToLight": "Ganti ke mode terang",
        "theme.switchToDark": "Ganti ke mode gelap",
        "lore.summary": "Panduan Saya",
        "guide.title": "oke, ini panduan yang sebenarnya",
        "guide.level1": "Pemula level 1-500",
        "guide.level2": "Pemula level 501-1000",
        "guide.level3": "Pemula level 1001-1500",
        "footer.follow": "Temukan saya online",
        "social.roblox": "Profil Roblox",
        "social.youtube": "Kanal YouTube",
        "home.intro": "Hai semuanya, selamat datang di panduan saya! Berikut panduan Fisch saya.",
        "home.description": "Fisch adalah pengalaman Roblox yang dibuat oleh pengembang gim asal Kanada, WoozyNate. Gim ini resmi dirilis pada 5 Oktober 2024. Fisch adalah gim petualangan dunia terbuka yang tujuan utamanya adalah menangkap ikan, mendapatkan uang, melengkapi Bestiary, dan menyelesaikan misi.",
        "about.title": "Tentang Saya",
        "about.intro": "Hai, saya Abam.",
        "about.hobbies": "Saya suka bermain gim dan membuat kode, terutama Roblox!",
        "about.favorite": "Fisch adalah petualangan Roblox favorit saya!",
        "about.goal": "Saya mencoba membuat panduan untuk pemain lain!",
        "quiz.title": "Kuis FISCH",
        "quiz.instructions": "Pilih jawaban yang benar untuk setiap pertanyaan.",
        "quiz.next": "Pertanyaan berikutnya",
        "quiz.seeResults": "Lihat hasil",
        "quiz.reset": "Mulai lagi",
        "quiz.complete": "Kuis selesai!",
        "quiz.playAgain": "Main lagi",
        "quiz.progress": "Pertanyaan {current} dari {total}",
        "quiz.score": "Skormu {score} dari {total}.",
        "quiz.question1": "Siapa pengembang FISCH?",
        "quiz.question1.optionA": "WoozyNate",
        "quiz.question1.optionB": "Bamrahe",
        "quiz.question1.optionC": "WoozyBam",
        "quiz.question1.optionD": "FischNate",
        "quiz.question2": "Apa yang terutama ditangkap pemain di Fisch?",
        "quiz.question2.optionA": "Ikan",
        "quiz.question2.optionB": "Kupu-kupu",
        "quiz.question2.optionC": "Batu",
        "quiz.question2.optionD": "Bunga",
        "quiz.question3": "Di mana kamu bisa melihat ikan yang sudah ditangkap?",
        "quiz.question3.optionA": "Bestiary",
        "quiz.question3.optionB": "Legenda peta",
        "quiz.question3.optionC": "Menu perahu",
        "quiz.question3.optionD": "Menu pengaturan",
    },
};

function animateTypingHeading(heading) {
    if (!heading || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const headingText = heading.textContent.trim();
    const animatedText = document.createElement("span");
    animatedText.setAttribute("aria-hidden", "true");
    heading.setAttribute("aria-label", headingText);
    heading.classList.add("typing-active");

    [...headingText].forEach((character, index) => {
        const characterElement = document.createElement("span");
        characterElement.className = "typed-character";
        characterElement.style.animationDelay = `${index * 24}ms`;
        characterElement.textContent = character;
        animatedText.append(characterElement);
    });

    heading.replaceChildren(animatedText);
}

animateTypingHeading(introHeading);

function setLanguage(language) {
    const words = translations[language];
    if (!words) {
        return;
    }

    document.documentElement.lang = language;
    localStorage.setItem("site-language", language);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const translation = words[element.dataset.i18n];
        if (translation) {
            element.textContent = translation;
        }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
        const translation = words[element.dataset.i18nAriaLabel];
        if (translation) {
            element.setAttribute("aria-label", translation);
        }
    });
    languageButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.language === language));
    });
    animateTypingHeading(introHeading?.dataset.i18n ? introHeading : null);
    updateQuizView();
    updateThemeLabel();
}

function updateThemeLabel() {
    if (!themeToggle) {
        return;
    }

    const language = document.documentElement.lang;
    const words = translations[language];
    const isDark = document.body.dataset.theme === "dark";
    themeToggle.textContent = isDark ? words["theme.light"] : words["theme.dark"];
    themeToggle.setAttribute(
        "aria-label",
        isDark ? words["theme.switchToLight"] : words["theme.switchToDark"]
    );
}

themeToggle?.addEventListener("click", () => {
    document.body.dataset.theme =
        document.body.dataset.theme === "dark" ? "light" : "dark";
    updateThemeLabel();
});

languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
});

const savedLanguage = localStorage.getItem("site-language");
if (savedLanguage) {
    setLanguage(savedLanguage);
}

if (guideButton && loreCard && guideHeading) {
    guideButton.addEventListener("click", () => {
        loreCard.open = false;
        guideHeading.scrollIntoView({ behavior: "smooth", block: "center" });
    });
}

function updateQuizView() {
    if (!quizForm || quizQuestions.length === 0) {
        return;
    }

    const words = translations[document.documentElement.lang];
    quizQuestions.forEach((question, index) => {
        question.hidden = index !== currentQuizQuestion;
        question.disabled = index !== currentQuizQuestion;
    });

    quizProgress.textContent = words["quiz.progress"]
        .replace("{current}", String(currentQuizQuestion + 1))
        .replace("{total}", String(quizQuestions.length));
    const buttonKey = currentQuizQuestion === quizQuestions.length - 1
        ? "quiz.seeResults"
        : "quiz.next";
    quizNextButton.dataset.i18n = buttonKey;
    quizNextButton.textContent = words[buttonKey];

    if (!quizResult.hidden) {
        quizScore.textContent = words["quiz.score"]
            .replace("{score}", String(quizScoreCount))
            .replace("{total}", String(quizQuestions.length));
    }
}

function resetQuiz() {
    quizForm.reset();
    currentQuizQuestion = 0;
    quizScoreCount = 0;
    introHeading.hidden = false;
    quizHint.hidden = false;
    quizForm.hidden = false;
    quizResult.hidden = true;
    updateQuizView();
    quizQuestions[0].querySelector("legend").focus();
}

if (quizForm && quizQuestions.length > 0) {
    updateQuizView();
    quizForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const currentQuestion = quizQuestions[currentQuizQuestion];
        const selectedAnswer = currentQuestion.querySelector('input[type="radio"]:checked');
        if (!selectedAnswer) {
            return;
        }

        if (selectedAnswer.value === currentQuestion.dataset.correctAnswer) {
            quizScoreCount += 1;
        }

        if (currentQuizQuestion === quizQuestions.length - 1) {
            introHeading.hidden = true;
            quizHint.hidden = true;
            quizForm.hidden = true;
            quizResult.hidden = false;
            updateQuizView();
            quizResult.querySelector("h2").focus();
            return;
        }

        currentQuizQuestion += 1;
        updateQuizView();
        quizQuestions[currentQuizQuestion].querySelector("legend").focus();
    });

    quizReset.addEventListener("click", resetQuiz);
    quizRestart.addEventListener("click", resetQuiz);
}
