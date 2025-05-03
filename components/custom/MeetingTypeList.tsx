'use client'
import React, { useState } from 'react'
import Homecard from './Homecard'
import { useRouter } from 'next/navigation'

const MeetingTypeList = () => {
    const router =useRouter();
    const [meetingState ,setMeetingState] = useState<'isScheduleMeeting'| 'isJoiningMeeting' |'isInstantMeeting' | undefined  >()

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
    <Homecard
    img="/icons/add-meeting.svg"
    title ="New Meeting"
    description ="Start an Instant meeting"
    handleClick={()=> setMeetingState('isJoiningMeeting')}
    className ="bg-orange-1"
    />
    <Homecard
    img="/icons/schedule.svg"
    title ="Schedule Meeting"
    description ="Plan your meeting meeting"
    handleClick={()=> setMeetingState('isScheduleMeeting')}
      className ="bg-blue-1"
    />
 
    <Homecard
    img="/icons/recordings.svg"
    title ="View Recordings"
    description ="Check out your recordings"
    handleClick={()=>router.push('/recordings')}
    className ="bg-purple-1"
    />
    <Homecard
    img="/icons/join-meeting.svg"
    title ="Join Meeting"
    description ="via invitation link"
    handleClick={()=> setMeetingState('isJoiningMeeting')}
    className ="bg-yellow-1"/>
    </section>
  )
}

export default MeetingTypeList