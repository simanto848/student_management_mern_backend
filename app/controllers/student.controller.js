import Student from "../models/Student.js";
import bcrypt from "bcrypt";
import mail from "../middlewares/MailSender.js";
import { randomPassword } from "../middlewares/passwordGenerator.js";

export const create = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Require Admin Role!",
      });
    } else {
      const {
        name,
        rollNo,
        phoneNo,
        email,
        courseFee,
        departmentId,
        sessionId,
        departmentShortName,
      } = req.body;

      if (
        !name ||
        !rollNo ||
        !phoneNo ||
        !email ||
        !courseFee ||
        !departmentId ||
        !sessionId
      ) {
        return res.status(400).json({
          message: "All fields are required!",
        });
      }

      const studentExists = await Student.findOne({ email: email });
      if (studentExists) {
        return res.status(400).json({ message: "Student already exists." });
      } else {
        const uniqueRegistration =
          departmentShortName + "-" + new Date().getTime().toString().slice(-4);
        const findStudentWithRegistration = await Student.findOne({
          registrationNo: uniqueRegistration,
        });

        if (findStudentWithRegistration) {
          return res
            .status(400)
            .json({ message: "Registration number already exists." });
        } else {
          const password = randomPassword(8);
          const hashedPassword = await bcrypt.hash(password, 10);
          const student = new Student({
            name: name,
            registrationNo: uniqueRegistration,
            rollNo: rollNo,
            phoneNo: phoneNo,
            email: email,
            password: hashedPassword,
            courseFee: courseFee,
            departmentId: departmentId,
            sessionId: sessionId,
          });

          const data = await student.save();

          const emailSent = await mail(email, password);

          if (emailSent) {
            res
              .status(201)
              .json({ message: "Student was created successfully." });
          } else {
            res.status(500).json({
              message: "Failed to send email to the student.",
            });
          }
        }
      }
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Student.",
    });
  }
};

export const findAll = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Require Admin Role!",
      });
    } else {
      const data = await Student.find()
        .populate("departmentId")
        .populate("sessionId");
      res.json(data);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving students.",
    });
  }
};

export const findOne = async (req, res) => {
  const id = req.params.studentId;

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Require Admin Role!",
      });
    } else {
      const data = await Student.findById(id);
      if (!data) {
        res.status(404).json({ message: "Not found Student with id " + id });
      } else {
        res.json(data);
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Student with id=" + id });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.studentId;

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Require Admin Role!",
      });
    } else {
      const data = await Student.findByIdAndUpdate(id, req.body);
      if (!data) {
        return res.status(404).json({
          message: `Cannot update Student with id=${id}. Maybe Student was not found!`,
        });
      } else {
        return res.json({ message: "Student was updated successfully." });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error updating Student with id=" + id,
    });
  }
};

export const remove = async (req, res) => {
  const id = req.params.studentId;

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Require Admin Role!",
      });
    } else {
      const data = await Student.findByIdAndDelete(id);
      if (!data) {
        res.status(404).json({
          message: `Cannot delete Student with id=${id}. Maybe Student was not found!`,
        });
      } else {
        res.json({ message: "Student was deleted successfully!" });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: `Could not delete Student with id ${id}`,
    });
  }
};
