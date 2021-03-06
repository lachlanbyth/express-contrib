
/**
 * Module dependencies.
 */

var express = require('express')
  , contrib = require('express-contrib')
  , assert = require('assert');

// Faux redis

var redis = {
  store: {},
  hmget: function(key, fn){
    var self = this;
    process.nextTick(function(){
      fn(null, self.store[key]);
    });
  },
  
  hmset: function(key, obj, fn){
    var self = this;
    process.nextTick(function(){
      self.store[key] = obj;
      fn();
    });
  }
}

module.exports = {
  setup: function(done){
    redis.hmset('settings', {
        title: 'Async example'
      , foo: 'bar'
      , bar: 'baz'
    }, done);
  },

  'test async configure()': function(){
    var app = express.createServer()
      , order = [];

    app.configure(function(done){
      redis.hmget('settings', function(err, obj){
        for (var key in obj) {
          app.set(key, obj[key]);
        }
        order.push('async 1');
        done();
      });
    });

    app.configure(function(done){
      process.nextTick(function(){
        order.push('async 2');
        app.set('tobi', 'is cool');
        done();
      });
    });

    app.configure(function(){
      order.push('sync');
      app.enable('sync');
    });

    app.on('listening', function(){
      assert.deepEqual(['sync', 'async 1', 'async 2'], order);
      assert.strictEqual(true, app.set('sync'), 'sync configure() never called');
      assert.equal('is cool', app.set('tobi'));
      assert.equal('Async example', app.set('title'));
      assert.equal('bar', app.set('foo'));
      assert.equal('baz', app.set('bar'));
      app.close();
    });

    app.listen(9999);
    assert.ok(!app.fd, 'listen() was not deferred');
  }
};