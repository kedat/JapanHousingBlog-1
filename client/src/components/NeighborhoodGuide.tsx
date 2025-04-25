import { useRef } from "react";
import Slider from "react-slick";
import { useSpring, animated } from "react-spring";
import { Link } from "wouter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Neighborhood {
  name: string;
  description: string;
  image: string;
  slug: string;
}

const neighborhoods: Neighborhood[] = [
  {
    name: "Tokyo",
    description: "Explore the modern and traditional neighborhoods of Japan's bustling capital.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80",
    slug: "tokyo"
  },
  {
    name: "Kyoto",
    description: "Discover the ancient capital's traditional architecture and serene temples.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80",
    slug: "kyoto"
  },
  {
    name: "Osaka",
    description: "Experience the vibrant culture and unique residential areas of Japan's kitchen.",
    image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80",
    slug: "osaka"
  },
  {
    name: "Sapporo",
    description: "Discover northern Japan's largest city with its distinctive architecture built for snowy winters.",
    image: "https://images.unsplash.com/photo-1548189797-59050cd573d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80",
    slug: "sapporo"
  },
  {
    name: "Fukuoka",
    description: "Explore this growing city known for its blend of urban waterfront living and traditional elements.",
    image: "https://images.unsplash.com/photo-1627503536343-7d577ecf785f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80",
    slug: "fukuoka"
  }
];

const NeighborhoodGuide = () => {
  const sliderRef = useRef<Slider>(null);
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
  
  const NeighborhoodCard = ({ neighborhood, index }: { neighborhood: Neighborhood, index: number }) => {
    const [{ transform }, api] = useSpring(() => ({
      transform: "translateY(0px)",
      config: { mass: 1, tension: 170, friction: 26 }
    }));
    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY, currentTarget } = e;
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      api.start({
        transform: `translateY(${y * -10}px) translateX(${x * -10}px)`,
      });
    };
    
    const handleMouseLeave = () => {
      api.start({
        transform: "translateY(0px) translateX(0px)",
      });
    };
    
    return (
      <div 
        className="relative h-96 rounded-lg overflow-hidden cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <animated.div 
          className="absolute inset-0"
          style={{ transform }}
        >
          <img 
            src={neighborhood.image} 
            alt={neighborhood.name}
            className="w-full h-full object-cover"
          />
        </animated.div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{neighborhood.name}</h3>
          <p className="mb-4">{neighborhood.description}</p>
          <Link 
            href={`/neighborhood/${neighborhood.slug}`}
            className="inline-block px-4 py-2 bg-white text-primary font-medium rounded-sm hover:bg-white/90 transition duration-300"
          >
            Explore Guide
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 px-6">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Neighborhood Guides</h2>
          <p className="max-w-2xl mx-auto text-text">
            Discover Japan's diverse neighborhoods and find the perfect area for your lifestyle and preferences.
          </p>
        </div>
        
        <div className="relative">
          <Slider ref={sliderRef} {...sliderSettings}>
            {neighborhoods.map((neighborhood, index) => (
              <div key={neighborhood.slug} className="px-2">
                <NeighborhoodCard neighborhood={neighborhood} index={index} />
              </div>
            ))}
          </Slider>
          
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
            <button 
              onClick={() => sliderRef.current?.slickPrev()}
              className="w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center shadow-md focus:outline-none"
              aria-label="Previous slide"
            >
              ←
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
            <button 
              onClick={() => sliderRef.current?.slickNext()}
              className="w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center shadow-md focus:outline-none"
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodGuide;