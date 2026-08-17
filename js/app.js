const DISCORD_URL = "https://discord.gg/yDYkQhDrzt";
const LANG_KEY = "hru-language";

const I18N = {
  pl: {
    meta: "Arma 3 Semi-MilSim · PL / EN",
    badge: "Portal w budowie",
    lead: "Od 2020 roku tworzymy społeczność opartą na współpracy, szkoleniu i wspólnym graniu. High Readiness Unit to miejsce dla tych, którzy chcą czegoś więcej niż przypadkowej misji.",
    status:
      "Pełna strona High Readiness Unit jest obecnie w trakcie budowy. Ta wersja pełni jedynie funkcję naszej wizytówki — wkrótce znajdziesz tutaj więcej informacji o jednostce, strukturze, szkoleniach, operacjach oraz możliwościach dołączenia.",
    progressLabel: "Strona główna",
    discord: "Discord HRU",
    legal: "Not affiliated with Bohemia Interactive or any real-world military organisation.",
  },
  en: {
    meta: "Arma 3 Semi-MilSim · PL / EN",
    badge: "Portal under construction",
    lead: "Since 2020, we have been building a community focused on teamwork, training and playing together. High Readiness Unit is a place for those looking for more than just another random mission.",
    status:
      "The full High Readiness Unit website is currently under construction. This version serves only as a temporary introduction to the unit. More information about our structure, training, operations and recruitment will be available here once the full website is launched.",
    progressLabel: "Main website",
    discord: "HRU Discord",
    legal: "Not affiliated with Bohemia Interactive or any real-world military organisation.",
  },
};

const detectLang = () => {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === "pl" || stored === "en") return stored;
  return (navigator.language || "pl").toLowerCase().startsWith("en") ? "en" : "pl";
};

const applyLang = (lang) => {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  const copy = I18N[lang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = copy[el.dataset.i18n];
    if (value) el.textContent = value;
  });

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  applyLang(detectLang());

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });

  document.querySelectorAll("[data-discord]").forEach((el) => {
    el.href = DISCORD_URL;
  });
});
