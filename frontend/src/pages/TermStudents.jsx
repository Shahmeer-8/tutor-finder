import React from 'react'

const TermStudents = () => {
  return (
    <section className='py-28 mx-auto max-w-[1440px] px-6 lg:px-12"'>
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions for Students</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-8">Last updated: July 01, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using TutorFinder's services, you accept and agree to be bound by the terms and provision
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
            <p className="text-gray-700 mb-4">
              TutorFinder is a platform that connects students with qualified tutors across Pakistan. We provide:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Access to verified tutor profiles</li>
              <li>Communication tools to connect with tutors</li>
              <li>2-day free trial period</li>
              <li>Quality assurance and support services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Student Responsibilities</h2>
            <p className="text-gray-700 mb-4">As a student using our platform, you agree to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Provide accurate and truthful information</li>
              <li>Treat tutors with respect and professionalism</li>
              <li>Attend scheduled sessions punctually</li>
              <li>Pay agreed fees on time</li>
              <li>Provide honest feedback about tutoring sessions</li>
              <li>Not share login credentials with others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Free Trial Period</h2>
            <p className="text-gray-700 mb-4">
              We offer a 2-day free trial period for new students to assess tutor compatibility. During this period:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>No payment is required for the first 2 days</li>
              <li>You can evaluate the tutor's teaching style</li>
              <li>You may discontinue without any charges</li>
              <li>Regular rates apply after the trial period</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment Terms</h2>
            <p className="text-gray-700 mb-4">
              Payment terms are established between students and tutors. TutorFinder may facilitate payments but is not
              responsible for payment disputes between parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacy and Data Protection</h2>
            <p className="text-gray-700 mb-4">
              We are committed to protecting your privacy. Personal information collected is used solely for providing
              our services and will not be shared with third parties without consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              TutorFinder acts as a platform connecting students and tutors. We are not responsible for the quality of
              tutoring services, disputes between parties, or any damages arising from the use of our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
            <p className="text-gray-700 mb-4">
              Either party may terminate the use of services at any time. TutorFinder reserves the right to suspend or
              terminate accounts that violate these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
            <p className="text-gray-700 mb-4">For questions about these terms, please contact us at:</p>
            <ul className="list-none text-gray-700">
              <li>Email: legal@tutorfinder.pk</li>
              <li>Phone: +92 313 4041048</li>
              <li>Address: Faisalabad, Pakistan</li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  )
}

export default TermStudents