'use client'
import { fadeUpAnimation } from '@/data/animation'
import useWhileInView from '@/hooks/useWhileInView'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

const ContactForm = () => {
  const ref = useRef(null)
  const controlAnimation = useWhileInView(ref)

  // Add form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error('Failed to send message')

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  return (
    <section className="relative mb-150">
      <div className="absolute left-1/2 -z-10 h-[550px] w-full -translate-x-1/2 bg-[url('/images/hero-gradient.png')] bg-cover bg-center bg-no-repeat opacity-70 md:hidden"></div>
      <motion.div
        className="container relative"
        ref={ref}
        initial="initial"
        animate={controlAnimation}
        variants={fadeUpAnimation}>
        <div className="mx-auto mb-12 max-w-[475px] text-center">
          <p className="section-tagline">Contact</p>
          <h2>Let us know how we can assist you</h2>
        </div>
        <div className="relative z-10 mx-auto max-w-[850px]">
          <div className="absolute left-1/2 top-1/2 -z-10 flex -translate-x-1/2 -translate-y-1/2 max-lg:max-w-full max-md:hidden">
            <div className="h-[442px] w-[442px] rounded-full bg-primary-200/20 blur-[145px]"></div>
            <div className="-ml-[170px] h-[442px] w-[442px] rounded-full bg-primary-200/25 blur-[145px]"></div>
            <div className="-ml-[170px] h-[442px] w-[442px] rounded-full bg-primary-200/20 blur-[145px]"></div>
          </div>
          <div className="rounded-medium bg-white p-2.5 shadow-nav dark:bg-dark-200">
            <div className="rounded border border-dashed border-gray-100 bg-white p-12 dark:border-borderColor-dark dark:bg-dark-200 max-md:p-5">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 max-md:gap-y-10 md:gap-8 md:gap-x-12">
                  <div className="max-md:col-span-full md:col-span-6">
                    <label
                      htmlFor="name"
                      className="mb-2 block font-jakarta_sans text-sm font-medium text-paragraph dark:text-white">
                      Your name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                      className="block w-full rounded-[48px] border border-borderColor bg-white px-5 py-2.5 text-sm text-paragraph-light outline-none transition-all duration-300 placeholder:text-paragraph-light focus:border-primary dark:border-borderColor-dark dark:bg-dark-200 dark:placeholder:text-paragraph-light dark:focus:border-primary"
                    />
                  </div>
                  <div className="max-md:col-span-full md:col-span-6">
                    <label
                      htmlFor="email"
                      className="mb-2 block font-jakarta_sans text-sm font-medium text-paragraph dark:text-white">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="block w-full rounded-[48px] border border-borderColor bg-white px-5 py-2.5 text-sm text-paragraph-light outline-none transition-all duration-300 placeholder:text-paragraph-light focus:border-primary dark:border-borderColor-dark dark:bg-dark-200 dark:focus:border-primary"
                    />
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="message"
                      className="mb-2 block font-jakarta_sans text-sm font-medium text-paragraph dark:text-white">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="10"
                      required
                      className="block w-full resize-none rounded border border-borderColor bg-white px-5 py-2.5 text-sm text-paragraph-light outline-none transition-all duration-300 placeholder:text-paragraph-light focus:border-primary dark:border-borderColor-dark dark:bg-dark-200 dark:focus:border-primary">
                    </textarea>
                  </div>
                  <div className="col-span-full mx-auto text-center">
                    <button
                      type="submit"
                      className="btn"
                      disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending...' : 'Contact Now'}
                    </button>
                    {status === 'success' && (
                      <p className="mt-4 text-green-600">Message sent successfully!</p>
                    )}
                    {status === 'error' && (
                      <p className="mt-4 text-red-600">Failed to send message. Please try again.</p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default ContactForm
