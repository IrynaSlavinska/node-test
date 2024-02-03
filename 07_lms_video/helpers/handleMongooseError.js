export const handleMongooseError = (error, dete, next) => {
  error.status = 400;
  next();
};
