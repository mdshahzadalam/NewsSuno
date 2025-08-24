import { PageContainer } from '@/components/page-container';

export default function PrivacyPolicyPage() {
  return (
    <PageContainer>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="mt-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect information that you provide directly to us when you use our services, including when you create an account, 
              subscribe to our newsletter, or contact us for support. This may include your name, email address, and any other information 
              you choose to provide.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use the information we collect to provide, maintain, and improve our services, including to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
              <li>Provide and deliver the services you request</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent security issues</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground">
              We do not share your personal information with third parties except as described in this Privacy Policy. 
              We may share information with service providers who perform services on our behalf, in compliance with 
              our Privacy Policy and other appropriate confidentiality and security measures.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">4. Your Choices</h2>
            <p className="text-muted-foreground">
              You have the right to access, update, or delete your personal information. You can usually do this 
              through your account settings. If you have any questions about reviewing or modifying your account 
              information, please contact us.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">5. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at privacy@newstalk.com
            </p>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
