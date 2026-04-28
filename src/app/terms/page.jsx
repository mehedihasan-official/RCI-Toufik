"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Terms of Service
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Acceptance of Terms
            </h2>
            <p className="text-gray-600">
              By accessing and using RCI's services, you accept and agree to be
              bound by the terms and provision of this agreement. If you do not
              agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Use License
            </h2>
            <p className="text-gray-600">
              Permission is granted to temporarily access the materials on RCI's
              website for personal, non-commercial transitory viewing only. This
              is the grant of a license, not a transfer of title, and under this
              license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>modify or copy the materials</li>
              <li>
                use the materials for any commercial purpose or for any public
                display
              </li>
              <li>
                attempt to decompile or reverse engineer any software contained
                on the website
              </li>
              <li>
                remove any copyright or other proprietary notations from the
                materials
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              User Accounts
            </h2>
            <p className="text-gray-600">
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. You are
              responsible for safeguarding the password and for all activities
              that occur under your account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Bookings and Cancellations
            </h2>
            <p className="text-gray-600">
              All bookings are subject to availability and confirmation.
              Cancellation policies vary by resort and booking type. Please
              review the specific terms for each booking.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Limitation of Liability
            </h2>
            <p className="text-gray-600">
              In no event shall RCI or its suppliers be liable for any damages
              (including, without limitation, damages for loss of data or
              profit, or due to business interruption) arising out of the use or
              inability to use the materials on RCI's website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Governing Law
            </h2>
            <p className="text-gray-600">
              These terms and conditions are governed by and construed in
              accordance with the laws of Florida, and you irrevocably submit to
              the exclusive jurisdiction of the courts in that state.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Changes to Terms
            </h2>
            <p className="text-gray-600">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material, we will try to
              provide at least 30 days notice prior to any new terms taking
              effect.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Contact Information
            </h2>
            <p className="text-gray-600">
              If you have any questions about these Terms of Service, please
              contact us at legal@rci.com or visit our{" "}
              <a href="/contact" className="text-blue-600 hover:underline">
                Contact Us
              </a>{" "}
              page.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
