export const globalErrorHandler = (err, req, res, next) => {
  console.log(`Error ${err.message}`);

  if (serverConfig.enviroment === "production") {
    res.status(err.status ?? 500).json({
      message:
        !err.status || err.status === 500
          ? "Internal server error"
          : err.message,
    });
  }

  res.status(err.status ?? 500).json({
    message: err.message,
    data: err.data,
    stack: err.stack,
  });
};
