import React, { FC } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Header.scss';
import useAuth from '../../hooks/useAuth'

const Header:FC = () => {
    const auth: any = useAuth()
    const navigate = useHistory()
    
    const onLogOut = () => {
        auth.logOut();
        navigate.push("/login");
    };

  return (
    <header className='header'>
        <div className='header__inner'>
            <div className='header__left'>
                <h2 className='header__logo'>
                    React App
                </h2>
                <Link className='header__items' to="/">
                    CONTACT
                </Link>
            </div>
            <div className='header__right'>
            {auth.isLoaded &&
                (auth.user ? 
                    (<>
                        <div className='header__items'>{auth.user.firstName} {auth.user.lastName}</div>
                        <div onClick={onLogOut} className='header__mar-30 header__items'>LOG OUT</div>
                    </>) 
                    : 
                    (<>
                        <Link className='header__items' to="/login">
                            LOGIN
                        </Link>
                        <Link className='header__mar-30 header__items' to="/registration">
                            REGISTRATION
                        </Link>
                    </>)
            )}
            </div>
        </div>
    </header>
  )
}

export default Header