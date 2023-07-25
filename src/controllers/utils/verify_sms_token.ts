import { Request, Response } from "express";
import { KYC } from "../../models/KYC";
import { StatusCodes } from "http-status-codes";

export class VerifySmsToken {
    public verify = async (req: Request, res: Response) => {
        try {
            const { OTP } = req.body;
            const kyc = await KYC.findOne({ OTP }).select("OTP")
        
            if(!kyc) return res.status(StatusCodes.NOT_FOUND).json(
                { 
                    message: 'Please enter a valid one-time Password'
                }
            )
        
            kyc.OTP = undefined;
            await kyc.save();
    
            return res.status(StatusCodes.OK).json({
                Success: "Verification was successful" 
            })
    
        } catch(error: any) {
            throw error;
        }
    } 
}