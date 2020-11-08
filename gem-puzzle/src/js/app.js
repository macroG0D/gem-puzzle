import '../styles/main.scss';
import Puzzle from './models/Puzzle';
import image from '../assets/images/31.jpg';

const body = document.querySelector('body');

const puzzleWrapper = document.createElement('div');
puzzleWrapper.classList.add('puzzle-wrapper');
body.append(puzzleWrapper); // create game-board wrapper

const puzzle = new Puzzle(
  document.querySelector('.puzzle-wrapper'),
  image,
  480,
);
