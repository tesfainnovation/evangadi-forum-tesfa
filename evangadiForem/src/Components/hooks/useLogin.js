import { useState } from "react";
import api from "../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [color, setColor] = useState("gray");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !pass) {
      setColor("red");
      setText("All Fields Are Required");
      return;
    }
    try {
      const { data } = await api.post("/user/login", {
        email: email,
        pass: pass,
      });
      toast.success("Successfully Logged In");
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      setColor("red");
      setText(error?.response?.data.msg || "An error occurred");
    }
  };

  return {
    email,
    setEmail,
    pass,
    setPass,
    color,
    text,
    handleLogin,
  };
}
