const app = require('express')();

//client controller
const registerController = require('../controllers/register.controller');

//admin controller 
const adminController = require('../controllers/admin.controller');

//middlewares
const auth = require('../middleware/auth');

//iot access routes
const cardController = require('../controllers/card.controller');

// product controller 
const productController = require('../controllers/product.controller');

// experience controller
const experienceController = require('../controllers/experience.controller');

app.get('/health', (req, res) => {
    return res.send("HI from server");
})

// client reg end-point
app.get('/cregister/:eventname', registerController.showRegisterPage);
app.post('/cregister/:eventname', registerController.ActionRegisterPage);



// admin routes
app.get('/alogin', adminController.LoginPage);
app.post('/alogin', adminController.ActionLogin);

app.get('/logout', adminController.ActionLogout);

app.get('/dashboard', auth.isAuthenticated, adminController.showDashboard);
app.get('/showreg/:eventname', auth.isAuthenticated, adminController.findAllRegstration);

app.get('/cardstatus/:eventname/:cardno', cardController.UpdateStatus);


// create event
app.get('/create', auth.isAuthenticated, adminController.createEvent);
app.post('/create', auth.isAuthenticated, adminController.createEventHandler);

app.get('/showevent', auth.isAuthenticated, adminController.fetchEvents);
// add card
// app.get('/addcard', auth.isAuthenticated, adminController.showAddCard);
// app.post('/addcard', auth.isAuthenticated, adminController.addCardInfo);

// add product
app.get('/addproduct/:event', auth.isAuthenticated, productController.showCreateProductPage);

// search feature
app.post('/search', auth.isAuthenticated, adminController.search)

app.get('/links', auth.isAuthenticated, adminController.links);
app.get('/links/:eventName', auth.isAuthenticated, adminController.FetchQr);

// experience
app.get('/getexp/:eventname/:expid/:cardno', experienceController.getExp);

// 404
app.get('/404', (req, res) => {
    return res.render('404');
})
//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    return res.render('404');
});

module.exports = app;