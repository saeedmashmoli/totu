import User from 'src/database/entities/user.entity';
import { Args, Field, InputType, Mutation, ObjectType, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import RepoService from '../repo.service';
import Message from 'src/database/entities/message.entity';
import { UseMiddleware } from 'type-graphql';
import { isAuth } from 'src/middlewares/isAuthMiddleware';


@InputType()
class MessageInput {
  @Field()
  readonly text: string;
  @Field()
  readonly senderId: number;
}

@Resolver(() => Message)
class MessageResolver {
    constructor(private readonly repoService: RepoService) {}

    @ResolveField(() => User )
    public async sender( @Parent() message : Message ) : Promise<User>{
        return this.repoService.userRepo.findOne(message.senderId);
    }
        

    @Query(() => [Message])
    public async messages(): Promise<Message[]> {
        return this.repoService.messageRepo.find();
    }

    @Mutation(() => Message)
    public async createMessage(
        @Args('data') input: MessageInput
    ): Promise<Message> {
        const message = this.repoService.messageRepo.create({...input});
        return  this.repoService.messageRepo.save(message);
    }
}
export default MessageResolver;