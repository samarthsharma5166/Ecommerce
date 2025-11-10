import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { toast } from "sonner";


const initialState = { userName: "", email: "", password: "" };

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, message } = useSelector((state) => state.auth);

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    const data = result?.payload;

    if (data?.success) {
      toast.success(data.message); 
      navigate("/auth/login");
    } else {
      alert(data?.message || "Registration failed");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create New Account</h1>
        <p>
          Already have an account?
          <Link className="text-blue-600 px-2" to="/auth/login">
            Login
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={registerFormControls}
        buttonText={isLoading ? "Signing Up..." : "Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

      {error && <p className="text-red-500 text-center">{error}</p>}
      {message && <p className="text-green-600 text-center">{message}</p>}
    </div>
  );
}

export default AuthRegister;
