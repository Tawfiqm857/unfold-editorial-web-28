
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { ShoppingCart, Star, Download, Zap } from 'lucide-react';

const ShopPage = () => {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const issues = [
    {
      id: '1',
      title: 'Issue #1 - Youth Entrepreneurship',
      description: 'Special edition featuring Nigeria\'s rising entrepreneurs and innovation ecosystem.',
      price: 25.99,
      digitalPrice: 9.99,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      rating: 4.8,
      inStock: true,
      trending: true,
    },
    {
      id: '2',
      title: 'Issue #2 - Culture & Arts',
      description: 'Exploring the vibrant culture and artistic movements across Africa.',
      price: 25.99,
      digitalPrice: 9.99,
      image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      rating: 4.9,
      inStock: true,
      trending: false,
    },
    {
      id: '3',
      title: 'Issue #3 - Travel & Adventure',
      description: 'Discover hidden gems and travel destinations across the continent.',
      price: 25.99,
      digitalPrice: 9.99,
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      rating: 4.7,
      inStock: false,
      trending: false,
    },
  ];

  const handlePurchase = (issueId: string) => {
    setSelectedIssue(issueId);
    // TODO: Integrate with payment processing
    alert('Payment integration coming soon! This will redirect to checkout.');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              <ShoppingCart className="h-4 w-4" />
              Premium Editions
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Shop Magazine Copies
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Get your hands on premium printed editions or instant digital copies of Unfold Magazine. 
              Feel the quality paper and enjoy the complete reading experience.
            </p>
            
            {/* Shop Type Toggle */}
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <Link to="/shop/online">
                  <Download className="h-5 w-5 mr-2" />
                  Buy Digital Copies
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Physical Copies
              </Button>
            </div>
          </div>

          {/* Issues Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {issues.map((issue) => (
              <Card key={issue.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={issue.image} 
                    alt={issue.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {issue.trending && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      Trending
                    </Badge>
                  )}
                  {!issue.inStock && (
                    <Badge variant="secondary" className="absolute top-3 right-3">
                      Out of Stock
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {issue.title}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-yellow-500 flex-shrink-0 ml-2">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{issue.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">{issue.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Pricing Options */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                        <div>
                          <span className="text-sm font-medium">Physical Copy</span>
                          <p className="text-xs text-muted-foreground">Premium print quality</p>
                        </div>
                        <span className="text-lg font-bold text-foreground">
                          ${issue.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <div>
                          <span className="text-sm font-medium flex items-center gap-1">
                            <Zap className="h-3 w-3 text-primary" />
                            Digital Copy
                          </span>
                          <p className="text-xs text-muted-foreground">Instant download</p>
                        </div>
                        <span className="text-lg font-bold text-primary">
                          ${issue.digitalPrice}
                        </span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        onClick={() => handlePurchase(issue.id)}
                        disabled={!issue.inStock}
                        variant="outline"
                        size="sm"
                        className="transition-all duration-200"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        {issue.inStock ? 'Physical' : 'Sold Out'}
                      </Button>
                      <Button 
                        asChild
                        size="sm"
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200"
                      >
                        <Link to="/shop/online">
                          <Download className="h-4 w-4 mr-1" />
                          Digital
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Subscription Offer */}
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20 mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Subscribe & Save</CardTitle>
              <CardDescription>
                Get every issue delivered to your door and save 30%
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <span className="text-3xl font-bold text-primary">$18.99</span>
                <span className="text-muted-foreground ml-2">per issue</span>
              </div>
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                Start Subscription
              </Button>
            </CardContent>
          </Card>

          {/* Features Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Physical Copies
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Premium paper quality
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Collectible editions
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Free shipping over $50
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  5-7 business days delivery
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-primary/20 bg-primary/5">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  Digital Copies
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Instant download
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Interactive content
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Mobile-friendly reading
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  60% less expensive
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shipping Info */}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">On orders over $50</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Guarantee</h3>
              <p className="text-muted-foreground">Premium paper and printing</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">5-7 business days</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
