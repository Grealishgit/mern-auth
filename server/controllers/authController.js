import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js'

export const register = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' })
    }

    try {

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' })

        } const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        //Sending welcome email to user
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to TutorPoint',
            text: `Welcome to TutoPoint website. Your account has been created successfully with email id:${email}`
        }
        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: 'Registered successfully' });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password required' })

    }
    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' })

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' })

        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, message: 'Logged in successfully' });


    } catch (error) {
        res.json({ success: false, message: error.message })

    }

}
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })

        return res.json({ success: true, message: 'Logged out successfully' })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

//Send Verification Otp to the user's Email
export const sendVerifyOtp = async (req, res) => {
    try {

        const { userId } = req.body;

        const user = await userModel.findById(userId);

        if (user.isAccountVerified) {
            return
            res.json({ success: false, message: 'Account is already verified' })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            //text: `Your OTP is ${otp}. Verify your account using this OTP.`,
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Verification OTP sent to Email' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
//Verify email using OTP
export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        res.json({ success: true, message: 'Missing Details' });

    }
    try {

        const user = await userModel.findById(userId);

        if (!user) {
            res.json({ success: false, message: 'User not found' });

        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            res.json({ success: false, message: 'OTP Expired' });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        res.json({ success: true, message: 'Email Verified Successfully' });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}
//Check if user is auntheticated
export const isAuthenticated = async (req, res) => {

    try {
        res.json({ success: true, message: "User is Authenticated" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Send password reset OTP
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.json({ success: false, message: 'Email is required' });

    }

    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            res.json({ success: false, message: 'User not found' });

        }

        //Generate OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for reseting your password is ${otp}. Use this OTP to reset your password.`,
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'OTP sent to your email' });



    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

//Rest User Password with OTP
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: 'Email, OTP and new password are required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save(); // Save the user after resetting the password

        return res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

