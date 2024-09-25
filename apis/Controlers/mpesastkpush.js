
const axios = require("axios");



const withToken = (handler) => async (req, res) => {
  try {
    const auth = Buffer.from(`${consumer}:${secret}`).toString("base64");

    // Get token from Safaricom OAuth
    const tokenResponse = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    );
    const token = tokenResponse.data.access_token;

    // Proceed with the handler, passing the token
    await handler(req, res, token);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const stkPush = async (req, res, token) => {
  const shortCode = 174379;
  const phone = req.body.phone;
  const amount = req.body.amount || 1;
  const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  const password = Buffer.from(shortCode + passkey + timestamp).toString("base64");

  const data = {
    InitiatorName:"testapi",
    InitiatorPassword:"Safaricom999!*!",
    PartyA:"600983",
    PartyB:"600000",
    PhoneNumber: "254708374149",
    BusinessShortCode: "174379",
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: `254708374149`,
    PartyB: 174379,
    AccountReference: "Mpesa Test",
    TransactionDesc: "Testing stk push",
  };

  await axios
    .post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  stkPush: withToken(stkPush), 
};

// const axios = require("axios");

// let token;
// const stkPush = async (req, res) => {



// const createToken = async (req, res) => {
//   const secret = "KLv17YGOKo6wfpwcgSftVaWf7S5050qryMzebvMermhrLH5sNgzS4dQKqso3e8sj";
//   const consumer = "9fcJ133gY77oJuFazzRYaTdYvC7WQIlunrSviTjvdTQEvhUG";
//   const auth = Buffer.from(`${consumer}:${secret}`).toString("base64");

//   await axios
//     .get(
//       "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
//       {
//         headers: {
//           authorization: `Basic ${auth}`,
//         },
//       }
//     )
//     .then((data) => {
//       token = data.data.access_token;
//       console.log(data.data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ message: err.message });
//     });
// };




//   const shortCode = 174379;
//   const phone = req.body.phone;
//   const amount = req.body.amount || 1; 
//   const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
//   const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

//   const date = new Date();
//   const timestamp =
//     date.getFullYear() +
//     ("0" + (date.getMonth() + 1)).slice(-2) +
//     ("0" + date.getDate()).slice(-2) +
//     ("0" + date.getHours()).slice(-2) +
//     ("0" + date.getMinutes()).slice(-2) +
//     ("0" + date.getSeconds()).slice(-2);

//   const password = Buffer.from(shortCode + passkey + timestamp).toString("base64");

//   const data = {
//     BusinessShortCode: shortCode,
//     Password: password,
//     Timestamp: timestamp,
//     TransactionType: "CustomerPayBillOnline",
//     Amount: amount,
//     PartyA: `254${phone}`, 
//     PartyB: 174379,
//     PhoneNumber: `254${phone}`, 
//     AccountReference: "Mpesa Test",
//     TransactionDesc: "Testing stk push",
//   };

//   await axios.post(url, data, {
//       headers: {
//         authorization: `Bearer ${token}`, 
//       },
//     })
//     .then((data) => {
//       console.log(data.data);
//       res.status(200).json(data.data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ message: err.message });
//     });
// };

// module.exports = { stkPush };



// const axios = require("axios");

// const createToken = async (req, res, next) => {
//   const secret = "KLv17YGOKo6wfpwcgSftVaWf7S5050qryMzebvMermhrLH5sNgzS4dQKqso3e8sj";
//   const consumer = "9fcJ133gY77oJuFazzRYaTdYvC7WQIlunrSviTjvdTQEvhUG";
//   const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
//   await axios.get(
//     "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
//     {
//       headers: {
//         authorization: `Basic ${auth} `,
//       },
//     }
//   ).then((data)=>{
//     token = data.data.access_token;
//     console.log(data.data);
//     next();
//   }).catch((err) =>{
//     console.log(err);
//     res.status(400).json(err.message);
//   })
// };

// const stkPush = async(req, res)=>{
//   const shortCode = 174379;
//   const phone = req.body.phone.substring(1);
//   const amount = req.body.amount;
//   // const passkey ="bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
//    const passkey ="bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
//   const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

// const date = new Date();
// const timestamp = date.getFullYear() + 
// ("0" + (date.getMonth() + 1)).slice(-2) +
// ("0" + date.getDate()).slice(-2) +
// ("0" + date.getHours()).slice(-2) +
// ("0" + date.getMinutes()).slice(-2) +
// ("0" + date.getSeconds()).slice(-2);

// const password = new Buffer.from(shortCode + passkey + timestamp).toString(
//     "base64"
//   );
// const data = {
//     BusinessShortCode: shortCode,
//     Password: password,
//     Timestamp: timestamp,
//     TransactionType: "CustomerPayBillOnline",
//     // Amount: amount,
//     Amount: "1",
//     // PartyA: `254${phone}`,
//     PartyA: `254794280996`,
//     PartyB: 174379,
//     // PhoneNumber: `254${phone}`,
//     PhoneNumber: `254794280996`,
//     CallBackURL: "https://mydomain.com/path",
//     AccountReference: "Mpesa Test",
//     TransactionDesc: "Testing stk push",
//   };

//   await axios
//     .post(url, data, {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     })
//     .then((data) => {
//       console.log(data);
//       res.status(200).json(data.data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err.message);
//     });
// }


// module.exports = { createToken, stkPush };

