 import { Request, Response } from "express";
 import User, { IUser } from "../models/User";
 import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {

    const user: IUser =  new User ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.password = await user.encryptPassword(user.password);

    const savedUser =  await user.save();
    const token: String = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET || 'tokentest');

    res.header('auth-token', token.toString()).json(savedUser)
}

export const signin = async (req: Request, res: Response) => {

    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).json('wrong email');

    const correctPassword: boolean = await user.validatePassword(req.body.password);
    if ( !correctPassword ) return res.status(400).json('invalid password')

    const token: string = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET || 'tokentest', {
        expiresIn: 60 * 60 * 24
    });
    

    res.header('auth-token', token).json({
      user: user,
      token: token
    });

}

export const profile = async(req: Request, res: Response) => {

    const user = await User.findById(req.userId, {password: 0});
    if (!user) return res.status(404).json('No user found');
    
    res.json(user);
}

export const addContact = async(req: Request, res: Response) => {
    const contact  = req.body;
    const user = await User.findById(req.userId, {password: 0});

    if(!user) {
        return res.status(404).json('No user found');
    };

    const updateQuery = {
        $push: {contactsId:  contact }
    };

    await User.updateOne({ _id: req.userId }, updateQuery);
    const updatedUser = await User.findById(req.userId, {password: 0});

    res.send(updatedUser);
    
}
  
export const deleteContact = async (req: Request, res: Response) => {
    const { userId, userEmail } = req.body;
    console.log(req);
    
  
    try {
      const user = await User.findById(userId, { password: 0 });
  
      if (!user) {
        return res.status(404).json('No user found');
      } else {
        console.log('found!');
        
      }
  
      const updateQuery = {
        $pull: { contactsId: { email: userEmail } }
      };
  
      await User.updateOne({ _id: userId }, updateQuery);
      const updatedUser = await User.findById(userId, { password: 0 });
  
      res.send(updatedUser);
    } catch (error) {
      res.status(500).json('Error deleting contact');
    }
  };
  


