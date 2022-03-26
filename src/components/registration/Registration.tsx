import React, { FC, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import validationSchema from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { useHistory } from 'react-router-dom';

type Inputs = {
  firstName: string,
  lastName: string,
  email: string,
  password: string
};

const Registration:FC = () => {
  const auth = useAuth()
  const navigate = useHistory()

  const onRegistration = () => {
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
  } = useForm<Inputs>({mode: 'onBlur', resolver: yupResolver(validationSchema)})

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await api.auth.registration(data);
      const { data: loginData } = await api.auth.login(data);
      auth.setToken(loginData.token)
      auth.setUser(loginData.user);
      return (isValid === true ? onRegistration() : null)
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
  }

  return (
  <main className='registration'>
    
    <form className='registration__form' onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new account</h2>
        <h5 className='registration__value'>FirstName:</h5>
        <input className='registration__input' {...register("firstName")}/> 
        <div className='registration__error'>{errors.firstName?.message}</div>
    
        <h5 className='registration__value'>LastName:</h5>
        <input className='registration__input' {...register("lastName")}/> 
        <div className='registration__error'>{errors.lastName?.message}</div>
     
        <h5 className='registration__value'>Email:</h5>
        <input className='registration__input' {...register("email")}/> 
        <div className='registration__error'>{errors?.email?.message}</div>
    
        <h5 className='registration__value'>Password:</h5>
        <input className='registration__input' {...register("password")}/> 
        <div className='registration__error'>{errors?.password?.message}</div>
      
      <button className='registration__submit' type="submit">REGISTRATION</button>
    </form>
  </main>
  )
}

export default Registration