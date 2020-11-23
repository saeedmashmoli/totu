import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Request , Response } from 'express';
import { AppService } from './app.service';
import { createAccessToken, REFRESH_TOKEN_SECRET } from './constants/constants';
import RepoService from './repo.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly repoService: RepoService
    ) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
  @Post('refresh_token')
  async refreshToken(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<any> {
    const token = req.cookies.jid;
    if(!token){
      return res.send({ status : false , token: "" })
    }
    let payload = null;
    try {
      payload = verify(token , REFRESH_TOKEN_SECRET)
    } catch (error) {
      return res.send({ status : false , token: "" })
    }

    const user = await this.repoService.userRepo.findOne({id : payload.userId});
    if(!user){
      return res.send({ status : false , token: "" })
    }
    return res.send({ status : true , token: createAccessToken(user) })
  }
}
