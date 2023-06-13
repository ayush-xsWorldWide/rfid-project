const Vistiter = require('../model/visiter');
const Events = require('../model/event');
const { mailer } = require('../utils/mailer');

exports.showRegisterPage = async (req, res) => {
    try {
        const data = await Events.find({});
        // console.log(data);
        let flag = false;
        data.forEach(element => {
            if (element.name == req.params.eventname)
                flag = true;
        })
        if (flag) {
            return res.render('register', {
                status: '',
                eventname: req.params.eventname,
                data:{
                    name: '', 
                    email: '', 
                    phone: '', 
                    cardno: ''
                }
            });
        }
        return res.redirect('/404');
    }
    catch (error) {
        console.log("Some error occured!");
    }
}

exports.ActionRegisterPage = async (req, res) => {
    const { name, email, phone, cardno } = req.body;
    let eventname = req.params.eventname;

    // console.log(eventname);
    // console.log(name, email, phone, cardno, eventname);
    
    // check route
    var data = await Events.find({});
    let flag = false;
    data.forEach(element => {
        if (element.name == eventname)
        {
            flag = true;
            data = element
        }
    })
    if (!flag) return res.redirect('/404');
    // check ends

    if (!name || !email || !phone || !cardno) {
        if (!name) {
            return res.render('register', {
                status: 'Warning',
                message: "Enter the name to proceed",
                eventname: eventname,
                data:{
                    name: name, 
                    email: email, 
                    phone: phone, 
                    cardno: cardno
                }
            });
        }

        if (!email) {
            return res.render('register', {
                status: 'Warning',
                message: "Enter the email to proceed",
                eventname: eventname,
                data:{
                    name: name, 
                    email: email, 
                    phone: phone, 
                    cardno: cardno
                }
            });
        }

        if (!phone) {
            return res.render('register', {
                status: 'Warning',
                message: "Enter your phone number to proceed",
                eventname: eventname,
                data:{
                    name: name, 
                    email: email, 
                    phone: phone, 
                    cardno: cardno
                }
            });
        }

        if (!cardno) {
            return res.render('register', {
                status: 'Warning',
                message: "Enter the card number to proceed",
                eventname: eventname,
                data:{
                    name: name, 
                    email: email, 
                    phone: phone, 
                    cardno: cardno
                }

            });
        }
    }
    if (eventname == "Select a Event") {
        return res.render('register', {
            status: 'Warning',
            message: "please select the event before you go!",
            eventname: eventname,
            data:{
                name: name, 
                email: email, 
                phone: phone, 
                cardno: cardno
            }
        });
    }
    if (phone.length > 10 || phone.length < 10) {
        return res.render('register', {
            status: 'Warning',
            message: "The phone number should be of 10 Digits",
            eventname: eventname,
            data:{
                name: name, 
                email: email, 
                phone: phone, 
                cardno: cardno
            }
        });
    }
    try {
        // console.log(data.noexp);
        var ExpArr = []
        for(var i = 1; i <= data.noexp; i++) ExpArr.push("No");
        await Vistiter.create({
            name, 
            email, 
            phone, 
            cardno, 
            eventname,
            exp: ExpArr
        });

        mailer({
            email: req.body.email,
            message: "Please activate your card!"
        });
        return res.render('register', {
            status: 'Success',
            eventname: eventname,
            data:{
                name: '', 
                email: '', 
                phone: '', 
                cardno: ''
            }
        });
    }
    catch (error) {
        // console.log(error);
        if (error.code == 11000)
            return res.render('register', {
                status: 'Error',
                message: `${Object.keys(error.keyPattern)} already Exist!`,
                eventname: eventname,
                data:{
                    name: name, 
                    email: email, 
                    phone: phone, 
                    cardno: cardno
                }
            });
    }
}