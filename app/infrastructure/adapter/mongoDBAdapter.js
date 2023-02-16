
const { MongoClient } = require('mongodb');
const db = require('./dbadapter');


class MongoAdapter extends db {
  constructor(parameters) {
    super();
    this.client = null;
    this.db = null;
    this.url = parameters.url + "/" + parameters.collection;
  }

  async connect() {
    this.client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
    await this.client.connect();
    this.db = this.client.db(this.dbName);
  }

  async disconnect() {
    await this.client.close();
  }

  async find(model) {
    
    const data = this.db.collection(model).find(query).toArray();
    return data;
  }

  async findById(model, id) {
    return await this.db.collection(model).findOne({ _id: id });
  }

  async insert(model, data) {
    const return_val = this.db.collection(model).insertOne(data);
    return return_val;
  }

  async update(model, query, data) {
    return this.db.collection(model).updateOne(query, { $set: data });
  }

  async delete(model, query) {
    return this.db.collection(model).deleteOne(query);
  }
}
  
module.exports = MongoAdapter;
