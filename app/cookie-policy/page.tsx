import { PageContainer } from '@/components/page-container';

export default function CookiePolicyPage() {
  return (
    <PageContainer>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="mt-8 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
            <p className="text-muted-foreground">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and to provide information to the site owners.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
            <p className="text-muted-foreground">
              We use cookies for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
              <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Functionality Cookies:</strong> Enable enhanced functionality and personalization</li>
              <li><strong>Targeting/Advertising Cookies:</strong> Used to deliver relevant ads to you</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-muted">
                <thead>
                  <tr className="bg-muted/20">
                    <th className="p-3 text-left">Cookie Name</th>
                    <th className="p-3 text-left">Purpose</th>
                    <th className="p-3 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted">
                  <tr>
                    <td className="p-3">session_id</td>
                    <td className="p-3">Maintains your session state</td>
                    <td className="p-3">Session</td>
                  </tr>
                  <tr>
                    <td className="p-3">_ga</td>
                    <td className="p-3">Google Analytics tracking</td>
                    <td className="p-3">2 years</td>
                  </tr>
                  <tr>
                    <td className="p-3">cookie_consent</td>
                    <td className="p-3">Stores your cookie preferences</td>
                    <td className="p-3">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
            <p className="text-muted-foreground">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already 
              on your computer and you can set most browsers to prevent them from being placed. If you do this, 
              however, you may have to manually adjust some preferences every time you visit a site and some 
              services and functionalities may not work.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Cookies</h2>
            <p className="text-muted-foreground">
              We may also use various third-party cookies to report usage statistics of the Service, deliver 
              advertisements on and through the Service, and so on. These cookies may be used when you share 
              information using a social media sharing button or "like" button on our site.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting 
              the new Cookie Policy on this page and updating the "Last updated" date at the top of this policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Cookie Policy, please contact us at privacy@newstalk.com
            </p>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
