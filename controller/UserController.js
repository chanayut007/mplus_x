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


    static async getUserAccount(req, res){
        const { user_id } = req.body;
        console.log("request => user_id : "+user_id);
        try {
            dbUserAccount.getConnection((error,con)=>{
                if(error){
                    throw err;
                }else{
                    dbUserAccount.query("SELECT (ta.ta_login) as mt4_no, (ta.ta_group) as account_type,  ta.ta_balance as balance, (bwb.money_net) as money_net, (ta.ta_leverage) as leverage, (bua.user_fullname) as full_name ,ta.ta_password \n from reportserver.mt4_users mtu JOIN mt4.treder_account ta ON mtu.LOGIN = ta.ta_login , account.bk_user_account bua, wallet.bk_wallet_balance bwb \n where ta.user_id = ? && bua.user_id = ? && bwb.user_id = ?;", [user_id,user_id,user_id],
                   
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

    static async getLinkRef(req, res){
        const { user_id } = req.body;
        console.log("request => user_id : "+user_id);
        try {
            dbUserAccount.getConnection((error,con)=>{
                if(error){
                    throw err;
                }else{
                    dbUserAccount.query("SELECT (concat(\'https://www.mplusfx.com/ref=\',buc.user_refname)) as link_ref ,(bwb.commission_market) as commission FROM wallet.bk_wallet_balance bwb, account.bk_user_account buc \n WHERE bwb.user_id = ? && buc.user_id = ?;", [user_id,user_id],
                   
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