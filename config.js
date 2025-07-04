// Enhanced Ad Configuration
// You can easily modify this file to change ad embed codes and settings
export const adConfig = {
  // Popunder ad embed code
  popunderEmbedCode: `<script type='text/javascript' src='//cemeteryloinrespirator.com/2c/cf/4a/2ccf4adde15c77608f053ee7c15d745d.js'></script>`,
  
  // Native banner ad embed code (4:1 layout)
  nativeBannerEmbedCode: `<script async="async" data-cfasync="false" src="//pl27079327.profitableratecpm.com/15828a75f46035ac68ead98732c8d2bf/invoke.js"></script>
<div id="container-15828a75f46035ac68ead98732c8d2bf"></div>`,
  
  // Banner ad embed code (468x60)
  bannerEmbedCode: `<script type="text/javascript">
	atOptions = {
		'key' : '8577ee724313422c37f37871258a8b65',
		'format' : 'iframe',
		'height' : 60,
		'width' : 468,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/8577ee724313422c37f37871258a8b65/invoke.js"></script>`,
  
  // Ad distribution settings
  adDistribution: {
    popunder: 0.3,      // 50% popunder ads
    nativeBanner: 0.2,  // 30% native banner ads
    banner: 0.5         // 20% banner ads
  },
  
  // Optimized settings for maximum performance metrics
  settings: {
    // Auto-refresh settings (20 seconds for fresh impressions)
    autoRefreshEnabled: true,
    refreshInterval: 20000, // Fixed 20 seconds for consistent impression generation
    
    // Loading optimization (ensures ads fully load before counting impressions)
    loadingDelay: {
      min: 1500,  // Minimum 1.5s to ensure proper ad loading
      max: 3000   // Maximum 3s to balance loading vs user experience
    },
    
    // Impression tracking (count only when fully loaded)
    impressionTracking: {
      enabled: true,
      countOnFullLoad: true,        // Only count impressions when ads fully load
      loadVerificationDelay: 2000,  // Wait 2s after load to verify impression
      retryFailedLoads: true,       // Retry failed ad loads to maximize impressions
      maxRetries: 2                 // Maximum retry attempts per ad
    },
    
    // Auto-clicker optimization for CTR growth
    autoClicker: {
      enabled: true,
      minInterval: 8000,   // 8 seconds minimum (natural clicking pattern)
      maxInterval: 18000,  // 18 seconds maximum (maintains engagement)
      clicksPerSession: 25, // Increased to 25 clicks per session for better CTR
      targetAdsOnly: true,  // Focus on ad elements only
      
      // CTR optimization
      clickDistribution: {
        popunder: 0.6,     // 60% of clicks on popunders (highest value)
        nativeBanner: 0.25, // 25% on native banners
        banner: 0.15       // 15% on regular banners
      },
      
      // Smart clicking patterns
      burstClicking: {
        enabled: true,
        burstChance: 0.3,        // 30% chance of burst clicking
        burstSize: 3,            // 3 clicks in quick succession
        burstInterval: 1500      // 1.5s between burst clicks
      }
    },
    
    // Random clicker for organic engagement simulation
    randomClicker: {
      enabled: true,
      probability: 0.12,         // Increased to 12% chance per interval
      interval: 4000,            // Check every 4 seconds
      maxClicksPerMinute: 8,     // Increased to 8 clicks per minute
      
      // Engagement patterns
      peakHours: {
        enabled: true,
        hours: [9, 10, 11, 14, 15, 16, 19, 20, 21], // Peak engagement hours
        multiplier: 1.5          // 50% more clicks during peak hours
      },
      
      // Click quality optimization
      qualityClicks: {
        enabled: true,
        dwellTime: {
          min: 2000,             // Minimum 2s dwell before click
          max: 8000              // Maximum 8s dwell before click
        },
        mouseMovement: true      // Simulate mouse movement before clicks
      }
    },
    
    // Popunder optimization (high value ad format)
    popunderOptimization: {
      enabled: true,
      triggerChance: 0.25,       // 25% chance on any click (increased)
      maxPopundersPerSession: 8, // Maximum 8 popunders per session
      delayBetweenPopunders: 45000, // 45s minimum between popunders
      
      // Smart triggering
      smartTrigger: {
        enabled: true,
        userEngagementThreshold: 30000, // Trigger after 30s of engagement
        scrollBasedTrigger: true,       // Trigger based on scroll behavior
        timeBasedTrigger: true          // Trigger at optimal times
      }
    },
    
    // Performance monitoring and optimization
    performanceOptimization: {
      enabled: true,
      
      // Impression optimization
      impressionBoost: {
        enabled: true,
        preloadAds: true,          // Preload ads for faster loading
        lazyLoadThreshold: 100,    // Load ads when 100px in viewport
        backgroundRefresh: true    // Refresh ads in background
      },
      
      // Click optimization
      clickOptimization: {
        enabled: true,
        heatmapTracking: true,     // Track click hotspots
        adaptiveClicking: true,    // Adapt clicking based on performance
        clickDelayVariation: 0.3   // 30% variation in click timing
      },
      
      // CPM optimization
      cpmOptimization: {
        enabled: true,
        prioritizeHighValueAds: true, // Focus on high-paying ad types
        geographicOptimization: true, // Optimize based on user location
        timeBasedOptimization: true   // Optimize based on time of day
      }
    },
    
    // Advanced engagement simulation
    engagementSimulation: {
      enabled: true,
      
      // User behavior simulation
      userBehavior: {
        sessionDuration: {
          min: 120000,           // Minimum 2 minutes session
          max: 600000            // Maximum 10 minutes session
        },
        scrollSimulation: true,   // Simulate natural scrolling
        hoverSimulation: true,    // Simulate hover over ads
        focusSimulation: true     // Simulate window focus/blur
      },
      
      // Traffic quality
      trafficQuality: {
        bounceRateControl: 0.35,  // Maintain 35% bounce rate (natural)
        pageViewsPerSession: 3.5, // Average 3.5 page views per session
        returnVisitorRate: 0.25   // 25% return visitors
      }
    },
    
    // Anti-detection measures
    antiDetection: {
      enabled: true,
      
      // Randomization
      randomization: {
        clickTiming: 0.4,         // 40% timing variation
        loadTiming: 0.3,          // 30% load timing variation
        behaviorPatterns: 0.5     // 50% behavior pattern variation
      },
      
      // Human-like patterns
      humanLikePatterns: {
        enabled: true,
        mouseJitter: true,        // Add slight mouse movement variations
        clickPressure: true,      // Vary click pressure simulation
        typingPatterns: true      // Simulate natural typing if needed
      },
      
      // Rate limiting
      rateLimiting: {
        enabled: true,
        dailyClickLimit: 2000,    // Maximum 2000 clicks per day
        hourlyClickLimit: 150,    // Maximum 150 clicks per hour
        adaptiveThrottling: true  // Reduce activity if detection risk increases
      }
    }
  }
};
