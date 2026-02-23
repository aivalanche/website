'use client'
import Footer from '@/components/footer/Footer'
import SecondaryNavbar from '@/components/navbar/SecondaryNavbar'
import { useState } from 'react'

export default function RequestDemo() {
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const formData = {
        name: e.target.username.value,
        companyName: e.target.companyname.value,
        contactNumber: e.target.contactno.value,
        email: e.target.email.value,
        message: e.target.message.value,
      }

      const response = await fetch('/api/request-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus('error')
        return
      }

      if (data.details?.failed?.length > 0) {
        setStatus('partial')
      } else {
        setStatus('success')
        e.target.reset()
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    border: '1px solid var(--wp-line, #D8D1C5)',
    background: 'transparent',
    color: 'var(--wp-text, #121417)',
  }

  return (
    <>
      <SecondaryNavbar />
      <main className="max-w-[700px] mx-auto px-6 py-32">
        <p className="text-[11px] tracking-[0.15em] uppercase opacity-30 mb-3">Contact</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-10">Request a Demo</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">Your name</label>
              <input type="text" name="username" id="username" required placeholder="Name"
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none" style={inputStyle} />
            </div>
            <div>
              <label htmlFor="companyname" className="block text-sm font-medium mb-2">Company name</label>
              <input type="text" name="companyname" id="companyname" required placeholder="Company"
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none" style={inputStyle} />
            </div>
            <div>
              <label htmlFor="contactno" className="block text-sm font-medium mb-2">Contact No.</label>
              <input type="tel" name="contactno" id="contactno" required placeholder="Phone"
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none" style={inputStyle} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
              <input type="email" name="email" id="email" required placeholder="Email"
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none" style={inputStyle} />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
            <textarea name="message" id="message" required rows="6"
              className="w-full rounded-lg px-4 py-2.5 text-sm outline-none resize-none" style={inputStyle} />
          </div>
          <div className="text-center">
            <button type="submit" disabled={status === 'sending'}
              className="px-7 py-3 rounded-full font-semibold text-sm transition-colors"
              style={{ background: 'var(--wp-accent, #1DBF73)', color: 'var(--wp-bg, #F4F0E8)' }}>
              {status === 'sending' ? 'Sending...' : 'Request Now'}
            </button>
            {status === 'success' && <p className="mt-4 text-sm" style={{ color: 'var(--wp-accent)' }}>Demo request sent!</p>}
            {status === 'partial' && <p className="mt-4 text-sm text-yellow-600">Sent with some delivery issues.</p>}
            {status === 'error' && <p className="mt-4 text-sm text-red-600">Failed. Please try again.</p>}
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}