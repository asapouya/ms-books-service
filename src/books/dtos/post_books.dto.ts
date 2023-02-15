import { IsNumber, IsString, Length, MaxLength } from "class-validator";

class BooksDTO{
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

    @Length(2, 64, {
    each: true,
    })
    genre: string[]

    @IsString()
    @Length(1, 1024)
    summary: string
}

export default BooksDTO;