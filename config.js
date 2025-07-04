// Enhanced Ad Configuration
// You can easily modify this file to change ad embed codes and settings
export const adConfig = {
  // Popunder ad embed code
  popunderEmbedCode: `<script type='text/javascript' src='//pl27078765.profitableratecpm.com/60/6a/c3/606ac38862e56b741c51a4ac384fd999.js'></script>`,
  
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
    popunder: 0.5,      // 50% popunder ads
    nativeBanner: 0.3,  // 30% native banner ads
    banner: 0.2         // 20% banner ads
  },
  
  // General settings
  settings: {
    autoRefreshEnabled: true,
    minRefreshInterval: 10000, // 10 seconds
    maxRefreshInterval: 60000, // 60 seconds
    popunderChance: 0.15, // 15% chance on random clicks
    loadingDelay: {
      min: 500,
      max: 2500
    },
    
    // Auto-clicker settings
    autoClicker: {
      enabled: true,
      minInterval: 5000,  // 5 seconds
      maxInterval: 15000, // 15 seconds
      clicksPerSession: 10, // Maximum clicks per session
      targetAdsOnly: true   // Only click on ad elements
    },
    
    // Random clicker settings
    randomClicker: {
      enabled: true,
      probability: 0.08,    // 8% chance per interval
      interval: 3000,       // Check every 3 seconds
      maxClicksPerMinute: 5 // Limit random clicks
    }
  }
};
