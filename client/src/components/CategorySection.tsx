import CategoryCard from "./CategoryCard";
import { Category } from "@/data/categories";

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection = ({ categories }: CategorySectionProps) => {
  return (
    <section className="py-16 px-6">
      <div className="container">
        <h2 className="text-3xl font-bold text-primary mb-12">Browse by Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
