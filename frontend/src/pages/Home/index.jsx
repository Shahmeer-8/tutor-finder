import React from 'react'
import Subjects from './Subjects'
import HeroSection from './HeroSection'
import Feature from './Feature'
import FeaturedTutors from './FeaturedTutors'
import HowItWorks from './HowItWorks'
import { Stats } from './stats'
import Testimonials from './Testimonials'

const Home = () => {
  return (
   <>
   <HeroSection/>
   {/* <Feature/> */}
   <Subjects/>
   <FeaturedTutors/>
   <Stats/>
   <HowItWorks/>
   <Testimonials/>
   </>
  )
}

export default Home