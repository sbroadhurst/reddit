import { Avatar } from '@mui/material'
import { useSession } from 'next-auth/react'
import React from 'react'
import UserAvatar from './UserAvatar'

function PostBox() {
  const { data: session } = useSession()
  return (
    <form>
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <UserAvatar />
        <input
          disabled={!session}
          className="flex-1 rounded-md p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session ? 'Create a post by entering a title' : 'Sign in to post'
          }
        />
      </div>
    </form>
  )
}

export default PostBox
