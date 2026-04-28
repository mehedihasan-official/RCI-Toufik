"use client";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Information We Collect
            </h2>
            <p className="text-gray-600">
              We collect information you provide directly to us, such as when
              you create an account, make a booking, or contact us for support.
              This includes your name, email address, phone number, and payment
              information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              How We Use Your Information
            </h2>
            <p className="text-gray-600">
              We use the information we collect to provide, maintain, and
              improve our services, process transactions, send you technical
              notices and support messages, and communicate with you about
              products, services, and promotional offers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Information Sharing
            </h2>
            <p className="text-gray-600">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy. We may share your information with
              trusted partners who assist us in operating our website and
              conducting our business.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Data Security
            </h2>
            <p className="text-gray-600">
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission
              over the internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Your Rights
            </h2>
            <p className="text-gray-600">
              You have the right to access, update, or delete your personal
              information. You may also opt out of receiving promotional
              communications from us by following the unsubscribe instructions
              in those communications.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please
              contact us at privacy@rci.com or visit our{" "}
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
