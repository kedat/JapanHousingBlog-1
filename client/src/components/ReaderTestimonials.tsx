import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { animated, useSpring } from "react-spring";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Japan Housing's insights helped me find my dream apartment in Shibuya. Their neighborhood guides are incredibly detailed and accurate.",
    name: "Sarah Johnson",
    title: "Expat in Tokyo",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    quote: "As a real estate investor, I've found their market analysis and trend forecasts to be spot-on. I've made several successful investments based on their advice.",
    name: "David Chen",
    title: "Property Investor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    quote: "Their articles about traditional Japanese design elements have been invaluable for renovating my Kyoto machiya. The content is both practical and inspiring.",
    name: "Emma Tanaka",
    title: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80"
  }
];

const ReaderTestimonials = () => {
  const [flipped, setFlipped] = useState<number | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial, index: number }) => {
    const isFlipped = flipped === index;
    
    const { transform, opacity } = useSpring({
      opacity: isFlipped ? 1 : 0,
      transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
      config: { mass: 5, tension: 500, friction: 80 }
    });
    
    const handleClick = () => {
      setFlipped(isFlipped ? null : index);
    };
    
    const springProps = useSpring({
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(50px)',
      delay: index * 150,
      config: { mass: 1, tension: 280, friction: 60 }
    });
    
    return (
      <animated.div 
        style={springProps}
        className="h-full"
      >
        <div 
          className="relative bg-white border border-secondary rounded-lg shadow-lg h-full cursor-pointer overflow-hidden" 
          onClick={handleClick}
          style={{ perspective: '1000px' }}
        >
          {/* Front Side */}
          <animated.div
            style={{
              opacity: opacity.to(o => 1 - o),
              transform,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="flex flex-col items-center mb-6 text-center">
              <div className="mb-4 w-24 h-24 rounded-full border-4 border-secondary overflow-hidden shadow-md">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary">{testimonial.name}</h3>
                <p className="text-sm text-text/80">{testimonial.title}</p>
              </div>
            </div>
            <div className="relative mb-6 px-4">
              <span className="absolute top-0 left-0 text-6xl text-accent/10">"</span>
              <p className="text-text italic relative z-10 pt-4 px-4">
                {testimonial.quote.substring(0, 100)}...
              </p>
              <span className="absolute bottom-0 right-0 text-6xl text-accent/10">"</span>
            </div>
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium hover:bg-accent/20 transition-colors">
                Click to read more
              </span>
            </div>
          </animated.div>
          
          {/* Back Side */}
          <animated.div
            style={{
              opacity,
              transform: transform.to(t => `${t} rotateY(180deg)`),
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(135deg, #ffffff, #f8f8f8)'
            }}
          >
            <div className="relative mb-6 px-4">
              <span className="absolute top-0 left-0 text-6xl text-accent/10">"</span>
              <p className="text-text italic relative z-10 pt-6 px-4">
                {testimonial.quote}
              </p>
              <span className="absolute bottom-0 right-0 text-6xl text-accent/10">"</span>
            </div>
            <div className="mt-6 text-center">
              <h3 className="font-bold text-lg text-primary">{testimonial.name}</h3>
              <p className="text-sm text-text/80 mb-4">{testimonial.title}</p>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                Click to flip back
              </span>
            </div>
          </animated.div>
        </div>
      </animated.div>
    );
  };
  
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 bg-accent/10 text-accent rounded-full text-sm font-medium">Testimonials</span>
          <h2 className="text-4xl font-bold text-primary mb-6">What Our Readers Say</h2>
          <p className="max-w-2xl mx-auto text-text">
            Discover how our content has helped people navigate Japanese real estate and find their ideal homes.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 z-0"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 translate-x-1/4 translate-y-1/4 rounded-full bg-primary/5 z-0"></div>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReaderTestimonials;