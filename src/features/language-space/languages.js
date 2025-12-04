// Language data with 3D "embedding" positions
// Positions are hand-curated to cluster by language family
// Similar to how word embeddings cluster semantically similar words

// Language families/subfamilies with colors
// Split Indo-European into subfamilies for better visual distinction
export const languageFamilies = {
  'Romance': { color: '#f43f5e', description: 'Spanish, Portuguese, French, Italian, Romanian' },
  'Germanic': { color: '#3b82f6', description: 'English, German, Dutch, Swedish, Norwegian' },
  'Slavic': { color: '#a855f7', description: 'Russian, Polish, Ukrainian, Czech, Serbian' },
  'Indo-Iranian': { color: '#f97316', description: 'Hindi, Urdu, Bengali, Persian, Punjabi' },
  'Celtic-Baltic-Other': { color: '#6366f1', description: 'Greek, Armenian, Albanian, Baltic languages' },
  'Sino-Tibetan': { color: '#ef4444', description: 'Chinese, Burmese, Tibetan' },
  'Afroasiatic': { color: '#eab308', description: 'Arabic, Hebrew, Amharic, Hausa' },
  'Niger-Congo': { color: '#22c55e', description: 'Swahili, Yoruba, Zulu, Igbo' },
  'Austronesian': { color: '#06b6d4', description: 'Indonesian, Tagalog, Malay, Javanese' },
  'Dravidian': { color: '#ec4899', description: 'Tamil, Telugu, Kannada, Malayalam' },
  'Turkic': { color: '#14b8a6', description: 'Turkish, Azerbaijani, Uzbek, Kazakh' },
  'Uralic': { color: '#84cc16', description: 'Finnish, Hungarian, Estonian' },
  'Japonic': { color: '#fb923c', description: 'Japanese' },
  'Koreanic': { color: '#2dd4bf', description: 'Korean' },
  'Tai-Kadai': { color: '#c084fc', description: 'Thai, Lao' },
  'Austroasiatic': { color: '#64748b', description: 'Vietnamese, Khmer' },
  'Mongolic': { color: '#a1a1aa', description: 'Mongolian' },
  'Isolate': { color: '#78716c', description: 'Basque, Georgian' }
}

// Languages with 3D positions (x, y, z range roughly -50 to 50)
// Clustered by family, with subfamilies creating sub-clusters
export const languages = [
  // ═══════════════════════════════════════════════════════════════
  // ROMANCE - Red/Pink cluster
  // ═══════════════════════════════════════════════════════════════
  { code: 'es', name: 'Spanish', family: 'Romance', subfamily: 'Ibero-Romance', speakers: 548, x: -20, y: 5, z: 10 },
  { code: 'pt', name: 'Portuguese', family: 'Romance', subfamily: 'Ibero-Romance', speakers: 257, x: -22, y: 3, z: 8 },
  { code: 'fr', name: 'French', family: 'Romance', subfamily: 'Gallo-Romance', speakers: 274, x: -18, y: 8, z: 12 },
  { code: 'it', name: 'Italian', family: 'Romance', subfamily: 'Italo-Romance', speakers: 68, x: -16, y: 4, z: 14 },
  { code: 'ro', name: 'Romanian', family: 'Romance', subfamily: 'Eastern Romance', speakers: 24, x: -14, y: 2, z: 11 },
  { code: 'ca', name: 'Catalan', family: 'Romance', subfamily: 'Occitano-Romance', speakers: 10, x: -19, y: 6, z: 13 },

  // ═══════════════════════════════════════════════════════════════
  // GERMANIC - Blue cluster
  // ═══════════════════════════════════════════════════════════════
  { code: 'en', name: 'English', family: 'Germanic', subfamily: 'West Germanic', speakers: 1452, x: -25, y: 15, z: 5 },
  { code: 'de', name: 'German', family: 'Germanic', subfamily: 'West Germanic', speakers: 134, x: -22, y: 18, z: 3 },
  { code: 'nl', name: 'Dutch', family: 'Germanic', subfamily: 'West Germanic', speakers: 25, x: -24, y: 20, z: 4 },
  { code: 'sv', name: 'Swedish', family: 'Germanic', subfamily: 'North Germanic', speakers: 13, x: -20, y: 22, z: 0 },
  { code: 'no', name: 'Norwegian', family: 'Germanic', subfamily: 'North Germanic', speakers: 5, x: -21, y: 24, z: -1 },
  { code: 'da', name: 'Danish', family: 'Germanic', subfamily: 'North Germanic', speakers: 6, x: -23, y: 23, z: 1 },
  { code: 'af', name: 'Afrikaans', family: 'Germanic', subfamily: 'West Germanic', speakers: 7, x: -26, y: 12, z: 6 },

  // ═══════════════════════════════════════════════════════════════
  // SLAVIC - Purple cluster
  // ═══════════════════════════════════════════════════════════════
  { code: 'ru', name: 'Russian', family: 'Slavic', subfamily: 'East Slavic', speakers: 255, x: -5, y: 20, z: -5 },
  { code: 'uk', name: 'Ukrainian', family: 'Slavic', subfamily: 'East Slavic', speakers: 40, x: -7, y: 22, z: -3 },
  { code: 'pl', name: 'Polish', family: 'Slavic', subfamily: 'West Slavic', speakers: 45, x: -10, y: 18, z: -2 },
  { code: 'cs', name: 'Czech', family: 'Slavic', subfamily: 'West Slavic', speakers: 11, x: -12, y: 16, z: 0 },
  { code: 'sk', name: 'Slovak', family: 'Slavic', subfamily: 'West Slavic', speakers: 5, x: -11, y: 15, z: 1 },
  { code: 'bg', name: 'Bulgarian', family: 'Slavic', subfamily: 'South Slavic', speakers: 8, x: -3, y: 14, z: -4 },
  { code: 'sr', name: 'Serbian', family: 'Slavic', subfamily: 'South Slavic', speakers: 12, x: -4, y: 12, z: -6 },
  { code: 'hr', name: 'Croatian', family: 'Slavic', subfamily: 'South Slavic', speakers: 5, x: -6, y: 11, z: -5 },
  { code: 'sl', name: 'Slovenian', family: 'Slavic', subfamily: 'South Slavic', speakers: 2.5, x: -8, y: 13, z: -3 },
  { code: 'be', name: 'Belarusian', family: 'Slavic', subfamily: 'East Slavic', speakers: 5, x: -6, y: 24, z: -4 },

  // ═══════════════════════════════════════════════════════════════
  // INDO-IRANIAN - Orange cluster
  // ═══════════════════════════════════════════════════════════════
  { code: 'hi', name: 'Hindi', family: 'Indo-Iranian', subfamily: 'Indo-Aryan', speakers: 602, x: 5, y: 0, z: -15 },
  { code: 'ur', name: 'Urdu', family: 'Indo-Iranian', subfamily: 'Indo-Aryan', speakers: 230, x: 7, y: -2, z: -17 },
  { code: 'bn', name: 'Bengali', family: 'Indo-Iranian', subfamily: 'Indo-Aryan', speakers: 272, x: 10, y: 2, z: -12 },
  { code: 'pa', name: 'Punjabi', family: 'Indo-Iranian', subfamily: 'Indo-Aryan', speakers: 113, x: 6, y: 3, z: -14 },
  { code: 'mr', name: 'Marathi', family: 'Indo-Iranian', subfamily: 'Indo-Aryan', speakers: 83, x: 8, y: -1, z: -10 },
  { code: 'gu', name: 'Gujarati', family: 'Indo-Iranian', subfamily: 'Indo-Aryan', speakers: 57, x: 4, y: 1, z: -12 },
  { code: 'fa', name: 'Persian', family: 'Indo-Iranian', subfamily: 'Iranian', speakers: 110, x: 2, y: 5, z: -20 },
  { code: 'ps', name: 'Pashto', family: 'Indo-Iranian', subfamily: 'Iranian', speakers: 60, x: 0, y: 3, z: -22 },
  { code: 'ku', name: 'Kurdish', family: 'Indo-Iranian', subfamily: 'Iranian', speakers: 30, x: -2, y: 6, z: -18 },
  { code: 'ne', name: 'Nepali', family: 'Indo-Iranian', subfamily: 'Indo-Aryan', speakers: 32, x: 12, y: 4, z: -8 },

  // ═══════════════════════════════════════════════════════════════
  // CELTIC, BALTIC & OTHER INDO-EUROPEAN - Indigo cluster
  // ═══════════════════════════════════════════════════════════════
  { code: 'el', name: 'Greek', family: 'Celtic-Baltic-Other', subfamily: 'Hellenic', speakers: 13.5, x: -8, y: 5, z: 5 },
  { code: 'hy', name: 'Armenian', family: 'Celtic-Baltic-Other', subfamily: 'Armenian', speakers: 7, x: 0, y: 10, z: -10 },
  { code: 'sq', name: 'Albanian', family: 'Celtic-Baltic-Other', subfamily: 'Albanian', speakers: 7.5, x: -5, y: 8, z: 3 },
  { code: 'lt', name: 'Lithuanian', family: 'Celtic-Baltic-Other', subfamily: 'Baltic', speakers: 3, x: -8, y: 25, z: -8 },
  { code: 'lv', name: 'Latvian', family: 'Celtic-Baltic-Other', subfamily: 'Baltic', speakers: 1.5, x: -9, y: 26, z: -7 },

  // ═══════════════════════════════════════════════════════════════
  // SINO-TIBETAN - Right region
  // ═══════════════════════════════════════════════════════════════
  { code: 'zh', name: 'Mandarin Chinese', family: 'Sino-Tibetan', subfamily: 'Sinitic', speakers: 939, x: 35, y: 10, z: 0 },
  { code: 'yue', name: 'Cantonese', family: 'Sino-Tibetan', subfamily: 'Sinitic', speakers: 85, x: 38, y: 8, z: 3 },
  { code: 'nan', name: 'Min Nan', family: 'Sino-Tibetan', subfamily: 'Sinitic', speakers: 49, x: 40, y: 12, z: 2 },
  { code: 'wuu', name: 'Wu Chinese', family: 'Sino-Tibetan', subfamily: 'Sinitic', speakers: 82, x: 37, y: 14, z: -1 },
  { code: 'my', name: 'Burmese', family: 'Sino-Tibetan', subfamily: 'Tibeto-Burman', speakers: 43, x: 30, y: 5, z: -8 },
  { code: 'bo', name: 'Tibetan', family: 'Sino-Tibetan', subfamily: 'Tibeto-Burman', speakers: 6, x: 28, y: 15, z: -5 },

  // ═══════════════════════════════════════════════════════════════
  // AFROASIATIC - Upper region
  // ═══════════════════════════════════════════════════════════════
  { code: 'ar', name: 'Arabic', family: 'Afroasiatic', subfamily: 'Semitic', speakers: 372, x: 10, y: 30, z: 15 },
  { code: 'he', name: 'Hebrew', family: 'Afroasiatic', subfamily: 'Semitic', speakers: 9, x: 8, y: 28, z: 18 },
  { code: 'am', name: 'Amharic', family: 'Afroasiatic', subfamily: 'Semitic', speakers: 57, x: 15, y: 32, z: 12 },
  { code: 'ha', name: 'Hausa', family: 'Afroasiatic', subfamily: 'Chadic', speakers: 77, x: 5, y: 35, z: 20 },
  { code: 'so', name: 'Somali', family: 'Afroasiatic', subfamily: 'Cushitic', speakers: 22, x: 18, y: 30, z: 10 },
  { code: 'om', name: 'Oromo', family: 'Afroasiatic', subfamily: 'Cushitic', speakers: 37, x: 20, y: 33, z: 8 },

  // ═══════════════════════════════════════════════════════════════
  // NIGER-CONGO - Lower-left region
  // ═══════════════════════════════════════════════════════════════
  { code: 'sw', name: 'Swahili', family: 'Niger-Congo', subfamily: 'Bantu', speakers: 100, x: -15, y: -25, z: 20 },
  { code: 'yo', name: 'Yoruba', family: 'Niger-Congo', subfamily: 'Volta-Niger', speakers: 47, x: -20, y: -20, z: 25 },
  { code: 'ig', name: 'Igbo', family: 'Niger-Congo', subfamily: 'Volta-Niger', speakers: 45, x: -18, y: -22, z: 23 },
  { code: 'zu', name: 'Zulu', family: 'Niger-Congo', subfamily: 'Bantu', speakers: 27, x: -12, y: -30, z: 18 },
  { code: 'xh', name: 'Xhosa', family: 'Niger-Congo', subfamily: 'Bantu', speakers: 20, x: -14, y: -32, z: 16 },
  { code: 'rw', name: 'Kinyarwanda', family: 'Niger-Congo', subfamily: 'Bantu', speakers: 12, x: -10, y: -28, z: 22 },
  { code: 'sn', name: 'Shona', family: 'Niger-Congo', subfamily: 'Bantu', speakers: 15, x: -8, y: -26, z: 19 },
  { code: 'ff', name: 'Fula', family: 'Niger-Congo', subfamily: 'Atlantic', speakers: 40, x: -25, y: -18, z: 28 },
  { code: 'wo', name: 'Wolof', family: 'Niger-Congo', subfamily: 'Atlantic', speakers: 12, x: -28, y: -15, z: 30 },

  // ═══════════════════════════════════════════════════════════════
  // AUSTRONESIAN - Far right region
  // ═══════════════════════════════════════════════════════════════
  { code: 'id', name: 'Indonesian', family: 'Austronesian', subfamily: 'Malayo-Polynesian', speakers: 199, x: 45, y: -15, z: -20 },
  { code: 'ms', name: 'Malay', family: 'Austronesian', subfamily: 'Malayo-Polynesian', speakers: 77, x: 43, y: -13, z: -18 },
  { code: 'tl', name: 'Tagalog', family: 'Austronesian', subfamily: 'Malayo-Polynesian', speakers: 82, x: 48, y: -10, z: -22 },
  { code: 'jv', name: 'Javanese', family: 'Austronesian', subfamily: 'Malayo-Polynesian', speakers: 82, x: 46, y: -18, z: -19 },
  { code: 'ceb', name: 'Cebuano', family: 'Austronesian', subfamily: 'Malayo-Polynesian', speakers: 27, x: 50, y: -12, z: -24 },
  { code: 'mg', name: 'Malagasy', family: 'Austronesian', subfamily: 'Malayo-Polynesian', speakers: 25, x: 40, y: -25, z: -15 },
  { code: 'haw', name: 'Hawaiian', family: 'Austronesian', subfamily: 'Malayo-Polynesian', speakers: 0.024, x: 55, y: -5, z: -30 },
  { code: 'mi', name: 'Maori', family: 'Austronesian', subfamily: 'Malayo-Polynesian', speakers: 0.05, x: 52, y: -20, z: -28 },

  // ═══════════════════════════════════════════════════════════════
  // DRAVIDIAN - Lower center region
  // ═══════════════════════════════════════════════════════════════
  { code: 'ta', name: 'Tamil', family: 'Dravidian', subfamily: 'Southern', speakers: 78, x: 15, y: -15, z: -5 },
  { code: 'te', name: 'Telugu', family: 'Dravidian', subfamily: 'South-Central', speakers: 83, x: 18, y: -12, z: -3 },
  { code: 'kn', name: 'Kannada', family: 'Dravidian', subfamily: 'Southern', speakers: 44, x: 13, y: -18, z: -7 },
  { code: 'ml', name: 'Malayalam', family: 'Dravidian', subfamily: 'Southern', speakers: 37, x: 11, y: -20, z: -9 },

  // ═══════════════════════════════════════════════════════════════
  // TURKIC - Upper-right region
  // ═══════════════════════════════════════════════════════════════
  { code: 'tr', name: 'Turkish', family: 'Turkic', subfamily: 'Oghuz', speakers: 88, x: 20, y: 20, z: -25 },
  { code: 'az', name: 'Azerbaijani', family: 'Turkic', subfamily: 'Oghuz', speakers: 23, x: 18, y: 22, z: -27 },
  { code: 'uz', name: 'Uzbek', family: 'Turkic', subfamily: 'Karluk', speakers: 35, x: 25, y: 18, z: -22 },
  { code: 'kk', name: 'Kazakh', family: 'Turkic', subfamily: 'Kipchak', speakers: 13, x: 28, y: 22, z: -20 },
  { code: 'ky', name: 'Kyrgyz', family: 'Turkic', subfamily: 'Kipchak', speakers: 4.5, x: 30, y: 20, z: -18 },
  { code: 'tk', name: 'Turkmen', family: 'Turkic', subfamily: 'Oghuz', speakers: 11, x: 22, y: 24, z: -28 },
  { code: 'tt', name: 'Tatar', family: 'Turkic', subfamily: 'Kipchak', speakers: 5, x: 15, y: 25, z: -23 },
  { code: 'ug', name: 'Uyghur', family: 'Turkic', subfamily: 'Karluk', speakers: 10, x: 32, y: 16, z: -15 },

  // ═══════════════════════════════════════════════════════════════
  // URALIC - Upper-left region
  // ═══════════════════════════════════════════════════════════════
  { code: 'fi', name: 'Finnish', family: 'Uralic', subfamily: 'Finnic', speakers: 5.8, x: -30, y: 35, z: -15 },
  { code: 'et', name: 'Estonian', family: 'Uralic', subfamily: 'Finnic', speakers: 1.1, x: -28, y: 33, z: -13 },
  { code: 'hu', name: 'Hungarian', family: 'Uralic', subfamily: 'Ugric', speakers: 13, x: -25, y: 30, z: -10 },

  // ═══════════════════════════════════════════════════════════════
  // JAPONIC & KOREANIC - Far right, isolated
  // ═══════════════════════════════════════════════════════════════
  { code: 'ja', name: 'Japanese', family: 'Japonic', subfamily: null, speakers: 123, x: 45, y: 25, z: 15 },
  { code: 'ko', name: 'Korean', family: 'Koreanic', subfamily: null, speakers: 81, x: 42, y: 28, z: 18 },

  // ═══════════════════════════════════════════════════════════════
  // TAI-KADAI & AUSTROASIATIC - Southeast Asia cluster
  // ═══════════════════════════════════════════════════════════════
  { code: 'th', name: 'Thai', family: 'Tai-Kadai', subfamily: 'Tai', speakers: 61, x: 35, y: -5, z: -10 },
  { code: 'lo', name: 'Lao', family: 'Tai-Kadai', subfamily: 'Tai', speakers: 30, x: 33, y: -3, z: -12 },
  { code: 'vi', name: 'Vietnamese', family: 'Austroasiatic', subfamily: 'Vietic', speakers: 85, x: 38, y: 0, z: -5 },
  { code: 'km', name: 'Khmer', family: 'Austroasiatic', subfamily: 'Khmeric', speakers: 16, x: 36, y: -2, z: -8 },

  // ═══════════════════════════════════════════════════════════════
  // MONGOLIC
  // ═══════════════════════════════════════════════════════════════
  { code: 'mn', name: 'Mongolian', family: 'Mongolic', subfamily: null, speakers: 6, x: 35, y: 30, z: -5 },

  // ═══════════════════════════════════════════════════════════════
  // ISOLATES
  // ═══════════════════════════════════════════════════════════════
  { code: 'eu', name: 'Basque', family: 'Isolate', subfamily: null, speakers: 0.75, x: -30, y: 0, z: 15 },
  { code: 'ka', name: 'Georgian', family: 'Isolate', subfamily: 'Kartvelian', speakers: 4, x: 5, y: 15, z: -5 }
]

/**
 * Find a language by its ISO code
 * @param {string} code - ISO 639-1 language code (e.g., 'en', 'es')
 * @returns {Object|undefined} Language object or undefined if not found
 */
export function getLanguage(code) {
  return languages.find(l => l.code === code)
}

/**
 * Get all languages belonging to a language family
 * @param {string} family - Family name (e.g., 'Romance', 'Germanic')
 * @returns {Object[]} Array of language objects
 */
export function getLanguagesByFamily(family) {
  return languages.filter(l => l.family === family)
}

/**
 * Get list of unique language family names
 * @returns {string[]} Array of family names
 */
export function getFamilies() {
  return [...new Set(languages.map(l => l.family))]
}

/**
 * Calculate Euclidean distance between two languages in 3D embedding space
 * @param {Object} lang1 - First language with x, y, z coordinates
 * @param {Object} lang2 - Second language with x, y, z coordinates
 * @returns {number} Distance in embedding space units
 */
export function getDistance(lang1, lang2) {
  const dx = lang1.x - lang2.x
  const dy = lang1.y - lang2.y
  const dz = lang1.z - lang2.z
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

/**
 * Find the n nearest languages to a given language in embedding space
 * @param {string} langCode - ISO code of the source language
 * @param {number} [n=5] - Number of neighbors to return
 * @returns {Object[]} Array of language objects with added `distance` property
 */
export function getNearestNeighbors(langCode, n = 5) {
  const lang = getLanguage(langCode)
  if (!lang) return []

  return languages
    .filter(l => l.code !== langCode)
    .map(l => ({ ...l, distance: getDistance(lang, l) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, n)
}
