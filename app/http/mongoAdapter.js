const { MongoClient } = require('mongodb');

class MongoAdapter {
  constructor(url) {
    this.url = url;
  }

  async connect() {
    this.client = await MongoClient.connect(this.url);
    this.db = this.client.db();
  }

  async disconnect() {
    await this.client.close();
  }

  async find(collectionName, query) {
    const collection = this.db.collection(collectionName);
    return collection.find(query).toArray();
  }

  async insert(collectionName, data) {
    const collection = this.db.collection(collectionName);
    return collection.insertOne(data);
  }

  async update(collectionName, query, data) {
    const collection = this.db.collection(collectionName);
    return collection.updateOne(query, { $set: data });
  }

  async delete(collectionName, query) {
    const collection = this.db.collection(collectionName);
    return collection.deleteOne(query);
  }
}

module.exports = MongoAdapter;