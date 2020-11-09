import '../styles/main.scss';
import Puzzle from './models/Puzzle';

const body = document.querySelector('body');

function getRandomImage() { // generate rundom image number in range of 1 to 150
  const min = Math.ceil(1);
  const max = Math.floor(150);
  const randomImage = Math.floor(Math.random() * (max - min + 1)) + min;
  return `../assets/images/${randomImage}.jpg`;
}

const puzzleWrapper = document.createElement('div');
puzzleWrapper.classList.add('puzzle-wrapper');
body.append(puzzleWrapper); // create game-board wrapper

const puzzle = new Puzzle(
  document.querySelector('.puzzle-wrapper'),
  4,
  getRandomImage(), // pass random image url
  480,
);

// puzzle settings
puzzle.showImages = true;
puzzle.showNumbers = true;
puzzle.dimmension = 3;
