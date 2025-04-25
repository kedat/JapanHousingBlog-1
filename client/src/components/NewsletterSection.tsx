import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      // In a real implementation, you would send this to a newsletter service
      toast({
        title: "Thank you for subscribing!",
        description: "You've successfully subscribed to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 px-6 bg-primary text-white">
      <div className="container max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated on Japanese Housing Trends</h2>
        <p className="mb-8 text-white/80">
          Join our newsletter to receive the latest insights on Japanese architecture, real estate markets, and design innovations.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-3 text-text focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-accent text-white font-medium hover:bg-accent/90 transition duration-300"
          >
            Subscribe
          </button>
        </form>
        
        <p className="mt-4 text-sm text-white/60">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </section>
  );
};

export default NewsletterSection;
