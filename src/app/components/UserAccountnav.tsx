'use client'

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

const UserAccountnav = () => {
  return (
    <Button onClick={()=> signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/sign-in`
    })} value="destructive">Sign Out</Button>
  )
}

export default UserAccountnav
