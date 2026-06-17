/**
 * ui/layerEditor.js
 * Manages the layer list UI — add, remove, drag-to-reorder
 */

const DEFAULT_LAYERS = [
  { type: 'dense', units: 8,  activation: 'relu',    id: crypto.randomUUID() },
  { type: 'dense', units: 16, activation: 'relu',    id: crypto.randomUUID() },
  { type: 'dense', units: 8,  activation: 'relu',    id: crypto.randomUUID() },
];

export class LayerEditor {
  constructor(listEl, typeSelect, addBtn, paramCountEl, layerCountEl, onChange) {
    this.listEl = listEl;
    this.typeSelect = typeSelect;
    this.addBtn = addBtn;
    this.paramCountEl = paramCountEl;
    this.layerCountEl = layerCountEl;
    this.onChange = onChange;
    this.layers = [...DEFAULT_LAYERS];
    this.dragSrc = null;

    addBtn.addEventListener('click', () => this.addLayer());
    this.render();
  }

  getLayers() { return this.layers; }

  addLayer() {
    const type = this.typeSelect.value;
    const layer = { type, id: crypto.randomUUID() };
    if (type === 'dense') { layer.units = 8; layer.activation = 'relu'; }
    if (type === 'dropout') { layer.rate = 0.3; }
    if (type === 'activation') { layer.activation = 'relu'; }
    this.layers.push(layer);
    this.render();
    this.onChange(this.layers);
  }

  removeLayer(id) {
    this.layers = this.layers.filter(l => l.id !== id);
    this.render();
    this.onChange(this.layers);
  }

  render() {
    this.listEl.innerHTML = '';
    this.layers.forEach((layer, i) => {
      const item = document.createElement('div');
      item.className = `layer-item layer-type-${layer.type}`;
      item.draggable = true;
      item.dataset.idx = i;

      let sublabel = '';
      if (layer.type === 'dense') sublabel = `${layer.units} units · ${layer.activation}`;
      if (layer.type === 'dropout') sublabel = `rate ${layer.rate}`;
      if (layer.type === 'activation') sublabel = layer.activation;

      item.innerHTML = `
        <div>
          <div class="layer-item-label">${layer.type}</div>
          <div class="layer-item-sub">${sublabel}</div>
        </div>
        <button class="layer-remove" data-id="${layer.id}" title="Remove">×</button>
      `;

      item.querySelector('.layer-remove').addEventListener('click', e => {
        e.stopPropagation();
        this.removeLayer(layer.id);
      });

      // Drag events
      item.addEventListener('dragstart', e => {
        this.dragSrc = i;
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      item.addEventListener('dragend', () => item.classList.remove('dragging'));
      item.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
      item.addEventListener('drop', e => {
        e.preventDefault();
        if (this.dragSrc === null || this.dragSrc === i) return;
        const moved = this.layers.splice(this.dragSrc, 1)[0];
        this.layers.splice(i, 0, moved);
        this.dragSrc = null;
        this.render();
        this.onChange(this.layers);
      });

      this.listEl.appendChild(item);
    });

    this.layerCountEl.textContent = this.layers.length;
  }

  updateParamCount(n) {
    this.paramCountEl.textContent = n >= 1000 ? (n / 1000).toFixed(1) + 'k' : n;
  }
}
