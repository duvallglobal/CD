import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log' })
  ]
});

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { metadata: err });
  res.status(500).json({ error: 'An unexpected error occurred' });
};

export default errorHandler;
