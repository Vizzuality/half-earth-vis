import _ from 'underscore';

const defaults = {
  patternColor: 'rgba(255, 255, 255, .2)',
  lineWidth: 2.5,
  space: 4,
  width: 500,
  height: 500
};

class Photo {

  constructor(elementQuery, options = {}) {
    this.el = document.getElementById(elementQuery);
    this.options = Object.assign({}, defaults, options);
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.init();
  }

  init() {
    this.setSize();

    // Loading image
    this.image = document.createElement('img');
    this.image.addEventListener('load', this.draw.bind(this));
    this.image.src = this.options.imagePath;

    // Resizing
    window.addEventListener('resize', _.debounce(this.update.bind(this), 200));
  }

  setSize() {
    // Lookup the size the browser is displaying the canvas.
    const displayWidth = this.options.width = window.innerWidth;
    const displayHeight = this.options.height = window.innerHeight;

    // Check if the canvas is not the same size.
    if (this.canvas.width !== displayWidth ||
      this.canvas.height !== displayHeight) {
      // Make the canvas the same size
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
    }
  }

  draw() {
    // Clear canvas before draw
    this.clear();

    // Drawing path
    // this.context.drawImage(this.image, 0, 0);
    this.drawCover();
    this.paintPattern();

    const imagePath = this.canvas.toDataURL('image/jpeg', 0.75);
    this.el.style.backgroundImage = `url(${imagePath})`;
  }

  update() {
    this.setSize();
    this.draw();
  }

  paintPattern() {
    const total = Math.ceil(this.diagonalCalc() / (2 * this.options.space));
    const center = [(this.options.width / 2), (this.options.height / 2)];

    this.context.lineWidth = this.options.lineWidth;
    this.context.strokeStyle = this.options.patternColor;

    for (let i = 1; i < total; i = 1 + i) {
      const r = this.options.space * i;
      this.context.beginPath();
      this.context.arc(center[0], center[1], r, 0, Math.PI * 2, false);
      this.context.stroke();
      this.context.closePath();
    }
  }

  diagonalCalc() {
    const width = this.options.width;
    const height = this.options.height;
    const x2 = Math.pow(width, 2);
    const y2 = Math.pow(height, 2);
    return Math.ceil(Math.sqrt(x2 + y2)); // Pitaghoras :)
  }

  clear() {
    this.context.clearRect(0, 0, this.options.width, this.options.height);
  }

  /**
   * By Ken Fyrstenberg Nilsen
   *
   * drawCover([, x, y, width, height [,offsetX, offsetY]])
   *
   * If image and context are only arguments rectangle will equal canvas
  */
  drawCover(x = 0, y = 0, oX = 0.5, oY = 0.5) {
    const img = this.image;
    const w = this.context.canvas.width;
    const h = this.context.canvas.height;

    // Default offset is center
    let offsetX = typeof oX === 'number' ? oX : 0.5;
    let offsetY = typeof oY === 'number' ? oY : 0.5;

    // Keep bounds [0.0, 1.0]
    if (offsetX < 0) {
      offsetX = 0;
    }

    if (offsetY < 0) {
      offsetY = 0;
    }

    if (offsetX > 1) {
      offsetX = 1;
    }

    if (offsetY > 1) {
      offsetY = 1;
    }

    const iw = img.width;
    const ih = img.height;
    const r = Math.min(w / iw, h / ih);

    let nw = iw * r;
    let nh = ih * r;
    let cx;
    let cy;
    let cw;
    let ch;
    let ar = 1;

    // Decide which gap to fill
    if (nw < w) {
      ar = w / nw;
    }

    if (Math.abs(ar - 1) < 1e-14 && nh < h) {
      ar = h / nh;
    }

    nw *= ar;
    nh *= ar;

    // Calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // Make sure source rectangle is valid
    if (cx < 0) {
      cx = 0;
    }

    if (cy < 0) {
      cy = 0;
    }

    if (cw > iw) {
      cw = iw;
    }

    if (ch > ih) {
      ch = ih;
    }

    // Fill image in dest. rectangle
    this.context.drawImage(img, cx, cy, cw, ch, x, y, w, h);
  }

}

export default Photo;
