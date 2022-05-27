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
        <Avatar sx={{ width: diameter, height: diameter }}>
          {session.user?.image && !seed
            ? session.user.image
            : session.user?.name && !seed
            ? session.user.name.charAt(0).toUpperCase()
            : seed}
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
