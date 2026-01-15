-- Migration: Comprehensive destination data for relocation dashboard
-- Date: 2026-01-15
-- Description: Adds climate, crime, healthcare, lifestyle, infrastructure, dining,
--              city overview, comparison data, and much more for full HNW/corporate relocation experience

-- Add new JSONB columns to destinations table
ALTER TABLE destinations
ADD COLUMN IF NOT EXISTS climate_data JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS crime_safety JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS healthcare JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS lifestyle JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS infrastructure JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS dining_nightlife JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS capital_overview JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS quality_of_life JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS currency_info JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS digital_nomad_info JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS comparison_highlights JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '{}';

-- Create indexes for new JSONB fields
CREATE INDEX IF NOT EXISTS idx_destinations_climate ON destinations USING GIN (climate_data);
CREATE INDEX IF NOT EXISTS idx_destinations_crime ON destinations USING GIN (crime_safety);
CREATE INDEX IF NOT EXISTS idx_destinations_healthcare ON destinations USING GIN (healthcare);
CREATE INDEX IF NOT EXISTS idx_destinations_lifestyle ON destinations USING GIN (lifestyle);
CREATE INDEX IF NOT EXISTS idx_destinations_infrastructure ON destinations USING GIN (infrastructure);
CREATE INDEX IF NOT EXISTS idx_destinations_qol ON destinations USING GIN (quality_of_life);

-- ============================================
-- CYPRUS - Full comprehensive data
-- ============================================
UPDATE destinations SET
  climate_data = '{
    "type": "Mediterranean",
    "annual_sunshine_hours": 3400,
    "annual_rainfall_mm": 400,
    "seasons": {
      "summer": {"months": ["Jun", "Jul", "Aug", "Sep"], "temp_avg_c": 33, "temp_min_c": 23, "description": "Hot and dry, beach weather"},
      "winter": {"months": ["Dec", "Jan", "Feb"], "temp_avg_c": 17, "temp_min_c": 8, "description": "Mild, occasional rain"},
      "spring": {"months": ["Mar", "Apr", "May"], "temp_avg_c": 22, "temp_min_c": 13, "description": "Pleasant, wildflowers"},
      "autumn": {"months": ["Oct", "Nov"], "temp_avg_c": 25, "temp_min_c": 17, "description": "Warm, ideal weather"}
    },
    "best_months": ["Apr", "May", "Oct", "Nov"],
    "humidity_avg_percent": 65,
    "uv_index_summer": 10,
    "sea_temp_summer_c": 27,
    "snow_possible": false,
    "climate_rating": 9.2
  }'::jsonb,

  crime_safety = '{
    "global_peace_index_rank": 61,
    "safety_index": 77.3,
    "crime_index": 22.7,
    "violent_crime_rate": "Very Low",
    "property_crime_rate": "Low",
    "common_concerns": ["Minor theft in tourist areas", "Traffic safety"],
    "safe_areas": ["Limassol Marina", "Paphos", "Most residential areas"],
    "areas_to_avoid_at_night": ["Few if any"],
    "police_response_rating": 8.1,
    "expat_safety_rating": 9.0,
    "women_safety_rating": 8.7,
    "lgbtq_safety": {
      "legal_status": "Legal since 1998",
      "social_acceptance": "Moderate, improving",
      "pride_events": true,
      "rating": 6.5
    },
    "emergency_number": "112",
    "healthcare_emergency": "1400",
    "police": "199"
  }'::jsonb,

  healthcare = '{
    "system_type": "Mixed public/private",
    "universal_coverage": true,
    "ghs_system": {
      "name": "GESY (General Healthcare System)",
      "launched": 2019,
      "contribution_rate": "2.65% employees, 2.9% employers",
      "coverage": "Comprehensive including dental"
    },
    "quality_rating": 7.8,
    "hospital_beds_per_1000": 3.4,
    "doctors_per_1000": 4.1,
    "wait_times_rating": 7.2,
    "private_healthcare": {
      "availability": "Excellent",
      "cost_consultation_eur": 50,
      "cost_annual_insurance_eur": 1500
    },
    "top_hospitals": [
      {"name": "Aretaeio Hospital", "city": "Nicosia", "type": "private"},
      {"name": "Apollonion Private Hospital", "city": "Nicosia", "type": "private"},
      {"name": "Ygia Polyclinic", "city": "Limassol", "type": "private"},
      {"name": "Limassol General Hospital", "city": "Limassol", "type": "public"}
    ],
    "vaccination_required": false,
    "pharmacies_accessible": true,
    "english_speaking_doctors": "Widely available"
  }'::jsonb,

  lifestyle = '{
    "work_life_balance_rating": 8.2,
    "avg_working_hours_week": 40,
    "annual_leave_days_min": 20,
    "public_holidays": 14,
    "siesta_culture": true,
    "family_oriented": true,
    "expat_community_size": "Large (100,000+)",
    "english_proficiency": "High",
    "social_life_rating": 8.0,
    "dating_scene_rating": 7.2,
    "networking_opportunities": "Good, especially in Limassol",
    "cultural_activities": ["Ancient ruins", "Wine culture", "Mediterranean festivals", "Water sports"],
    "sports_facilities": ["Tennis", "Golf", "Diving", "Sailing", "Hiking"],
    "beach_access": "320+ beaches",
    "nature_access": ["Troodos Mountains", "Akamas Peninsula", "Cape Greco"],
    "pet_friendly": 7.5,
    "child_friendly": 9.0
  }'::jsonb,

  infrastructure = '{
    "internet": {
      "avg_speed_mbps": 85,
      "fiber_coverage_percent": 75,
      "5g_available": true,
      "starlink_available": true,
      "cost_monthly_eur": 35,
      "reliability_rating": 8.5
    },
    "transport": {
      "public_transport_rating": 4.5,
      "car_essential": true,
      "uber_available": false,
      "taxi_app": "Taxidi, nTaxi",
      "airport_international": ["Larnaca (LCA)", "Paphos (PFO)"],
      "flight_time_london_hours": 4.5,
      "flight_time_dubai_hours": 3.5,
      "rental_car_cost_day_eur": 25
    },
    "coworking_spaces": [
      {"name": "Regus Limassol", "city": "Limassol", "cost_month_eur": 350},
      {"name": "The Base", "city": "Nicosia", "cost_month_eur": 200},
      {"name": "Cube", "city": "Limassol", "cost_month_eur": 180}
    ],
    "power_reliability": 9.5,
    "water_quality_tap": "Drinkable but many prefer bottled",
    "postal_service_rating": 7.0
  }'::jsonb,

  dining_nightlife = '{
    "michelin_stars_total": 0,
    "cuisine_types": ["Greek", "Cypriot", "Lebanese", "Mediterranean", "International"],
    "signature_dishes": ["Halloumi", "Souvlaki", "Meze", "Kleftiko", "Sheftalia"],
    "avg_meal_cost_casual_eur": 15,
    "avg_meal_cost_fine_eur": 60,
    "coffee_culture": "Strong (Greek-style and modern cafes)",
    "avg_coffee_eur": 3.5,
    "nightlife_rating": 7.5,
    "nightlife_areas": ["Limassol Marina", "Ayia Napa", "Paphos Bar Street"],
    "best_restaurants": [
      {"name": "Pyxida Fish Tavern", "city": "Limassol", "cuisine": "Seafood", "price": "€€€"},
      {"name": "Meze Taverna", "city": "Paphos", "cuisine": "Cypriot", "price": "€€"},
      {"name": "Karatello", "city": "Limassol", "cuisine": "Italian", "price": "€€€"},
      {"name": "Vivaldi by Mavrommatis", "city": "Limassol", "cuisine": "Fine Dining", "price": "€€€€"},
      {"name": "Ta Piatakia", "city": "Nicosia", "cuisine": "Cypriot Modern", "price": "€€"}
    ],
    "wine_culture": {
      "local_wines": true,
      "wine_regions": ["Troodos", "Paphos", "Limassol"],
      "famous_wines": ["Commandaria (worlds oldest named wine)", "Xynisteri", "Maratheftiko"],
      "winery_tours": true
    },
    "grocery_quality": 8.0,
    "international_products": "Good availability"
  }'::jsonb,

  capital_overview = '{
    "name": "Nicosia (Lefkosia)",
    "population": 340000,
    "area_km2": 111,
    "is_divided": true,
    "division_note": "Last divided capital in the world (since 1974)",
    "districts": {
      "old_town": {"description": "Historic walled city, UNESCO heritage", "vibe": "Traditional, touristic"},
      "engomi": {"description": "Upscale residential", "vibe": "Family-friendly, modern"},
      "strovolos": {"description": "Commercial hub", "vibe": "Business, shopping"},
      "lakatamia": {"description": "Suburban", "vibe": "Affordable, residential"}
    },
    "landmarks": ["Venetian Walls", "Ledra Street", "Cyprus Museum", "Shacolas Tower"],
    "universities": 3,
    "embassies": true,
    "climate_note": "Hotter than coast in summer, cooler in winter",
    "beach_distance_km": 60,
    "business_center": true
  }'::jsonb,

  quality_of_life = '{
    "overall_score": 7.8,
    "cost_of_living_index": 58.2,
    "purchasing_power_index": 62.4,
    "safety_index": 77.3,
    "healthcare_index": 64.7,
    "pollution_index": 29.1,
    "traffic_commute_index": 35.2,
    "climate_index": 93.4,
    "expat_friendly_index": 8.2,
    "happiness_rank": 58,
    "ease_of_doing_business_rank": 54,
    "english_proficiency_rank": 15,
    "air_quality": "Good",
    "noise_pollution": "Low",
    "green_spaces": "Moderate"
  }'::jsonb,

  currency_info = '{
    "code": "EUR",
    "name": "Euro",
    "symbol": "€",
    "exchange_rate_usd": 0.92,
    "exchange_rate_gbp": 0.86,
    "atm_availability": "Widespread",
    "credit_cards_accepted": "Widely",
    "contactless_common": true,
    "cash_preferred": false,
    "banking": {
      "major_banks": ["Bank of Cyprus", "Hellenic Bank", "RCB Bank", "Alpha Bank"],
      "opening_account_difficulty": "Easy for residents",
      "international_transfers": "SEPA zone - fast and cheap",
      "crypto_friendly": "Moderate regulation"
    },
    "tipping_culture": "5-10% appreciated but not mandatory"
  }'::jsonb,

  digital_nomad_info = '{
    "visa_available": true,
    "visa_name": "Digital Nomad Visa",
    "min_income_monthly_eur": 3500,
    "duration_months": 12,
    "renewable": true,
    "max_stay_years": 3,
    "tax_status": "May become tax resident after 183 days",
    "coworking_scene": "Growing, especially in Limassol",
    "nomad_community_size": "Medium (5,000+)",
    "popular_areas": ["Limassol", "Paphos", "Larnaca"],
    "meetups": ["Cyprus Startup Scene", "Nomad Coffee Limassol"],
    "internet_reliability": 8.5,
    "cafe_work_friendly": true,
    "time_zone": "UTC+2 (EET), UTC+3 (EEST summer)",
    "timezone_overlap": {
      "london": 2,
      "new_york": 7,
      "san_francisco": 10,
      "dubai": -2
    }
  }'::jsonb,

  comparison_highlights = '{
    "similar_to": ["Malta", "Greece"],
    "vs_malta": {
      "pros": ["Larger country", "More nature", "Lower density", "Better beaches"],
      "cons": ["Less EU connected", "Weaker public transport", "Division issue"],
      "tax_comparison": "Similar rates, Cyprus has better IP box"
    },
    "vs_greece": {
      "pros": ["Lower taxes", "Better English", "More expat infrastructure"],
      "cons": ["Smaller country", "Less cultural depth", "Hotter summers"],
      "tax_comparison": "Cyprus significantly lower corporate tax"
    },
    "vs_portugal": {
      "pros": ["Same timezone as Eastern Europe", "EU passport faster", "Better weather"],
      "cons": ["Less developed nomad scene", "Smaller country", "Less diverse cuisine"],
      "tax_comparison": "NHR ending in Portugal, Cyprus Non-Dom similar benefits"
    },
    "unique_selling_points": [
      "Lowest EU corporate tax at 12.5%",
      "17-year Non-Dom tax regime",
      "English as de facto second language",
      "EU citizenship possible in 7 years",
      "340 days of sunshine"
    ]
  }'::jsonb,

  images = '{
    "hero": "https://images.unsplash.com/photo-1597571063304-81f081944ee8?w=1600",
    "capital": "https://images.unsplash.com/photo-1600621626047-d65e97de8e25?w=800",
    "lifestyle": "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800",
    "beach": "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800",
    "food": "https://images.unsplash.com/photo-1544943910-5c4fea8ca585?w=800",
    "nature": "https://images.unsplash.com/photo-1588003909432-4ad01e2bfa91?w=800",
    "city": "https://images.unsplash.com/photo-1600621626047-d65e97de8e25?w=800",
    "flag_large": "https://flagcdn.com/w640/cy.png",
    "gradient": "from-amber-500 to-orange-600"
  }'::jsonb
WHERE slug = 'cyprus';

-- ============================================
-- PORTUGAL - Full comprehensive data
-- ============================================
UPDATE destinations SET
  climate_data = '{
    "type": "Mediterranean/Oceanic",
    "annual_sunshine_hours": 2800,
    "annual_rainfall_mm": 850,
    "seasons": {
      "summer": {"months": ["Jun", "Jul", "Aug", "Sep"], "temp_avg_c": 28, "temp_min_c": 18, "description": "Warm, dry, perfect beach weather"},
      "winter": {"months": ["Dec", "Jan", "Feb"], "temp_avg_c": 14, "temp_min_c": 8, "description": "Mild, rainy periods"},
      "spring": {"months": ["Mar", "Apr", "May"], "temp_avg_c": 18, "temp_min_c": 11, "description": "Pleasant, occasional rain"},
      "autumn": {"months": ["Oct", "Nov"], "temp_avg_c": 20, "temp_min_c": 13, "description": "Mild, grape harvest season"}
    },
    "best_months": ["May", "Jun", "Sep", "Oct"],
    "humidity_avg_percent": 72,
    "uv_index_summer": 9,
    "sea_temp_summer_c": 21,
    "snow_possible": true,
    "snow_note": "Only in Serra da Estrela mountains",
    "climate_rating": 8.8
  }'::jsonb,

  crime_safety = '{
    "global_peace_index_rank": 7,
    "safety_index": 81.5,
    "crime_index": 28.5,
    "violent_crime_rate": "Very Low",
    "property_crime_rate": "Low",
    "common_concerns": ["Pickpocketing in Lisbon tourist areas", "Car break-ins at beaches"],
    "safe_areas": ["Most of Lisbon", "Porto", "Algarve towns"],
    "areas_to_avoid_at_night": ["Martim Moniz area after dark", "Cais do Sodré late night"],
    "police_response_rating": 7.5,
    "expat_safety_rating": 9.2,
    "women_safety_rating": 9.0,
    "lgbtq_safety": {
      "legal_status": "Full equality since 2010",
      "social_acceptance": "Very high",
      "pride_events": true,
      "rating": 9.0
    },
    "emergency_number": "112",
    "police": "112"
  }'::jsonb,

  healthcare = '{
    "system_type": "Universal public (SNS)",
    "universal_coverage": true,
    "quality_rating": 7.5,
    "hospital_beds_per_1000": 3.5,
    "doctors_per_1000": 5.5,
    "wait_times_rating": 5.5,
    "private_healthcare": {
      "availability": "Excellent",
      "cost_consultation_eur": 60,
      "cost_annual_insurance_eur": 1000
    },
    "top_hospitals": [
      {"name": "Hospital da Luz", "city": "Lisbon", "type": "private"},
      {"name": "CUF Descobertas", "city": "Lisbon", "type": "private"},
      {"name": "Hospital de São João", "city": "Porto", "type": "public"},
      {"name": "Hospital de Santa Maria", "city": "Lisbon", "type": "public"}
    ],
    "vaccination_required": false,
    "pharmacies_accessible": true,
    "english_speaking_doctors": "Common in private sector"
  }'::jsonb,

  lifestyle = '{
    "work_life_balance_rating": 8.5,
    "avg_working_hours_week": 40,
    "annual_leave_days_min": 22,
    "public_holidays": 13,
    "siesta_culture": false,
    "family_oriented": true,
    "expat_community_size": "Very Large (500,000+)",
    "english_proficiency": "High",
    "social_life_rating": 8.5,
    "dating_scene_rating": 7.8,
    "networking_opportunities": "Excellent",
    "cultural_activities": ["Fado music", "Wine tours", "Surf culture", "Festivals"],
    "sports_facilities": ["Surfing", "Golf", "Tennis", "Football", "Hiking"],
    "beach_access": "850km of coastline",
    "nature_access": ["Sintra", "Douro Valley", "Azores", "Madeira"],
    "pet_friendly": 8.0,
    "child_friendly": 8.5
  }'::jsonb,

  infrastructure = '{
    "internet": {
      "avg_speed_mbps": 120,
      "fiber_coverage_percent": 85,
      "5g_available": true,
      "starlink_available": true,
      "cost_monthly_eur": 30,
      "reliability_rating": 9.0
    },
    "transport": {
      "public_transport_rating": 8.0,
      "car_essential": false,
      "uber_available": true,
      "taxi_app": "Uber, Bolt, Free Now",
      "airport_international": ["Lisbon (LIS)", "Porto (OPO)", "Faro (FAO)"],
      "flight_time_london_hours": 2.5,
      "flight_time_dubai_hours": 7,
      "rental_car_cost_day_eur": 20
    },
    "coworking_spaces": [
      {"name": "Heden", "city": "Lisbon", "cost_month_eur": 250},
      {"name": "Second Home", "city": "Lisbon", "cost_month_eur": 350},
      {"name": "Porto i/o", "city": "Porto", "cost_month_eur": 180}
    ],
    "power_reliability": 9.5,
    "water_quality_tap": "Excellent, drinkable everywhere",
    "postal_service_rating": 7.5
  }'::jsonb,

  dining_nightlife = '{
    "michelin_stars_total": 24,
    "cuisine_types": ["Portuguese", "Mediterranean", "Seafood", "International"],
    "signature_dishes": ["Bacalhau (cod)", "Pastéis de Nata", "Francesinha", "Sardinhas"],
    "avg_meal_cost_casual_eur": 12,
    "avg_meal_cost_fine_eur": 80,
    "coffee_culture": "Very strong (bica/espresso culture)",
    "avg_coffee_eur": 1.0,
    "nightlife_rating": 9.0,
    "nightlife_areas": ["Bairro Alto", "Cais do Sodré", "LX Factory"],
    "best_restaurants": [
      {"name": "Belcanto", "city": "Lisbon", "cuisine": "Modern Portuguese", "price": "€€€€", "michelin": 2},
      {"name": "The Yeatman", "city": "Porto", "cuisine": "Fine Dining", "price": "€€€€", "michelin": 2},
      {"name": "A Cevicheria", "city": "Lisbon", "cuisine": "Peruvian-Portuguese", "price": "€€€"},
      {"name": "Time Out Market", "city": "Lisbon", "cuisine": "Food Hall", "price": "€€"},
      {"name": "Ramiro", "city": "Lisbon", "cuisine": "Seafood", "price": "€€€"}
    ],
    "wine_culture": {
      "local_wines": true,
      "wine_regions": ["Douro", "Alentejo", "Dão", "Vinho Verde"],
      "famous_wines": ["Port Wine", "Vinho Verde", "Alvarinho"],
      "winery_tours": true
    },
    "grocery_quality": 8.5,
    "international_products": "Excellent availability"
  }'::jsonb,

  capital_overview = '{
    "name": "Lisbon",
    "population": 545000,
    "metro_population": 2900000,
    "area_km2": 100,
    "districts": {
      "baixa_chiado": {"description": "Historic center, shopping", "vibe": "Touristic, elegant"},
      "alfama": {"description": "Oldest district, fado houses", "vibe": "Traditional, authentic"},
      "belem": {"description": "Monuments, museums", "vibe": "Cultural, spacious"},
      "principe_real": {"description": "Trendy gardens area", "vibe": "Hip, upscale"},
      "cascais": {"description": "Coastal resort town", "vibe": "Beach, affluent"}
    },
    "landmarks": ["Belém Tower", "Jerónimos Monastery", "Praça do Comércio", "LX Factory"],
    "universities": 6,
    "embassies": true,
    "climate_note": "Mild year-round, sea breeze",
    "beach_distance_km": 20,
    "business_center": true
  }'::jsonb,

  quality_of_life = '{
    "overall_score": 8.2,
    "cost_of_living_index": 52.1,
    "purchasing_power_index": 58.3,
    "safety_index": 81.5,
    "healthcare_index": 67.2,
    "pollution_index": 33.4,
    "traffic_commute_index": 41.2,
    "climate_index": 88.2,
    "expat_friendly_index": 9.0,
    "happiness_rank": 56,
    "ease_of_doing_business_rank": 39,
    "english_proficiency_rank": 7,
    "air_quality": "Good",
    "noise_pollution": "Moderate in cities",
    "green_spaces": "Good"
  }'::jsonb,

  currency_info = '{
    "code": "EUR",
    "name": "Euro",
    "symbol": "€",
    "exchange_rate_usd": 0.92,
    "exchange_rate_gbp": 0.86,
    "atm_availability": "Widespread",
    "credit_cards_accepted": "Widely",
    "contactless_common": true,
    "cash_preferred": false,
    "banking": {
      "major_banks": ["Millennium BCP", "Novo Banco", "Santander", "CGD"],
      "opening_account_difficulty": "Easy for residents",
      "international_transfers": "SEPA zone",
      "crypto_friendly": "Progressive regulation"
    },
    "tipping_culture": "5-10% for good service"
  }'::jsonb,

  digital_nomad_info = '{
    "visa_available": true,
    "visa_name": "Digital Nomad Visa (D8)",
    "min_income_monthly_eur": 3280,
    "duration_months": 12,
    "renewable": true,
    "max_stay_years": 5,
    "tax_status": "NHR regime ending 2024, new regime TBD",
    "coworking_scene": "Excellent, Europe top 5",
    "nomad_community_size": "Very Large (50,000+)",
    "popular_areas": ["Lisbon", "Porto", "Ericeira", "Madeira"],
    "meetups": ["Lisbon Digital Nomads", "Surf & Work Ericeira"],
    "internet_reliability": 9.0,
    "cafe_work_friendly": true,
    "time_zone": "UTC+0 (WET), UTC+1 (WEST summer)",
    "timezone_overlap": {
      "london": 0,
      "new_york": 5,
      "san_francisco": 8,
      "dubai": -4
    }
  }'::jsonb,

  comparison_highlights = '{
    "similar_to": ["Spain", "Cyprus"],
    "vs_spain": {
      "pros": ["Lower cost of living", "Better surf", "Smaller, easier to navigate", "Friendlier visa"],
      "cons": ["Smaller job market", "Less developed inland", "Lower salaries"],
      "tax_comparison": "NHR was superior but ending, Spain Beckham Law still active"
    },
    "vs_cyprus": {
      "pros": ["Better weather variety", "Larger nomad community", "Better public transport"],
      "cons": ["Further from Middle East", "Higher taxes coming", "Atlantic not Med"],
      "tax_comparison": "Cyprus now more attractive post-NHR"
    },
    "unique_selling_points": [
      "Global top 5 for digital nomads",
      "7th safest country in the world",
      "Excellent surf and outdoor lifestyle",
      "Strong tech startup ecosystem",
      "EU Golden Visa program"
    ]
  }'::jsonb,

  images = '{
    "hero": "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1600",
    "capital": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    "lifestyle": "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800",
    "beach": "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800",
    "food": "https://images.unsplash.com/photo-1554388319-5aa5a1eb0d60?w=800",
    "nature": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    "city": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    "flag_large": "https://flagcdn.com/w640/pt.png",
    "gradient": "from-green-600 to-red-500"
  }'::jsonb
WHERE slug = 'portugal';

-- ============================================
-- MALTA - Full comprehensive data
-- ============================================
UPDATE destinations SET
  climate_data = '{
    "type": "Mediterranean",
    "annual_sunshine_hours": 3000,
    "annual_rainfall_mm": 550,
    "seasons": {
      "summer": {"months": ["Jun", "Jul", "Aug", "Sep"], "temp_avg_c": 31, "temp_min_c": 22, "description": "Hot, humid, beach weather"},
      "winter": {"months": ["Dec", "Jan", "Feb"], "temp_avg_c": 15, "temp_min_c": 10, "description": "Mild, occasional storms"},
      "spring": {"months": ["Mar", "Apr", "May"], "temp_avg_c": 19, "temp_min_c": 13, "description": "Pleasant, wildflowers"},
      "autumn": {"months": ["Oct", "Nov"], "temp_avg_c": 23, "temp_min_c": 17, "description": "Warm, ideal weather"}
    },
    "best_months": ["Apr", "May", "Oct", "Nov"],
    "humidity_avg_percent": 73,
    "uv_index_summer": 10,
    "sea_temp_summer_c": 26,
    "snow_possible": false,
    "climate_rating": 8.9
  }'::jsonb,

  crime_safety = '{
    "global_peace_index_rank": 24,
    "safety_index": 74.2,
    "crime_index": 25.8,
    "violent_crime_rate": "Very Low",
    "property_crime_rate": "Low",
    "common_concerns": ["Minor theft in Paceville", "Traffic safety"],
    "safe_areas": ["Sliema", "St Julians", "Valletta", "Mdina"],
    "areas_to_avoid_at_night": ["Paceville (party area, rowdy not dangerous)"],
    "police_response_rating": 7.5,
    "expat_safety_rating": 8.8,
    "women_safety_rating": 8.5,
    "lgbtq_safety": {
      "legal_status": "Full equality, very progressive",
      "social_acceptance": "High",
      "pride_events": true,
      "rating": 9.5
    },
    "emergency_number": "112",
    "police": "112"
  }'::jsonb,

  healthcare = '{
    "system_type": "Universal public (NHS-style)",
    "universal_coverage": true,
    "quality_rating": 7.0,
    "hospital_beds_per_1000": 4.5,
    "doctors_per_1000": 4.0,
    "wait_times_rating": 5.0,
    "private_healthcare": {
      "availability": "Good",
      "cost_consultation_eur": 50,
      "cost_annual_insurance_eur": 1200
    },
    "top_hospitals": [
      {"name": "Mater Dei Hospital", "city": "Msida", "type": "public"},
      {"name": "St James Hospital", "city": "Sliema", "type": "private"},
      {"name": "St Catherine Hospital", "city": "Attard", "type": "private"}
    ],
    "vaccination_required": false,
    "pharmacies_accessible": true,
    "english_speaking_doctors": "All doctors speak English"
  }'::jsonb,

  lifestyle = '{
    "work_life_balance_rating": 7.8,
    "avg_working_hours_week": 40,
    "annual_leave_days_min": 24,
    "public_holidays": 14,
    "siesta_culture": false,
    "family_oriented": true,
    "expat_community_size": "Large relative to population (100,000+)",
    "english_proficiency": "Native level",
    "social_life_rating": 8.2,
    "dating_scene_rating": 6.5,
    "networking_opportunities": "Excellent for finance and gaming",
    "cultural_activities": ["Historic sites", "Festivals", "Diving", "Boating"],
    "sports_facilities": ["Diving", "Sailing", "Tennis", "Football"],
    "beach_access": "Numerous rocky beaches and coves",
    "nature_access": ["Gozo", "Comino", "Blue Lagoon"],
    "pet_friendly": 6.5,
    "child_friendly": 7.5
  }'::jsonb,

  infrastructure = '{
    "internet": {
      "avg_speed_mbps": 110,
      "fiber_coverage_percent": 95,
      "5g_available": true,
      "starlink_available": true,
      "cost_monthly_eur": 40,
      "reliability_rating": 8.5
    },
    "transport": {
      "public_transport_rating": 5.0,
      "car_essential": true,
      "uber_available": true,
      "taxi_app": "Bolt, eCabs",
      "airport_international": ["Malta International (MLA)"],
      "flight_time_london_hours": 3,
      "flight_time_dubai_hours": 5.5,
      "rental_car_cost_day_eur": 25
    },
    "coworking_spaces": [
      {"name": "SOHO Office Space", "city": "Sliema", "cost_month_eur": 300},
      {"name": "The Vault", "city": "Valletta", "cost_month_eur": 250},
      {"name": "eBee", "city": "St Julians", "cost_month_eur": 180}
    ],
    "power_reliability": 9.0,
    "water_quality_tap": "Desalinated, safe but hard",
    "postal_service_rating": 7.0
  }'::jsonb,

  dining_nightlife = '{
    "michelin_stars_total": 2,
    "cuisine_types": ["Maltese", "Mediterranean", "Italian", "British"],
    "signature_dishes": ["Pastizzi", "Rabbit stew", "Ftira", "Lampuki pie"],
    "avg_meal_cost_casual_eur": 18,
    "avg_meal_cost_fine_eur": 70,
    "coffee_culture": "Strong",
    "avg_coffee_eur": 2.5,
    "nightlife_rating": 8.5,
    "nightlife_areas": ["Paceville", "Valletta Waterfront", "Sliema Promenade"],
    "best_restaurants": [
      {"name": "Noni", "city": "Valletta", "cuisine": "Modern Mediterranean", "price": "€€€€", "michelin": 1},
      {"name": "De Mondion", "city": "Mdina", "cuisine": "Fine Dining", "price": "€€€€"},
      {"name": "Terrone", "city": "Valletta", "cuisine": "Italian", "price": "€€€"},
      {"name": "Ta Kris", "city": "Sliema", "cuisine": "Maltese", "price": "€€"},
      {"name": "Gululu", "city": "St Julians", "cuisine": "Seafood", "price": "€€€"}
    ],
    "wine_culture": {
      "local_wines": true,
      "wine_regions": ["Gozo", "Malta mainland"],
      "famous_wines": ["Gellewza", "Girgentina"],
      "winery_tours": true
    },
    "grocery_quality": 7.5,
    "international_products": "Good but expensive"
  }'::jsonb,

  capital_overview = '{
    "name": "Valletta",
    "population": 6000,
    "note": "Smallest EU capital by population",
    "metro_area": "Greater Harbour Area 400,000+",
    "area_km2": 0.8,
    "districts": {
      "valletta": {"description": "UNESCO World Heritage capital", "vibe": "Historic, cultural"},
      "sliema": {"description": "Modern seafront town", "vibe": "Expat hub, shopping"},
      "st_julians": {"description": "Nightlife and hotels", "vibe": "Party, business"},
      "mdina": {"description": "Ancient walled city", "vibe": "Historic, quiet"}
    },
    "landmarks": ["St Johns Co-Cathedral", "Grand Harbour", "Upper Barrakka Gardens", "Fort St Elmo"],
    "universities": 1,
    "embassies": true,
    "climate_note": "Sea breeze keeps it comfortable",
    "beach_distance_km": 2,
    "business_center": true
  }'::jsonb,

  quality_of_life = '{
    "overall_score": 7.5,
    "cost_of_living_index": 68.5,
    "purchasing_power_index": 72.1,
    "safety_index": 74.2,
    "healthcare_index": 62.5,
    "pollution_index": 45.2,
    "traffic_commute_index": 52.3,
    "climate_index": 89.1,
    "expat_friendly_index": 8.5,
    "happiness_rank": 27,
    "ease_of_doing_business_rank": 88,
    "english_proficiency_rank": 1,
    "air_quality": "Good",
    "noise_pollution": "Moderate (dense population)",
    "green_spaces": "Limited"
  }'::jsonb,

  currency_info = '{
    "code": "EUR",
    "name": "Euro",
    "symbol": "€",
    "exchange_rate_usd": 0.92,
    "exchange_rate_gbp": 0.86,
    "atm_availability": "Widespread",
    "credit_cards_accepted": "Widely",
    "contactless_common": true,
    "cash_preferred": false,
    "banking": {
      "major_banks": ["Bank of Valletta", "HSBC Malta", "APS Bank", "MeDirect"],
      "opening_account_difficulty": "Moderate (due diligence heavy)",
      "international_transfers": "SEPA zone",
      "crypto_friendly": "Very - crypto hub status"
    },
    "tipping_culture": "5-10% appreciated"
  }'::jsonb,

  digital_nomad_info = '{
    "visa_available": true,
    "visa_name": "Nomad Residence Permit",
    "min_income_monthly_eur": 2700,
    "duration_months": 12,
    "renewable": true,
    "max_stay_years": 3,
    "tax_status": "Can opt for flat 15% on remitted income",
    "coworking_scene": "Good, gaming/blockchain focused",
    "nomad_community_size": "Medium (3,000+)",
    "popular_areas": ["Sliema", "St Julians", "Valletta"],
    "meetups": ["Malta Tech Community", "Blockchain Malta"],
    "internet_reliability": 8.5,
    "cafe_work_friendly": true,
    "time_zone": "UTC+1 (CET), UTC+2 (CEST summer)",
    "timezone_overlap": {
      "london": 1,
      "new_york": 6,
      "san_francisco": 9,
      "dubai": -3
    }
  }'::jsonb,

  comparison_highlights = '{
    "similar_to": ["Cyprus", "Gibraltar"],
    "vs_cyprus": {
      "pros": ["Better English", "Smaller/more walkable", "More EU integrated"],
      "cons": ["More expensive", "Less nature", "Overcrowded", "Traffic"],
      "tax_comparison": "Similar corporate rates, Malta has participation exemption"
    },
    "vs_portugal": {
      "pros": ["English native", "Better for gaming/crypto", "Closer to Africa/Middle East"],
      "cons": ["Smaller country", "Less nature", "More expensive"],
      "tax_comparison": "Malta flat rate options, Portugal NHR ending"
    },
    "unique_selling_points": [
      "English is official language",
      "iGaming capital of Europe",
      "Blockchain island regulatory clarity",
      "EU citizenship possible in 5 years (MPRP)",
      "Full participation exemption for dividends"
    ]
  }'::jsonb,

  images = '{
    "hero": "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=1600",
    "capital": "https://images.unsplash.com/photo-1555990793-da11153b2473?w=800",
    "lifestyle": "https://images.unsplash.com/photo-1558618047-3c8c76ca4f23?w=800",
    "beach": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
    "food": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
    "nature": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
    "city": "https://images.unsplash.com/photo-1555990793-da11153b2473?w=800",
    "flag_large": "https://flagcdn.com/w640/mt.png",
    "gradient": "from-red-500 to-white"
  }'::jsonb
WHERE slug = 'malta';

-- ============================================
-- SPAIN - Full comprehensive data
-- ============================================
UPDATE destinations SET
  climate_data = '{
    "type": "Varied (Mediterranean, Continental, Atlantic)",
    "annual_sunshine_hours": 2500,
    "annual_rainfall_mm": 650,
    "seasons": {
      "summer": {"months": ["Jun", "Jul", "Aug"], "temp_avg_c": 32, "temp_min_c": 20, "description": "Hot inland, warm coastal"},
      "winter": {"months": ["Dec", "Jan", "Feb"], "temp_avg_c": 12, "temp_min_c": 5, "description": "Mild south, cold north"},
      "spring": {"months": ["Mar", "Apr", "May"], "temp_avg_c": 18, "temp_min_c": 10, "description": "Pleasant everywhere"},
      "autumn": {"months": ["Sep", "Oct", "Nov"], "temp_avg_c": 20, "temp_min_c": 12, "description": "Harvest season, pleasant"}
    },
    "best_months": ["Apr", "May", "Sep", "Oct"],
    "humidity_avg_percent": 60,
    "uv_index_summer": 9,
    "sea_temp_summer_c": 24,
    "snow_possible": true,
    "snow_note": "Common in Pyrenees and Sierra Nevada",
    "climate_rating": 8.7
  }'::jsonb,

  crime_safety = '{
    "global_peace_index_rank": 32,
    "safety_index": 75.8,
    "crime_index": 34.2,
    "violent_crime_rate": "Low",
    "property_crime_rate": "Moderate",
    "common_concerns": ["Pickpocketing in Barcelona", "Tourist scams in Madrid"],
    "safe_areas": ["Most residential areas", "San Sebastián", "Mallorca"],
    "areas_to_avoid_at_night": ["Las Ramblas late night", "El Raval"],
    "police_response_rating": 7.5,
    "expat_safety_rating": 8.5,
    "women_safety_rating": 8.2,
    "lgbtq_safety": {
      "legal_status": "Full equality since 2005",
      "social_acceptance": "Very high",
      "pride_events": true,
      "rating": 9.2
    },
    "emergency_number": "112",
    "police": "091"
  }'::jsonb,

  healthcare = '{
    "system_type": "Universal public",
    "universal_coverage": true,
    "quality_rating": 8.5,
    "hospital_beds_per_1000": 3.0,
    "doctors_per_1000": 4.4,
    "wait_times_rating": 6.5,
    "private_healthcare": {
      "availability": "Excellent",
      "cost_consultation_eur": 50,
      "cost_annual_insurance_eur": 800
    },
    "top_hospitals": [
      {"name": "Hospital Clínic", "city": "Barcelona", "type": "public"},
      {"name": "Hospital Universitario La Paz", "city": "Madrid", "type": "public"},
      {"name": "Teknon Medical Center", "city": "Barcelona", "type": "private"},
      {"name": "Quirónsalud", "city": "Madrid", "type": "private"}
    ],
    "vaccination_required": false,
    "pharmacies_accessible": true,
    "english_speaking_doctors": "Available in major cities"
  }'::jsonb,

  lifestyle = '{
    "work_life_balance_rating": 8.8,
    "avg_working_hours_week": 38,
    "annual_leave_days_min": 22,
    "public_holidays": 14,
    "siesta_culture": true,
    "family_oriented": true,
    "expat_community_size": "Very Large (1M+)",
    "english_proficiency": "Moderate",
    "social_life_rating": 9.0,
    "dating_scene_rating": 8.5,
    "networking_opportunities": "Excellent",
    "cultural_activities": ["Flamenco", "Football", "Festivals", "Museums"],
    "sports_facilities": ["Football", "Tennis", "Golf", "Skiing", "Surfing"],
    "beach_access": "8000km of coastline",
    "nature_access": ["Pyrenees", "Sierra Nevada", "Canary Islands", "Balearics"],
    "pet_friendly": 8.0,
    "child_friendly": 9.0
  }'::jsonb,

  infrastructure = '{
    "internet": {
      "avg_speed_mbps": 175,
      "fiber_coverage_percent": 90,
      "5g_available": true,
      "starlink_available": true,
      "cost_monthly_eur": 35,
      "reliability_rating": 9.0
    },
    "transport": {
      "public_transport_rating": 8.5,
      "car_essential": false,
      "uber_available": false,
      "taxi_app": "Cabify, Free Now",
      "airport_international": ["Madrid (MAD)", "Barcelona (BCN)", "Málaga (AGP)"],
      "flight_time_london_hours": 2.5,
      "flight_time_dubai_hours": 7,
      "rental_car_cost_day_eur": 25
    },
    "coworking_spaces": [
      {"name": "WeWork", "city": "Barcelona", "cost_month_eur": 350},
      {"name": "MOB", "city": "Barcelona", "cost_month_eur": 200},
      {"name": "Impact Hub", "city": "Madrid", "cost_month_eur": 250}
    ],
    "power_reliability": 9.5,
    "water_quality_tap": "Good, varies by region",
    "postal_service_rating": 7.5
  }'::jsonb,

  dining_nightlife = '{
    "michelin_stars_total": 234,
    "cuisine_types": ["Spanish", "Tapas", "Basque", "Catalan", "Mediterranean"],
    "signature_dishes": ["Paella", "Jamón Ibérico", "Tortilla", "Gazpacho", "Pintxos"],
    "avg_meal_cost_casual_eur": 12,
    "avg_meal_cost_fine_eur": 80,
    "coffee_culture": "Strong (café con leche)",
    "avg_coffee_eur": 1.5,
    "nightlife_rating": 9.5,
    "nightlife_areas": ["Madrid - Malasaña", "Barcelona - El Born", "Ibiza"],
    "best_restaurants": [
      {"name": "El Celler de Can Roca", "city": "Girona", "cuisine": "Modern Catalan", "price": "€€€€", "michelin": 3},
      {"name": "DiverXO", "city": "Madrid", "cuisine": "Avant-garde", "price": "€€€€", "michelin": 3},
      {"name": "Mugaritz", "city": "San Sebastián", "cuisine": "Basque", "price": "€€€€", "michelin": 2},
      {"name": "Tickets", "city": "Barcelona", "cuisine": "Tapas", "price": "€€€"},
      {"name": "Mercado de San Miguel", "city": "Madrid", "cuisine": "Food Market", "price": "€€"}
    ],
    "wine_culture": {
      "local_wines": true,
      "wine_regions": ["Rioja", "Ribera del Duero", "Priorat", "Cava country"],
      "famous_wines": ["Rioja Reserva", "Tempranillo", "Cava"],
      "winery_tours": true
    },
    "grocery_quality": 9.0,
    "international_products": "Excellent"
  }'::jsonb,

  capital_overview = '{
    "name": "Madrid",
    "population": 3300000,
    "metro_population": 6800000,
    "area_km2": 604,
    "districts": {
      "salamanca": {"description": "Upscale shopping and dining", "vibe": "Elegant, expensive"},
      "malasana": {"description": "Hip neighborhood", "vibe": "Trendy, young"},
      "chueca": {"description": "LGBTQ+ hub", "vibe": "Vibrant, inclusive"},
      "retiro": {"description": "Park district", "vibe": "Family, residential"},
      "la_latina": {"description": "Traditional tapas area", "vibe": "Authentic, bustling"}
    },
    "landmarks": ["Royal Palace", "Prado Museum", "Retiro Park", "Plaza Mayor"],
    "universities": 12,
    "embassies": true,
    "climate_note": "Continental - hot summers, cold winters",
    "beach_distance_km": 350,
    "business_center": true
  }'::jsonb,

  quality_of_life = '{
    "overall_score": 8.4,
    "cost_of_living_index": 55.3,
    "purchasing_power_index": 67.2,
    "safety_index": 75.8,
    "healthcare_index": 78.5,
    "pollution_index": 36.5,
    "traffic_commute_index": 38.2,
    "climate_index": 86.4,
    "expat_friendly_index": 8.5,
    "happiness_rank": 32,
    "ease_of_doing_business_rank": 30,
    "english_proficiency_rank": 34,
    "air_quality": "Moderate",
    "noise_pollution": "Moderate in cities",
    "green_spaces": "Good"
  }'::jsonb,

  currency_info = '{
    "code": "EUR",
    "name": "Euro",
    "symbol": "€",
    "exchange_rate_usd": 0.92,
    "exchange_rate_gbp": 0.86,
    "atm_availability": "Widespread",
    "credit_cards_accepted": "Widely",
    "contactless_common": true,
    "cash_preferred": false,
    "banking": {
      "major_banks": ["Santander", "BBVA", "CaixaBank", "Sabadell"],
      "opening_account_difficulty": "Easy for residents",
      "international_transfers": "SEPA zone",
      "crypto_friendly": "Regulated"
    },
    "tipping_culture": "Round up or small change"
  }'::jsonb,

  digital_nomad_info = '{
    "visa_available": true,
    "visa_name": "Digital Nomad Visa (Ley Startups)",
    "min_income_monthly_eur": 2160,
    "duration_months": 12,
    "renewable": true,
    "max_stay_years": 5,
    "tax_status": "24% flat rate for 5 years (Beckham Law for employed)",
    "coworking_scene": "Excellent",
    "nomad_community_size": "Very Large (30,000+)",
    "popular_areas": ["Barcelona", "Valencia", "Canary Islands", "Málaga"],
    "meetups": ["Barcelona Tech City", "Nomad List Spain"],
    "internet_reliability": 9.0,
    "cafe_work_friendly": true,
    "time_zone": "UTC+1 (CET), UTC+2 (CEST summer)",
    "timezone_overlap": {
      "london": 1,
      "new_york": 6,
      "san_francisco": 9,
      "dubai": -3
    }
  }'::jsonb,

  comparison_highlights = '{
    "similar_to": ["Portugal", "Italy"],
    "vs_portugal": {
      "pros": ["Bigger job market", "More variety", "Better transport", "More cities"],
      "cons": ["Slightly more expensive", "Less English spoken", "More bureaucratic"],
      "tax_comparison": "Beckham Law more reliable than ending NHR"
    },
    "vs_italy": {
      "pros": ["Better visa options", "More relaxed bureaucracy", "Better beaches"],
      "cons": ["Less fashion/design scene", "Less historical depth"],
      "tax_comparison": "Similar but Spain visa easier"
    },
    "unique_selling_points": [
      "Beckham Law - 24% flat tax for 5 years",
      "Startup Law with digital nomad provisions",
      "234 Michelin star restaurants",
      "8000km of coastline",
      "High-speed rail network"
    ]
  }'::jsonb,

  images = '{
    "hero": "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1600",
    "capital": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800",
    "lifestyle": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=800",
    "beach": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    "food": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=800",
    "nature": "https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=800",
    "city": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800",
    "flag_large": "https://flagcdn.com/w640/es.png",
    "gradient": "from-red-500 to-yellow-500"
  }'::jsonb
WHERE slug = 'spain';

-- ============================================
-- DUBAI (UAE) - Full comprehensive data
-- ============================================
UPDATE destinations SET
  climate_data = '{
    "type": "Hot Desert",
    "annual_sunshine_hours": 3500,
    "annual_rainfall_mm": 80,
    "seasons": {
      "summer": {"months": ["Jun", "Jul", "Aug", "Sep"], "temp_avg_c": 42, "temp_min_c": 30, "description": "Extremely hot, AC essential"},
      "winter": {"months": ["Dec", "Jan", "Feb"], "temp_avg_c": 24, "temp_min_c": 14, "description": "Perfect, main tourist season"},
      "spring": {"months": ["Mar", "Apr", "May"], "temp_avg_c": 32, "temp_min_c": 20, "description": "Getting hot"},
      "autumn": {"months": ["Oct", "Nov"], "temp_avg_c": 32, "temp_min_c": 22, "description": "Still hot but bearable"}
    },
    "best_months": ["Nov", "Dec", "Jan", "Feb", "Mar"],
    "humidity_avg_percent": 60,
    "uv_index_summer": 11,
    "sea_temp_summer_c": 32,
    "snow_possible": false,
    "climate_rating": 6.5
  }'::jsonb,

  crime_safety = '{
    "global_peace_index_rank": 48,
    "safety_index": 84.5,
    "crime_index": 15.5,
    "violent_crime_rate": "Extremely Low",
    "property_crime_rate": "Very Low",
    "common_concerns": ["Traffic accidents", "Scams"],
    "safe_areas": ["Almost everywhere"],
    "areas_to_avoid_at_night": ["None"],
    "police_response_rating": 9.5,
    "expat_safety_rating": 9.5,
    "women_safety_rating": 9.0,
    "lgbtq_safety": {
      "legal_status": "Illegal",
      "social_acceptance": "Low, discretion advised",
      "pride_events": false,
      "rating": 3.0
    },
    "emergency_number": "999",
    "police": "999"
  }'::jsonb,

  healthcare = '{
    "system_type": "Private-dominant with public options",
    "universal_coverage": false,
    "quality_rating": 9.0,
    "hospital_beds_per_1000": 1.5,
    "doctors_per_1000": 2.5,
    "wait_times_rating": 8.5,
    "private_healthcare": {
      "availability": "World-class",
      "cost_consultation_eur": 100,
      "cost_annual_insurance_eur": 2500
    },
    "top_hospitals": [
      {"name": "Cleveland Clinic Abu Dhabi", "city": "Abu Dhabi", "type": "private"},
      {"name": "Mediclinic City Hospital", "city": "Dubai", "type": "private"},
      {"name": "American Hospital Dubai", "city": "Dubai", "type": "private"},
      {"name": "Dubai Hospital", "city": "Dubai", "type": "public"}
    ],
    "vaccination_required": false,
    "pharmacies_accessible": true,
    "english_speaking_doctors": "Standard"
  }'::jsonb,

  lifestyle = '{
    "work_life_balance_rating": 6.5,
    "avg_working_hours_week": 48,
    "annual_leave_days_min": 30,
    "public_holidays": 10,
    "siesta_culture": false,
    "family_oriented": true,
    "expat_community_size": "Very Large (85% of population)",
    "english_proficiency": "Very High",
    "social_life_rating": 8.5,
    "dating_scene_rating": 6.0,
    "networking_opportunities": "Excellent",
    "cultural_activities": ["Mall culture", "Desert safaris", "Luxury shopping", "Museums"],
    "sports_facilities": ["Golf", "Tennis", "Football", "Water sports", "Skiing (indoor)"],
    "beach_access": "Excellent (private and public)",
    "nature_access": ["Desert", "Hatta Mountains", "Jebel Jais"],
    "pet_friendly": 6.0,
    "child_friendly": 8.5
  }'::jsonb,

  infrastructure = '{
    "internet": {
      "avg_speed_mbps": 200,
      "fiber_coverage_percent": 95,
      "5g_available": true,
      "starlink_available": false,
      "cost_monthly_eur": 80,
      "reliability_rating": 9.5,
      "vpn_note": "VPNs restricted, some services blocked"
    },
    "transport": {
      "public_transport_rating": 7.5,
      "car_essential": true,
      "uber_available": true,
      "taxi_app": "Careem, RTA Taxi",
      "airport_international": ["Dubai (DXB)", "Al Maktoum (DWC)"],
      "flight_time_london_hours": 7,
      "flight_time_dubai_hours": 0,
      "rental_car_cost_day_eur": 30
    },
    "coworking_spaces": [
      {"name": "DIFC Innovation Hub", "city": "Dubai", "cost_month_eur": 800},
      {"name": "WeWork", "city": "Dubai", "cost_month_eur": 600},
      {"name": "Nasab", "city": "Dubai", "cost_month_eur": 400}
    ],
    "power_reliability": 10.0,
    "water_quality_tap": "Desalinated, safe but filtered preferred",
    "postal_service_rating": 8.0
  }'::jsonb,

  dining_nightlife = '{
    "michelin_stars_total": 14,
    "cuisine_types": ["Middle Eastern", "Indian", "International", "Fine Dining"],
    "signature_dishes": ["Shawarma", "Mezze", "Machboos", "Luqaimat"],
    "avg_meal_cost_casual_eur": 15,
    "avg_meal_cost_fine_eur": 150,
    "coffee_culture": "Arabic coffee tradition + modern cafes",
    "avg_coffee_eur": 5,
    "nightlife_rating": 8.0,
    "nightlife_areas": ["Dubai Marina", "JBR", "Business Bay"],
    "best_restaurants": [
      {"name": "Il Ristorante Niko Romito", "city": "Dubai", "cuisine": "Italian", "price": "€€€€", "michelin": 2},
      {"name": "Tresind Studio", "city": "Dubai", "cuisine": "Indian", "price": "€€€€", "michelin": 2},
      {"name": "Nobu", "city": "Dubai", "cuisine": "Japanese", "price": "€€€€"},
      {"name": "Pierchic", "city": "Dubai", "cuisine": "Seafood", "price": "€€€€"},
      {"name": "Al Nafoorah", "city": "Dubai", "cuisine": "Lebanese", "price": "€€€"}
    ],
    "wine_culture": {
      "local_wines": false,
      "note": "Alcohol available in licensed venues",
      "winery_tours": false
    },
    "grocery_quality": 9.0,
    "international_products": "Excellent - everything available"
  }'::jsonb,

  capital_overview = '{
    "name": "Dubai City",
    "note": "Abu Dhabi is UAE capital, Dubai is largest city",
    "population": 3500000,
    "area_km2": 4114,
    "districts": {
      "downtown": {"description": "Burj Khalifa, Dubai Mall", "vibe": "Iconic, tourist, expensive"},
      "marina": {"description": "Waterfront living", "vibe": "Expat hub, modern"},
      "jlt": {"description": "Jumeirah Lakes Towers", "vibe": "Affordable expat area"},
      "difc": {"description": "Financial center", "vibe": "Business, banking"},
      "palm_jumeirah": {"description": "Luxury island", "vibe": "Ultra-wealthy"}
    },
    "landmarks": ["Burj Khalifa", "Palm Jumeirah", "Burj Al Arab", "Dubai Frame"],
    "universities": 15,
    "embassies": true,
    "climate_note": "Indoor lifestyle in summer",
    "beach_distance_km": 5,
    "business_center": true
  }'::jsonb,

  quality_of_life = '{
    "overall_score": 7.8,
    "cost_of_living_index": 72.5,
    "purchasing_power_index": 98.5,
    "safety_index": 84.5,
    "healthcare_index": 72.3,
    "pollution_index": 52.1,
    "traffic_commute_index": 48.2,
    "climate_index": 65.2,
    "expat_friendly_index": 9.0,
    "happiness_rank": 21,
    "ease_of_doing_business_rank": 16,
    "english_proficiency_rank": 3,
    "air_quality": "Moderate (dust, construction)",
    "noise_pollution": "Moderate",
    "green_spaces": "Limited but improving"
  }'::jsonb,

  currency_info = '{
    "code": "AED",
    "name": "UAE Dirham",
    "symbol": "د.إ",
    "exchange_rate_usd": 3.67,
    "exchange_rate_gbp": 4.67,
    "exchange_rate_eur": 4.0,
    "pegged_to": "USD",
    "atm_availability": "Widespread",
    "credit_cards_accepted": "Widely",
    "contactless_common": true,
    "cash_preferred": false,
    "banking": {
      "major_banks": ["Emirates NBD", "FAB", "ADCB", "DIB"],
      "opening_account_difficulty": "Easy with Emirates ID",
      "international_transfers": "Easy and fast",
      "crypto_friendly": "Regulated, VARA licensing"
    },
    "tipping_culture": "10-15% common in restaurants"
  }'::jsonb,

  digital_nomad_info = '{
    "visa_available": true,
    "visa_name": "Virtual Working Visa / Digital Nomad Visa",
    "min_income_monthly_eur": 5000,
    "duration_months": 12,
    "renewable": true,
    "max_stay_years": 5,
    "tax_status": "0% personal income tax",
    "coworking_scene": "Excellent",
    "nomad_community_size": "Large (20,000+)",
    "popular_areas": ["Dubai Marina", "JLT", "Business Bay"],
    "meetups": ["Dubai Tech Meetups", "Remote Dubai"],
    "internet_reliability": 9.5,
    "cafe_work_friendly": true,
    "time_zone": "UTC+4 (GST)",
    "timezone_overlap": {
      "london": -4,
      "new_york": -9,
      "san_francisco": -12,
      "dubai": 0
    }
  }'::jsonb,

  comparison_highlights = '{
    "similar_to": ["Singapore", "Monaco"],
    "vs_singapore": {
      "pros": ["Lower overall costs", "Easier visa", "More space", "Closer to Europe"],
      "cons": ["Less developed transit", "Hotter", "Less multicultural"],
      "tax_comparison": "Both 0% income tax, Dubai simpler"
    },
    "vs_cyprus": {
      "pros": ["0% income tax", "Higher salaries", "World-class infrastructure"],
      "cons": ["Not EU", "Extreme heat", "Cultural differences"],
      "tax_comparison": "Dubai wins on income tax"
    },
    "unique_selling_points": [
      "0% personal income tax",
      "Golden Visa 10-year residency",
      "World-class infrastructure",
      "85% expat population",
      "Hub between Europe, Asia, Africa"
    ]
  }'::jsonb,

  images = '{
    "hero": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600",
    "capital": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
    "lifestyle": "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800",
    "beach": "https://images.unsplash.com/photo-1559563458-527698bf5295?w=800",
    "food": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
    "nature": "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800",
    "city": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    "flag_large": "https://flagcdn.com/w640/ae.png",
    "gradient": "from-green-500 to-red-500"
  }'::jsonb
WHERE slug = 'dubai';

-- ============================================
-- THAILAND - Full comprehensive data
-- ============================================
UPDATE destinations SET
  climate_data = '{
    "type": "Tropical",
    "annual_sunshine_hours": 2500,
    "annual_rainfall_mm": 1500,
    "seasons": {
      "hot": {"months": ["Mar", "Apr", "May"], "temp_avg_c": 35, "temp_min_c": 26, "description": "Very hot and humid"},
      "rainy": {"months": ["Jun", "Jul", "Aug", "Sep", "Oct"], "temp_avg_c": 32, "temp_min_c": 25, "description": "Monsoon, daily rain"},
      "cool": {"months": ["Nov", "Dec", "Jan", "Feb"], "temp_avg_c": 30, "temp_min_c": 20, "description": "Most pleasant"}
    },
    "best_months": ["Nov", "Dec", "Jan", "Feb"],
    "humidity_avg_percent": 75,
    "uv_index_summer": 11,
    "sea_temp_summer_c": 30,
    "snow_possible": false,
    "climate_rating": 7.5
  }'::jsonb,

  crime_safety = '{
    "global_peace_index_rank": 92,
    "safety_index": 65.2,
    "crime_index": 44.8,
    "violent_crime_rate": "Low for tourists",
    "property_crime_rate": "Moderate",
    "common_concerns": ["Scams", "Bag snatching", "Drink spiking in bars"],
    "safe_areas": ["Sukhumvit", "Silom", "Chiang Mai old city"],
    "areas_to_avoid_at_night": ["Patpong", "Nana late night alone"],
    "police_response_rating": 5.5,
    "expat_safety_rating": 7.5,
    "women_safety_rating": 7.0,
    "lgbtq_safety": {
      "legal_status": "Legal",
      "social_acceptance": "High, very tolerant",
      "pride_events": true,
      "rating": 8.5
    },
    "emergency_number": "191",
    "tourist_police": "1155"
  }'::jsonb,

  healthcare = '{
    "system_type": "Mixed public/private",
    "universal_coverage": false,
    "quality_rating": 8.0,
    "hospital_beds_per_1000": 2.1,
    "doctors_per_1000": 0.8,
    "wait_times_rating": 8.0,
    "private_healthcare": {
      "availability": "World-class",
      "cost_consultation_eur": 30,
      "cost_annual_insurance_eur": 800,
      "medical_tourism": "Global destination for procedures"
    },
    "top_hospitals": [
      {"name": "Bumrungrad International", "city": "Bangkok", "type": "private"},
      {"name": "Bangkok Hospital", "city": "Bangkok", "type": "private"},
      {"name": "Samitivej", "city": "Bangkok", "type": "private"},
      {"name": "Chiang Mai Ram", "city": "Chiang Mai", "type": "private"}
    ],
    "vaccination_required": "Recommended: Hep A, Typhoid",
    "pharmacies_accessible": true,
    "english_speaking_doctors": "Standard in private hospitals"
  }'::jsonb,

  lifestyle = '{
    "work_life_balance_rating": 8.5,
    "avg_working_hours_week": 44,
    "annual_leave_days_min": 6,
    "public_holidays": 16,
    "siesta_culture": false,
    "family_oriented": true,
    "expat_community_size": "Very Large (200,000+)",
    "english_proficiency": "Low-Moderate",
    "social_life_rating": 9.0,
    "dating_scene_rating": 8.0,
    "networking_opportunities": "Good in Bangkok",
    "cultural_activities": ["Temples", "Markets", "Festivals", "Thai cooking"],
    "sports_facilities": ["Muay Thai", "Golf", "Diving", "Yoga"],
    "beach_access": "World-famous beaches",
    "nature_access": ["Northern mountains", "National parks", "Islands"],
    "pet_friendly": 6.5,
    "child_friendly": 8.0
  }'::jsonb,

  infrastructure = '{
    "internet": {
      "avg_speed_mbps": 200,
      "fiber_coverage_percent": 70,
      "5g_available": true,
      "starlink_available": true,
      "cost_monthly_eur": 20,
      "reliability_rating": 8.0
    },
    "transport": {
      "public_transport_rating": 7.5,
      "car_essential": false,
      "uber_available": false,
      "taxi_app": "Grab, Bolt",
      "airport_international": ["Bangkok Suvarnabhumi (BKK)", "Phuket (HKT)", "Chiang Mai (CNX)"],
      "flight_time_london_hours": 11,
      "flight_time_dubai_hours": 6,
      "rental_car_cost_day_eur": 15
    },
    "coworking_spaces": [
      {"name": "The Hive", "city": "Bangkok", "cost_month_eur": 150},
      {"name": "CAMP", "city": "Chiang Mai", "cost_month_eur": 100},
      {"name": "Punspace", "city": "Chiang Mai", "cost_month_eur": 80}
    ],
    "power_reliability": 8.5,
    "water_quality_tap": "Not drinkable, bottled water standard",
    "postal_service_rating": 7.0
  }'::jsonb,

  dining_nightlife = '{
    "michelin_stars_total": 36,
    "cuisine_types": ["Thai", "Street food", "Isaan", "International"],
    "signature_dishes": ["Pad Thai", "Tom Yum", "Green Curry", "Som Tam", "Mango Sticky Rice"],
    "avg_meal_cost_casual_eur": 3,
    "avg_meal_cost_fine_eur": 50,
    "coffee_culture": "Growing, specialty coffee scene",
    "avg_coffee_eur": 2.5,
    "nightlife_rating": 9.5,
    "nightlife_areas": ["Bangkok Sukhumvit", "Pattaya", "Phuket Patong"],
    "best_restaurants": [
      {"name": "Gaggan Anand", "city": "Bangkok", "cuisine": "Progressive Indian", "price": "€€€€", "michelin": 2},
      {"name": "Le Du", "city": "Bangkok", "cuisine": "Modern Thai", "price": "€€€€", "michelin": 2},
      {"name": "Jay Fai", "city": "Bangkok", "cuisine": "Street Food", "price": "€€€", "michelin": 1},
      {"name": "Nahm", "city": "Bangkok", "cuisine": "Thai", "price": "€€€€", "michelin": 1},
      {"name": "Sorn", "city": "Bangkok", "cuisine": "Southern Thai", "price": "€€€€", "michelin": 2}
    ],
    "wine_culture": {
      "local_wines": false,
      "note": "Imported wines expensive due to taxes"
    },
    "grocery_quality": 7.5,
    "international_products": "Available in major cities"
  }'::jsonb,

  capital_overview = '{
    "name": "Bangkok",
    "population": 10700000,
    "area_km2": 1568,
    "districts": {
      "sukhumvit": {"description": "Expat hub, dining, nightlife", "vibe": "Modern, international"},
      "silom": {"description": "Business district", "vibe": "Corporate, gay scene"},
      "old_city": {"description": "Temples, Grand Palace", "vibe": "Historic, touristic"},
      "thonglor": {"description": "Trendy neighborhood", "vibe": "Hip, upscale"},
      "sathorn": {"description": "Embassies, luxury", "vibe": "Affluent, quiet"}
    },
    "landmarks": ["Grand Palace", "Wat Arun", "Chatuchak Market", "Khao San Road"],
    "universities": 20,
    "embassies": true,
    "climate_note": "Hot year-round, rainy season June-Oct",
    "beach_distance_km": 150,
    "business_center": true
  }'::jsonb,

  quality_of_life = '{
    "overall_score": 7.2,
    "cost_of_living_index": 38.5,
    "purchasing_power_index": 42.1,
    "safety_index": 65.2,
    "healthcare_index": 75.8,
    "pollution_index": 62.3,
    "traffic_commute_index": 45.2,
    "climate_index": 72.5,
    "expat_friendly_index": 8.5,
    "happiness_rank": 58,
    "ease_of_doing_business_rank": 21,
    "english_proficiency_rank": 64,
    "air_quality": "Poor in Bangkok, better elsewhere",
    "noise_pollution": "High in cities",
    "green_spaces": "Limited in urban areas"
  }'::jsonb,

  currency_info = '{
    "code": "THB",
    "name": "Thai Baht",
    "symbol": "฿",
    "exchange_rate_usd": 35.5,
    "exchange_rate_gbp": 45.2,
    "exchange_rate_eur": 38.7,
    "atm_availability": "Widespread (220 THB fee)",
    "credit_cards_accepted": "Widely in cities",
    "contactless_common": true,
    "cash_preferred": true,
    "banking": {
      "major_banks": ["Bangkok Bank", "Kasikorn", "SCB", "Krungthai"],
      "opening_account_difficulty": "Moderate, need work permit or long-term visa",
      "international_transfers": "Wise, Bangkok Bank",
      "crypto_friendly": "Regulated exchanges"
    },
    "tipping_culture": "Not expected but appreciated"
  }'::jsonb,

  digital_nomad_info = '{
    "visa_available": true,
    "visa_name": "Long-Term Resident Visa (LTR) / Digital Nomad provisions",
    "min_income_monthly_eur": 2200,
    "duration_months": 60,
    "renewable": true,
    "max_stay_years": 10,
    "tax_status": "17% flat rate for remitted income",
    "coworking_scene": "Excellent, especially Chiang Mai",
    "nomad_community_size": "Very Large (50,000+)",
    "popular_areas": ["Chiang Mai", "Bangkok", "Phuket", "Koh Phangan"],
    "meetups": ["Chiang Mai Digital Nomads", "Bangkok Entrepreneurs"],
    "internet_reliability": 8.0,
    "cafe_work_friendly": true,
    "time_zone": "UTC+7 (ICT)",
    "timezone_overlap": {
      "london": -7,
      "new_york": -12,
      "san_francisco": -15,
      "dubai": -3
    }
  }'::jsonb,

  comparison_highlights = '{
    "similar_to": ["Bali", "Vietnam"],
    "vs_bali": {
      "pros": ["Better infrastructure", "More variety", "Better healthcare", "Larger cities"],
      "cons": ["More expensive", "More chaotic traffic", "Less spiritual vibe"],
      "tax_comparison": "Similar, both have nomad provisions"
    },
    "vs_portugal": {
      "pros": ["Much cheaper", "Better food value", "More exotic", "Better weather"],
      "cons": ["Further from Europe", "Less EU benefits", "Language barrier"],
      "tax_comparison": "Thailand cheaper overall"
    },
    "unique_selling_points": [
      "World capital of digital nomads",
      "Exceptional value for money",
      "World-class street food",
      "Medical tourism hub",
      "36 Michelin star restaurants"
    ]
  }'::jsonb,

  images = '{
    "hero": "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1600",
    "capital": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800",
    "lifestyle": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800",
    "beach": "https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=800",
    "food": "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800",
    "nature": "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800",
    "city": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800",
    "flag_large": "https://flagcdn.com/w640/th.png",
    "gradient": "from-red-500 to-blue-500"
  }'::jsonb
WHERE slug = 'thailand';

-- ============================================
-- Set defaults for remaining destinations with basic data
-- This ensures all destinations have some data
-- ============================================
UPDATE destinations SET
  climate_data = COALESCE(climate_data, '{}'::jsonb),
  crime_safety = COALESCE(crime_safety, '{}'::jsonb),
  healthcare = COALESCE(healthcare, '{}'::jsonb),
  lifestyle = COALESCE(lifestyle, '{}'::jsonb),
  infrastructure = COALESCE(infrastructure, '{}'::jsonb),
  dining_nightlife = COALESCE(dining_nightlife, '{}'::jsonb),
  capital_overview = COALESCE(capital_overview, '{}'::jsonb),
  quality_of_life = COALESCE(quality_of_life, '{}'::jsonb),
  currency_info = COALESCE(currency_info, '{}'::jsonb),
  digital_nomad_info = COALESCE(digital_nomad_info, '{}'::jsonb),
  comparison_highlights = COALESCE(comparison_highlights, '{}'::jsonb),
  images = COALESCE(images, '{}'::jsonb)
WHERE enabled = true;

-- Verify migration
SELECT slug, country_name,
       climate_data != '{}'::jsonb as has_climate,
       crime_safety != '{}'::jsonb as has_crime,
       healthcare != '{}'::jsonb as has_healthcare,
       lifestyle != '{}'::jsonb as has_lifestyle,
       infrastructure != '{}'::jsonb as has_infrastructure,
       dining_nightlife != '{}'::jsonb as has_dining,
       capital_overview != '{}'::jsonb as has_capital,
       quality_of_life != '{}'::jsonb as has_qol
FROM destinations
WHERE enabled = true
ORDER BY country_name;
