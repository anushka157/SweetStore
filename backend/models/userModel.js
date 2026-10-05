const connection = require("../config/db"); // getting connection configuration of mysql from the db.js

const User = {
  UserLoginEmail: (email, callback) => {
    const query = `
            SELECT * FROM user WHERE email=?
        `;
    connection.query(query, [email], callback);
  },

  UserLoginPassword: (userId, callback) => {
    const query = `
            SELECT u.password AS hashedPassword, s.seller_id AS seller_id
            FROM user u INNER JOIN seller s 
            ON u.user_id=s.registered_user_id
            WHERE u.user_id=?
        `;
    connection.query(query, [userId], callback);
  },

  UserRegister: (data, callback) => {
    const query = `
            INSERT INTO user (user_id, email, password, role) VALUES
            (?, ?, ?, ?)
        `;
    const { email, password, role, userId } = data;
    connection.query(query, [userId, email, password, role], callback);
  },
 AdminLogin: (email, callback) => {
    const query = `
        SELECT user_id, password, email, role
        FROM user
        WHERE email = ? AND role = 'admin'
    `;

    connection.query(query, [email], callback);
},
};

module.exports = {
  User,
};
