import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";
import { useStoreActions } from "easy-peasy";
import Button from "../../../component/atoms/Button";
import { FormErrorMessage, FormControl, useToast } from "@chakra-ui/core";

const Login = () => {
  const history = useHistory();
  const toast = useToast();
  const [submit, setSubmit] = useState(false);
  const { register, errors, handleSubmit } = useForm();

  const isAuth = useStoreActions((actions) => actions.operator.setCurrentOperator);

  const isLogin = async (data2, e) => {
    setSubmit(true);
    const loginData = { email: data2.emailInput, password: data2.passwordInput };
    try {
      const res = await axios.post("https://ancient-spire-87228.herokuapp.com/api/operator/login", loginData);
      console.log(loginData);
      const data = await res;
      console.log(data);
      setSubmit(false);
      isAuth(true);
      Cookie.set("token", data.data.accessToken);
      toast({
        title: "Sign In successfuly",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      e.target.reset();
      history.push("/Dashboard");
    }
    catch {
      setSubmit(false);
      toast({
        title: "Sign In Failed",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <p className="auth-title">Welcome</p>
        <form onSubmit={handleSubmit(isLogin)}>
          <FormControl isInvalid={errors.emailInput}>
            <input
              className="input"
              id="email"
              placeholder="Email"
              type="text"
              name="emailInput"
              ref={register({
                required: true,
                pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            <FormErrorMessage>
              {errors.emailInput?.type === "required" && "Email required"}
              {errors.emailInput?.type === "pattern" &&
                "Your input must be an email"}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.passwordInput}>
            <input
              className="input"
              id="password"
              placeholder="Password"
              type="password"
              name="passwordInput"
              ref={register({
                required: true,
              })}
            />
            <FormErrorMessage>
              {errors.passwordInput?.type === "required" &&
                "Password Required"}
            </FormErrorMessage>
          </FormControl>
          <div className="auth-button">
            <Button type="submit"
              title="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
