import React from 'react'
import Subjects from './Subjects'
import HeroSection from './HeroSection'
import FeaturedTutors from './FeaturedTutors'
import HowItWorks from './HowItWorks'
import { Stats } from './stats'
import Testimonials from './Testimonials'
import Becomeatutor from './Becomeatutor'
import FaqSection from './FaqSection'

const Home = () => {
  return (
   <>
   <HeroSection/>
   <Subjects/>
   <FeaturedTutors/>
   <Stats/>
   <HowItWorks/>
   <Testimonials/>
   <FaqSection/>
   <Becomeatutor/>
   </>
  )
}

export default Home