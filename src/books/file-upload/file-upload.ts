import { Injectable } from "@nestjs/common";
import path from "path";

@Injectable()
export class FileUpload {

    upload(req: any, res: any): Promise<string>{
        if(!req.files) return res.status(400).send("No file uploaded."); 
        if(req.files.file.mimetype !== "application/pdf") return res.status(400).send("Please send pdf file.");
        const file = req.files.file;
        const file_name = file.name;
        let file_path;// = path.join(config.get("pdf_path"), `${Date.now() + file_name}`);
        // file.mv(file_path, (err) => {
        //     if (err) return res.status(400).send(err);
        // })
        return new Promise((resolve, reject) => {
            file.mv(file_path, (err) => {
                if(err) {
                    console.log(err);
                    return reject(err)
                }
                resolve(file_path);
            });
        })   
    }
}