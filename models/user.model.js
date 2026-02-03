import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
    },
    age: {
      type: Number,
      required: true,
      min: 12,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    verifiedAt: Date,
    emailToken: String,
    emailTokenExpires: Date,
    password: {
      type: String,
      required: true,
      // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/,
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,
    phone: {
      type: String,
      unique: true,
      required: true,
      match: /^01[0-9]{9}$/,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    changedAt: Date,
  },
  { timestamps: true },
);

userSchema.methods.correctPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
