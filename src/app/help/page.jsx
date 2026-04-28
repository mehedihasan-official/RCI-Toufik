"use client";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Help Center</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">
                How do I book a vacation?
              </h3>
              <p className="text-gray-600 mt-1">
                Search for available resorts, select your dates, and complete
                the booking process.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">What is RCI Points?</h3>
              <p className="text-gray-600 mt-1">
                RCI Points allow you to exchange vacation weeks at thousands of
                resorts worldwide.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">
                How do I contact support?
              </h3>
              <p className="text-gray-600 mt-1">
                Use the Contact Us page or call our support team at
                1-800-RCI-HELP.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Contact Support
          </h2>
          <p className="text-gray-600">
            Need more help? Visit our{" "}
            <a href="/contact" className="text-blue-600 hover:underline">
              Contact Us
            </a>{" "}
            page.
          </p>
        </div>
      </div>
    </div>
  );
}
