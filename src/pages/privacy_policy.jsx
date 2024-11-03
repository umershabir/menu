import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              Privacy Policy
            </h1>
            <div className="w-24"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-8">
          {/* Header Section */}
          <div className="text-center pb-6 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Privacy Policy
            </h2>
            <p className="text-gray-600">
              Last Updated: November {currentYear}
            </p>
          </div>

          {/* Introduction */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              1. Introduction
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Welcome to Check that menu. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              use our restaurant menu and ordering application (the "Service").
            </p>
          </section>

          {/* Information Collection */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              2. Information We Collect
            </h3>

            <div className="pl-4 space-y-6">
              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">
                  2.1 Information You Provide
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Name and email address through Google Sign-In</li>
                  <li>Order history and preferences</li>
                  <li>
                    Payment information (processed securely through third-party
                    payment processors)
                  </li>
                  <li>Customer feedback and ratings</li>
                  <li>Table/QR code scanning data</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">
                  2.2 Information Automatically Collected
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Device information (type, operating system, browser)</li>
                  <li>IP address and location data (when scanning QR codes)</li>
                  <li>Usage patterns and interactions with our app</li>
                  <li>Access timestamps and session duration</li>
                  <li>QR code scan history</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">
                  2.3 Google Sign-In Data
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    We receive your Google profile information (name, email,
                    profile picture)
                  </li>
                  <li>We do not receive or store your Google password</li>
                  <li>
                    We only access the information you explicitly authorize
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Usage */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              3. How We Use Your Information
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Create and maintain your account</li>
              <li>Process and fulfill your orders</li>
              <li>Provide personalized menu recommendations</li>
              <li>Send order confirmations and updates</li>
              <li>Improve our services and user experience</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
              <li>Analyze usage patterns and optimize performance</li>
              <li>
                Communicate service updates and promotional offers (with your
                consent)
              </li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              4. Data Sharing and Disclosure
            </h3>

            <div className="pl-4 space-y-6">
              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">
                  4.1 We Share Data With:
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Restaurant partners (only order-related information)</li>
                  <li>Payment processors (for transaction processing)</li>
                  <li>Cloud service providers (for hosting and storage)</li>
                  <li>Analytics providers (in anonymized form)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">
                  4.2 We Do Not:
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Sell your personal information</li>
                  <li>Share your data with unauthorized third parties</li>
                  <li>
                    Use your information for purposes other than those specified
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Continue with other sections similarly... */}

          {/* Contact Information */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              Contact Information
            </h3>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-600 mb-4">
                For privacy-related questions or concerns:
              </p>
              <ul className="space-y-2 text-gray-600">
                {/* <li>
                  <span className="font-medium">Email:</span>{" "}
                  privacy@[yourapp].com
                </li> */}
                <li>
                  <span className="font-medium">Address:</span> Bahria Town
                  Lahore
                </li>
                <li>
                  <span className="font-medium">Phone:</span> 03093961696
                </li>
              </ul>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 mt-8 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm">
              By using our Service, you agree to this Privacy Policy and our
              Terms of Service. © {currentYear} Check That Menu. All rights
              reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
