const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user: 'ashok@whizti.com',
        pass: 'Machine9',

    },
});

app.post('/send-email', (req,res)=>{
    const {to, subject, text} = req.body;
    const mailOptions={
        from : 'ashok@whizti.com',
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            return res.status(500).send(error.toString());
        }
        res.send('Email sent:' + info.response);
    });
});

app.listen(3000, ()=> console.log('Server running on port 3000'));