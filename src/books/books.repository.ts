import { Injectable } from "@nestjs/common"

@Injectable()
export class BooksRepository {

    //protected dbObject: any

    findAll(...options: any) {
        //MySql query
        return {book: "this is the findAll method"}
    }
    findOne(...options: any) {
        //MySql query
        return {book: "this is the findOne method"}
    }
    create(obj: Object) {
        //MySql logic
        return {book: obj}
    }
}