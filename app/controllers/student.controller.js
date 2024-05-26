import Student from "../models/Student.js";
import User from "../models/User.js";
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
        batchId,
        departmentShortName,
        scholarship,
      } = req.body;

      if (
        !name ||
        !rollNo ||
        !phoneNo ||
        !email ||
        !courseFee ||
        !departmentId ||
        !batchId ||
        scholarship === undefined ||
        scholarship === null
      ) {
        return res.status(400).json({
          message: "All fields are required!",
        });
      }

      const studentExists = await User.findOne({
        email: email,
      });
      if (studentExists) {
        return res.status(400).json({ message: "Email already exists." });
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

          const scholarshipPercentage = parseFloat(scholarship);
          if (
            isNaN(scholarshipPercentage) ||
            scholarshipPercentage < 0 ||
            scholarshipPercentage > 100
          ) {
            return res
              .status(400)
              .json({ message: "Invalid scholarship percentage." });
          }

          const scholarshipAmount = (courseFee * scholarshipPercentage) / 100;
          const discountedFee = courseFee - scholarshipAmount;
          const semesterFee = discountedFee / 8;

          const newStudent = new Student({
            name: name,
            registrationNo: uniqueRegistration,
            rollNo: rollNo,
            phoneNo: phoneNo,
            courseFee: courseFee,
            semesterFee: semesterFee,
            departmentId: departmentId,
            batchId: batchId,
            scholarship: scholarshipAmount,
            scholarshipAmount: scholarshipAmount,
          });

          const newUser = new User({
            email: email,
            password: hashedPassword,
            role: "student",
          });

          const emailSent = await mail(email, password);

          if (emailSent) {
            await newStudent.save();
            await newUser.save();
            return res
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
        .populate({
          path: "batchId",
          populate: {
            path: "sessionId",
            model: "Session",
          },
        })
        .populate("departmentId");
      res.json(data);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving students.",
    });
  }
};

export const getStudentByKeyword = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const students = await Student.find({
      $or: [
        { registrationNo: new RegExp(searchTerm, "i") },
        { batchNo: new RegExp(searchTerm, "i") },
      ],
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
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
      const data = await Student.findById(id)
        .populate({
          path: "batchId",
          populate: {
            path: "sessionId",
            model: "Session",
          },
        })
        .populate("departmentId");
      if (!data) {
        return res
          .status(404)
          .json({ message: `Not found Student with id ${id}` });
      } else {
        return res.json(data);
      }
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error retrieving Student with id=" + id });
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
      message: `Error updating Student with id= ${id}`,
    });
  }
};

export const remove = async (req, res) => {
  const id = req.params.studentId;

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to delete this student.",
      });
    } else {
      const data = await Student.findByIdAndDelete(id);
      if (!data) {
        return res.status(404).json({
          message: `Cannot delete Student with id=${id}. Maybe Student was not found!`,
        });
      } else {
        res.json({ message: "Student was deleted successfully!" });
      }
    }
  } catch (err) {
    return res.status(500).json({
      message: `Could not delete Student with id ${id}`,
    });
  }
};
