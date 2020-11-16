import '../styles/main.scss';
import * as Menu from './models/Menu';

const body = document.querySelector('body');
const contentWrapper = document.createElement('div');
contentWrapper.classList.add('content-wrapper');

const header = document.createElement('div');
header.classList.add('header');
const timer = document.createElement('div');
timer.classList.add('timer');

const movesCounter = document.createElement('div');
movesCounter.classList.add('movesCounter');
const burgerWrapper = document.createElement('div');
burgerWrapper.classList.add('burger-wrapper');

// body.append(header);
body.append(contentWrapper);
contentWrapper.append(header);
header.append(timer);
header.append(movesCounter);
header.append(burgerWrapper);

function createSpan() {
  return document.createElement('span');
}

const timerTitle = createSpan();
timerTitle.classList.add('title');
const timerCounter = createSpan();
timerCounter.classList.add('counter');

timer.appendChild(timerTitle);
timer.appendChild(timerCounter);
timer.firstChild.textContent = 'Time:';
timer.children[1].textContent = '00:00:00';

const movesCounterTitle = createSpan();
movesCounterTitle.classList.add('title');
const movesCounterCounter = createSpan();
movesCounterCounter.classList.add('counter');

movesCounter.appendChild(movesCounterTitle);
movesCounter.appendChild(movesCounterCounter);
movesCounter.firstChild.textContent = 'moves:';
movesCounter.children[1].textContent = 0;

const burger = document.createElement('div');
burger.classList.add('burger');
burgerWrapper.appendChild(burger);

const puzzleWrapper = document.createElement('div');
puzzleWrapper.classList.add('puzzle-wrapper');

body.append(contentWrapper); // create game-board wrapper
contentWrapper.append(puzzleWrapper);
const burgerBtn = document.querySelector('.burger-wrapper');

const menu = document.querySelector('.menu');
burgerBtn.addEventListener('click', () => {
  menu.classList.remove('hidden');
  Menu.stopwatch.pauseTimer();
  Menu.showHideResumeBtn();
});
