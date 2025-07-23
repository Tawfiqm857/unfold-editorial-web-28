// Mock data and state management
class DashboardApp {
    constructor() {
        this.user = null;
        this.profile = null;
        this.orders = [];
        this.isLoading = true;
        
        this.init();
    }

    init() {
        // Simulate loading time with progress
        this.showLoadingProgress();
        setTimeout(() => {
            this.loadMockData();
            this.hideLoading();
            this.render();
            this.bindEvents();
        }, 800);
    }

    showLoadingProgress() {
        const loadingText = document.querySelector('.loading-content p');
        const messages = [
            'Loading your dashboard...',
            'Fetching your orders...',
            'Preparing your data...',
            'Almost ready...'
        ];
        
        let index = 0;
        const interval = setInterval(() => {
            if (index < messages.length) {
                loadingText.textContent = messages[index];
                index++;
            } else {
                clearInterval(interval);
            }
        }, 200);
    }

    loadMockData() {
        // Mock user data
        this.user = {
            id: '1',
            email: 'user@example.com'
        };

        // Mock profile data
        this.profile = {
            full_name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+234 801 234 5678',
            address: '123 Magazine Street, Lagos',
            city: 'Lagos',
            state: 'Lagos State',
            country: 'Nigeria'
        };

        // Mock orders data
        this.orders = [
            {
                id: '1',
                order_number: 'MAG-2024-001',
                quantity: 2,
                total_amount: 500000, // in kobo (₦5,000)
                payment_status: 'paid',
                order_status: 'completed',
                created_at: '2024-01-15T10:30:00Z'
            },
            {
                id: '2',
                order_number: 'MAG-2024-002',
                quantity: 1,
                total_amount: 250000, // in kobo (₦2,500)
                payment_status: 'paid',
                order_status: 'pending',
                created_at: '2024-01-20T14:15:00Z'
            },
            {
                id: '3',
                order_number: 'MAG-2024-003',
                quantity: 3,
                total_amount: 750000, // in kobo (₦7,500)
                payment_status: 'pending',
                order_status: 'pending',
                created_at: '2024-01-25T09:45:00Z'
            }
        ];
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loading');
        const dashboard = document.getElementById('dashboard');
        
        loadingScreen.style.display = 'none';
        dashboard.classList.remove('hidden');
        dashboard.classList.add('fade-in');
    }

    render() {
        this.renderHeader();
        this.renderStats();
        this.renderProfile();
        this.renderOrders();
    }

    renderHeader() {
        const userName = document.getElementById('user-name');
        userName.textContent = this.profile?.full_name || this.user?.email || 'User';
    }

    renderStats() {
        const stats = this.calculateStats();
        
        // Animate counter updates
        this.animateCounter('total-orders', stats.total);
        this.animateCounter('completed-orders', stats.completed);
        this.animateCounter('pending-orders', stats.pending);
        
        document.getElementById('total-spent').textContent = this.formatAmount(stats.totalSpent);
        
        // Update trends
        document.getElementById('total-trend').textContent = `+${Math.round(Math.random() * 15)}% from last month`;
        document.getElementById('completed-trend').textContent = `${Math.round((stats.completed / stats.total) * 100)}% completion rate`;
        document.getElementById('pending-trend').textContent = `Processing time: ${2 + Math.round(Math.random())} days`;
        document.getElementById('revenue-trend').textContent = `+${Math.round(Math.random() * 25)}% this month`;
    }

    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        const startValue = 0;
        const duration = 1000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * this.easeOutCubic(progress));
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    renderProfile() {
        document.getElementById('profile-name').textContent = this.profile?.full_name || 'Not provided';
        document.getElementById('profile-email').textContent = this.profile?.email || this.user?.email || 'Not provided';
        document.getElementById('profile-phone').textContent = this.profile?.phone || 'Not provided';
        document.getElementById('profile-address').textContent = this.profile?.address || 'Not provided';
    }

    renderOrders(filteredOrders = null) {
        const ordersList = document.getElementById('orders-list');
        const emptyState = document.getElementById('empty-orders');
        const ordersToShow = filteredOrders || this.orders;

        // Update summary
        this.updateOrdersSummary(ordersToShow);

        if (ordersToShow.length === 0) {
            ordersList.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        ordersList.style.display = 'block';
        ordersList.classList.add('show');

        const ordersHTML = ordersToShow.map((order, index) => `
            <div class="order-item" style="animation-delay: ${index * 100}ms">
                <div class="order-header">
                    <div class="order-info">
                        <h4>Order #${order.order_number}</h4>
                        <p class="order-date">${this.formatDate(order.created_at)}</p>
                    </div>
                    <div class="order-amount">
                        <p>${this.formatAmount(order.total_amount)}</p>
                        <p>Qty: ${order.quantity}</p>
                    </div>
                </div>
                <div class="order-badges">
                    <span class="badge ${this.getStatusClass(order.payment_status)}">
                        <i class="fas ${this.getStatusIcon(order.payment_status)}"></i>
                        Payment: ${this.capitalize(order.payment_status)}
                    </span>
                    <span class="badge ${this.getStatusClass(order.order_status)}">
                        <i class="fas ${this.getStatusIcon(order.order_status)}"></i>
                        Order: ${this.capitalize(order.order_status)}
                    </span>
                </div>
            </div>
        `).join('');

        ordersList.innerHTML = ordersHTML;
    }

    updateOrdersSummary(orders) {
        document.getElementById('orders-count').textContent = orders.length;
        
        if (orders.length > 0) {
            const lastOrder = orders.reduce((latest, order) => {
                return new Date(order.created_at) > new Date(latest.created_at) ? order : latest;
            });
            document.getElementById('last-order-date').textContent = this.formatDate(lastOrder.created_at);
        } else {
            document.getElementById('last-order-date').textContent = 'Never';
        }
    }

    calculateStats() {
        const total = this.orders.length;
        const completed = this.orders.filter(o => o.order_status === 'completed').length;
        const pending = this.orders.filter(o => o.order_status === 'pending').length;
        const totalSpent = this.orders.reduce((sum, order) => sum + order.total_amount, 0);
        
        return { total, completed, pending, totalSpent };
    }

    formatAmount(amount) {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
        }).format(amount / 100);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    getStatusClass(status) {
        switch (status) {
            case 'paid':
            case 'completed':
                return 'badge-success';
            case 'pending':
                return 'badge-warning';
            case 'failed':
            case 'cancelled':
                return 'badge-error';
            default:
                return 'badge-default';
        }
    }

    getStatusIcon(status) {
        switch (status) {
            case 'paid':
            case 'completed':
                return 'fa-check-circle';
            case 'pending':
                return 'fa-clock';
            case 'failed':
            case 'cancelled':
                return 'fa-times-circle';
            default:
                return 'fa-info-circle';
        }
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    bindEvents() {
        // Sign out button
        document.getElementById('sign-out-btn').addEventListener('click', () => {
            this.signOut();
        });

        // Search functionality
        document.getElementById('order-search').addEventListener('input', (e) => {
            this.filterOrders(e.target.value, document.getElementById('order-filter').value);
        });

        // Filter functionality
        document.getElementById('order-filter').addEventListener('change', (e) => {
            this.filterOrders(document.getElementById('order-search').value, e.target.value);
        });

        // Stat card animations
        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('click', () => {
                this.showStatDetails(card.dataset.stat);
            });
        });

        // Quick action buttons
        document.querySelectorAll('.btn').forEach(btn => {
            if (btn.textContent.includes('Order Magazine') || btn.textContent.includes('Order Now')) {
                btn.addEventListener('click', () => {
                    this.navigateToOrder();
                });
            }
            if (btn.textContent.includes('Browse Articles')) {
                btn.addEventListener('click', () => {
                    this.navigateToArticles();
                });
            }
            if (btn.textContent.includes('Edit Profile')) {
                btn.addEventListener('click', () => {
                    this.navigateToProfile();
                });
            }
        });
    }

    filterOrders(searchTerm, status) {
        let filteredOrders = this.orders;

        // Filter by search term
        if (searchTerm) {
            filteredOrders = filteredOrders.filter(order => 
                order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                this.formatDate(order.created_at).toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (status && status !== 'all') {
            filteredOrders = filteredOrders.filter(order => 
                order.order_status === status || order.payment_status === status
            );
        }

        this.renderOrders(filteredOrders);
    }

    showStatDetails(statType) {
        const stats = this.calculateStats();
        let message = '';
        
        switch (statType) {
            case 'total':
                message = `You have placed ${stats.total} orders in total.`;
                break;
            case 'completed':
                message = `${stats.completed} of your orders have been completed successfully.`;
                break;
            case 'pending':
                message = `${stats.pending} orders are currently being processed.`;
                break;
            case 'revenue':
                message = `You have spent ${this.formatAmount(stats.totalSpent)} on magazine orders.`;
                break;
        }
        
        this.showToast(message, 'info');
    }

    signOut() {
        if (confirm('Are you sure you want to sign out?')) {
            // Clear user data
            this.user = null;
            this.profile = null;
            this.orders = [];
            
            // Show success message
            this.showToast('Signed out successfully', 'success');
            
            // Redirect to login or home page
            setTimeout(() => {
                window.location.href = 'index.html'; // or your login page
            }, 1000);
        }
    }

    navigateToOrder() {
        // Navigate to order page
        window.location.href = 'order.html';
    }

    navigateToArticles() {
        // Navigate to articles/home page
        window.location.href = 'index.html';
    }

    navigateToProfile() {
        // Navigate to profile page
        window.location.href = 'profile.html';
    }

    showToast(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Style the toast
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'all 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            success: '#059669',
            error: '#dc2626',
            warning: '#d97706',
            info: '#667eea'
        };
        toast.style.backgroundColor = colors[type] || colors.info;

        // Add to DOM
        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Method to refresh data (can be called externally)
    refreshData() {
        this.loadMockData();
        this.render();
    }

    // Method to update profile (can be called from profile page)
    updateProfile(newProfile) {
        this.profile = { ...this.profile, ...newProfile };
        this.renderProfile();
        this.renderHeader();
    }

    // Method to add new order (can be called from order page)
    addOrder(order) {
        this.orders.unshift(order);
        this.renderStats();
        this.renderOrders();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboardApp = new DashboardApp();
});

// Make app globally accessible for debugging
window.DashboardApp = DashboardApp;