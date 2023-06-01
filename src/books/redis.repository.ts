import { Injectable } from "@nestjs/common";
import { createClient } from "redis";

@Injectable()
export class RedisRepo {

    private client = null;

    async connectToRedis(connectionString: string) {
        this.client = createClient();
        await this.client.connect();
    }

    async setValue(key: string, value: any) {
        await this.client.setEx(key, 60, value);
    }

    async getValue(key: string) {
        return await this.client.get(key);
    }
}