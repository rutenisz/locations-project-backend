import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";

const SIGN_UP = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new UserModel({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hash,
    });

    const response = await user.save();

    return res.status(201).json({ message: "User added", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occured" });
  }
};

const LOGIN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Wrong email or password, try again" });
    }

    const doesPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!doesPasswordMatch) {
      return res.status(401).json({ message: "Bad email or password" });
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.status(200).json({ message: "User logged in", token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Logged unsuccessfully" });
  }
};

export { SIGN_UP, LOGIN };
