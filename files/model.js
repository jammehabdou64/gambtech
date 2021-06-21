const getModelName = (name) => {
  return `
const mongoose = require("mongoose")
const ${name}Schema = new mongoose.Schema({

})

module.exports = mongoose.model('${name}',${name}Schema)
   `;
};
module.exports = getModelName;
