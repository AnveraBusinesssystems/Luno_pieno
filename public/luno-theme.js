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

  const ensureInterface = () => {
    if (!document.querySelector(".luno-night-orbit")) {
      const orbit = document.createElement("span");
      orbit.className = "luno-night-orbit";
      orbit.setAttribute("aria-hidden", "true");
      document.body.prepend(orbit);
    }

    document.querySelectorAll(".cover-image, .lookbook-media img, .atelier-image img, .postcard img, .signature-image img").forEach((image) => {
      image.classList.add("luno-theme-image");
    });

    const tools = document.querySelector(".concept-tools");
    if (tools && !tools.querySelector("[data-theme-toggle]")) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "luno-theme-toggle";
      button.dataset.themeToggle = "";
      button.innerHTML = '<span class="luno-theme-toggle__moon" aria-hidden="true"></span><span class="luno-theme-toggle__label" data-theme-label>Night</span>';
      tools.prepend(button);
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

  const bindControls = () => {
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      if (button.dataset.themeBound) return;
      button.dataset.themeBound = "true";
      button.addEventListener("click", () => {
        const next = root.dataset.theme === "night" ? "day" : "night";
        try { localStorage.setItem(storageKey, next); } catch {}
        applyTheme(next, "manual");
      });
    });
  };

  const initialize = () => {
    ensureInterface();
    bindControls();
    const saved = savedPreference();
    applyTheme(saved ?? automaticTheme(), saved ? "manual" : "automatic");

    window.setInterval(() => {
      if (!savedPreference()) applyTheme(automaticTheme(), "automatic");
    }, 60_000);
  };

  const initialSaved = savedPreference();
  applyTheme(initialSaved ?? automaticTheme(), initialSaved ? "manual" : "automatic");

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
