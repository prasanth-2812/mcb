import { useTranslation } from "@/hooks/use-translation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";

export default function Terms() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead
        title="Terms of Service - MCB Consulting Services"
        description="Terms of Service for MCB Consulting Services. Read our terms and conditions for using our platform."
        keywords="terms of service, terms and conditions, MCB consulting"
      />
      
      <div className="min-h-screen bg-white">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
                <p>
                  By accessing and using MCB Consulting Services, you accept and agree to be bound by 
                  the terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials on MCB Consulting 
                  Services for personal, non-commercial transitory viewing only.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Accounts</h2>
                <p>
                  When you create an account with us, you must provide information that is accurate, 
                  complete, and current at all times.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Prohibited Uses</h2>
                <p>
                  You may not use our service for any unlawful purpose or to solicit others to perform 
                  or participate in any unlawful acts.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
                <p>
                  The information on this website is provided on an 'as is' basis. To the fullest extent 
                  permitted by law, this Company excludes all representations, warranties, conditions 
                  and terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at 
                  <a href="mailto:legal@mcbconsulting.com" className="text-blue-600 hover:underline">
                    legal@mcbconsulting.com
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
