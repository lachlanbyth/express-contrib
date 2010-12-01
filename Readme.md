
# Express Contrib
      
  [Express](http://expressjs.com) utilities which do not belong in core, however prove useful.

## Installation

npm:

    $ npm install express-contrib

## Modules

  * Flash notification rendering (_express-messages_)

## Module Usage

You may either require the specific module, for example:

    var messages = require('express-messages');

or access via the main _express-contrib_ module which is useful when
utilizing many of the modules:

    var contrib = require('express-contrib');
    var messages = contrib.messages;

## express-messages

The _express-messages_ module provides flash notification rendering. To use simply assign it to a dynamic helper:

    app.dynamicHelpers({ messages: require('express-messages') });

Then in a view you may output the notifications:

    <%- messages() %>

Which outputs HTML as shown below:

    <div id="messages">
      <ul class="info">
        <li>Email queued</li>
        <li>Email sent</li>
      </ul>
      <ul class="error">
        <li>Email delivery failed</li>
      </ul>
    </div>

## express-namespace

The _express-namespace_ module provides namespace capabilities to express. The example below may respond to any of the following requests:

    GET /forum/12
    GET /forum/12/view
    GET /forum/12/edit
    GET /forum/12/thread/5
    DELETE /forum/12

To utilize this module simply `require('express-contrib')`, or if you prefer to __only__ utilize namespacing `require('express-namespace')`, and `app.namespace()` will automatically be available to you.

Usage is as follows, simply pass a callback function and route to the method, after each callback invocation is complete, the namespace is restored to it's previous state.

    app.namespace('/forum/:id', function(){
      app.get('/(view)?', function(req, res){
        res.send('GET forum ' + req.params.id);
      });
      
      app.get('/edit', function(req, res){
        res.send('GET forum ' + req.params.id + ' edit page');
      });

      app.namespace('/thread', function(){
        app.get('/:tid', function(req, res){
          res.send('GET forum ' + req.params.id + ' thread ' + req.params.tid);
        });
      });

      app.del('/', function(req, res){
        res.send('DELETE forum ' + req.params.id);
      });
    });

## Contributors

The following are the major contributors of Express Contrib (in no specific order).

  * TJ Holowaychuk ([visionmedia](http://github.com/visionmedia))

## Running Tests

First make sure you have the submodules:

    $ git submodule update --init

Then run the tests:

    $ make test

## License 

(The MIT License)

Copyright (c) 2010 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
