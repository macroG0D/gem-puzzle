import Cell from './Cell';
// import Drag from './Drag';

const lastWinResult = [];
export default class Puzzle {
  constructor(el, dimmension, imageSrc, width, sound) {
    this.parentEl = el;
    this.dimmension = dimmension;
    this.imageSrc = imageSrc;
    this.width = width;
    this.cells = [];
    this.moves = 0;
    this.canResume = false;
    this.sound = sound;
    this.moveSound = new Audio('../assets/sounds/puzzle_move.mp3');
    this.moveSound.volume = 0.8;
    this.winSound = new Audio('../assets/sounds/puzzel_winner.mp3');
    this.winSound.volume = 0.5;
    this.shuffled = false;

    this.shufflesCount = 0;
    this.y = 0;

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

  setup(showImages, showNumbers) {
    for (let i = 0; i < this.dimmension * this.dimmension; i += 1) {
      this.cells.push(new Cell(this, i, showImages, showNumbers));
      this.cells[i].setPosition(i);
    }
    while (this.shufflesCount < this.dimmension * 2500) {
      this.shuffle();
    }
    this.shuffled = true;
    this.dragStarter();
    // add event listener for drag on empty cell
    let emptyCellIndex = this.findEmpty();
    const emptyCell = document.querySelector('.cell__empty');
    emptyCell.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    emptyCell.addEventListener('drop', () => {
      emptyCellIndex = this.findEmpty();
      this.moves += 1;
      const movesCounter = document.querySelector('.movesCounter');
      movesCounter.children[1].textContent = this.moves;
      if (this.sound) {
        this.moveSound.play();
      }
      this.swapCells(this.draggedCellIndex, emptyCellIndex);
    });
  }

  swapableCheck() {
    const emptyCellIndex = this.findEmpty();
    this.cells.forEach((cell, index) => {
      if (this.canSwapCheck(index, emptyCellIndex)) {
        cell.el.classList.add('draggable');
        cell.el.setAttribute('draggable', 'true');
      } else {
        cell.el.classList.remove('draggable');
        cell.el.removeAttribute('draggable');
      }
    });
    if (this.shuffled) {
      this.dragStarter();
    }
  }

  dragStarter() {
    const draggableCells = document.querySelectorAll('.draggable');
    draggableCells.forEach((dragablecell) => {
      dragablecell.addEventListener('dragstart', () => {
        // console.log('start')
        dragablecell.classList.add('blured');
        setTimeout(() => (dragablecell.classList.add('hidden')), 0);
        // dragablecell.classList.add('hidden');
        this.cells.forEach((cell, index) => {
          if (cell.el === dragablecell) {
            this.draggedCellIndex = index;
          }
        });
      });
      dragablecell.addEventListener('dragend', () => {
        // setTimeout(() => (dragablecell.classList.remove('hidden')), 0);
        dragablecell.classList.remove('hidden');
        dragablecell.classList.remove('blured');
        console.log('end');
      });
    });
  }

  shuffle() {
    this.shufflesCount += 1; // counter of shuffles
    const emptyCellIndex = this.findEmpty();
    const currentCellIndex = Math.floor(Math.random() * this.dimmension * this.dimmension);
    if (this.canSwapCheck(currentCellIndex, emptyCellIndex)) {
      this.swapCells(currentCellIndex, emptyCellIndex);
      if (this.isAssembled()) { // if shuffed to assembled — reshuffle
        this.shuffle();
      }
    }
    this.swapableCheck();
  }

  canSwapCheck(currentCellIndex, emptyCellIndex) {
    let canSwap;
    const { x, y } = this.getXY(currentCellIndex);
    const { x: emptyX, y: emptyY } = this.getXY(emptyCellIndex);
    if ((x === emptyX || y === emptyY)
    && (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)) {
      canSwap = true;
    } else {
      canSwap = false;
    }
    return canSwap;
  }

  getXY(index) {
    return {
      x: index % this.dimmension,
      y: Math.floor(index / this.dimmension),
    };
  }

  swapCells(i, j) {
    this.cells[i].setPosition(j, i);
    this.cells[j].setPosition(i);
    [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];

    if (this.isAssembled() && this.shuffled) { // check if already shuffled to prevent 0 moves win
      this.win();
      this.shuffled = false;
    }
    if (this.shuffled) {
      this.swapableCheck(); // set draggable to swapable cells
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

  reset() {
    this.moves = 0;
  }

  win() {
    if (this.sound) {
      this.winSound.play();
    }
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
    boardSize.textContent = `Size: ${this.dimmension} x ${this.dimmension}`;
    lastWinResult.splice(0, lastWinResult.length); // if array
    lastWinResult.push(this.moves);
    lastWinResult.push(totalTime);
    lastWinResult.push(this.dimmension);
    localStorage.setItem('lastWinResult', lastWinResult);
  }
}
