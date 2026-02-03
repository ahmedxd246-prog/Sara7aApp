import jwt from 'jsonwebtoken';
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_USER, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  });
};

export const generateAdminAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_ADMIN, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_ADMIN,
  });
};

export const generateEmailVerficationToken = (payload) => {
  return jwt.sign(payload, process.env.EMAIL_VERIFICATION_TOKEN_SECRET, {
    expiresIn: process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES,
  });
};

export const verifyEmailToken = (token) => {
  return jwt.verify(token, process.env.EMAIL_VERIFICATION_TOKEN_SECRET);
};
