// Countries data for cartogram visualization
// Sources: World Bank (2023), UN World Population Prospects (2024), CIA World Factbook
// Positions are hand-curated for map-like cartogram layout

// Canvas dimensions (reference size, scales responsively)
export const canvasWidth = 1500
export const canvasHeight = 560

// Tile size categories based on geographic area (km²)
export const tileSizes = {
  xxl: { min: 5000000, width: 140, height: 70 },   // Russia
  xl: { min: 3000000, width: 100, height: 55 },    // Canada, USA, China, Brazil, Australia
  l: { min: 1000000, width: 75, height: 42 },      // India, Argentina, Kazakhstan, etc.
  m: { min: 300000, width: 58, height: 34 },       // Egypt, Nigeria, Turkey, etc.
  s: { min: 50000, width: 46, height: 28 },        // UK, Germany, Japan, etc.
  xs: { min: 0, width: 36, height: 22 }            // Small countries
}

export function getTileSize(area) {
  if (area >= 5000000) return 'xxl'
  if (area >= 3000000) return 'xl'
  if (area >= 1000000) return 'l'
  if (area >= 300000) return 'm'
  if (area >= 50000) return 's'
  return 'xs'
}

export function getTileDimensions(area) {
  const size = getTileSize(area)
  return tileSizes[size]
}

// All countries with x,y positions for map-like layout
// Coordinates are percentages of canvas (0-100)
export const countries = [
  // ═══════════════════════════════════════════════════════════════
  // EUROPE (positioned in upper-center-left of map)
  // ═══════════════════════════════════════════════════════════════

  // Northern Europe
  { code: 'IS', name: 'Iceland', continent: 'europe', area: 103000, population: 376000, gdpPerCapita: 73466, lifeExpectancy: 83.1, internetPenetration: 99, flag: '🇮🇸', x: 28, y: 8 },
  { code: 'NO', name: 'Norway', continent: 'europe', area: 385207, population: 5474000, gdpPerCapita: 89090, lifeExpectancy: 83.2, internetPenetration: 98, flag: '🇳🇴', x: 36, y: 6 },
  { code: 'SE', name: 'Sweden', continent: 'europe', area: 450295, population: 10540000, gdpPerCapita: 55746, lifeExpectancy: 83.0, internetPenetration: 95, flag: '🇸🇪', x: 39, y: 8 },
  { code: 'FI', name: 'Finland', continent: 'europe', area: 338424, population: 5541000, gdpPerCapita: 50878, lifeExpectancy: 82.0, internetPenetration: 93, flag: '🇫🇮', x: 43, y: 6 },
  { code: 'EE', name: 'Estonia', continent: 'europe', area: 45339, population: 1366000, gdpPerCapita: 28247, lifeExpectancy: 78.8, internetPenetration: 91, flag: '🇪🇪', x: 44, y: 13 },
  { code: 'LV', name: 'Latvia', continent: 'europe', area: 64573, population: 1884000, gdpPerCapita: 22466, lifeExpectancy: 75.7, internetPenetration: 90, flag: '🇱🇻', x: 44, y: 16 },
  { code: 'LT', name: 'Lithuania', continent: 'europe', area: 65300, population: 2860000, gdpPerCapita: 24989, lifeExpectancy: 76.0, internetPenetration: 87, flag: '🇱🇹', x: 44, y: 19 },

  // Western Europe
  { code: 'IE', name: 'Ireland', continent: 'europe', area: 70273, population: 5060000, gdpPerCapita: 100172, lifeExpectancy: 82.0, internetPenetration: 92, flag: '🇮🇪', x: 27, y: 18 },
  { code: 'GB', name: 'United Kingdom', continent: 'europe', area: 242495, population: 67330000, gdpPerCapita: 45850, lifeExpectancy: 80.7, internetPenetration: 95, flag: '🇬🇧', x: 30, y: 18 },
  { code: 'NL', name: 'Netherlands', continent: 'europe', area: 41850, population: 17590000, gdpPerCapita: 57025, lifeExpectancy: 81.7, internetPenetration: 93, flag: '🇳🇱', x: 35, y: 18 },
  { code: 'BE', name: 'Belgium', continent: 'europe', area: 30528, population: 11590000, gdpPerCapita: 51096, lifeExpectancy: 81.4, internetPenetration: 92, flag: '🇧🇪', x: 35, y: 21 },
  { code: 'LU', name: 'Luxembourg', continent: 'europe', area: 2586, population: 654000, gdpPerCapita: 126426, lifeExpectancy: 82.6, internetPenetration: 99, flag: '🇱🇺', x: 36, y: 23 },
  { code: 'FR', name: 'France', continent: 'europe', area: 643801, population: 67750000, gdpPerCapita: 44995, lifeExpectancy: 82.5, internetPenetration: 90, flag: '🇫🇷', x: 32, y: 26 },
  { code: 'MC', name: 'Monaco', continent: 'europe', area: 2, population: 40000, gdpPerCapita: 190512, lifeExpectancy: 85.9, internetPenetration: 97, flag: '🇲🇨', x: 36, y: 31 },

  // Central Europe
  { code: 'DE', name: 'Germany', continent: 'europe', area: 357114, population: 84360000, gdpPerCapita: 51384, lifeExpectancy: 80.6, internetPenetration: 93, flag: '🇩🇪', x: 38, y: 20 },
  { code: 'PL', name: 'Poland', continent: 'europe', area: 312696, population: 37750000, gdpPerCapita: 18000, lifeExpectancy: 76.5, internetPenetration: 87, flag: '🇵🇱', x: 42, y: 19 },
  { code: 'CZ', name: 'Czechia', continent: 'europe', area: 78871, population: 10700000, gdpPerCapita: 27220, lifeExpectancy: 79.0, internetPenetration: 88, flag: '🇨🇿', x: 40, y: 23 },
  { code: 'SK', name: 'Slovakia', continent: 'europe', area: 49037, population: 5460000, gdpPerCapita: 21098, lifeExpectancy: 77.5, internetPenetration: 85, flag: '🇸🇰', x: 43, y: 24 },
  { code: 'AT', name: 'Austria', continent: 'europe', area: 83879, population: 9100000, gdpPerCapita: 53638, lifeExpectancy: 81.5, internetPenetration: 93, flag: '🇦🇹', x: 40, y: 26 },
  { code: 'CH', name: 'Switzerland', continent: 'europe', area: 41285, population: 8770000, gdpPerCapita: 92434, lifeExpectancy: 83.8, internetPenetration: 96, flag: '🇨🇭', x: 37, y: 27 },
  { code: 'LI', name: 'Liechtenstein', continent: 'europe', area: 160, population: 39000, gdpPerCapita: 180000, lifeExpectancy: 82.0, internetPenetration: 98, flag: '🇱🇮', x: 38, y: 26 },
  { code: 'HU', name: 'Hungary', continent: 'europe', area: 93028, population: 9750000, gdpPerCapita: 18390, lifeExpectancy: 76.7, internetPenetration: 89, flag: '🇭🇺', x: 43, y: 27 },

  // Southern Europe
  { code: 'PT', name: 'Portugal', continent: 'europe', area: 92226, population: 10350000, gdpPerCapita: 24500, lifeExpectancy: 81.9, internetPenetration: 85, flag: '🇵🇹', x: 27, y: 32 },
  { code: 'ES', name: 'Spain', continent: 'europe', area: 505990, population: 47420000, gdpPerCapita: 30104, lifeExpectancy: 83.3, internetPenetration: 94, flag: '🇪🇸', x: 29, y: 33 },
  { code: 'AD', name: 'Andorra', continent: 'europe', area: 468, population: 80000, gdpPerCapita: 42030, lifeExpectancy: 81.5, internetPenetration: 94, flag: '🇦🇩', x: 32, y: 31 },
  { code: 'IT', name: 'Italy', continent: 'europe', area: 301340, population: 59110000, gdpPerCapita: 35657, lifeExpectancy: 83.5, internetPenetration: 85, flag: '🇮🇹', x: 39, y: 31 },
  { code: 'SM', name: 'San Marino', continent: 'europe', area: 61, population: 34000, gdpPerCapita: 47000, lifeExpectancy: 83.1, internetPenetration: 60, flag: '🇸🇲', x: 39, y: 30 },
  { code: 'MT', name: 'Malta', continent: 'europe', area: 316, population: 520000, gdpPerCapita: 34000, lifeExpectancy: 82.5, internetPenetration: 87, flag: '🇲🇹', x: 40, y: 37 },
  { code: 'SI', name: 'Slovenia', continent: 'europe', area: 20273, population: 2120000, gdpPerCapita: 28439, lifeExpectancy: 81.3, internetPenetration: 89, flag: '🇸🇮', x: 41, y: 28 },
  { code: 'HR', name: 'Croatia', continent: 'europe', area: 56594, population: 3870000, gdpPerCapita: 18588, lifeExpectancy: 78.2, internetPenetration: 79, flag: '🇭🇷', x: 42, y: 30 },
  { code: 'BA', name: 'Bosnia', continent: 'europe', area: 51209, population: 3270000, gdpPerCapita: 7000, lifeExpectancy: 77.4, internetPenetration: 75, flag: '🇧🇦', x: 43, y: 31 },
  { code: 'RS', name: 'Serbia', continent: 'europe', area: 88361, population: 6870000, gdpPerCapita: 9200, lifeExpectancy: 76.0, internetPenetration: 81, flag: '🇷🇸', x: 44, y: 31 },
  { code: 'ME', name: 'Montenegro', continent: 'europe', area: 13812, population: 620000, gdpPerCapita: 10000, lifeExpectancy: 76.9, internetPenetration: 82, flag: '🇲🇪', x: 43, y: 33 },
  { code: 'XK', name: 'Kosovo', continent: 'europe', area: 10887, population: 1870000, gdpPerCapita: 5000, lifeExpectancy: 72.0, internetPenetration: 93, flag: '🇽🇰', x: 44, y: 33 },
  { code: 'AL', name: 'Albania', continent: 'europe', area: 28748, population: 2870000, gdpPerCapita: 6400, lifeExpectancy: 78.6, internetPenetration: 79, flag: '🇦🇱', x: 44, y: 35 },
  { code: 'MK', name: 'North Macedonia', continent: 'europe', area: 25713, population: 2080000, gdpPerCapita: 6700, lifeExpectancy: 76.0, internetPenetration: 83, flag: '🇲🇰', x: 45, y: 34 },
  { code: 'GR', name: 'Greece', continent: 'europe', area: 131957, population: 10430000, gdpPerCapita: 20867, lifeExpectancy: 81.4, internetPenetration: 78, flag: '🇬🇷', x: 45, y: 36 },
  { code: 'CY', name: 'Cyprus', continent: 'europe', area: 9251, population: 1260000, gdpPerCapita: 31579, lifeExpectancy: 81.2, internetPenetration: 91, flag: '🇨🇾', x: 49, y: 38 },

  // Eastern Europe
  { code: 'BY', name: 'Belarus', continent: 'europe', area: 207600, population: 9230000, gdpPerCapita: 7000, lifeExpectancy: 74.8, internetPenetration: 85, flag: '🇧🇾', x: 47, y: 17 },
  { code: 'UA', name: 'Ukraine', continent: 'europe', area: 603550, population: 37000000, gdpPerCapita: 4835, lifeExpectancy: 71.6, internetPenetration: 79, flag: '🇺🇦', x: 49, y: 22 },
  { code: 'MD', name: 'Moldova', continent: 'europe', area: 33846, population: 2540000, gdpPerCapita: 5563, lifeExpectancy: 72.0, internetPenetration: 76, flag: '🇲🇩', x: 48, y: 26 },
  { code: 'RO', name: 'Romania', continent: 'europe', area: 238397, population: 19050000, gdpPerCapita: 15000, lifeExpectancy: 76.0, internetPenetration: 84, flag: '🇷🇴', x: 46, y: 28 },
  { code: 'BG', name: 'Bulgaria', continent: 'europe', area: 110879, population: 6880000, gdpPerCapita: 13772, lifeExpectancy: 75.1, internetPenetration: 71, flag: '🇧🇬', x: 47, y: 32 },

  // ═══════════════════════════════════════════════════════════════
  // ASIA (positioned in upper-right of map)
  // ═══════════════════════════════════════════════════════════════

  // Russia (spans Europe/Asia)
  { code: 'RU', name: 'Russia', continent: 'asia', area: 17098242, population: 144400000, gdpPerCapita: 12195, lifeExpectancy: 73.2, internetPenetration: 85, flag: '🇷🇺', x: 65, y: 10 },

  // Central Asia
  { code: 'KZ', name: 'Kazakhstan', continent: 'asia', area: 2724900, population: 19400000, gdpPerCapita: 11477, lifeExpectancy: 74.4, internetPenetration: 91, flag: '🇰🇿', x: 60, y: 24 },
  { code: 'UZ', name: 'Uzbekistan', continent: 'asia', area: 448978, population: 35300000, gdpPerCapita: 2255, lifeExpectancy: 72.0, internetPenetration: 77, flag: '🇺🇿', x: 58, y: 30 },
  { code: 'TM', name: 'Turkmenistan', continent: 'asia', area: 488100, population: 6430000, gdpPerCapita: 8000, lifeExpectancy: 70.0, internetPenetration: 38, flag: '🇹🇲', x: 55, y: 32 },
  { code: 'KG', name: 'Kyrgyzstan', continent: 'asia', area: 199951, population: 6970000, gdpPerCapita: 1374, lifeExpectancy: 72.1, internetPenetration: 78, flag: '🇰🇬', x: 62, y: 30 },
  { code: 'TJ', name: 'Tajikistan', continent: 'asia', area: 143100, population: 10000000, gdpPerCapita: 859, lifeExpectancy: 71.6, internetPenetration: 35, flag: '🇹🇯', x: 60, y: 33 },

  // Middle East
  { code: 'TR', name: 'Turkey', continent: 'asia', area: 783562, population: 85280000, gdpPerCapita: 9661, lifeExpectancy: 78.6, internetPenetration: 83, flag: '🇹🇷', x: 50, y: 33 },
  { code: 'GE', name: 'Georgia', continent: 'asia', area: 69700, population: 3710000, gdpPerCapita: 6671, lifeExpectancy: 74.2, internetPenetration: 76, flag: '🇬🇪', x: 53, y: 30 },
  { code: 'AM', name: 'Armenia', continent: 'asia', area: 29743, population: 2780000, gdpPerCapita: 6618, lifeExpectancy: 75.1, internetPenetration: 79, flag: '🇦🇲', x: 54, y: 32 },
  { code: 'AZ', name: 'Azerbaijan', continent: 'asia', area: 86600, population: 10140000, gdpPerCapita: 6062, lifeExpectancy: 73.3, internetPenetration: 86, flag: '🇦🇿', x: 55, y: 31 },
  { code: 'IR', name: 'Iran', continent: 'asia', area: 1648195, population: 87590000, gdpPerCapita: 4100, lifeExpectancy: 77.3, internetPenetration: 84, flag: '🇮🇷', x: 56, y: 38 },
  { code: 'IQ', name: 'Iraq', continent: 'asia', area: 438317, population: 43530000, gdpPerCapita: 5955, lifeExpectancy: 71.4, internetPenetration: 79, flag: '🇮🇶', x: 53, y: 40 },
  { code: 'SY', name: 'Syria', continent: 'asia', area: 185180, population: 22130000, gdpPerCapita: 530, lifeExpectancy: 73.7, internetPenetration: 36, flag: '🇸🇾', x: 51, y: 38 },
  { code: 'LB', name: 'Lebanon', continent: 'asia', area: 10452, population: 5490000, gdpPerCapita: 4136, lifeExpectancy: 79.3, internetPenetration: 87, flag: '🇱🇧', x: 50, y: 40 },
  { code: 'JO', name: 'Jordan', continent: 'asia', area: 89342, population: 11150000, gdpPerCapita: 4405, lifeExpectancy: 74.5, internetPenetration: 90, flag: '🇯🇴', x: 50, y: 43 },
  { code: 'IL', name: 'Israel', continent: 'asia', area: 22072, population: 9730000, gdpPerCapita: 52170, lifeExpectancy: 83.0, internetPenetration: 90, flag: '🇮🇱', x: 49, y: 42 },
  { code: 'PS', name: 'Palestine', continent: 'asia', area: 6020, population: 5370000, gdpPerCapita: 3664, lifeExpectancy: 74.4, internetPenetration: 80, flag: '🇵🇸', x: 49, y: 44 },
  { code: 'SA', name: 'Saudi Arabia', continent: 'asia', area: 2149690, population: 36410000, gdpPerCapita: 23186, lifeExpectancy: 76.9, internetPenetration: 98, flag: '🇸🇦', x: 53, y: 48 },
  { code: 'YE', name: 'Yemen', continent: 'asia', area: 527968, population: 33700000, gdpPerCapita: 657, lifeExpectancy: 66.4, internetPenetration: 27, flag: '🇾🇪', x: 54, y: 56 },
  { code: 'OM', name: 'Oman', continent: 'asia', area: 309500, population: 4520000, gdpPerCapita: 20791, lifeExpectancy: 78.2, internetPenetration: 96, flag: '🇴🇲', x: 57, y: 52 },
  { code: 'AE', name: 'UAE', continent: 'asia', area: 83600, population: 9440000, gdpPerCapita: 44316, lifeExpectancy: 78.7, internetPenetration: 100, flag: '🇦🇪', x: 57, y: 48 },
  { code: 'QA', name: 'Qatar', continent: 'asia', area: 11586, population: 2690000, gdpPerCapita: 66838, lifeExpectancy: 80.2, internetPenetration: 100, flag: '🇶🇦', x: 56, y: 48 },
  { code: 'BH', name: 'Bahrain', continent: 'asia', area: 778, population: 1470000, gdpPerCapita: 26562, lifeExpectancy: 77.7, internetPenetration: 100, flag: '🇧🇭', x: 55, y: 47 },
  { code: 'KW', name: 'Kuwait', continent: 'asia', area: 17818, population: 4310000, gdpPerCapita: 34261, lifeExpectancy: 78.7, internetPenetration: 99, flag: '🇰🇼', x: 54, y: 44 },

  // South Asia
  { code: 'AF', name: 'Afghanistan', continent: 'asia', area: 652230, population: 40100000, gdpPerCapita: 380, lifeExpectancy: 64.8, internetPenetration: 18, flag: '🇦🇫', x: 60, y: 38 },
  { code: 'PK', name: 'Pakistan', continent: 'asia', area: 881913, population: 231400000, gdpPerCapita: 1505, lifeExpectancy: 67.3, internetPenetration: 36, flag: '🇵🇰', x: 61, y: 44 },
  { code: 'IN', name: 'India', continent: 'asia', area: 3287263, population: 1428600000, gdpPerCapita: 2389, lifeExpectancy: 70.4, internetPenetration: 52, flag: '🇮🇳', x: 64, y: 50 },
  { code: 'NP', name: 'Nepal', continent: 'asia', area: 147516, population: 30900000, gdpPerCapita: 1337, lifeExpectancy: 70.8, internetPenetration: 52, flag: '🇳🇵', x: 67, y: 44 },
  { code: 'BT', name: 'Bhutan', continent: 'asia', area: 38394, population: 780000, gdpPerCapita: 3560, lifeExpectancy: 72.1, internetPenetration: 62, flag: '🇧🇹', x: 70, y: 44 },
  { code: 'BD', name: 'Bangladesh', continent: 'asia', area: 147570, population: 172950000, gdpPerCapita: 2688, lifeExpectancy: 72.4, internetPenetration: 45, flag: '🇧🇩', x: 70, y: 48 },
  { code: 'LK', name: 'Sri Lanka', continent: 'asia', area: 65610, population: 22040000, gdpPerCapita: 3815, lifeExpectancy: 77.4, internetPenetration: 52, flag: '🇱🇰', x: 66, y: 62 },
  { code: 'MV', name: 'Maldives', continent: 'asia', area: 300, population: 520000, gdpPerCapita: 12079, lifeExpectancy: 79.9, internetPenetration: 75, flag: '🇲🇻', x: 63, y: 66 },

  // East Asia
  { code: 'MN', name: 'Mongolia', continent: 'asia', area: 1564110, population: 3400000, gdpPerCapita: 4566, lifeExpectancy: 71.5, internetPenetration: 84, flag: '🇲🇳', x: 73, y: 28 },
  { code: 'CN', name: 'China', continent: 'asia', area: 9596961, population: 1425671000, gdpPerCapita: 12720, lifeExpectancy: 78.2, internetPenetration: 73, flag: '🇨🇳', x: 75, y: 38 },
  { code: 'KP', name: 'North Korea', continent: 'asia', area: 120540, population: 26070000, gdpPerCapita: 1800, lifeExpectancy: 72.3, internetPenetration: 0, flag: '🇰🇵', x: 82, y: 34 },
  { code: 'KR', name: 'South Korea', continent: 'asia', area: 100210, population: 51780000, gdpPerCapita: 32255, lifeExpectancy: 83.7, internetPenetration: 98, flag: '🇰🇷', x: 83, y: 38 },
  { code: 'JP', name: 'Japan', continent: 'asia', area: 377975, population: 123950000, gdpPerCapita: 33815, lifeExpectancy: 84.8, internetPenetration: 93, flag: '🇯🇵', x: 87, y: 38 },
  { code: 'TW', name: 'Taiwan', continent: 'asia', area: 36193, population: 23890000, gdpPerCapita: 33140, lifeExpectancy: 81.0, internetPenetration: 93, flag: '🇹🇼', x: 84, y: 48 },

  // Southeast Asia
  { code: 'MM', name: 'Myanmar', continent: 'asia', area: 676578, population: 54180000, gdpPerCapita: 1210, lifeExpectancy: 67.1, internetPenetration: 44, flag: '🇲🇲', x: 72, y: 52 },
  { code: 'TH', name: 'Thailand', continent: 'asia', area: 513120, population: 71800000, gdpPerCapita: 7066, lifeExpectancy: 79.3, internetPenetration: 88, flag: '🇹🇭', x: 74, y: 56 },
  { code: 'LA', name: 'Laos', continent: 'asia', area: 236800, population: 7530000, gdpPerCapita: 2503, lifeExpectancy: 68.9, internetPenetration: 62, flag: '🇱🇦', x: 76, y: 52 },
  { code: 'VN', name: 'Vietnam', continent: 'asia', area: 331212, population: 98860000, gdpPerCapita: 4164, lifeExpectancy: 75.4, internetPenetration: 79, flag: '🇻🇳', x: 78, y: 55 },
  { code: 'KH', name: 'Cambodia', continent: 'asia', area: 181035, population: 16720000, gdpPerCapita: 1759, lifeExpectancy: 70.1, internetPenetration: 60, flag: '🇰🇭', x: 76, y: 58 },
  { code: 'MY', name: 'Malaysia', continent: 'asia', area: 330803, population: 34310000, gdpPerCapita: 12449, lifeExpectancy: 76.0, internetPenetration: 97, flag: '🇲🇾', x: 76, y: 66 },
  { code: 'SG', name: 'Singapore', continent: 'asia', area: 733, population: 5640000, gdpPerCapita: 65233, lifeExpectancy: 83.9, internetPenetration: 96, flag: '🇸🇬', x: 76, y: 70 },
  { code: 'BN', name: 'Brunei', continent: 'asia', area: 5765, population: 450000, gdpPerCapita: 31087, lifeExpectancy: 74.6, internetPenetration: 98, flag: '🇧🇳', x: 80, y: 66 },
  { code: 'ID', name: 'Indonesia', continent: 'asia', area: 1904569, population: 277534000, gdpPerCapita: 4788, lifeExpectancy: 71.9, internetPenetration: 77, flag: '🇮🇩', x: 80, y: 72 },
  { code: 'TL', name: 'Timor-Leste', continent: 'asia', area: 14919, population: 1340000, gdpPerCapita: 1456, lifeExpectancy: 70.2, internetPenetration: 39, flag: '🇹🇱', x: 85, y: 76 },
  { code: 'PH', name: 'Philippines', continent: 'asia', area: 300000, population: 117340000, gdpPerCapita: 3623, lifeExpectancy: 71.2, internetPenetration: 68, flag: '🇵🇭', x: 84, y: 58 },

  // ═══════════════════════════════════════════════════════════════
  // AFRICA (positioned in center-left of map)
  // ═══════════════════════════════════════════════════════════════

  // North Africa
  { code: 'MA', name: 'Morocco', continent: 'africa', area: 446550, population: 37080000, gdpPerCapita: 3795, lifeExpectancy: 77.0, internetPenetration: 88, flag: '🇲🇦', x: 29, y: 42 },
  { code: 'DZ', name: 'Algeria', continent: 'africa', area: 2381741, population: 45610000, gdpPerCapita: 3979, lifeExpectancy: 77.1, internetPenetration: 71, flag: '🇩🇿', x: 34, y: 44 },
  { code: 'TN', name: 'Tunisia', continent: 'africa', area: 163610, population: 12360000, gdpPerCapita: 3775, lifeExpectancy: 76.7, internetPenetration: 72, flag: '🇹🇳', x: 38, y: 40 },
  { code: 'LY', name: 'Libya', continent: 'africa', area: 1759540, population: 6890000, gdpPerCapita: 6018, lifeExpectancy: 73.4, internetPenetration: 82, flag: '🇱🇾', x: 41, y: 46 },
  { code: 'EG', name: 'Egypt', continent: 'africa', area: 1002450, population: 104460000, gdpPerCapita: 3699, lifeExpectancy: 72.0, internetPenetration: 72, flag: '🇪🇬', x: 47, y: 46 },

  // West Africa
  { code: 'MR', name: 'Mauritania', continent: 'africa', area: 1030700, population: 4620000, gdpPerCapita: 1934, lifeExpectancy: 64.9, internetPenetration: 59, flag: '🇲🇷', x: 29, y: 52 },
  { code: 'SN', name: 'Senegal', continent: 'africa', area: 196722, population: 17200000, gdpPerCapita: 1638, lifeExpectancy: 68.0, internetPenetration: 58, flag: '🇸🇳', x: 26, y: 56 },
  { code: 'GM', name: 'Gambia', continent: 'africa', area: 11295, population: 2640000, gdpPerCapita: 772, lifeExpectancy: 63.3, internetPenetration: 33, flag: '🇬🇲', x: 26, y: 58 },
  { code: 'GW', name: 'Guinea-Bissau', continent: 'africa', area: 36125, population: 2060000, gdpPerCapita: 820, lifeExpectancy: 60.0, internetPenetration: 18, flag: '🇬🇼', x: 26, y: 60 },
  { code: 'GN', name: 'Guinea', continent: 'africa', area: 245857, population: 13860000, gdpPerCapita: 1174, lifeExpectancy: 61.6, internetPenetration: 35, flag: '🇬🇳', x: 27, y: 62 },
  { code: 'SL', name: 'Sierra Leone', continent: 'africa', area: 71740, population: 8420000, gdpPerCapita: 478, lifeExpectancy: 55.0, internetPenetration: 13, flag: '🇸🇱', x: 27, y: 64 },
  { code: 'LR', name: 'Liberia', continent: 'africa', area: 111369, population: 5300000, gdpPerCapita: 675, lifeExpectancy: 64.1, internetPenetration: 17, flag: '🇱🇷', x: 28, y: 66 },
  { code: 'CI', name: 'Ivory Coast', continent: 'africa', area: 322463, population: 28160000, gdpPerCapita: 2549, lifeExpectancy: 58.8, internetPenetration: 45, flag: '🇨🇮', x: 30, y: 66 },
  { code: 'ML', name: 'Mali', continent: 'africa', area: 1240192, population: 22590000, gdpPerCapita: 853, lifeExpectancy: 59.3, internetPenetration: 34, flag: '🇲🇱', x: 32, y: 54 },
  { code: 'BF', name: 'Burkina Faso', continent: 'africa', area: 274200, population: 22670000, gdpPerCapita: 831, lifeExpectancy: 62.0, internetPenetration: 21, flag: '🇧🇫', x: 32, y: 60 },
  { code: 'GH', name: 'Ghana', continent: 'africa', area: 238533, population: 33470000, gdpPerCapita: 2363, lifeExpectancy: 64.1, internetPenetration: 68, flag: '🇬🇭', x: 32, y: 66 },
  { code: 'TG', name: 'Togo', continent: 'africa', area: 56785, population: 8850000, gdpPerCapita: 968, lifeExpectancy: 62.0, internetPenetration: 35, flag: '🇹🇬', x: 34, y: 66 },
  { code: 'BJ', name: 'Benin', continent: 'africa', area: 114763, population: 13350000, gdpPerCapita: 1428, lifeExpectancy: 62.8, internetPenetration: 42, flag: '🇧🇯', x: 35, y: 66 },
  { code: 'NE', name: 'Niger', continent: 'africa', area: 1267000, population: 26210000, gdpPerCapita: 589, lifeExpectancy: 63.0, internetPenetration: 22, flag: '🇳🇪', x: 37, y: 56 },
  { code: 'NG', name: 'Nigeria', continent: 'africa', area: 923768, population: 223800000, gdpPerCapita: 2184, lifeExpectancy: 53.9, internetPenetration: 55, flag: '🇳🇬', x: 37, y: 64 },
  { code: 'CV', name: 'Cabo Verde', continent: 'africa', area: 4033, population: 590000, gdpPerCapita: 3774, lifeExpectancy: 74.1, internetPenetration: 70, flag: '🇨🇻', x: 22, y: 56 },

  // Central Africa
  { code: 'TD', name: 'Chad', continent: 'africa', area: 1284000, population: 17960000, gdpPerCapita: 696, lifeExpectancy: 54.2, internetPenetration: 19, flag: '🇹🇩', x: 42, y: 56 },
  { code: 'CM', name: 'Cameroon', continent: 'africa', area: 475442, population: 28050000, gdpPerCapita: 1665, lifeExpectancy: 60.3, internetPenetration: 45, flag: '🇨🇲', x: 39, y: 66 },
  { code: 'CF', name: 'Central African Rep.', continent: 'africa', area: 622984, population: 5580000, gdpPerCapita: 415, lifeExpectancy: 54.4, internetPenetration: 11, flag: '🇨🇫', x: 43, y: 66 },
  { code: 'GQ', name: 'Equatorial Guinea', continent: 'africa', area: 28051, population: 1670000, gdpPerCapita: 8150, lifeExpectancy: 60.6, internetPenetration: 54, flag: '🇬🇶', x: 38, y: 70 },
  { code: 'GA', name: 'Gabon', continent: 'africa', area: 267668, population: 2390000, gdpPerCapita: 8820, lifeExpectancy: 66.5, internetPenetration: 74, flag: '🇬🇦', x: 38, y: 73 },
  { code: 'CG', name: 'Congo', continent: 'africa', area: 342000, population: 6010000, gdpPerCapita: 2380, lifeExpectancy: 65.2, internetPenetration: 19, flag: '🇨🇬', x: 40, y: 74 },
  { code: 'CD', name: 'DR Congo', continent: 'africa', area: 2344858, population: 99010000, gdpPerCapita: 584, lifeExpectancy: 60.7, internetPenetration: 23, flag: '🇨🇩', x: 44, y: 72 },
  { code: 'ST', name: 'São Tomé', continent: 'africa', area: 964, population: 230000, gdpPerCapita: 2405, lifeExpectancy: 71.0, internetPenetration: 66, flag: '🇸🇹', x: 35, y: 70 },

  // East Africa
  { code: 'SD', name: 'Sudan', continent: 'africa', area: 1861484, population: 46750000, gdpPerCapita: 516, lifeExpectancy: 66.1, internetPenetration: 31, flag: '🇸🇩', x: 47, y: 54 },
  { code: 'SS', name: 'South Sudan', continent: 'africa', area: 644329, population: 11380000, gdpPerCapita: 393, lifeExpectancy: 55.0, internetPenetration: 8, flag: '🇸🇸', x: 48, y: 64 },
  { code: 'ER', name: 'Eritrea', continent: 'africa', area: 117600, population: 3680000, gdpPerCapita: 643, lifeExpectancy: 67.5, internetPenetration: 7, flag: '🇪🇷', x: 52, y: 56 },
  { code: 'ET', name: 'Ethiopia', continent: 'africa', area: 1104300, population: 123400000, gdpPerCapita: 1027, lifeExpectancy: 67.8, internetPenetration: 24, flag: '🇪🇹', x: 52, y: 62 },
  { code: 'DJ', name: 'Djibouti', continent: 'africa', area: 23200, population: 1130000, gdpPerCapita: 3411, lifeExpectancy: 63.5, internetPenetration: 69, flag: '🇩🇯', x: 54, y: 60 },
  { code: 'SO', name: 'Somalia', continent: 'africa', area: 637657, population: 18140000, gdpPerCapita: 447, lifeExpectancy: 58.3, internetPenetration: 14, flag: '🇸🇴', x: 55, y: 66 },
  { code: 'KE', name: 'Kenya', continent: 'africa', area: 580367, population: 54030000, gdpPerCapita: 2007, lifeExpectancy: 67.0, internetPenetration: 42, flag: '🇰🇪', x: 52, y: 70 },
  { code: 'UG', name: 'Uganda', continent: 'africa', area: 241550, population: 47250000, gdpPerCapita: 883, lifeExpectancy: 64.4, internetPenetration: 26, flag: '🇺🇬', x: 49, y: 70 },
  { code: 'RW', name: 'Rwanda', continent: 'africa', area: 26338, population: 13780000, gdpPerCapita: 966, lifeExpectancy: 69.0, internetPenetration: 32, flag: '🇷🇼', x: 48, y: 74 },
  { code: 'BI', name: 'Burundi', continent: 'africa', area: 27834, population: 12890000, gdpPerCapita: 259, lifeExpectancy: 62.7, internetPenetration: 13, flag: '🇧🇮', x: 48, y: 76 },
  { code: 'TZ', name: 'Tanzania', continent: 'africa', area: 945087, population: 65500000, gdpPerCapita: 1192, lifeExpectancy: 66.2, internetPenetration: 32, flag: '🇹🇿', x: 51, y: 76 },

  // Southern Africa
  { code: 'AO', name: 'Angola', continent: 'africa', area: 1246700, population: 35590000, gdpPerCapita: 2397, lifeExpectancy: 62.2, internetPenetration: 36, flag: '🇦🇴', x: 42, y: 80 },
  { code: 'ZM', name: 'Zambia', continent: 'africa', area: 752612, population: 20020000, gdpPerCapita: 1169, lifeExpectancy: 65.3, internetPenetration: 27, flag: '🇿🇲', x: 47, y: 82 },
  { code: 'MW', name: 'Malawi', continent: 'africa', area: 118484, population: 20410000, gdpPerCapita: 634, lifeExpectancy: 65.6, internetPenetration: 18, flag: '🇲🇼', x: 51, y: 82 },
  { code: 'MZ', name: 'Mozambique', continent: 'africa', area: 801590, population: 32970000, gdpPerCapita: 539, lifeExpectancy: 62.1, internetPenetration: 21, flag: '🇲🇿', x: 52, y: 86 },
  { code: 'ZW', name: 'Zimbabwe', continent: 'africa', area: 390757, population: 16320000, gdpPerCapita: 1773, lifeExpectancy: 61.5, internetPenetration: 35, flag: '🇿🇼', x: 48, y: 86 },
  { code: 'BW', name: 'Botswana', continent: 'africa', area: 581730, population: 2630000, gdpPerCapita: 7738, lifeExpectancy: 61.5, internetPenetration: 74, flag: '🇧🇼', x: 46, y: 88 },
  { code: 'NA', name: 'Namibia', continent: 'africa', area: 825615, population: 2530000, gdpPerCapita: 4866, lifeExpectancy: 59.3, internetPenetration: 56, flag: '🇳🇦', x: 42, y: 88 },
  { code: 'ZA', name: 'South Africa', continent: 'africa', area: 1221037, population: 60410000, gdpPerCapita: 6001, lifeExpectancy: 62.3, internetPenetration: 72, flag: '🇿🇦', x: 46, y: 94 },
  { code: 'LS', name: 'Lesotho', continent: 'africa', area: 30355, population: 2310000, gdpPerCapita: 1106, lifeExpectancy: 54.3, internetPenetration: 48, flag: '🇱🇸', x: 48, y: 95 },
  { code: 'SZ', name: 'Eswatini', continent: 'africa', area: 17364, population: 1200000, gdpPerCapita: 3987, lifeExpectancy: 58.6, internetPenetration: 58, flag: '🇸🇿', x: 50, y: 94 },
  { code: 'MG', name: 'Madagascar', continent: 'africa', area: 587041, population: 29610000, gdpPerCapita: 507, lifeExpectancy: 67.0, internetPenetration: 22, flag: '🇲🇬', x: 56, y: 86 },
  { code: 'KM', name: 'Comoros', continent: 'africa', area: 1862, population: 850000, gdpPerCapita: 1411, lifeExpectancy: 65.0, internetPenetration: 25, flag: '🇰🇲', x: 54, y: 80 },
  { code: 'MU', name: 'Mauritius', continent: 'africa', area: 2040, population: 1270000, gdpPerCapita: 10216, lifeExpectancy: 75.5, internetPenetration: 68, flag: '🇲🇺', x: 59, y: 86 },
  { code: 'SC', name: 'Seychelles', continent: 'africa', area: 459, population: 100000, gdpPerCapita: 17448, lifeExpectancy: 74.0, internetPenetration: 79, flag: '🇸🇨', x: 58, y: 76 },

  // ═══════════════════════════════════════════════════════════════
  // NORTH AMERICA (positioned in upper-left of map)
  // ═══════════════════════════════════════════════════════════════

  { code: 'CA', name: 'Canada', continent: 'northAmerica', area: 9984670, population: 39290000, gdpPerCapita: 52722, lifeExpectancy: 82.5, internetPenetration: 93, flag: '🇨🇦', x: 12, y: 16 },
  { code: 'US', name: 'United States', continent: 'northAmerica', area: 9833520, population: 339000000, gdpPerCapita: 76330, lifeExpectancy: 77.5, internetPenetration: 92, flag: '🇺🇸', x: 12, y: 30 },
  { code: 'MX', name: 'Mexico', continent: 'northAmerica', area: 1964375, population: 128900000, gdpPerCapita: 10948, lifeExpectancy: 75.0, internetPenetration: 76, flag: '🇲🇽', x: 10, y: 48 },

  // Central America
  { code: 'GT', name: 'Guatemala', continent: 'northAmerica', area: 108889, population: 17610000, gdpPerCapita: 5475, lifeExpectancy: 74.3, internetPenetration: 65, flag: '🇬🇹', x: 14, y: 56 },
  { code: 'BZ', name: 'Belize', continent: 'northAmerica', area: 22966, population: 410000, gdpPerCapita: 6365, lifeExpectancy: 74.6, internetPenetration: 62, flag: '🇧🇿', x: 15, y: 54 },
  { code: 'SV', name: 'El Salvador', continent: 'northAmerica', area: 21041, population: 6360000, gdpPerCapita: 4408, lifeExpectancy: 74.0, internetPenetration: 63, flag: '🇸🇻', x: 14, y: 58 },
  { code: 'HN', name: 'Honduras', continent: 'northAmerica', area: 112492, population: 10430000, gdpPerCapita: 2831, lifeExpectancy: 75.3, internetPenetration: 48, flag: '🇭🇳', x: 16, y: 56 },
  { code: 'NI', name: 'Nicaragua', continent: 'northAmerica', area: 130373, population: 7050000, gdpPerCapita: 2045, lifeExpectancy: 75.7, internetPenetration: 57, flag: '🇳🇮', x: 16, y: 60 },
  { code: 'CR', name: 'Costa Rica', continent: 'northAmerica', area: 51100, population: 5210000, gdpPerCapita: 13612, lifeExpectancy: 80.8, internetPenetration: 83, flag: '🇨🇷', x: 16, y: 64 },
  { code: 'PA', name: 'Panama', continent: 'northAmerica', area: 75417, population: 4410000, gdpPerCapita: 17357, lifeExpectancy: 78.5, internetPenetration: 68, flag: '🇵🇦', x: 18, y: 66 },

  // Caribbean
  { code: 'CU', name: 'Cuba', continent: 'northAmerica', area: 109884, population: 11260000, gdpPerCapita: 9500, lifeExpectancy: 79.0, internetPenetration: 71, flag: '🇨🇺', x: 18, y: 48 },
  { code: 'JM', name: 'Jamaica', continent: 'northAmerica', area: 10991, population: 2830000, gdpPerCapita: 5495, lifeExpectancy: 75.0, internetPenetration: 82, flag: '🇯🇲', x: 18, y: 52 },
  { code: 'HT', name: 'Haiti', continent: 'northAmerica', area: 27750, population: 11720000, gdpPerCapita: 1748, lifeExpectancy: 64.0, internetPenetration: 39, flag: '🇭🇹', x: 20, y: 50 },
  { code: 'DO', name: 'Dominican Rep.', continent: 'northAmerica', area: 48671, population: 11230000, gdpPerCapita: 9756, lifeExpectancy: 74.1, internetPenetration: 85, flag: '🇩🇴', x: 21, y: 52 },
  { code: 'PR', name: 'Puerto Rico', continent: 'northAmerica', area: 9104, population: 3220000, gdpPerCapita: 34068, lifeExpectancy: 80.0, internetPenetration: 91, flag: '🇵🇷', x: 23, y: 52 },
  { code: 'BS', name: 'Bahamas', continent: 'northAmerica', area: 13943, population: 410000, gdpPerCapita: 35458, lifeExpectancy: 74.0, internetPenetration: 87, flag: '🇧🇸', x: 19, y: 46 },
  { code: 'TT', name: 'Trinidad & Tobago', continent: 'northAmerica', area: 5131, population: 1530000, gdpPerCapita: 17398, lifeExpectancy: 73.4, internetPenetration: 79, flag: '🇹🇹', x: 24, y: 60 },
  { code: 'BB', name: 'Barbados', continent: 'northAmerica', area: 430, population: 280000, gdpPerCapita: 17225, lifeExpectancy: 79.2, internetPenetration: 82, flag: '🇧🇧', x: 25, y: 58 },
  { code: 'LC', name: 'Saint Lucia', continent: 'northAmerica', area: 616, population: 180000, gdpPerCapita: 11611, lifeExpectancy: 76.2, internetPenetration: 51, flag: '🇱🇨', x: 24, y: 56 },
  { code: 'VC', name: 'St. Vincent', continent: 'northAmerica', area: 389, population: 100000, gdpPerCapita: 8861, lifeExpectancy: 74.1, internetPenetration: 56, flag: '🇻🇨', x: 24, y: 58 },
  { code: 'GD', name: 'Grenada', continent: 'northAmerica', area: 344, population: 120000, gdpPerCapita: 12207, lifeExpectancy: 74.9, internetPenetration: 78, flag: '🇬🇩', x: 24, y: 62 },
  { code: 'AG', name: 'Antigua & Barbuda', continent: 'northAmerica', area: 442, population: 90000, gdpPerCapita: 18425, lifeExpectancy: 77.0, internetPenetration: 97, flag: '🇦🇬', x: 24, y: 54 },
  { code: 'KN', name: 'St. Kitts & Nevis', continent: 'northAmerica', area: 261, population: 50000, gdpPerCapita: 21099, lifeExpectancy: 74.8, internetPenetration: 82, flag: '🇰🇳', x: 23, y: 54 },

  // ═══════════════════════════════════════════════════════════════
  // SOUTH AMERICA (positioned in lower-left of map)
  // ═══════════════════════════════════════════════════════════════

  { code: 'CO', name: 'Colombia', continent: 'southAmerica', area: 1141748, population: 51870000, gdpPerCapita: 6630, lifeExpectancy: 77.3, internetPenetration: 73, flag: '🇨🇴', x: 18, y: 70 },
  { code: 'VE', name: 'Venezuela', continent: 'southAmerica', area: 916445, population: 28440000, gdpPerCapita: 3970, lifeExpectancy: 72.1, internetPenetration: 72, flag: '🇻🇪', x: 22, y: 66 },
  { code: 'GY', name: 'Guyana', continent: 'southAmerica', area: 214969, population: 810000, gdpPerCapita: 20539, lifeExpectancy: 70.0, internetPenetration: 59, flag: '🇬🇾', x: 24, y: 68 },
  { code: 'SR', name: 'Suriname', continent: 'southAmerica', area: 163820, population: 620000, gdpPerCapita: 5150, lifeExpectancy: 72.1, internetPenetration: 66, flag: '🇸🇷', x: 26, y: 68 },
  { code: 'EC', name: 'Ecuador', continent: 'southAmerica', area: 276841, population: 18190000, gdpPerCapita: 6391, lifeExpectancy: 77.9, internetPenetration: 76, flag: '🇪🇨', x: 16, y: 74 },
  { code: 'PE', name: 'Peru', continent: 'southAmerica', area: 1285216, population: 34050000, gdpPerCapita: 7126, lifeExpectancy: 77.4, internetPenetration: 71, flag: '🇵🇪', x: 17, y: 80 },
  { code: 'BR', name: 'Brazil', continent: 'southAmerica', area: 8515767, population: 215310000, gdpPerCapita: 8918, lifeExpectancy: 75.9, internetPenetration: 81, flag: '🇧🇷', x: 24, y: 78 },
  { code: 'BO', name: 'Bolivia', continent: 'southAmerica', area: 1098581, population: 12080000, gdpPerCapita: 3548, lifeExpectancy: 72.1, internetPenetration: 66, flag: '🇧🇴', x: 20, y: 84 },
  { code: 'PY', name: 'Paraguay', continent: 'southAmerica', area: 406752, population: 6780000, gdpPerCapita: 5892, lifeExpectancy: 74.5, internetPenetration: 77, flag: '🇵🇾', x: 23, y: 88 },
  { code: 'CL', name: 'Chile', continent: 'southAmerica', area: 756102, population: 19490000, gdpPerCapita: 15355, lifeExpectancy: 80.2, internetPenetration: 88, flag: '🇨🇱', x: 18, y: 92 },
  { code: 'AR', name: 'Argentina', continent: 'southAmerica', area: 2780400, population: 45810000, gdpPerCapita: 13650, lifeExpectancy: 77.4, internetPenetration: 87, flag: '🇦🇷', x: 21, y: 94 },
  { code: 'UY', name: 'Uruguay', continent: 'southAmerica', area: 176215, population: 3420000, gdpPerCapita: 21105, lifeExpectancy: 78.4, internetPenetration: 90, flag: '🇺🇾', x: 25, y: 94 },

  // ═══════════════════════════════════════════════════════════════
  // OCEANIA (positioned in lower-right of map)
  // ═══════════════════════════════════════════════════════════════

  { code: 'AU', name: 'Australia', continent: 'oceania', area: 7692024, population: 26440000, gdpPerCapita: 64674, lifeExpectancy: 83.3, internetPenetration: 89, flag: '🇦🇺', x: 86, y: 84 },
  { code: 'NZ', name: 'New Zealand', continent: 'oceania', area: 270467, population: 5120000, gdpPerCapita: 48350, lifeExpectancy: 82.5, internetPenetration: 94, flag: '🇳🇿', x: 96, y: 94 },
  { code: 'PG', name: 'Papua New Guinea', continent: 'oceania', area: 462840, population: 10140000, gdpPerCapita: 2673, lifeExpectancy: 65.0, internetPenetration: 32, flag: '🇵🇬', x: 90, y: 74 },
  { code: 'FJ', name: 'Fiji', continent: 'oceania', area: 18272, population: 930000, gdpPerCapita: 5316, lifeExpectancy: 68.0, internetPenetration: 88, flag: '🇫🇯', x: 98, y: 82 },
  { code: 'SB', name: 'Solomon Islands', continent: 'oceania', area: 28896, population: 720000, gdpPerCapita: 2277, lifeExpectancy: 73.0, internetPenetration: 35, flag: '🇸🇧', x: 94, y: 76 },
  { code: 'VU', name: 'Vanuatu', continent: 'oceania', area: 12189, population: 320000, gdpPerCapita: 3124, lifeExpectancy: 71.0, internetPenetration: 66, flag: '🇻🇺', x: 96, y: 80 },
  { code: 'WS', name: 'Samoa', continent: 'oceania', area: 2842, population: 220000, gdpPerCapita: 4067, lifeExpectancy: 74.0, internetPenetration: 78, flag: '🇼🇸', x: 99, y: 78 },
  { code: 'TO', name: 'Tonga', continent: 'oceania', area: 747, population: 100000, gdpPerCapita: 5087, lifeExpectancy: 71.0, internetPenetration: 67, flag: '🇹🇴', x: 99, y: 84 },
  { code: 'KI', name: 'Kiribati', continent: 'oceania', area: 811, population: 130000, gdpPerCapita: 1658, lifeExpectancy: 69.0, internetPenetration: 54, flag: '🇰🇮', x: 98, y: 70 },
  { code: 'FM', name: 'Micronesia', continent: 'oceania', area: 702, population: 110000, gdpPerCapita: 3584, lifeExpectancy: 68.0, internetPenetration: 40, flag: '🇫🇲', x: 92, y: 66 },
  { code: 'MH', name: 'Marshall Islands', continent: 'oceania', area: 181, population: 40000, gdpPerCapita: 4182, lifeExpectancy: 74.0, internetPenetration: 39, flag: '🇲🇭', x: 96, y: 64 },
  { code: 'PW', name: 'Palau', continent: 'oceania', area: 459, population: 18000, gdpPerCapita: 12124, lifeExpectancy: 74.0, internetPenetration: 80, flag: '🇵🇼', x: 88, y: 64 },
  { code: 'NR', name: 'Nauru', continent: 'oceania', area: 21, population: 13000, gdpPerCapita: 11830, lifeExpectancy: 64.0, internetPenetration: 91, flag: '🇳🇷', x: 94, y: 70 },
  { code: 'TV', name: 'Tuvalu', continent: 'oceania', area: 26, population: 11000, gdpPerCapita: 5430, lifeExpectancy: 68.0, internetPenetration: 49, flag: '🇹🇻', x: 98, y: 76 }
]

// Color mode configurations
export const colorModes = [
  {
    id: 'population',
    name: 'Population',
    field: 'population',
    format: (v) => v >= 1000000000 ? `${(v/1000000000).toFixed(1)}B` : v >= 1000000 ? `${(v/1000000).toFixed(0)}M` : `${(v/1000).toFixed(0)}K`,
    gradient: ['#dbeafe', '#3b82f6', '#1e3a8a'],
    description: 'Larger population = darker blue'
  },
  {
    id: 'gdp',
    name: 'GDP per Capita',
    field: 'gdpPerCapita',
    format: (v) => `$${v.toLocaleString()}`,
    gradient: ['#fecaca', '#fcd34d', '#22c55e'],
    description: 'Higher income = greener'
  },
  {
    id: 'lifeExpectancy',
    name: 'Life Expectancy',
    field: 'lifeExpectancy',
    format: (v) => `${v.toFixed(1)} years`,
    gradient: ['#fed7aa', '#fcd34d', '#14b8a6'],
    description: 'Longer life = teal'
  },
  {
    id: 'internet',
    name: 'Internet Access',
    field: 'internetPenetration',
    format: (v) => `${v}%`,
    gradient: ['#e5e7eb', '#a78bfa', '#7c3aed'],
    description: 'More connected = purple'
  },
  {
    id: 'area',
    name: 'Land Area',
    field: 'area',
    format: (v) => v >= 1000000 ? `${(v/1000000).toFixed(1)}M km²` : `${(v/1000).toFixed(0)}K km²`,
    gradient: ['#fef3c7', '#f59e0b', '#b45309'],
    description: 'Larger area = darker orange'
  },
  {
    id: 'flags',
    name: 'Flags',
    field: null,
    format: () => '',
    gradient: null,
    description: 'Show country flags'
  }
]

// Get min/max for a field across all countries
export function getFieldRange(field) {
  const values = countries.map(c => c[field]).filter(v => v > 0)
  return {
    min: Math.min(...values),
    max: Math.max(...values)
  }
}

// Get color for a value within a gradient
export function getGradientColor(value, min, max, gradient) {
  if (!gradient || value <= 0) return '#e5e7eb'

  // Use logarithmic scale for better distribution
  const logMin = Math.log10(min || 1)
  const logMax = Math.log10(max)
  const logValue = Math.log10(value || 1)

  const ratio = Math.max(0, Math.min(1, (logValue - logMin) / (logMax - logMin)))

  // Interpolate between gradient colors
  const idx = ratio * (gradient.length - 1)
  const lower = Math.floor(idx)
  const upper = Math.min(lower + 1, gradient.length - 1)
  const t = idx - lower

  return interpolateColor(gradient[lower], gradient[upper], t)
}

// Helper to interpolate between two hex colors
function interpolateColor(color1, color2, t) {
  const r1 = parseInt(color1.slice(1, 3), 16)
  const g1 = parseInt(color1.slice(3, 5), 16)
  const b1 = parseInt(color1.slice(5, 7), 16)

  const r2 = parseInt(color2.slice(1, 3), 16)
  const g2 = parseInt(color2.slice(3, 5), 16)
  const b2 = parseInt(color2.slice(5, 7), 16)

  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
