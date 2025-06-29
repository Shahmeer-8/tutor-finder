import React from 'react'
import { Link } from 'react-router-dom'
import { subjectData } from "../../data/data";

const Subjects = () => {
  return (
    <section className='mx-auto max-w-[1440px] px-6 lg:px-12 py-14 xl:py-16'>
      {/* Title  */}
      <div className='max-w-lg mx-auto text-center pb-14'>
        <h3 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>Explore By Subjects</h3>
        <p className='text-md md:text-xl text-gray-600'>Lorem ipsum dolor sit amet  deleniti officiis ratione inventore, et perferendis eum error dicta </p>
      </div>

      {/* Container for subject data  */}
      <div className='flex items-center justify-center flex-wrap gap-1 sm:gap-2'>
        {subjectData.map((subject,i)=>(
          <Link key={i} onClick={()=> scrollTo(0,0)} to={`/tutors/${subject.name}`} className='flex items-center justify-center flex-col bg-white h-28 w-40 rounded-xl'>
            <img src={subject.image} alt="" height={55} width={55} />
            <h5 className='text-sm md:text-sm mb-2 font-semibold mt-3'>{subject.name}</h5>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Subjects