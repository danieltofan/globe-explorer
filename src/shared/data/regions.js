// World population distribution by region (2024 estimates)
// Source: UN World Population Prospects
export const regions = [
  { id: 'asia', name: 'Asia', population: 4753000000, color: '#3b82f6', people: 59 },
  { id: 'africa', name: 'Africa', population: 1460000000, color: '#22c55e', people: 18 },
  { id: 'europe', name: 'Europe', population: 745000000, color: '#eab308', people: 9 },
  { id: 'latin-america', name: 'Latin America', population: 660000000, color: '#ef4444', people: 8 },
  { id: 'north-america', name: 'North America', population: 380000000, color: '#a855f7', people: 5 },
  { id: 'oceania', name: 'Oceania', population: 46000000, color: '#06b6d4', people: 1 }
]

// Income distribution (World Bank + wealth data, displayed as daily income)
// Sources: World Bank income classifications, Credit Suisse Global Wealth Report
export const incomeGroups = [
  { id: 'wealthy', name: 'Wealthy', people: 1, color: '#fbbf24', description: 'Top 1% — more than $150/day' },
  { id: 'high', name: 'High Income', people: 9, color: '#22c55e', description: '$38 - $150/day' },
  { id: 'upper-middle', name: 'Upper Middle', people: 24, color: '#3b82f6', description: '$12 - $38/day' },
  { id: 'lower-middle', name: 'Lower Middle', people: 40, color: '#eab308', description: '$3 - $12/day' },
  { id: 'low', name: 'Low Income', people: 17, color: '#f97316', description: '$2 - $3/day' },
  { id: 'extreme-poverty', name: 'Extreme Poverty', people: 9, color: '#ef4444', description: 'Less than $2/day' }
]

// Internet access
export const internetAccess = [
  { id: 'connected', name: 'Have Internet', people: 63, color: '#3b82f6' },
  { id: 'offline', name: 'No Internet', people: 37, color: '#6b7280' }
]

// Urban vs Rural
export const urbanRural = [
  { id: 'urban', name: 'Urban', people: 57, color: '#8b5cf6' },
  { id: 'rural', name: 'Rural', people: 43, color: '#22c55e' }
]

// Age distribution
export const ageGroups = [
  { id: 'children', name: '0-14 years', people: 26, color: '#f472b6' },
  { id: 'working', name: '15-64 years', people: 65, color: '#3b82f6' },
  { id: 'elderly', name: '65+ years', people: 9, color: '#6b7280' }
]

// All view modes
export const viewModes = [
  { id: 'region', name: 'By Region', data: regions, description: 'Where do people live?' },
  { id: 'income', name: 'By Income', data: incomeGroups, description: 'How much do people earn?' },
  { id: 'internet', name: 'Internet Access', data: internetAccess, description: 'Who is connected?' },
  { id: 'urban', name: 'Urban vs Rural', data: urbanRural, description: 'City or countryside?' },
  { id: 'age', name: 'By Age', data: ageGroups, description: 'How old are people?' }
]

// Storytelling facts - curated for shareability
export const storyFacts = [
  { mode: 'region', highlight: 'asia', number: 59, text: 'people would live in Asia', subtext: 'More than half the world in one continent' },
  { mode: 'income', highlight: 'extreme-poverty', number: 9, text: 'people would live on less than $2/day', subtext: 'About 700 million in extreme poverty' },
  { mode: 'internet', highlight: 'offline', number: 37, text: 'people have never used the internet', subtext: 'Nearly 3 billion people offline' },
  { mode: 'income', highlight: 'wealthy', number: 1, text: 'person would be in the top 1%', subtext: 'Earning more than $150/day ($55,000/year)' },
  { mode: 'region', highlight: 'africa', number: 18, text: 'people would live in Africa', subtext: 'The fastest-growing continent' },
  { mode: 'urban', highlight: 'rural', number: 43, text: 'people would live in rural areas', subtext: 'Farms, villages, and small towns' },
  { mode: 'age', highlight: 'children', number: 26, text: 'people would be under 15 years old', subtext: 'More than 2 billion children' },
  { mode: 'income', highlight: 'lower-middle', number: 40, text: 'people would earn $3-12 per day', subtext: 'The world\'s largest income group' },
  { mode: 'region', highlight: 'oceania', number: 1, text: 'person would live in Oceania', subtext: 'Australia, New Zealand, Pacific Islands' },
  { mode: 'age', highlight: 'elderly', number: 9, text: 'people would be 65 or older', subtext: 'A number that\'s growing fast' }
]
