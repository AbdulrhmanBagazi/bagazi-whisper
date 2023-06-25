import 'express'
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
        email: string
        verificationEmail: Date
        verfied: boolean
        type: string
        Profile: UserProfile
        appleId?: string
      }
    }
  }
}
