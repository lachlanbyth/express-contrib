
/*!
 * Express - Contrib - configure
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var express = require('express')
  , Server = express.Server;

// Proxy listen

var listen = Server.prototype.listen;

/**
 * Proxy listen() to provide async support.
 *
 * @api public
 */

Server.prototype.listen = function(){
  if (this.__config) {
    this.__listen = arguments;
  } else {
    listen.apply(this, arguments);
  }
};

// Proxy configure

var configure = Server.prototype.configure;

/**
 * Proxy configure() to provide async support.
 *
 * @api public
 */

Server.prototype.configure = function(env, fn){
  var self = this;
  this.__config = this.__config || 0

  if (typeof env === 'function') {
    fn = env, env = 'all';
  }

  if ('all' == env || env == this.settings.env) {
    if (fn.length) {
      ++this.__config;
      fn.call(this, function(err){
        if (err) throw err;
        --self.__config || listen.apply(self, self.__listen);
      });
    } else {
      fn.call(this);
    }
  }
  return this;
};