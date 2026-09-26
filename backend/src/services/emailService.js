const nodemailer =require ('nodemailer');



// Send OTP email
 const sendOTPEmail = async (email, otp) => {
    try {

        // Create transporter
     const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port:  587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
       });       

        console.log(transporter,transporter);
        
        const mailOptions = {
            from: `"AccuERP Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Password Reset OTP - AccuERP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #4f46e5;">Accu<span style="color: #fbbf24;">ERP</span></h1>
                        <h2 style="color: #333;">Password Reset Request</h2>
                    </div>
                    
                    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center;">
                        <p style="font-size: 16px; color: #555; margin-bottom: 10px;">Your OTP for password reset is:</p>
                        <div style="font-size: 36px; font-weight: bold; color: #4f46e5; letter-spacing: 5px; margin: 20px 0;">
                            ${otp}
                        </div>
                        <p style="font-size: 14px; color: #777;">This OTP will expire in 10 minutes.</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #888; font-size: 12px;">
                        <p>If you didn't request this, please ignore this email or contact support.</p>
                        <p>&copy; 2024 AccuERP. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        throw new Error('Failed to send email');
    }
};

module.exports = {sendOTPEmail}