import { Expose } from "class-transformer";


export class BookDTO {

    @Expose()
    _id: string

    @Expose()
    author: string

    @Expose()
    title: string
    
    @Expose()
    year_of_publication: number
    
    @Expose()
    publisher: string
    
    @Expose()
    genre: string[]
    
    @Expose()
    summary: string
}