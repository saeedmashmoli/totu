import { Field, InputType } from '@nestjs/graphql';

@InputType()
class UserInput {
  @Field()
  readonly text: string;
  @Field()
  readonly senderId: number;
}

export default UserInput;