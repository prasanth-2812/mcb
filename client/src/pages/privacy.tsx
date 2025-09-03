import { useTranslation } from "@/hooks/use-translation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead
        title="Privacy Policy - MCB Consulting Services"
        description="Privacy Policy for MCB Consulting Services. Learn how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, MCB consulting"
      />
      
      <div className="min-h-screen bg-white">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  apply for jobs, or contact us for support.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                <p>
                  We use the information we collect to provide, maintain, and improve our services, 
                  process job applications, and communicate with you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at 
                  <a href="mailto:privacy@mcbconsulting.com" className="text-blue-600 hover:underline">
                    privacy@mcbconsulting.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}
