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
  refreshInterval: 72000, // 90 seconds → 72 seconds

  // Ad loading optimization
  loadingDelay: {
    min: 4800,  // 6 seconds → 4.8 seconds
    max: 8000   // 10 seconds → 8 seconds
  },

  // Impression tracking (count only when fully loaded)
  impressionTracking: {
    enabled: true,
    countOnFullLoad: true,
    loadVerificationDelay: 3200,  // 4 seconds → 3.2 seconds
    retryFailedLoads: true,
    maxRetries: 2,
    loadTimeout: 12000            // 15 seconds → 12 seconds
  },

  // COORDINATED CLICKING SYSTEM
  // Main auto-clicker with strategic timing
  autoClicker: {
    enabled: true,

    // Strategic timing - wait for ads to fully load and settle
    timingStrategy: {
      initialWait: 12000,        // 15 seconds → 12 seconds
      betweenClickWait: {
        min: 20000,              // 25 seconds → 20 seconds
        max: 36000               // 45 seconds → 36 seconds
      },
      afterClickDwell: {
        min: 8000,               // 10 seconds → 8 seconds
        max: 14400               // 18 seconds → 14.4 seconds
      }
    },

    // Session management
    sessionSettings: {
      clicksPerSession: 15,
      maxSessionDuration: 480000,     // 10 minutes → 8 minutes
      cooldownBetweenSessions: 96000  // 2 minutes → 96 seconds
    },

    // Click distribution (prioritize high-value ads)
    clickPriority: {
      popunder: 0.6,
      nativeBanner: 0.3,
      banner: 0.1
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
      respectAutoClickerTiming: true,
      fillGapsOnly: true,
      avoidDoubleClicking: true
    },

    // Conservative random clicking
    probability: 0.08,
    interval: 6400,               // 8 seconds → 6.4 seconds
    maxClicksPerHour: 12,

    // Quality random clicks
    qualitySettings: {
      minDwellTime: 9600,         // 12 seconds → 9.6 seconds
      maxDwellTime: 20000,        // 25 seconds → 20 seconds
      onlyClickAfterScroll: true,
      respectUserActivity: true
    }
  },

  // Enhanced popunder strategy
  popunderOptimization: {
    enabled: true,

    // Strategic popunder timing
    triggerStrategy: {
      baseChance: 0.15,
      cooldownPeriod: 96000,       // 2 minutes → 96 seconds
      maxPerSession: 4,
      triggerOnEngagement: true
    },

    // Quality popunders
    qualityControl: {
      waitForFullLoad: 6400,       // 8 seconds → 6.4 seconds
      verifyBeforeTrigger: true,
      respectUserFocus: true
    }
  },

  // COORDINATED ENGAGEMENT SYSTEM
  engagementCoordination: {
    enabled: true,

    // Master timing controller
    masterTiming: {
      phaseRotation: {
        loadPhase: 12000,         // 15 seconds → 12 seconds
        viewPhase: 16000,         // 20 seconds → 16 seconds
        interactionPhase: 24000,  // 30 seconds → 24 seconds
        dwellPhase: 12000         // 15 seconds → 12 seconds
      },

      // Cycle management
      cycleSettings: {
        totalCycleDuration: 64000,   // 80 seconds → 64 seconds
        restBetweenCycles: 16000,    // 20 seconds → 16 seconds
        maxCyclesPerSession: 6
      }
    },

    // Behavioral coordination
    behaviorCoordination: {
      scrollBeforeClick: true,
      hoverBeforeClick: true,
      readingSimulation: {
        enabled: true,
        minReadTime: 6400,         // 8 seconds → 6.4 seconds
        maxReadTime: 16000,        // 20 seconds → 16 seconds
        focusOnText: true
      }
    },

    // Performance optimization
    performanceSync: {
      impressionClickRatio: 0.25,
      qualityScore: 0.8,
      engagementDepth: 0.6,
      bounceRateTarget: 0.3
    }
  },

  // Advanced anti-detection with coordination
  antiDetection: {
    enabled: true,

    // Coordinated randomization
    coordinatedRandomization: {
      timingVariation: 0.3,
      patternBreaking: true,
      humanLikeDelays: true,
      naturalFluctuations: true
    },

    // Intelligent rate limiting
    intelligentLimiting: {
      adaptiveThrottling: true,
      peakHourAdjustment: true,
      qualityOverQuantity: true,
      sustainableGrowth: true
    },

    // Coordination safety
    coordinationSafety: {
      maxActionsPerMinute: 3,
      enforceMinimumGaps: true,
      respectLoadTimes: true,
      preventOverlapping: true
    }
  },

  // Performance monitoring and adjustment
  performanceMonitoring: {
    enabled: true,

    // Real-time optimization
    realTimeOptimization: {
      adjustBasedOnCTR: true,
      optimizeForCPM: true,
      balanceMetrics: true,
      preventDetection: true
    },

    // Quality metrics tracking
    qualityMetrics: {
      trackImpressionQuality: true,
      trackClickQuality: true,
      trackEngagementDepth: true,
      trackUserSatisfaction: true
    }
  }
};
