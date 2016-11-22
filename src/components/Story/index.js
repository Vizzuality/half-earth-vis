import $ from 'jquery';

const defaults = {};

class Story {

  constructor(queryElement, options = {}) {
    this.el = document.querySelector(queryElement);
    this.options = Object.assign({}, defaults, options);
    this.init();
  }

  init() {
    this.$el = $(this.el);
  }

}

export default Story;
