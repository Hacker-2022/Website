import { adConfig } from './config.js';

class PopunderAdManager {
  constructor() {
    // Load embed code from configuration
    this.adEmbedCode = adConfig.embedCode;
    this.settings = adConfig.settings;
    this.refreshInterval = null;
    this.isAdsActive = false;
    this.adClickHandlers = [];
    
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    const watchAdsBtn = document.getElementById('watchAdsBtn');
    watchAdsBtn.addEventListener('click', () => this.startWatchingAds());
  }

  startWatchingAds() {
    if (this.isAdsActive) return;
    
    this.isAdsActive = true;
    
    // Hide button and show ads
    const buttonContainer = document.getElementById('buttonContainer');
    const adsContainer = document.getElementById('adsContainer');
    
    buttonContainer.style.display = 'none';
    adsContainer.style.display = 'grid';
    
    // Load all ads
    this.loadAllAds();
    
    // Start auto-refresh if enabled
    if (this.settings.autoRefreshEnabled) {
      this.startAutoRefresh();
    }
  }

  loadAllAds() {
    const adSpaces = document.querySelectorAll('.ad-space');
    
    adSpaces.forEach((adSpace, index) => {
      this.loadSingleAd(adSpace, index);
    });
  }

  loadSingleAd(container, index) {
    // Show loading state
    container.innerHTML = `
      <div class="ad-loading">
        <div class="loading-spinner"></div>
        <span>Loading Popunder Ad...</span>
      </div>
    `;
    
    // Simulate realistic loading delay
    const delay = Math.random() * (this.settings.loadingDelay.max - this.settings.loadingDelay.min) + this.settings.loadingDelay.min;
    setTimeout(() => {
      this.insertPopunderAd(container, index);
    }, delay);
  }

  insertPopunderAd(container, index) {
    try {
      // Clear loading state
      container.innerHTML = '';
      
      // Create a clickable area that will trigger popunder
      const clickableArea = document.createElement('div');
      clickableArea.className = 'popunder-trigger';
      clickableArea.innerHTML = this.createVisibleAdContent(index);
      
      // Add click handler for popunder
      const clickHandler = (e) => {
        e.preventDefault();
        this.triggerPopunder();
        return false;
      };
      
      clickableArea.addEventListener('click', clickHandler);
      clickableArea.addEventListener('mousedown', clickHandler);
      
      container.appendChild(clickableArea);
      
      // Store handler for cleanup
      this.adClickHandlers.push({ element: clickableArea, handler: clickHandler });
      
      // Also inject the actual ad script for additional functionality
      setTimeout(() => {
        this.injectAdScript(container);
      }, 1000);
      
    } catch (error) {
      console.error('Error loading popunder ad:', error);
      container.innerHTML = this.createVisibleAdContent(index);
    }
  }

  injectAdScript(container) {
    try {
      // Extract script URL from embed code
      const scriptMatch = this.adEmbedCode.match(/src=['"]([^'"]+)['"]/);
      if (scriptMatch && scriptMatch[1]) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptMatch[1];
        script.async = true;
        script.style.display = 'none'; // Hide the script's output
        container.appendChild(script);
      }
    } catch (error) {
      console.error('Error injecting ad script:', error);
    }
  }

  createVisibleAdContent(index) {
    const adContents = [
      {
        title: 'Premium Offers Await',
        subtitle: 'Click to discover exclusive deals',
        icon: '🎯',
        color: '#ff6b6b'
      },
      {
        title: 'Special Promotions',
        subtitle: 'Limited time offers inside',
        icon: '💎',
        color: '#4ecdc4'
      },
      {
        title: 'Exclusive Access',
        subtitle: 'Unlock premium content',
        icon: '🚀',
        color: '#45b7d1'
      },
      {
        title: 'Best Deals',
        subtitle: 'Save up to 70% today',
        icon: '🏆',
        color: '#f9ca24'
      },
      {
        title: 'New Arrivals',
        subtitle: 'Fresh products available',
        icon: '⭐',
        color: '#6c5ce7'
      },
      {
        title: 'Flash Sale',
        subtitle: 'Hurry! Limited stock',
        icon: '⚡',
        color: '#fd79a8'
      },
      {
        title: 'VIP Membership',
        subtitle: 'Join exclusive club',
        icon: '👑',
        color: '#fdcb6e'
      },
      {
        title: 'Free Shipping',
        subtitle: 'On orders over $50',
        icon: '🚚',
        color: '#00b894'
      },
      {
        title: 'Cashback Offers',
        subtitle: 'Earn while you spend',
        icon: '💰',
        color: '#e17055'
      },
      {
        title: 'Gift Cards',
        subtitle: 'Perfect for any occasion',
        icon: '🎁',
        color: '#a29bfe'
      },
      {
        title: 'Mega Sale',
        subtitle: 'Up to 90% off everything',
        icon: '🔥',
        color: '#ff7675'
      },
      {
        title: 'Trending Now',
        subtitle: 'Most popular items',
        icon: '📈',
        color: '#74b9ff'
      },
      {
        title: 'Limited Edition',
        subtitle: 'Exclusive collections',
        icon: '💫',
        color: '#a29bfe'
      },
      {
        title: 'Daily Deals',
        subtitle: 'New offers every day',
        icon: '📅',
        color: '#00cec9'
      },
      {
        title: 'Bundle Offers',
        subtitle: 'Buy more, save more',
        icon: '📦',
        color: '#fdcb6e'
      },
      {
        title: 'Seasonal Sale',
        subtitle: 'Perfect timing for savings',
        icon: '🌟',
        color: '#fd79a8'
      },
      {
        title: 'Member Exclusive',
        subtitle: 'Special prices for you',
        icon: '🎖️',
        color: '#6c5ce7'
      },
      {
        title: 'Hot Deals',
        subtitle: 'Trending offers right now',
        icon: '🌶️',
        color: '#e17055'
      },
      {
        title: 'Price Drop',
        subtitle: 'Lowest prices guaranteed',
        icon: '📉',
        color: '#00b894'
      },
      {
        title: 'Last Chance',
        subtitle: 'Final hours to save',
        icon: '⏰',
        color: '#ff6b6b'
      }
    ];
    
    const ad = adContents[index % adContents.length];
    
    return `
      <div class="visible-ad-content" style="border-left: 4px solid ${ad.color}">
        <div class="ad-icon" style="color: ${ad.color}">${ad.icon}</div>
        <div class="ad-text">
          <h3 style="color: ${ad.color}">${ad.title}</h3>
          <p>${ad.subtitle}</p>
        </div>
        <div class="click-indicator">
          <span>Click Here</span>
          <div class="pulse-ring"></div>
        </div>
      </div>
    `;
  }

  triggerPopunder() {
    try {
      // Method 1: Open popunder window
      const popunder = window.open(
        'about:blank',
        '_blank',
        'width=1,height=1,left=0,top=0,scrollbars=no,resizable=no,toolbar=no,location=no,directories=no,status=no,menubar=no'
      );
      
      if (popunder) {
        // Inject the ad script into the popunder
        popunder.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Advertisement</title>
            <style>
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; background: #f5f5f5; }
              .ad-container { text-align: center; max-width: 800px; margin: 0 auto; }
              .loading { color: #666; font-size: 18px; }
            </style>
          </head>
          <body>
            <div class="ad-container">
              <div class="loading">Loading premium content...</div>
              ${this.adEmbedCode}
            </div>
          </body>
          </html>
        `);
        popunder.document.close();
        
        // Focus back to main window (popunder effect)
        setTimeout(() => {
          window.focus();
          if (popunder && !popunder.closed) {
            popunder.blur();
          }
        }, 100);
      }
      
      // Method 2: Also try to execute the ad script in current page
      this.injectAdScript(document.head);
      
    } catch (error) {
      console.error('Error triggering popunder:', error);
      
      // Fallback: Try to execute ad script directly
      try {
        this.injectAdScript(document.head);
      } catch (fallbackError) {
        console.error('Fallback ad loading failed:', fallbackError);
      }
    }
  }

  startAutoRefresh() {
    // Random refresh interval based on settings
    const refreshTime = Math.floor(Math.random() * (this.settings.maxRefreshInterval - this.settings.minRefreshInterval)) + this.settings.minRefreshInterval;
    
    this.refreshInterval = setTimeout(() => {
      this.refreshAllAds();
    }, refreshTime);
  }

  refreshAllAds() {
    console.log('Refreshing all popunder ads...');
    
    // Clean up old click handlers
    this.adClickHandlers.forEach(({ element, handler }) => {
      if (element && handler) {
        element.removeEventListener('click', handler);
        element.removeEventListener('mousedown', handler);
      }
    });
    this.adClickHandlers = [];
    
    // Add subtle refresh animation
    const adsContainer = document.getElementById('adsContainer');
    adsContainer.style.opacity = '0.7';
    
    setTimeout(() => {
      this.loadAllAds();
      adsContainer.style.opacity = '1';
      
      // Schedule next refresh if enabled
      if (this.settings.autoRefreshEnabled) {
        this.startAutoRefresh();
      }
    }, 500);
  }

  // Method to update embed code dynamically
  updateEmbedCode(newEmbedCode) {
    this.adEmbedCode = newEmbedCode;
    if (this.isAdsActive) {
      this.refreshAllAds();
    }
  }

  // Method to update settings
  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  window.adManager = new PopunderAdManager();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && window.adManager && window.adManager.isAdsActive) {
    // Refresh ads when page becomes visible again
    setTimeout(() => {
      window.adManager.refreshAllAds();
    }, 1000);
  }
});

// Add global click tracking for additional popunder triggers
document.addEventListener('click', (e) => {
  if (window.adManager && window.adManager.isAdsActive && window.adManager.settings) {
    // Configurable chance to trigger popunder on any click
    if (Math.random() < window.adManager.settings.popunderChance) {
      setTimeout(() => {
        window.adManager.triggerPopunder();
      }, 500);
    }
  }
});