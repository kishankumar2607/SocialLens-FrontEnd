// Realistic LinkedIn-only mock data for your dashboard.
// Shape matches what the Dashboard expects.

export const linkedInMock = {
  page: {
    id: "urn:li:organization:123456789",
    name: "SocialLens",
    handle: "sociallens",
    logo: "https://i.pravatar.cc/100?img=12",
    followers: 24892,
    following: 312,
  },

  kpis: {
    followersTotal: 24892,
    followersChangePct: 12.4, // last 30 days
    engagementRate: 5.28, // %
    engagementChangePct: 0.8, // %
    sentiment: { positive: 78, neutral: 15, negative: 7 },
  },

  // Line chart: monthly followers trend
  followersTrend: [
    { name: "Jan", followers: 18500 },
    { name: "Feb", followers: 19200 },
    { name: "Mar", followers: 19800 },
    { name: "Apr", followers: 20500 },
    { name: "May", followers: 21200 },
    { name: "Jun", followers: 22000 },
    { name: "Jul", followers: 22800 },
    { name: "Aug", followers: 23500 },
    { name: "Sep", followers: 24200 },
    { name: "Oct", followers: 24892 },
  ],

  // Bar chart: engagement by content format on LinkedIn
  engagementByFormat: [
    { name: "Image", rate: 6.3 },
    { name: "Text", rate: 4.8 },
    { name: "Video", rate: 7.1 },
    { name: "PDF/Carousel", rate: 5.6 },
    { name: "Link Post", rate: 3.9 },
  ],

  // Posts (latest first)
  posts: [
    {
      id: "post_1009",
      createdAt: "2025-08-09T14:32:00Z",
      channel: "LinkedIn",
      text: "Thrilled to announce early access to SocialLens AI Assist — draft posts, hashtags, and carousels in seconds. Request access below. #AI #SocialMedia #ProductLaunch",
      mediaType: "image",
      mediaUrl: "https://picsum.photos/seed/sociallens-ai/640/360",
      stats: {
        impressions: 12482,
        likes: 1248,
        comments: 86,
        shares: 342,
        saves: 71,
        ctr: 2.1,
      },
      sentiment: "positive",
      comments: [
        {
          id: "c1",
          author: {
            name: "Nina Patel",
            title: "Growth Marketer",
            avatar: "https://i.pravatar.cc/100?img=32",
          },
          text: "We’ve been waiting for this! Applied for early access 🙌",
          likes: 12,
          createdAt: "2025-08-09T15:10:00Z",
        },
        {
          id: "c2",
          author: {
            name: "Alex Li",
            title: "Product Lead",
            avatar: "https://i.pravatar.cc/100?img=45",
          },
          text: "Looks promising. Does it support carousel templates?",
          likes: 7,
          createdAt: "2025-08-09T16:02:00Z",
        },
      ],
    },
    {
      id: "post_1004",
      createdAt: "2025-08-03T10:05:00Z",
      channel: "LinkedIn",
      text: "Case study: How a B2B SaaS team lifted LinkedIn engagement by 43% using SocialLens compare view and comment insights. Read the breakdown below.",
      mediaType: "pdf",
      mediaUrl: "",
      stats: {
        impressions: 8921,
        likes: 743,
        comments: 41,
        shares: 129,
        saves: 56,
        ctr: 1.6,
      },
      sentiment: "positive",
      comments: [
        {
          id: "c3",
          author: {
            name: "Priya Singh",
            title: "CMO",
            avatar: "https://i.pravatar.cc/100?img=68",
          },
          text: "Carousel/PDF posts always work for us — love the compare view idea.",
          likes: 9,
          createdAt: "2025-08-03T12:20:00Z",
        },
      ],
    },
  ],
};
