(function () {
  const buttons = Array.from(document.querySelectorAll("[data-language-button]"));
  const panels = Array.from(document.querySelectorAll("[data-language-panel]"));

  function setLanguage(language) {
    document.documentElement.lang = language === "en" ? "en" : "zh-Hans";

    buttons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        button.dataset.languageButton === language ? "true" : "false"
      );
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.languagePanel !== language;
    });

    try {
      localStorage.setItem("kraft-puzzles-language", language);
    } catch (_) {
      // The language switch remains functional when storage is unavailable.
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.languageButton));
  });

  let preferredLanguage = "zh";
  let storedLanguage = null;
  try {
    storedLanguage = localStorage.getItem("kraft-puzzles-language");
  } catch (_) {
    // Browser storage can be disabled; language detection still works.
  }

  preferredLanguage = storedLanguage ||
    (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");

  setLanguage(preferredLanguage === "en" ? "en" : "zh");
})();
