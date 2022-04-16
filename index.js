const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      console.table(list);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      if(!contact){throw new Error(`Contact witn id=${id} not found`)}
      console.table(contact);
      break;

    case "add":
      const changedLis = await contacts.addContact(name, email, phone);
      console.table(changedLis);
      break;

    case "remove":
      const changedList = await contacts.removeContact(id);
      console.table(changedList);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
