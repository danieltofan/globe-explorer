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

// Income distribution (World Bank classifications)
export const incomeGroups = [
  { id: 'high', name: 'High Income', people: 16, color: '#22c55e', description: 'More than $14,005/year' },
  { id: 'upper-middle', name: 'Upper Middle', people: 34, color: '#3b82f6', description: '$4,516 - $14,005/year' },
  { id: 'lower-middle', name: 'Lower Middle', people: 40, color: '#eab308', description: '$1,146 - $4,515/year' },
  { id: 'low', name: 'Low Income', people: 10, color: '#ef4444', description: 'Less than $1,146/year' }
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
