import { Injectable, NestMiddleware } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from 'src/constants/constants';
import { MyContext } from 'src/constants/types';
import { MiddlewareFn } from 'type-graphql';
// import GraphQLMiddleware from 'graphql-middleware'


export const isAuth: MiddlewareFn<MyContext> = async ({context} , next) => {
    
    const authorization = context.req.headers['authorization'];
    if(!authorization){
        throw new Error("not authenticated");
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token , ACCESS_TOKEN_SECRET);
        context.payload = payload as any
    } catch (error) {
        throw new Error("not authenticated")
    }
    return next()
}
// export class isAuth {
//     async run(resolve, root, args, context, info) {
       
//         await resolve(root, args, context, info);
//     }

//     // alternatively you can have overridable methods.. i.e.)
//     async before(@Context() context: any) {
        
//     }
// }
