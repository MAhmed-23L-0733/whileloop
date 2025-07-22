"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const Form = () => {
  const router = useRouter();
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const email = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(null);

    try {
      const result = await signIn("credentials", {
        email: email.current.value,
        password: password.current.value,
        redirect: false,
      });

      if (result?.error) {
        setErrors("Email or password is incorrect!");
      } else {
        setErrors(null);
        router.push("/");
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
          <a className="login">Log in</a>
          <div className="inputBox">
            <input type="text" required="required" name="email" ref={email} />
            <span className="user">Email</span>
          </div>
          <div className="inputBox">
            <input type="password" required="required" ref={password} />
            <span>Password</span>
          </div>
          <button className="enter" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
          {errors && <p className="text-sm text-red-600">{errors}</p>}
          <p className="font-mono">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-700">
              Signup
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
