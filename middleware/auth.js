const jwt = require('jsonwebtoken');


exports.isAuthenticated = async (req, res, next) => {
    let cookie = req.headers.cookie; // we need to access the cookies from the header.

    if (!cookie || !cookie.includes("token")) {
        return res.render('admin/login', {
            status:"Error",
            message: "Not authorized!"
        })
    }
    let token = cookie.split("token=")[1];
    // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        //now token is valid and we can proceed further
        if (err) {
            return res.render('admin/login', {
                status:"Error",
                message: "Session Expired!"
            })
        }
        // console.log(user);
        req.user = user;
        next();
    });
}