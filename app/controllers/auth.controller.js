import User from "../models/User.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill out all fields." });
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(400).json({ message: "Invalid credential." });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credential." });
    }
    const token = jwt.sign(
      {
        id: validUser._id,
        role: validUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: true,
      })
      .json({ user: rest, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const teacherLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill out all fields." });
  }

  try {
    const validTeacher = await Teacher.findOne({ email });

    if (!validTeacher) {
      return res.status(400).json({ message: "Invalid credential." });
    } else {
      const validPassword = await bcrypt.compare(
        password,
        validTeacher.password
      );

      if (!validPassword) {
        return res.status(400).json({ message: "Invalid credential." });
      }

      const token = jwt.sign(
        {
          id: validTeacher._id,
          role: "teacher",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      const { password: pass, ...rest } = validTeacher._doc;
      res
        .status(200)
        .cookie("auth_token", token, {
          httpOnly: true,
          secure: true,
        })
        .json({ user: rest, token });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const studentLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill out all fields." });
  }

  try {
    const validStudent = await Student.findOne({ email });

    if (!validStudent) {
      return res.status(400).json({ message: "Invalid credential." });
    } else {
      const validPassword = await bcrypt.compare(
        password,
        validStudent.password
      );

      if (!validPassword) {
        return res.status(400).json({ message: "Invalid credential." });
      }

      const token = jwt.sign(
        {
          id: validStudent._id,
          role: "student",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      const { password: pass, ...rest } = validStudent._doc;
      res
        .status(200)
        .cookie("auth_token", token, {
          httpOnly: true,
          secure: true,
        })
        .json({ user: rest, token });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signOut = (req, res) => {
  try {
    res
      .clearCookie("auth_token")
      .status(200)
      .json({ message: "Sign out successfull" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
