import amqp, { Connection } from "amqplib";
import 'dotenv/config';

const queue = "livetimeq";
let counter = 1;

function incrementCounter() {
  return counter++;
}

function generateRandomName(): string {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const randomChar = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);

  const randomWord = () => {
      const length = Math.floor(Math.random() * 10) + 1;
      let word = capitalize(randomChar());
      for (let i = 1; i < length; i++) {
          word += randomChar();
      }
      return word;
  };

  return `${randomWord()} ${randomWord()}`;
}

(async () => {
  let connection;
  try {
    const connectionString: string = process.env.CONNECTION_STRING ? process.env.CONNECTION_STRING : '';
    connection = await amqp.connect(connectionString);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });
    
    const interval = setInterval(async () => {
      const text = {
        item_id: `text.item_id - ${generateRandomName()}`,
        pilot_name: `text.pilot_name - ${generateRandomName()}`,
        time: `text.time - ${incrementCounter()}`
      };

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));

      console.log(" [x] Sent '%s'", text);
    }, 1000);
    
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    
    clearInterval(interval);
    await channel.close();
    
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
})();
