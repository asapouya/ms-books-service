import { Injectable } from "@nestjs/common";

@Injectable()
export class FileManagementRepo {

    saveFileToDisk(file: Express.Multer.File, dir: string): Promise<string>  {
        let fileName = dir + Date.now();
        return new Promise((resolve, reject) => {
            (file as any).mv(fileName, (err: Error) => {
                if(err) return reject(err);
                resolve(fileName);
            });
        })
    }
}