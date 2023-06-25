import { Request, Response } from 'express';
import moment from 'moment';
import { SendEmail } from '../index.utils';
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const SendNewVerificationEmail = async (req: Request, res: Response) => {
  try {
    const User = req.user;
    const now = new Date();
    const sentDate = moment(User.verificationEmail);
    const currentDate = moment();
    const duration = moment.duration(currentDate.diff(sentDate));
    const minutes = duration.asMinutes();

    if (User.verfied) {
      return res.status(200).send('verified');
    }

    if (minutes >= 15) {
      const emailStatus = await SendEmail(User.id, User.email);

      if (emailStatus) {
        await prisma.user.update<Prisma.UserUpdateArgs>({
          where: {
            id: User.id,
          },
          data: {
            verificationEmail: now,
          },
        });

        return res.status(200).send('email sent');
      }

      return res.sendStatus(400);
    }

    return res.status(200).send('wait 15m');
  } catch (e: unknown) {
    // if (e instanceof Prisma.PrismaClientKnownRequestError) {
    //   return res.sendStatus(400);
    // }
    return res.sendStatus(500);
  }
};

export default SendNewVerificationEmail;
