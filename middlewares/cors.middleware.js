import cors from 'cors';

const allowedOrigin = process.env.ALLOWED_ORIGINS?.split(',');
const corsOptions = {
  origin: function (origin, cb) {
    if (!origin) return cb(null, true);
    if (allowedOrigin.includes(origin)) {
      return cb(null, true);
    } else {
      return cb(new AppError('Not allowed by CORS', 403), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'X-Requested-With',
    'token',
  ],
};

export default cors(corsOptions);
