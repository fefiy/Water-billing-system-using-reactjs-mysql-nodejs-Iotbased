const db = require("../connect");

const axios = require("axios");

const callback = async (req, res) => {
  console.log("calback is calleded");
  // Handle the Chapa callback request here
  console.log
  const txRef = req.query.trx_ref;
  console.log(txRef);
  const status = req.query.status;
  console.log(status);
  console.log(req.query);
  const secret = "CHASECK_TEST-nRY1gxl1m2K6g5ajLHTJt4j4MnLBJCWB";
  const endpoint = `https://api.chapa.co/v1/transaction/verify/${txRef}`;
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${secret}`,
      },
    });
    const { data } = response.data;
    const { transaction_id, amount, status, tx_ref,} = data;
    console.log(data);
    const currentdate = new Date()
      const q = 'INSERT INTO PaymentStatus (user_tracking_id,amount_due, 	amount_paid,	status , tx_ref) VALUES (?, ?, ?, ?, ?)'
       const values = [
           parseInt(data.customization.description),
           currentdate.toISOString,
           amount,
           status,
           tx_ref
       ]
      db.query(q, values, (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ error: 'Failed to insert data into the database' });
        } else {
          console.log('Data inserted successfully!');
          res.status(200).json({ message: 'Data inserted successfully!' });
        }
      });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data from the endpoint" });
  }
  // Process the payment status and other relevant information
  // Update your database, send notifications, etc.
  // Return a response to Chapa
  res.sendStatus(200);
};

module.exports = {
  callback,
};
