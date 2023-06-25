import sgMail from '@sendgrid/mail'
import { SignToken } from '../index.utils'

const FromEmail = process.env.SENDER_EMAIL as string
const VerifyURL = process.env.VERIFY_URL as string
const VERIFY_TEMP = process.env.VERIFY_TEMP as string

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

const SendEmail = async (id: string, email: string) => {
  try {
    const EmailToken = await SignToken({ id, email }, 'email_token')
    const msg = {
      to: email, // Change to your recipient
      from: FromEmail, // Change to your verified sender
      subject: 'التحقق من البريد الإلكتروني تطبيق تنظيم',
      templateId: VERIFY_TEMP,
      dynamicTemplateData: {
        Event_Verify: `${VerifyURL + '/' + EmailToken}`
      }
    }

    await sgMail.send(msg)

    return true
  } catch (e: unknown) {
    return false
  }
}

export default SendEmail
