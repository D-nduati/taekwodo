const axios = require('axios');
const fetch = require('node-fetch');

const mpesaConfig = {
  consumerKey: 'YF4EgQAsWmmvs0QAGY7uK6sv35addUCpIKihEE6vKh5DOUXI',
  consumerSecret: '96INUwdJwiYZ5hzZNjwwe28lRnbhH29neRVpaSeCQ2iNQpcGF6JviGUbl0GHt7fW',
  passkey: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
  shortcode: '174379',
  url: 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
  stkUrl: 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
};

const generateToken = async () => {
  try {
    console.log('Generating token...');
    const auth = Buffer.from(`${mpesaConfig.consumerKey}:${mpesaConfig.consumerSecret}`).toString('base64');
    console.log('Auth:', auth);
    const response = await axios.get(mpesaConfig.url, {
      headers: {
        authorization: `Basic ${auth}`,
      },
    });
    console.log('Token response:', response.data);
    return response.data.access_token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};

const stkPush = async (req, res) => {
  try {
    console.log('STK push request received...');
    console.log('Request body:', req.body);
    const token = await generateToken();
    console.log('Generated token:here is where reached', token);
    const phone = req.body.phone;
    const amount = req.body.amount || 1;
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, -5);
    console.log('Timestamp:this is the timestamp', timestamp);
    const password = Buffer.from(`${mpesaConfig.shortcode}${mpesaConfig.passkey}${timestamp}`).toString('base64');
    console.log('Password: now the password is generated dn', password);
    const data = {
      ShortCode:'174379',// mpesaConfig.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: `254${phone}`,
      PartyB: mpesaConfig.shortcode,
      PhoneNumber: `254${phone}`,
      // CallBackURL: "https://mydomain.com/path",
      AccountReference: 'Mpesa Test',
      TransactionDesc: 'Testing stk push',
    };
    console.log('STK push data the data now to be sent is this dn:', data);
    const response = await fetch(mpesaConfig.stkUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log('STK push response no  this is the response dn from sending the api hurray:', responseData);
    res.status(200).json(responseData.data);
  } catch (error) {
    console.error('Error performing stk push hello no this is the erro:', error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { stkPush };