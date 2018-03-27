const params = require('../../config/params');
params.dbUrl = params.dbUrl + 'Test';
params.userId = 'userId';
params.userKey = 'userKey';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const mongoose = require('mongoose');

describe('Server test', function() {
	let server;
	this.timeout(10000);
	const contact = {
		nome: 'foo',
		canal: 'email',
		valor: 'example@email.com',
		obs: 'foobar'
	};
	let contactId;
	const userAuth = Buffer.from(`${params.userId}:${params.userKey}`).toString('base64');
	before('Start server and clean DB', async () => {
		server = await require('../../server');
		await mongoose.connection.dropDatabase();
	});
	it('Should refuse the request without the Authorization header', (done) => {
		chai
			.request(server)
			.get('/')
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				chai.expect(res).to.have.status(401);
				chai.expect(res).to.have.header('WWW-Authenticate');
				chai.expect(res).to.have.header('WWW-Authenticate', /^Basic/);
				done();
			});
	});
	it('Should allow the request with the Authorization header', (done) => {
		chai
			.request(server)
			.get('/')
			.set({
				'Authorization': userAuth
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				chai.expect(res).to.have.status(404);
				chai.expect(res).not.have.header('WWW-Authenticate');
				done();
			});
	});
	it('Should insert a new contact', (done) => {
		chai
			.request(server)
			.post('/')
			.set({
				'Authorization': userAuth
			})
			.send(contact)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				chai.expect(res).to.have.status(201);
				chai.expect(res).to.have.header('Location');
				chai.expect(res.header.location).exist;
				contactId = res.header.location.replace('/', '');
				done();
			});
	});
	it('Should get the inserted contact', (done) => {
		chai
			.request(server)
			.get(`/${contactId}`)
			.set({
				'Authorization': userAuth
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				chai.expect(res).to.have.status(200);
				chai.expect(res.body.id).exist;
				chai.expect(res.body.nome).to.be.equal(contact.nome);
				chai.expect(res.body.canal).to.be.equal(contact.canal);
				chai.expect(res.body.valor).to.be.equal(contact.valor);
				chai.expect(res.body.obs).to.be.equal(contact.obs);
				done();
			});
	});
	it('Should insert multiple new contacts', (done) => {
		const f = function(newCont, cb) {
			chai
				.request(server)
				.post('/')
				.set({
					'Authorization': userAuth
				})
				.send(newCont)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					chai.expect(res).to.have.status(201);
					chai.expect(res).to.have.header('Location');
					chai.expect(res.header.location).exist;
					cb();
				});
		};
		const c1 = Object.assign({}, contact, {
			nome: 'FOO',
			valor: 'email2@yahoo.com.br'
		});
		const c2 = Object.assign({}, contact, {
			nome: 'BAR',
			valor: 'email3@gmail.com.br'
		});
		const c3 = Object.assign({}, contact, {
			nome: 'FOObar',
			valor: 'email4@gmail.com'
		});
		const c4 = Object.assign({}, contact, {
			nome: 'fooBAR',
			valor: 'email5@msn.com'
		});
		f(c1, () => {
			f(c2, () => {
				f(c3, () => {
					f(c4, done);
				});
			});
		});
	});
	it('Should recover the inserted contacts', (done) => {
		chai
			.request(server)
			.get('/')
			.set({
				'Authorization': userAuth
			})
			.query({
				size: 3,
				page: 1
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				chai.expect(res).to.have.status(200);
				chai.expect(res.body).exist;
				chai.expect(res.body.length).exist;
				chai.expect(res.body.length).to.be.equal(2);
				done();
			});
	});
	it('Should update contact', (done) => {
		chai
			.request(server)
			.put(`/${contactId}`)
			.send({
				nome: contact.nome + 't',
				canal: contact.canal,
				valor: contact.valor,
				obs: contact.obs + 't'
			})
			.set({
				'Authorization': userAuth
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				chai.expect(res).to.have.status(204);
				done();
			});
	});
	it('Should delete a contact', (done) => {
		chai
			.request(server)
			.delete(`/${contactId}`)
			.set({
				'Authorization': userAuth
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				chai.expect(res).to.have.status(204);
				done();
			});
	});
	after('Clean DB', async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});	
});