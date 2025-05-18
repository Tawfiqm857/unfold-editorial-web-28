
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  slug: string;
  author: string;
  date: string;
  featured?: boolean;
  className?: string;
}

const ArticleCard = ({
  title,
  excerpt,
  image,
  category,
  slug,
  author,
  date,
  featured = false,
  className = "",
}: ArticleCardProps) => {
  return (
    <article className={`group ${featured ? 'col-span-full md:grid md:grid-cols-2 md:gap-8' : ''} ${className}`}>
      <Link 
        to={`/article/${slug}`} 
        className="block overflow-hidden rounded-lg mb-4"
        aria-label={title}
      >
        <div className={`relative aspect-[16/9] ${featured ? 'md:h-full' : ''} h-64 overflow-hidden rounded-lg`}>
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-0 left-0 m-4">
            <span className="inline-block bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-medium rounded-full">
              {category}
            </span>
          </div>
        </div>
      </Link>

      <div className={`space-y-2 ${featured ? 'md:py-8' : ''}`}>
        <Link to={`/article/${slug}`}>
          <h3 className={`${featured ? 'text-2xl md:text-3xl' : 'text-xl'} font-serif font-medium hover:text-muted-foreground/90 transition-colors`}>
            {title}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm mt-2">
          By {author} • {date}
        </p>

        {featured && (
          <p className="text-muted-foreground line-clamp-3 mt-4">
            {excerpt}
          </p>
        )}
      </div>
    </article>
  );
};

export default ArticleCard;
