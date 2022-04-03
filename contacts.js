const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(data));
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(data).find((contact) => contact.id === contactId));
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const newData = JSON.parse(data).filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newData), "utf8");
    const addedData = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(addedData));
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsData = JSON.parse(data);
    const newId = `${parsData.length + 1}`;
    parsData.push({
      id: newId,
      name: name,
      email: email,
      phone: phone,
    });
    await fs.writeFile(contactsPath, JSON.stringify(parsData), "utf8");
    const newData = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(newData));
  } catch (error) {
    console.error(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
