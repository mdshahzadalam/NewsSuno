import { PageContainer } from '@/components/page-container';

export default function TermsOfServicePage() {
  return (
    <PageContainer>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="mt-8 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using the NewsTalk website (the "Service"), you agree to be bound by these Terms of Service. 
              If you disagree with any part of the terms, you may not access the Service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-muted-foreground">
              Permission is granted to temporarily download one copy of the materials on NewsTalk's website for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="text-muted-foreground">
              As a user of the Service, you agree not to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
              <li>Use the Service for any illegal purpose or in violation of any laws</li>
              <li>Violate or encourage others to violate the rights of third parties</li>
              <li>Post, upload, or distribute any content that is unlawful, defamatory, or infringing</li>
              <li>Attempt to gain unauthorized access to any portion of the Service</li>
              <li>Interfere with the operation of the Service or any user's enjoyment of the Service</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="text-muted-foreground">
              The Service and its original content, features, and functionality are and will remain the exclusive 
              property of NewsTalk and its licensors. The Service is protected by copyright, trademark, and other 
              laws of both the United States and foreign countries.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              In no event shall NewsTalk, nor its directors, employees, partners, agents, suppliers, or affiliates, 
              be liable for any indirect, incidental, special, consequential or punitive damages, including without 
              limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify or replace these Terms at any time. We will provide at least 30 days' 
              notice prior to any new terms taking effect. By continuing to access or use our Service after those 
              revisions become effective, you agree to be bound by the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us at legal@newstalk.com
            </p>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
