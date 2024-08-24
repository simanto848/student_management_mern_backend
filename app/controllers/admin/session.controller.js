import Session from "../../models/Session.js";
import Batch from "../../models/Batch.js";

export const createSession = async (req, res) => {
  const { session } = req.body;
  try {
    if (req.user.role === "admin") {
      const isSessionExist = await Session.findOne({ session });
      if (isSessionExist) {
        return res.status(400).json({ message: "Session already exists" });
      } else {
        const newSession = new Session({ session });
        await newSession.save();
        return res
          .status(201)
          .json({ message: "Session created successfully" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllSession = async (req, res) => {
  try {
    const sessions = await Session.find();
    return res.status(200).json(sessions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSessionById = async (req, res) => {
  const { sessionId } = req.params;
  try {
    if (req.user.role === "admin") {
      const session = await Session.findById(sessionId).populate(
        "batcheIds",
        "name"
      );
      if (session) {
        return res.status(200).json(session);
      } else {
        return res.status(404).json({ message: "Session not found" });
      }
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSessionByName = async (req, res) => {
  const { session } = req.body;
  try {
    const sessionData = await Session.findOne({ session });
    if (sessionData) {
      return res.status(200).json({ session: sessionData });
    } else {
      return res.status(404).json({ message: "Session not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSessionBatches = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    } else {
      const batches = await Batch.find({ sessionId });
      return res.status(200).json(batches);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSession = async (req, res) => {
  const { sessionId } = req.params;
  const { session, batchIds } = req.body;
  try {
    if (req.user.role === "admin") {
      const isSessionExist = await Session.findById(sessionId);
      if (isSessionExist) {
        const updateSession = await Session.findByIdAndUpdate(
          sessionId,
          {
            session,
            batcheIds: batchIds,
          },
          { new: true }
        );

        if (updateSession) {
          return res
            .status(200)
            .json({ message: "Session updated successfully", updateSession });
        } else {
          return res.status(404).json({ message: "Failed to update session!" });
        }
      } else {
        return res.status(404).json({ message: "Session not found" });
      }
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    if (req.user.role === "admin") {
      const deletedSession = await Session.findByIdAndDelete(sessionId);
      if (deletedSession) {
        return res
          .status(200)
          .json({ message: "Session deleted successfully" });
      } else {
        return res.status(404).json({ message: "Session not found" });
      }
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
