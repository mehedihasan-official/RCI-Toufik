"use client";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              What Are Cookies
            </h2>
            <p className="text-gray-600">
              Cookies are small text files that are placed on your computer or
              mobile device when you visit our website. They allow us to
              remember your preferences and improve your browsing experience.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              How We Use Cookies
            </h2>
            <p className="text-gray-600 mb-3">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to
                function properly
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how
                visitors use our website
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember your preferences
                and settings
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Used to deliver relevant
                advertisements
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Types of Cookies We Use
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Session Cookies</h3>
                <p className="text-gray-600">
                  Temporary cookies that expire when you close your browser
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">
                  Persistent Cookies
                </h3>
                <p className="text-gray-600">
                  Cookies that remain on your device for a set period or until
                  deleted
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">
                  Third-party Cookies
                </h3>
                <p className="text-gray-600">
                  Cookies set by third-party services we use, such as analytics
                  providers
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Managing Cookies
            </h2>
            <p className="text-gray-600 mb-3">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                Most web browsers allow you to control cookies through their
                settings
              </li>
              <li>
                You can delete all cookies that are already on your computer
              </li>
              <li>
                You can set most browsers to prevent cookies from being placed
              </li>
              <li>
                Note that disabling cookies may affect the functionality of our
                website
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Third-party Services
            </h2>
            <p className="text-gray-600">
              We may use third-party services that set their own cookies. We
              have no control over these cookies, and they are subject to the
              respective third party's privacy policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Updates to This Policy
            </h2>
            <p className="text-gray-600">
              We may update this Cookie Policy from time to time. We will notify
              you of any changes by posting the new policy on this page and
              updating the "Last updated" date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions about our use of cookies, please contact
              us at privacy@rci.com or visit our{" "}
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
