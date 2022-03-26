import React, { FC, useEffect, useCallback } from 'react'
import { useForm } from "react-hook-form";
import validationSchema from './validation'
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from '../../hooks/useAuth'
import api from "../../services/api";
import { useHistory } from 'react-router-dom';


const Profile:FC = () => {
    const auth = useAuth();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
      } = useForm({resolver: yupResolver(validationSchema)});
    
      const onSubmit = async (data: object) => {
        try {
          const { data: user } = await api.auth.updateProfile(data);
    
          auth.setUser(user);
        } catch (e: any) {
          if (e.response.status === 422) {
            Object.keys(e.response.data.errors).forEach((key) => {
              setError(key, {
                type: "manual",
                message: e.response.data.errors[key],
              });
            });
          }
        }
      };
      
    
      const loadData = useCallback(async () => {
        const { data } = await api.auth.getProfile();
    
        reset({
          firstName: data.firstName,
          lastName: data.lastName,
        });
      }, [reset]);
    
      useEffect(() => {
        loadData();
      }, [loadData]);
    
  return (
    <main className='registration'>
    <form className='registration__form' onSubmit={handleSubmit(onSubmit)}>
      <h2>Profile</h2>
    
        <h5 className='registration__value'>FirstName:</h5>
        <input className='registration__input' {...register("firstName")}/> 
        <div className='registration__error'>{errors?.firstName?.message}</div>
    
        <h5 className='registration__value'>LastName:</h5>
        <input className='registration__input' {...register("lastName")}/> 
        <div className='registration__error'>{errors?.lastName?.message}</div>
      
       <button className='registration__submit' type="submit">UPDATE</button>
    </form>
  </main>
  )
}

export default Profile