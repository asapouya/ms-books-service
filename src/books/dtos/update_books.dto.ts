import { IsEmail, IsString, IsOptional, IsArray, Length, IsNumber } from "class-validator";

export class UpdateBookDto {
    @IsString()
    @Length(1, 128)
    @IsOptional()
    author: string

    @IsString()
    @Length(1, 128)
    @IsOptional()
    title: string

    @IsNumber()
    @IsOptional()
    year_of_publication: number
    
    @IsString()
    @Length(1, 128)
    @IsOptional()
    publisher: string

    @IsArray()
    @IsOptional()
    genre: string[]

    @IsString()
    @Length(1, 4096)
    @IsOptional()
    summary: string
}

