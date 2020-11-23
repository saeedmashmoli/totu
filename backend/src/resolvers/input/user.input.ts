import { Field, InputType } from '@nestjs/graphql';

@InputType()
class UserInput {
  @Field()
  readonly mobile: string;
  @Field()
  readonly email!: string;
  @Field()
  readonly password: string;
}

export default UserInput;
