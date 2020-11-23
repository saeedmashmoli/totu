import User from '../database/entities/user.entity';
import { Args, Context, Field, InputType, Mutation, ObjectType, Query, Resolver  } from '@nestjs/graphql';
import RepoService from '../repo.service';
import { registerValidator } from '../validators/register.validator';
import UserRegisterInput from "../resolvers/input/user.input";
import { hash , compare } from 'bcryptjs';
import { UseMiddleware } from 'type-graphql';
import {MyContext} from '../constants/types';
import { ACCESS_TOKEN_SECRET, COOKIE_NAME,createAccessToken, createRefreshToken, sendRefreshToken } from 'src/constants/constants';
import { isAuth } from 'src/middlewares/isAuthMiddleware';
import { verify } from 'jsonwebtoken';
import { UseGuards } from '@nestjs/common';

@InputType()
class LoginUserInput {
  @Field()
  readonly username: string;
  @Field()
  readonly password: string;
}
@ObjectType()
class FieldError {
  @Field()
  readonly field: string;
  @Field()
  readonly message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError] , {nullable : true})
  readonly errors?: FieldError[];

  @Field(() => String , {nullable : true})
  readonly token?: String;
}



@Resolver(() => User)
class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [User])
  public async users(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }
  @Query(() => String)
  @UseGuards(isAuth)
  public async bye(
    @Context() { payload , req }: MyContext,
  ): Promise<String> {
    // const authorization = req.headers['authorization'];
    // if(!authorization){
    //   throw new Error("not authenticated");
    // } 
    // const token = await authorization.split(" ")[1];
    
    // payload = await verify(token , ACCESS_TOKEN_SECRET!);

    return `your user id: `;
  }

  @Mutation(() => UserResponse)
  public async login(
    @Context() {res}: MyContext,
    @Args('input') input: LoginUserInput,
    
  ): Promise<UserResponse> {
    const user = await this.repoService.userRepo.findOne({ mobile : input.username});
    if(!user){
      return {
        errors : [
            {
                field: 'mobile',
                message : 'موبایل وارد شده ثبت نام نشده است'
            }
        ]
      }
    }
    const valid = await compare(input.password , user.password )
    if(!valid){
      return {
        errors : [
            {
                field: 'password',
                message : 'رمز عبور وارد شده اشتباه است'
            }
        ]
      }
    }
    await res.cookie(COOKIE_NAME ,createRefreshToken(user),{
        httpOnly : true
      }
    )
    await sendRefreshToken(res , await createRefreshToken(user))

    return {
      token: createAccessToken(user) as any
    }
    // return  this.repoService.userRepo.findOne(id);
  }

  @Mutation(() => UserResponse)
  public async register(
    @Args('input') input: UserRegisterInput,
    @Context() {res}: MyContext
  ): Promise<UserResponse> {

    const errors = await registerValidator(input);
    if(errors) return {errors}
    const userExsists = await this.repoService.userRepo.findOne({ mobile : input.mobile});
    if(userExsists){
        return {
          errors : [
              {
                  field: 'mobile',
                  message : 'موبایل وارد شده قبلا ثبت نام کرده است'
              }
          ]
        }
    }
    const hashPassword = await hash(input.password , 16);
    const user = await this.repoService.userRepo.create({...input , password : hashPassword});
    await this.repoService.userRepo.save(user);


    res.cookie(COOKIE_NAME ,createRefreshToken(user),{
        httpOnly : true
      }
    )

    return {
      token: createAccessToken(user) as any
    }
  }

}
export default UserResolver;
