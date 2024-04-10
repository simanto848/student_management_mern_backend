import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  const course = new Course(req.body);
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .send({ message: "You are not authorized to perform this action" });
    }
    const isCourseExist = await Course.findOne({
      $or: [{ code: course.code }, { name: course.name }],
    });
    if (isCourseExist) {
      return res.status(400).send({ message: "Course already exists" });
    } else {
      await course.save();
      return res.status(201).json({ message: "Course created successfully" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("departmentId");
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate(
      "departmentId"
    );
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getCourseByDepartment = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .send({ message: "You are not authorized to perform this action" });
    }
    const courses = await Course.find({
      departmentId: req.params.departmentId,
    });
    return res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .send({ message: "You are not authorized to perform this action" });
    }
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      {
        new: true,
      }
    );
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }
    return res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .send({ message: "You are not authorized to perform this action" });
    }
    const course = await Course.findByIdAndDelete(req.params.courseId);
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
