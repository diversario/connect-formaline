
/*!
 * Connect - Formaline
 * Copyright(c) 2011 Ilya Shaisultanov <ilya.shaisultanov@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var formaline = require('formaline');

/**
 * Setup form with the given `options`.
 *
 * For options refer to formaline documentation.
 *
 * @param {Object} options Formaline options
 * @return {Function}
 * @api public
 */

module.exports = function (options){
  return function(req, res, next){
    if (formRequest(req)){
      var form = req.form = new formaline(options);
      form.complete = function(json, res, processor){ // this callback is for 'loadend' event in app code
        processor(json, res); // form.complete is called from 'loadend' event and this code passes params to callback
      };
      form.parse(req, res, form.complete);
      next();
    } else next();
  }
};

/**
 * Check if `req` is a valid form request.
 * 
 * @param {IncomingMessage} req
 * @return {Boolean}
 * @api private
 * @author TJ Holowaychuk <tj@vision-media.ca>
 */

function formRequest(req) {
  var contentType = req.headers['content-type'];
  if (!contentType) return;
  return req.body === undefined
    && (req.method === 'POST'
    || req.method === 'PUT')
    && (~contentType.indexOf('multipart/form-data')
    ||  ~contentType.indexOf('urlencoded'));
}