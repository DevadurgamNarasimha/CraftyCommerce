const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('userRegistered', (username, email) => {
    console.log(`User ${username} has been successfully registered with email ${email}!`);
    setTimeout(() => {
        emitter.emit('sendConfirmationEmail', email);
    }, 2000);
});
emitter.on('sendConfirmationEmail', (email) => {
    console.log(`Confirmation email sent to ${email}`);
});
emitter.emit('userRegistered', 'JohnDoe', 'johndoe@example.com');
