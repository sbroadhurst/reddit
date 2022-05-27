import { useRouter } from 'next/router'
import React from 'react'
import Feed from '../../components/Feed'
import PostBox from '../../components/PostBox'
import UserAvatar from '../../components/UserAvatar'

function Subreddit() {
  const {
    query: { topic },
  } = useRouter()
  return (
    <div className={`h-24 bg-red-400 p-8`}>
      <div className="-mx-8 mt-10 bg-white dark:bg-zinc-900">
        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
          <div className="-mt-10">
            <UserAvatar seed={topic as string} diameter={50} />
          </div>

          <div className="py-2">
            <h1 className="text-3xl font-semibold">
              Welcome to the r/{topic} subreddit
            </h1>
            <p className="text-sm text-gray-400">r/{topic}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-5xl pb-10">
        <PostBox subreddit={topic as string} />
        <Feed topic={topic as string} />
      </div>
    </div>
  )
}

export default Subreddit
