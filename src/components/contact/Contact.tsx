import React, { FC } from 'react'
import useAuth from '../../hooks/useAuth'

const Contact:FC = () => {
  const auth = useAuth()

  return (<>
   {auth.isLoaded &&
      (auth.user ? 
        (
          <div>Contact</div>
        ) 
        : 
        (
          <div>Зарегестрируйтесь</div>
        )
    )}
  </>)
}

export default Contact