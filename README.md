# ⬡ Neural Playground

> A visual ML experimentation studio that runs **100% in the browser** — no backend, no install, no Python.

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/c1d1974e-ef69-41c7-bbdd-9a5f468b5beb" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/88c33546-df0f-4c67-9f0b-1d93f10882b7" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/ad7e74e0-d15f-4cf3-bbde-914a570c8807" />

**[Live Demo →]https://neural-playground-blush.vercel.app/

---

## What it does

- **Build** a neural network by dragging and dropping layers
- **Train** it on classic 2D datasets (XOR, spirals, moons, circles)
- **Watch** the decision boundary update in real time as the model learns
- **Draw** a point on canvas and run manual inference
- **Save / load** models using IndexedDB — your models persist between sessions
- **Export** trained weights as JSON for sharing or further use

All training runs via **TensorFlow.js** in the main thread with async epoch callbacks — no backend required.

---

## Tech stack

| Concern | Tool |
|---|---|
| ML engine | TensorFlow.js 4.x |
| Rendering | Canvas 2D API |
| Storage | IndexedDB (via TF.js adapter) |
| Build | Vite (or run without a build step) |
| Language | Vanilla JS (ES2022 modules) |
| Styling | Pure CSS with custom properties |

No React, no Vue, no Webpack. Intentionally framework-free.

---

## Project structure

```
neural-playground/
├── index.html
└── src/
    ├── main.js              # App entry point, wires everything together
    ├── core/
    │   └── model.js         # TF.js model builder, trainer, persistence
    ├── canvas/
    │   ├── renderers.js     # Decision boundary, loss/acc charts, network graph
    │   └── drawCanvas.js    # Mouse/touch drawing for manual inference
    ├── data/
    │   └── datasets.js      # XOR, spirals, moons, circles generators
    └── ui/
        ├── layerEditor.js   # Drag-to-reorder layer list
        └── styles.css       # All styling
```

---

## Getting started

### No build step (CDN)
Just open `index.html` in any modern browser. TensorFlow.js loads via CDN.

```bash
git clone https://github.com/your-username/neural-playground
cd neural-playground
open index.html      # or serve with any static file server
```

### With Vite
```bash
npm create vite@latest neural-playground -- --template vanilla
# Replace src/ and index.html with the files from this repo
npm install
npm run dev
```

---

## Features in depth

### Layer editor
- Add **Dense**, **Dropout**, and **Activation** layers
- Drag to reorder — model rebuilds instantly
- Live parameter count updates

### Datasets
| Dataset | Description |
|---|---|
| XOR | Non-linearly separable quadrants |
| Spirals | Two interleaved spirals — tests depth |
| Moons | Two half-moon shapes |
| Circles | Concentric circles — tests radius learning |

Control noise level and point count with sliders.

### Training
- Optimizer: Adam / SGD / RMSProp
- Live loss + accuracy charts update each epoch
- Decision boundary re-renders every 5 epochs
- Stop training mid-run without losing progress

### Draw canvas
Draw anywhere on the right panel canvas. Hit **Run Inference** to see which class the model assigns — with confidence score.

---

## Ideas for extension

- [ ] Add Conv1D layers for sequence data
- [ ] Upload custom CSV datasets
- [ ] Visualize per-layer activation values (feature maps)
- [ ] WASM backend for faster training
- [ ] Multi-class support (softmax output)
- [ ] Gradient flow visualization (explainability)

---

## License

MIT — use it, fork it, extend it.
