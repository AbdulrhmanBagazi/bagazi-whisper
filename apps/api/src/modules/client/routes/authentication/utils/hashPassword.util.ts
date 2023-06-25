import { argon2id, hash } from 'argon2';

const HashPassword = async (password: string | null | undefined): Promise<string | null> => {
  if (password) {
    const passwordhash = await hash(password, {
      type: argon2id,
    });

    return passwordhash;
  }

  return null;
};

export default HashPassword;
