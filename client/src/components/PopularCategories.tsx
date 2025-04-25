import { useState } from "react";
import { Link } from "wouter";
import { Player } from "@lottiefiles/react-lottie-player";

// Lottie animations for categories
const categoryAnimations = [
  {
    name: "Buying a Home",
    slug: "buying-home",
    animation: "https://assets10.lottiefiles.com/packages/lf20_kcsr6fcp.json", // House animation
    icon: "🏠",
    description: "Expert tips for purchasing property in Japan"
  },
  {
    name: "Renting in Japan",
    slug: "renting-japan",
    animation: "https://assets10.lottiefiles.com/packages/lf20_7fwvvesa.json", // Key animation
    icon: "🔑",
    description: "Navigate the Japanese rental market with confidence"
  },
  {
    name: "Traditions & Design",
    slug: "traditions-design",
    animation: "https://assets10.lottiefiles.com/packages/lf20_sz096dsg.json", // Decor animation
    icon: "🎎",
    description: "Blend modern living with traditional Japanese aesthetics"
  },
  {
    name: "Urban Living",
    slug: "urban-living",
    animation: "https://assets10.lottiefiles.com/packages/lf20_ve0glnwy.json", // City animation
    icon: "🏙️",
    description: "Making the most of city life in Japan's urban centers"
  }
];

const PopularCategories = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <section className="py-16 px-6 bg-secondary/5">
      <div className="container">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Popular Categories</h2>
        <p className="text-center max-w-2xl mx-auto mb-12 text-text">
          Explore our most popular content categories covering everything from buying property to understanding traditional Japanese design elements.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoryAnimations.map((category, index) => (
            <Link 
              key={category.slug} 
              href={`/categories/${category.slug}`}
              className="block bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden text-center group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-40 flex items-center justify-center bg-secondary/10 p-4 group-hover:bg-primary/5 transition-all duration-300">
                {/* Large icon in background */}
                <span className="absolute text-8xl opacity-5 transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2">
                  {category.icon}
                </span>
                <Player
                  autoplay={hoveredIndex === index}
                  loop={hoveredIndex === index}
                  src={category.animation}
                  style={{ height: '100px', width: '100px' }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-xl">{category.icon}</span>
                  <h3 className="font-medium text-lg text-primary">{category.name}</h3>
                </div>
                <p className="text-sm text-text/70 mt-2">{category.description}</p>
                <div className="mt-4 inline-block px-4 py-1 border border-accent/20 text-accent rounded-full text-xs font-medium hover:bg-accent/5 transition-colors">
                  Explore
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;