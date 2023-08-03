// IMPORT DEPENDENCIES
import { config } from 'dotenv'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { User } from '../../../models/User' 
import { VerifyResetEmailAndSendOtp } from './verify_send_password_reset_otp'

config();

export class ForgotPassword {
    public async getResetOtp(req: Request, res: Response) {
        try {
          const { email } = req.body;

          await new VerifyResetEmailAndSendOtp().verifyAndSend(email);
        } catch (error: any) {
            console.error(error);
            return res.status(StatusCodes.BAD_REQUEST).json(error.message);
          }
        };

        
    //  Incomplete.
    public async resendResetOtp(res: Response, email: string) {
        try {
            await new VerifyResetEmailAndSendOtp().verifyAndSend(email);

          } catch (error: any) {
              console.error(error);
              return res.status(StatusCodes.BAD_REQUEST).json(error.message);
            }
        };

  
    public async verifyResetOtp (req: Request, res: Response){
        const { OTP } = req.body;
        const user: any = await User.findOne({ OTP });

        try {
            if(!OTP || OTP !== user.OTP) 
                return res.status(StatusCodes.BAD_REQUEST).json(
                    { 
                        Error: "A valid One-time password is needed" 
                    }
                );

            return res.status(StatusCodes.OK).redirect(StatusCodes.PERMANENT_REDIRECT, `/pwd/reset/${user._id}`);
        } catch(error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
        }
    };
}