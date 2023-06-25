import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const VerifyEmail = async (req: Request, res: Response) => {
  try {
    const User = req.user;

    if (User.verfied) {
      return res.sendStatus(200);
    }

    const update = await prisma.user.update<Prisma.UserUpdateArgs>({
      where: {
        id: User.id,
      },
      data: {
        verfied: true,
      },
    });

    if (update.verfied) {
      return res.sendStatus(200);
    }

    return res.sendStatus(400);
  } catch (e: unknown) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.sendStatus(400);
    }
    return res.sendStatus(500);
  }
};

export default VerifyEmail;
