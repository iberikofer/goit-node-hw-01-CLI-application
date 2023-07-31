const fs = require("node:fs/promises");
const path = require("path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
	const data = await fs.readFile(contactsPath, "utf8")
	return JSON.parse(data)
}

async function getContactById(contactId) {
	const data = await listContacts()
	const contact = data.find(contact => contact.id === contactId)
	if (contact) {
		return contact
	} else {
		return null
	}
}

async function addContact(name, email, phone) {
	const data = await listContacts()
	const contact = { id: crypto.randomUUID(), name, email, phone, }
	data.push(contact)
	fs.writeFile(contactsPath, JSON.stringify(data))
	return contact
}

async function removeContact(contactId) {
	const data = await listContacts()
	const index = data.findIndex(contact => contact.id === contactId)
	if (index === -1) {
		return null
	} else {
		const newContats = [...data.slice(0, index),
		...data.slice(index + 1)]
		fs.writeFile(contactsPath, JSON.stringify(newContats))
		return data.find(contact => contact.id === contactId)
	}
}


module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
