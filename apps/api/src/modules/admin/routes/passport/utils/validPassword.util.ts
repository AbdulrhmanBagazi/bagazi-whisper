import { verify } from 'argon2'

const ValidPassword = async (
  hash: string,
  password: string
): Promise<boolean> => {
  return await verify(hash, password)
}

export default ValidPassword
