import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
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
              Terms of Service
            </h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-8">
          {/* Header Section */}
          <div className="text-center pb-6 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Terms of Service
            </h2>
            <p className="text-gray-600">
              Last Updated: November {currentYear}
            </p>
          </div>

          {/* Agreement to Terms */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              1. Agreement to Terms
            </h3>
            <p className="text-gray-600 leading-relaxed">
              By accessing or using Check That Menu (the "Service"), you agree
              to be bound by these Terms of Service. If you disagree with any
              part of the terms, you do not have permission to access the
              Service.
            </p>
          </section>

          {/* Account Terms */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              2. Account Terms
            </h3>
            <div className="pl-4 space-y-6">
              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">
                  2.1 Account Creation
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>You must be 13 years or older to use this Service</li>
                  <li>You must sign in using a valid Google account</li>
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>You must notify us of any security breaches</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">
                  2.2 Account Responsibilities
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    You are responsible for all activities under your account
                  </li>
                  <li>You must not share your account credentials</li>
                  <li>
                    You must not use the service for unauthorized purposes
                  </li>
                  <li>You must comply with all local laws and regulations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Service Usage */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              3. Service Usage
            </h3>
            <div className="pl-4 space-y-6">
              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">
                  3.1 Ordering and Payments
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>All orders are subject to restaurant acceptance</li>
                  <li>Prices and availability are subject to change</li>
                  <li>Payment information must be accurate and valid</li>
                  <li>
                    Orders cannot be cancelled after restaurant confirmation
                  </li>
                  <li>Refunds are subject to restaurant policies</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">
                  3.2 Prohibited Activities
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Creating false or duplicate accounts</li>
                  <li>Interfering with service operations</li>
                  <li>Attempting to access restricted areas</li>
                  <li>Using the service for illegal activities</li>
                  <li>Harassing other users or staff</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              4. Intellectual Property
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The Service and its original content, features, and functionality
              are owned by Check That Menu and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property laws.
            </p>
          </section>

          {/* Termination */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              5. Termination
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to terminate or suspend your account and
              access to the Service immediately, without prior notice or
              liability, for any reason, including breach of these Terms.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              6. Limitation of Liability
            </h3>
            <p className="text-gray-600 leading-relaxed">
              In no event shall Check That Menu be liable for any indirect,
              incidental, special, consequential, or punitive damages, including
              without limitation, loss of profits, data, use, goodwill, or other
              intangible losses.
            </p>
          </section>

          {/* Contact Information */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              Contact Information
            </h3>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-600 mb-4">
                For questions about these Terms:
              </p>
              <ul className="space-y-2 text-gray-600">
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
              © {currentYear} Check That Menu. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
