export default class Scores {
  constructor() {
    this.latestScore = [];
    this.topScores = [];
  }

  addScore() {
    this.latestScore = localStorage.getItem('newScore'); // get latest score from LS to sort it

    let tempArr = [];
    const realscore = this.latestScore.split(',');

    const scoreMoves = realscore[0];
    const time = realscore[1].split(':');
    const scoreSize = realscore[2];

    const hours = time[0];
    const minutes = time[1];
    const seconds = time[2];
    const totalSecs = seconds * 1 + minutes * 60 + hours * 3600;

    const totaltime = time.join(':');
    tempArr = [];
    tempArr.push(totalSecs); // speed for sorting
    tempArr.push(totaltime);
    tempArr.push(scoreMoves);
    tempArr.push(scoreSize);

    if (this.topScores.length >= 5) {
      if (tempArr[0] < this.topScores[this.topScores.length - 1][0]) {
        this.topScores.pop(); // remove last result if score list is above 10
        this.topScores.push(tempArr);
      } else {
        return;
      }
    } else {
      this.topScores.push(tempArr);
    }
    this.scoreSort();

    this.topScores.forEach((score, index) => { // add top results to local storage
      localStorage.setItem(index + 1, score);
    });
  }

  scoreSort() {
    this.topScores.sort((a, b) => {
      const keyA = a[0];
      const keyB = b[0];
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }

  scoreList() {
    this.topScores.forEach((score) => score);
  }
}
