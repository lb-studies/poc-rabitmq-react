import amqp from "amqplib";

const queue = "ranking";
const text = {
  item_id: "id",
  pilot_name: "Davi Sermarine",
  time: "27.8"
};

(async () => {
  let connection;
  try {
    connection = await amqp.connect("amqp://user:password@localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
    console.log(" [x] Sent '%s'", text);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
})();