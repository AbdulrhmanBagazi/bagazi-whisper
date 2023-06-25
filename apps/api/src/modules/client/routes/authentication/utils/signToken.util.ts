import Jwt from 'jsonwebtoken';
import {
  JWT_PrivateKey,
  ClientPassPhrase,
  ClientAccessTokenMaxAge,
  ClientTokenMeta,
  ClientRefreshTokenMaxAge,
} from '../../../config/jwt.config';

type Token_Type = 'access_token' | 'refresh_token' | 'email_token';

const SignToken = async (data: { id: string; email: string }, type: Token_Type): Promise<string> => {
  const Token = await Jwt.sign(
    data,
    { key: JWT_PrivateKey, passphrase: ClientPassPhrase },
    {
      expiresIn: type === 'access_token' ? ClientAccessTokenMaxAge : ClientRefreshTokenMaxAge,
      algorithm: 'RS256',
      ...ClientTokenMeta,
    },
  );

  return Token;
};

export default SignToken;
