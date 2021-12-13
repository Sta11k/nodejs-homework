// const fs = require("fs").promises;
const chalk = require("chalk");
const { Command } = require("commander");
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require("./contacts.js");
const log = console.log;
log(chalk.black.bgRed.bold("Hello world!"));

const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      // log.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (contactById) {
        log(chalk.black.bgGreen(`Contact found: ${id} `));
        console.log(contactById);
      } else {
        log(chalk.black.bgRed(`Contact not found `));
      }
      break;

    case "add":
      const contact = await addContact(name, email, phone);
      if (contact) {
        log(chalk.green.bgWhite(`Add new contact: success`));
      } else {
        log(chalk.green.bgWhite(` Not add contact`));
      }
      break;

    case "remove":
      const filterContact = await removeContact(id);
      // const contacts = await listContacts();
      if (filterContact) {
        log(chalk.black.bgGreen(`Contact deleete:  `));
        console.table(filterContact);
      } else {
        log(chalk.black.bgRed(`Contact is not deleete `));
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv).then(() => log(chalk.black.bgGreen("Operation success")));
