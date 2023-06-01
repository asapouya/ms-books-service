import * as joi from "joi";

export async function validateBook (obj: any) {
    const schema = joi.object({
        author: joi.string()
            .required()
            .min(1)
            .max(128),
        title: joi.string()
            .required()
            .min(1)
            .max(128),
        year_of_publication: joi.number()
            .required(),
        publisher: joi.string()
            .required()
            .min(1)
            .max(128),
        genre: joi.string()
            .required(),
        summary: joi.string()
            .required()
            .min(1)
            .max(4096)
    })
    return await schema.validateAsync(obj);
}