const Vistiter = require('../model/visiter');
const { mailer } = require('../utils/mailer');
exports.UpdateStatus = async (req, res) => {
    const { eventname, cardno } = req.params;
    console.log(cardno);
    try {
        const data = await Vistiter.findOne({ eventname: eventname, cardno: cardno });
        if (data) {
            if (data.status == "INACTIVE") {
                data.status = "ACTIVE";
                data.save();
                mailer({
                    email: data.email,
                    message: "Your Card has been Activated!"
                });
            }
            else{
                data.status = "INACTIVE";
                data.save();
                mailer({
                    email: data.email,
                    message: "Your Card has been Deactivated!"
                });
            }
            return res.send("1");
        }
    }
    catch (error) {
        console.log("Some error Occured!");
    }
}