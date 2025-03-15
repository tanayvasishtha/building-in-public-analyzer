# Building in Public Analyzer

A tool to analyze and score your "Building in Public" style based on your Twitter (X) and GitHub metrics. Discover your builder profile and get personalized recommendations to improve your online presence.

## 🌟 Overview

Building in Public Analyzer helps creators understand their public building style by analyzing their Twitter posting habits and GitHub contribution history. The tool provides personalized recommendations and categorizes users into different builder types based on their activity patterns.

## ✨ Features

- **Builder Score Calculation**: Analyzes Twitter posts and GitHub contributions to calculate your Building in Public score
- **Builder Category Classification**: Identifies your builder type (Stealth Builder, Emerging Builder, Consistent Builder, etc.)
- **Building Ratio Analysis**: Compares your Twitter-to-GitHub ratio to determine your focus area
- **Personalized Recommendations**: Provides tailored suggestions to improve your Building in Public approach
- **Shareable Results**: Generate and share your results on Twitter
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technologies Used

- **Frontend Framework**: Next.js 13+
- **UI Framework**: React 18
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: React Hooks
- **Deployment**: Vercel
- **Authentication**: None (using localStorage)
- **API Integration**: Twitter API (minimal integration for profile images)

### Languages & Frameworks

<div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 10px;"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" height="40" alt="JavaScript" title="JavaScript" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="40" alt="TypeScript" title="TypeScript" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" height="40" alt="React" title="React" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="40" height="40" alt="Next.js" title="Next.js" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="40" height="40" alt="Tailwind CSS" title="Tailwind CSS" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="40" height="40" alt="HTML5" title="HTML5" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" height="40" alt="CSS3" title="CSS3" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" height="40" alt="Node.js" title="Node.js" /> </div>

## 📱 Twitter API Integration Journey

I successfully implemented a complete Twitter API integration for this project, which was a significant learning experience. This process involved:

1. **Setting up a Twitter Developer Account**: Created a developer account and project in the Twitter Developer Portal
2. **Obtaining API Keys**: Generated API keys, secrets, and access tokens
3. **Implementing Authentication**: Built a Twitter client using the twitter-api-v2 library with proper OAuth flow
4. **Fetching User Data**: Created functions to retrieve user profiles, timelines, and engagement metrics
5. **Tweet Analysis**: Developed algorithms to analyze tweets for Building in Public content

The implementation was successful and working in development, but I encountered significant limitations:

- **Free Tier Restrictions**: Twitter's API Free tier only allows very limited access (around 100 requests per month)
- **Endpoint Limitations**: Many essential endpoints required for analysis are restricted to paid tiers
- **Rate Limiting**: The Free tier has extremely strict rate limits (17 requests per 24 hours)

Due to these constraints, I had to pivot my approach:
- Kept the Twitter API integration for profile picture fetching only
- Implemented a manual input system where users enter their own metrics
- Created a more flexible, client-side analysis system that doesn't rely on API access

This pivot was a practical solution that allowed the application to function without requiring users to pay for API access while still providing valuable insights.

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Twitter Developer account (for API keys)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tanayvasishtha/building-in-public-analyzer.git
   cd building-in-public-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file with your Twitter API credentials:
   ```
   TWITTER_API_KEY=your_api_key
   TWITTER_API_SECRET=your_api_secret
   TWITTER_ACCESS_TOKEN=your_access_token
   TWITTER_ACCESS_SECRET=your_access_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 💡 How It Works

1. **Data Collection**: Users manually enter their Twitter username, post count, and GitHub contribution count
2. **Score Calculation**: The application calculates a Building in Public score using a weighted formula:
   ```
   Score = (Twitter posts × 0.4) + (GitHub contributions × 0.6)
   ```
3. **Category Assignment**: Based on the score, users are classified into different builder categories
4. **Recommendation Generation**: The system provides personalized recommendations based on the user's profile

## 📊 Tech Stack Visualization

```
Frontend                API                 Storage
┌─────────────┐       ┌─────────────┐     ┌─────────────┐
│  Next.js    │◄──────┤ Twitter API │     │             │
│  React      │       └─────────────┘     │ LocalStorage│
│  Tailwind   │                           │             │
└─────────────┘                           └─────────────┘
      ▲
      │
      ▼
┌─────────────┐
│ Framer      │
│ Motion      │
└─────────────┘
```

## 🔥 Challenges Faced

1. **Twitter API Complexity**: Learning and implementing the Twitter API v2 required understanding OAuth, authentication flows, and the complex endpoint structure. While I successfully built a working integration, the API's limitations made it impractical for this application.

2. **API Tier Limitations**: The Twitter API's Free tier proved far too restrictive, with only 100 requests per month and limited endpoint access. The paid tiers ($100+/month) were not economically viable for this project.

3. **Auth Complications**: Twitter's authentication requirements changed multiple times during development, requiring adaptation of the authentication code.

4. **UI/UX Design Challenges**: Creating a cohesive and visually appealing design required multiple iterations. Issues included:
   - Inconsistent spacing between elements
   - Duplicate "How It Works" sections
   - Colliding Twitter icon elements
   - Inconsistent typography and color schemes

5. **Form Data Persistence**: Needed to implement localStorage to maintain user input data between form submission and analysis page.

6. **Responsive Design Issues**: Ensuring the application worked well on both desktop and mobile required careful CSS adjustments.

7. **Score Calculation**: Initially, scores were exceeding 100 points. We implemented a logarithmic normalization to keep scores within a 0-100 range.

## ⏱️ Development Time

- **Initial Setup**: ~4 hours
- **Twitter API Integration**: ~10 hours
- **Core Functionality**: ~8 hours
- **UI Implementation**: ~10 hours
- **Bug Fixes & Refinements**: ~6 hours
- **Total Development Time**: ~38 hours

## 🔮 Future Improvements

- **Twitter API Integration**: Upgrade to the Basic tier ($100/month) for automatic analysis of tweets
- **GitHub API Integration**: Use the GitHub API to automatically fetch contribution data
- **User Accounts**: Add authentication to save and track progress over time
- **More Detailed Analysis**: Provide deeper insights into posting patterns and engagement
- **Community Comparisons**: Allow users to compare their scores with others in similar niches

## 👨‍💻 Author

- [@TanayVasishtha](https://x.com/TanayVasishtha) - Developer

## 🙏 Acknowledgements

- Next.js and Vercel for the amazing development and deployment experience
- Tailwind CSS for the utility-first styling approach
- Framer Motion for smooth animations
- The Building in Public community for inspiration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

If you found this project useful, please consider giving it a star on [GitHub](https://github.com/tanayvasishtha/building-in-public-analyzer) ⭐

------------------------------------------------------------------------------------------------------------------------------------------------------------
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
