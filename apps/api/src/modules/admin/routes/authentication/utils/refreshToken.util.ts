import Jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_PrivateKey, AdminPassPhrase, AdminAccessTokenMaxAge } from '../../../config/jwt.config';

const RefreshToken = async ({ id, subject, issuer, audience }: JwtPayload): Promise<string> => {
  const Token = await Jwt.sign(
    { id },
    { key: JWT_PrivateKey, passphrase: AdminPassPhrase },
    {
      expiresIn: AdminAccessTokenMaxAge,
      algorithm: 'RS256',
      subject,
      issuer,
      audience,
    },
  );

  return Token;
};

export default RefreshToken;
