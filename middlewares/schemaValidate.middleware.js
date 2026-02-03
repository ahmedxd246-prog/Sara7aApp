
export const validate = (schema) => {
  return (req, res, next) => {
    const data = {
      ...req.body,
      ...req.params,
      ...req.query,
    };
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripunknown: true,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message),
      });
    }
    next();
  };
};
