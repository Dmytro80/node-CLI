const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require('./contacts');

// addContact('vasja', 'kiki@gmail.com', '567-43-76');

async function foo(id) {
  const a = await removeContact(id);

  console.log(a);
}
foo('d044b1f3-30c0-4d2f-afae-59133fb791a2');
// listContacts();
