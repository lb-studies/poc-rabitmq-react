import amqp from "amqplib";
import fs from "fs";
import path from "path";
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

    const xmlDir = path.join(__dirname, 'xml');
    const xmlFiles = fs.readdirSync(xmlDir).sort();

    let fileIndex = 0;
    const interval = setInterval(async () => {
      const fileName = xmlFiles[fileIndex];
      const filePath = path.join(xmlDir, fileName);
      const text = fs.readFileSync(filePath, 'utf-8');

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));

      console.log(" [x] Sent '%s'", text);

      fileIndex = (fileIndex + 1) % xmlFiles.length;
    }, 3000);

    await new Promise(resolve => setTimeout(resolve, 1000000));

    clearInterval(interval);
    await channel.close();

  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
})();
