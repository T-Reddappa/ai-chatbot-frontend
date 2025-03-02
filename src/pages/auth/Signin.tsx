import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router";

const Signin = () => {
  const initialFormState = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    const userInputs = { ...formData, [name]: value };
    setFormData(userInputs);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData(initialFormState);
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-[url(/ai-img.jpg)] bg-cover text-white ">
      <form
        action="submit"
        onSubmit={handleSubmit}
        className=" w-[30rem] px-5 py-10 border-gray-400 grid max-w-sm items-center gap-5 border-2 rounded-xl"
      >
        <div className="text-3xl font-bold text-center">Sign In</div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="username">Username</Label>
          <Input name="username" type="text" onChange={handleChange} />
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
            />
            <span
              className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
        </div>
        <Button type="submit" className="cursor-pointer">
          Sign In
        </Button>
        <Button
          variant="secondary"
          className="cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signin;
