'use client'
import { fadeUpAnimation } from '@/data/animation'
import useWhileInView from '@/hooks/useWhileInView'
import analyticsDark2 from '@/public/images/integration/analytics-hero-dark-2.png'
import analyticsDark3 from '@/public/images/integration/analytics-hero-dark-3.png'
import analyticsDark from '@/public/images/integration/analytics-hero-dark.png'
import analyticsLight2 from '@/public/images/integration/analytics-hero-light-2.png'
import analyticsLight3 from '@/public/images/integration/analytics-hero-light-3.png'
import analyticsLight from '@/public/images/integration/analytics-hero-light.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

import ParameterEvolution from './ParameterEvolutionImage'
import LossFunctionVisualization from './LossFunctionVisualisation'
import SimulationDashboard from './Simulation'

const DataIntegration = () => {
  const ref = useRef(null)
  const controlAnimation = useWhileInView(ref)
  const ref2 = useRef(null)
  const controlAnimation2 = useWhileInView(ref2)
  const ref3 = useRef(null)
  const controlAnimation3 = useWhileInView(ref3)
  return (
    <section className="container mx-auto my-10 flex items-center justify-center gap-5 dark:bg-dark-300 lg:my-0">
      <motion.div initial="initial" ref={ref} animate={controlAnimation} variants={fadeUpAnimation} className="hidden xl:block">
        < SimulationDashboard />
      </motion.div>

      <div className="flex flex-col gap-y-5">
        <motion.figure initial="initial" ref={ref2} animate={controlAnimation2} variants={fadeUpAnimation}>
          <ParameterEvolution />

        </motion.figure>
        <motion.figure initial="initial" ref={ref3} animate={controlAnimation3} variants={fadeUpAnimation}>

          <LossFunctionVisualization />
        </motion.figure>
      </div>
    </section>
  )
}

export default DataIntegration
