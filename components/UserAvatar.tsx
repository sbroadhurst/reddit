import { useSession } from 'next-auth/react'
import React from 'react'
import Avatar from '@mui/material/Avatar'
import { UserIcon } from '@heroicons/react/solid'

type Props = {
  seed?: string
  diameter: number
}

function UserAvatar({ seed, diameter }: Props) {
  const { data: session } = useSession()
  return (
    <div>
      {session ? (
        <Avatar
          sx={{ width: diameter, height: diameter }}
          className="bg-gradient-to-r from-[#FF4500] to-[#ff440087]"
        >
          {session.user?.image && !seed ? (
            <img src={session.user.image} alt="profile" />
          ) : session.user?.name && !seed ? (
            session.user.name.charAt(0).toUpperCase()
          ) : (
            seed?.charAt(0).toUpperCase()
          )}
        </Avatar>
      ) : (
        <Avatar sx={{ width: 32, height: 32 }}>
          <UserIcon />
        </Avatar>
      )}
    </div>
  )
}

export default UserAvatar
