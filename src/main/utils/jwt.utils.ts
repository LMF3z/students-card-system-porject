import jwt from 'jsonwebtoken'

const JWT_SECRET = 'jwt_secret*.1425&'

export const signToken = (data: any) => {
  const token = jwt.sign(data, JWT_SECRET, {
    expiresIn: '1h'
  })
  return token
}

export const validateToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
