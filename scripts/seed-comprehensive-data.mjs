import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// Comprehensive seed data for each destination
const countryData = {
  cyprus: {
    climate_data: {
      type: "Mediterranean",
      annual_sunshine_hours: 3400,
      annual_rainfall_mm: 400,
      seasons: {
        summer: { months: ["Jun", "Jul", "Aug", "Sep"], temp_avg_c: 33, temp_min_c: 23, description: "Hot and dry, beach weather" },
        winter: { months: ["Dec", "Jan", "Feb"], temp_avg_c: 17, temp_min_c: 8, description: "Mild, occasional rain" },
        spring: { months: ["Mar", "Apr", "May"], temp_avg_c: 22, temp_min_c: 13, description: "Pleasant, wildflowers" },
        autumn: { months: ["Oct", "Nov"], temp_avg_c: 25, temp_min_c: 17, description: "Warm, ideal weather" }
      },
      best_months: ["Apr", "May", "Oct", "Nov"],
      humidity_avg_percent: 65,
      climate_rating: 9.2
    },
    crime_safety: {
      global_peace_index_rank: 61,
      safety_index: 77.3,
      crime_index: 22.7,
      violent_crime_rate: "Very Low",
      expat_safety_rating: 9.0,
      women_safety_rating: 8.7,
      emergency_number: "112"
    },
    healthcare: {
      system_type: "Mixed public/private (GESY)",
      universal_coverage: true,
      quality_rating: 7.8,
      private_healthcare: { cost_consultation_eur: 50, cost_annual_insurance_eur: 1500 },
      top_hospitals: ["Aretaeio Hospital", "Apollonion Private Hospital", "Ygia Polyclinic"],
      english_speaking_doctors: "Widely available"
    },
    lifestyle: {
      work_life_balance_rating: 8.2,
      expat_community_size: "Large (100,000+)",
      english_proficiency: "High",
      cultural_activities: ["Ancient ruins", "Wine culture", "Mediterranean festivals", "Water sports"],
      beach_access: "320+ beaches",
      child_friendly: 9.0
    },
    infrastructure: {
      internet: { avg_speed_mbps: 85, fiber_coverage_percent: 75, cost_monthly_eur: 35, reliability_rating: 8.5 },
      transport: { public_transport_rating: 4.5, car_essential: true, uber_available: false },
      coworking_spaces: [
        { name: "Regus Limassol", city: "Limassol", cost_month_eur: 350 },
        { name: "The Base", city: "Nicosia", cost_month_eur: 200 }
      ]
    },
    dining_nightlife: {
      michelin_stars_total: 0,
      signature_dishes: ["Halloumi", "Souvlaki", "Meze", "Kleftiko", "Sheftalia"],
      avg_meal_cost_casual_eur: 15,
      avg_meal_cost_fine_eur: 60,
      avg_coffee_eur: 3.5,
      nightlife_rating: 7.5,
      best_restaurants: [
        { name: "Pyxida Fish Tavern", city: "Limassol", cuisine: "Seafood", price: "€€€" },
        { name: "Vivaldi by Mavrommatis", city: "Limassol", cuisine: "Fine Dining", price: "€€€€" },
        { name: "Ta Piatakia", city: "Nicosia", cuisine: "Cypriot Modern", price: "€€" }
      ],
      wine_regions: ["Troodos", "Paphos", "Limassol"]
    },
    capital_overview: {
      name: "Nicosia (Lefkosia)",
      population: 340000,
      is_divided: true,
      division_note: "Last divided capital in the world (since 1974)",
      landmarks: ["Venetian Walls", "Ledra Street", "Cyprus Museum", "Shacolas Tower"],
      beach_distance_km: 60
    },
    quality_of_life: {
      overall_score: 7.8,
      cost_of_living_index: 58.2,
      safety_index: 77.3,
      climate_index: 93.4,
      expat_friendly_index: 8.2
    },
    currency_info: {
      code: "EUR",
      name: "Euro",
      symbol: "€",
      banking: { major_banks: ["Bank of Cyprus", "Hellenic Bank", "RCB Bank"], crypto_friendly: "Moderate" }
    },
    digital_nomad_info: {
      visa_available: true,
      visa_name: "Digital Nomad Visa",
      min_income_monthly_eur: 3500,
      duration_months: 12,
      max_stay_years: 3,
      coworking_scene: "Growing, especially in Limassol",
      nomad_community_size: "Medium (5,000+)",
      time_zone: "UTC+2 (EET)"
    },
    comparison_highlights: {
      similar_to: ["Malta", "Greece"],
      unique_selling_points: [
        "Lowest EU corporate tax at 12.5%",
        "17-year Non-Dom tax regime",
        "English as de facto second language",
        "EU citizenship possible in 7 years",
        "340 days of sunshine"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1597571063304-81f081944ee8?w=1600",
      capital: "https://images.unsplash.com/photo-1600621626047-d65e97de8e25?w=800",
      beach: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800",
      gradient: "from-amber-500 to-orange-600"
    }
  },

  portugal: {
    climate_data: {
      type: "Mediterranean/Oceanic",
      annual_sunshine_hours: 2800,
      annual_rainfall_mm: 850,
      seasons: {
        summer: { months: ["Jun", "Jul", "Aug", "Sep"], temp_avg_c: 28, temp_min_c: 18, description: "Warm, dry, perfect beach weather" },
        winter: { months: ["Dec", "Jan", "Feb"], temp_avg_c: 14, temp_min_c: 8, description: "Mild, rainy periods" }
      },
      best_months: ["May", "Jun", "Sep", "Oct"],
      climate_rating: 8.8
    },
    crime_safety: {
      global_peace_index_rank: 7,
      safety_index: 81.5,
      violent_crime_rate: "Very Low",
      expat_safety_rating: 9.2,
      emergency_number: "112"
    },
    healthcare: {
      system_type: "Universal public (SNS)",
      universal_coverage: true,
      quality_rating: 7.5,
      top_hospitals: ["Hospital da Luz", "CUF Descobertas", "Hospital de São João"],
      english_speaking_doctors: "Common in private sector"
    },
    lifestyle: {
      work_life_balance_rating: 8.5,
      expat_community_size: "Very Large (500,000+)",
      english_proficiency: "High",
      cultural_activities: ["Fado music", "Wine tours", "Surf culture", "Festivals"],
      beach_access: "850km of coastline"
    },
    infrastructure: {
      internet: { avg_speed_mbps: 120, fiber_coverage_percent: 85, cost_monthly_eur: 30, reliability_rating: 9.0 },
      transport: { public_transport_rating: 8.0, uber_available: true },
      coworking_spaces: [
        { name: "Heden", city: "Lisbon", cost_month_eur: 250 },
        { name: "Second Home", city: "Lisbon", cost_month_eur: 350 }
      ]
    },
    dining_nightlife: {
      michelin_stars_total: 24,
      signature_dishes: ["Bacalhau", "Pastéis de Nata", "Francesinha", "Sardinhas"],
      avg_meal_cost_casual_eur: 12,
      avg_coffee_eur: 1.0,
      nightlife_rating: 9.0,
      best_restaurants: [
        { name: "Belcanto", city: "Lisbon", cuisine: "Modern Portuguese", price: "€€€€", michelin: 2 },
        { name: "The Yeatman", city: "Porto", cuisine: "Fine Dining", price: "€€€€", michelin: 2 }
      ],
      wine_regions: ["Douro", "Alentejo", "Dão", "Vinho Verde"]
    },
    capital_overview: {
      name: "Lisbon",
      population: 545000,
      metro_population: 2900000,
      landmarks: ["Belém Tower", "Jerónimos Monastery", "Praça do Comércio", "LX Factory"],
      beach_distance_km: 20
    },
    quality_of_life: {
      overall_score: 8.2,
      cost_of_living_index: 52.1,
      safety_index: 81.5,
      climate_index: 88.2,
      expat_friendly_index: 9.0
    },
    currency_info: {
      code: "EUR",
      name: "Euro",
      symbol: "€",
      banking: { major_banks: ["Millennium BCP", "Novo Banco", "Santander"] }
    },
    digital_nomad_info: {
      visa_available: true,
      visa_name: "Digital Nomad Visa (D8)",
      min_income_monthly_eur: 3280,
      duration_months: 12,
      max_stay_years: 5,
      coworking_scene: "Excellent, Europe top 5",
      nomad_community_size: "Very Large (50,000+)",
      time_zone: "UTC+0 (WET)"
    },
    comparison_highlights: {
      similar_to: ["Spain", "Cyprus"],
      unique_selling_points: [
        "Global top 5 for digital nomads",
        "7th safest country in the world",
        "Excellent surf and outdoor lifestyle",
        "Strong tech startup ecosystem"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1600",
      capital: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      beach: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800",
      gradient: "from-green-600 to-red-500"
    }
  },

  malta: {
    climate_data: {
      type: "Mediterranean",
      annual_sunshine_hours: 3000,
      best_months: ["Apr", "May", "Oct", "Nov"],
      climate_rating: 8.9
    },
    crime_safety: {
      global_peace_index_rank: 24,
      safety_index: 74.2,
      expat_safety_rating: 8.8,
      emergency_number: "112"
    },
    healthcare: {
      system_type: "Universal public (NHS-style)",
      quality_rating: 7.0,
      top_hospitals: ["Mater Dei Hospital", "St James Hospital"],
      english_speaking_doctors: "All doctors speak English"
    },
    lifestyle: {
      expat_community_size: "Large relative to population (100,000+)",
      english_proficiency: "Native level",
      networking_opportunities: "Excellent for finance and gaming"
    },
    infrastructure: {
      internet: { avg_speed_mbps: 110, fiber_coverage_percent: 95, cost_monthly_eur: 40 },
      transport: { public_transport_rating: 5.0, uber_available: true },
      coworking_spaces: [
        { name: "SOHO Office Space", city: "Sliema", cost_month_eur: 300 }
      ]
    },
    dining_nightlife: {
      michelin_stars_total: 2,
      signature_dishes: ["Pastizzi", "Rabbit stew", "Ftira", "Lampuki pie"],
      avg_meal_cost_casual_eur: 18,
      nightlife_rating: 8.5,
      best_restaurants: [
        { name: "Noni", city: "Valletta", cuisine: "Modern Mediterranean", price: "€€€€", michelin: 1 }
      ]
    },
    capital_overview: {
      name: "Valletta",
      population: 6000,
      note: "Smallest EU capital by population",
      landmarks: ["St Johns Co-Cathedral", "Grand Harbour", "Upper Barrakka Gardens"]
    },
    quality_of_life: {
      overall_score: 7.5,
      cost_of_living_index: 68.5,
      expat_friendly_index: 8.5
    },
    currency_info: {
      code: "EUR",
      name: "Euro",
      symbol: "€",
      banking: { crypto_friendly: "Very - crypto hub status" }
    },
    digital_nomad_info: {
      visa_available: true,
      visa_name: "Nomad Residence Permit",
      min_income_monthly_eur: 2700,
      coworking_scene: "Good, gaming/blockchain focused",
      time_zone: "UTC+1 (CET)"
    },
    comparison_highlights: {
      similar_to: ["Cyprus", "Gibraltar"],
      unique_selling_points: [
        "English is official language",
        "iGaming capital of Europe",
        "Blockchain island regulatory clarity",
        "EU citizenship possible in 5 years (MPRP)"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=1600",
      capital: "https://images.unsplash.com/photo-1555990793-da11153b2473?w=800",
      gradient: "from-red-500 to-white"
    }
  },

  spain: {
    climate_data: {
      type: "Varied (Mediterranean, Continental, Atlantic)",
      annual_sunshine_hours: 2500,
      best_months: ["Apr", "May", "Sep", "Oct"],
      climate_rating: 8.7
    },
    crime_safety: {
      global_peace_index_rank: 32,
      safety_index: 75.8,
      expat_safety_rating: 8.5,
      emergency_number: "112"
    },
    healthcare: {
      system_type: "Universal public",
      quality_rating: 8.5,
      top_hospitals: ["Hospital Clínic Barcelona", "Hospital La Paz Madrid"],
      english_speaking_doctors: "Available in major cities"
    },
    lifestyle: {
      work_life_balance_rating: 8.8,
      siesta_culture: true,
      expat_community_size: "Very Large (1M+)",
      cultural_activities: ["Flamenco", "Football", "Festivals", "Museums"],
      beach_access: "8000km of coastline"
    },
    infrastructure: {
      internet: { avg_speed_mbps: 175, fiber_coverage_percent: 90, reliability_rating: 9.0 },
      transport: { public_transport_rating: 8.5, car_essential: false },
      coworking_spaces: [
        { name: "WeWork", city: "Barcelona", cost_month_eur: 350 },
        { name: "Impact Hub", city: "Madrid", cost_month_eur: 250 }
      ]
    },
    dining_nightlife: {
      michelin_stars_total: 234,
      signature_dishes: ["Paella", "Jamón Ibérico", "Tortilla", "Gazpacho", "Pintxos"],
      avg_meal_cost_casual_eur: 12,
      nightlife_rating: 9.5,
      best_restaurants: [
        { name: "El Celler de Can Roca", city: "Girona", cuisine: "Modern Catalan", price: "€€€€", michelin: 3 },
        { name: "DiverXO", city: "Madrid", cuisine: "Avant-garde", price: "€€€€", michelin: 3 }
      ],
      wine_regions: ["Rioja", "Ribera del Duero", "Priorat"]
    },
    capital_overview: {
      name: "Madrid",
      population: 3300000,
      metro_population: 6800000,
      landmarks: ["Royal Palace", "Prado Museum", "Retiro Park", "Plaza Mayor"]
    },
    quality_of_life: {
      overall_score: 8.4,
      cost_of_living_index: 55.3,
      expat_friendly_index: 8.5
    },
    currency_info: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    },
    digital_nomad_info: {
      visa_available: true,
      visa_name: "Digital Nomad Visa (Ley Startups)",
      min_income_monthly_eur: 2160,
      tax_note: "24% flat rate for 5 years (Beckham Law)",
      coworking_scene: "Excellent",
      nomad_community_size: "Very Large (30,000+)",
      time_zone: "UTC+1 (CET)"
    },
    comparison_highlights: {
      similar_to: ["Portugal", "Italy"],
      unique_selling_points: [
        "Beckham Law - 24% flat tax for 5 years",
        "234 Michelin star restaurants",
        "8000km of coastline",
        "High-speed rail network"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1600",
      capital: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800",
      gradient: "from-red-500 to-yellow-500"
    }
  },

  dubai: {
    climate_data: {
      type: "Hot Desert",
      annual_sunshine_hours: 3500,
      best_months: ["Nov", "Dec", "Jan", "Feb", "Mar"],
      climate_rating: 6.5,
      note: "AC essential 6 months of year"
    },
    crime_safety: {
      global_peace_index_rank: 48,
      safety_index: 84.5,
      violent_crime_rate: "Extremely Low",
      expat_safety_rating: 9.5,
      emergency_number: "999"
    },
    healthcare: {
      system_type: "Private-dominant with public options",
      quality_rating: 9.0,
      top_hospitals: ["Cleveland Clinic Abu Dhabi", "Mediclinic City Hospital", "American Hospital Dubai"],
      english_speaking_doctors: "Standard"
    },
    lifestyle: {
      work_life_balance_rating: 6.5,
      expat_community_size: "Very Large (85% of population)",
      english_proficiency: "Very High",
      cultural_activities: ["Mall culture", "Desert safaris", "Luxury shopping", "Museums"]
    },
    infrastructure: {
      internet: { avg_speed_mbps: 200, fiber_coverage_percent: 95, cost_monthly_eur: 80, vpn_note: "VPNs restricted" },
      transport: { public_transport_rating: 7.5, uber_available: true },
      coworking_spaces: [
        { name: "DIFC Innovation Hub", city: "Dubai", cost_month_eur: 800 },
        { name: "WeWork", city: "Dubai", cost_month_eur: 600 }
      ]
    },
    dining_nightlife: {
      michelin_stars_total: 14,
      signature_dishes: ["Shawarma", "Mezze", "Machboos", "Luqaimat"],
      avg_meal_cost_casual_eur: 15,
      avg_meal_cost_fine_eur: 150,
      nightlife_rating: 8.0,
      best_restaurants: [
        { name: "Il Ristorante Niko Romito", city: "Dubai", cuisine: "Italian", price: "€€€€", michelin: 2 },
        { name: "Tresind Studio", city: "Dubai", cuisine: "Indian", price: "€€€€", michelin: 2 }
      ]
    },
    capital_overview: {
      name: "Dubai City",
      note: "Abu Dhabi is UAE capital, Dubai is largest city",
      population: 3500000,
      landmarks: ["Burj Khalifa", "Palm Jumeirah", "Burj Al Arab", "Dubai Frame"]
    },
    quality_of_life: {
      overall_score: 7.8,
      purchasing_power_index: 98.5,
      safety_index: 84.5,
      expat_friendly_index: 9.0
    },
    currency_info: {
      code: "AED",
      name: "UAE Dirham",
      symbol: "د.إ",
      exchange_rate_usd: 3.67,
      pegged_to: "USD",
      banking: { crypto_friendly: "Regulated, VARA licensing" }
    },
    digital_nomad_info: {
      visa_available: true,
      visa_name: "Virtual Working Visa",
      min_income_monthly_eur: 5000,
      tax_note: "0% personal income tax",
      coworking_scene: "Excellent",
      time_zone: "UTC+4 (GST)"
    },
    comparison_highlights: {
      similar_to: ["Singapore", "Monaco"],
      unique_selling_points: [
        "0% personal income tax",
        "Golden Visa 10-year residency",
        "World-class infrastructure",
        "85% expat population",
        "Hub between Europe, Asia, Africa"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600",
      capital: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
      gradient: "from-green-500 to-red-500"
    }
  },

  thailand: {
    climate_data: {
      type: "Tropical",
      annual_sunshine_hours: 2500,
      seasons: {
        hot: { months: ["Mar", "Apr", "May"], temp_avg_c: 35, description: "Very hot and humid" },
        rainy: { months: ["Jun", "Jul", "Aug", "Sep", "Oct"], temp_avg_c: 32, description: "Monsoon, daily rain" },
        cool: { months: ["Nov", "Dec", "Jan", "Feb"], temp_avg_c: 30, description: "Most pleasant" }
      },
      best_months: ["Nov", "Dec", "Jan", "Feb"],
      climate_rating: 7.5
    },
    crime_safety: {
      global_peace_index_rank: 92,
      safety_index: 65.2,
      expat_safety_rating: 7.5,
      tourist_police: "1155"
    },
    healthcare: {
      system_type: "Mixed - world-class private",
      quality_rating: 8.0,
      medical_tourism: "Global destination for procedures",
      top_hospitals: ["Bumrungrad International", "Bangkok Hospital", "Samitivej"],
      english_speaking_doctors: "Standard in private hospitals"
    },
    lifestyle: {
      work_life_balance_rating: 8.5,
      expat_community_size: "Very Large (200,000+)",
      english_proficiency: "Low-Moderate",
      cultural_activities: ["Temples", "Markets", "Festivals", "Thai cooking", "Muay Thai"]
    },
    infrastructure: {
      internet: { avg_speed_mbps: 200, fiber_coverage_percent: 70, cost_monthly_eur: 20 },
      transport: { public_transport_rating: 7.5, taxi_app: "Grab, Bolt" },
      coworking_spaces: [
        { name: "The Hive", city: "Bangkok", cost_month_eur: 150 },
        { name: "CAMP", city: "Chiang Mai", cost_month_eur: 100 },
        { name: "Punspace", city: "Chiang Mai", cost_month_eur: 80 }
      ]
    },
    dining_nightlife: {
      michelin_stars_total: 36,
      signature_dishes: ["Pad Thai", "Tom Yum", "Green Curry", "Som Tam", "Mango Sticky Rice"],
      avg_meal_cost_casual_eur: 3,
      avg_meal_cost_fine_eur: 50,
      nightlife_rating: 9.5,
      best_restaurants: [
        { name: "Gaggan Anand", city: "Bangkok", cuisine: "Progressive Indian", price: "€€€€", michelin: 2 },
        { name: "Jay Fai", city: "Bangkok", cuisine: "Street Food", price: "€€€", michelin: 1 }
      ]
    },
    capital_overview: {
      name: "Bangkok",
      population: 10700000,
      landmarks: ["Grand Palace", "Wat Arun", "Chatuchak Market", "Khao San Road"]
    },
    quality_of_life: {
      overall_score: 7.2,
      cost_of_living_index: 38.5,
      expat_friendly_index: 8.5
    },
    currency_info: {
      code: "THB",
      name: "Thai Baht",
      symbol: "฿",
      exchange_rate_usd: 35.5,
      cash_preferred: true
    },
    digital_nomad_info: {
      visa_available: true,
      visa_name: "Long-Term Resident Visa (LTR)",
      min_income_monthly_eur: 2200,
      duration_months: 60,
      tax_note: "17% flat rate for remitted income",
      coworking_scene: "Excellent, especially Chiang Mai",
      nomad_community_size: "Very Large (50,000+)",
      popular_areas: ["Chiang Mai", "Bangkok", "Phuket", "Koh Phangan"],
      time_zone: "UTC+7 (ICT)"
    },
    comparison_highlights: {
      similar_to: ["Bali", "Vietnam"],
      unique_selling_points: [
        "World capital of digital nomads",
        "Exceptional value for money",
        "World-class street food",
        "Medical tourism hub",
        "36 Michelin star restaurants"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1600",
      capital: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800",
      gradient: "from-red-500 to-blue-500"
    }
  },

  // Add more countries with similar structure...
  greece: {
    climate_data: { type: "Mediterranean", annual_sunshine_hours: 2800, climate_rating: 8.8 },
    crime_safety: { global_peace_index_rank: 49, safety_index: 72.5, emergency_number: "112" },
    healthcare: { system_type: "Universal public", quality_rating: 7.0 },
    lifestyle: { expat_community_size: "Large (300,000+)", english_proficiency: "Moderate" },
    infrastructure: { internet: { avg_speed_mbps: 55, cost_monthly_eur: 25 } },
    dining_nightlife: { michelin_stars_total: 12, avg_meal_cost_casual_eur: 12 },
    capital_overview: { name: "Athens", population: 664000, metro_population: 3800000 },
    quality_of_life: { cost_of_living_index: 51.5 },
    currency_info: { code: "EUR", name: "Euro", symbol: "€" },
    digital_nomad_info: { visa_available: true, visa_name: "Digital Nomad Visa", min_income_monthly_eur: 3500 },
    comparison_highlights: { similar_to: ["Cyprus", "Italy"] },
    images: { hero: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1600", gradient: "from-blue-500 to-white" }
  },

  italy: {
    climate_data: { type: "Mediterranean", annual_sunshine_hours: 2500, climate_rating: 8.5 },
    crime_safety: { global_peace_index_rank: 33, safety_index: 66.2, emergency_number: "112" },
    healthcare: { system_type: "Universal public (SSN)", quality_rating: 7.8 },
    lifestyle: { expat_community_size: "Large (400,000+)", cultural_activities: ["Art", "Fashion", "Food", "Opera"] },
    infrastructure: { internet: { avg_speed_mbps: 90, cost_monthly_eur: 30 } },
    dining_nightlife: { michelin_stars_total: 374, signature_dishes: ["Pizza", "Pasta", "Risotto", "Gelato"], avg_meal_cost_casual_eur: 15 },
    capital_overview: { name: "Rome", population: 2870000 },
    quality_of_life: { cost_of_living_index: 62.5 },
    currency_info: { code: "EUR", name: "Euro", symbol: "€" },
    digital_nomad_info: { visa_available: true, visa_name: "Digital Nomad Visa", min_income_monthly_eur: 2500 },
    comparison_highlights: { similar_to: ["Spain", "France"], unique_selling_points: ["374 Michelin stars - most in Europe", "UNESCO sites world leader"] },
    images: { hero: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1600", gradient: "from-green-500 to-red-500" }
  },

  france: {
    climate_data: { type: "Varied (Oceanic, Mediterranean, Continental)", climate_rating: 8.0 },
    crime_safety: { global_peace_index_rank: 65, safety_index: 61.5, emergency_number: "112" },
    healthcare: { system_type: "Universal public", quality_rating: 8.8 },
    lifestyle: { expat_community_size: "Large (350,000+)", cultural_activities: ["Art", "Wine", "Fashion", "Cuisine"] },
    infrastructure: { internet: { avg_speed_mbps: 200, cost_monthly_eur: 35 }, transport: { public_transport_rating: 9.0 } },
    dining_nightlife: { michelin_stars_total: 632, avg_meal_cost_casual_eur: 18 },
    capital_overview: { name: "Paris", population: 2100000, metro_population: 12500000 },
    quality_of_life: { cost_of_living_index: 74.5 },
    currency_info: { code: "EUR", name: "Euro", symbol: "€" },
    digital_nomad_info: { visa_available: true, visa_name: "Passeport Talent", min_income_monthly_eur: 4000 },
    comparison_highlights: { similar_to: ["Spain", "Italy"], unique_selling_points: ["632 Michelin stars", "World cultural capital", "TGV high-speed rail"] },
    images: { hero: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600", gradient: "from-blue-500 to-red-500" }
  },

  germany: {
    climate_data: { type: "Temperate", annual_sunshine_hours: 1650, climate_rating: 6.5 },
    crime_safety: { global_peace_index_rank: 15, safety_index: 77.5, emergency_number: "110" },
    healthcare: { system_type: "Universal public (Gesetzliche)", quality_rating: 8.5 },
    lifestyle: { expat_community_size: "Very Large (1M+)", english_proficiency: "High" },
    infrastructure: { internet: { avg_speed_mbps: 100, cost_monthly_eur: 35 }, transport: { public_transport_rating: 9.0 } },
    dining_nightlife: { michelin_stars_total: 339, avg_meal_cost_casual_eur: 12 },
    capital_overview: { name: "Berlin", population: 3600000 },
    quality_of_life: { cost_of_living_index: 65.2, purchasing_power_index: 102.5 },
    currency_info: { code: "EUR", name: "Euro", symbol: "€" },
    digital_nomad_info: { visa_available: true, visa_name: "Freelancer Visa", coworking_scene: "Excellent in Berlin" },
    comparison_highlights: { similar_to: ["Netherlands", "Austria"], unique_selling_points: ["Strongest EU economy", "Tech hub Berlin", "World-class public transport"] },
    images: { hero: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1600", gradient: "from-black to-red-500" }
  },

  netherlands: {
    climate_data: { type: "Oceanic", annual_sunshine_hours: 1650, climate_rating: 6.0 },
    crime_safety: { global_peace_index_rank: 19, safety_index: 75.5, emergency_number: "112" },
    healthcare: { system_type: "Mandatory private insurance", quality_rating: 8.5 },
    lifestyle: { expat_community_size: "Large (400,000+)", english_proficiency: "Very High (95%)" },
    infrastructure: { internet: { avg_speed_mbps: 150, cost_monthly_eur: 40 }, transport: { public_transport_rating: 9.0, bike_culture: true } },
    dining_nightlife: { michelin_stars_total: 116, avg_meal_cost_casual_eur: 15 },
    capital_overview: { name: "Amsterdam", population: 872000 },
    quality_of_life: { cost_of_living_index: 75.5, expat_friendly_index: 8.8 },
    currency_info: { code: "EUR", name: "Euro", symbol: "€" },
    digital_nomad_info: { visa_available: true, visa_name: "Orientation Year / DAFT", coworking_scene: "Excellent" },
    comparison_highlights: { similar_to: ["Germany", "Belgium"], unique_selling_points: ["95% English fluency", "Best bike infrastructure", "Liberal social policies"] },
    images: { hero: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1600", gradient: "from-orange-500 to-blue-500" }
  },

  uk: {
    climate_data: { type: "Oceanic", annual_sunshine_hours: 1500, annual_rainfall_mm: 1200, climate_rating: 5.5 },
    crime_safety: { global_peace_index_rank: 39, safety_index: 68.5, emergency_number: "999" },
    healthcare: { system_type: "Universal public (NHS)", quality_rating: 7.5 },
    lifestyle: { expat_community_size: "Very Large (5M+)", english_proficiency: "Native" },
    infrastructure: { internet: { avg_speed_mbps: 100, cost_monthly_eur: 35 }, transport: { public_transport_rating: 8.5 } },
    dining_nightlife: { michelin_stars_total: 172, avg_meal_cost_casual_eur: 18 },
    capital_overview: { name: "London", population: 9000000, metro_population: 14200000 },
    quality_of_life: { cost_of_living_index: 85.5, purchasing_power_index: 95.5 },
    currency_info: { code: "GBP", name: "British Pound", symbol: "£" },
    digital_nomad_info: { visa_available: true, visa_name: "Global Talent / Innovator", coworking_scene: "Excellent" },
    comparison_highlights: { similar_to: ["Ireland", "USA"], unique_selling_points: ["Global financial hub", "English native", "World-class universities"] },
    images: { hero: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600", gradient: "from-red-500 to-blue-500" }
  },

  australia: {
    climate_data: { type: "Varied (Tropical to Temperate)", annual_sunshine_hours: 3000, climate_rating: 8.5 },
    crime_safety: { global_peace_index_rank: 27, safety_index: 77.5, emergency_number: "000" },
    healthcare: { system_type: "Universal public (Medicare)", quality_rating: 8.5 },
    lifestyle: { expat_community_size: "Very Large (2M+)", english_proficiency: "Native", outdoor_lifestyle: true },
    infrastructure: { internet: { avg_speed_mbps: 80, cost_monthly_eur: 50 } },
    dining_nightlife: { michelin_stars_total: 0, avg_meal_cost_casual_eur: 20, coffee_culture: "World-class" },
    capital_overview: { name: "Canberra", population: 460000, note: "Sydney is largest city (5.3M)" },
    quality_of_life: { cost_of_living_index: 82.5, expat_friendly_index: 8.5 },
    currency_info: { code: "AUD", name: "Australian Dollar", symbol: "$" },
    digital_nomad_info: { visa_available: true, visa_name: "Working Holiday / Skilled Visa", coworking_scene: "Good" },
    comparison_highlights: { similar_to: ["New Zealand", "Canada"], unique_selling_points: ["Outdoor lifestyle", "High minimum wage", "World-class beaches"] },
    images: { hero: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1600", gradient: "from-blue-500 to-yellow-500" }
  },

  canada: {
    climate_data: { type: "Varied (Arctic to Humid Continental)", climate_rating: 6.0, note: "Very cold winters" },
    crime_safety: { global_peace_index_rank: 11, safety_index: 78.5, emergency_number: "911" },
    healthcare: { system_type: "Universal public", quality_rating: 8.0 },
    lifestyle: { expat_community_size: "Very Large (8M+)", english_proficiency: "Native", multicultural: true },
    infrastructure: { internet: { avg_speed_mbps: 150, cost_monthly_eur: 60 } },
    dining_nightlife: { michelin_stars_total: 29, avg_meal_cost_casual_eur: 18 },
    capital_overview: { name: "Ottawa", population: 1000000, note: "Toronto is largest city (6.2M)" },
    quality_of_life: { cost_of_living_index: 72.5, expat_friendly_index: 9.0 },
    currency_info: { code: "CAD", name: "Canadian Dollar", symbol: "$" },
    digital_nomad_info: { visa_available: true, visa_name: "Start-up Visa / Express Entry", coworking_scene: "Good in major cities" },
    comparison_highlights: { similar_to: ["Australia", "USA"], unique_selling_points: ["Most multicultural country", "Immigration friendly", "High quality of life"] },
    images: { hero: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1600", gradient: "from-red-500 to-white" }
  },

  "new-zealand": {
    climate_data: { type: "Oceanic", annual_sunshine_hours: 2000, climate_rating: 7.5 },
    crime_safety: { global_peace_index_rank: 2, safety_index: 80.5, emergency_number: "111" },
    healthcare: { system_type: "Universal public", quality_rating: 8.0 },
    lifestyle: { expat_community_size: "Medium (500,000+)", english_proficiency: "Native", outdoor_lifestyle: true },
    infrastructure: { internet: { avg_speed_mbps: 100, cost_monthly_eur: 55 } },
    dining_nightlife: { avg_meal_cost_casual_eur: 18, wine_regions: ["Marlborough", "Hawkes Bay"] },
    capital_overview: { name: "Wellington", population: 215000, note: "Auckland is largest city (1.7M)" },
    quality_of_life: { cost_of_living_index: 75.5, expat_friendly_index: 8.5 },
    currency_info: { code: "NZD", name: "New Zealand Dollar", symbol: "$" },
    digital_nomad_info: { visa_available: true, visa_name: "Working Holiday / Skilled Migrant" },
    comparison_highlights: { similar_to: ["Australia"], unique_selling_points: ["2nd safest country in world", "Lord of the Rings scenery", "Outdoor adventure capital"] },
    images: { hero: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1600", gradient: "from-black to-white" }
  },

  mexico: {
    climate_data: { type: "Varied (Tropical to Desert)", annual_sunshine_hours: 2600, climate_rating: 8.0 },
    crime_safety: { global_peace_index_rank: 137, safety_index: 45.5, emergency_number: "911" },
    healthcare: { system_type: "Mixed public/private", quality_rating: 7.0, medical_tourism: "Popular for dental and surgery" },
    lifestyle: { expat_community_size: "Very Large (1.5M+)", english_proficiency: "Low-Moderate" },
    infrastructure: { internet: { avg_speed_mbps: 45, cost_monthly_eur: 25 } },
    dining_nightlife: { signature_dishes: ["Tacos", "Mole", "Ceviche", "Churros"], avg_meal_cost_casual_eur: 5, nightlife_rating: 9.0 },
    capital_overview: { name: "Mexico City", population: 9200000, metro_population: 21600000 },
    quality_of_life: { cost_of_living_index: 35.5 },
    currency_info: { code: "MXN", name: "Mexican Peso", symbol: "$" },
    digital_nomad_info: { visa_available: true, visa_name: "Temporary Resident Visa", coworking_scene: "Excellent in Mexico City", nomad_community_size: "Very Large (50,000+)" },
    comparison_highlights: { similar_to: ["Colombia", "Costa Rica"], unique_selling_points: ["No income tax for 1st year on visa", "Same timezone as US", "Incredible food scene"] },
    images: { hero: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1600", gradient: "from-green-500 to-red-500" }
  },

  indonesia: {
    climate_data: { type: "Tropical", annual_rainfall_mm: 2000, climate_rating: 7.0, note: "Bali has best climate" },
    crime_safety: { global_peace_index_rank: 52, safety_index: 62.5, emergency_number: "112" },
    healthcare: { system_type: "Mixed", quality_rating: 6.5, note: "Best hospitals in Jakarta/Bali" },
    lifestyle: { expat_community_size: "Large in Bali (50,000+)", english_proficiency: "Low-Moderate" },
    infrastructure: { internet: { avg_speed_mbps: 30, cost_monthly_eur: 15, note: "Improving in Bali" } },
    dining_nightlife: { signature_dishes: ["Nasi Goreng", "Satay", "Rendang", "Gado-gado"], avg_meal_cost_casual_eur: 3, nightlife_rating: 8.0 },
    capital_overview: { name: "Jakarta", population: 10700000, note: "Bali is main expat destination" },
    quality_of_life: { cost_of_living_index: 32.5 },
    currency_info: { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
    digital_nomad_info: { visa_available: true, visa_name: "Digital Nomad Visa (Second Home)", min_income_monthly_eur: 2000, popular_areas: ["Bali", "Ubud", "Canggu"] },
    comparison_highlights: { similar_to: ["Thailand", "Vietnam"], unique_selling_points: ["Bali - digital nomad paradise", "Incredibly affordable", "Spiritual retreats", "Surf culture"] },
    images: { hero: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600", gradient: "from-red-500 to-white" }
  }
};

async function seedData() {
  for (const [slug, data] of Object.entries(countryData)) {
    try {
      await sql`
        UPDATE destinations SET
          climate_data = ${JSON.stringify(data.climate_data || {})}::jsonb,
          crime_safety = ${JSON.stringify(data.crime_safety || {})}::jsonb,
          healthcare = ${JSON.stringify(data.healthcare || {})}::jsonb,
          lifestyle = ${JSON.stringify(data.lifestyle || {})}::jsonb,
          infrastructure = ${JSON.stringify(data.infrastructure || {})}::jsonb,
          dining_nightlife = ${JSON.stringify(data.dining_nightlife || {})}::jsonb,
          capital_overview = ${JSON.stringify(data.capital_overview || {})}::jsonb,
          quality_of_life = ${JSON.stringify(data.quality_of_life || {})}::jsonb,
          currency_info = ${JSON.stringify(data.currency_info || {})}::jsonb,
          digital_nomad_info = ${JSON.stringify(data.digital_nomad_info || {})}::jsonb,
          comparison_highlights = ${JSON.stringify(data.comparison_highlights || {})}::jsonb,
          images = ${JSON.stringify(data.images || {})}::jsonb
        WHERE slug = ${slug}
      `;
      console.log(`✓ Updated ${slug}`);
    } catch (e) {
      console.error(`✗ Error updating ${slug}:`, e.message.slice(0, 100));
    }
  }

  // Verify
  const result = await sql`
    SELECT slug, country_name,
           (climate_data != '{}'::jsonb) as has_climate,
           (dining_nightlife != '{}'::jsonb) as has_dining,
           (digital_nomad_info != '{}'::jsonb) as has_nomad
    FROM destinations
    WHERE enabled = true
    ORDER BY country_name
  `;
  console.log('\n--- Verification ---');
  result.forEach(r => {
    console.log(`${r.country_name}: climate=${r.has_climate}, dining=${r.has_dining}, nomad=${r.has_nomad}`);
  });
}

seedData().catch(console.error);
