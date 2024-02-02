const serverConfig = {
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT ?? 4000,
  enviroment: process.env.NODE_ENV ?? "development",
};

export default serverConfig;
