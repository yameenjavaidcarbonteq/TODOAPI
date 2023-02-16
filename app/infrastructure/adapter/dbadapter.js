
// we will be using ObjectId when our adapter gets imported 
/*
    advanceddb interface
*/
class advanceddb {
    constructor(parameters) {
        if (new.target === advanceddb) {
          throw new TypeError("Cannot instantiate abstract class");
        }
    }
    
    async connect() {
        throw new Error("Method 'area' must be implemented.");
    }
    
    async disconnect() {
        await this.client.close();
    }
    
    getAdapter() {
        throw new Error("Method 'area' must be implemented.");
    }
    
    async find(query) {
        throw new Error("Method 'area' must be implemented.");
    }
    
    async finadvanceddbyId(id) {
        throw new Error("Method 'area' must be implemented.");
    }
    
    async insert(data) {
      
        throw new Error("Method 'area' must be implemented.");
    }
  
    async update(query, data) {
        throw new Error("Method 'area' must be implemented.");
    }
  
    async delete(query) {
        throw new Error("Method 'area' must be implemented.");
    }

}
  
module.exports = advanceddb;