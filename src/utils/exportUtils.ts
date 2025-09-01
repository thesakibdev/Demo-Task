export function exportToJSON(state: any) {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "headline.json";
  a.click();
}

export function exportToSnippet(state: any) {
  const snippet = `<h1 style="
    font-size:${state.fontSize}px;
    font-weight:${state.fontWeight};
    line-height:${state.lineHeight};
    letter-spacing:${state.letterSpacing}px;
    ${
      state.gradient.enabled
        ? `background: linear-gradient(${state.gradient.direction}, ${state.gradient.colors[0]}, ${state.gradient.colors[1]}); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`
        : ""
    }
    text-shadow:${state.shadow};
  ">${state.text}</h1>`;
  navigator.clipboard.writeText(snippet);
  alert("Snippet copied to clipboard!");
}
