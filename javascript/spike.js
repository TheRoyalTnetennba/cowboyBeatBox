class Spike {
  constructor() {
    this.sprite = new Image();
    this.sprite.src = 'http://res.cloudinary.com/dy4gcvjff/image/upload/v1501818042/SpikeDance_dcoubx.png';
    this.loadImage = this.loadImage.bind(this);
    this.animate = this.animate.bind(this);
    this.canvas = document.getElementById('spikeAnimation');
    this.context = this.canvas.getContext('2d');
    this.shift = 0;
    this.width = 250;
    this.height = 270;
    this.totalFrames = 14;
    this.currentFrame = 0;
    this.init();
    this.frameRate = 0;
  }

  init() {
    this.sprite.addEventListener('load', this.loadImage, false);
  }

  loadImage(e) {
    this.animate();
  }

  setFrameRate(rate) {

  }

  animate() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.drawImage(this.sprite, this.shift, 0, this.width, this.height, 0, 0, this.width, this.height);
    this.shift += this.width;
    if (this.currentFrame === this.totalFrames) {
      this.shift = 0;
      this.currentFrame = 0;
    }
    this.currentFrame += 1;
  }
}

export default Spike;
