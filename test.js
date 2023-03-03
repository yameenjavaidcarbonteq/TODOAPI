async function a() {
    try {
      const resultB = await b();
      return resultB;
    } catch (error) {
      console.error(`Error in function a: ${error.message}`);
      return [];
    }
  }
  
  async function b() {
    try {
      const result = await c();
      return result;
    } catch (error) {
      console.error(`Error in function b: ${error.message}`);
      // throw error;
    }
  }
  
  async function c() {
    // try {
      const result = await d();;
    //   console.info("Came Here");
    throw new Error("Division by zero");
    //   return result;
    // } catch (error) {
    //   console.error(`Error in function c: ${error.message}`);
    //   throw error;
    // }
  }

  async function d() {
    return new Promise((resolve, reject) => {
        // Do some async work here
        setTimeout(() => {
          resolve("Done");
        }, 1000);
      });
  }
  
a().then((res)=>{
console.log(res);})