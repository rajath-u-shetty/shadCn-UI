import { Button } from '@/components/ui/button'
import React, { FC, ReactNode } from 'react'

interface GoogleSignInButtonProps{
    children: ReactNode
}

const GoogleSignIn: FC<GoogleSignInButtonProps> = ({children}) => {

    const loginWithGoogle = () => {
        console.log("Login With Google");
    }
  return (
    <div>
      <Button className="w-full mt-6" onClick={loginWithGoogle}>{children}</Button>
    </div>
  )
}

export default GoogleSignIn;
