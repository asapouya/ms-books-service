import { IsArray, IsNumber, IsString, Length } from "class-validator";

class Post_books{
    @IsString()
    @Length(1, 128)
    author: string

    @IsString()
    @Length(1, 128)
    title: string

    @IsNumber()
    year_of_publication: number
    
    @IsString()
    @Length(1, 128)
    publisher: string

    @IsArray()
    genre: string[]

    @IsString()
    @Length(1, 4096)
    summary: string
}

export default Post_books;