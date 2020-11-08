export default class Cell {
  constructor(puzzle, index) {
    this.puzzle = puzzle;
    this.index = index;
    this.width = this.puzzle.width / this.puzzle.dimmension;
    this.height = this.puzzle.height / this.puzzle.dimmension;
    this.el = this.createDiv();

    puzzle.el.appendChild(this.el);
  }

  createDiv() {
    const div = document.createElement('div');

    const left = this.width * (this.index % this.puzzle.dimmension);
    const top = this.height * Math.floor(this.index / this.puzzle.dimmension);

    div.classList.add('cell');
    div.style.backgroundImage = `url(${this.puzzle.imageSrc})`;
    div.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;
    div.style.backgroundPosition = `-${left}px -${top}px`;
    div.textContent = this.index + 1;

    return div;
  }

  setPosition(index) {
    const { left, top } = this.getPositionFromIndex(index);

    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }

  getPositionFromIndex(index) {
    return {
      left: this.width * (index % this.puzzle.dimmension),
      top: this.height * (Math.floor(index / this.puzzle.dimmension)),
    };
  }
}
