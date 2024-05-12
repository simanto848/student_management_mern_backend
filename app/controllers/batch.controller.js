import Batch from "../models/Batch.js";

// Create and Save a new Batch
export const create = async (req, res) => {
  try {
    const { name, departmentId, sessionId } = req.body;

    // Validate request
    if (!name || !departmentId || !sessionId) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this page!" });
    } else {
      // Check if batch already exists
      const isBatchExists = await Batch.findOne({ name });
      if (isBatchExists) {
        return res.status(400).json({ message: "Batch already exists!" });
      } else {
        // Create a Batch
        const batch = new Batch({
          name,
          departmentId,
          sessionId,
        });

        // Save Batch in the database
        await batch.save();
        return res.status(201).json({ message: "Batch created successfully!" });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred while creating the Batch.",
    });
  }
};

// Retrieve and return all batches from the database.
export const findAll = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this page!" });
    } else {
      const batches = await Batch.find().populate(
        "departmentId sessionId",
        "shortName session"
      );
      const modifiedBatches = batches.map((batch) => ({
        ...batch._doc,
        departmentName: batch.departmentId.shortName,
        session: batch.sessionId.session,
      }));
      return res.status(200).json(modifiedBatches);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred while retrieving batches.",
    });
  }
};

// Find one batch by id
export const findOne = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this page!" });
    } else {
      const id = req.params.batchId;
      const batch = await Batch.findById(id);
      if (!batch) {
        return res.status(404).json({ message: "Batch not found" });
      }
      return res.status(200).json(batch);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred while retrieving batch.",
    });
  }
};

// Update a batch identified by the batchId in the request
export const update = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this page!" });
    } else {
      const id = req.params.batchId;
      const { name, departmentId, sessionId } = req.body;

      // Validate Request
      if (!name || !departmentId || !sessionId) {
        return res.status(400).json({ message: "All fields are required!" });
      }

      const batch = await Batch.findByIdAndUpdate(id, {
        name,
        departmentId,
        sessionId,
      });

      if (!batch) {
        return res.status(404).json({ message: "Batch not found" });
      }
      return res.status(200).json({ message: "Batch updated successfully!" });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred while updating the Batch.",
    });
  }
};

// Delete a batch with the specified batchId in the request
export const remove = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this page!" });
    } else {
      const id = req.params.batchId;
      const batch = await Batch.findByIdAndDelete(id);
      if (!batch) {
        return res.status(404).json({ message: "Batch not found" });
      }
      return res.status(200).json({ message: "Batch deleted successfully!" });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Some error occurred while deleting the Batch.",
    });
  }
};
