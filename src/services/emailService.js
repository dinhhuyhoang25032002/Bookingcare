require('dotenv').config();
import nodemailer from 'nodemailer'

let checkActivityEmail = async (dataSend) => {
    // console.log('check dataSend', dataSend)
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP_USER,
            pass: process.env.EMAIIL_APPP_PASSWORD

        }
    });
    await transporter.sendMail({
        from: '"Homecare" từ quản trị viên <Homecare@gmail.com>', // sender address
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

let checkMedicineBillEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP_USER,
            pass: process.env.EMAIIL_APPP_PASSWORD

        }
    });
    await transporter.sendMail({
        from: '"Homecare" từ quản trị viên <Homecare@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Hóa đơn khám bệnh", // Subject line
        // plain text body
        html: MedicineBilltHTML(dataSend),  // html body
        attachments: [
            {
                filename: `Đơn thuốc khám bệnh của ${dataSend.patientInfor.patientFullName}.png`,
                content: dataSend.image.split("base64,")[1],
                encoding: 'base64'
            }
        ],
    });
}

let MedicineBilltHTML = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result =
            ` <h3>Xin chào ${dataSend.patientInfor.patientFullName}!</h3>
         <p>Bạn nhận được email này là do đã sử dụng xong dịch vụ từ Homecare trên <a href ='https://bookingcare.vn/'>Bookingcare.vn<a>.</p>
         <div><b>Thông tin hóa đơn khám bệnh:</b></div>
         <div><b>Thời gian: ${dataSend.patientInfor.timeType}</b></div>
         <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
         <p>Dưới đây là một số lưu ý và hóa đơn từ bác sĩ phụ trách gửi đến bạn:</p>
         <div>
             >>>  Đơn thuốc dành riêng cho bạn được đính kèm bên dưới.
         </div> 
         <br>
         <div> Sau khi sử dụng xong dịch vụ từ Homecare, Rất mong nhận lại những đóng góp ý kiến từ bạn tại <a href = "support@bookingcare.vn">support@bookingcare.vn</a>, chúng tôi luôn lắng nghe và cải thiện chất lượng dịch vụ từng ngày để có thể mang lại trải nghiệm phù hợp đến từng khách hàng của Homecare .Xin chân thành cảm ơn bạn!<div>`

    }
    //  if (dataSend.language === 'en') {
    //      result =
    //          `<h3>Dear ${dataSend.patientName}!</h3>
    //      <p>You received this email because you booked a medical appointment on <a href ='https://bookingcare.vn/'> Bookingcare.vn<a></p>
    //      <div><b>Health-related information:</b></div>
    //      <div><b>Scheduled time: ${dataSend.dataTime}</b></div>
    //      <div><b>Doctor: ${dataSend.doctorName}</b></div>
    //      <p>If the information is correct, please click on the link below to confirm and complete the process of scheduling the medical appointment!</p>
    //      <div>
    //          <a href=${dataSend.link}> >>>    Confirming medical appointment.</a>
    //      </div> 
    //      <br>
    //      <div>Thank you sincerely!<div>`
    //  }
    return result;
}


module.exports = {
    checkActivityEmail: checkActivityEmail, checkMedicineBillEmail
}