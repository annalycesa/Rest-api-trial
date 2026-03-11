import amqp from 'amqplib';

let channel;

async function connectRabbitMQ(){
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();

    await channel.assertQueue('send-email');

    console.log('Connected to RabbitMQ');
}

function getChannel () {
    return channel;
}

export { connectRabbitMQ, getChannel };