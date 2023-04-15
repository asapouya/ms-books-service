import { Injectable } from "@nestjs/common";
import {connect} from "amqplib";

@Injectable()
export class RabbitmqRepo {
    
    private connection = null
    private channel = null

    async connect(connectionString: string) {
        this.connection = await connect(connectionString);
    }

    async createChannel() {
        this.channel = await this.connection.createChannel();
    }

    async listenToMessage(queueName: string, callBack: Function) {
        (await this.channel).consume(queueName, async (msg: any) => {
            await callBack(msg);
        });
    }

    async ack(msg: any) {
        (await this.channel).ack(msg);
        console.log("message ackowleged.")
    }

    async noAck(msg: any) {
        (await this.channel).nack(msg, false, true);
        console.log("message requeued.");
    }

    // async handleMessages(message: any ) {
    //     // if(message !== null) {
            
    //     //     console.log(message);

    //     //     await this.channel.ack(message);
    //     // }
    //     const connection = connect("kh")
    //     const channel = (await connection).createChannel();
    //     (await channel).nack(message, false, true)
    // }
}