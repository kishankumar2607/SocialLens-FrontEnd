
export const mockLinkedInData = {
  engagementRateTrend: [
    { date: "2025-08-02", rate: 1.8 },
    { date: "2025-08-03", rate: 2.1 },
    { date: "2025-08-04", rate: 2.5 },
    { date: "2025-08-05", rate: 2.9 },
    { date: "2025-08-06", rate: 2.6 },
    { date: "2025-08-07", rate: 3.0 },
    { date: "2025-08-08", rate: 2.7 },
    { date: "2025-08-09", rate: 3.4 },
    { date: "2025-08-10", rate: 3.1 },
    { date: "2025-08-11", rate: 3.5 },
    { date: "2025-08-12", rate: 3.2 },
    { date: "2025-08-13", rate: 3.7 },
    { date: "2025-08-14", rate: 3.4 },
    { date: "2025-08-15", rate: 3.9 },
  ],

  bestTimeToPost: {
    weekday: "Wednesday",
    time: "10:00 AM - 11:00 AM",
    reason: "Your followers are most active mid-week mornings."
  },

  contentSuggestions: [
    "Share a short case study from your recent project.",
    "Post a carousel of tips on using Next.js effectively.",
    "Create a 1-minute video introducing your portfolio.",
    "Post a poll asking about the most used JS frameworks in 2025.",
    "Share an industry news article with your thoughts."
  ]
};


const handleFromName = (name) =>
  name ? name.trim().toLowerCase().replace(/\s+/g, "") : "kishankumardas";

export const linkedInMock = {
  page: {
    name: "Kishan Kumar Das",
    handle: handleFromName("Kishan Kumar Das"),
    logo: "https://i.pravatar.cc/100?img=12",
    followers: 914,
  },

  kpis: {
    followersTotal: 914,
    followersChangePct: 3.8,
    engagementRate: 2.6, 
    engagementChangePct: 9.4,
    sentiment: { positive: 72, neutral: 22, negative: 6 },
  },

  followersTrend: [
    { date: "2025-07-17", followers: 905 },
    { date: "2025-07-20", followers: 907 },
    { date: "2025-07-23", followers: 909 },
    { date: "2025-07-26", followers: 911 },
    { date: "2025-07-29", followers: 912 },
    { date: "2025-08-01", followers: 913 },
    { date: "2025-08-04", followers: 913 },
    { date: "2025-08-07", followers: 914 },
    { date: "2025-08-10", followers: 914 },
    { date: "2025-08-13", followers: 914 },
  ],

  // Estimated engagement by format (used by bar charts or suggestions)
  engagementByFormat: [
    { name: "Image", rate: 3.2 },
    { name: "Text", rate: 2.1 },
    { name: "Video", rate: 2.7 },
    { name: "Document", rate: 1.6 },
    { name: "Carousel", rate: 3.4 },
  ],

  posts: [
    {
      id: "p1",
      text:
        "Reposted: Connections are everything in Canada — The Networking Catalyst at Conestoga College (July 18). #Networking #ConestogaCollege #CareerSuccess",
      createdAt: "2025-07-18T20:00:00Z",
      mediaType: "image",
      stats: { likes: 24, comments: 1, shares: 10, impressions: 1800 },
    },

    {
      id: "p2",
      text:
        "Reposted: THE NETWORKING CATALYST – July 18, 4–9 PM (Doon). Limited spots — register now!",
      createdAt: "2025-07-12T16:00:00Z",
      mediaType: "image",
      stats: { likes: 14, comments: 1, shares: 1, impressions: 1100 },
    },

    {
      id: "p3",
      text:
        "Reposted: LaunchPad 2025 — pre-incubator pitch night for Conestoga students. Safe space to share ideas.",
      createdAt: "2025-07-01T15:00:00Z",
      mediaType: "text",
      stats: { likes: 9, comments: 2, shares: 3, impressions: 900 },
    },

    {
      id: "p4",
      text:
        "Reposted: IT Club volunteers needed for July 4 event at Waterloo Campus — get involved!",
      createdAt: "2025-06-25T15:00:00Z",
      mediaType: "image",
      stats: { likes: 16, comments: 0, shares: 3, impressions: 950 },
    },

    {
      id: "p5",
      text:
        "Reposted: First club gathering — Digital Marketing & Personal Branding (June 5, Doon).",
      createdAt: "2025-06-03T16:00:00Z",
      mediaType: "image",
      stats: { likes: 6, comments: 0, shares: 3, impressions: 600 },
    },

    {
      id: "p6",
      text:
        "Had a great time representing IT Club at CSI Club Showcase (Doon)! Thanks to everyone who stopped by. #ITClubConestoga #CSIShowcase",
      createdAt: "2025-06-15T14:00:00Z",
      mediaType: "image",
      stats: { likes: 37, comments: 1, shares: 0, impressions: 722 },
    },

    {
      id: "p7",
      text:
        "Reposted: Curious about IT Club? Showcase — May 20 (Waterloo) & May 21 (Doon). Find your community.",
      createdAt: "2025-05-15T16:00:00Z",
      mediaType: "image",
      stats: { likes: 14, comments: 5, shares: 2, impressions: 800 },
    },

    {
      id: "p8",
      text:
        "Reposted: IT Club Movie Night at Conestoga Brantford (Mar 30). Bring a snack and join!",
      createdAt: "2025-03-27T22:00:00Z",
      mediaType: "image",
      stats: { likes: 2, comments: 0, shares: 2, impressions: 300 },
    },

    {
      id: "p9",
      text:
        "Reposted: Upgrade English Club × IT Club × Redefined Conestoga — Speed Networking + Panels (Mar 16).",
      createdAt: "2025-03-10T22:00:00Z",
      mediaType: "image",
      stats: { likes: 32, comments: 5, shares: 6, impressions: 1600 },
    },

    {
      id: "p10",
      text:
        "Thrilled to share my Hackathon experience with team Bibin, Jithin, and Al Shifan. Big thanks to IT Club organizers! #Hackathon #TechInnovation",
      createdAt: "2025-03-05T20:00:00Z",
      mediaType: "image",
      stats: { likes: 54, comments: 8, shares: 2, impressions: 1877 },
    },

    {
      id: "p11",
      text:
        "Why you should use Next.js: SSR, SSG, SEO, routing, API routes, perf, easy deploy, TS, community. #Nextjs #React",
      createdAt: "2024-10-15T18:00:00Z",
      mediaType: "document",
      stats: { likes: 9, comments: 0, shares: 0, impressions: 461 },
    },

    {
      id: "p12",
      text:
        "Exciting day representing the IT Club at Conestoga Doon! Shoutouts to the team and community. #TechCommunity #CareerGrowth",
      createdAt: "2024-10-10T18:00:00Z",
      mediaType: "image",
      stats: { likes: 22, comments: 5, shares: 1, impressions: 870 },
    },

    {
      id: "p13",
      text:
        "Reposted: Mahendra Parmar is looking for a Frontend (React) role in Ahmedabad — referrals appreciated!",
      createdAt: "2024-08-10T18:00:00Z",
      mediaType: "text",
      stats: { likes: 25, comments: 6, shares: 6, impressions: 500 },
    },

    {
      id: "p14",
      text:
        "Reposted: Backend/NodeJS role — 2+ years experience. Please reach out if you have opportunities.",
      createdAt: "2024-08-05T18:00:00Z",
      mediaType: "document",
      stats: { likes: 27, comments: 2, shares: 3, impressions: 520 },
    },

    {
      id: "p15",
      text:
        "Volunteering at IT Sales Community event on Sept 16 — learned a ton about AI in sales. Proud of the team! #AIinSales #VolunteerLife",
      createdAt: "2024-09-17T18:00:00Z",
      mediaType: "image",
      stats: { likes: 16, comments: 1, shares: 2, impressions: 752 },
    },

    {
      id: "p16",
      text:
        "Reposted: GDG Ahmedabad — great learning + community networking. #devfest",
      createdAt: "2023-08-20T18:00:00Z",
      mediaType: "video",
      stats: { likes: 13, comments: 3, shares: 2, impressions: 900 },
    },
  ],
};