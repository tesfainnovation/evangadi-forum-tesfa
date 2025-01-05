import { useContext, useState } from "react";
import api from "../../axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { contextApi } from "../Context/Context";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [color, setColor] = useState("gray");
  const [text, setText] = useState("");
  const { handleCheck } = useContext(contextApi);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !pass) {
      setColor("red");
      setText("All Fields Are Required");
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.post("/user/login", {
        email: email,
        pass: pass,
      });
      toast.success("Successfully Logged In");
      localStorage.setItem("token", data.token);
      console.log(data);

      navigate("/home");
      window.location.reload();
    } catch (error) {
      setColor("red");
      setText(error?.response?.data.msg || "An error occurred try it again");
    } finally {
      setLoading(false);
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
    loading,
    setLoading,
    setText
  };
}
