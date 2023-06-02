import { Injectable } from "@nestjs/common";
import { RabbitMQConnection } from "./queue.connection";

@Injectable()
export class RabbitmqRepo {
    
    private connection = RabbitMQConnection.getConnection;
    private channel = null

    async createChannel() {
        this.channel = await this.connection.createChannel();
        console.log("Channel Created.");
    }

    async listenToMessage(queueName: string, callBack: Function) {
        (await this.channel).consume(queueName, async (msg: any) => {
            await callBack(msg);
        });
    }

    returnEvent = (callBack: Function) => {
        this.channel.on("return", (message: any) => {
            callBack(message);
        })
    }

    errorEvent = (callBack: Function) => {
        this.channel.on("error", (err: any) => {
            callBack(err);
        })
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