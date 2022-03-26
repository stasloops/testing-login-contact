import React, { FC } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import validationSchema from './validation'
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import { filterContact } from '../../store/reducer/contactReducer/contactReducer';
import { useHistory } from 'react-router-dom';

type Inputs = {
  firstName: string,
  lastName: string
};

interface ContactProfileProps {
  contact: any
}

const ContactProfile:FC<ContactProfileProps> = ({contact}) => {
  const dispatch = useDispatch()
  const navigate = useHistory()
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid
    }
  } = useForm<Inputs>({mode: 'onBlur', resolver: yupResolver(validationSchema)})

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    contact.data.firstName = data.firstName
    contact.data.lastName = data.lastName
    return (isValid === true ? navigate.push('/') : null)
  }
  
  const deleteContact = () => {
    dispatch(filterContact(contact.id))
    navigate.push('/')
  }

  return (
  <main className='registration'>
    <form className='registration__form' onSubmit={handleSubmit(onSubmit)}>
      <h2>Profile</h2>
    
        <h5 className='registration__value'>FirstName:</h5>
        <input className='registration__input' defaultValue={contact.data.firstName} {...register("firstName")}/> 
        <div className='registration__error'>{errors?.firstName?.message}</div>
    
        <h5 className='registration__value'>LastName:</h5>
        <input className='registration__input' defaultValue={contact.data.lastName} {...register("lastName")}/> 
        <div className='registration__error'>{errors?.lastName?.message}</div>
      
       <button className='registration__submit' type="submit">UPDATE</button>
       <button className='registration__delete' onClick={deleteContact}>DELETE</button>
    </form>
  </main>
  )
}

export default ContactProfile;