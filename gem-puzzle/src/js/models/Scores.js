export default class Scores {
  getLastWinScore() {
    let lastWinScore = localStorage.getItem('lastWinResult');
    lastWinScore = lastWinScore.split(',');
    const moves = lastWinScore[0]; // total moves
    const timer = lastWinScore[1]; // total time
    const boardSize = lastWinScore[2]; // finished game board size

    const oneResultItems = [moves, boardSize, timer, this.getTotalSecs(timer)];
    const oneResult = [];
    oneResult.push(...oneResultItems);
    this.topResults(oneResult);
  }

  topResults(oneResult) {
    let topResults = this.getAllResults();
    const weakestTop = topResults[topResults.length - 1] || oneResult;

    // check if need to remove last one and push new
    if (topResults.length > 9) {
      if ((weakestTop[1] < oneResult[1]) // if wekest's is on smaller board size
        // or if weakest field size smaller or equals current
        // and if the weakest's total-time is greater then current result
        || (weakestTop[1] === oneResult[1] && weakestTop[2] > oneResult[2])
        // or if time is the same, but weakest did more moves
        || (weakestTop[2] === oneResult[2] && weakestTop[0] >= oneResult[0])) {
        // then remove the weakest and push the new one
        topResults.pop();
        topResults.push(oneResult); // add latest top result to the end of array
      } else {
        return;
      }
    } else {
      topResults.push(oneResult); // add latest top result to the end of array
    }

    // SORT BY PRIORITY: 1)boardSize 2)time 3)moves
    topResults = this.sortByMoves(topResults);
    topResults = this.sortByTime(topResults);
    topResults = this.sortByBoardSize(topResults);
    this.storeResults(topResults);
  }

  storeResults(topResultsArray) {
    topResultsArray.forEach((result, index) => {
      localStorage.setItem(index + 1, result);
    });
  }

  getTotalSecs(timer) {
    const tempTimer = timer.split(':');
    const hours = tempTimer[0];
    const minutes = tempTimer[1];
    const seconds = tempTimer[2];
    // convert total time to seconds
    const totalSecs = seconds * 1 + minutes * 60 + hours * 3600;
    return totalSecs;
  }

  sortByTime(arr) {
    // sort by total seconds
    return arr.sort((x, y) => x[3] - y[3]);
  }

  sortByBoardSize(arr) {
    // sort by total board size
    return arr.sort((x, y) => y[1] - x[1]);
  }

  sortByMoves(arr) {
    // sort by total moves
    return arr.sort((x, y) => x[0] - y[0]);
  }

  getAllResults() {
    // check if keys (1-5) exsists in localStorage and if they are — return them in theys order
    const allResults = [];
    const storage = localStorage;
    for (let i = 0; i < 10; i += 1) {
      // becouse top 5
      if (storage[i + 1] !== undefined) {
        // if storage has keys from 1 to 5 push them
        const toArray = storage[i + 1].split(',');
        allResults.push(toArray);
      }
    }
    return allResults;
  }
}
