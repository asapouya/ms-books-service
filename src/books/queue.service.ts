import { Injectable } from "@nestjs/common";
import { RabbitmqRepo } from "./queue.repository";


@Injectable()
export class RabbitmqService {
    constructor(public repo: RabbitmqRepo) {}

    async handle_user_deletion() {
        
        this.repo.createChannel();
    }

    // async consumeMessages(callBack: Function) {
    //     await this.repo.connect("amqp://localhost");
    //     await this.repo.createChannel();
    //     const messsage = await this.repo.listenToMessage("books.user.delete.queue", callBack);
    //     return messsage;    
    // }

    // async ack(msg: any) {
    //     await this.repo.ack(msg);
    // }

    // async noAck(msg: any) {
    //     await this.repo.noAck(msg);
    // }
}