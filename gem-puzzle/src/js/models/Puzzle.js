import Cell from './Cell';

export default class Puzzle {
  constructor(el, dimmension, imageSrc, width) {
    this.parentEl = el;
    this.dimmension = dimmension;
    this.imageSrc = imageSrc;
    this.width = width;
    this.cells = [];
    this.moves = 0;

    this.el = this.createWrapper();
    this.init();
    const img = new Image();
    img.onload = () => {
      const temp = this.width / img.width;
      this.height = img.height * temp;
      this.el.style.width = `${this.width}px`;
      this.el.style.height = `${this.height}px`;

      this.setup(this.showImages, this.showNumbers);
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

  setup(showImages, showNumbers) {
    for (let i = 0; i < this.dimmension * this.dimmension; i += 1) {
      this.cells.push(new Cell(this, i, showImages, showNumbers));
    }
    this.shuffle();
  }

  shuffle() {
    for (let i = this.cells.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      this.swapCells(i, j);
    }
  }

  swapCells(i, j, animate) {
    this.cells[i].setPosition(j, animate, i);
    this.cells[j].setPosition(i);
    [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];

    if (this.isAssembled()) {
      console.log('Win!');
      console.log('total moves: ', this.moves);
    }
  }

  isAssembled() {
    for (let i = 0; i < this.cells.length; i += 1) {
      if (i !== this.cells[i].index) {
        return false;
      }
    }
    return true;
  }

  findPosition(ind) {
    return this.cells.findIndex((cell) => cell.index === ind);
  }

  findEmpty() {
    return this.cells.findIndex((cell) => cell.isEmpty);
  }
}
