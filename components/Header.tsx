import Image from 'next/image'
import React from 'react'

import {
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  SunIcon,
  MoonIcon,
  UserAddIcon,
} from '@heroicons/react/solid'
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import { useTheme } from 'next-themes'
import * as darkLogo from '../public/reddit-darkmode.png'
import * as lightLogo from '../public/reddit-lightmode.png'
import HeaderMenu from './HeaderMenu'
import { Avatar } from '@mui/material'

const iconMenu = (
  <>
    <SparklesIcon className="icon" />
    <GlobeIcon className="icon" />
    <VideoCameraIcon className="icon" />
    <hr className="h-10 border border-gray-100" />
    <ChatIcon className="icon" />
    <BellIcon className="icon" />
    <PlusIcon className="icon" />
    <SpeakerphoneIcon className="icon" />
  </>
)

function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="sticky top-0 z-50 flex px-4 py-2 shadow-lg shadow-[#FF4500]">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image
          priority
          objectFit="contain"
          src={theme === 'dark' ? darkLogo : lightLogo}
          layout="fill"
        />
        {/* <Avatar sx={{ backgroundColor: '#FF4500', height: 32, width: 32 }}>
          <UserAddIcon />
        </Avatar> */}
      </div>

      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* Search */}
      <form className="flex flex-1 items-center space-x-2 rounded border border-gray-200 bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          placeholder="Search Reddit"
        />
        <button hidden type="submit" />
      </form>

      {/* Icons */}
      <div className="mx-5 hidden items-center space-x-2 text-gray-500 lg:inline-flex">
        {iconMenu}
        {theme === 'dark' ? (
          <MoonIcon className="icon" onClick={() => setTheme('light')} />
        ) : (
          <SunIcon className="icon" onClick={() => setTheme('dark')} />
        )}
      </div>

      <div className="ml-5 flex items-center">
        <HeaderMenu />
      </div>
    </div>
  )
}

export default Header
