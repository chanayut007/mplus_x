const dbUserAccount = require('../services/dbConnection');

class UserController {

    static async getUserByEmail(req, res) {
        const { email } = req.body;
        console.log("request email : "+email);
        try {
            dbUserAccount.getConnection((err, con) => {
                if (err) {
                    throw err;
                } else {
                    dbUserAccount.query('SELECT * FROM account.bk_user_account WHERE user_email = ?', [email],
                   
                    (err, result, fields) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).json(err);
                        }
                        if (result.length == 0) {
                            return res.status(200).json({
                                message: "Can't find this user in database"
                            });
                        }
                        return res.status(200).json(result);
                    });
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}

module.exports = UserController;