const config = {
    ports: process.env.PORT || 3000,
    dbUserAccount: {
        connectionLimit: 10,
        user: "enfortech",
        host: "10.0.0.241",
        port: "3306",
        password: "kW4jOch7R9En",
        database: "account"
    },
    dbWallet: {
        connectionLimit: 10,
        user: "enfortech",
        host: "10.0.0.241",
        port: "3306",
        password: "kW4jOch7R9En",
        database: "account"
    },
};

module.exports = config;
