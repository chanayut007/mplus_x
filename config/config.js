const config = {
    ports: process.env.PORT || 3000,
    dbUserAccount: {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'account',
        port: '3306',
    },
    dbWallet: {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'wallet',
        port: '3306',
    },
};

module.exports = config;
