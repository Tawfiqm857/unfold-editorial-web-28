
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ShoppingCart, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const OrderPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    quantity: 1,
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'Nigeria'
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    // Pre-fill form with user profile data
    if (user) {
      fetchUserProfile();
    }
  }, [user, loading, navigate]);

  const fetchUserProfile = async () => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single();

    if (profile) {
      setFormData(prev => ({
        ...prev,
        fullName: profile.full_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        country: profile.country || 'Nigeria'
      }));
    }
  };

  const magazinePrice = 2500; // ₦25.00 in kobo

  const calculateTotal = () => {
    return formData.quantity * magazinePrice;
  };

  const handleInputChange = (name: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const total = calculateTotal();
      const orderNumber = `UNF-${Date.now()}`;

      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          order_number: orderNumber,
          quantity: formData.quantity,
          total_amount: total,
          delivery_address: {
            full_name: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            country: formData.country
          }
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // Create payment session
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment', {
        body: {
          orderId: order.id,
          amount: total,
          currency: 'NGN',
          orderNumber: orderNumber
        }
      });

      if (paymentError) {
        throw paymentError;
      }

      // Redirect to Stripe Checkout
      if (paymentData?.url) {
        window.open(paymentData.url, '_blank');
        navigate('/dashboard');
        toast.success('Order created! Complete payment in the new tab.');
      }

    } catch (error: any) {
      console.error('Error creating order:', error);
      setError(error.message || 'Failed to create order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Magazine</h1>
            <p className="text-gray-600">Get your printed copy of Urban Nomad Freaks magazine delivered to your doorstep</p>
          </div>

          <div className="grid gap-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center py-4">
                  <div>
                    <h3 className="font-medium">Urban Nomad Freaks Magazine (Printed)</h3>
                    <p className="text-sm text-gray-500">Latest issue with premium print quality</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₦{(magazinePrice / 100).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">per copy</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total: </span>
                    <span>₦{(calculateTotal() / 100).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Delivery Information
                </CardTitle>
                <CardDescription>
                  Please provide your delivery address for shipping
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Select 
                        value={formData.quantity.toString()} 
                        onValueChange={(value) => handleInputChange('quantity', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'copy' : 'copies'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                        placeholder="Enter your city"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                      placeholder="Enter your complete delivery address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        required
                        placeholder="Enter your state"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select 
                        value={formData.country} 
                        onValueChange={(value) => handleInputChange('country', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nigeria">Nigeria</SelectItem>
                          <SelectItem value="Ghana">Ghana</SelectItem>
                          <SelectItem value="Kenya">Kenya</SelectItem>
                          <SelectItem value="South Africa">South Africa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {error && (
                    <Alert>
                      <AlertDescription className="text-red-600">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Proceed to Payment (₦{(calculateTotal() / 100).toFixed(2)})
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderPage;
