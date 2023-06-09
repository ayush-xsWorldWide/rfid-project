const AdminCred = require('../model/adminCred');
const RegData = require('../model/visiter');
const Events = require('../model/event');

const { mailerConfiramtion } = require('../utils/EventConfiramtion');

// utils
const { decrypt } = require("../utils/crypt");
const { generateToken } = require("../utils/token");
const { set } = require('mongoose');

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
exports.showDashboard = async (req, res) => {
    try {
        const No_of_events = await Events.countDocuments();
        const No_of_registartion = await RegData.countDocuments();

        return res.render('admin/dashboard', {
            user: req.user.userid,
            No_of_events: No_of_events,
            No_of_registartion: No_of_registartion
        })
    }
    catch (error) {
        return res.render('admin/dashboard', {
            user: req.user.userid
        })
    }
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
        const data = await RegData.find({ eventname: req.params.eventname });
        // console.log(data);
        return res.render('admin/showreg', {
            data: data,
            user: req.user.userid,
            eventname: req.params.eventname
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


exports.createEvent = (req, res) => {
    return res.render('admin/createEvent', {
        user: req.user.userid,
        status: '',
        data: {
            name: '',
            place: '',
            date: '',
            time: '',
            email: '',
            noexp: ''
        }
    });
}
exports.createEventHandler = async (req, res) => {
    // console.log(req.headers.host);
    try {
        const { name, place, time, date, email, noexp } = req.body;
        console.log(name, place, time, date, noexp);

        if (!name || !place || !time || !date || !email || !noexp) {
            if (!name) {
                return res.render('admin/createEvent', {
                    status: "Warning",
                    user: req.user.userid,
                    message: "Please enter the event name",
                    data: {
                        name: name,
                        place: place,
                        date: date,
                        time: time,
                        email: email,
                        noexp: noexp
                    }
                });
            }
            if (!place) {
                return res.render('admin/createEvent', {
                    status: "Warning",
                    user: req.user.userid,
                    message: "Please enter the event place",
                    data: {
                        name: name,
                        place: place,
                        date: date,
                        time: time,
                        email: email,
                        noexp: noexp
                    }
                });
            }
            if (!time) {
                return res.render('admin/createEvent', {
                    status: "Warning",
                    user: req.user.userid,
                    message: "Please enter the event time",
                    data: {
                        name: name,
                        place: place,
                        date: date,
                        time: time,
                        email: email,
                        noexp: noexp
                    }
                });
            }
            if (!date) {
                return res.render('admin/createEvent', {
                    status: "Warning",
                    user: req.user.userid,
                    message: "Please enter the event date",
                    data: {
                        name: name,
                        place: place,
                        date: date,
                        time: time,
                        email: email,
                        noexp: noexp
                    }
                });
            }
            if (!email) {
                return res.render('admin/createEvent', {
                    status: "Warning",
                    user: req.user.userid,
                    message: "Please enter the email",
                    data: {
                        name: name,
                        place: place,
                        date: date,
                        time: time,
                        email: email,
                        noexp: noexp
                    }
                });
            }

            if (!noexp) {
                return res.render('admin/createEvent', {
                    status: "Warning",
                    user: req.user.userid,
                    message: "Please enter the Number of Expreiances",
                    data: {
                        name: name,
                        place: place,
                        date: date,
                        time: time,
                        email: email,
                        noexp: noexp
                    }
                });
            }
        }

        // test for date of creation of event
        const systemDate = new Date();
        const EnteredDate = date.split('-');

        // testing the year
        if (systemDate.getUTCFullYear() > parseInt(EnteredDate[0])) {
            // condition for back Date
            return res.render('admin/createEvent', {
                status: "Warning",
                user: req.user.userid,
                message: "Sorry we Cannot create event for previous year!",
                data: {
                    name: name,
                    place: place,
                    date: date,
                    time: time,
                    email: email,
                    noexp: noexp
                }
            });
        }
        // console.log(systemDate.getUTCMonth() , parseInt(EnteredDate[1]))
        // testing for month
        if (systemDate.getUTCMonth() >= parseInt(EnteredDate[1])) {
            // condition for back Date
            return res.render('admin/createEvent', {
                status: "Warning",
                user: req.user.userid,
                message: "Sorry we Cannot create event for previous Month!",
                data: {
                    name: name,
                    place: place,
                    date: date,
                    time: time,
                    email: email,
                    noexp: noexp
                }
            });
        }
        // testing for day
        // console.log(parseInt(EnteredDate[2]) , systemDate.getUTCDate(),EnteredDate[2] - systemDate.getUTCDate())
        // console.log(systemDate.getUTCMonth() , parseInt(EnteredDate[1]) );
        if ((systemDate.getUTCMonth() + 1) == parseInt(EnteredDate[1]) && (parseInt(EnteredDate[2]) - systemDate.getUTCDate()) < -1) {
            // console.log("enter");
            // condition for back Date
            return res.render('admin/createEvent', {
                status: "Warning",
                user: req.user.userid,
                message: "Sorry we Cannot create event for previous Date!",
                data: {
                    name: name,
                    place: place,
                    date: date,
                    time: time,
                    email: email,
                    noexp: noexp
                }
            });
        }
        // if()
        await Events.create({
            name: (name.replaceAll(" ", "-")).toUpperCase(),
            place: place.toUpperCase(),
            date,
            time,
            email,
            noexp
        });

        mailerConfiramtion({
            email: req.body.email,
            message: `You have Successfully created a event called ${name}`,
            link: req.headers.host + `/cregister/${name.replaceAll(" ", "-")}`
        });

        return res.render('admin/createEvent', {
            user: req.user.userid,
            status: 'Success',
            data: {
                name: '',
                place: '',
                date: '',
                time: '',
                email: '',
                noexp: '',
            }
        });
    }
    catch (error) {
        return res.render('admin/createEvent', {
            status: "Error",
            user: req.user.userid,
            message: "Server error!",
            data: {
                name: '',
                place: '',
                date: '',
                time: '',
                email: '',
                noexp: ''
            }
        });
    }
}
exports.fetchEvents = async (req, res) => {
    try {
        const data = await Events.find({});
        var places = [];
        data.filter(element => places.push(element.place));
        places = [...new Set(places)];

        return res.render('admin/showEvents', {
            status: "",
            data: data,
            user: req.user.userid,
            places: places
        });
    }
    catch (error) {
        console.log("Some error occured!");
        console.log(error);
        // return res.render('admin/showEvent', {
        //     status: "Error",
        //     message: "Server error!"
        // });
        return res.redirect('/dashboard');
    }
}


exports.search = async (req, res) => {
    // var searchedItems = []
    const { fromDate, toDate, eventNm, place } = req.body;
    // console.log(fromDate, toDate, eventNm, place);
    try {
        var data = await Events.find({});
        var places = [];
        data.filter(element => places.push(element.place));
        places = [...new Set(places)];

        // filtration logic
        

        // if from date is present and to date is absent
        if(fromDate && toDate)
            data = data.filter(element => (new Date(fromDate) <= new Date(element.date)) && (new Date(toDate) >= new Date(element.date)));
        else if(fromDate)
            data = data.filter(element => new Date(fromDate) <= new Date(element.date));
        else if(toDate)
            data = data.filter(element => new Date(toDate) >= new Date(element.date));

        
        //name filter
        if(eventNm)
            data = data.filter(element => eventNm == element.name);
        // filter with place
        if(place)
            data = data.filter(element => place == element.place);


        return res.render('admin/showEvents', {
            status: "",
            data: data,
            user: req.user.userid,
            places: places
        });
    }
    catch (error) {
        console.log("some error");
        res.redirect('/showevent');
    }
}