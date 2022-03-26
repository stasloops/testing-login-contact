import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/hooks/useTypedSelector'
import useAuth from '../../hooks/useAuth'
import './Contact.scss'

const Contact:FC = () => {
  const auth = useAuth()
  const {contact} = useTypedSelector(state => state.contact)

  useEffect(() => {
    console.log(contact);
  }, [contact])
  const CONTACT = [
    {id: 1, firstName: "Стас", lastName: "Ябанжи"},
    {id: 2, firstName: "Петя", lastName: "Ябанжи"},
    {id: 3, firstName: "Коля", lastName: "Нару"},
    {id: 4, firstName: "Стас", lastName: "Иванов"},
    {id: 5, firstName: "Вася", lastName: "Савельев"},
    {id: 6, firstName: "Олег", lastName: "Агзамов"},
  ]
  return (<>
   {auth.isLoaded &&
      (auth.user ? 
        (
          <div className='contact'>
            <div className='contact__inner'>
              <div className='contact__top'>
                <h1 className='contact__title'>
                  Contact
                </h1>
                <Link className='contact__add' to="add">
                  <span>+</span>
                </Link>
              </div>
              <div className='contact__bottom'>
                <div className='contact__items'>
                  {
                  contact.map((item) => (
                    <Link key={item.id} to={`/profile/${item.id}`}>
                      <div className='contact__item'>
                        <h2 className='contact__item-name'>{item.data.firstName} {item.data.lastName}</h2>
                      </div>
                    </Link>
                  ))
                  }
                </div>
              </div>
            </div>
          </div>
        ) 
        : 
        (
          <div>Зарегестрируйтесь</div>
        )
    )}
  </>)
}

export default Contact