import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import authenticateToken from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    res.json({
      message: "Benutzerprofil",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Fehler beim Abrufen des Benutzerprofils:", error);
    res
      .status(500)
      .json({ message: "Serverfehler beim Abrufen des Benutzerprofils" });
  }
});

router.put("/changePassword", authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden." });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Aktuelles Passwort ist falsch." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Passwort erfolgreich geändert." });
  } catch (error) {
    console.error("Fehler beim Ändern des Passworts:", error);
    res.status(500).json({ message: "Serverfehler" });
  }
});

router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { company, companyProfile, corporateGoals, username, email } =
      req.body;
    const updateData = {
      company,
      companyProfile,
      corporateGoals,
      username,
      email,
    };

    const user = await User.findByIdAndUpdate(req.user.userId, updateData, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden." });
    }

    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      company: user.company,
      companyProfile: user.companyProfile,
      corporateGoals: user.corporateGoals,
    };

    res.json({
      message: "Profil erfolgreich aktualisiert",
      user: userResponse,
    });
  } catch (error) {
    console.error("Fehler bei der Profilaktualisierung:", error);
    res
      .status(500)
      .json({ message: "Serverfehler bei der Profilaktualisierung" });
  }
});

export default router;
