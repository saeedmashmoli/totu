import { sign } from "jsonwebtoken";
import User from "src/database/entities/user.entity";
import { Response } from 'express'

export const __prod__ = process.env.NODE_ENV === 'production' 
export const COOKIE_NAME = "jid"
export const FORGET_PASSWORD_PREFIX = "forget-password:"
export const EXPIRED_CHANGE_PASSWORD_TOKEN = 900000; // miliseconds
export const BCRYPT_PLAIN="sdaq12312dszxc@#4";

export const ACCESS_TOKEN_SECRET = "sdasdaszca";
export const ACCESS_TOKEN_TIME = "5m";
export const REFRESH_TOKEN_SECRET = "sadasdadwewew";
export const REFRESH_TOKEN_TIME = "7d";

export const createAccessToken = async (user : User) => {
    return sign({userId : user.id} , ACCESS_TOKEN_SECRET , { expiresIn : ACCESS_TOKEN_TIME})
}
export const createRefreshToken = async (user : User) => {
    return sign({userId : user.id} , REFRESH_TOKEN_SECRET , { expiresIn : REFRESH_TOKEN_TIME})
}
export const sendRefreshToken = async (res: Response , token: String) => {
    return res.cookie(COOKIE_NAME ,token,{httpOnly : true})
}