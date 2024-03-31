import User from "../models/User.js";
import { v4 as uuidv4 } from 'uuid';

import {
    validateUserName,
    validateEmail,
    validateUserId,
} from "../validations/UserValidations.js";

export async function getUsers(req, res) {
    try {
        let userObjs = await User.find();
        userObjs = userObjs.map((userObj) => {
            return {
                userName: userObj.userName,
                eMail: userObj.eMail,
            }
        });

        res.json(userObjs);
    }catch(error) {
        
        res.status(500).json({ error: error.message });
    }
}

export async function getUser(req, res) {
    try {
        const { id: userId } = req.params;
        await validateUserId(userId);
        const findCondition = { userId }
        const doc = await User.findOne(findCondition);
        res.status(200).json(doc);
    } catch(error) {
        
        res.status(500).json({ error: error.message });
    }

}

export async function createUser(req, res) {
    try {
        const { userName, eMail } = req.body;
        await validateUserName(userName);
        await validateEmail(eMail);
        const userObj = new User({
            userId: uuidv4(),
            userName,
            eMail,
        });
        const doc = await userObj.save();
        res.status(200).json(doc);
    } catch(error) {
         console.log("Error", error.message);
        res.status(500).json({ error: error.message });
    }
}


export async function updateUser(req, res) {
    try {
        const { userId, userName, eMail } = req.body;
        console.log("+++++++", userId);
        await validateUserId(userId);
        if(userName) {
            await validateUserName(userName);
        }
        if(eMail) {
            await validateEmail(eMail);
        }
        const updateConditon = {
            $set: {}
        };
        if(userName) {
            updateConditon.$set.userName = userName;
        }
        if(eMail) {
            updateConditon.$set.eMail = eMail;
        }
        const findCondition = { userId };
        const updatedUseObj = await User.updateOne(findCondition, updateConditon);
        res.status(200).json(updatedUseObj);
    } catch(error) {
        console.log("Error: ", error.message);
        res.status(500).json({error: error.message});
    }
}

export async function deleteUser(req, res) {
    try {
        const { userId } = req.body;
        await validateUserId(userId);
        const findCondition = { userId };
        const deletedUserObj = await User.deleteOne(findCondition);
        res.status(200).json(deletedUserObj);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}