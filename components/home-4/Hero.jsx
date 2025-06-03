import { HeroDarkShapeSVG, HeroLightShapeSVG } from '@/data/svgImages'
import FadeUpAnimation from '../animations/FadeUpAnimation'
import Link from 'next/link'

const Hero = () => {
  return (
    <section
      className="hero relative overflow-hidden pb-32 pt-[180px] dark:bg-dark-300 max-lg:pb-25 max-lg:pt-[160px]"
      id="scene">
      {/* Enhanced gradient background */}
      <div className="absolute left-0 top-0 h-full max-h-[600px] w-full bg-[linear-gradient(180deg,var(--tw-gradient-stops))] from-[#F3FDD9] from-[-2.27%] to-[#F3FDD9]/5 dark:hidden"></div>

      {/* Decorative elements */}
      <div className="absolute left-1/2 top-0 max-w-[1612px] -translate-x-1/2 max-lg:hidden">
        <HeroLightShapeSVG />
      </div>

      <div className="absolute bottom-0 left-0 w-full lg:hidden">
        <HeroDarkShapeSVG />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-primary/10 rounded-full blur-xl dark:bg-primary/20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/5 w-20 h-20 bg-primary/10 rounded-full blur-xl dark:bg-primary/20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Hero Content */}
      <FadeUpAnimation className="container">
        <div className="relative z-10 text-center">
          <h1 className="text-5xl/tight md:text-7xl/tight font-extrabold mx-auto max-w-4xl drop-shadow-icon mb-8">
            Enterprise-grade <span className="text-primary relative inline-block">
              AI tools
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-primary/20 rounded-full"></span>
            </span> for
            <br className="hidden md:block" />
            <span className="relative inline-block">
              Engineering Excellence
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-[650px] text-lg text-paragraph-light dark:text-white/80">
            Our suite of specialized products—LabFlow, OpticFlow, and Sfera—accelerates R&D cycles, reduces design iterations, and delivers optimal solutions for complex engineering problems.
          </p>

          <div className="mx-auto mt-12 flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link href="#instrumentation-agent">
              <button className="btn relative overflow-hidden group bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full transition-all duration-300">
                <span className="relative z-10">Explore Our Products</span>
                <span className="absolute inset-0 w-full h-full bg-primary-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
            </Link>
            <Link href="/contact">
              <button className="btn-outline px-7 py-3 rounded-full border-2 border-primary hover:bg-primary/10 transition-colors duration-300 flex items-center">
                <span>Contact Sales</span>
                <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-24 hidden md:block">
            <a href="#instrumentation-agent" className="group inline-flex flex-col items-center cursor-pointer transition-all">
              <span className="text-sm text-paragraph-light dark:text-white/60 mb-3 group-hover:text-primary transition-colors">
                Scroll to Products
              </span>
              <div className="mx-auto w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full relative group-hover:border-primary transition-colors">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              </div>
            </a>
          </div>
        </div>
      </FadeUpAnimation>
    </section>
  )
}

export default Hero