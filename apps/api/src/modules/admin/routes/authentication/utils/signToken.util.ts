import Jwt from 'jsonwebtoken';
import {
  JWT_PrivateKey,
  AdminPassPhrase,
  AdminAccessTokenMaxAge,
  AdminTokenMeta,
  AdminRefreshTokenMaxAge,
} from '../../../config/jwt.config';

type Token_Type = 'admin_access_token' | 'admin_refresh_token';

const SignToken = async (data: { id: string; email: string }, type: Token_Type): Promise<string> => {
  const Token = await Jwt.sign(
    data,
    { key: JWT_PrivateKey, passphrase: AdminPassPhrase },
    {
      expiresIn: type === 'admin_access_token' ? AdminAccessTokenMaxAge : AdminRefreshTokenMaxAge,
      algorithm: 'RS256',
      ...AdminTokenMeta,
    },
  );

  return Token;
};

export default SignToken;
