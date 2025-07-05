# CO2 Emissions Grid for Personal Carbon Calculator

## Transport Emissions (kg CO2e per km)

| Mode | Low Estimate | High Estimate | Average | Notes |
|------|-------------|---------------|---------|--------|
| **Walking** | 0.003 | 0.008 | 0.005 | Food energy only |
| **Cycling** | 0.015 | 0.025 | 0.021 | Food energy + bike manufacturing |
| **E-scooter** | 0.045 | 0.085 | 0.065 | Varies by electricity grid |
| **Bus (urban)** | 0.080 | 0.110 | 0.095 | Per passenger-km |
| **Bus (intercity)** | 0.025 | 0.040 | 0.033 | Higher occupancy |
| **Subway/Metro** | 0.030 | 0.065 | 0.045 | Varies by grid & efficiency |
| **Train (electric)** | 0.027 | 0.049 | 0.035 | Clean grids perform best |
| **Train (diesel)** | 0.085 | 0.095 | 0.090 | Similar to buses |
| **Motorcycle** | 0.110 | 0.240 | 0.175 | Poor emission controls |
| **Small car (gasoline)** | 0.105 | 0.130 | 0.117 | <1.4L engine |
| **Medium car (gasoline)** | 0.130 | 0.160 | 0.145 | 1.4-2.0L engine |
| **Large car (gasoline)** | 0.170 | 0.210 | 0.192 | >2.0L engine |
| **Hybrid car** | 0.073 | 0.103 | 0.088 | 30-40% efficiency gain |
| **Electric car (clean grid)** | 0.007 | 0.025 | 0.015 | Sweden, Norway, France |
| **Electric car (mixed grid)** | 0.045 | 0.080 | 0.065 | Germany, UK, US avg |
| **Electric car (dirty grid)** | 0.100 | 0.150 | 0.125 | Poland, India, China |
| **Domestic flight** | 0.140 | 0.170 | 0.153 | With radiative forcing |
| **Short-haul intl flight** | 0.170 | 0.220 | 0.195 | <1500km |
| **Long-haul flight (economy)** | 0.080 | 0.120 | 0.100 | >1500km, per km |
| **Business class flight** | 0.160 | 0.240 | 0.200 | 2x economy space |
| **First class flight** | 0.400 | 0.650 | 0.525 | 4x economy space |

## Food Emissions (kg CO2e per kg food)

| Food Category | Low Estimate | High Estimate | Average | Notes |
|---------------|-------------|---------------|---------|--------|
| **Beef** | 50 | 100 | 60 | Highest impact protein |
| **Lamb** | 20 | 35 | 24 | High methane emissions |
| **Cheese (hard)** | 18 | 25 | 21 | Intensive dairy processing |
| **Farmed shrimp/prawns** | 15 | 25 | 18 | Energy-intensive aquaculture |
| **Farmed tuna** | 15 | 20 | 18 | Feed-intensive, transport |
| **Pork** | 5 | 8 | 6.5 | Mid-range meat option |
| **Chicken** | 5 | 7 | 6 | Most efficient meat |
| **Farmed salmon** | 1.5 | 3.5 | 2.5 | Feed type dependent |
| **Eggs** | 3.5 | 5 | 4.2 | Includes feed impacts |
| **Rice** | 3.5 | 4.5 | 4 | Methane from paddies |
| **Wild salmon** | 2.5 | 4 | 3.4 | Fuel for fishing |
| **Milk** | 2.8 | 3.5 | 3.2 | Dairy industry average |
| **Fish (small/sardines)** | 0.8 | 2 | 1.4 | Efficient fishing |
| **Turkey** | 3 | 4 | 3.5 | Similar to chicken |
| **Tuna (canned)** | 2.5 | 4 | 3 | Processing + fishing |
| **Fish (white/cod)** | 2 | 4 | 3 | Mid-range seafood |
| **Shellfish (mussels)** | 0.5 | 1.5 | 1 | Filter feeders |
| **Legumes/beans** | 1 | 2.5 | 1.5 | Nitrogen fixation |
| **Wheat bread** | 1.2 | 1.8 | 1.4 | Processing included |
| **Pasta** | 1 | 1.5 | 1.2 | Wheat + processing |
| **Nuts** | 0.8 | 2.5 | 1.5 | Tree crops, processing |
| **Vegetables (root)** | 0.3 | 0.8 | 0.4 | Potatoes, carrots |
| **Vegetables (leafy)** | 0.5 | 1.5 | 1 | Lettuce, spinach |
| **Tomatoes** | 1.5 | 3 | 2.1 | Greenhouse production |
| **Bananas** | 0.5 | 0.9 | 0.7 | Transport included |
| **Apples** | 0.3 | 0.6 | 0.4 | Storage, transport |
| **Citrus fruits** | 0.3 | 0.7 | 0.5 | Regional variation |
| **Berries** | 0.8 | 2 | 1.1 | Seasonal, transport |

## Regional Electricity Grid Factors (kg CO2e per kWh)

| Region/Country | 2024 Factor | Notes |
|----------------|-------------|--------|
| **Iceland** | 0.000 | 100% renewable (hydro/geothermal) |
| **Norway** | 0.020 | 95% hydroelectric |
| **Sweden** | 0.041 | Nuclear + hydro |
| **France** | 0.079 | Nuclear dominant |
| **Denmark** | 0.115 | High wind penetration |
| **UK** | 0.193 | Mixed, declining coal |
| **EU Average** | 0.275 | Improving rapidly |
| **California** | 0.290 | Renewable mandates |
| **US Average** | 0.386 | Natural gas transition |
| **Germany** | 0.420 | Coal + renewables |
| **Japan** | 0.462 | Post-nuclear mix |
| **Russia** | 0.322 | Gas + some renewables |
| **China** | 0.554 | Coal dominant, improving |
| **India** | 0.632 | Coal heavy |
| **Poland** | 0.662 | Coal dominant |
| **South Africa** | 0.928 | Coal dependent |

## Housing Energy (kg CO2e per unit)

| Energy Source | Unit | Emission Factor | Notes |
|---------------|------|----------------|--------|
| **Electricity** | per kWh | See grid factors above | Major variation by region |
| **Natural gas** | per cubic foot | 0.055 | Direct combustion |
| **Natural gas** | per kWh thermal | 0.200 | Heating equivalent |
| **Heating oil** | per gallon | 10.29 | Direct combustion |
| **Propane/LPG** | per gallon | 5.62 | Direct combustion |
| **Wood (sustainable)** | per kg | 0.02 | Near carbon neutral |
| **Wood (non-sustainable)** | per kg | 1.8 | Net emissions |
| **District heating (gas)** | per kWh | 0.3 | Efficiency gains |
| **District heating (renewable)** | per kWh | 0.1 | Low emissions |

## Housing Size Multipliers (daily kWh consumption)

| Home Type | Small | Medium | Large | Notes |
|-----------|--------|---------|--------|--------|
| **Apartment** | 15-25 | 25-35 | 35-50 | Shared walls, efficiency |
| **Townhouse** | 25-35 | 35-50 | 50-70 | Moderate efficiency |
| **Detached house** | 35-50 | 50-75 | 75-120 | Highest consumption |

## Digital Activities (kg CO2e per unit)

| Activity | Low | High | Average | Unit |
|----------|-----|------|---------|------|
| **HD video streaming** | 0.025 | 0.050 | 0.036 | per hour |
| **4K video streaming** | 0.050 | 0.100 | 0.075 | per hour |
| **Video calls** | 0.010 | 0.025 | 0.015 | per hour |
| **Social media** | 0.002 | 0.004 | 0.003 | per minute |
| **Web browsing** | 0.003 | 0.008 | 0.005 | per hour |
| **Email (text only)** | 0.0003 | 0.0005 | 0.0004 | per email |
| **Email (attachments)** | 0.01 | 0.05 | 0.03 | per email |
| **Cloud storage** | 0.005 | 0.015 | 0.01 | per GB/month |
| **Online gaming** | 0.015 | 0.040 | 0.025 | per hour |

## Device Manufacturing (kg CO2e lifetime)

| Device | Low | High | Average | Lifetime |
|--------|-----|------|---------|----------|
| **Smartphone** | 55 | 95 | 75 | 2-3 years |
| **Laptop** | 200 | 400 | 300 | 4-5 years |
| **Desktop computer** | 300 | 500 | 400 | 5-6 years |
| **Tablet** | 100 | 150 | 125 | 4-5 years |
| **TV (55")** | 400 | 600 | 500 | 8-10 years |

## Consumption Items (kg CO2e per item)

| Item | Low | High | Average | Notes |
|------|-----|------|---------|--------|
| **Jeans (fast fashion)** | 20 | 35 | 30 | Short lifetime |
| **Jeans (durable)** | 25 | 40 | 35 | Long lifetime, lower per-wear |
| **T-shirt (cotton)** | 2 | 3.5 | 2.8 | Natural fiber |
| **T-shirt (polyester)** | 4 | 7 | 5.5 | Synthetic fiber |
| **Sneakers** | 8 | 15 | 12 | Materials + manufacturing |
| **Book (new)** | 1.5 | 3 | 2.5 | Paper + printing |
| **Plastic bottle (single-use)** | 0.05 | 0.12 | 0.083 | PET production |
| **Coffee cup (disposable)** | 0.01 | 0.025 | 0.015 | Paper + plastic |
| **Plastic bag** | 0.003 | 0.008 | 0.005 | Lightweight plastic |

## Water Usage (kg CO2e per unit)

| Use | Cold Water | Hot Water (Gas) | Hot Water (Electric) | Unit |
|-----|------------|----------------|---------------------|------|
| **Shower** | 0.001 | 0.115 | 0.2-0.5* | per minute |
| **Bath** | 0.005 | 1.4 | 2.5-6* | per bath |
| **Dishwasher** | 0.01 | 0.8 | 1.5-3.5* | per load |
| **Washing machine** | 0.02 | 0.6 | 1.2-2.8* | per load |

*Varies by electricity grid carbon intensity

## Waste (kg CO2e per kg waste)

| Waste Type | Landfill | Recycling | Composting | Incineration |
|------------|----------|-----------|------------|--------------|
| **Mixed municipal** | 0.781 | 0.150 | 0.050 | 0.200 |
| **Paper** | 0.900 | -0.200 | 0.030 | 0.100 |
| **Plastic** | 1.200 | -0.300 | N/A | 0.800 |
| **Organic/food** | 1.500 | N/A | 0.020 | 0.100 |
| **Glass** | 0.020 | -0.100 | N/A | 0.010 |
| **Metals** | 0.050 | -2.000 | N/A | 0.020 |

## Sample Calculator Questions by Category

### Transportation
- "How many km do you drive per week?"
- "What type of car do you drive?"
- "How often do you take public transport?"
- "How many flights do you take per year?"
- "What class do you usually fly?"

### Food
- "How many times per week do you eat red meat?"
- "Are you vegetarian, vegan, or omnivore?"
- "How often do you eat fish/seafood?"
- "Do you buy local or imported food mostly?"
- "How much food do you waste per week?"

### Housing
- "What type of home do you live in?"
- "How do you heat your home?"
- "What's your average monthly electricity bill?"
- "Do you have renewable energy at home?"

### Digital
- "How many hours of streaming video per day?"
- "How often do you replace electronic devices?"
- "How many hours online per day?"

### Consumption
- "How many new clothing items per month?"
- "Do you buy fast fashion or durable clothes?"
- "How much single-use plastic do you use?"
- "Do you recycle regularly?"

## Key Implementation Notes

1. **Regional Adjustment**: Always multiply electricity-dependent activities by local grid factor
2. **Seasonal Variation**: Heating/cooling needs vary significantly by climate and season
3. **Behavioral Patterns**: Food waste, device lifetime, and consumption habits greatly affect totals
4. **Efficiency Factors**: Home size, age, and efficiency ratings create large variations
5. **Transportation Mix**: Most people use multiple transport modes - calculate weighted average

## High-Impact Reduction Opportunities
- **Remote work**: Can save 2.5-4.4 tons CO2e annually
- **Plant-based diet**: Saves 1.5-2 tons CO2e annually  
- **Heat pump installation**: Saves 2.5-4.4 tons CO2e annually
- **Eliminating one transatlantic flight**: Saves 1-3 tons CO2e
- **Car-free lifestyle in city**: Saves 1-3 tons CO2e annually