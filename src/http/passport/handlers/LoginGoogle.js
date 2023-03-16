export const loginGoogle = async  (accessToken, refreshToken, profile, done) => {
  try {
    let params = {};
    params.email = profile.emails[0].value;
    const query = new Queries.FindUserQuery(params);
    const user = await this.QueryBus.execute(query);
    
    logger.info(`Finding User for email: ${params}`);
    if (user) {
      logger.info(`Found User: ${user}`);
      done(null, user);
    } 
    else 
    {
      logger.info(`Creating New User with email ${query.email}`)
      user = await this.createNewUserGoogle(profile);
      done(null, user);
    }
  } catch (error) {
    done(error, null);
  }
}