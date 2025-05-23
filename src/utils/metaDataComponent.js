import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import metaData from "./metaData.json";

const MetaDataComponent = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const meta = metaData.meta[pathname];

  const defaultMeta = {
    title: "SocialLens - Analyze, Optimize & Grow | Social Media Insights",
    description:
      "SocialLens is a futuristic platform for analyzing and optimizing your social media performance with real-time data, visualizations, and strategic insights.",
    keywords:
      "social media analytics, influencer tools, engagement tracking, SocialLens, marketing insights",
    ogImage: "http://localhost:3000/favicon.ico",
    ogUrl: `http://localhost:3000${pathname}`,
  };

  const pageMeta = meta || defaultMeta;

  return (
    <Helmet key={pathname}>
      <title>{pageMeta.title}</title>
      <meta name="description" content={pageMeta.description} />
      <meta name="keywords" content={pageMeta.keywords} />
      <meta property="og:title" content={pageMeta.title} />
      <meta property="og:description" content={pageMeta.description} />
      <meta property="og:image" content={pageMeta.ogImage} />
      <meta property="og:url" content={pageMeta.ogUrl} />
      <link rel="canonical" href={pageMeta.ogUrl} />
    </Helmet>
  );
};

export default MetaDataComponent;
