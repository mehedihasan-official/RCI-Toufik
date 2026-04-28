"use client";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Get in Touch
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Phone Support</h3>
                <p className="text-gray-600">1-800-RCI-HELP (1-800-724-4357)</p>
                <p className="text-sm text-gray-500">Mon-Fri 8AM-8PM EST</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Email Support</h3>
                <p className="text-gray-600">support@rci.com</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Mailing Address</h3>
                <p className="text-gray-600">
                  RCI, LLC
                  <br />
                  6277 Sea Harbor Drive
                  <br />
                  Orlando, FL 32821
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Send us a Message
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
