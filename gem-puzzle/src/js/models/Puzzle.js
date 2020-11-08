import Cell from './Cell';

export default class Puzzle {
  constructor(el, imageSrc, width) {
    this.parentEl = el;
    this.dimmension = 4;
    this.imageSrc = imageSrc;
    this.width = width;
    this.cells = [];

    this.el = this.createWrapper();
    this.init();
    const img = new Image();
    img.onload = () => {
      console.log(img.width, img.height);
      const temp = this.width / img.width;
      this.height = img.height * temp;
      this.el.style.width = `${this.width}px`;
      this.el.style.height = `${this.height}px`;

      this.setup();
    };
    img.src = this.imageSrc;
  }

  init() {
    this.el = this.createWrapper();
    this.parentEl.appendChild(this.el);
  }

  createWrapper() {
    const div = document.createElement('div');
    return div;
  }

  setup() {
    for (let i = 0; i < this.dimmension * this.dimmension - 1; i += 1) {
      this.cells.push(new Cell(this, i));
    }
    this.shuffle();
    console.log(this.cells);
  }

  shuffle() {
    for (let i = this.cells.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
      this.cells[i].setPosition(i);
      this.cells[j].setPosition(j);
    }
  }
}
