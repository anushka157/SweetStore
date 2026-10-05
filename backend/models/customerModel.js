const  connection  = require("../config/db");
const Customer = {
  addCustomer: (data, callback) => {
    const query = `
            INSERT INTO customer (customer_id, registered_user_id, customer_name, phone_number)
            VALUES (?, ?, ?, ?);
        `;
const { customerId, registeredUserId, customerName, phoneNumber } = data;    connection.query(
      query,
      [customerId, registeredUserId, customerName, phoneNumber],
      callback
    );
  },

  CustomerLoginPassword: (data, callback) => {
    const query = `
            SELECT u.password AS hashedPassword, c.customer_id AS customer_id
            FROM user u INNER JOIN customer c 
            ON u.user_id=c.registered_user_id
            WHERE u.user_id=?
        `;
    const { userId } = data;
    connection.query(query, [userId], callback);
  },
};

const CustomerAddress = {
  addCustomerAddress: (data, callback) => {
    const query = `
            INSERT INTO customer_address(customer_address_id, customer_id, address_line_1, address_line_2, city, zip_code, country) 
            VALUES (?,?,?,?,?,?, ?)
        `;

    const {
      customerAddressId,
      customerId,
      addressLine1,
      addressLine2,
      city,
      zipCode,
      country,
    } = data;

    connection.query(
      query,
      [
        customerAddressId,
        customerId,
        addressLine1,
        addressLine2,
        city,
        zipCode,
        country,
      ],
      callback
    );
  },
};

module.exports = {
  Customer,
  CustomerAddress,
};
