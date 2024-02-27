const MongoDB = require("../db/mongo.db");
const db = new MongoDB("fault");

module.exports = {
  find() {
    return db.find();
  },

  findByUserId({id}) {
    return db.findByUserId(id);
  },

  retrieve(id) {
    return db.findById(id);
  },

  create(data) {
    return db.create(data);
  },

  put(id, data) {
    return db.put(id, data);
  },

  delete(id) {
    return db.delete(id);
  },
};
