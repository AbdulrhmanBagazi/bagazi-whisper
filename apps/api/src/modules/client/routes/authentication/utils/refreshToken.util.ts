import Jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_PrivateKey, ClientPassPhrase, ClientAccessTokenMaxAge } from '../../../config/jwt.config';

const RefreshToken = async ({ id, subject, issuer, audience }: JwtPayload): Promise<string> => {
  const Token = await Jwt.sign(
    { id },
    { key: JWT_PrivateKey, passphrase: ClientPassPhrase },
    {
      expiresIn: ClientAccessTokenMaxAge,
      algorithm: 'RS256',
      subject,
      issuer,
      audience,
    },
  );

  return Token;
};

export default RefreshToken;
