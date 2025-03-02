import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";

const Signup = () => {
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
    console.log("signup");
  };
  return (
    <div className="w-full h-[100vh] flex justify-center items-center  bg-[url(/ai-img.jpg)] bg-cover text-white">
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="w-[30rem] px-5 py-10 border-2 border-gray-400 rounded-xl  grid max-w-sm items-center gap-5"
      >
        <div className="text-3xl font-bold text-center text-white">Sign Up</div>
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
              className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
        </div>
        <Button type="submit" className="cursor-pointer">
          Sign Up
        </Button>
        <Button
          variant="secondary"
          className="cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account? Sign In
        </Button>
      </form>
    </div>
  );
};

export default Signup;
