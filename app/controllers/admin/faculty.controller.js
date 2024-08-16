import Faculty from "../../models/Faculty.js";

export const createFaculty = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { name } = req.body;
      const isFacultyExist = await Faculty.findOne({ name });
      if (isFacultyExist) {
        return res.status(400).json({ message: "Faculty already exists" });
      } else {
        const newFaculty = new Faculty({ name });
        await newFaculty.save();
        return res
          .status(201)
          .json({ message: "Faculty created successfully" });
      }
    } else {
      return res.status(403).json({ message: "You are not authorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    return res.status(200).json(faculties);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFaculty = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const faculty = await Faculty.findById(facultyId);
    return res.status(200).json(faculty);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateFaculty = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { facultyId } = req.params;
      const { name } = req.body;
      const isFacultyExist = await Faculty.findById(facultyId);
      if (!isFacultyExist) {
        return res.status(400).json({ message: "Faculty does not exist" });
      } else {
        await Faculty.findByIdAndUpdate(facultyId, { name });
        return res
          .status(200)
          .json({ message: "Faculty updated successfully" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteFaculty = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { facultyId } = req.params;
      const isFacultyExist = await Faculty.findById(facultyId);
      if (!isFacultyExist) {
        return res.status(400).json({ message: "Faculty does not exist" });
      } else {
        await Faculty.findByIdAndDelete(facultyId);
        return res
          .status(200)
          .json({ message: "Faculty deleted successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
