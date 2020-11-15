export default class Cell {
  constructor(puzzle, index, imagesOn, numbersOn) {
    this.isEmpty = false;
    this.imagesOn = imagesOn; // if imagesOn true — use images, esle use numbers
    this.numbersOn = numbersOn; // if numbersOn true — use numbers, esle use numbers
    this.puzzle = puzzle;
    this.index = index;
    this.width = this.puzzle.width / this.puzzle.dimmension;
    this.height = this.puzzle.height / this.puzzle.dimmension;
    this.el = this.createDiv();

    puzzle.el.appendChild(this.el);
    if (this.index === this.puzzle.dimmension * this.puzzle.dimmension - 1) {
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

    div.onclick = () => {
      const currentCellIndex = this.puzzle.findPosition(this.index);
      const emptyCellIndex = this.puzzle.findEmpty();
      const { x, y } = this.getXY(currentCellIndex);
      const { x: emptyX, y: emptyY } = this.getXY(emptyCellIndex);

      const possibleCells = [];
      // check if top vertical cell is exist

      // check if top vertical cell is exist
      // if (emptyCellIndex + this.puzzle.dimmension <= this.puzzle.cells.length - 1) {
      //   possibleCells.push(this.puzzle.cells[emptyCellIndex + this.puzzle.dimmension]);
      // }

      // if (emptyCellIndex - this.puzzle.dimmension >= 0) {
      //   possibleCells.push(this.puzzle.cells[emptyCellIndex - this.puzzle.dimmension]);
      // }

      // console.log(this.puzzle.cells);
      // console.log(currentCellIndex);
      // console.log(possibleCells.includes(currentCellIndex));
      if (possibleCells.includes(currentCellIndex)) {
        this.puzzle.swapCells(currentCellIndex, emptyCellIndex, true);
      }
      // console.log(possibleCells);
      if ((x === emptyX || y === emptyY)
      && (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)) {
        this.puzzle.moves += 1;
        const movesCounter = document.querySelector('.movesCounter');
        movesCounter.children[1].textContent = this.puzzle.moves;
        this.puzzle.swapCells(currentCellIndex, emptyCellIndex, true);
      }
    };

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
      x: index % this.puzzle.dimmension,
      y: Math.floor(index / this.puzzle.dimmension),
    };
  }
}
