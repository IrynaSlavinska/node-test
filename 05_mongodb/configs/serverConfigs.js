const serverConfig = {
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT ?? 4000,
};

export default serverConfig;
