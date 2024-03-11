import Teacher from "../models/Teacher.js";
import Faculty from "../models/Faculty.js";
import Department from "../models/Department.js";

export const createTeacher = async (req, res) => {
  const { name, phone, email, facultyId, departmentId, designation, status } =
    req.body;
  try {
    if (!name || !phone || !email || !facultyId || !departmentId) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      const faculty = await Faculty.findById(facultyId);
      if (!faculty) {
        return res.status(404).json({ message: "Faculty not found" });
      } else {
        const department = await Department.findById(departmentId);
        if (!department) {
          return res.status(404).json({ message: "Department not found" });
        } else {
          const teacher = new Teacher({
            name,
            phone,
            email,
            facultyId,
            departmentId,
            designation,
            status,
          });
          await teacher.save();
          return res.status(201).json({
            message: "Teacher created successfully",
            teacher,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate("facultyId", "name")
      .populate("departmentId", "shortName");
    return res.status(200).json({ teachers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getTeacher = async (req, res) => {
  const { teacherId } = req.params;
  try {
    const teacher = await Teacher.findById(teacherId)
      .populate("facultyId", "name")
      .populate("departmentId", "shortName");
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    } else {
      return res.status(200).json({ teacher });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  const { teacherId } = req.params;
  const { name, phone, email, facultyId, departmentId, designation, status } =
    req.body;
  try {
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    } else {
      const department = await Department.findById(departmentId);
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      } else {
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
          return res.status(404).json({ message: "Teacher not found" });
        } else {
          const updaatedTeacher = await Teacher.findByIdAndUpdate(teacherId, {
            name,
            phone,
            email,
            facultyId,
            departmentId,
            designation,
            status,
          });
          return res.status(200).json({
            message: "Teacher updated successfully",
            teacher: updaatedTeacher,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  const { teacherId } = req.params;
  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    } else {
      await Teacher.findByIdAndDelete(teacherId);
      return res.status(200).json({ message: "Teacher deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
