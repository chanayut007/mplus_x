const dbUserAccount = require('../dbConnection');

class UserService {
    static getUserByIdService(id) {
        dbUserAccount.query('SELECT * FROM user WHERE id = ?',
        [id],
        (err, result, fields) => {
        if (err) {
            console.log(err);
            return 400;
        }
        else if (result.length == 0) {
            return { message: "No user in database" };
            // return res.status(404).json({message: "No user in database"});
        }
        return result;
        // return res.status(200).json(result);
        });
    }
}

module.exports = UserService;