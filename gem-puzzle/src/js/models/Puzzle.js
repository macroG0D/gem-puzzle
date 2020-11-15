import Cell from './Cell';

const newScore = [];
export default class Puzzle {
  constructor(el, dimmension, imageSrc, width) {
    this.parentEl = el;
    this.dimmension = dimmension;
    this.imageSrc = imageSrc;
    this.width = width;
    this.cells = [];
    this.moves = 0;
    this.canResume = false;

    this.x = 0;
    this.lastShuffled = 0;

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

  // setup(showImages, showNumbers) { // рабочий вариант
  //   for (let i = 0; i < this.dimmension * this.dimmension; i += 1) {
  //     this.cells.push(new Cell(this, i, showImages, showNumbers));
  //   }
  //   this.shuffle();
  // }

  setup(showImages, showNumbers) {
    for (let i = 0; i < this.dimmension * this.dimmension; i += 1) {
      this.cells.push(new Cell(this, i, showImages, showNumbers));
      this.cells[i].setPosition(i);
    }
    this.shuffle();

    // this.shuffleInterval = setInterval(() => {
    //   const y = this.newShuffle();
    //   this.swapCells(y.emptyCellIndex, y.randPossibleCell);
    // }, 1200);
  }

  newShuffle() {
    this.x += 1;
    if (this.x >= 10) {
      clearInterval(this.shuffleInterval);
    }

    const emptyCellIndex = this.findEmpty();
    const boardSize = this.cells.length;
    const possibleCells = [];
    let randPossibleCellIndex = 0;
    let randPossibleCell = '';
    // check if top vertical cell is exist
    if (emptyCellIndex + this.dimmension <= boardSize - 1) {
      possibleCells.push(this.cells[emptyCellIndex + this.dimmension]);
    }
    // check if bottom vertical cell is exist
    if (emptyCellIndex - this.dimmension >= 0) {
      possibleCells.push(this.cells[emptyCellIndex - this.dimmension]);
    }
    // check if empty cell is fist in a row
    if (emptyCellIndex % this.dimmension !== 0) {
      possibleCells.push(this.cells[emptyCellIndex - 1]);
    }
    // check if empty cell is last in a arow
    if (emptyCellIndex % this.dimmension !== this.dimmension - 1) {
      possibleCells.push(this.cells[emptyCellIndex + 1]);
    }

    randPossibleCellIndex = Math.floor(
      Math.random() * Math.floor(possibleCells.length),
    );
    console.log('cells length: ', possibleCells.length);
    randPossibleCell = possibleCells[randPossibleCellIndex].index;
    return { emptyCellIndex, randPossibleCell };
  }

  shuffle() {
    for (let i = this.cells.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      this.swapCells(i, j);
    }
  }

  swapCells(i, j) {
    this.cells[i].setPosition(j, i);
    this.cells[j].setPosition(i);
    [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];

    if (this.isAssembled()) {
      this.win();
    }

    // console.log('total time: ', Menu.stopwatch.totalTime);
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

  reset() {
    this.moves = 0;
  }

  win() {
    const timer = document.querySelector('.timer');
    const timerDisplay = timer.children[1];
    const totalTime = timerDisplay.textContent;
    const winnerScreen = document.querySelector('.winnerScreenWrapper');
    winnerScreen.classList.remove('hidden');
    const totalMovesResult = document.querySelector('.totalMovesResult');
    totalMovesResult.textContent = `Moves: ${this.moves}`;
    const totalTimeResult = document.querySelector('.totalTimeResult');
    totalTimeResult.textContent = `Time: ${totalTime}`;
    const boardSize = document.querySelector('.boardSize');
    boardSize.textContent = `Size: ${this.dimmension}x${this.dimmension}`;
    newScore.splice(0, newScore.length); // if array
    newScore.push(this.moves);
    newScore.push(totalTime);
    newScore.push(this.dimmension);
    localStorage.setItem('newScore', newScore);
  }
}
