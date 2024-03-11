import Session from "../models/Session.js";

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

export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    return res.status(200).json(sessions);
  } catch (error) {
    return res.statu(500).json({ message: error.message });
  }
};

export const getSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    if (req.user.role === "admin") {
      const session = await Session.findById(sessionId);
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

export const updateSession = async (req, res) => {
  const { sessionId } = req.params;
  const { session } = req.body;
  try {
    if (req.user.role === "admin") {
      const updatedSession = await Session.findByIdAndUpdate(
        sessionId,
        { session },
        { new: true }
      );
      if (updatedSession) {
        return res
          .status(200)
          .json({ message: "Session updated successfully" });
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
