require('dotenv').config();
const NodeMailer = require('nodemailer');

async function SendMailController(username, email, password) {
    const transporter = NodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.Email_User,
            pass: process.env.Email_Password
        }
    });

    const mailOptions = {
        from: process.env.Email_User,
        to: `${email}`,
        subject: '🎉 Welcome to the Taekwondo Application!',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <h2 style="color: #d32f2f;">👋 Welcome, ${username}!</h2>
                <p>Thank you for registering with the <strong>Taekwondo Application</strong>.</p>
                <p>Here are your login credentials:</p>
                <ul style="list-style: none; padding: 0;">
                    <li><strong>Username:</strong> ${username}</li>
                    <li><strong>Password:</strong> ${password}</li>
                </ul>
                <p>We're excited to have you on board. 🎯 Explore the app and take full advantage of the features built for your Taekwondo journey.</p>
                <p>Wishing you all the best,</p>
                <p>The Taekwondo App Team 🥋</p>
                <hr>
                <small>If you didn't register for this account, please ignore this email.</small>
            </div>
        `
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}

module.exports = SendMailController;

// require('dotenv').config();
// const NodeMailer = require('nodemailer');


//  function SendMailController (username, email, password) {
        
//         const transporter = NodeMailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.Email_User,
//                 pass: process.env.Email_Password
//             }
//         })
        // const mailOptions = {
        //     from: process.env.Email_User,
        //     to: `${email}`,
        //     subject: '🎉 Welcome to the Taekwondo Application!',
        //     html: `
        //         <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        //             <h2 style="color: #d32f2f;">👋 Welcome, ${username}!</h2>
        //             <p>Thank you for registering with the <strong>Taekwondo Application</strong>.</p>
        //             <p>Here are your login credentials:</p>
        //             <ul style="list-style: none; padding: 0;">
        //                 <li><strong>Username:</strong> ${username}</li>
        //                 <li><strong>Password:</strong> ${password}</li>
        //             </ul>
        //             <p>We're excited to have you on board. 🎯 Explore the app and take full advantage of the features built for your Taekwondo journey.</p>
        //             <p>Wishing you all the best,</p>
        //             <p>The Taekwondo App Team 🥋</p>
        //             <hr>
        //             <small>If you didn't register for this account, please ignore this email.</small>
        //         </div>
        //     `
        // }
        
//         try {
//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     return (console.log('Error occured', error))
//                 }
//                 else {
//                     res.status(200).json({
//                         message: 'success',
//                         result: info
//                     })
//                 }

//             })
//         } catch (error) {
//             res.send({ error })
//         }


//     }
