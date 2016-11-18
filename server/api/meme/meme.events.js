/**
 * Meme model events
 */

'use strict';

import {EventEmitter} from 'events';
var Meme = require('../../sqldb').Meme;
var MemeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MemeEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Meme.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    MemeEvents.emit(`${event}:${doc._id}`, doc);
    MemeEvents.emit(event, doc);
    done(null);
  };
}

export default MemeEvents;
