import { SES, AWSError, config } from 'aws-sdk';
import { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses';

export const sendEmail = async (
  to: string,
  message: string,
  subject: string,
) => {
  config.update({
    accessKeyId: process.env.AWS_EMAIL_ACCESS_KEY,
    secretAccessKey: process.env.AWS_EMAIL_ACCESS_SECRET_KEY,
    region: process.env.AWS_EMAIL_REGION,
  });
  const ses = new SES({ apiVersion: '2010-12-01' });
  const charset = 'UTF-8';
  // Set the parameters
  const params: SendEmailRequest = {
    Source: 'bilgi@tir-port.com',
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: charset,
      },
      Body: {
        Html: {
          Data: message,
          Charset: charset,
        },
      },
    },
  };
  ses.sendEmail(params, (err: AWSError, data: SendEmailResponse) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};
