// Ad Configuration
// You can easily modify this file to change the ad embed code
export const adConfig = {
  // Main ad embed code - change this to update all ads
  embedCode: `
  <script type='text/javascript' src='//pl27078850.profitableratecpm.com/2c/cf/4a/2ccf4adde15c77608f053ee7c15d745d.js'></script>`,
  
  // Additional configuration options
  settings: {
    autoRefreshEnabled: true,
    minRefreshInterval: 10000, // 10 seconds
    maxRefreshInterval: 60000, // 60 seconds
    popunderChance: 0.1, // 10% chance on random clicks
    loadingDelay: {
      min: 500,
      max: 2500
    }
  }
};
