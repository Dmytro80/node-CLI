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

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  const deletedContact = contacts[index];

  if (index !== -1) {
    contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return deletedContact;
  }

  return null;
}

module.exports = { listContacts, getContactById, addContact, removeContact };
