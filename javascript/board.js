

class Board {
  constructor() {
    this.selection = {};
    this.sounds = {};
    this.play = document.getElementById('play');
    this.pause = document.getElementById('pause');
    this.tempo = document.getElementById('tempo');
    this.reset = document.getElementById('reset');
    this.playColumn = 0;
    this.init();
    this.genSounds();
  }

  init() {
    for (let row = 0; row < 8; row += 1) {
      this.selection[row] = {};
      this.sounds[row] = {};
      for (let col = 0; col < 8; col += 1) {
        this.selection[row][col] = document.getElementById(`tile-${row}-${col}`);
        this.selection[row][col].onclick = e => this.toggleSelect(e);
        this.sounds[row][col] = this.whichSound(row, col);
      }
    }
    this.play.onclick = e => this.togglePlay(e);
    this.pause.onclick = e => this.togglePlay(e);
    this.reset.onclick = () => this.handleReset();
    this.tempo.onchange = () => this.handleTempo();
    this.mainInterval = setInterval(this.playTiles.bind(this), this.rate());
  }

  genSounds() {
    this.sounds[0] = new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/ac_mp3/v1501800875/looperman-l-2283018-0109961-amusah-percussive-trap-synth-f-minor-110-bpm_bbovrx.wav');
    this.sounds[1] = new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/ac_mp3/v1501800875/looperman-l-1871485-0109347-grwi2016-no-role-modelz-bass_uon3gk.wav');
    this.sounds[2] = new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/ac_mp3/v1501800875/looperman-l-2201803-0111523-sxker-happy-marimba-chords_sejpax.wav');
    this.sounds[3] = new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/ac_mp3/v1501800875/looperman-l-1655182-0108938-az96lol-mexikodro-rim_eov0bf.wav');
    this.sounds[4] = new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/ac_mp3/v1501800875/looperman-l-0173158-0111436-callmeking-sifu-snare-130bpm_gjkxwd.wav');
    this.sounds[5] = new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/ac_mp3/v1501800875/looperman-l-1929922-0111261-alabafruit-bones-electronic-melodic-bones-percussion-120-bpm_xlnusi.wav');
    this.sounds[6] = new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/ac_mp3/v1501800876/looperman-l-1099214-0110961-eluterius-a-bag-full-of-spiders_qy0fn6.wav');
    this.sounds[7] = new Audio('https://res.cloudinary.com/dy4gcvjff/video/upload/ac_mp3/v1501800876/looperman-l-1093714-0110444-slicexbeats-reversing-cymbal-hits_piidgr.wav');
  }

  whichSound(row, col) {
    return this.sounds[row];
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
        this.sounds[row][prevColumn].pause();
        this.sounds[row][prevColumn].currentTime = 0;
        if (this.selection[row][this.playColumn].getAttribute('data')) {
          this.sounds[row][this.playColumn].play();
        }
      }
      this.playColumn = this.playColumn === 7 ? 0 : this.playColumn + 1;
    }
  }


}

export default Board;
