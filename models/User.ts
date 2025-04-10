import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  userName: String;
  firstName: String;
  lastName: String;
  birthDate: Date;
  email: String;
  password: String;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<Users>({
  userName: {
    type: String,
    required: [true, "Please choose a username"],
    maxLength: [60, "Name cannot be more than 60 characters"],
  },
  firstName: {
    type: String,
    required: [true, "Please include your full name"],
    maxLength: [60, "Name cannot be longer than 60 characters"]
  },
  lastName: {
    type: String,
    required: [true, "Please include your full name"],
    maxLength: [60, "Name cannot be longer than 60 characters"]
  },
  birthDate: {
    type: Date,
    required: [true, "Please include your birthdate"],
    maxLength: [8, "Name cannot be longer than 8 characters"]
  },
  email: {
    type: String,
    required: [true, "Please include your email"],
    maxLength: [60, "Name cannot be longer than 60 characters"]
  },
  password: {
    type: String,
    required: [true, "Please include your password"],
    maxLength: [60, "Name cannot be longer than 60 characters"]
  },
});

export default mongoose.models.User || mongoose.model<Users>('User', UserSchema);

module.exports = User;
