// Enhanced Ad Configuration
// You can easily modify this file to change ad embed codes and settings
export const adConfig = {
  // Popunder ad embed code
  popunderEmbedCode: `<script type='text/javascript' src='//pl27078850.profitableratecpm.com/2c/cf/4a/2ccf4adde15c77608f053ee7c15d745d.js'></script>`,
  
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
  
  // General settings
  settings: {
    autoRefreshEnabled: true,
    minRefreshInterval: 100000, //  seconds
    maxRefreshInterval: 600000, //  seconds
    popunderChance: 0.18, // % chance on random clicks
    loadingDelay: {
      min: 500,
      max: 2500
    },
    
    // Auto-clicker settings
    autoClicker: {
      enabled: true,
      minInterval: 50000,  //  seconds
      maxInterval: 150000, //  seconds
      clicksPerSession: 10, // Maximum clicks per session
      targetAdsOnly: true   // Only click on ad elements
    },
    
    // Random clicker settings
    randomClicker: {
      enabled: true,
      probability: 0.05,    // % chance per interval
      interval: 10000,       // Check every 3 seconds
      maxClicksPerMinute: 8 // Limit random clicks
    }
  }
};
