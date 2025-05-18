
import { Link } from 'react-router-dom';

interface FeaturedArticleProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  slug: string;
  author: string;
  date: string;
}

const FeaturedArticle = ({
  title,
  excerpt,
  image,
  category,
  slug,
  author,
  date,
}: FeaturedArticleProps) => {
  return (
    <section className="container-xl py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <Link 
            to={`/category/${category.toLowerCase()}`} 
            className="inline-block mb-4 text-sm font-medium uppercase tracking-wider border-b-2 border-primary pb-1 hover:border-muted-foreground/60 transition-colors"
          >
            {category}
          </Link>
          <Link to={`/article/${slug}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium leading-tight mb-6 hover:text-muted-foreground/90 transition-colors">
              {title}
            </h2>
          </Link>
          <p className="text-muted-foreground text-base md:text-lg mb-6 leading-relaxed max-w-2xl">
            {excerpt}
          </p>
          <div className="flex items-center text-sm text-muted-foreground mb-8">
            <span>By {author}</span>
            <span className="mx-2">•</span>
            <time dateTime={date}>{date}</time>
          </div>
          <Link 
            to={`/article/${slug}`}
            className="inline-flex items-center font-medium border-b-2 border-primary pb-1 hover:border-muted-foreground/60 transition-colors"
          >
            Read Article
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </Link>
        </div>
        
        <Link 
          to={`/article/${slug}`}
          className="block w-full h-full overflow-hidden rounded-lg aspect-[4/3]"
          aria-label={title}
        >
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedArticle;
