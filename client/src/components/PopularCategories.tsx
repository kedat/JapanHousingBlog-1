import { useState } from "react";
import { Link } from "wouter";
import { Player } from "@lottiefiles/react-lottie-player";

// Lottie animations for categories
const categoryAnimations = [
  {
    name: "Buying a Home",
    slug: "buying-home",
    animation: "https://assets10.lottiefiles.com/packages/lf20_kcsr6fcp.json" // House animation
  },
  {
    name: "Renting in Japan",
    slug: "renting-japan",
    animation: "https://assets10.lottiefiles.com/packages/lf20_7fwvvesa.json" // Key animation
  },
  {
    name: "Traditions & Design",
    slug: "traditions-design",
    animation: "https://assets10.lottiefiles.com/packages/lf20_sz096dsg.json" // Decor animation
  },
  {
    name: "Urban Living",
    slug: "urban-living",
    animation: "https://assets10.lottiefiles.com/packages/lf20_ve0glnwy.json" // City animation
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
              className="block bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden text-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="h-32 flex items-center justify-center bg-secondary/10 p-4">
                <Player
                  autoplay={hoveredIndex === index}
                  loop={hoveredIndex === index}
                  src={category.animation}
                  style={{ height: '100px', width: '100px' }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg text-primary">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;