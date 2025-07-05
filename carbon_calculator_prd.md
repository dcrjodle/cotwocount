# Personal Carbon Footprint Calculator
## Product Requirements Document (PRD)

---

**Version:** 1.0  
**Date:** January 2025  
**Product Manager:** [TBD]  
**Engineering Lead:** [TBD]  
**Design Lead:** [TBD]

---

## 1. Executive Summary

### 1.1 Product Vision
Create an accurate, engaging, and scientifically-grounded personal carbon footprint calculator that empowers individuals to understand and reduce their climate impact through data-driven insights and interactive behavior modeling.

### 1.2 Product Mission
To bridge the gap between climate science and personal action by providing users with precise, location-specific carbon footprint calculations and intuitive tools for exploring emission reduction pathways.

### 1.3 Key Success Metrics
- **Accuracy**: ±25% uncertainty range (industry-leading)
- **Engagement**: >80% completion rate for core assessment
- **Action**: >60% of users interact with reduction scenarios
- **Sharing**: >30% share results on social media
- **Retention**: >40% return for follow-up assessments

---

## 2. Market Context & User Research

### 2.1 Target Users

**Primary Users:**
- **Climate-conscious consumers** (ages 25-45)
- **Sustainability professionals** seeking personal benchmarking
- **Educators and students** using for learning/research

**Secondary Users:**
- **Corporate wellness programs** for employee engagement
- **Environmental organizations** for campaign support
- **Researchers** needing standardized personal footprint data

### 2.2 User Pain Points
- Existing calculators lack scientific rigor (±50-100% uncertainty)
- Results don't account for regional differences
- No clear guidance on highest-impact reduction actions
- Static results provide no exploration capability
- Sharing options are basic and unappealing

### 2.3 Competitive Landscape
- **Carbon Trust Calculator**: Basic, limited regional data
- **EPA Carbon Calculator**: US-focused, outdated factors
- **Cool Effect Calculator**: Simple but inaccurate
- **Our Advantage**: Scientific accuracy + interactive exploration + beautiful UX

---

## 3. Product Overview

### 3.1 Core Value Proposition
"The world's most accurate personal carbon calculator with interactive scenario modeling - discover your climate impact and visualize your path to carbon compatibility."

### 3.2 Key Differentiators
1. **Scientific Accuracy**: Hybrid LCA methodology with uncertainty quantification
2. **Regional Precision**: Location-specific emission factors for 100+ countries
3. **Interactive Exploration**: Real-time behavior impact modeling
4. **Beautiful Design**: Consumer-grade UX with data visualization
5. **Social Integration**: Shareable, engaging results format

---

## 4. Functional Requirements

### 4.1 Core User Journey

```
Location Selection → Core Assessment → Optional Modules → 
Results & Scale → Interactive Exploration → Social Sharing
```

### 4.2 Feature Specifications

#### 4.2.1 Location Selection
**Requirement:** Users must select their geographic location for accurate emission factors

**Specifications:**
- Auto-detect location via IP geolocation (with permission)
- Country/region dropdown with search functionality
- Display relevant electricity grid carbon intensity
- Show local context (e.g., "Sweden has one of the world's cleanest electricity grids")

**Data Requirements:**
- 100+ countries with electricity grid factors
- Regional transport emission factors
- Local food production data where available

#### 4.2.2 Core Assessment (Mandatory)

**Food Consumption Module**
- **Question Types:**
  - Diet pattern selector (omnivore/vegetarian/vegan/pescatarian)
  - Red meat frequency (servings per week)
  - Dairy consumption level (low/medium/high)
  - Local vs imported food preference
  - Food waste estimation
- **Time Estimate:** 2-3 minutes
- **Emission Factors:** Based on scientific review (beef: 60 kg CO2e/kg, etc.)

**Transportation Module**
- **Question Types:**
  - Primary transport mode for commuting
  - Vehicle type and efficiency (if applicable)
  - Weekly driving distance
  - Public transport usage frequency
  - Flight frequency (domestic/international)
  - Active transport usage (walking/cycling)
- **Time Estimate:** 2-3 minutes
- **Emission Factors:** Regional-specific, real-world adjusted (+20-40%)

**Energy Consumption Module**
- **Question Types:**
  - Housing type (apartment/house/size)
  - Heating source (gas/electric/oil/heat pump)
  - Electricity provider (renewable options)
  - Energy efficiency measures
  - Regional climate zone (auto-detected)
- **Time Estimate:** 2-3 minutes
- **Emission Factors:** Location-specific grid intensity (50-783 g CO2/kWh)

#### 4.2.3 Optional Assessment Modules

**Digital Activities Module**
- Device ownership and replacement frequency
- Streaming and gaming habits
- Cloud storage usage
- Video calling frequency
- **Emission Factors:** Manufacturing-heavy (70-85% of lifecycle)

**Water Usage Module**
- Shower duration and frequency
- Laundry and dishwashing patterns
- Water heating source
- **Emission Factors:** Based on heating method and grid intensity

**Waste Management Module**
- Waste generation estimation
- Recycling behaviors
- Composting practices
- Single-use item consumption
- **Emission Factors:** Landfill vs recycling vs composting

#### 4.2.4 Results Presentation

**CO2 Score Display**
- **Primary Metric:** Annual tCO2e with confidence interval
- **Visual Design:** Large, prominent number with units clearly labeled
- **Context:** Comparison to regional and global averages
- **Breakdown:** Category-wise contribution (transport: X%, food: Y%, etc.)

**Climate Scale Visualization**
- **Scale Design:** Horizontal scale showing compatibility with climate targets
  - 🔴 High Impact (>8 tCO2e): "Well above 1.5°C target"
  - 🟡 Medium Impact (4-8 tCO2e): "Above sustainable level"
  - 🟢 Low Impact (2-4 tCO2e): "Approaching 1.5°C target"
  - 🌟 Excellent (<2 tCO2e): "1.5°C compatible"
- **User Position:** Clear indicator of user's current position
- **Target Lines:** 2030 target (2.9 tCO2e) and 2050 target (1.4 tCO2e)

#### 4.2.5 Interactive Exploration Feature

**Drag-to-Reduce Interface**
- **Highest Impact Factors:** Display top 3-5 contributors to user's footprint
- **Slider/Drag Controls:** 
  - "Red meat servings per week" (current: 4 → drag to: 2)
  - "Driving distance per week" (current: 200km → drag to: 100km)
  - "Flights per year" (current: 4 → drag to: 2)
- **Real-time Updates:** CO2 score updates immediately as user drags
- **Visual Feedback:** Progress bar showing movement toward targets
- **Savings Display:** "Reducing red meat to 2x/week saves 0.8 tCO2e annually"

**Scenario Comparison**
- **Side-by-side View:** Current vs Modified scenario
- **Percentage Reduction:** Clear display of % change
- **Target Achievement:** Progress toward 1.5°C compatibility
- **Action Difficulty:** Indicate effort level (Easy/Medium/Hard)

#### 4.2.6 Social Sharing

**Shareable Results Card**
- **Visual Design:** Instagram-story optimized (1080x1920px)
- **Content Elements:**
  - User's CO2 score with context
  - Position on climate scale
  - Top reduction opportunity
  - Call-to-action to try calculator
- **Customization:** User can add personal message
- **Platforms:** Instagram, Twitter, LinkedIn, Facebook, WhatsApp
- **Analytics:** Track sharing rates and click-throughs

---

## 5. Technical Requirements

### 5.1 Frontend Architecture

**Technology Stack:**
- **Framework:** React 18+ with TypeScript
- **State Management:** Zustand or Redux Toolkit
- **Styling:** Tailwind CSS with custom design system
- **Charts/Visualization:** D3.js or Recharts
- **Animation:** Framer Motion for interactions
- **Build Tool:** Vite for fast development

**Performance Requirements:**
- **Load Time:** <2 seconds initial load
- **Interaction Responsiveness:** <100ms for drag operations
- **Mobile Optimization:** Responsive design, touch-friendly
- **Browser Support:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### 5.2 Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with Express or Fastify
- **Database:** PostgreSQL for emission factors, Redis for caching
- **API:** RESTful API with JSON responses
- **Hosting:** Vercel/Netlify (frontend) + Railway/PlanetScale (backend)

**Data Management:**
- **Emission Factors Database:** Regularly updated with latest scientific data
- **Location Services:** IP geolocation + manual selection
- **Analytics:** Privacy-focused usage tracking
- **Caching:** Aggressive caching for emission factors

### 5.3 Data Requirements

**Emission Factor Database:**
- **Coverage:** 100+ countries with regional specificity
- **Update Frequency:** Annual updates with quarterly patches
- **Data Sources:** IPCC, IEA, national inventories, peer-reviewed studies
- **Quality Assurance:** Uncertainty ranges for all factors
- **Version Control:** Track changes and methodology updates

**User Data:**
- **Storage:** Minimal personal data, focus on calculation inputs
- **Privacy:** GDPR compliant, data minimization
- **Retention:** 30 days for analytics, longer if user opts in
- **Export:** User can download their data

---

## 6. User Experience Requirements

### 6.1 Design Principles

**Scientific Credibility**
- Display uncertainty ranges clearly
- Reference scientific methodology
- Avoid false precision
- Provide data sources

**Engaging Simplicity**
- Progressive disclosure of complexity
- Visual hierarchy emphasizing key insights
- Micro-interactions for delight
- Clear progress indication

**Actionable Insights**
- Focus on highest-impact changes
- Realistic behavior modifications
- Positive framing of reduction potential
- Difficulty indicators for actions

### 6.2 Visual Design Requirements

**Color Palette:**
- **Primary:** Climate-themed (blues/greens) with high contrast
- **Semantic:** Red (high impact), yellow (medium), green (low), blue (excellent)
- **Accessibility:** WCAG 2.1 AA compliance

**Typography:**
- **Hierarchy:** Clear size/weight distinctions
- **Readability:** Optimized for data-heavy content
- **Personality:** Modern, scientific, trustworthy

**Iconography:**
- **Consistent Style:** Line-based icons
- **Semantic Meaning:** Transport, food, energy categories
- **Cultural Sensitivity:** Universal symbols where possible

### 6.3 Interaction Design

**Assessment Flow:**
- **Progress Bar:** Clear indication of completion
- **Question Grouping:** Logical categorization
- **Input Validation:** Real-time feedback on invalid inputs
- **Skip Logic:** Optional modules clearly marked

**Results Exploration:**
- **Gesture Support:** Drag, swipe, pinch on mobile
- **Visual Feedback:** Immediate response to interactions
- **Undo/Reset:** Easy return to original state
- **Comparison Mode:** Side-by-side scenario views

---

## 7. Success Metrics & Analytics

### 7.1 Primary Success Metrics

**Engagement Metrics:**
- Assessment completion rate (target: >80%)
- Time to complete core assessment (target: <8 minutes)
- Optional module completion rate (target: >40%)
- Interactive exploration usage (target: >60%)

**Accuracy Metrics:**
- Calculation uncertainty range (target: <±25%)
- User confidence in results (survey, target: >4.0/5.0)
- Scientific validation vs academic studies (target: <15% deviation)

**Social Impact Metrics:**
- Share rate (target: >30%)
- Click-through from shared content (target: >5%)
- User-reported behavior change (follow-up survey, target: >25%)

### 7.2 Analytics Implementation

**Privacy-First Approach:**
- Aggregate data only, no individual tracking
- Optional analytics opt-out
- No third-party trackers
- GDPR/CCPA compliant

**Key Events to Track:**
- Assessment completion by module
- Time spent on each section
- Interactive feature usage
- Sharing behavior
- Return visit frequency

---

## 8. Development Phases

### 8.1 Phase 1: MVP (8-10 weeks)

**Core Features:**
- Location selection
- Mandatory assessment modules (food, transport, energy)
- Basic results display with CO2 score
- Simple scale visualization
- Mobile-responsive design

**Technical Scope:**
- React TypeScript frontend
- Basic emission factors database
- Essential calculations engine
- Simple sharing functionality

### 8.2 Phase 2: Enhancement (6-8 weeks)

**Added Features:**
- Optional assessment modules
- Interactive drag-to-reduce interface
- Enhanced social sharing cards
- Advanced visualizations
- Uncertainty display

**Technical Additions:**
- Advanced state management
- Animation library integration
- Enhanced data visualization
- Performance optimizations

### 8.3 Phase 3: Scale & Polish (4-6 weeks)

**Advanced Features:**
- A/B testing framework
- Advanced analytics
- Multi-language support
- API for third-party integrations
- Advanced sharing analytics

**Quality Improvements:**
- Performance optimization
- Accessibility audit
- Security review
- Load testing

---

## 9. Risk Analysis & Mitigation

### 9.1 Technical Risks

**Data Accuracy Risk**
- *Risk:* Emission factors become outdated or inaccurate
- *Mitigation:* Automated update pipeline, quarterly reviews, uncertainty display

**Performance Risk**
- *Risk:* Complex calculations slow down user experience
- *Mitigation:* Client-side caching, pre-computed factors, progressive loading

**Mobile Experience Risk**
- *Risk:* Drag interactions don't work well on mobile
- *Mitigation:* Touch-first design, alternative input methods, extensive mobile testing

### 9.2 Business Risks

**User Adoption Risk**
- *Risk:* Users find assessment too long or complex
- *Mitigation:* Progressive disclosure, clear progress indication, user testing

**Scientific Credibility Risk**
- *Risk:* Results questioned by experts
- *Mitigation:* Transparent methodology, peer review, uncertainty communication

**Competition Risk**
- *Risk:* Major players launch similar tools
- *Mitigation:* Scientific accuracy moat, superior UX, community building

---

## 10. Success Criteria & KPIs

### 10.1 Launch Success Criteria (3 months)
- 10,000+ completed assessments
- >75% completion rate for core modules
- >50% engagement with interactive features
- <±30% uncertainty in calculations
- 4.0+ user satisfaction rating

### 10.2 Long-term Success Criteria (12 months)
- 100,000+ completed assessments
- >80% completion rate for core modules
- >25% share rate
- Recognition in climate/sustainability communities
- Integration partnerships with 3+ organizations

---

## 11. Open Questions & Future Considerations

### 11.1 Technical Questions
- Should we build a native mobile app or PWA?
- How do we handle offline usage?
- What's the optimal caching strategy for emission factors?
- Should calculations happen client-side or server-side?

### 11.2 Product Questions
- How do we handle users who want to track changes over time?
- Should we add social comparison features (vs friends/community)?
- How do we balance scientific accuracy with user-friendly simplicity?
- What role should offsetting play in the calculation?

### 11.3 Future Features
- **Personal Tracking:** Account creation for historical comparison
- **Action Planning:** Structured reduction goal setting
- **Community Features:** Challenges, leaderboards, social comparison
- **Integration APIs:** Connect with smart home devices, apps
- **AI Recommendations:** Personalized reduction suggestions
- **Corporate Tools:** Team/organization-wide footprint tracking

---

## 12. Conclusion

This Personal Carbon Footprint Calculator represents an opportunity to create the most scientifically accurate and user-friendly carbon calculator available. By combining rigorous emission factors, interactive exploration, and beautiful design, we can empower individuals to understand their climate impact and take meaningful action.

The focus on scientific credibility, regional accuracy, and engaging user experience positions this product to become the standard tool for personal carbon footprint assessment, supporting the urgent need for individual climate action in the decade ahead.

---

**Next Steps:**
1. Technical architecture deep-dive
2. Design system creation
3. Emission factors database design
4. User research validation
5. Development team assembly

*This PRD will be updated iteratively based on user research, technical constraints, and market feedback.*