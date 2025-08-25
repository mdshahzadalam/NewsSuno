import Image from 'next/image';
import { PageContainer } from '@/components/page-container';

export default function AboutPage() {
  return (
    <PageContainer className="py-16">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section - Circle on mobile, Square on desktop */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="relative w-64 h-64 rounded-full lg:rounded-lg lg:w-80 lg:h-80 overflow-hidden border-4 border-primary/20 shadow-lg">
            <Image
              src="/placeholder-user.jpg"
              alt="About Us"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-4xl font-bold mb-6 text-center lg:text-left">About News Talk</h1>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Welcome to NewsTalk, your trusted source for the latest news and updates from around the world. 
              We are committed to delivering accurate, unbiased, and timely news to keep you informed and engaged.
            </p>
            <p>
              Our team of experienced journalists and editors work around the clock to bring you comprehensive 
              coverage of global events, politics, technology, business, and more.
            </p>
            <p>
              At NewsTalk, we believe in the power of information to transform lives and shape the future. 
              We're dedicated to journalistic integrity and providing our readers with reliable news they can trust.
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-muted/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-muted-foreground">
                To deliver accurate, unbiased news that informs, educates, and empowers our readers to make better decisions.
              </p>
            </div>
            <div className="p-6 bg-muted/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-muted-foreground">
                To be the most trusted and comprehensive news platform, connecting people with the information that matters most.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
