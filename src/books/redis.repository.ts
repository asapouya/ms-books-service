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
    async addToSet(key: string, value: any) {
        return await this.client.sAdd(key, value);
    }
    async getSet(key: string) {
        return await this.client.sMembers(key);
    }
    async setExp(key: string, expireIn: any) {
        return await this.client.expire(key, expireIn);
    }
    async delKey(key: string) {
        return await this.client.del(key);
    }
}