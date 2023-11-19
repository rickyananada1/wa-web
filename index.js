const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
   qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
    if (message.body === 'ricky') {
        const contact = await message.getContact();
        if (contact) {
            message.reply('Ou, ' + contact.name);
        } else {
            message.reply('Ou, ' + message.from);
        }
    } else {
        const contact = await message.getContact();
        setTimeout(() => {
            message.reply('Maaf ' + contact.name + ', saya akan segera membalas pesan anda ketika saya online');
        }, 2 * 60 * 1000);
    }
});

client.initialize();
