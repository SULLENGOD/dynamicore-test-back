"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.addContact = exports.profile = exports.signin = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.password = yield user.encryptPassword(user.password);
    const savedUser = yield user.save();
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || 'tokentest');
    res.header('auth-token', token.toString()).json(savedUser);
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json('wrong email');
    const correctPassword = yield user.validatePassword(req.body.password);
    if (!correctPassword)
        return res.status(400).json('invalid password');
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'tokentest', {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json({
        user: user,
        token: token
    });
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId, { password: 0 });
    if (!user)
        return res.status(404).json('No user found');
    res.json(user);
});
exports.profile = profile;
const addContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = req.body;
    const user = yield User_1.default.findById(req.userId, { password: 0 });
    if (!user) {
        return res.status(404).json('No user found');
    }
    ;
    const updateQuery = {
        $push: { contactsId: contact }
    };
    yield User_1.default.updateOne({ _id: req.userId }, updateQuery);
    const updatedUser = yield User_1.default.findById(req.userId, { password: 0 });
    res.send(updatedUser);
});
exports.addContact = addContact;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, userEmail } = req.body;
    console.log(req);
    try {
        const user = yield User_1.default.findById(userId, { password: 0 });
        if (!user) {
            return res.status(404).json('No user found');
        }
        else {
            console.log('found!');
        }
        const updateQuery = {
            $pull: { contactsId: { email: userEmail } }
        };
        yield User_1.default.updateOne({ _id: userId }, updateQuery);
        const updatedUser = yield User_1.default.findById(userId, { password: 0 });
        res.send(updatedUser);
    }
    catch (error) {
        res.status(500).json('Error deleting contact');
    }
});
exports.deleteContact = deleteContact;
//# sourceMappingURL=auth.controller.js.map