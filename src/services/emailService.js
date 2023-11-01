require('dotenv').config();
import nodemailer from 'nodemailer'

let checkActivityEmail = async (dataSend) => {
    console.log('check dataSend', dataSend)
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIIL_APPP_PASSWORD

        }
    });
    let info = await transporter.sendMail({
        from: '"Bookingcare" từ quản trị viên <hoangdinh3052@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Xác nhận thông tin khám bệnh", // Subject line
        // plain text body
        html: contentHTML(dataSend),  // html body
    });

}

let contentHTML = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result =
            ` <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này là do đã đặt lịch khám bệnh trên <a href ='https://bookingcare.vn/'>Bookingcare.vn<a></p>
        <div><b>Thông tin khám bệnh:</b></div>
        <div><b>Thời gian: ${dataSend.dataTime}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu thông tin trên là chính xác , vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt
            lịch khám bệnh!</p>
        <div>
            <a href=${dataSend.link}> >>>  Xác nhận lịch khám bệnh</a>
        </div> 
        <br>
        <div>Xin chân thành cảm ơn bạn!<div>`

    }
    if (dataSend.language === 'en') {
        result =
            `<h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked a medical appointment on <a href ='https://bookingcare.vn/'> Bookingcare.vn<a></p>
        <div><b>Health-related information:</b></div>
        <div><b>Scheduled time: ${dataSend.dataTime}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the information is correct, please click on the link below to confirm and complete the process of scheduling the medical appointment!</p>
        <div>
            <a href=${dataSend.link}> >>>    Confirming medical appointment.</a>
        </div> 
        <br>
        <div>Thank you sincerely!<div>`
    }
    return result;
}

module.exports = {
    checkActivityEmail: checkActivityEmail,
}