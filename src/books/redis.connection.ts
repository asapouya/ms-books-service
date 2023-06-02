import { Injectable } from "@nestjs/common";
import { createClient } from "redis";

Injectable()
export class RedisConnection {
    private static instance: RedisConnection;
    private static client: any;

    private constructor() {}

    public static getInstance(): RedisConnection {
        if (!RedisConnection.instance) {
        RedisConnection.instance = new RedisConnection();
        }
        return RedisConnection.instance;
    }

    async connect() {
        if(RedisConnection.client){
            return RedisConnection.client;
        }

        RedisConnection.client = createClient();
        await RedisConnection.client.connect();
        console.log('\x1b[33m%s\x1b[0m', "Connected to redis.");
    }

    static get getClient() {
        return RedisConnection.client;
    }
}