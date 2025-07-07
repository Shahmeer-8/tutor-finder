import React from 'react'
import Subjects from './Subjects'
import HeroSection from './HeroSection'
import Feature from './Feature'
import FeaturedTutors from './FeaturedTutors'
import HowItWorks from './HowItWorks'
import { Stats } from './stats'

const Home = () => {
  return (
   <>
   <HeroSection/>
   {/* <Feature/> */}
   <Subjects/>
   <Stats/>
   <FeaturedTutors/>
   <HowItWorks/>
   </>
  )
}

export default Home