import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div className="group relative overflow-hidden h-72">
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-xl font-bold text-white">{category.name}</h3>
        <p className="text-sm text-white/80 mt-2">{category.articleCount} articles</p>
        <Link href={`/categories/${category.slug}`} className="mt-3 inline-flex items-center text-white hover:text-accent">
          Explore
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
