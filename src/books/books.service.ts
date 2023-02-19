import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "./books.entity";
import { Repository } from "typeorm";
import { FileUpload } from "./file-upload/file-upload";
import { Request, Response } from "express";

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book) private repo: Repository<Book>, 
        private fileUpload: FileUpload
        ) {}

    create(bookObj: any) {
        return this.repo.create(bookObj);
    }

    save(bookObj: any) {
        return this.repo.save(bookObj);
    }

    async upload_file(file: any, req: Request, res: Response){
        await this.fileUpload.upload(req, res)
    }
}