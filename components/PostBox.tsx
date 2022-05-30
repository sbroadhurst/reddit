import React, { useEffect, useState } from 'react'
import UserAvatar from './UserAvatar'
import { useSession } from 'next-auth/react'
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations'
import client from '../apollo-client'
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries'
import toast from 'react-hot-toast'

type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

type Props = {
  subreddit?: string
}

function PostBox({ subreddit }: Props) {
  const { data: session } = useSession()
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, 'getPostList'],
  })
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)

  const [imageBoxOpen, setImageBoxOpen] = useState(false)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData)
    const notification = toast.loading('Creating new post...')
    try {
      console.log(client)
      // Query for the subreddit topic...
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      })

      const subredditExists = getSubredditListByTopic.length > 0
      if (!subredditExists) {
        // create subreddit
        console.log('subreddit is new! -> creating a NEW subreddit')
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: { topic: formData.subreddit },
        })

        console.log('creating a post...', formData)
        const image = formData.postImage || ''

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })

        console.log('New post added:', newPost)
      } else {
        // use exisiting subreddit
        console.log('using exisiting subreddit!')
        console.log(getSubredditListByTopic)
        const image = formData.postImage || ''

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })

        console.log('new post added', newPost)
      }

      // after post has been added
      toast.success('New Post Created!', {
        id: notification,
      })
    } catch (error) {
      toast.error('Whoops something went wrong!', {
        id: notification,
      })
    }
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        postBody: undefined,
        postImage: undefined,
        subreddit: undefined,
      })
    }
  }, [isSubmitSuccessful])

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-20 z-50 rounded-md border border-gray-300 p-2"
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <UserAvatar diameter={20} />
        <input
          {...register('postTitle', { required: true })}
          disabled={!session}
          className="flex-1 rounded-md p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit}`
                : 'Create a post by entering a title!'
              : 'Sign in to post'
          }
        />
        <PhotographIcon
          className={`h-6 cursor-pointer ${imageBoxOpen && 'text-blue-300'}`}
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
        />
        <LinkIcon className="h-6" />
      </div>

      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          {/* Body */}
          <div className="flex items-center px-2">
            <p className="min-w-[90x]">Body</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none dark:text-black"
              {...register('postBody')}
              type="text"
              placeholder="Text (optional)"
            />
          </div>

          {/* Subreddit */}
          {!subreddit ? (
            <div className="flex items-center px-2">
              <p className="min-w-[90x]">Subreddit</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none dark:text-black"
                {...register('subreddit', { required: true })}
                type="text"
                placeholder="i.e. reactjs"
              />
            </div>
          ) : null}

          {/* Image */}
          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90x]">Image</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none dark:text-black"
                {...register('postImage')}
                type="text"
                placeholder="Optional... Enter an image URL"
              />
            </div>
          )}

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>-A Post Title is Required.</p>
              )}

              {errors.subreddit?.type === 'required' && (
                <p>-A Subreddit is Required.</p>
              )}
            </div>
          )}

          {!!watch('postTitle') && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default PostBox
