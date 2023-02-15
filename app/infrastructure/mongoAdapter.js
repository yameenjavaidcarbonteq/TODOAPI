
// we will be using ObjectId when our adapter gets imported 
/*
The ObjectId class is a built-in class in the MongoDB Node.js driver that 
is used to represent the unique identifier for a MongoDB document. MongoDB 
automatically assigns a unique _id field to every document, which is of 
the ObjectId type by default.
When performing database operations, you need to use the ObjectId class to represent 
the _id field in the query, since the _id field is of the ObjectId type.


*/
class MongoAdapter {
  constructor(collection) {
    this.collection = collection;
  }
  
  async find(query) {
    
    const data = this.collection.find(query).toArray();
    return data;
  }

  async findById(id) {
    return await this.collection.findOne({ _id: id });
  }

  async insert(data) {
    
    console.log(data);
    const return_val = this.collection.insertOne(data);
    console.log(return_val);
  }

  async update(query, data) {
    return this.collection.updateOne(query, { $set: data });
  }

  async delete(query) {
    return this.collection.deleteOne(query);
  }
}

module.exports = MongoAdapter;