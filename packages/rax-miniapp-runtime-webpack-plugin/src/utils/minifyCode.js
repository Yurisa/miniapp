const terser = require('terser');
const csso = require('csso');
const prettyData = require('pretty-data').pd;
const { platformMap } = require('miniapp-builder-shared');

function minifyJS(source) {
  return terser.minify(source).code;
}

function minifyCSS(source) {
  return csso.minify(source, {
    restructure: false
  }).css;
}

function minifyXML(source) {
  return prettyData.xmlmin(source);
}

function minifyJSON(source) {
  return prettyData.json(source);
}

function minify(source, type = '.js', target) {
  if (type === '.js') {
    return minifyJS(source);
  }
  if (type === '.css' || type === platformMap[target].extension.css) {
    return minifyCSS(source);
  }
  if (type === '.json') {
    return minifyJSON(source);
  }
  if (/\..*ml/.test(type)) {
    return minifyXML(source);
  }

  return source;
}

module.exports = {
  minify,
  minifyJS,
  minifyCSS,
  minifyXML,
  minifyJSON
};
