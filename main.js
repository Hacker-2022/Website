import { adConfig } from './config.js';

class CoordinatedAdManager {
  constructor() {
    // Load configuration
    this.config = adConfig;
    this.settings = adConfig.settings;
    
    // State management
    this.isAdsActive = false;
    this.currentPhase = 'loading';
    this.phaseStartTime = 0;
    this.sessionStartTime = 0;
    this.cycleCount = 0;
    
    // Coordination state
    this.lastClickTime = 0;
    this.lastPopunderTime = 0;
    this.clickedAds = new Set();
    this.currentCycleDuration = 0;
    
    // Performance tracking
    this.stats = {
      impressions: 0,
      clicks: 0,
      popunders: 0,
      sessionDuration: 0,
      qualityScore: 0
    };
    
    // Timers and intervals
    this.masterTimer = null;
    this.phaseTimer = null;
    this.refreshTimer = null;
    this.coordinationTimer = null;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    console.log('Coordinated Ad Manager initialized');
  }

  setupEventListeners() {
    const watchAdsBtn = document.getElementById('watchAdsBtn');
    watchAdsBtn.addEventListener('click', () => this.startCoordinatedSession());
  }

  startCoordinatedSession() {
    if (this.isAdsActive) return;
    
    console.log('🚀 Starting coordinated ad session...');
    
    this.isAdsActive = true;
    this.sessionStartTime = Date.now();
    this.cycleCount = 0;
    this.currentPhase = 'loading';
    this.phaseStartTime = Date.now();
    
    // Reset stats
    this.stats = {
      impressions: 0,
      clicks: 0,
      popunders: 0,
      sessionDuration: 0,
      qualityScore: 0
    };
    
    // Show ads container
    this.showAdsContainer();
    
    // Start the master coordination system
    this.startMasterCoordination();
    
    // Load initial ads
    this.loadAllAds();
    
    console.log('📊 Session started - Coordinated system active');
  }

  showAdsContainer() {
    const buttonContainer = document.getElementById('buttonContainer');
    const adsContainer = document.getElementById('adsContainer');
    
    buttonContainer.style.display = 'none';
    adsContainer.style.display = 'grid';
  }

  startMasterCoordination() {
    const { masterTiming } = this.settings.engagementCoordination;
    
    this.coordinationTimer = setInterval(() => {
      this.executeCoordinatedCycle();
    }, 1000); // Check every second
    
    // Start refresh timer (much slower now)
    this.refreshTimer = setInterval(() => {
      this.coordinatedRefresh();
    }, this.settings.refreshInterval);
  }

  executeCoordinatedCycle() {
    if (!this.isAdsActive) return;
    
    const now = Date.now();
    const phaseElapsed = now - this.phaseStartTime;
    const { phaseRotation, cycleSettings } = this.settings.engagementCoordination.masterTiming;
    
    // Update session duration
    this.stats.sessionDuration = now - this.sessionStartTime;
    
    // Check if we should end session
    if (this.stats.sessionDuration > this.settings.autoClicker.sessionSettings.maxSessionDuration) {
      this.endSession();
      return;
    }
    
    // Phase management
    switch (this.currentPhase) {
      case 'loading':
        if (phaseElapsed >= phaseRotation.loadPhase) {
          this.transitionToPhase('viewing');
        }
        break;
        
      case 'viewing':
        if (phaseElapsed >= phaseRotation.viewPhase) {
          this.transitionToPhase('interaction');
        }
        break;
        
      case 'interaction':
        this.handleInteractionPhase();
        if (phaseElapsed >= phaseRotation.interactionPhase) {
          this.transitionToPhase('dwelling');
        }
        break;
        
      case 'dwelling':
        if (phaseElapsed >= phaseRotation.dwellPhase) {
          this.completeCycle();
        }
        break;
        
      case 'resting':
        if (phaseElapsed >= cycleSettings.restBetweenCycles) {
          this.transitionToPhase('loading');
        }
        break;
    }
  }

  transitionToPhase(newPhase) {
    console.log(`🔄 Phase transition: ${this.currentPhase} → ${newPhase}`);
    this.currentPhase = newPhase;
    this.phaseStartTime = Date.now();
    
    switch (newPhase) {
      case 'viewing':
        this.simulateViewing();
        break;
      case 'interaction':
        this.prepareForInteraction();
        break;
      case 'dwelling':
        this.startDwelling();
        break;
    }
  }

  simulateViewing() {
    console.log('👀 Simulating viewing phase...');
    
    // Simulate scrolling
    this.simulateScroll();
    
    // Simulate hover over ads
    setTimeout(() => {
      this.simulateHover();
    }, 3000);
  }

  prepareForInteraction() {
    console.log('🎯 Preparing for interaction phase...');
    
    // Check if we should click an ad
    const timeSinceLastClick = Date.now() - this.lastClickTime;
    const minTimeBetweenClicks = this.settings.autoClicker.timingStrategy.betweenClickWait.min;
    
    if (timeSinceLastClick >= minTimeBetweenClicks) {
      this.scheduleCoordinatedClick();
    }
    
    // Check if we should trigger popunder
    this.checkPopunderTrigger();
  }

  handleInteractionPhase() {
    // This runs continuously during interaction phase
    const phaseElapsed = Date.now() - this.phaseStartTime;
    
    // Random interaction chance (but coordinated)
    if (phaseElapsed > 10000 && Math.random() < 0.3) { // 30% chance after 10 seconds
      this.executeRandomInteraction();
    }
  }

  scheduleCoordinatedClick() {
    const availableAds = this.getClickableAds();
    if (availableAds.length === 0) return;
    
    // Select ad based on priority
    const selectedAd = this.selectAdByPriority(availableAds);
    if (!selectedAd) return;
    
    // Schedule click with human-like delay
    const delay = Math.random() * 5000 + 2000; // 2-7 seconds
    
    setTimeout(() => {
      this.executeCoordinatedClick(selectedAd);
    }, delay);
  }

  selectAdByPriority(availableAds) {
    const { clickPriority } = this.settings.autoClicker;
    const random = Math.random();
    
    // Filter ads by type
    const popunderAds = availableAds.filter(ad => ad.classList.contains('popunder-trigger'));
    const nativeBannerAds = availableAds.filter(ad => ad.classList.contains('native-banner-container'));
    const bannerAds = availableAds.filter(ad => ad.classList.contains('banner-container'));
    
    // Select based on priority
    if (random < clickPriority.popunder && popunderAds.length > 0) {
      return popunderAds[Math.floor(Math.random() * popunderAds.length)];
    } else if (random < clickPriority.popunder + clickPriority.nativeBanner && nativeBannerAds.length > 0) {
      return nativeBannerAds[Math.floor(Math.random() * nativeBannerAds.length)];
    } else if (bannerAds.length > 0) {
      return bannerAds[Math.floor(Math.random() * bannerAds.length)];
    }
    
    // Fallback to any available ad
    return availableAds[Math.floor(Math.random() * availableAds.length)];
  }

  executeCoordinatedClick(adElement) {
    if (!adElement || this.clickedAds.has(adElement)) return;
    
    console.log('🖱️ Executing coordinated click...');
    
    // Mark as clicked
    this.clickedAds.add(adElement);
    this.lastClickTime = Date.now();
    this.stats.clicks++;
    
    // Add visual feedback
    this.addClickFeedback(adElement);
    
    // Simulate human-like click
    this.simulateHumanClick(adElement);
    
    // Start dwell timer (10-18 seconds as requested)
    const dwellTime = Math.random() * 8000 + 10000; // 10-18 seconds
    
    setTimeout(() => {
      this.completeDwell(adElement);
    }, dwellTime);
  }

  completeDwell(adElement) {
    console.log('⏱️ Dwell completed, ready for next action');
    
    // Remove from clicked ads after dwell
    setTimeout(() => {
      this.clickedAds.delete(adElement);
    }, 30000); // Allow re-clicking after 30 seconds
  }

  executeRandomInteraction() {
    if (!this.settings.randomClicker.enabled) return;
    
    const timeSinceLastClick = Date.now() - this.lastClickTime;
    const minGap = 15000; // 15 seconds minimum gap
    
    if (timeSinceLastClick < minGap) return;
    
    const availableAds = this.getClickableAds();
    if (availableAds.length === 0) return;
    
    // Random selection for random clicker
    const randomAd = availableAds[Math.floor(Math.random() * availableAds.length)];
    
    console.log('🎲 Executing random interaction...');
    this.executeCoordinatedClick(randomAd);
  }

  checkPopunderTrigger() {
    if (!this.settings.popunderOptimization.enabled) return;
    
    const timeSinceLastPopunder = Date.now() - this.lastPopunderTime;
    const { triggerStrategy } = this.settings.popunderOptimization;
    
    if (timeSinceLastPopunder >= triggerStrategy.cooldownPeriod) {
      if (Math.random() < triggerStrategy.baseChance) {
        this.triggerCoordinatedPopunder();
      }
    }
  }

  triggerCoordinatedPopunder() {
    console.log('🪟 Triggering coordinated popunder...');
    
    this.lastPopunderTime = Date.now();
    this.stats.popunders++;
    
    // Use the existing popunder logic
    this.triggerPopunder();
  }

  startDwelling() {
    console.log('🏠 Starting dwell phase...');
    // Simulate user reading/viewing content
  }

  completeCycle() {
    this.cycleCount++;
    console.log(`✅ Cycle ${this.cycleCount} completed`);
    
    const { cycleSettings } = this.settings.engagementCoordination.masterTiming;
    
    if (this.cycleCount >= cycleSettings.maxCyclesPerSession) {
      this.endSession();
    } else {
      this.transitionToPhase('resting');
    }
  }

  coordinatedRefresh() {
    if (this.currentPhase === 'interaction' || this.currentPhase === 'dwelling') {
      // Don't refresh during critical phases
      return;
    }
    
    console.log('🔄 Coordinated refresh...');
    this.refreshAllAds();
  }

  getClickableAds() {
    const allAds = document.querySelectorAll('.popunder-trigger, .native-banner-container, .banner-container');
    return Array.from(allAds).filter(ad => {
      // Only return ads that are loaded and visible
      return ad.offsetParent !== null && !this.clickedAds.has(ad);
    });
  }

  addClickFeedback(element) {
    const feedback = document.createElement('div');
    feedback.className = 'click-feedback';
    feedback.textContent = '✓ Clicked';
    feedback.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(76, 175, 80, 0.9);
      color: white;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: bold;
      z-index: 1000;
      animation: fadeInOut 3s ease-in-out;
    `;
    
    element.style.position = 'relative';
    element.appendChild(feedback);
    
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 3000);
  }

  simulateHumanClick(element) {
    // Simulate mouse movement
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Create and dispatch events
    const mouseEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y
    });
    
    element.dispatchEvent(mouseEvent);
  }

  simulateScroll() {
    const scrollAmount = Math.random() * 300 + 100;
    window.scrollBy({
      top: scrollAmount,
      behavior: 'smooth'
    });
  }

  simulateHover() {
    const ads = document.querySelectorAll('.ad-space');
    if (ads.length === 0) return;
    
    const randomAd = ads[Math.floor(Math.random() * ads.length)];
    const hoverEvent = new MouseEvent('mouseenter', { bubbles: true });
    randomAd.dispatchEvent(hoverEvent);
    
    setTimeout(() => {
      const leaveEvent = new MouseEvent('mouseleave', { bubbles: true });
      randomAd.dispatchEvent(leaveEvent);
    }, 2000);
  }

  endSession() {
    console.log('🏁 Ending coordinated session...');
    
    this.isAdsActive = false;
    
    // Clear all timers
    if (this.coordinationTimer) clearInterval(this.coordinationTimer);
    if (this.refreshTimer) clearInterval(this.refreshTimer);
    
    // Log final stats
    console.log('📊 Final Session Stats:', this.stats);
    
    // Schedule next session
    setTimeout(() => {
      console.log('🔄 Ready for next session');
    }, this.settings.autoClicker.sessionSettings.cooldownBetweenSessions);
  }

  // Existing methods (adapted for coordination)
  loadAllAds() {
    const adSpaces = document.querySelectorAll('.ad-space');
    
    adSpaces.forEach((adSpace, index) => {
      const adType = this.determineAdType();
      this.loadSingleAd(adSpace, index, adType);
    });
  }

  determineAdType() {
    const random = Math.random();
    const { popunder, nativeBanner, banner } = this.config.adDistribution;
    
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
    
    // Use coordinated loading delay
    const delay = Math.random() * 
      (this.settings.loadingDelay.max - this.settings.loadingDelay.min) + 
      this.settings.loadingDelay.min;
    
    setTimeout(() => {
      this.insertAd(container, index, adType);
      this.stats.impressions++;
    }, delay);
  }

  insertAd(container, index, adType) {
    try {
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
    const clickableArea = document.createElement('div');
    clickableArea.className = 'popunder-trigger';
    clickableArea.innerHTML = this.createVisibleAdContent(index, 'popunder');
    
    container.appendChild(clickableArea);
    
    // Inject script after delay
    setTimeout(() => {
      this.injectAdScript(container, this.config.popunderEmbedCode);
    }, 2000);
  }

  insertNativeBannerAd(container, index) {
    const bannerContainer = document.createElement('div');
    bannerContainer.className = 'native-banner-container';
    bannerContainer.innerHTML = this.createVisibleAdContent(index, 'nativeBanner');
    
    container.appendChild(bannerContainer);
    
    setTimeout(() => {
      this.injectAdScript(container, this.config.nativeBannerEmbedCode);
    }, 1500);
  }

  insertBannerAd(container, index) {
    const bannerContainer = document.createElement('div');
    bannerContainer.className = 'banner-container';
    bannerContainer.innerHTML = this.createVisibleAdContent(index, 'banner');
    
    container.appendChild(bannerContainer);
    
    setTimeout(() => {
      this.injectAdScript(container, this.config.bannerEmbedCode);
    }, 1000);
  }

  injectAdScript(container, embedCode) {
    try {
      const scriptContainer = document.createElement('div');
      scriptContainer.style.display = 'none';
      scriptContainer.innerHTML = embedCode;
      container.appendChild(scriptContainer);
      
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
      const popunder = window.open(
        'about:blank',
        '_blank',
        'width=1,height=1,left=0,top=0,scrollbars=no,resizable=no,toolbar=no,location=no,directories=no,status=no,menubar=no'
      );
      
      if (popunder) {
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
              ${this.config.popunderEmbedCode}
            </div>
          </body>
          </html>
        `);
        popunder.document.close();
        
        setTimeout(() => {
          window.focus();
          if (popunder && !popunder.closed) {
            popunder.blur();
          }
        }, 100);
      }
      
    } catch (error) {
      console.error('Error triggering popunder:', error);
    }
  }

  refreshAllAds() {
    console.log('🔄 Refreshing all ads...');
    
    const adsContainer = document.getElementById('adsContainer');
    adsContainer.style.opacity = '0.7';
    
    setTimeout(() => {
      this.loadAllAds();
      adsContainer.style.opacity = '1';
    }, 1000);
  }

  // Debug methods
  getStats() {
    return {
      ...this.stats,
      currentPhase: this.currentPhase,
      cycleCount: this.cycleCount,
      isActive: this.isAdsActive
    };
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  window.coordinatedAdManager = new CoordinatedAdManager();
});

// Debug console
window.adDebug = {
  getStats: () => window.coordinatedAdManager?.getStats(),
  getCurrentPhase: () => window.coordinatedAdManager?.currentPhase,
  forcePhaseTransition: (phase) => window.coordinatedAdManager?.transitionToPhase(phase),
  endSession: () => window.coordinatedAdManager?.endSession()
};
