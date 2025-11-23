console.log("Utility Suite Loaded");

const buttons = document.querySelectorAll(".tool-list button");
const panel = document.querySelector(".tool-panel");

// ============================================================
// TOOL SWITCHING
// ============================================================

buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    // highlight active button
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const tool = btn.dataset.tool;

    if (tool === "password") {
      renderPasswordTool();
    }
    else if (tool === "text-analyzer") {
      renderTextAnalyzer();
    }
    else {
      renderPlaceholder(tool, btn.textContent);
    }
  });
});

// ============================================================
// PLACEHOLDER (for tools not yet built)
// ============================================================

function renderPlaceholder(toolKey, label) {
  panel.innerHTML = `
    <h2>${label}</h2>
    <p>This tool is coming soon.</p>
  `;
}

// ============================================================
// PASSWORD GENERATOR
// ============================================================

function renderPasswordTool() {
  panel.innerHTML = `
    <h2>Password Generator</h2>
    <div class="tool-card">

      <div class="field">
        <label for="pw-length">Length</label>
        <div class="range-row">
          <input type="range" id="pw-length" min="4" max="32" value="12">
          <span id="pw-length-value">12</span>
        </div>
      </div>

      <div class="field options">
        <span>Include:</span>
        <label><input type="checkbox" id="pw-lower" checked> Lowercase</label>
        <label><input type="checkbox" id="pw-upper" checked> Uppercase</label>
        <label><input type="checkbox" id="pw-numbers" checked> Numbers</label>
        <label><input type="checkbox" id="pw-symbols"> Symbols</label>
      </div>

      <div class="field">
        <label for="pw-output">Generated Password</label>
        <input type="text" id="pw-output" readonly>
      </div>

      <div class="actions">
        <button id="pw-generate">Generate</button>
        <button id="pw-copy">Copy</button>
      </div>

      <p id="pw-message" class="helper-text"></p>
    </div>
  `;

  // element references
  const lenSlider = document.getElementById("pw-length");
  const lenValue = document.getElementById("pw-length-value");
  const out = document.getElementById("pw-output");
  const msg = document.getElementById("pw-message");

  const lower = document.getElementById("pw-lower");
  const upper = document.getElementById("pw-upper");
  const numbers = document.getElementById("pw-numbers");
  const symbols = document.getElementById("pw-symbols");

  const generateBtn = document.getElementById("pw-generate");
  const copyBtn = document.getElementById("pw-copy");

  // update displayed length
  lenSlider.addEventListener("input", () => {
    lenValue.textContent = lenSlider.value;
  });

  // generate password
  generateBtn.addEventListener("click", () => {
    const length = parseInt(lenSlider.value);

    const chars = {
      lower: "abcdefghijklmnopqrstuvwxyz",
      upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+{}[]<>?/|~"
    };

    let pool = "";

    if (lower.checked) pool += chars.lower;
    if (upper.checked) pool += chars.upper;
    if (numbers.checked) pool += chars.numbers;
    if (symbols.checked) pool += chars.symbols;

    if (!pool.length) {
      msg.textContent = "Select at least one character type.";
      msg.style.color = "red";
      out.value = "";
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      password += pool[idx];
    }

    out.value = password;
    msg.textContent = "Password generated!";
    msg.style.color = "green";
  });

  // copy to clipboard
  copyBtn.addEventListener("click", () => {
    if (!out.value) {
      msg.textContent = "Generate a password first.";
      msg.style.color = "red";
      return;
    }

    navigator.clipboard.writeText(out.value);
    msg.textContent = "Copied!";
    msg.style.color = "green";
  });
}

// ============================================================
// TEXT ANALYZER (UI ONLY for now)
// ============================================================

function renderTextAnalyzer() {
  panel.innerHTML = `
    <h2>Text Analyzer</h2>

    <div class="tool-card">

      <div class="field">
        <label for="ta-input">Enter Text</label>
        <textarea id="ta-input" rows="6" placeholder="Type or paste your text here..."></textarea>
      </div>

      <div class="stats">
        <div><strong>Characters:</strong> <span id="ta-chars">0</span></div>
        <div><strong>Words:</strong> <span id="ta-words">0</span></div>
        <div><strong>Sentences:</strong> <span id="ta-sentences">0</span></div>
      </div>

    </div>
  `;
}


