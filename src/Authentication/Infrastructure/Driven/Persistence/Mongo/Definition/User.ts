import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = UserModel & Document;

@Schema({ collection: 'users' })
export class UserModel {
    @Prop()
    id: string;

    @Prop()
    role: string;

    @Prop()
    fullName: string;

    @Prop()
    username: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
