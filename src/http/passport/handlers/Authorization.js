export const authorization = async (payload, done) => {
  try{
    const foundedUser = await adapter.findOne({id: payload.id});
    done(null, foundedUser);
  }catch(error){
    done(error.null);
  }
};