import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MovieDocument = MovieModel & Document;

@Schema({ collection: 'movies' })
export class MovieModel {
    @Prop()
    id: string;

    @Prop()
    userId: string;

    @Prop()
    title: string;

    @Prop()
    titleLower: string;

    @Prop()
    releaseDate: string;

    @Prop()
    genre: string;

    @Prop()
    director: string;

    @Prop()
    createdInMonth: number;
}

export const MovieSchema = SchemaFactory.createForClass(MovieModel);
