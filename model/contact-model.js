const mongoose = require('mongoose');
const { Schema } = mongoose;
const contactSchema = new Schema({
	nome: Schema.Types.String,
	canal: Schema.Types.String,
	valor: Schema.Types.String,
	obs: Schema.Types.String
}, {
	versionKey: false
});
contactSchema.method('toDTO', function() {
	return {
		id: this._id,
		nome: this.nome,
		canal: this.canal,
		valor: this.valor,
		obs: this.obs
	}
});
mongoose.model('Contact', contactSchema);