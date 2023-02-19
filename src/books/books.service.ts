import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "./books.entity";
import { Repository } from "typeorm";

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book) private repo: Repository<Book>) {}

    create(bookObj: any) {
        return this.repo.create(bookObj);
    }

    save(bookObj: any) {
        return this.repo.save(bookObj);
    }
}