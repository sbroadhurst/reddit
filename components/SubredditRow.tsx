import { ChevronUpIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React from 'react'
import UserAvatar from './UserAvatar'

type Props = {
  topic: string
  index: number
}

function SubredditRow({ index, topic }: Props) {
  return (
    <div className="flex items-center space-x-2 border-t px-4 py-2 last:rounded-b">
      <p>{index + 1}</p>
      <ChevronUpIcon className="flex-shrik-0 h-4 w-4 text-green-400" />
      <UserAvatar seed="S" diameter={20} />
      <p className="flex-1 truncate">r/{topic}</p>
      <Link href={`/subreddit/${topic}`}>
        <div className="cursor-pointer rounded-full bg-blue-500 px-3 text-white">
          View
        </div>
      </Link>
    </div>
  )
}

export default SubredditRow
