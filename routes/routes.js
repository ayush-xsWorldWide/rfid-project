const app = require('express')();

//client controller
const registerController = require('../controllers/register.controller');

//admin controller 
const adminController = require('../controllers/admin.controller');

//middlewares
const auth = require('../middleware/auth');

//iot access routes
const cardController = require('../controllers/card.controller');

app.get('/health',(req,res)=>{
    return res.send("HI from server");
})

// client reg end-point
app.get('/cregister', registerController.showRegisterPage);
app.post('/cregister', registerController.ActionRegisterPage);



// admin routes
app.get('/alogin', adminController.LoginPage);
app.post('/alogin', adminController.ActionLogin);

app.get('/logout', adminController.ActionLogout);

app.get('/dashboard', auth.isAuthenticated,adminController.showDashboard);
app.get('/showreg/:eventname', auth.isAuthenticated, adminController.findAllRegstration);

app.get('/cardstatus/:cardno', cardController.UpdateStatus);


// create event
app.get('/create', auth.isAuthenticated, adminController.createEvent);
app.post('/create', auth.isAuthenticated, adminController.createEventHandler);

app.get('/showevent', auth.isAuthenticated, adminController.fetchEvents);
// add card
// app.get('/addcard', auth.isAuthenticated, adminController.showAddCard);
// app.post('/addcard', auth.isAuthenticated, adminController.addCardInfo);

module.exports = app;