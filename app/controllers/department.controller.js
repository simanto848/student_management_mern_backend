import Department from "../models/Department.js";
import Faculty from "../models/Faculty.js";

// problem with the code
export const createDepartment = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { facultyId, shortName } = req.body;
      const isFacultyExist = await Faculty.findOne({ _id: facultyId });
      if (!isFacultyExist) {
        return res.status(404).json({ message: "Faculty not found" });
      } else {
        const isDepartmentExist = await Department.findOne({
          shortName: shortName,
        });
        if (isDepartmentExist) {
          return res.status(400).json({ message: "Department already exists" });
        } else {
          const department = new Department({
            shortName: shortName,
            facultyId: facultyId,
          });
          await department.save();
          return res
            .status(201)
            .json({ message: "Department added successfully" });
        }
      }
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      return res.status(400).json({
        message: "Department with the same short name already exists",
      });
    }
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred while adding the department" });
  }
};

export const getDepartments = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const departments = await Department.find().populate("facultyId", "name");
      return res.status(200).json(departments);
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getDepartment = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { departmentId } = req.params;
      const department = await Department.findById(departmentId);
      if (department) {
        return res.status(200).json(department);
      } else {
        return res.status(404).json({ message: "Department not found" });
      }
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getDepartmentsByFaculty = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { facultyId } = req.params;
      const departments = await Department.find({ facultyId });
      return res.status(200).json(departments);
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { departmentId } = req.params;
      const { shortName, facultyId } = req.body;
      const department = await Department.findById(departmentId);
      if (department) {
        await Department.findByIdAndUpdate(departmentId, {
          shortName,
          facultyId,
        });
        return res
          .status(200)
          .json({ message: "Department updated successfully" });
      } else {
        return res.status(404).json({ message: "Department not found" });
      }
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { departmentId } = req.params;
      const department = await Department.findById(departmentId);
      if (department) {
        await Department.findByIdAndDelete(departmentId);
        return res
          .status(200)
          .json({ message: "Department deleted successfully" });
      } else {
        return res.status(404).json({ message: "Department not found" });
      }
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
