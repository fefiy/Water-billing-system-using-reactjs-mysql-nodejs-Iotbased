const db = require("../connect");
const nodemailer = require("nodemailer")
const ejs = require('ejs')
const path = require('path');
require('dotenv').config();


const getAmount = (req, res) => {
  const q =
    "SELECT * FROM waterusage as w JOIN users as u ON (w.user_id= u.id) JOIN usertracking as t ON(t.user_id = u.id) WHERE u.is_deleted = 0";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

const temp = (req, res) => {
  console.log("temp is callede");
  const temperature = req.body.amount;
  const mac_address = req.body.mac;
  console.log(temperature);
  console.log(mac_address);
  const q = "SELECT * FROM users WHERE mac_address = ?";
  db.query(q, [mac_address], (err, users) => {
    if (err) return res.status(500).json(err);
    if (users.length) {
      const user = users[0];
      const sql = "SELECT * FROM waterusage WHERE user_id = ?";
      db.query(sql, [user.id], (err, waterusage) => {
        if (err) return res.status(500).json(err);
        if (waterusage.length) {
          const existingData = waterusage[0];
          console.log("updated callded");

          const qp = "UPDATE waterusage SET amount = ? WHERE id = ?";
          db.query(qp, [temperature, existingData.id], (err, updatedData) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Amount of water updated successfully");
          });
        } else {
          console.log("insert is calledd");
          const sql =
            "INSERT INTO waterusage (`amount`, `user_id`, `date`) VALUES (?, ?, ?)";
          const values = [temperature, user.id, Date.now()];
          db.query(sql, values, (err, insertedData) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Amount inserted correctly");
          });
        }
      });
    } else {
      return res.status(404).json("User doesn't exist");
    }
  });
};

const watertracking = (req, res) => {
  const qw = "SELECT * FROM waterusage";
  const qt = "SELECT * FROM usertracking";
  console.log("water track is calleded");

  // Find water usage
  db.query(qw, (err, waterUsageData) => {
    if (err) return res.status(500).json(err);
    const waterUsage = waterUsageData;

    // Find user tracking
    db.query(qt, (err, userTrackingData) => {
      if (err) return res.status(500).json(err);
      const userTracking = userTrackingData;

      const currentDate = new Date();

      // Find users that are only found in water-usage table
      const usersToAdd = waterUsage.filter(
        (waterEntry) =>
          !userTracking.some(
            (trackingEntry) => trackingEntry.user_id === waterEntry.user_id
          )
      );

      console.log(usersToAdd);

      // Insert new rows for users found only in water usage
      for (const userToAdd of usersToAdd) {
        const { user_id, date, amount } = userToAdd;

        const insertQuery =
          "INSERT INTO usertracking (user_id, start_date, end_date, month_amount) VALUES (?, ?, ?, ?)";
        const values = [user_id, date, currentDate.toISOString(), amount];

        db.query(insertQuery, values, (err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).json(err);
          }
          console.log("user inserted succesfuly");
        });
      }

      // Find users found in both user_tracking and water_usage tables
      const usersToUpdate = userTracking.filter((tracking) =>
        waterUsage.some((usage) => usage.user_id === tracking.user_id)
      );

      // Update the user_tracking table for users found in both tables
      usersToUpdate.forEach((tracking) => {
        const { user_id } = tracking;

        // Find the most recent end date for the current use
        const mostRecentEndDate = userTracking
          .filter((entry) => entry.user_id === user_id)
          .reduce((prev, current) =>
            new Date(current.end_date) > new Date(prev.end_date)
              ? current
              : prev
          );

        // Calculate the new values for end_date, start_date, and amount
        const newEndDate = currentDate.toISOString();
        const newStartDate = mostRecentEndDate.end_date;
        const newAmount =
          waterUsage.find((usage) => usage.user_id === user_id).amount -
          mostRecentEndDate.month_amount;

        // Insert a new row into the user_tracking table
        const insertQuery =
          "INSERT INTO usertracking (user_id, start_date, end_date, month_amount) VALUES (?, ?, ?, ?)";
        const values = [user_id, newStartDate, newEndDate, newAmount];

        db.query(insertQuery, values, (err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).json(err);
          }
          console.log("User tracking updated successfully");
        });
      });

      res.status(200).json({ message: "Water tracking completed" });
    });
  });
};


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASSWORD
  }
});



const sendEmail = (email, name, endDate, price, litter, month, year ) => {
  ejs.renderFile('emailTemplate.ejs', { name, endDate, price , litter  }, (err, renderedTemplate) => {
    if (err) {
      console.error('Error rendering email template:', err);
      // Handle the error here
      return;
    }
    const logoPath = path.join(__dirname, 'assets', 'logo.png')

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reminder: Payment Due for Water Services',
      html: renderedTemplate,
      attachments: [
        {
          filename: 'logo.png',
          path: logoPath,
          cid: 'logo'
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        // Handle the error here
      } else {
        console.log('Email sent successfully!', info.response);
        // Handle the success scenario here
      }
    });
  });
};

const waterttracking = (req, res) => {
  const qw = "SELECT * FROM waterusage as w JOIN users as u ON (w.user_id = u.id) ";
  const qt = "SELECT * FROM usertracking as t JOIN users as u ON (t.user_id = u.id)";
  // const qu = "SELECT * FROM users WHERE `id`= ?"
  console.log("water track is calleded");

  
  //Find water usage
  db.query(qw, (err, waterUsageData) => {
    if (err) return res.status(500).json(err);
    const waterUsage = waterUsageData;
    // console.log(waterUsage);
    //Find user tracking
    db.query(qt, (err, userTracking) => {
      if (err) return res.status(500).json(err);
      // console.log(userTracking);
      const currentDate = new Date();

      // Find users that are only found in water-usage table
      const usersToAdd = waterUsage.filter(
        (waterEntry) =>
          !userTracking.some(
            (trackingEntry) => trackingEntry.user_id === waterEntry.user_id
          )
      );

      console.log("users", usersToAdd);

      // Insert new rows for users found only in water usage
      for (const userToAdd of usersToAdd) {
        const { user_id, date, amount } = userToAdd;
      
        // db.query(qu, [user_id], (err, userinfo)=>{
        //   if(err) return res.status(401).json("users doesn't found")
        //   user = userinfo
        // })
        // console.log(user)
        // console.log(user.email)
        console.log(user_id, amount, date);

        const insertQuery =
        "INSERT INTO usertracking (user_id, start_date, end_date, month_amount) VALUES (?, ?, ?, ?)";
        const values = [user_id, date, currentDate.toISOString(), amount];
        
         sendEmail(userToAdd.email, userToAdd.name, currentDate.toISOString(),date ,40, amount) 
        console.log(userToAdd.email)
        db.query(insertQuery, values, (err, data) => {
          if (err) {
            return res.status(500).json(err);
          }
          console.log("usertrack inserted for the first time")
        });
      }

      // Find users found in both user_tracking and water_usage tables
      const usersToUpdate = userTracking.filter((tracking) =>
        waterUsage.some((usage) => usage.user_id === tracking.user_id)
      );

      const mostRecentRecords = Object.values(usersToUpdate.reduce((acc, current) => {
        const { user_id, end_date } = current;
        if (!acc[user_id] || new Date(end_date) > new Date(acc[user_id].end_date)) {
          acc[user_id] = current;
        }
        return acc;
      }, {}));

      console.log(mostRecentRecords)
      
      mostRecentRecords.forEach((tracking) => {
        const { user_id } = tracking;
        
        // Find the most recent end date for the current user
        const mostRecentEndDate = tracking.end_date;

        // Calculate the new values for end_date, start_date, and amount
        const newEndDate = currentDate.toISOString();
        const newStartDate = mostRecentEndDate;
        const newAmount =
          waterUsage.find((usage) => usage.user_id === user_id).amount -
          tracking.month_amount;

        // Insert a new row into the user_tracking table
        const insertQuery =
        "INSERT INTO usertracking (user_id, start_date, end_date, month_amount) VALUES (?, ?, ?, ?)";
        
        const values = [user_id, newStartDate, newEndDate, newAmount];
        // db.query(qu, [user_id], (err, userinfo)=>{
        //   if(err) return res.status(401).json("users doesn't found")
        //   user = userinfo
        // })
        // console.log(user)
        console.log(tracking.email)
        sendEmail(tracking.email, tracking.name ,newEndDate.toLocaleDateString() ,40, newAmount) 
        db.query(insertQuery, values, (err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).json(err);
          }
          console.log("User tracking updated successfully");
        });
      });

      res.status(200).json({ message: "Water tracking completed" });
    });
  });
};






// const sendEmail = (req,res) => {
//   const mailOptions = {
//     from: 'foziayimam87@gmail.com',
//     to: 'seydaimam55@gmail.com', // Replace with the recipient's email address
//     subject: 'Email Subject',
//     text: "here is the message"
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent successfully!', info.response);
//     }
//   });
// };




module.exports = {
  getAmount,
  temp,
  watertracking,
 waterttracking ,
 sendEmail
};


// const watertracking = (req, res) => {
//   qw = "SELECT * FROM waterusage";
//   qt = "SELECT * FROM usertracking";

//   let waterUsage;
//   let userTracking;
//   // find water usage
//   db.query(qw, (err, data) => {
//     if (err) return res.status(500).json(err);
//     waterUsage = data;
//   });
//   // find user tracking
//   db.query(qt, (err, data) => {
//     if (err) return res.status(500).json(err);
//     userTracking = data;
//   });
//   // find users that are only found in water-usage table
//   const usersToAdd = waterUsage.filter(
//     (waterEntry) =>
//       !userTracking.some(
//         (trackingEntry) => trackingEntry.user_id === waterEntry.userId
//       )
//   );
//   // insert new row for users that are not found in usertracking but found in water usage
//   const currentDate = new Date();
//   for (const userToAdd of usersToAdd) {
//     const { userId, startDate, amount } = userToAdd;
//     const newTrackingEntry = {
//       user_id: userId,
//       start_date: startDate,
//       end_date: currentDate.toISOString(),
//       amount_fetched: amount,
//     };
//     const insertQuery = "INSERT INTO user_tracking VALUES ($1, $2, $3, $4)";

//     const values = [
//       [
//         newTrackingEntry.user_id,
//         newTrackingEntry.start_date,
//         newTrackingEntry.end_date,
//         newTrackingEntry.amount_fetched,
//       ],
//     ];
//     db.query(insertQuery, values, (err, data) => {
//       if (err) return res.status(500).json(err);
//     });
//   }
//   //  for users which are found on both user_tracking and
//   const usersToInsert = userTracking.filter((tracking) => {
//     return waterUsage.some((usage) => usage.userId === tracking.userId);
//   });

//   usersToInsert.forEach((tracking) => {
//     const { userId } = tracking;

//     // Find the user tracking entry with the most recent endDate for the current user
//     const userTrackingEntry = userTracking
//       .filter((entry) => entry.userId === userId)
//       .reduce((prev, current) =>
//         new Date(current.endDate) > new Date(prev.endDate) ? current : prev
//       );

//     // Calculate the new values for endDate, startDate, and amount
//     const newEndDate = new Date().toISOString();
//     const newStartDate = userTrackingEntry.endDate;
//     const newAmount = tracking.amountFetched - userTrackingEntry.amountFetched;

//     // Insert a new row into the user_tracking table
//     const insertQuery =
//       "INSERT INTO user_tracking (userId, startDate, endDate, amountFetched) VALUES ($1, $2, $3, $4)";
//     const values = [userId, newStartDate, newEndDate, newAmount];

//     db.query(insertQuery, values, (err, data) => {
//       if (err) return res.status(500).json(err);
//       console.log("user tracking updated succesfuly");
//     });
//   });
// };

// const userTrackingData = [
//   { userId: 1, startDate: '2023-04-01', endDate: '2023-04-15', amountFetched: 50 },
//   { userId: 1, startDate: '2023-04-16', endDate: '2023-04-30', amountFetched: 40 },
//   { userId: 2, startDate: '2023-04-01', endDate: '2023-04-30', amountFetched: 60 },
//   { userId: 1, startDate: '2023-04-30', endDate: '2023-05-02', amountFetched: 50 },
//   { userId: 1, startDate: '2023-04-30', endDate: '2023-05-02', amountFetched: 40 },
//   { userId: 2, startDate: '2023-04-30', endDate: '2023-04-02', amountFetched: 60 },
//   // ...more entries
// ];

