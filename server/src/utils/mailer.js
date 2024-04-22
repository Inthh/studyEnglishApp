import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';

import {
    GOOGLE_MAILER_CLIENT_ID,
    GOOGLE_MAILER_CLIENT_SECRET,
    GOOGLE_MAILER_REFRESH_TOKEN,
    ADMIN_EMAIL_ADDRESS
} from './constants.js'

export const createTransporter = async () => {
    const mailerOAuth2Client = new OAuth2Client(
        GOOGLE_MAILER_CLIENT_ID,
        GOOGLE_MAILER_CLIENT_SECRET
    );

    mailerOAuth2Client.setCredentials({
        refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
    });

    const accessTokenObject = await mailerOAuth2Client.getAccessToken();
    const accessToken = accessTokenObject?.token;
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'OAuth2',
            user: ADMIN_EMAIL_ADDRESS,
            clientId: GOOGLE_MAILER_CLIENT_ID,
            clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
            refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
            accessToken: accessToken
          }
    });
}

