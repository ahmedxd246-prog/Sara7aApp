import Joi from 'joi';

export const generalFeild = {
  firstName: Joi.string().min(3).max(20),
  lastName: Joi.string().min(3).max(20),
  age: Joi.number().integer().min(16),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]+$')),
  gender: Joi.string().valid('male', 'female'),
  phone: Joi.string().length(11),
};

// register
export const register = Joi.object({
  firstName: generalFeild.firstName.required(),
  lastName: generalFeild.lastName.required(),
  age: generalFeild.age.required(),
  email: generalFeild.email.required(),
  password: generalFeild.password.required(),
  gender: generalFeild.gender.required(),
  phone: generalFeild.phone.required(),
});

// login
export const login = Joi.object({
  email: generalFeild.email.required(),
  password: generalFeild.password.required(),
});

//activate account
export const activateAccount = Joi.object({
  token: Joi.string().required(),
});

export const updateProfile = Joi.object({
  firstName: generalFeild.firstName,
  lastName: generalFeild.lastName,
  age: generalFeild.age,
  email: generalFeild.email,
  password: generalFeild.password,
  gender: generalFeild.gender,
  phone: generalFeild.phone,
});


export const changePassword = Joi.object({
  password: generalFeild.password.required(),
  newPassword: generalFeild.password.not(Joi.ref('password')).required(),
  confirmPassword: generalFeild.password.valid(Joi.ref('newPassword')),
});
