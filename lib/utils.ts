export const stringifyData = (data: any) => JSON.stringify(data);

export const parseStringify = (data: any) => JSON.parse(JSON.stringify(data));

export const ObjectId = require("mongoose").Types.ObjectId;