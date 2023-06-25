export const JWT_PrivateKey = process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') as string;
export const JWT_PublicKey = process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, '\n') as string;

export const ClientPassPhrase = process.env.PASSPHRASE as string;
export const ClientAccessTokenMaxAge = process.env.CLIENT_ACCESS_TOKEN_MAXAGE || '';
export const ClientRefreshTokenMaxAge = process.env.CLIENT_REFRESH_TOKEN_MAXAGE || '';
export const ClientTokenMeta = {
  issuer: process.env.CLIENT_ISSUER,
  audience: process.env.CLIENT_AUDIENCE,
  subject: 'client',
};
