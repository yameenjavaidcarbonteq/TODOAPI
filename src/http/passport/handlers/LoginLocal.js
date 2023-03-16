// Login Using Local passport
export const loginLocal = async  (email, password, done) => {
  try 
  {
    let params = {};
    params.email = email;
    const query = new Queries.FindUserQuery(params);
    const user = await this.QueryBus.execute(query);
    
    logger.info(`Finding User for email: ${params}`);
    
    if (user) 
    {
      logger.info(`Found User: ${user}`);
      if (user.password) 
      {
        (await bcrypt.compare(password, user.password))
          ? done(null, user)
          : done(null, null);
      } else
      done(null, false);
    } 
    else {
      done(null, false);
    }
  }
  catch (error) 
  {
    done(error, null);
  }
}