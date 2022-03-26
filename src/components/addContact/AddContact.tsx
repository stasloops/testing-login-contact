import React, { FC } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import validationSchema from './validation'
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import { getContact } from '../../store/reducer/contactReducer/contactReducer';
import { useHistory } from 'react-router-dom';


type Inputs = {
  firstName: string,
  lastName: string
};

const AddContact:FC = () => {
    const dispatch = useDispatch()
    const navigate = useHistory()
    const onAdd = () => {
        navigate.push("/");
      }

    const {
        register,
        handleSubmit,
        formState: {
          errors,
          isValid
        }
      } = useForm<Inputs>({mode: 'onChange', resolver: yupResolver(validationSchema)})
    
      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const newData = {
            data,
            id: Date.now()
        }
        dispatch(getContact(newData))
        return (isValid === true ? onAdd() : null)
      }
  
      return (
      <main className='registration'>
        <form className='registration__form' onSubmit={handleSubmit(onSubmit)}>
          <h2>ADD CONTACT</h2>
        
            <h5 className='registration__value'>FirstName:</h5>
            <input className='registration__input' {...register("firstName")}/> 
            <div className='registration__error'>{errors?.firstName?.message}</div>
        
            <h5 className='registration__value'>LastName:</h5>
            <input className='registration__input' {...register("lastName")}/> 
            <div className='registration__error'>{errors?.lastName?.message}</div>
          
           <button className='registration__submit' type="submit">ADD</button>
        </form>
      </main>
    )
}

export default AddContact