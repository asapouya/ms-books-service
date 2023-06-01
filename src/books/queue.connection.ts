import { Injectable } from "@nestjs/common";
import { connect } from "amqplib";

Injectable()
export class RabbitMQConnection {
    private static instance: RabbitMQConnection;
    private static connection: any;

    private constructor() {}

    public static getInstance(): RabbitMQConnection {
        if (!RabbitMQConnection.instance) {
        RabbitMQConnection.instance = new RabbitMQConnection();
        }
        return RabbitMQConnection.instance;
    }

    async connect() {
        if(RabbitMQConnection.connection){
            return RabbitMQConnection.connection;
        }
        RabbitMQConnection.connection = await connect("amqp://localhost");
        console.log('\x1b[33m%s\x1b[0m', "Connected to rabbitMQ.");
    }

    static get getConnection() {
        return RabbitMQConnection.connection;
    }
}