"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUrl = process.env.MONGO_URL || '';
mongoose_1.default.connect(mongoUrl, {})
    .then(db => console.log('DB is online'))
    .catch(err => console.log(err));
//# sourceMappingURL=database.js.map