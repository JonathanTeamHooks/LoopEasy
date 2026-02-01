import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | LoopEasy",
  description: "LoopEasy Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Header */}
      <nav className="border-b border-[#1c1c1f]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity w-fit">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
              </svg>
            </div>
            <span className="text-xl font-bold">LoopEasy</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-[#6b6b70] mb-8">Last updated: January 31, 2026</p>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p className="text-[#a1a1a6] leading-relaxed mb-4">We collect information you provide directly:</p>
            <ul className="list-disc list-inside text-[#a1a1a6] space-y-2">
              <li>Account information (name, email, profile picture)</li>
              <li>Content you upload (videos, thumbnails, descriptions)</li>
              <li>Communications with us (support requests, feedback)</li>
              <li>Payment information (processed securely by Stripe)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Automatically Collected Information</h2>
            <ul className="list-disc list-inside text-[#a1a1a6] space-y-2">
              <li>Device information (browser type, operating system)</li>
              <li>Usage data (pages visited, features used, watch history)</li>
              <li>Log data (IP address, access times, referring URLs)</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-[#a1a1a6] space-y-2">
              <li>Provide and improve the Service</li>
              <li>Personalize your experience and recommendations</li>
              <li>Process payments and prevent fraud</li>
              <li>Communicate with you about the Service</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Information Sharing</h2>
            <p className="text-[#a1a1a6] leading-relaxed mb-4">We may share your information with:</p>
            <ul className="list-disc list-inside text-[#a1a1a6] space-y-2">
              <li>Service providers who assist our operations (hosting, analytics, payments)</li>
              <li>Other users (public profile information, content you share)</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your consent</li>
            </ul>
            <p className="text-[#a1a1a6] leading-relaxed mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
            <p className="text-[#a1a1a6] leading-relaxed">
              We implement industry-standard security measures to protect your data, including encryption, 
              secure servers, and regular security audits. However, no method of transmission over the 
              Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
            <p className="text-[#a1a1a6] leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-[#a1a1a6] space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies</h2>
            <p className="text-[#a1a1a6] leading-relaxed">
              We use cookies to maintain your session, remember your preferences, and analyze usage. 
              You can control cookies through your browser settings, though some features may not 
              function properly without them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Children's Privacy</h2>
            <p className="text-[#a1a1a6] leading-relaxed">
              LoopEasy is not intended for users under 13 years of age. We do not knowingly collect 
              personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. International Users</h2>
            <p className="text-[#a1a1a6] leading-relaxed">
              Your information may be transferred to and processed in the United States or other 
              countries. By using the Service, you consent to such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to This Policy</h2>
            <p className="text-[#a1a1a6] leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant 
              changes via email or through the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Us</h2>
            <p className="text-[#a1a1a6] leading-relaxed">
              For privacy-related questions, please contact us at{" "}
              <a href="mailto:privacy@loopeasy.com" className="text-[#6366f1] hover:underline">
                privacy@loopeasy.com
              </a>
            </p>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-[#1c1c1f]">
          <Link href="/" className="text-[#6366f1] hover:underline">
            ← Back to LoopEasy
          </Link>
        </div>
      </main>
    </div>
  );
}
