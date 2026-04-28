// World population distribution by region (2024 estimates)
// Source: UN World Population Prospects
//
// Each category carries an `icon` URL — a white-on-transparent silhouette
// designed to layer on top of the category's colored disc in the v2 view.
// Icons are bundled by Vite via the imports below.

import asiaIcon from '@/assets/categories/asia.png'
import africaIcon from '@/assets/categories/africa.png'
import europeIcon from '@/assets/categories/europe.png'
import latinIcon from '@/assets/categories/latin.png'
import namericaIcon from '@/assets/categories/namerica.png'
import oceaniaIcon from '@/assets/categories/oceania.png'

import incomeWealthyIcon from '@/assets/categories/income-wealthy.png'
import incomeHighIcon from '@/assets/categories/income-high.png'
import incomeUpperMidIcon from '@/assets/categories/income-upper-mid.png'
import incomeLowerMidIcon from '@/assets/categories/income-lower-mid.png'
import incomeLowIcon from '@/assets/categories/income-low.png'
import incomeExtremeIcon from '@/assets/categories/income-extreme.png'

import internetConnectedIcon from '@/assets/categories/internet-connected.png'
import internetOfflineIcon from '@/assets/categories/internet-offline.png'

import urbanIcon from '@/assets/categories/urban.png'
import ruralIcon from '@/assets/categories/rural.png'

import ageChildrenIcon from '@/assets/categories/age-children.png'
import ageWorkingIcon from '@/assets/categories/age-working.png'
import ageElderlyIcon from '@/assets/categories/age-elderly.png'

export const regions = [
  { id: 'asia', name: 'Asia', population: 4753000000, color: '#3b82f6', people: 59, icon: asiaIcon },
  { id: 'africa', name: 'Africa', population: 1460000000, color: '#22c55e', people: 18, icon: africaIcon },
  { id: 'europe', name: 'Europe', population: 745000000, color: '#eab308', people: 9, icon: europeIcon },
  { id: 'latin-america', name: 'Latin America', population: 660000000, color: '#ef4444', people: 8, icon: latinIcon },
  { id: 'north-america', name: 'North America', population: 380000000, color: '#a855f7', people: 5, icon: namericaIcon },
  { id: 'oceania', name: 'Oceania', population: 46000000, color: '#06b6d4', people: 1, icon: oceaniaIcon }
]

// Income distribution (World Bank + wealth data, displayed as daily income)
// Sources: World Bank income classifications, Credit Suisse Global Wealth Report
export const incomeGroups = [
  { id: 'wealthy', name: 'Wealthy', people: 1, color: '#fbbf24', description: 'Top 1% — more than $150/day', icon: incomeWealthyIcon },
  { id: 'high', name: 'High Income', people: 9, color: '#22c55e', description: '$38 - $150/day', icon: incomeHighIcon },
  { id: 'upper-middle', name: 'Upper Middle', people: 24, color: '#3b82f6', description: '$12 - $38/day', icon: incomeUpperMidIcon },
  { id: 'lower-middle', name: 'Lower Middle', people: 40, color: '#eab308', description: '$3 - $12/day', icon: incomeLowerMidIcon },
  { id: 'low', name: 'Low Income', people: 17, color: '#f97316', description: '$2 - $3/day', icon: incomeLowIcon },
  { id: 'extreme-poverty', name: 'Extreme Poverty', people: 9, color: '#ef4444', description: 'Less than $2/day', icon: incomeExtremeIcon }
]

// Internet access
export const internetAccess = [
  { id: 'connected', name: 'Have Internet', people: 63, color: '#3b82f6', icon: internetConnectedIcon },
  { id: 'offline', name: 'No Internet', people: 37, color: '#6b7280', icon: internetOfflineIcon }
]

// Urban vs Rural
export const urbanRural = [
  { id: 'urban', name: 'Urban', people: 57, color: '#8b5cf6', icon: urbanIcon },
  { id: 'rural', name: 'Rural', people: 43, color: '#22c55e', icon: ruralIcon }
]

// Age distribution
export const ageGroups = [
  { id: 'children', name: '0-14 years', people: 26, color: '#f472b6', icon: ageChildrenIcon },
  { id: 'working', name: '15-64 years', people: 65, color: '#3b82f6', icon: ageWorkingIcon },
  { id: 'elderly', name: '65+ years', people: 9, color: '#6b7280', icon: ageElderlyIcon }
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
//
// TODO (auto-play polish, 2026-04-27): only 10 facts across 5 modes means
// repeated viewings show the same mode-screens (Region appears 3x, Income 3x).
// Possible fixes when revisiting:
//   - add ~5-10 more facts to broaden the rotation
//   - order/randomize facts to maximize visual change between adjacent ones
//   - skip the mode-transition animation when consecutive facts share a mode
//   - randomize starting fact each time auto-play starts so two viewings differ
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
