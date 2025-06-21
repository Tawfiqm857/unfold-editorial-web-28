
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CreditCard, Download, Star, Zap } from 'lucide-react';

const OnlineShopPage = () => {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const digitalIssues = [
    {
      id: 'digital-1',
      title: 'Issue #1 - Youth Entrepreneurship',
      description: 'Special edition featuring Nigeria\'s rising entrepreneurs and innovation ecosystem. Digital PDF format.',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      features: ['High-quality PDF', 'Mobile-friendly', 'Instant download', 'Exclusive content'],
      trending: true,
    },
    {
      id: 'digital-2',
      title: 'Issue #2 - Culture & Arts',
      description: 'Exploring the vibrant culture and artistic movements across Africa. Interactive digital edition.',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      features: ['Interactive content', 'Embedded videos', 'Audio narration', 'Bonus interviews'],
      trending: false,
    },
    {
      id: 'digital-3',
      title: 'Issue #3 - Travel & Adventure',
      description: 'Discover hidden gems and travel destinations across the continent. Multimedia experience.',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      features: ['360° photos', 'Interactive maps', 'Travel guides', 'Local recommendations'],
      trending: false,
    },
  ];

  const handlePurchase = async (issueId: string, price: number) => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to purchase digital magazines.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    if (!cardNumber || !expiryDate || !cvv || !cardName) {
      toast({
        title: "Payment Information Required",
        description: "Please fill in all payment details.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing (replace with actual payment integration)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Record the purchase in the database
      const { error } = await supabase
        .from('purchases')
        .insert({
          user_id: user.id,
          magazine_issue: issueId,
          price: price,
          payment_status: 'completed',
          payment_id: `pay_${Date.now()}`
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Purchase Successful!",
        description: "Your digital magazine is ready for download. Check your email for the download link.",
      });

      // Reset form
      setSelectedIssue(null);
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setCardName('');

    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Zap className="h-4 w-4" />
              Digital Edition
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Buy Digital Copies
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant access to our premium digital magazines. 
              Read anywhere, anytime with enhanced interactive features.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Issues Grid */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {digitalIssues.map((issue) => (
                  <Card 
                    key={issue.id} 
                    className={`overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group ${
                      selectedIssue === issue.id ? 'ring-2 ring-primary shadow-xl' : ''
                    }`}
                    onClick={() => setSelectedIssue(issue.id)}
                  >
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-medium">Click to select</p>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                          {issue.title}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-yellow-500 flex-shrink-0 ml-2">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">{issue.rating}</span>
                        </div>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {issue.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {issue.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {issue.features.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{issue.features.length - 2} more
                            </Badge>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-primary">
                            ${issue.price}
                          </span>
                          <Button 
                            size="sm"
                            variant={selectedIssue === issue.id ? "default" : "outline"}
                            className="transition-all duration-200"
                          >
                            {selectedIssue === issue.id ? "Selected" : "Select"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Checkout Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="backdrop-blur-sm bg-card/95 shadow-xl border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Checkout
                    </CardTitle>
                    <CardDescription>
                      Complete your purchase to get instant access
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedIssue ? (
                      <>
                        {/* Selected Issue Summary */}
                        <div className="p-4 bg-accent/50 rounded-lg">
                          <h4 className="font-semibold mb-2">Selected Issue</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {digitalIssues.find(i => i.id === selectedIssue)?.title}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Digital Copy</span>
                            <span className="font-semibold">
                              ${digitalIssues.find(i => i.id === selectedIssue)?.price}
                            </span>
                          </div>
                        </div>

                        <Separator />

                        {/* Payment Form */}
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="cardName">Cardholder Name</Label>
                            <Input
                              id="cardName"
                              placeholder="John Doe"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                              maxLength={19}
                              className="mt-1"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="expiryDate">Expiry Date</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                                maxLength={5}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                                maxLength={3}
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Total and Purchase Button */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Total</span>
                            <span className="text-primary">
                              ${digitalIssues.find(i => i.id === selectedIssue)?.price}
                            </span>
                          </div>
                          
                          <Button 
                            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200"
                            onClick={() => {
                              const issue = digitalIssues.find(i => i.id === selectedIssue);
                              if (issue) handlePurchase(issue.id, issue.price);
                            }}
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Processing...
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4 mr-2" />
                                Complete Purchase
                              </>
                            )}
                          </Button>
                        </div>

                        {/* Security Notice */}
                        <div className="text-xs text-muted-foreground text-center">
                          🔒 Your payment information is secure and encrypted
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">
                          Select a digital issue to continue
                        </p>
                        <div className="text-sm text-muted-foreground">
                          <p>✓ Instant download</p>
                          <p>✓ High-quality PDF</p>
                          <p>✓ Mobile-friendly</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Access</h3>
              <p className="text-muted-foreground">
                Download immediately after purchase and start reading right away
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Enhanced Experience</h3>
              <p className="text-muted-foreground">
                Interactive content, embedded media, and premium features
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">
                Safe and encrypted transactions with instant confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OnlineShopPage;
