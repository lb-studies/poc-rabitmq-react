import amqp from "amqplib";

const queue = "livetimeq";
const text = {
  item_id: "id",
  pilot_name: "teste",
  time: "5.0"
};

(async () => {
  let connection;
  try {
    connection = await amqp.connect("amqps://apewvoke:EVJl8ZV1Z2jEJeFYCwggKIentQBKCEsd@jackal.rmq.cloudamqp.com/apewvoke");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
    console.log(" [x] Sent '%s'", text);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
})();