import { useState, useEffect } from "react";
import {
  getCurrentUser,
  updatePassword,
  updateProfile,
} from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProfileForm() {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    companyProfile: "",
    corporateGoals: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    const fetchCurrentUserDetails = async () => {
      try {
        const user = await getCurrentUser();
        setFormData((prev) => ({
          ...prev,
          company: user.company || "",
          companyProfile: user.companyProfile || "",
          corporateGoals: user.corporateGoals || "",
          username: user.username,
          email: user.email,
        }));
      } catch (error) {
        toast.error("Failed to fetch user details.");
      }
    };

    fetchCurrentUserDetails();
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitProfile = async (e) => {
    e.preventDefault();
    const { company, companyProfile, corporateGoals, username, email } =
      formData;

    try {
      const updateData = {
        company,
        companyProfile,
        corporateGoals,
        username,
        email,
      };
      await updateProfile(updateData);
      toast.success("Profile successfully updated!");
      setCurrentUser({ ...currentUser, ...updateData });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Error updating profile");
    }
  };

  const onChangePassword = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await updatePassword(formData.currentPassword, formData.newPassword);
      toast.success("Password successfully updated!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Error updating password");
    }
  };

  return (
    <>
      <Form onSubmit={onSubmitProfile}>
        <FormRow label="Branchenzugehörigkeit">
          <Input
            type="text"
            name="company"
            value={formData.company}
            onChange={onChange}
            required
            placeholder="In welcher Branche sind Sie tätig?"
          />
        </FormRow>
        <FormRow label="Unternehmen">
          <Input
            type="text"
            name="companyProfile"
            value={formData.companyProfile}
            onChange={onChange}
            required
            placeholder="Wie ist der Name Ihres Unternehmens?"
          />
        </FormRow>
        <FormRow label="Interessengebiet">
          <Input
            type="text"
            name="corporateGoals"
            value={formData.corporateGoals}
            onChange={onChange}
            required
            placeholder="Welche Interessen/Themen verfolgen Sie?"
          />
        </FormRow>
        <FormRow label="Benutzername">
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={onChange}
            required
          />
        </FormRow>
        <FormRow label="Email address">
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </FormRow>
        <Button type="submit">Update Account</Button>
      </Form>
      <Form onSubmit={onChangePassword}>
        {/* Password change form */}
        <FormRow label="Aktuelles Passwort">
          <Input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={onChange}
            required
            placeholder="Ihr aktuell zugewiesenes Benutzerpasswort."
          />
        </FormRow>
        <FormRow label="Neues Passwort (min. 8 Zeichen)">
          <Input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={onChange}
            required
            placeholder="Bitte vergeben Sie ihr persönliches Passwort."
          />
        </FormRow>
        <FormRow label="Bestätigung neues Passwort">
          <Input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={onChange}
            required
            placeholder="Bitte wiederholen Sie ihr persönliches Passwort."
          />
        </FormRow>
        <Button type="submit">Change Password</Button>
      </Form>
    </>
  );
}

export default ProfileForm;
