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
          className="relative bg-white rounded-lg shadow-md h-full cursor-pointer" 
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
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="flex items-center mb-4">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="ml-4">
                <h3 className="font-bold text-primary">{testimonial.name}</h3>
                <p className="text-sm text-text">{testimonial.title}</p>
              </div>
            </div>
            <p className="text-text italic mb-2">"{testimonial.quote.substring(0, 100)}..."</p>
            <p className="text-accent text-sm">Click to read more</p>
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
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backfaceVisibility: 'hidden'
            }}
          >
            <p className="text-text italic">"{testimonial.quote}"</p>
            <div className="mt-4 text-right">
              <h3 className="font-bold text-primary">{testimonial.name}</h3>
              <p className="text-sm text-text">{testimonial.title}</p>
            </div>
            <p className="text-accent text-sm mt-4">Click to flip back</p>
          </animated.div>
        </div>
      </animated.div>
    );
  };
  
  return (
    <section className="py-16 px-6">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">What Our Readers Say</h2>
          <p className="max-w-2xl mx-auto text-text">
            Discover how our content has helped people navigate Japanese real estate and find their ideal homes.
          </p>
        </div>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
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