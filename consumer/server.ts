import amqp from "amqplib";

const queue = "livetimeq";

(async () => {
  try {
    const connection = await amqp.connect("amqps://lhpxxbug:KGhPBF5GEoFz0W0igq_iYegvyakjUYj8@jackal.rmq.cloudamqp.com/lhpxxbug");
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue(queue, { durable: true });

    console.log(` [*] Waiting for messages in queue '${queue}'. To exit press CTRL+C`);

    await channel.consume(
      queue,
      (message) => {
        if (message) {
          console.log(
            " [x] Received '%s'",
            message.content.toString()
          );
        }
      },
      { noAck: true }
    );

  } catch (err) {
    console.error("Error:", err);
  }
})();
