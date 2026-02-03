import { EventEmitter } from 'events';
import { activationTemplate } from './activation.template.js';
import { generateEmailVerficationToken } from './generate-token.util.js';
import sendEmail, { subject } from './send-email.util.js';

export const emailEvent = new EventEmitter();

emailEvent.on('sendEmail', async (email, firstName) => {
  const token = generateEmailVerficationToken({ email });
  const link = `http://localhost:3000/api/v1/activate/${token}`;

  const html = activationTemplate(link, firstName);

 await sendEmail({
    to: email,
    subject: subject.register,
    html,
  });
});
