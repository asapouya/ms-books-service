import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "./books.entity";
import { Repository } from "typeorm";

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Book) private repo: Repository<Book>) {}

    create(bookObj: any) {
        return this.repo.create(bookObj);
    }
    save(bookObj: any) {
        return this.repo.save(bookObj);
    }
    findOne(id: any) {
        return this.repo.findOneBy({_id: id})
    }
    findAll() {
        return this.repo.find();
    }
    updateOne(_id: string, attrs: Partial<Book>) {
        return this.repo.update({_id: _id}, attrs);
    }
    async searchBook(queryParams: any): Promise<Book[]> {
        const queryBuilder = this.repo.createQueryBuilder("book");
        for (const key in queryParams) {
            if (queryParams.hasOwnProperty(key)) {
                queryBuilder.andWhere(`book.${key} LIKE :${key}`, { [key]: `%${queryParams[key]}%`});
            }
        }
        const books = await queryBuilder.getMany();
        return books;
    }
}