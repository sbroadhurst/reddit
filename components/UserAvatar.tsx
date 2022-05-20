import { useSession } from 'next-auth/react'
import React from 'react'
import Avatar from '@mui/material/Avatar'
import { UserIcon } from '@heroicons/react/solid'

function UserAvatar() {
  const { data: session } = useSession()
  return (
    <div>
      {session ? (
        <Avatar sx={{ width: 32, height: 32 }}>
          {session.user?.image
            ? session.user.image
            : session.user?.name
            ? session.user.name.charAt(0).toUpperCase()
            : 'S'}
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
