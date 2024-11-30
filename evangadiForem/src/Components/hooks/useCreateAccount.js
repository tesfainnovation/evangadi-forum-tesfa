import { useState } from "react";
import api from "../../axios";
import { toast } from "react-toastify";

export default function useCreateAccount() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errColor, setErrColor] = useState("gray");
  const [errText, setErrorText] = useState("");

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (!lname || !user || !fname || !email || !pass) {
      setErrColor("red");
      setErrorText("All Fields Are Required.");
      return;
    }

    try {
      await api.post("/user/register", {
        username: user,
        fname: fname,
        lname: lname,
        email: email,
        pass: pass,
      });
      toast.success("Account Created Successfully!");
    } catch (error) {
      setErrColor("red");
      setErrorText(error?.response?.data.msg || "An error occurred");
    }
  };

  return {
    fname,
    setFname,
    lname,
    setLname,
    email,
    setEmail,
    user,
    setUser,
    pass,
    setPass,
    errColor,
    errText,
    handleCreateAccount,
  };
}
