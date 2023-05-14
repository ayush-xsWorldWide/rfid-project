const Vistiter = require('../model/visiter');
const { mailer } = require('../utils/mailer');

exports.showRegisterPage = (req, res) => {
    return res.render('register', {
        status: ''
    });
}

exports.ActionRegisterPage = async (req, res) => {
    const { name, email, phone, cardno } = req.body;
    // console.log(name, email, phone, cardno);
    if (!name || !email || !phone || !cardno) {
        if (!name) {
            return res.render('register', {
                status: 'Warning',
                message: "Enter the name to proceed"
            });
        }

        if (!email) {
            return res.render('register', {
                status: 'Warning',
                message: "Enter the email to proceed"
            });
        }

        if (!phone) {
            return res.render('register', {
                status: 'Warning',
                message: "Enter your phone number to proceed"
            });
        }

        if (!cardno) {
            return res.render('register', {
                status: 'Warning',
                message: "Enter the card number to proceed"
            });
        }
    }
    if (phone.length > 10 || phone.length < 10) {
        return res.render('register', {
            status: 'Warning',
            message: "The phone number should be of 10 Digits"
        });
    }
    try {
        await Vistiter.create(req.body);
        
        // mailer({
        //     email: req.body.email,
        //     message: "Please activate your card!"
        // });
        return res.render('register', {
            status: 'Success',
        });
    }
    catch (error) {
        console.log(error);
        return res.render('register', {
            status: 'Error',
            message: "Email already Exist!"
        });
    }
}