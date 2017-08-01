

class Board {
  constructor() {
    this.selection = {};
    this.play = document.getElementById('play');
    this.pause = document.getElementById('pause');
    this.tempo = document.getElementById('tempo');
    this.reset = document.getElementById('reset');
    this.playColumn = 0;
    this.init();
  }

  init() {
    for (let row = 0; row < 8; row += 1) {
      this.selection[row] = {};
      for (let col = 0; col < 8; col += 1) {
        this.selection[row][col] = document.getElementById(`tile-${row}-${col}`);
        this.selection[row][col].onclick = e => this.toggleSelect(e);
      }
    }
    this.play.onclick = e => this.togglePlay(e);
    this.pause.onclick = e => this.togglePlay(e);
    this.reset.onclick = () => this.handleReset();
    this.tempo.onchange = () => this.handleTempo();
    this.mainInterval = setInterval(this.playTiles.bind(this), this.rate());
  }

  toggleSelect(e) {
    let row, col;
    [row, col] = e.srcElement.id.split('-').slice(-2);
    if (this.selection[row][col].getAttribute('data')) {
      this.selection[row][col].setAttribute('data', '');
      e.srcElement.classList.remove('tile-selected');
    } else {
      this.selection[row][col].setAttribute('data', '1');
      e.srcElement.classList.add('tile-selected');
    }
  }

  togglePlay(e) {
    if (this.play.getAttribute('data')) {
      this.play.setAttribute('data', '');
      this.play.classList.add('hidden');
      this.pause.setAttribute('data', '1');
      this.pause.classList.remove('hidden');
    } else {
      this.pause.setAttribute('data', '');
      this.pause.classList.add('hidden');
      this.play.setAttribute('data', '1');
      this.play.classList.remove('hidden');
    }
  }

  rate() {
    const rate = parseInt(this.tempo.getAttribute('max')) - parseInt(this.tempo.value);
    const min = parseInt(this.tempo.getAttribute('min'));
    return rate + min;
  }

  handleReset() {
    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        this.selection[row][col].setAttribute('data', '');
        this.selection[row][col].classList.remove('tile-selected');
      }
    }
  }

  handleTempo() {
    clearInterval(this.mainInterval);
    this.mainInterval = setInterval(this.playTiles.bind(this), this.rate());
  }

  playTiles() {
    if (this.pause.getAttribute('data')) {
      const prevColumn = this.playColumn === 0 ? 7 : this.playColumn - 1;
      for (let row = 0; row < 8; row += 1) {
        this.selection[row][prevColumn].classList.remove('tile-shadow');
        this.selection[row][this.playColumn].classList.add('tile-shadow');
      }
      this.playColumn = this.playColumn === 7 ? 0 : this.playColumn + 1;
    }
  }


}

export default Board;
