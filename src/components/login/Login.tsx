import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import validationSchema from './validation'
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { useHistory } from 'react-router-dom';

type Inputs = {
  email: string,
  password: string
};

const Login = () => {
  const auth = useAuth();
  const navigate = useHistory()

  const onLogin = () => {
    navigate.push("/");
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isValid
    }
  } = useForm<Inputs>({mode: 'onBlur' ,resolver: yupResolver(validationSchema)})

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { data: loginData } = await api.auth.login(data);
      auth.setToken(loginData.token);
      auth.setUser(loginData.user);
      return (isValid === true ? onLogin() : null)
    } catch (e: any) {
      if (e.response.status === 422) {
        Object.keys(e.response.data.errors).forEach((key: any) => {
          setError(key, {
            type: "manual",
            message: e.response.data.errors[key],
          });
        });
      }
    } 
  };

  return (
  <main className='registration'>
    <form className='registration__form' onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
    
        <h5 className='registration__value'>Email:</h5>
        <input className='registration__input' {...register("email")}/> 
        <div className='registration__error'>{errors?.email?.message}</div>
    
        <h5 className='registration__value'>Password:</h5>
        <input className='registration__input' {...register("password")}/> 
        <div className='registration__error'>{errors?.password?.message}</div>
      
       <input className='registration__submit' type="submit"/>
    </form>
  </main>
  )
}

export default Login