const Vistiter = require('../model/visiter');
const Events = require('../model/event');
const { mailer } = require('../utils/mailer');

exports.showRegisterPage = async(req, res) => {
    try{
        const data = await Events.find({}); 
        return res.render('register', {
            status: '',
            data: data
        });
    }
    catch(error)
    {
        console.log("Some error occured!");
    }
}

exports.ActionRegisterPage = async (req, res) => {
    const { name, email, phone, cardno, eventname } = req.body;
    // console.log(name, email, phone, cardno);
    const data = await Events.find({});
    if (!name || !email || !phone || !cardno) {
        if (!name) {
            return res.render('register', {
                status: 'Warning',
                message: "Enter the name to proceed",
                data: data
            });
        }

        if (!email) {
            return res.render('register', {
                status: 'Warning',
                message: "Enter the email to proceed",
                data: data
            });
        }

        if (!phone) {
            return res.render('register', {
                status: 'Warning',
                message: "Enter your phone number to proceed",
                data: data
            });
        }

        if (!cardno) {
            return res.render('register', {
                status: 'Warning',
                message: "Enter the card number to proceed",
                data: data
            });
        }
    }
    if(eventname == "Select a Event")
    {
        return res.render('register', {
            status: 'Warning',
            message: "please select the event before you go!",
            data: data
        });
    }
    if (phone.length > 10 || phone.length < 10) {
        return res.render('register', {
            status: 'Warning',
            message: "The phone number should be of 10 Digits",
            data: data
        });
    }
    try {
        await Vistiter.create(req.body);
        
        mailer({
            email: req.body.email,
            message: "Please activate your card!"
        });
        return res.render('register', {
            status: 'Success',
            data: data
        });
    }
    catch (error) {
    // console.log(error);
        if(error.code == 11000)
        return res.render('register', {
            status: 'Error',
            message: `${Object.keys(error.keyPattern)} already Exist!`,
            data: data
        });
    }
}