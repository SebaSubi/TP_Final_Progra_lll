
import { Schema, model, models } from "mongoose";

//La estructura de los datos que se van a guardar en la base de datos
export const UserSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
    minLength: [3, "Fullname must be at least 3 characters long"],
    maxLength: [50, "Fullname must be at most 50 characters long"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [ /.+@.+\..+/,
    "Email is not valid"
  ]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false
  },
});

//opciones de la base de datos
const User = models.User || model("User", UserSchema);
export default User;

