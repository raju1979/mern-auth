const User = require('../models/user');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// let transport = nodemailer.createTransport({
//     host: 'smtp.mailtrap.io',
//     port: 2525,
//     auth: {
//         user: '75bdcd31510d51',
//         pass: '6b9e42d0a6400e'
//     }
// });

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
});

exports.signup = (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {

        console.log('eeeeeeeeeee', err)
        if (user) {
            console.log('uuuuuuuuuuu', user)
            return res.status(400).json({
                error: 'Email is taken'
            })
        }

        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' });

        const message = {
            from: 'elonmusk@tesla.com',
            to: 'dhrajesh1@gmail.com',
            subject: 'Account activation links',
            html: `<h1>Have the most fun you can in a car!</h1><p>Get your <b>Tesla</b> today!</p><p>${process.env.CLIENT_URL}/auth/activate/${token}</p>`
        };



        transport.sendMail(message, (err, info) => {
            if (err) {
                return res.status(400).json({
                    error: 'Email send error'
                })
            } else {
                console.log('mail success', info);
                res.status(200).json({
                    msg: 'Action Email sent'
                })
            }
        });


    })
}

exports.accountActivation = async (req, res) => {
    const { token } = req.body;

    if (token) {
        try {
            let jwtVerify = await jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);
            console.log(jwtVerify);
            const { name, email, password } = jwt.decode(token);
            let newUser = new User({name, email, password});
            await newUser.save();
            res.json({
                message: 'Signup success',
                user: {name, email}
            })
            
        } catch(err) {
            console.log(err);
            res.status(400).json({
                error: err
            })
        }
    }
};

exports.signin = async (req, res) => {
    const {email, password} = req.body;
    //check if user exists
    try {
        console.log(email);
        let user = await User.findOne({email});
        console.log(user);
        console.log(password);
        console.log('*********', user.authenticate(password))
        if(!user.authenticate(password)) {
            throw new Error('Email or Password not matched')
        }

        // generate token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        const {_id, name,  role } = user;
        res.status(200).json({
            user: {_id, name,  role, email: user.email},
            token
        })
    } catch(err) {
        console.log(err.message)
        res.status(400).json({
            error: 'User does not exists',
            err: err.message
        })
    }
    

}