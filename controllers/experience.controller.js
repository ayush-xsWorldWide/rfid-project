const Visiter = require('../model/visiter');

exports.getExp = async (req, res) => {
    var { expid, cardno } = req.params;
    try {
        expid--; // storing data in a list where the index starts from 0
        var data = await Visiter.findOne({ cardno });

        if (data.status === "ACTIVE") {
            if (data.exp[expid] === "No") data.exp[expid] = "Yes";
            else data.exp[expid] = "No";
            data.save();
            return res.send("Response received!");
        }
        return res.send("Inactive card!");
    }
    catch (error) {
        console.log("Some error occured!");
        return res.status(500).send("Server Error");
    }
}