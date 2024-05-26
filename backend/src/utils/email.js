import nodemailer from 'nodemailer';

const sendMail = async(option)=>{
    // Transporter
    const transporter = nodemailer.createTransport({
        service:process.env.EMAIL_HOST,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD
        }
    });

    // Email option
    const emailOptions = {
        from:process.env.EMAIL_HOST,
        to:option.email,
        subject:option.subject,
        text:option.message
    }
    
    console.log("hello");
   await transporter.sendMail(emailOptions);
}

export default sendMail;