import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "dolphin.learning.01@gmail.com",
        pass: "Thinhxautrai1660",
    },
});
  