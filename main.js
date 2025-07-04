import { adConfig } from './config.js';

class EnhancedAdManager {
  constructor() {
    // Load embed codes from configuration
    this.popunderEmbedCode = adConfig.popunderEmbedCode;
    this.nativeBannerEmbedCode = adConfig.nativeBannerEmbedCode;
    this.bannerEmbedCode = adConfig.bannerEmbedCode;
    this.adDistribution = adConfig.adDistribution;
    this.settings = adConfig.settings;
    
    this.refreshInterval = null;
    this.isAdsActive = false;
    this.adClickHandlers = [];
    this.autoClickerInterval = null;
    this.randomClickerInterval = null;
    this.clickStats = {
      autoClicks: 0,
      randomClicks: 0,
      sessionStart: Date.now()
    };
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeClickers();
  }

  setupEventListeners() {
    const watchAdsBtn = document.getElementById('watchAdsBtn');
    watchAdsBtn.addEventListener('click', () => this.startWatchingAds());
  }

  initializeClickers() {
    // Start auto-clicker if enabled
    if (this.settings.autoClicker.enabled) {
      this.startAutoClicker();
    }
    
    // Start random clicker if enabled
    if (this.settings.randomClicker.enabled) {
      this.startRandomClicker();
    }
  }

  startAutoClicker() {
    const autoClick = () => {
      if (!this.isAdsActive) return;
      
      const sessionDuration = Date.now() - this.clickStats.sessionStart;
      const maxClicks = this.settings.autoClicker.clicksPerSession;
      
      // Check if we've exceeded max clicks for this session
      if (this.clickStats.autoClicks >= maxClicks) {
        console.log('Auto-clicker: Maximum clicks reached for this session');
        return;
      }
      
      // Find clickable ad elements
      const clickableAds = this.settings.autoClicker.targetAdsOnly 
        ? document.querySelectorAll('.popunder-trigger, .native-banner-container, .banner-container')
        : document.querySelectorAll('.ad-space');
      
      if (clickableAds.length > 0) {
        const randomAd = clickableAds[Math.floor(Math.random() * clickableAds.length)];
        this.simulateClick(randomAd, 'auto');
        this.clickStats.autoClicks++;
        console.log(`Auto-clicker: Click #${this.clickStats.autoClicks} executed`);
      }
      
      // Schedule next auto-click
      const nextInterval = Math.random() * 
        (this.settings.autoClicker.maxInterval - this.settings.autoClicker.minInterval) + 
        this.settings.autoClicker.minInterval;
      
      this.autoClickerInterval = setTimeout(autoClick, nextInterval);
    };
    
    // Start first auto-click
    const initialDelay = Math.random() * 
      (this.settings.autoClicker.maxInterval - this.settings.autoClicker.minInterval) + 
      this.settings.autoClicker.minInterval;
    
    this.autoClickerInterval = setTimeout(autoClick, initialDelay);
  }

  startRandomClicker() {
    const randomClick = () => {
      if (!this.isAdsActive) return;
      
      // Check rate limiting
      const now = Date.now();
      const oneMinuteAgo = now - 60000;
      const recentClicks = this.clickStats.randomClicks;
      
      if (recentClicks >= this.settings.randomClicker.maxClicksPerMinute) {
        console.log('Random clicker: Rate limit reached');
        return;
      }
      
      // Random probability check
      if (Math.random() < this.settings.randomClicker.probability) {
        const allElements = document.querySelectorAll('.ad-space, .popunder-trigger, .native-banner-container, .banner-container');
        
        if (allElements.length > 0) {
          const randomElement = allElements[Math.floor(Math.random() * allElements.length)];
          this.simulateClick(randomElement, 'random');
          this.clickStats.randomClicks++;
          console.log(`Random clicker: Click executed (${this.clickStats.randomClicks} this minute)`);
        }
      }
    };
    
    this.randomClickerInterval = setInterval(randomClick, this.settings.randomClicker.interval);
  }

  simulateClick(element, type = 'manual') {
    if (!element) return;
    
    try {
      // Create and dispatch click events
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      
      const mousedownEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      
      // Add visual feedback for auto/random clicks
      if (type !== 'manual') {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
          element.style.transform = '';
        }, 100);
      }
      
      element.dispatchEvent(mousedownEvent);
      element.dispatchEvent(clickEvent);
      
      console.log(`${type} click simulated on:`, element.className);
      
    } catch (error) {
      console.error(`Error simulating ${type} click:`, error);
    }
  }

  startWatchingAds() {
    if (this.isAdsActive) return;
    
    this.isAdsActive = true;
    this.clickStats.sessionStart = Date.now();
    this.clickStats.autoClicks = 0;
    this.clickStats.randomClicks = 0;
    
    // Hide button and show ads
    const buttonContainer = document.getElementById('buttonContainer');
    const adsContainer = document.getElementById('adsContainer');
    
    buttonContainer.style.display = 'none';
    adsContainer.style.display = 'grid';
    
    // Load all ads with different types
    this.loadAllAds();
    
    // Start auto-refresh if enabled
    if (this.settings.autoRefreshEnabled) {
      this.startAutoRefresh();
    }
    
    console.log('Ads session started - Auto-clicker and Random clicker are active');
  }

  loadAllAds() {
    const adSpaces = document.querySelectorAll('.ad-space');
    
    adSpaces.forEach((adSpace, index) => {
      const adType = this.determineAdType();
      this.loadSingleAd(adSpace, index, adType);
    });
  }

  determineAdType() {
    const random = Math.random();
    const { popunder, nativeBanner, banner } = this.adDistribution;
    
    if (random < popunder) {
      return 'popunder';
    } else if (random < popunder + nativeBanner) {
      return 'nativeBanner';
    } else {
      return 'banner';
    }
  }

  loadSingleAd(container, index, adType) {
    // Show loading state
    container.innerHTML = `
      <div class="ad-loading">
        <div class="loading-spinner"></div>
        <span>Loading ${adType.charAt(0).toUpperCase() + adType.slice(1)} Ad...</span>
      </div>
    `;
    
    // Simulate realistic loading delay
    const delay = Math.random() * (this.settings.loadingDelay.max - this.settings.loadingDelay.min) + this.settings.loadingDelay.min;
    setTimeout(() => {
      this.insertAd(container, index, adType);
    }, delay);
  }

  insertAd(container, index, adType) {
    try {
      // Clear loading state
      container.innerHTML = '';
      
      switch (adType) {
        case 'popunder':
          this.insertPopunderAd(container, index);
          break;
        case 'nativeBanner':
          this.insertNativeBannerAd(container, index);
          break;
        case 'banner':
          this.insertBannerAd(container, index);
          break;
      }
      
    } catch (error) {
      console.error(`Error loading ${adType} ad:`, error);
      container.innerHTML = this.createVisibleAdContent(index, adType);
    }
  }

  insertPopunderAd(container, index) {
    // Create a clickable area that will trigger popunder
    const clickableArea = document.createElement('div');
    clickableArea.className = 'popunder-trigger';
    clickableArea.innerHTML = this.createVisibleAdContent(index, 'popunder');
    
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
      this.injectAdScript(container, this.popunderEmbedCode);
    }, 1000);
  }

  insertNativeBannerAd(container, index) {
    const bannerContainer = document.createElement('div');
    bannerContainer.className = 'native-banner-container';
    bannerContainer.innerHTML = this.createVisibleAdContent(index, 'nativeBanner');
    
    // Add click handler
    const clickHandler = (e) => {
      console.log('Native banner ad clicked');
      this.triggerAdInteraction('nativeBanner');
    };
    
    bannerContainer.addEventListener('click', clickHandler);
    container.appendChild(bannerContainer);
    
    // Store handler for cleanup
    this.adClickHandlers.push({ element: bannerContainer, handler: clickHandler });
    
    // Inject native banner script
    setTimeout(() => {
      this.injectAdScript(container, this.nativeBannerEmbedCode);
    }, 500);
  }

  insertBannerAd(container, index) {
    const bannerContainer = document.createElement('div');
    bannerContainer.className = 'banner-container';
    bannerContainer.innerHTML = this.createVisibleAdContent(index, 'banner');
    
    // Add click handler
    const clickHandler = (e) => {
      console.log('Banner ad clicked');
      this.triggerAdInteraction('banner');
    };
    
    bannerContainer.addEventListener('click', clickHandler);
    container.appendChild(bannerContainer);
    
    // Store handler for cleanup
    this.adClickHandlers.push({ element: bannerContainer, handler: clickHandler });
    
    // Inject banner script
    setTimeout(() => {
      this.injectAdScript(container, this.bannerEmbedCode);
    }, 500);
  }

  injectAdScript(container, embedCode) {
    try {
      // Create a hidden container for the actual ad script
      const scriptContainer = document.createElement('div');
      scriptContainer.style.display = 'none';
      scriptContainer.innerHTML = embedCode;
      container.appendChild(scriptContainer);
      
      // Execute any scripts in the embed code
      const scripts = scriptContainer.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
          newScript.src = script.src;
          newScript.async = script.async;
        } else {
          newScript.textContent = script.textContent;
        }
        document.head.appendChild(newScript);
      });
      
    } catch (error) {
      console.error('Error injecting ad script:', error);
    }
  }

  createVisibleAdContent(index, adType) {
    const adContents = {
      popunder: [
        { title: 'Premium Offers Await', subtitle: 'Click to discover exclusive deals', icon: '🎯', color: '#ff6b6b' },
        { title: 'Special Promotions', subtitle: 'Limited time offers inside', icon: '💎', color: '#4ecdc4' },
        { title: 'Exclusive Access', subtitle: 'Unlock premium content', icon: '🚀', color: '#45b7d1' },
        { title: 'Best Deals', subtitle: 'Save up to 70% today', icon: '🏆', color: '#f9ca24' },
        { title: 'New Arrivals', subtitle: 'Fresh products available', icon: '⭐', color: '#6c5ce7' }
      ],
      nativeBanner: [
        { title: 'Trending Products', subtitle: 'Discover what\'s popular now', icon: '📈', color: '#74b9ff' },
        { title: 'Editor\'s Choice', subtitle: 'Handpicked recommendations', icon: '✨', color: '#a29bfe' },
        { title: 'Customer Favorites', subtitle: 'Most loved by users', icon: '❤️', color: '#fd79a8' },
        { title: 'New & Noteworthy', subtitle: 'Latest additions to explore', icon: '🆕', color: '#00cec9' },
        { title: 'Staff Picks', subtitle: 'Our team\'s recommendations', icon: '👥', color: '#fdcb6e' }
      ],
      banner: [
        { title: 'Flash Sale', subtitle: 'Hurry! Limited time', icon: '⚡', color: '#fd79a8' },
        { title: 'Free Shipping', subtitle: 'On orders over $50', icon: '🚚', color: '#00b894' },
        { title: 'Daily Deals', subtitle: 'New offers every day', icon: '📅', color: '#00cec9' },
        { title: 'Member Exclusive', subtitle: 'Special prices for you', icon: '🎖️', color: '#6c5ce7' },
        { title: 'Last Chance', subtitle: 'Final hours to save', icon: '⏰', color: '#ff6b6b' }
      ]
    };
    
    const typeContent = adContents[adType] || adContents.popunder;
    const ad = typeContent[index % typeContent.length];
    
    const layoutClass = adType === 'nativeBanner' ? 'native-banner-layout' : 
                       adType === 'banner' ? 'banner-layout' : 'popunder-layout';
    
    return `
      <div class="visible-ad-content ${layoutClass}" style="border-left: 4px solid ${ad.color}">
        <div class="ad-icon" style="color: ${ad.color}">${ad.icon}</div>
        <div class="ad-text">
          <h3 style="color: ${ad.color}">${ad.title}</h3>
          <p>${ad.subtitle}</p>
          <span class="ad-type-badge ${adType}">${adType.toUpperCase()}</span>
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
              ${this.popunderEmbedCode}
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
      this.injectAdScript(document.head, this.popunderEmbedCode);
      
    } catch (error) {
      console.error('Error triggering popunder:', error);
    }
  }

  triggerAdInteraction(adType) {
    try {
      // Log the interaction
      console.log(`${adType} ad interaction triggered`);
      
      // Execute the appropriate ad script
      const embedCode = adType === 'nativeBanner' ? this.nativeBannerEmbedCode : this.bannerEmbedCode;
      this.injectAdScript(document.head, embedCode);
      
    } catch (error) {
      console.error(`Error triggering ${adType} ad interaction:`, error);
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
    console.log('Refreshing all ads...');
    
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

  // Method to update embed codes dynamically
  updateEmbedCodes(newCodes) {
    if (newCodes.popunder) this.popunderEmbedCode = newCodes.popunder;
    if (newCodes.nativeBanner) this.nativeBannerEmbedCode = newCodes.nativeBanner;
    if (newCodes.banner) this.bannerEmbedCode = newCodes.banner;
    
    if (this.isAdsActive) {
      this.refreshAllAds();
    }
  }

  // Method to update settings
  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    
    // Restart clickers if settings changed
    if (newSettings.autoClicker || newSettings.randomClicker) {
      this.stopClickers();
      this.initializeClickers();
    }
  }

  stopClickers() {
    if (this.autoClickerInterval) {
      clearTimeout(this.autoClickerInterval);
      this.autoClickerInterval = null;
    }
    
    if (this.randomClickerInterval) {
      clearInterval(this.randomClickerInterval);
      this.randomClickerInterval = null;
    }
  }

  // Get click statistics
  getClickStats() {
    return {
      ...this.clickStats,
      sessionDuration: Date.now() - this.clickStats.sessionStart
    };
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  window.adManager = new EnhancedAdManager();
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

// Console commands for debugging and control
window.adDebug = {
  getStats: () => window.adManager?.getClickStats(),
  stopClickers: () => window.adManager?.stopClickers(),
  startClickers: () => window.adManager?.initializeClickers(),
  simulateClick: (type = 'manual') => {
    const ads = document.querySelectorAll('.popunder-trigger, .native-banner-container, .banner-container');
    if (ads.length > 0) {
      const randomAd = ads[Math.floor(Math.random() * ads.length)];
      window.adManager?.simulateClick(randomAd, type);
    }
  }
};
