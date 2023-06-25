import { argon2id, hash } from 'argon2';

const HashPassword = async (password: string): Promise<string> => {
  const passwordhash = await hash(password, {
    type: argon2id,
  });

  return passwordhash;
};

export default HashPassword;
