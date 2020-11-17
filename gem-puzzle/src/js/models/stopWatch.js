export default class StopWatch {
  constructor() {
    this.tInterval = 0;
    this.savedTime = 0;
    this.paused = 0;
    this.running = 0;
    this.difference = 0;
    StopWatch.totalTime = 0;
  }

  startTimer(loadedTime = 0, startTime = new Date().getTime()) {
    if (!this.running) {
      StopWatch.startTime = startTime - (loadedTime * 1000);
      this.tInterval = setInterval(this.getShowTime, 1000);
      this.paused = 0;
      this.running = 1;
    }
  }

  pauseTimer() {
    if (!StopWatch.difference) {
      // if timer never started, don't allow pause button to do anything
    } else if (!this.paused) {
      clearInterval(this.tInterval);
      StopWatch.savedTime = StopWatch.difference;
      this.paused = 1;
      this.running = 0;
    } else {
      // if the timer was already paused, when they click pause again, start the timer again
      this.startTimer();
    }
  }

  resetTimer() {
    clearInterval(this.tInterval);
    StopWatch.savedTime = 0;
    this.difference = 0;
    this.paused = 0;
    this.running = 0;
  }

  getShowTime() {
    const timer = document.querySelector('.timer');
    const timerDisplay = timer.children[1];
    StopWatch.updatedTime = new Date().getTime();
    if (StopWatch.savedTime) {
      StopWatch.difference = StopWatch.updatedTime - StopWatch.startTime + StopWatch.savedTime;
    } else {
      StopWatch.difference = StopWatch.updatedTime - StopWatch.startTime;
    }

    let hours = Math.floor(
      (StopWatch.difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minutes = Math.floor((StopWatch.difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((StopWatch.difference % (1000 * 60)) / 1000);
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    timerDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;
    StopWatch.totalTime = `${hours}:${minutes}:${seconds}`;
    return `${hours}:${minutes}:${seconds}`;
  }
}
