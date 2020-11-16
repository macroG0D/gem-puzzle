import Puzzle from './Puzzle';
// import * as stopwatch from './stopWatch';
import StopWatch from './stopWatch';
import Scores from './Scores';

export default class Menu {
  constructor(puzzle) {
    this.puzzle = puzzle;
    this.sound = true;
    this.resume = document.querySelector('#resume');
    this.settingsOn = false;
    this.showImages = true;
    this.showNumbers = true;
    this.fieldSize = 4;
    this.hasSavedGame = false;
    this.initMenu();
  }

  initMenu() {
    // main menu
    const body = document.querySelector('body');
    const contentWrapper = document.querySelector('.content-wrapper');
    const menu = document.createElement('div');
    const menuBg = document.createElement('div');
    const menuWrapper = document.createElement('div');
    const menulist = document.createElement('ul');
    const sound = document.createElement('div');
    menu.classList.add('menu');
    menuBg.classList.add('menu__bg');
    menuWrapper.classList.add('menu__wrapper');
    menulist.classList.add('menu__list');
    sound.classList.add('sound');
    sound.classList.add('sound_on');
    body.appendChild(menu);
    const menuItems = [];
    const menuItemsProps = [
      ['Resume', 'resume'],
      ['New game', 'newGame'],
      ['Save game', 'saveGame'],
      ['Load game', 'loadGame'],
      ['Scores', 'showScores'],
      ['Settings', 'openSettings'],
      ['Autocomplete', 'autocomplete'],
    ];
    for (let i = 0; i < 7; i += 1) {
      menuItems.push(document.createElement('li'));
    }
    menu.appendChild(menuBg);
    menu.appendChild(menuWrapper);
    menuWrapper.appendChild(menulist);
    menuItems.forEach((menuItem, index) => {
      menuItem.classList.add('menu__item');
      const text = menuItemsProps[index][0];
      const funcName = menuItemsProps[index][1];
      menulist.appendChild(menuItem).textContent = text;
      menuItem.setAttribute('id', funcName);
      if (index === 0) {
        menuItem.classList.add('hidden');
      }
    });
    menuWrapper.appendChild(sound).style = 'background-image: url("./assets/icons/sound_on.svg")';

    // save/load game menu item swap
    const loadBtn = document.querySelector('#loadGame');
    if (!this.hasSavedGame) {
      loadBtn.classList.add('hidden');
    }

    // Create settings menu
    const settingsWrapper = document.createElement('div');
    settingsWrapper.classList.add('settings-wrapper');
    settingsWrapper.classList.add('hidden');
    const settingsHeader = document.createElement('h2');
    settingsHeader.innerText = 'Settings';
    settingsWrapper.append(settingsHeader);
    const settingsPreferences = document.createElement('form');
    settingsPreferences.setAttribute('id', 'preferences');
    settingsPreferences.classList.add('settingsPreferences');
    settingsWrapper.append(settingsPreferences);

    const inputWrapperImg = document.createElement('div');
    inputWrapperImg.classList.add('input-wrapper');

    const inputCheckboxImages = document.createElement('input');
    inputCheckboxImages.setAttribute('type', 'checkbox');
    inputCheckboxImages.setAttribute('value', 'images');
    inputCheckboxImages.setAttribute('name', 'images');
    inputCheckboxImages.setAttribute('checked', '');
    inputCheckboxImages.classList.add('checkbox');
    inputWrapperImg.append(inputCheckboxImages);
    const inputLabelImages = document.createElement('label');
    inputLabelImages.setAttribute('for', 'images');
    inputLabelImages.textContent = 'Images';
    inputWrapperImg.append(inputLabelImages);

    settingsPreferences.append(inputWrapperImg);

    const inputWrapperNum = document.createElement('div');
    inputWrapperNum.classList.add('input-wrapper');

    const inputCheckboxNumbers = document.createElement('input');
    inputCheckboxNumbers.setAttribute('type', 'checkbox');
    inputCheckboxNumbers.setAttribute('value', 'numbers');
    inputCheckboxNumbers.setAttribute('name', 'numbers');
    inputCheckboxNumbers.setAttribute('checked', '');
    inputCheckboxNumbers.classList.add('checkbox');
    inputWrapperNum.append(inputCheckboxNumbers);
    const inputLabelNumbers = document.createElement('label');
    inputLabelNumbers.setAttribute('for', 'numbers');
    inputLabelNumbers.textContent = 'Numbers';
    inputWrapperNum.append(inputLabelNumbers);

    settingsPreferences.append(inputWrapperNum);

    const selectSize = document.createElement('select');
    selectSize.setAttribute('form', 'preferences');
    selectSize.setAttribute('name', 'field-size');
    selectSize.classList.add('selectSize');
    settingsPreferences.append(selectSize);

    const fieldSizes = ['3', '4', '5', '6', '7', '8'];
    let sizeOption;
    fieldSizes.forEach((option) => {
      sizeOption = document.createElement('option');
      sizeOption.value = option;
      sizeOption.textContent = `${option} x ${option}`;
      selectSize.appendChild(sizeOption);
    });
    selectSize.children[1].setAttribute('selected', '');

    const setBtn = document.createElement('button');
    setBtn.setAttribute('type', 'submit');
    setBtn.classList.add('settingsBtn');
    setBtn.textContent = 'Ok';
    settingsWrapper.appendChild(setBtn);

    menu.appendChild(settingsWrapper);

    // Create winner menu
    const winnerScreen = document.createElement('div');
    winnerScreen.classList.add('winnerScreenWrapper');
    winnerScreen.classList.add('hidden');
    const winnerScreenResults = document.createElement('div');
    winnerScreenResults.classList.add('winnerScreenResults');
    const winnderHeader = document.createElement('h2');
    winnderHeader.innerText = 'Congratulations! You won!';
    winnerScreen.append(winnderHeader);

    const totalMovesResult = document.createElement('div');
    totalMovesResult.classList.add('totalMovesResult');
    totalMovesResult.textContent = `Moves: ${1}`;

    const totalTimeResult = document.createElement('div');
    totalTimeResult.classList.add('totalTimeResult');
    totalTimeResult.textContent = `Time: ${'01:05'}`;

    const boardSize = document.createElement('div');
    boardSize.classList.add('boardSize');
    boardSize.textContent = `Size: ${this.fieldSize} x ${this.fieldSize}`;

    winnerScreenResults.append(totalMovesResult);
    winnerScreenResults.append(totalTimeResult);
    winnerScreenResults.append(boardSize);
    const winBtn = document.createElement('button');
    winBtn.classList.add('winner');
    winBtn.textContent = 'Menu';
    winnerScreen.append(winnerScreenResults);
    winnerScreen.append(winBtn);
    body.appendChild(winnerScreen);

    const scoreWrapper = document.createElement('div');
    scoreWrapper.classList.add('scoreWrapper');
    scoreWrapper.classList.add('hidden');
    const scoreCloseBtn = document.createElement('button');
    scoreCloseBtn.classList.add('closeScore');
    scoreCloseBtn.textContent = 'Back';

    const topScoresTable = document.createElement('div');
    topScoresTable.classList.add('topScores');
    const topScoresHeader = document.createElement('h2');
    topScoresHeader.innerText = 'Top 5 results';
    scoreWrapper.append(topScoresHeader);

    const rankingsList = document.createElement('ol');
    rankingsList.classList.add('rankingsList');

    scoreWrapper.append(rankingsList);
    rankingsList.classList.add('rankingsList');
    body.append(scoreWrapper);
    scoreWrapper.append(scoreCloseBtn);
  }

  settingsOnOff(images = this.showImages, numbers = this.showNumbers, size = this.fieldSize) {
    const settingsWrapper = document.querySelector('.settings-wrapper');
    if (this.settingsOn) {
      this.settingsOn = false;
      settingsWrapper.classList.add('hidden');
      this.showImages = images;
      this.showNumbers = numbers;
      this.fieldSize = size;
    } else {
      this.settingsOn = true;
      settingsWrapper.classList.remove('hidden');
    }
  }
}

function getRandomImage() {
  // generate rundom image number in range of 1 to 150
  const randomImage = Math.floor(Math.random() * 150) + 1;
  return `assets/images/${randomImage}.jpg`;
}

export const stopwatch = new StopWatch();
let puzzle;
function startNewGame(showImages = true, showNumbers = true, dimemension = 4, sound = true) {
  let cellsSize;
  if (window.innerWidth < 480) {
    cellsSize = 310;
  } else if (window.innerWidth <= 1920) {
    cellsSize = 384;
  } else if (window.innerWidth > 1920) {
    cellsSize = 480;
  }
  if (puzzle) {
    stopwatch.resetTimer();
    puzzle.reset();
  }
  stopwatch.startTimer();
  document.querySelector('.puzzle-wrapper').innerHTML = '';
  puzzle = new Puzzle(
    document.querySelector('.puzzle-wrapper'),
    dimemension,
    getRandomImage(), // pass random image url
    cellsSize,
    sound,
  );
  // puzzle settings
  puzzle.showImages = showImages;
  puzzle.showNumbers = showNumbers;
}

const menu = new Menu(puzzle);

export function showHideResumeBtn() {
  if (puzzle === undefined || !puzzle.canResume) {
    document.querySelector('#resume').classList.add('hidden');
  } else {
    document.querySelector('#resume').classList.remove('hidden');
  }
}

const mnu = document.querySelector('.menu');
document.querySelector('#newGame').addEventListener('click', () => {
  startNewGame(menu.showImages, menu.showNumbers, menu.fieldSize, menu.sound);
  puzzle.canResume = true;
  mnu.classList.add('hidden');
  const movesCounter = document.querySelector('.movesCounter');
  movesCounter.children[1].textContent = 0; // reset moves counter on screen
  const timer = document.querySelector('.timer');
  timer.children[1].textContent = '00:00:00'; // reset time counter on screen
});

const scores = new Scores();

const winBtn = document.querySelector('.winner');
winBtn.addEventListener('click', () => {
  const winnerScreen = document.querySelector('.winnerScreenWrapper');
  winnerScreen.classList.add('hidden');
  // reset game and open main menu
  stopwatch.resetTimer();
  puzzle.reset();
  puzzle.canResume = false;
  showHideResumeBtn();
  mnu.classList.remove('hidden');
  scores.getLastWinScore();
});

document.querySelector('#resume').addEventListener('click', () => {
  mnu.classList.add('hidden');
  stopwatch.pauseTimer(); // starts timer adter pause
});

document.querySelector('.sound').addEventListener('click', () => {
  const soundBtn = document.querySelector('.sound');
  if (soundBtn.classList.contains('sound_on')) {
    menu.sound = false;
    if (puzzle) {
      puzzle.sound = false;
    }
    soundBtn.classList.remove('sound_on');
    soundBtn.classList.add('sound_off');
    soundBtn.style = 'background-image: url("./assets/icons/sound_off.svg")';
  } else {
    menu.sound = true;
    if (puzzle) {
      puzzle.sound = true;
    }
    soundBtn.classList.remove('sound_off');
    soundBtn.classList.add('sound_on');
    soundBtn.style = 'background-image: url("./assets/icons/sound_on.svg")';
  }
});

document.querySelector('#openSettings').addEventListener('click', () => {
  menu.settingsOnOff();
});

document.querySelector('.settingsBtn').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.checkbox');
  const fieldSize = document.querySelector('select').value;
  menu.settingsOnOff(checkboxes[0].checked, checkboxes[1].checked, fieldSize);
});

const scoreWindow = document.querySelector('.scoreWrapper');

document.querySelector('#showScores').addEventListener('click', () => {
  scoreWindow.classList.remove('hidden');

  const allResults = scores.getAllResults();
  const rankingsList = document.querySelector('.rankingsList');

  const li = document.querySelectorAll('.rankingsListItem');
  li.forEach((item) => { // clear previous results li to prevent duplicate
    item.remove();
  });

  allResults.forEach((result, index) => {
    const rating = document.createElement('span');
    rating.classList.add('rating');
    rating.innerText = `${index + 1}`;
    const rankingsListItem = document.createElement('li');
    rankingsListItem.classList.add('rankingsListItem');
    const boardSizeSpan = document.createElement('span');
    const timeSpan = document.createElement('span');
    const movesSpan = document.createElement('span');
    boardSizeSpan.classList.add('boardSizeSpan');
    timeSpan.classList.add('timeSpan');
    movesSpan.classList.add('movesSpan');

    boardSizeSpan.innerText = `size: ${result[1]} x ${result[1]}`;
    timeSpan.innerText = `time: ${result[2]}`;
    movesSpan.innerText = `moves: ${result[0]}`;

    rankingsListItem.append(boardSizeSpan);
    rankingsListItem.append(timeSpan);
    rankingsListItem.append(movesSpan);
    rankingsListItem.prepend(rating);
    rankingsList.append(rankingsListItem);
  });
});

document.querySelector('.closeScore').addEventListener('click', () => {
  scoreWindow.classList.add('hidden');
});

document.querySelector('#autocomplete').addEventListener('click', () => {
});

// save and load
const saveBtn = document.querySelector('#saveGame');

saveBtn.addEventListener('click', () => {
  // console.log('save');
  // console.log(puzzle.cells); // puzzle cells positions object
  // console.log(stopwatch);
  // console.log(stopwatch.getShowTime());
});

// const loadBtn = document.querySelector('#loadGame');
