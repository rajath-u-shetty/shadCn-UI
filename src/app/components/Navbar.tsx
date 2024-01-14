
import React from 'react'
import { Button, buttonVariants } from "@/components/ui/button"
import Link from 'next/link'
import { HandMetal } from 'lucide-react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UserAccountnav from './UserAccountnav';


export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='container text-black flex items-center justify-between'>
        <Link href='/'>
          <HandMetal />
        </Link>
        {/* <Link href='/sign-up' className={buttonVariants()}>Sign in</Link> */}
        {session?.user ? (
          <UserAccountnav />
        ) : (
          <Link className={buttonVariants()} href="/sign-in">Sign in</Link>
        )}
      </div>
    </div>
  )
}
