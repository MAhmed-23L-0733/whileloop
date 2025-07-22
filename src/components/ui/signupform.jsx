"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(null);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmpassword: formData.get("confirmpassword"),
    };

    if (data.password !== data.confirmpassword) {
      setErrors("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.error) {
        setSuccess(true);
        router.push("/signin");
      } else {
        setErrors(result.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      setErrors("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <StyledWrapper>
      <form className="container" onSubmit={handleSubmit}>
        <div className="card p-10">
          <a className="login">Signup</a>
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              Registration successful! Redirecting to login...
            </div>
          )}
          {errors && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors}
            </div>
          )}
          <div className="inputBox">
            <input
              type="text"
              required="required"
              name="name"
              disabled={isLoading}
            />
            <span className="user">Full Name</span>
          </div>
          <div className="inputBox">
            <input
              type="email"
              required="required"
              name="email"
              disabled={isLoading}
            />
            <span className="user">Email</span>
          </div>
          <div className="inputBox">
            <input
              type="password"
              required="required"
              name="password"
              disabled={isLoading}
            />
            <span>Password</span>
          </div>
          <div className="inputBox">
            <input
              type="password"
              required="required"
              name="confirmpassword"
              disabled={isLoading}
            />
            <span>Confirm Password</span>
          </div>
          <button className="enter" type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating account...
              </div>
            ) : (
              "Signup"
            )}
          </button>
          <p className="font-mono">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-700">
              Signin
            </Link>
          </p>
        </div>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .login {
    color: #000;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: block;
    font-weight: bold;
    font-size: x-large;
  }

  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 35px;
    background: #e3e3e3;
    border-radius: 8px;
  }

  .inputBox {
    position: relative;
    width: 250px;
  }

  .inputBox input {
    width: 100%;
    padding: 10px;
    outline: none;
    border: none;
    color: #000;
    font-size: 1em;
    background: transparent;
    border-left: 2px solid #000;
    border-bottom: 2px solid #000;
    transition: 0.1s;
    border-bottom-left-radius: 8px;
  }

  .inputBox span {
    margin-top: 5px;
    position: absolute;
    left: 0;
    transform: translateY(-4px);
    margin-left: 10px;
    padding: 10px;
    pointer-events: none;
    font-size: 12px;
    color: #000;
    text-transform: uppercase;
    transition: 0.5s;
    letter-spacing: 3px;
    border-radius: 8px;
  }

  .inputBox input:valid ~ span,
  .inputBox input:focus ~ span {
    transform: translateX(113px) translateY(-15px);
    font-size: 0.6em;
    padding: 5px 10px;
    background: #000;
    letter-spacing: 0.2em;
    color: #fff;
    border: 2px;
  }

  .inputBox input:valid,
  .inputBox input:focus {
    border: 2px solid #000;
    border-radius: 8px;
  }

  .enter {
    height: 45px;
    width: 250px;
    border-radius: 5px;
    border: 2px solid #000;
    cursor: pointer;
    background-color: transparent;
    transition: 0.5s;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 2px;
    margin-bottom: 1em;
  }

  .enter:hover {
    background-color: rgb(0, 0, 0);
    color: white;
  }
`;

export default Form;
