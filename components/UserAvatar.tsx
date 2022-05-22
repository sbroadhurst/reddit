import { useSession } from 'next-auth/react'
import React from 'react'
import Avatar from '@mui/material/Avatar'
import { UserIcon } from '@heroicons/react/solid'

type Props = {
  seed?: string
  large?: boolean
}

function UserAvatar({ seed, large }: Props) {
  const { data: session } = useSession()
  return (
    <div>
      {session ? (
        <Avatar sx={{ width: large ? 32 : 20, height: large ? 32 : 20 }}>
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
