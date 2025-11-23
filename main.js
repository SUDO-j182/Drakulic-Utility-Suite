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
    else if (tool === "color-tools") {
      renderColorTools();
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
// TEXT ANALYZER
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

  // Elements
  const input = document.getElementById("ta-input");
  const chars = document.getElementById("ta-chars");
  const words = document.getElementById("ta-words");
  const sentences = document.getElementById("ta-sentences");

  input.addEventListener("input", () => {
    const text = input.value;

    // Character count
    chars.textContent = text.length;

    // Word count
    const wordList = text.trim().split(/\s+/).filter(w => w.length > 0);
    words.textContent = text.trim() === "" ? 0 : wordList.length;

    // Sentence count
    const sentenceList = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    sentences.textContent = sentenceList.length;
  });
}

// ============================================================
// COLOR TOOLS (HEX ⇄ RGB + PREVIEW)
// ============================================================

function renderColorTools() {
  panel.innerHTML = `
    <h2>Color Tools</h2>

    <div class="tool-card">

      <div class="field">
        <label for="hex-input">HEX</label>
        <input type="text" id="hex-input" placeholder="#3498db or 3498db">
      </div>

      <div class="field">
        <label for="rgb-input">RGB</label>
        <input type="text" id="rgb-input" placeholder="52, 152, 219">
      </div>

      <div class="color-row">
        <button id="hex-to-rgb">HEX → RGB</button>
        <button id="rgb-to-hex">RGB → HEX</button>

        <div class="color-preview" id="color-preview">
          <span>Preview</span>
        </div>
      </div>

      <p id="color-message" class="helper-text"></p>
    </div>
  `;

  const hexInput = document.getElementById("hex-input");
  const rgbInput = document.getElementById("rgb-input");
  const msg = document.getElementById("color-message");
  const preview = document.getElementById("color-preview");

  const hexToRgbBtn = document.getElementById("hex-to-rgb");
  const rgbToHexBtn = document.getElementById("rgb-to-hex");

  function setPreview(color) {
    preview.style.background = color;
  }

  function showMessage(text, isError = false) {
    msg.textContent = text;
    msg.style.color = isError ? "red" : "green";
  }

  function parseHex(hex) {
    let value = hex.trim();
    if (value.startsWith("#")) value = value.slice(1);

    if (!/^[0-9a-fA-F]{6}$/.test(value)) {
      return null;
    }

    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);

    return { r, g, b };
  }

  function parseRgb(str) {
    const value = str.trim();
    // allow "r, g, b" or "r g b"
    const parts = value.split(/[\s,]+/).filter(Boolean);
    if (parts.length !== 3) return null;

    const nums = parts.map(n => parseInt(n, 10));
    if (nums.some(n => Number.isNaN(n) || n < 0 || n > 255)) {
      return null;
    }

    const [r, g, b] = nums;
    return { r, g, b };
  }

  hexToRgbBtn.addEventListener("click", () => {
    const hex = hexInput.value;
    const rgb = parseHex(hex);

    if (!rgb) {
      showMessage("Invalid HEX color. Use 6 hex digits.", true);
      return;
    }

    rgbInput.value = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    setPreview(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
    showMessage("Converted HEX → RGB.");
  });

  rgbToHexBtn.addEventListener("click", () => {
    const rgb = parseRgb(rgbInput.value);

    if (!rgb) {
      showMessage("Invalid RGB format. Use e.g. 52, 152, 219.", true);
      return;
    }

    const toHex = (n) => n.toString(16).padStart(2, "0");
    const hex = `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;

    hexInput.value = hex;
    setPreview(hex);
    showMessage("Converted RGB → HEX.");
  });
}




