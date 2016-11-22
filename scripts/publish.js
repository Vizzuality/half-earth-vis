const debug = require('debug')('half-earth');
const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(path.join(__dirname, 'dist'), (err) => {
  debug('Error: %s', err);
});
