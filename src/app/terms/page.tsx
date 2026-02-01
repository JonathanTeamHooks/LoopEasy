import Link from "next/link";

export const metadata = {
  title: "Terms of Service | LoopEasy",
  description: "LoopEasy Terms of Service",
};

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-[#6b6b70] mb-8">Last updated: January 31, 2026</p>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-[#a1a1a6] leading-relaxed">
              By accessing or using LoopEasy ("the Service"), you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
            <p className="text-[#a1a1a6] leading-relaxed">
              LoopEasy is a video streaming platform that allows users to watch, create, and share video content. 
              Our AI-powered tools help creators enhance their content and reach audiences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
            <p className="text-[#a1a1a6] leading-relaxed">
              You are responsible for maintaining the confidentiality of your account and password. 
              You agree to accept responsibility for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Content Guidelines</h2>
            <p className="text-[#a1a1a6] leading-relaxed">
              You retain ownership of content you create and upload. By uploading content, you grant LoopEasy 
              a license to display, distribute, and promote your content on the platform. Content must not 
              violate any laws or infringe on others' rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Creator Monetization</h2>
            <p className="text-[#a1a1a6] leading-relaxed">
              Eligible creators receive 70% of ad revenue generated from their content. Payment terms and 
              eligibility requirements are outlined in our Creator Program guidelines. LoopEasy reserves 
              the right to modify revenue share terms with 30 days notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Prohibited Conduct</h2>
            <p className="text-[#a1a1a6] leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-[#a1a1a6] space-y-2">
              <li>Upload illegal, harmful, or infringing content</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Use bots or automated systems to artificially inflate metrics</li>
              <li>Circumvent any content protection measures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Termination</h2>
            <p className="text-[#a1a1a6] leading-relaxed">
              We may terminate or suspend your account at any time for violations of these terms. 
              Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
            <p className="text-[#a1a1a6] leading-relaxed">
              LoopEasy shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages resulting from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Changes to Terms</h2>
            <p className="text-[#a1a1a6] leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of significant 
              changes via email or through the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Contact</h2>
            <p className="text-[#a1a1a6] leading-relaxed">
              For questions about these Terms, please contact us at{" "}
              <a href="mailto:legal@loopeasy.com" className="text-[#6366f1] hover:underline">
                legal@loopeasy.com
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
