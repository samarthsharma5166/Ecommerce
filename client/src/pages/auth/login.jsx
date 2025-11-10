import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { loginformControls } from "@/config";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";

const initialState = { email: "", password: "" };

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(formData));
    const data = result?.payload;

    if (data?.success) {
      alert("✅ " + data.message);
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/shop/home");
      }
    } else {
      alert(data?.message || "Login failed");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Sign in to your Account</h1>
        <p>
          Don’t have an account?
          <Link className="text-blue-600 px-2" to="/auth/register">
            Register
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={loginformControls}
        buttonText="Sign In"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
