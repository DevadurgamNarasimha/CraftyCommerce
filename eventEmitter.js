const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('greet', () => {
    console.log('Hello! Welcome to Event-Driven Programming in Node.js');
});
emitter.emit('greet');
