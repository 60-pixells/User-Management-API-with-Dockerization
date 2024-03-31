import User from "../models/User.js";

// Function to validate the username
export async function validateUserName(userName) {
    // Regular expression to match only alphabets (case insensitive)
    const alphabetRegex = /^[a-zA-Z]+$/;

    // Check if the username contains only alphabets
    if (!alphabetRegex.test(userName)) {
        throw new Error('Username should contain only alphabets');
    }

    // Check if the username exists in the Users collection in the database
    const existingUserObj = await User.findOne({ userName });
    if (existingUserObj) {
        throw new Error('Username already exists');
    }
}

export async function validateEmail(eMail) {
    // Regular expression to match email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the email regex
    if (!emailRegex.test(eMail)) {
        throw new Error('Invalid email format');
    }

    // Check if the email exists in the Users collection in the database
    const existingUser = await User.findOne({ eMail });
    if (existingUser) {
        throw new Error('Email already exists');
    }
}

export async function validateUserId(userId) {
    // Check if the userId exists in the Users collection in the database
    const existingUser = await User.findOne({ userId });
    if (!existingUser) {
        throw new Error('User does not exists');
    }
}