const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

/*Schema pour les user

on install le package unique validator de mongoose, ensuite on ecrit  le schema
donc infos user, et on rajoute le unique, pour qu'une seule adresse mail
soit enregistré par compte.

et on export evidemment
*/
