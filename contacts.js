const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
  const dataString = await fs.readFile(contactsPath, { encoding: 'utf8' });
  const contacts = JSON.parse(dataString);

  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contactById = contacts.find(contact => contact.id === contactId);

  return contactById ? contactById : null;
}

async function addContact(name, email, phone) {
  const newContact = { id: uuidv4(), name, email, phone };

  const contacts = await listContacts();

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const updatedContacts = contacts.filter(contact => contact.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
}

module.exports = { listContacts, getContactById, addContact, removeContact };
