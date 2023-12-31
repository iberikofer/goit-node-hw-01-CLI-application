const contacts = require("./db/contacts")
const { Command } = require('commander');
const program = new Command();
program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case 'list':
			contacts.listContacts().then(data => console.log(data)).catch(err => console.log(err));
			break;

		case 'get':
			contacts.getContactById(id).then(data => console.log(data)).catch(err => console.log(err));
			break; ''

		case 'add':
			contacts.addContact(name, email, phone).then(data => console.log(data)).catch(err => console.log(err));
			break;

		case 'remove':
			contacts.removeContact(id).then(data => console.log(data)).catch(err => console.log(err));
			break;

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
}

invokeAction(argv);