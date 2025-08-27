import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  image: string;
  itemCount?: number;
  className?: string;
  onClick?: () => void;
}

export const CategoryCard = ({
  title,
  image,
  itemCount,
  className,
  onClick
}: CategoryCardProps) => {
  return (
    <Card 
      className={cn(
        "group cursor-pointer hover-float overflow-hidden glass-card border-0 shadow-medium",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-elegant duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-mesh opacity-20 group-hover:opacity-30 transition-elegant" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-primary-glow transition-colors">{title}</h3>
            {itemCount && (
              <p className="text-sm text-white/90 font-medium">{itemCount.toLocaleString()} items</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};