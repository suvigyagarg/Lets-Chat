'use client'
import React, { useState } from 'react'
import Homecard from './Homecard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { error } from 'console'
import { toast } from "sonner"


const MeetingTypeList = () => {
    const router =useRouter();
    const [meetingState ,setMeetingState] = useState<'isScheduleMeeting'| 'isJoiningMeeting' |'isInstantMeeting' | undefined >()
    const [values ,setValues]  = useState({
      dateTime: new Date(),
      description :'',
      link: ''
    })
    const [callDetails ,setCallDetails ] = useState<Call>()
    const {user} =useUser();
    const client =useStreamVideoClient();

    const createMeeting =async ()=>{
      if(!client || !user) return;

      try{
        if(!values.dateTime){
          toast("Please select a date and time")
          return
        }
       const id = crypto.randomUUID();
       const call = client.call('default',id)
      
       if (!call) throw new Error('Failed to create call')

      const startsAt =values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description =values.description|| 'Instant Meeting';

      await call.getOrCreate({
        data:{
          starts_at : startsAt,
          custom:{
            description
          }
        }
      })

      setCallDetails(call);
      if(!values.description){
         router.push(`/meeting/${call.id}`)
      }
      toast('Meeting Created')
      }catch(error){
       console.log(error);
       toast('Failed to create meeting ')
      }
    }
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
    <Homecard
    img="/icons/add-meeting.svg"
    title ="New Meeting"
    description ="Start an Instant meeting"
    handleClick={()=> setMeetingState('isInstantMeeting')}
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


    <MeetingModal
    isOpen={meetingState==='isInstantMeeting'}
    onClose={()=>setMeetingState(undefined)}
    title='Start an Instant Meeting'
    className='text-center'
    buttonText ='Start Meeting'
    handleClick={createMeeting}
    />
    </section>
  )
}

export default MeetingTypeList