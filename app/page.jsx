'use client'
import ProcessInstallation from '@/components/home-4/ProcessInstallation'
import Hero from '@/components/home-4/Hero'
import CallToAction from '@/components/shared/CallToAction'
import MembersCounter from '@/components/shared/MembersCounter'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import Footer from '@/components/footer/Footer'
import RobustFeatures from '@/components/home-8/RubustFeature'
import Approach from '@/components/home-6/Approach'
import { Cpu, Eye, SlidersHorizontal, PlayCircle, X } from 'lucide-react'
import BackgroundAnimation from '@/components/animations/BackgroundAnimation'
import { useState, useRef, useEffect } from 'react'
import { productSchemas } from './product-schema'
import Head from 'next/head'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { getCanonicalUrl } from '@/utils/canonical'

// Metadata needs to be in a separate file or handled differently in Next.js 13+ with client components
// export const metadata = {
//   title: 'aivalanche',
// }

// Product data for our custom products section
const products = [
  {
    id: 'instrumentation-agent',
    name: "LabFlow",
    tagline: "AI‑Assisted Lab Engineer",
    description:
      "Revolutionize your laboratory workflow with our flagship product. The LabFlow AI agent  is a great solution for engineers and scientists who need precise control and automation. Built on  native interface to your hardware, it offers unprecedented integration across your entire lab setup.",
    features: [
      "Unified control interface for all lab equipment",
      "Real-time data acquisition and visualization",
      "AI-powered experiment optimization",
      "State of the art software and hardware integration"
    ],
    technologies: ["AI Agent", "Lab Control", "Visualisation", "Automation"],
    icon: Cpu,
    cta: "Get early access",
    href: "/downloads/instrumentation-agent",
  },
  {
    id: 'inverse-optical-design',
    name: "OpticFlow",
    tagline: "Accelerated Optical Component Design",
    description:
      "Automate your optical design workflow with our concept-to-production platform. OpticFlow optimizes optical designs, letting your engineers focus on innovation instead of repetitive design tasks. Save months of engineering time by eliminating weeks of back-and-forth between optical and mechanical design.",
    features: [
      "Optimal solutions for optical component design",
      "Parametric optimization in 3D and 2D ",
      "Works with all major CAD simulation softwares",
      "PDK-specific models"
    ],
    technologies: ["Quantum Computing", "Optical Design", "Inverse Design", "Optimization"],
    icon: Eye,
    cta: "Try Live Demo",
    href: "/request-demo",
  },
  {
    id: 'bsim4-optimizer',
    name: "Sfera",
    tagline: "Parametric Models—Tuned at Lightning Speed",
    description:
      "Purpose-built for semiconductor engineers, our Sfera optimizer dramatically accelerates model fitting for compact models. Using advanced Bayesian optimization and evolutionary algorithms, it delivers superior fits across all corners while reducing characterization time from weeks to hours.",
    features: [
      "Automated model extraction from measurement data",
      "Parallel multi-corner optimization",
      "Statistical validation and sensitivity analysis",
      "Direct SPICE model generation"
    ],
    technologies: ["VCSEL", "Bayesian Optimization", "HSPICE", "PSPICE"],
    icon: SlidersHorizontal,
    cta: "Request Access",
    href: "/contact",
  },
];

const HomePage4 = () => {
  // Track playing state of each video separately
  const [playingVideos, setPlayingVideos] = useState({});
  const [videoError, setVideoError] = useState({});
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const videoRefs = {
    'inverse-optical-design': useRef(null),
    'bsim4-optimizer': useRef(null),
  };
  const pathname = usePathname();
  const canonicalUrl = getCanonicalUrl(pathname);

  const handlePlayVideo = (productId) => {
    if (videoRefs[productId]?.current) {
      const video = videoRefs[productId].current;

      if (video.paused) {
        // Reset any previous error
        setVideoError(prev => ({ ...prev, [productId]: null }));

        // Show loading state
        setPlayingVideos(prev => ({ ...prev, [productId]: 'loading' }));

        // Use a timeout to give browser time to start loading the video
        setTimeout(() => {
          // Play the selected video
          video.play()
            .then(() => {
              setPlayingVideos(prev => ({ ...prev, [productId]: true }));

              // Add event listener for when video ends
              video.onended = () => {
                setPlayingVideos(prev => ({ ...prev, [productId]: false }));
              };

              // Add event listener for when video is paused
              video.onpause = () => {
                // Don't reset playing state on pause - we want controls to remain visible
                // but we want to keep track that it's paused
                if (!video.ended) {
                  setPlayingVideos(prev => ({ ...prev, [productId]: 'paused' }));
                }
              };

              // Add event listener for when video is played again
              video.onplay = () => {
                setPlayingVideos(prev => ({ ...prev, [productId]: true }));
              };
            })
            .catch(err => {
              console.error("Error playing video:", err);
              setVideoError(prev => ({ ...prev, [productId]: "Could not play video. Try clicking again." }));
              setPlayingVideos(prev => ({ ...prev, [productId]: false }));
            });
        }, 100);
      }
    }
  };

  const handleShowEmailModal = (productId) => {
    setSelectedProduct(productId);
    setShowEmailModal(true);
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();

    // Show loading state
    setSubmitting(true);

    // Send the email to our API endpoint
    fetch('/api/early-access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        productId: selectedProduct
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
        setShowEmailModal(false);
        setEmail('');
        setSubmitting(false);
        setSubmitSuccess(true);

        // Reset success message after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error:', error);
        setSubmitting(false);
        setSubmitError('Something went wrong. Please try again.');

        // Reset error message after 3 seconds
        setTimeout(() => {
          setSubmitError(null);
        }, 3000);
      });
  };

  return (
    <>
      <Head>
        <title>AIvalanche - Enterprise-grade AI Tools for Engineering Excellence</title>
        <meta name="description" content="Accelerate R&D cycles with AIvalanche's specialized engineering AI tools - LabFlow, OpticFlow, and Sfera for faster design iterations and optimal solutions." />
        <link rel="canonical" href={canonicalUrl} />
        {productSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>

      {/* Email collection modal */}
      {showEmailModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-dark-300 text-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold mb-2">Request Demo Access</h3>
            <p className="text-white/80 text-sm mb-6">
              Enter your email to get early access to our demo.
            </p>

            <form onSubmit={handleSubmitEmail}>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg bg-transparent border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
                  required
                  disabled={submitting}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3 ${submitting ? 'bg-primary/70' : 'bg-primary hover:bg-primary-200'} text-white font-medium rounded-lg transition-colors flex items-center justify-center`}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Get Demo Access'
                )}
              </button>

              {submitError && (
                <p className="mt-3 text-red-400 text-sm text-center">{submitError}</p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {submitSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-[1001] flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Request submitted successfully!
        </div>
      )}

      <SecondaryNavbar />
      <main>
        <Hero />

        {/* DataIntegration component removed */}


        {/* Products Section with static styling */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-dark-200 dark:to-dark-300">
          <div className="container relative pt-10">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2 dark:bg-primary/10"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl translate-x-1/3 translate-y-1/3 dark:bg-primary/10"></div>

            <div className="relative">
              <div className="mb-16 md:mb-24 text-center">
                <span className="inline-block px-4 py-2 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full dark:bg-primary/20">
                  ENTERPRISE-GRADE SOLUTIONS
                </span>
                <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold text-paragraph dark:text-white">
                  Our Product Suite
                </h2>
                <p className="mx-auto max-w-[650px] text-lg text-paragraph-light dark:text-white/80">
                  Purpose-built tools that solve complex engineering challenges using the latest in AI and simulation technology
                </p>
              </div>

              <div className="space-y-32 md:space-y-40">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    id={product.id}
                    className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center scroll-mt-32 ${index === 0 ? 'pt-6' : ''}`}
                  >
                    {/* Content Side */}
                    <div className="flex-1 relative">
                      <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary/10 rounded-full filter blur-xl dark:bg-primary/20 z-0"></div>

                      <div className="relative z-10">
                        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 dark:shadow-primary/30">
                          <product.icon className="h-8 w-8 text-white" />
                        </div>

                        <h3 className="mb-4 text-2xl md:text-3xl font-bold text-paragraph dark:text-white">
                          {product.name}
                        </h3>

                        <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-primary">
                          {product.tagline}
                        </span>

                        <p className="mb-6 text-lg leading-relaxed text-paragraph-light dark:text-white/80">
                          {product.description}
                        </p>

                        {/* Features list */}
                        <div className="mb-6">
                          <h4 className="text-sm uppercase tracking-wider text-paragraph-light dark:text-white/60 mb-3">Key Capabilities</h4>
                          <ul className="space-y-2">
                            {product.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <svg className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-paragraph dark:text-white/80">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className="mb-8">
                          <div className="flex flex-wrap gap-2">
                            {product.technologies.map((tech, i) => (
                              <span key={i} className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-paragraph-light rounded-full dark:bg-dark-100 dark:text-white/70">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <a
                          href={product.href}
                          onClick={(e) => {
                            if (product.id === 'instrumentation-agent') {
                              e.preventDefault();
                              handleShowEmailModal(product.id);
                            }
                          }}
                          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all hover:bg-primary-200 hover:pl-4 hover:pr-12"
                        >
                          <span>{product.cta}</span>
                          <svg
                            className="absolute right-3 translate-x-full opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                            width="20"
                            height="20"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M2.5 8C2.5 7.72386 2.72386 7.5 3 7.5L11.2929 7.5L8.14645 4.35355C7.95118 4.15829 7.95118 3.84171 8.14645 3.64645C8.34171 3.45118 8.65829 3.45118 8.85355 3.64645L13.2071 8L8.85355 12.3536C8.65829 12.5488 8.34171 12.5488 8.14645 12.3536C7.95118 12.1583 7.95118 11.8417 8.14645 11.6464L11.2929 8.5L3 8.5C2.72386 8.5 2.5 8.27614 2.5 8Z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>

                    {/* Video Demo Side */}
                    <div className="flex-1 lg:max-w-[600px]">
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 dark:shadow-primary/20 border border-gray-100 dark:border-dark-100 hover:shadow-primary/20 transition-all duration-300">
                        {product.id === 'inverse-optical-design' || product.id === 'bsim4-optimizer' ? (
                          // Video with play button for OpticFlow and Sfera
                          <div className="aspect-video w-full h-full bg-gradient-to-br from-gray-50 to-white dark:from-dark-100 dark:to-dark-200 overflow-hidden">
                            {/* Hidden video element that will be controlled via JS */}
                            <video
                              ref={videoRefs[product.id]}
                              className="absolute inset-0 w-full h-full object-cover opacity-0 custom-video-player"
                              style={{
                                opacity: playingVideos[product.id] ? 1 : 0,
                                zIndex: playingVideos[product.id] ? 10 : -1
                              }}
                              preload="none"
                              playsInline
                              controls={playingVideos[product.id] === true || playingVideos[product.id] === 'paused'}
                            >
                              <source
                                src={product.id === 'inverse-optical-design'
                                  ? "/images/taper design - genetic.mp4"
                                  : "/images/filter calibration.mp4"}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>

                            {/* Video overlay with radial gradient */}
                            <div className={`absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent dark:from-primary/10 transition-opacity duration-300 ${playingVideos[product.id] ? 'opacity-0' : 'opacity-100'}`}></div>

                            {/* Loading indicator */}
                            {playingVideos[product.id] === 'loading' && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-20">
                                <div className="w-12 h-12 border-4 border-primary/80 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            )}

                            {/* Error message */}
                            {videoError[product.id] && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                                <div className="bg-white dark:bg-dark-200 p-4 rounded-xl shadow-lg max-w-xs text-center">
                                  <p className="text-red-500 mb-2">{videoError[product.id]}</p>
                                  <button
                                    className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium"
                                    onClick={() => handlePlayVideo(product.id)}
                                  >
                                    Try Again
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Placeholder for video content - only show if video not playing */}
                            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-10 ${playingVideos[product.id] ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                              <div
                                className="relative group cursor-pointer"
                                onClick={() => handlePlayVideo(product.id)}
                              >
                                {/* Play button */}
                                <div className="h-20 w-20 rounded-full bg-white/90 dark:bg-dark-100/90 flex items-center justify-center shadow-xl hover:scale-95 transition-transform">
                                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                                    <PlayCircle className="h-10 w-10 text-white fill-white" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Abstract graphic elements - only show if video not playing */}
                            <div className={`absolute top-4 right-4 h-12 w-12 rounded-full bg-primary/10 dark:bg-primary/20 transition-opacity duration-300 ${playingVideos[product.id] ? 'opacity-0' : 'opacity-100'}`}></div>
                            <div className={`absolute bottom-6 left-6 h-8 w-8 rounded-full bg-primary/20 dark:bg-primary/30 transition-opacity duration-300 ${playingVideos[product.id] ? 'opacity-0' : 'opacity-100'}`}></div>
                            <div className={`absolute top-1/4 left-1/4 h-4 w-20 rounded-full bg-primary/10 dark:bg-primary/20 rotate-45 transition-opacity duration-300 ${playingVideos[product.id] ? 'opacity-0' : 'opacity-100'}`}></div>

                            {/* Caption for video - always show */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none">
                              <p className="text-white text-sm font-medium">
                                {playingVideos[product.id] === true ? 'Playing: ' : playingVideos[product.id] === 'loading' ? 'Loading: ' : 'Watch '}{product.name} in action
                              </p>
                            </div>
                          </div>
                        ) : (
                          // Default placeholder for LabFlow
                          <div className="aspect-video w-full h-full bg-gradient-to-br from-gray-50 to-white dark:from-dark-100 dark:to-dark-200 overflow-hidden">
                            {/* Video overlay with radial gradient */}
                            <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent dark:from-primary/10"></div>

                            {/* Placeholder for video content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative group cursor-pointer">
                                {/* Play button */}
                                <div className="h-20 w-20 rounded-full bg-white/90 dark:bg-dark-100/90 flex items-center justify-center shadow-xl hover:scale-95 transition-transform">
                                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                                    <PlayCircle className="h-10 w-10 text-white fill-white" />
                                  </div>
                                </div>
                                {/* Coming Soon badge */}
                                <div className="absolute -top-8 -right-8 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg transform rotate-12">
                                  Coming Soon
                                </div>
                              </div>
                            </div>

                            {/* Abstract graphic elements */}
                            <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-primary/10 dark:bg-primary/20"></div>
                            <div className="absolute bottom-6 left-6 h-8 w-8 rounded-full bg-primary/20 dark:bg-primary/30"></div>
                            <div className="absolute top-1/4 left-1/4 h-4 w-20 rounded-full bg-primary/10 dark:bg-primary/20 rotate-45"></div>

                            {/* Caption for video */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                              <p className="text-white text-sm font-medium">Watch a demo of {product.name}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Banner */}
              <div className="mt-24 lg:mt-32 relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-200 p-10 lg:p-16 text-white">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white">Ready to revolutionize your engineering workflow?</h3>
                    <p className="text-white/80 max-w-xl">Join leading teams already using our solutions to accelerate their R&D cycles.</p>
                  </div>

                  <a href="/contact" className="whitespace-nowrap px-8 py-4 rounded-full bg-white dark:text-black text-primary font-bold hover:bg-gray-100 transition-colors">
                    Schedule a Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </>
  )
}

export default HomePage4