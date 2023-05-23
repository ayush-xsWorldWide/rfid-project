const AdminCred = require('../model/adminCred');
const RegData = require('../model/visiter');
const Events = require('../model/event');

const { mailerConfiramtion } = require('../utils/EventConfiramtion');

// utils
const { decrypt } = require("../utils/crypt");
const { generateToken } = require("../utils/token");

exports.LoginPage = (req, res) => {
    return res.render('admin/login', {
        status: ""
    });
}

exports.ActionLogin = async (req, res) => {
    // console.log(req.body);
    const { userid, password } = req.body;
    if (!userid || !password) {
        if (!userid) {
            return res.render('admin/login', {
                status: "Warning",
                message: "Enter the user Id"
            });
        }
        if (!password) {
            return res.render('admin/login', {
                status: "Warning",
                message: "Enter the password"
            });
        }
    }
    try {
        const data = await AdminCred.findOne({ userid });
        // console.log(data);
        if (!data) {
            return res.render('admin/login', {
                status: "Error",
                message: "User Doest exist!"
            });
        }
        if (await decrypt(data.password, password)) {
            let token = generateToken({ userid: data.userid });
            res.cookie("token", token);
            return res.redirect('/dashboard');
        }
        return res.render('admin/login', {
            status: "Error",
            message: "Invald Password!"
        });
    }
    catch (error) {
        console.log(error);
        return res.render('admin/login', {
            status: "Error",
            message: "Server error!"
        });
    }
}

// admin dashboard
exports.showDashboard = (req, res) => {
    return res.render('admin/dashboard', {
        user: req.user.userid
    })
}








// // add card 
// exports.showAddCard = (req,res)=>{
//     return res.render('admin/addcard',{
//         status:'',
//         message:'',
//         user: req.user.userid
//     })
// }
// exports.addCardInfo = async(req,res)=>{
//     const { actualId } = req.body;
//     console.log(actualId);
//     if(!Number(actualId)){
//         return res.render('admin/addcard',{
//             status: "Warning",
//             message: "Card number should be in digits!",
//             user: req.user.userid
//         });
//     }
//     try{
//         await AddCard.create(req.body);
//         return res.render('admin/addcard',{
//             status: "Success",
//             message: "Card Added!",
//             user: req.user.userid
//         });
//     }
//     catch(error)
//     {
//         return res.render('admin/addcard',{
//             status: "Error",
//             message: "Server Error!"
//         });
//     }
// }
//end of add card


// logout action
exports.ActionLogout = (req, res) => {
    res.clearCookie("token");
    res.redirect('/alogin');
}

// find all registration
exports.findAllRegstration = async (req, res) => {
    try {
        const data = await RegData.find({eventname: req.params.eventname});
        // console.log(data);
        return res.render('admin/showreg',{
            data: data,
            user: req.user.userid
        })
    }
    catch (error) {
        console.log(error);
        return res.render('admin/login', {
            status: "Error",
            message: "Server error!"
        });
    }
}


exports.createEvent = (req,res)=>{
    return res.render('admin/createEvent',{
        user: req.user.userid,
        status:''
    });
}
exports.createEventHandler = async(req,res)=>{
    console.log(req.headers.host);
    try{
        const { name, place, time, date, email } = req.body;
        console.log(name, place, time, date);
        // if()
        await Events.create(req.body);

        mailerConfiramtion({
            email: req.body.email,
            message: `You have Successfully created a event called ${name}`,
            link: req.headers.host+`/cregister/${name}`
        });

        return res.render('admin/createEvent',{
            user: req.user.userid,
            status:'Success'
        });
    }
    catch(error)
    {
        return res.render('admin/createEvent', {
            status: "Error",
            user: req.user.userid,
            message: "Server error!"
        });
    }
}
exports.fetchEvents = async(req,res)=>{
    try{
        const data = await Events.find({});
        return res.render('admin/showEvents', {
            status: "",
            data: data,
            user: req.user.userid,
        });
    }
    catch(error)
    {
        console.log("Some error occured!");
        // return res.render('admin/showEvent', {
        //     status: "Error",
        //     message: "Server error!"
        // });
    }
}