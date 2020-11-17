export default class Cell {
  constructor(puzzle, index, imagesOn, numbersOn) {
    this.isEmpty = false;
    this.imagesOn = imagesOn; // if imagesOn true — use images, esle use numbers
    this.numbersOn = numbersOn; // if numbersOn true — use numbers, esle use numbers
    this.puzzle = puzzle;
    this.index = index;
    this.width = this.puzzle.width / this.puzzle.dimension;
    this.height = this.puzzle.height / this.puzzle.dimension;
    this.el = this.createDiv();
    this.moveSound = new Audio('./assets/sounds/puzzle_move.mp3');
    this.moveSound.volume = 0.8;

    // eslint-disable-next-line no-unused-expressions
    this.draggedCellIndex;

    puzzle.el.appendChild(this.el);
    if (this.index === this.puzzle.dimension * this.puzzle.dimension - 1) {
      this.el.classList.add('cell__empty');
      this.isEmpty = true;
      return;
    }
    this.setImage();
  }

  createDiv() {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;

    // click on cells
    div.addEventListener('click', () => {
      const currentCellIndex = this.puzzle.findPosition(this.index);
      const emptyCellIndex = this.puzzle.findEmpty();
      const { x, y } = this.getXY(currentCellIndex);
      const { x: emptyX, y: emptyY } = this.getXY(emptyCellIndex);

      if ((x === emptyX || y === emptyY)
      && (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)) {
        if (this.puzzle.sound) {
          this.moveSound.play();
        }
        this.puzzle.moves += 1;
        const movesCounter = document.querySelector('.movesCounter');
        movesCounter.children[1].textContent = this.puzzle.moves;
        this.puzzle.swapCells(currentCellIndex, emptyCellIndex);
      }
    });
    return div;
  }

  setImage() {
    const { x, y } = this.getXY(this.index);
    const left = this.width * x;
    const top = this.height * y;
    if (this.imagesOn) {
      this.el.style.backgroundImage = `url(${this.puzzle.imageSrc})`;
    }
    if (this.numbersOn) {
      this.el.textContent = this.index + 1;
    }

    this.el.style.backgroundPosition = `-${left}px -${top}px`;
    this.el.classList.add('cell__existing');
  }

  setPosition(index) {
    const { left, top } = this.getPositionFromIndex(index);
    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }

  getPositionFromIndex(index) {
    const { x, y } = this.getXY(index);
    return {
      left: this.width * x,
      top: this.height * y,
    };
  }

  getXY(index) {
    return {
      x: index % this.puzzle.dimension,
      y: Math.floor(index / this.puzzle.dimension),
    };
  }
}
