import { Injectable } from "@nestjs/common";
import { RedisConnection } from "./redis.connection";

@Injectable()
export class RedisRepo {

    private client = RedisConnection.getClient;

    async setValue(key: string, value: any) {
        await this.client.setEx(key, 60, value);
    }

    async getValue(key: string) {
        return await this.client.get(key);
    }
}