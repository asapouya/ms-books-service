import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {

    @PrimaryGeneratedColumn("uuid")
    _id: string

    @Column({nullable: false})
    author: string

    @Column({nullable: false})
    title: string

    @Column({nullable: false})
    year_of_publiction: string

    @Column({nullable: false})
    publisher: string

    @Column({nullable: false})
    genre: string

    @Column({nullable: false, length: 1024})
    summary: string

    @Column({nullable: false})
    book_pdf_dir: string
}

