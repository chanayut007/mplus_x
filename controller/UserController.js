const dbUserAccount = require('../services/dbConnection');

class UserController {

    static async getUserInformation(req, res){
        const { user_id } = req.body;
        console.log("request user_id : "+user_id);
        try {
            dbUserAccount.getConnection((error,con)=>{
                if(error){
                    throw err;
                }else{
                    dbUserAccount.query("SELECT  user_id, user_fullname, \n (concat(d_code_phone,substr(user_phone,2))) as mobile_no, \n user_email, concat(concat(concat(substr(user_birthday,9),\'/\') , concat(substr(user_birthday,6,2),\'/\') ) , substr(user_birthday,1,4)) as user_birthday,\n user_sex, user_nationality,concat(concat(concat(concat(user_address,\" \"),concat(user_state,\" \")) , concat(user_city,\" \")),user_zipcode) as address \n from account.bk_user_account buc \n where buc.user_id = ?", [user_id],
                   
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
            
        } catch (error) {
            console.log(error);
            return res.status(500).json();
        }
        
    }

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
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}

module.exports = UserController;