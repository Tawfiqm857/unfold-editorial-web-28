
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ArticleCard from '@/components/ArticleCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { getMagazineArticleBySlug, magazineArticles } from '@/utils/magazineContent';
import { ExternalLink, MapPin, Calendar, BookOpen, Users } from 'lucide-react';

interface Author {
  id: string;
  name: string;
  bio: string | null;
  profile_image_url: string | null;
  website_url: string | null;
  social_links: any;
}

const AuthorPortfolioPage = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock author data for demonstration (replace with actual data fetching)
  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      
      // For demo purposes, I'll create mock author data based on existing article authors
      const mockAuthors: { [key: string]: Author } = {
        'merit-ikechikwu': {
          id: 'merit-ikechikwu',
          name: 'Merit Ikechikwu',
          bio: 'A passionate writer and entrepreneur focusing on youth empowerment and business innovation across Africa. Merit has been covering entrepreneurship stories for over 5 years and has interviewed hundreds of young entrepreneurs.',
          profile_image_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
          website_url: 'https://meritikechikwu.com',
          social_links: {
            twitter: '@meritikechikwu',
            linkedin: 'merit-ikechikwu',
            instagram: '@merit.writes'
          }
        },
        'bashir-suleiman': {
          id: 'bashir-suleiman',
          name: 'Bashir Suleiman',
          bio: 'Cultural critic and fashion journalist with a keen eye for emerging trends and movements. Bashir explores the intersection of fashion, culture, and social impact, bringing unique perspectives to contemporary style narratives.',
          profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
          website_url: 'https://bashirsuleiman.com',
          social_links: {
            twitter: '@bashir_suleiman',
            linkedin: 'bashir-suleiman',
            instagram: '@bashir.style'
          }
        },
        'shahid-abdullahi': {
          id: 'shahid-abdullahi',
          name: 'Shahid Abdullahi',
          bio: 'Music journalist and cultural commentator specializing in Afrobeats and African music. Shahid has covered major music festivals across Africa and interviewed top artists in the industry.',
          profile_image_url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
          website_url: 'https://shahidabdullahi.com',
          social_links: {
            twitter: '@shahid_abdullahi',
            linkedin: 'shahid-abdullahi',
            soundcloud: 'shahid-music'
          }
        },
        'rosa-aguado': {
          id: 'rosa-aguado',
          name: 'Rosa Aguado',
          bio: 'Travel writer and adventure photographer with extensive experience exploring hidden gems across Africa. Rosa combines stunning photography with compelling storytelling to showcase unique destinations.',
          profile_image_url: 'https://images.unsplash.com/photo-1521252659862-eec69941b071?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
          website_url: 'https://rosaaguado.com',
          social_links: {
            twitter: '@rosa_aguado',
            instagram: '@rosa.travels',
            website: 'rosaaguado.photography'
          }
        },
        'aaron-ahmadu': {
          id: 'aaron-ahmadu',
          name: 'Aaron Ahmadu',
          bio: 'Technology writer and startup ecosystem analyst focusing on emerging markets and innovation in Africa. Aaron covers the intersection of technology, entrepreneurship, and social impact.',
          profile_image_url: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
          website_url: 'https://aaronahmadu.com',
          social_links: {
            twitter: '@aaron_ahmadu',
            linkedin: 'aaron-ahmadu',
            medium: '@aaron.ahmadu'
          }
        }
      };

      if (authorId && mockAuthors[authorId]) {
        setAuthor(mockAuthors[authorId]);
      }
      
      setLoading(false);
    };

    fetchAuthor();
  }, [authorId]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
              <div className="md:col-span-2">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!author) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Author Not Found</h1>
          <p className="text-muted-foreground">The author you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  // Get articles by this author (simplified logic for demo)
  const authorArticles = magazineArticles.filter(article => 
    article.author.toLowerCase().replace(/\s+/g, '-') === authorId
  );

  const stats = {
    articlesPublished: authorArticles.length,
    totalReads: authorArticles.length * 1200, // Mock data
    yearsActive: 3,
    specialties: ['Entrepreneurship', 'Culture', 'Innovation']
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Author Image */}
              <div className="md:col-span-1">
                <div className="relative">
                  <img
                    src={author.profile_image_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'}
                    alt={author.name}
                    className="w-full aspect-square object-cover rounded-2xl shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10"></div>
                </div>
              </div>

              {/* Author Info */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                      {author.name}
                    </h1>
                    <Badge variant="secondary" className="hidden md:inline-flex">
                      <Users className="h-3 w-3 mr-1" />
                      Writer
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">Nigeria</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{stats.yearsActive} years active</span>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {author.bio}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-3">
                  {author.website_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={author.website_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Website
                      </a>
                    </Button>
                  )}
                  {author.social_links && Object.entries(author.social_links).map(([platform, handle]) => (
                    <Button key={platform} variant="outline" size="sm">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </Button>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="text-center p-4">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {stats.articlesPublished}
                      </div>
                      <div className="text-sm text-muted-foreground">Articles</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-4">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {(stats.totalReads / 1000).toFixed(1)}K
                      </div>
                      <div className="text-sm text-muted-foreground">Reads</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-4">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {stats.yearsActive}
                      </div>
                      <div className="text-sm text-muted-foreground">Years</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="container mx-auto px-4 py-16">
          {/* Specialties */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Areas of Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {stats.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="mb-12" />

          {/* Published Articles */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-semibold">
                Published Articles ({authorArticles.length})
              </h2>
            </div>

            {authorArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {authorArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    excerpt={article.excerpt}
                    image={article.image}
                    category={article.category}
                    slug={article.slug}
                    author={article.author}
                    date={article.date}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Articles Yet</h3>
                <p className="text-muted-foreground">
                  This author hasn't published any articles yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthorPortfolioPage;
