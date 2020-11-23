import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './config/ormconfig';
import { GraphQLModule } from '@nestjs/graphql';
import UserResolver from './resolvers/user.resolver';
import MessageResolver from './resolvers/message.resolver';
import RepoModule from './repo.module';

const gqlImports = [ UserResolver , MessageResolver ]

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    RepoModule,
    ...gqlImports,
    GraphQLModule.forRoot({
      context : ({ req , res }) => ({ 
        req , 
        res 
      }),
      installSubscriptionHandlers: true,
      subscriptions: {
        keepAlive: 5000,
      },
      autoSchemaFile: 'src/genrated/schema.gql',
      debug: false,
      playground: true,
      
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
