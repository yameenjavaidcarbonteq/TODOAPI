
const { MongoClient } = require('mongodb');
const MongoDBAdapter = require('../infrastructure/mongoAdapter');

class MongoDBClient {
  constructor(url, dbName, collectionName) {
    this.url = url;
    this.dbName = dbName;
    this.collectionName = collectionName;
    this.client = null;
    this.db = null;
    this.collection = null;
  }

  async connect() {
    this.client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
    await this.client.connect();
    this.db = this.client.db(this.dbName);
    this.collection = this.db.collection(this.collectionName);
  }

  async disconnect() {
    await this.client.close();
  }

  getAdapter() {
    return new MongoDBAdapter(this.collection);
  }
}

module.exports = MongoDBClient;