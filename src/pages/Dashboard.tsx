
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, ShoppingCart, Package, CreditCard, LogOut, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: string;
  order_number: string;
  quantity: number;
  total_amount: number;
  payment_status: string;
  order_status: string;
  created_at: string;
}

interface Profile {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchUserData();
    }
  }, [user, loading, navigate]);

  const fetchUserData = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      // Parallel fetch for better performance
      const [profileResponse, ordersResponse] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      ]);

      if (profileResponse.error && profileResponse.error.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileResponse.error);
      } else if (profileResponse.data) {
        setProfile(profileResponse.data);
      }

      if (ordersResponse.error) {
        console.error('Error fetching orders:', ordersResponse.error);
      } else {
        setOrders(ordersResponse.data || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoadingData(false);
    }
  }, [user?.id]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    toast.success('Signed out successfully');
  };

  const formatAmount = useCallback((amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount / 100);
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300';
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300';
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  }, []);

  const orderStats = useMemo(() => {
    const total = orders.length;
    const completed = orders.filter(o => o.order_status === 'completed').length;
    const pending = orders.filter(o => o.order_status === 'pending').length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total_amount, 0);
    
    return { total, completed, pending, totalSpent };
  }, [orders]);

  if (loading || loadingData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto"></div>
            <p className="text-muted-foreground animate-pulse">Loading your dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 p-6 bg-card/50 backdrop-blur-sm rounded-xl border shadow-sm">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {profile?.full_name || user?.email}</p>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="hover:bg-destructive hover:text-destructive-foreground transition-colors">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-primary/10 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold text-foreground">{orderStats.total}</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/10 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-emerald-600">{orderStats.completed}</p>
                  </div>
                  <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/10 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-amber-600">{orderStats.pending}</p>
                  </div>
                  <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/10 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-bold text-foreground">{formatAmount(orderStats.totalSpent)}</p>
                  </div>
                  <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg border-primary/10 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                  <CardTitle className="flex items-center text-foreground">
                    <User className="mr-2 h-5 w-5 text-primary" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-sm">{profile?.full_name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm">{profile?.email || user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-sm">{profile?.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-sm">{profile?.address || 'Not provided'}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/profile')}
                  >
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-6 shadow-lg border-primary/10 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-secondary/5 to-primary/5">
                  <CardTitle className="text-foreground">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start" 
                    onClick={() => navigate('/order')}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Order Magazine
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/')}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Browse Articles
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Orders Section */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-primary/10 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                  <CardTitle className="flex items-center text-foreground">
                    <CreditCard className="mr-2 h-5 w-5 text-primary" />
                    Order History
                  </CardTitle>
                  <CardDescription>
                    Track your magazine orders and payment status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                      <p className="text-gray-500 mb-4">Start by ordering your first magazine copy!</p>
                      <Button onClick={() => navigate('/order')}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Order Now
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">Order #{order.order_number}</h4>
                              <p className="text-sm text-gray-500">
                                {new Date(order.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatAmount(order.total_amount)}</p>
                              <p className="text-sm text-gray-500">Qty: {order.quantity}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={getStatusColor(order.payment_status)}>
                              Payment: {order.payment_status}
                            </Badge>
                            <Badge className={getStatusColor(order.order_status)}>
                              Order: {order.order_status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
