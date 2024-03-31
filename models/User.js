import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    eMail: {
        type: String,
        required: true,
    }
});


const Users = mongoose.model(
    "User",
    UserSchema,
    "Users"
);

export default Users;