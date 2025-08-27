import { motion } from "framer-motion";
import { CategoryCard } from "@/components/ui/category-card";
import { ChevronRight } from "lucide-react";

interface Category {
  id: string;
  title: string;
  image: string;
  itemCount: number;
}

interface CategoryGridProps {
  categories: Category[];
  onCategoryClick: (categoryId: string) => void;
}

export const CategoryGrid = ({ categories, onCategoryClick }: CategoryGridProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 glass-premium px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Curated Collections
          </motion.div>

          <motion.h2 
            className="font-display text-3xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Shop by Category
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Discover thousands of products across our carefully curated categories, from fashion to tech and everything in between
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-card shadow-card hover:shadow-premium transition-spring">
                <CategoryCard
                  title={category.title}
                  image={category.image}
                  itemCount={category.itemCount}
                  onClick={() => onCategoryClick(category.id)}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth rounded-2xl">
                  <div className="absolute bottom-4 right-4">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge for Popular Categories */}
              {index < 3 && (
                <motion.div
                  className="absolute -top-2 -right-2 z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-large">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* View All Categories Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="inline-flex items-center gap-2 glass-premium px-6 py-3 rounded-full font-medium hover:shadow-glow transition-spring hover:scale-105"
            whileHover={{ x: 5 }}
          >
            View All Categories
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};