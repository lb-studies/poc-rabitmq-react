# PoC RabbitMQ + NodeJS + React

This is a proof of concept to demonstrate the technical and functional feasibility of using messaging, more specifically RabitMQ, to update information in a project based on nodeJS such as React, Angular, VueJS...

## Components

`docker-compose.yml` is used to run the RabbitMQ server.

**The Producer**
In the producer directory we have a nodeJS + express server which, when started, creates a queue called ranking and produces/sends a message.

**The consumer**
In the consumer directory we have a nodeJS + express server that is configured to listen to the ranking queue and print the content of the messages to the console immediately.

## How to use

1. Up RabbitMQ: open the terminal in the root directory and run the `docker-compose up` command. To test, access `http://locahost:15672` and use the username: user and password: password.

2. In another terminal window, access the `./consumer` directory:
2.1 Run `yarn install` to download dependencies
2.2 Run `yarn start` to raise the server

3. In a third terminal window, access the `./producer` directory:
2.1 Run `yarn install` to download dependencies
2.2 Run `yarn start` to raise the server

Therefore, the first message must already be sent to the queue and consumed by the consumer, you can check it by checking the output in the consumer window. From there you can edit and save the file `./producer/server.ts` and with each save a message will be produced and consumed instantly.

## What's next?

- Create a React project
- Read the queue from the react project and update a table

## Contribute ##

You can contribute to the source code in our [GitHub](https://github.com/lb-studies/poc-rabitmq-react) page.

1. Take a [fork](https://help.github.com/articles/fork-a-repo/) repository;
3. [Configure your](https://help.github.com/articles/configuring-a-remote-for-a-fork/);
2. Check [issues](https://github.com/lb-studies/poc-rabitmq-react/issues) and choose one that does not have anyone working;
4. [Sincronize seu fork](https://help.github.com/articles/syncing-a-fork/);
2. Create a branch to work on the issue of responsibility: `git checkout -b issue-17`;
3. Commit the changes you made: `git commit -m 'Review commits you did'`;
4. Make a push to branch: `git push origin issue-17`;
5. Make a [Pull Request](https://help.github.com/articles/using-pull-requests/) :D