(() => {
  const root = document.documentElement;
  const storageKey = "luno-theme-preference";
  const dayStart = 8;
  const nightStart = 18;

  const automaticTheme = () => {
    const hour = new Date().getHours();
    return hour >= dayStart && hour < nightStart ? "day" : "night";
  };

  const savedPreference = () => {
    try {
      const value = localStorage.getItem(storageKey);
      return value === "day" || value === "night" ? value : null;
    } catch {
      return null;
    }
  };

  const updateThemeColor = (theme) => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "night" ? "#07111c" : "#111513");
  };

  const updateControls = (theme) => {
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const next = theme === "day" ? "night" : "day";
      button.setAttribute("aria-label", `Switch to ${next} mode`);
      button.setAttribute("title", `Switch to ${next} mode`);
      const label = button.querySelector("[data-theme-label]");
      if (label) label.textContent = theme === "day" ? "Night" : "Day";
    });
  };

  const applyTheme = (theme, source = "automatic") => {
    root.dataset.theme = theme;
    root.dataset.themeSource = source;
    updateThemeColor(theme);
    updateControls(theme);
    window.dispatchEvent(new CustomEvent("luno:themechange", { detail: { theme, source } }));
  };

  const initialize = () => {
    const saved = savedPreference();
    applyTheme(saved ?? automaticTheme(), saved ? "manual" : "automatic");

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const next = root.dataset.theme === "night" ? "day" : "night";
        try { localStorage.setItem(storageKey, next); } catch {}
        applyTheme(next, "manual");
      });
    });

    document.querySelectorAll("[data-theme-reset]").forEach((button) => {
      button.addEventListener("click", () => {
        try { localStorage.removeItem(storageKey); } catch {}
        applyTheme(automaticTheme(), "automatic");
      });
    });

    window.setInterval(() => {
      if (!savedPreference()) applyTheme(automaticTheme(), "automatic");
    }, 60_000);
  };

  applyTheme(savedPreference() ?? automaticTheme(), savedPreference() ? "manual" : "automatic");

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
