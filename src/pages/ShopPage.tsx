
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { ShoppingCart, Star } from 'lucide-react';

const ShopPage = () => {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const issues = [
    {
      id: '1',
      title: 'Issue #1 - Youth Entrepreneurship',
      description: 'Special edition featuring Nigeria\'s rising entrepreneurs and innovation ecosystem.',
      price: 25.99,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      rating: 4.8,
      inStock: true,
    },
    {
      id: '2',
      title: 'Issue #2 - Culture & Arts',
      description: 'Exploring the vibrant culture and artistic movements across Africa.',
      price: 25.99,
      image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      rating: 4.9,
      inStock: true,
    },
    {
      id: '3',
      title: 'Issue #3 - Travel & Adventure',
      description: 'Discover hidden gems and travel destinations across the continent.',
      price: 25.99,
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      rating: 4.7,
      inStock: false,
    },
  ];

  const handlePurchase = (issueId: string) => {
    setSelectedIssue(issueId);
    // TODO: Integrate with payment processing
    alert('Payment integration coming soon! This will redirect to checkout.');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Shop Printed Copies
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get your hands on premium printed editions of Unfold Magazine. 
              Feel the quality paper and enjoy the reading experience.
            </p>
          </div>

          {/* Issues Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {issues.map((issue) => (
              <Card key={issue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={issue.image} 
                    alt={issue.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{issue.title}</CardTitle>
                    {!issue.inStock && (
                      <Badge variant="secondary">Out of Stock</Badge>
                    )}
                  </div>
                  <CardDescription>{issue.description}</CardDescription>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                        {issue.rating}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${issue.price}
                    </span>
                    <Button 
                      onClick={() => handlePurchase(issue.id)}
                      disabled={!issue.inStock}
                      className="flex items-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {issue.inStock ? 'Buy Now' : 'Sold Out'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Subscription Offer */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Subscribe & Save</CardTitle>
              <CardDescription className="text-blue-100">
                Get every issue delivered to your door and save 30%
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <span className="text-3xl font-bold">$18.99</span>
                <span className="text-blue-200 ml-2">per issue</span>
              </div>
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Subscription
              </Button>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Free Shipping</h3>
              <p className="text-gray-600 dark:text-gray-400">On orders over $50</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-400">Premium paper and printing</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400">5-7 business days</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
