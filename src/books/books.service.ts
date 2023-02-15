import { BooksRepository } from "./books.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BooksService {
    constructor(public booksRepository: BooksRepository) {}

    findAll(...options: any) {
        return this.booksRepository.findAll(...options);
    }
    findOne(...options: any) {
        return this.booksRepository.findOne(...options);
    }
    create(obj: Object) {
        return this.booksRepository.create(obj);
    }
}