import MeetingTypeList from '@/components/custom/MeetingTypeList'
import React, { useEffect, useState } from 'react'

const Home = () => {
    const now = new Date()
    // const time_now =now.toLocaleTimeString('en-US', {
    //     hour: '2-digit',
    //     minute: '2-digit'
    // })
    // const [time, setTime] = useState(time_now)

    // useEffect(()=>{
    //     const interval = setInterval(() => setTime(now.toLocaleTimeString('en-US', {
    //         hour: '2-digit',
    //         minute: '2-digit'
    //     })), 1000);
    //     return() => {
    // clearInterval(interval);
    // }}, [])

    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })

const date = now.toLocaleDateString('en-US', {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
})
return (
    <section className='flex size-full flex-col gap-10 text-white'>
        <div className='h-[300px] w-full rounded-[20px] bg-[url(/images/hero-background.png)] bg-cover'>
            <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
                <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
                    Upcoming Meeting at 9:30AM
                </h2>
                <div className=' flex flex-col gap-2'>
                    <h1 className='text-4xl font-extrabold lg:text-7xl'>
                        {time}
                    </h1>
                    <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
                </div>
            </div>
        </div>
        <MeetingTypeList />
    </section>
)
}

export default Home