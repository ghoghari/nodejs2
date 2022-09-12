const UserModel = require('../mongodb/UserSchema');
const { msgModel, GroupchatModel } = require('../mongodb/msgSchema.js');
class UserController {

    static register = async (req, res) => {
        // console.log(req.body);
        const { name, user, pass, cpass } = req.body;
        if (name && user && pass && cpass) {
            if (pass == cpass) {
                let existuser = await UserModel.findOne({ username: user });
                if (existuser) return res.json({ "message": "username already in use" });
                let newUser = new UserModel({
                    name: name,
                    username: user,
                    password: pass
                });
                await newUser.save();
                res.json({ "message": "Registered Successfully" });
            } else {
                res.json({ "message": "password and confirm password must be same" });
            }
        } else {
            res.json({ "message": "All Fields are required" });
        }
    }

    static login = async (req, res) => {
        // console.log(req.body);
        try {
            const { username, password } = req.body;

            const user = await UserModel.findOne({ username: username });
            // console.log(user.password);
            if (user) {
                if (user.password == password) {
                    return res.status(200).json({ user, "message": "Login successfully" });
                } else {
                    return res.status(400).json({ "message": "username or password is invalid" });
                }
            } else {
                return res.status(400).json({ "message": "usernot found " })
            }
        }
        catch (err) {
            return res.status(400).json(err);
        }

    }

    static AllUsers = async (req, res) => {
        console.log(req.body);
        let allusers = await UserModel.find();
        let group = await GroupchatModel.find();
        let groups =[];
        group.forEach((e)=>{
            if(e.members.includes(req.body._id)){
                groups.push(e);
            }
        })
        console.log(groups);
        res.json({allusers,groups});
    }

    static currentUser = async (req, res) => {
        let user = await UserModel.findById(req.body._id);
        res.json(user);
    }

}

class MessageController {

    static newMessage = async (req, res) => {
        // console.log(req.body);
        let user1 = req.body.sender;
        let user2 = req.body.receiver;

        let chat = await msgModel.find({ chatName: `${user1}${user2}` })
        let chat2 = await msgModel.find({ chatName: `${user2}${user1}` })
        // console.log(chat)
        // console.log(chat2)
        if (chat.length != 0 || chat2.length != 0) {
            if (chat.length != 0) {
                let newMessage = {
                    sender: user1,
                    receiver: user2,
                    message: req.body.msg,
                }

                chat[0].message.push(newMessage);
                await chat[0].save();

            }
            if (chat2.length != 0) {
                let newMessage = {
                    sender: user1,
                    receiver: user2,
                    message: req.body.msg,
                }
                chat2[0].message.push(newMessage);
                await chat2[0].save();
            }

        } else {
            let newMsg = new msgModel({
                chatName: `${user1}${user2}`,
                message: [
                    {
                        sender: user1,
                        receiver: user2,
                        message: req.body.msg,
                    }
                ]
            })
            await newMsg.save();
        }

    }

    static message = async (req, res) => {
        // console.log(req.body);
        let user1 = req.body.sender;
        let user2 = req.body.receiver;
        // console.log(user1 ,user2);
        let chat = await msgModel.find({ chatName: `${user1}${user2}` })
        let chat2 = await msgModel.find({ chatName: `${user2}${user1}` })
        if (chat2.length != 0 || chat.length != 0) {
            if (chat.length != 0) {
                res.json(chat[0].message);
            } else {
                res.json(chat2[0].message);

            }
        } else {
            res.json({ "message": "no msgs" })
        }
    }

    static groupMessage = async (req, res) => {
        // console.log(req.body);
        let groupName = req.body.groupName;
        let groupMembers = req.body.member;
        console.log(groupName, groupMembers);
        let newGroup = new GroupchatModel({
            groupName: groupName,
            members: groupMembers
        })

        await newGroup.save();
        res.json({ "message": "group created Successfully" });
    }

    static newGroupMessage = async (req, res) => {
        console.log(req.body);
        let groupName = req.body.groupName;
        let sender = req.body.sender;
        let message = req.body.message;

        if (groupName) {
            let group = await GroupchatModel.find({ groupName: groupName });
            if (group.length != 0) {
                let receiver =[];
                group[0].members.filter((e)=>{
                    if(e != sender){
                        receiver.push(e);
                    }
                })
                let newGroupMessage = {
                    sender: sender,
                    receiver: receiver,
                    message: message
                }
                group[0].messages.push(newGroupMessage);
                await group[0].save();
                res.json({ "message": "sent successfully" });
            } else {
                res.json({ "message": "No group found" });
            }
        } else {
            res.json({ "message": "No group selected" });
        }
    }

    static currentGroup = async (req,res)=>{
        let groupName = await GroupchatModel.findById(req.body._id);
        res.json(groupName);
    }

    static lastMessage = async (req,res)=>{
        console.log(req.body);
        let sender = req.body.sender;
        let receiver = req.body.receiver;
        
    }
}

module.exports = { UserController, MessageController };