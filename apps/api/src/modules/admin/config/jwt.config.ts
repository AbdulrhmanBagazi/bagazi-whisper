export const JWT_PrivateKey = process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') as string;
export const JWT_PublicKey = process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, '\n') as string;

export const AdminPassPhrase = process.env.ADMIN_PASSPHRASE as string;
export const AdminAccessTokenMaxAge = process.env.ADMIN_ACCESS_TOKEN_MAXAGE || '';
export const AdminRefreshTokenMaxAge = process.env.ADMIN_REFRESH_TOKEN_MAXAGE || '';
export const AdminTokenMeta = {
  issuer: process.env.ADMIN_ISSUER,
  audience: process.env.ADMIN_AUDIENCE,
  subject: 'admin',
};
