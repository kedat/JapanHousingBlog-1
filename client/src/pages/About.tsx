import { useEffect } from "react";
import NewsletterSection from "@/components/NewsletterSection";

const About = () => {
  useEffect(() => {
    document.title = "About | Japan Housing";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Learn about Japan Housing, our mission to provide insights into Japanese architecture, real estate, and interior design."
      );
    }
  }, []);

  return (
    <>
      <div className="py-16 px-6">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">About Japan Housing</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Japan Housing is a curated blog dedicated to exploring the fascinating world of Japanese
              residential architecture, real estate trends, and interior design philosophy. Our mission is
              to provide insightful, well-researched content that showcases the unique aspects of housing
              in Japan, from traditional concepts to cutting-edge innovations.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              We believe that Japanese approaches to housing offer valuable insights for global audiences.
              Through our articles, we aim to:
            </p>
            <ul>
              <li>Document evolving architectural trends in Japanese residential design</li>
              <li>Analyze real estate market patterns and investment opportunities</li>
              <li>Explore the philosophical underpinnings of Japanese spatial concepts</li>
              <li>Highlight sustainable and innovative housing solutions emerging from Japan</li>
              <li>Celebrate the harmony between tradition and modernity in Japanese homes</li>
            </ul>
            
            <h2>Our Team</h2>
            <p>
              Japan Housing brings together writers, architects, designers, and real estate professionals
              with deep knowledge of Japanese housing. Our contributors combine academic expertise with
              practical experience to provide nuanced perspectives on this fascinating subject.
            </p>
            
            <h2>Editorial Approach</h2>
            <p>
              We are committed to producing high-quality, thoroughly researched content. Our articles
              draw on expert interviews, site visits, market data, and scholarly resources to ensure
              accuracy and depth. We strive to make complex architectural and real estate concepts
              accessible to readers from diverse backgrounds while maintaining intellectual rigor.
            </p>
            
            <h2>Connect With Us</h2>
            <p>
              We welcome feedback, suggestions, and inquiries from our readers. If you have questions
              about Japanese housing or would like to propose a topic for future articles, please don't
              hesitate to reach out to us at <a href="mailto:info@japanhousing.com">info@japanhousing.com</a>.
            </p>
            
            <p>
              Thank you for joining us on this exploration of Japanese housing—we look forward to
              sharing insights and discoveries with you.
            </p>
          </div>
        </div>
      </div>
      <NewsletterSection />
    </>
  );
};

export default About;
