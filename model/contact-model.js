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
mongoose.model('Contact', contactSchema);