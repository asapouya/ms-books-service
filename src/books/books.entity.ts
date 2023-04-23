import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {

    @PrimaryGeneratedColumn("uuid")
    _id: string

    @Column({nullable: false})
    author: string

    @Column({nullable: false, unique: true})
    title: string

    @Column({nullable: false})
    year_of_publication: number

    @Column({nullable: false})
    publisher: string

    @Column({nullable: false, type: "simple-array"})
    genre: string[]

    @Column({nullable: false, length: 1024})
    summary: string

    @Column({nullable: true})
    book_pdf_dir: string
}

