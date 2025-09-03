import { useTranslation } from "@/hooks/use-translation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";

export default function Cookies() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead
        title="Cookie Policy - MCB Consulting Services"
        description="Cookie Policy for MCB Consulting Services. Learn about how we use cookies and similar technologies."
        keywords="cookie policy, cookies, tracking, MCB consulting"
      />
      
      <div className="min-h-screen bg-white">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies</h2>
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you 
                  visit our website. They help us provide you with a better experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Cookies</h2>
                <p>
                  We use cookies to remember your preferences, understand how you use our site, and 
                  improve our services. This includes analytics, functionality, and advertising cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Cookies</h2>
                <p>
                  You can control and/or delete cookies as you wish. You can delete all cookies that are 
                  already on your computer and you can set most browsers to prevent them from being placed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Cookies</h2>
                <p>
                  Some cookies on our site are set by third-party services. We have no control over these 
                  cookies and you should check the relevant third-party website for more information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                <p>
                  If you have any questions about our use of cookies, please contact us at 
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
