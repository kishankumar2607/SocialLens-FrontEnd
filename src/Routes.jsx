import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import MainLayout from "./layouts/MainLayout";
import SecondLayout from "./layouts/SecondLayout";
import LandingPage from "./pages/landingpage";
import Homepage from "./pages/homepage";
import Dashboard from "./pages/dashboard";
import CreatePost from "./pages/create-post";
import NotFound from "./pages/not-found";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsOfService from "./pages/terms-of-service";
import Cookie from "./pages/cookie";
import ContactPage from "./pages/contact-us";
import AboutPage from "./pages/about";
import Careers from "./pages/careers";
import SupportPage from "./pages/support";
import GuidesPage from "./pages/guides";
import ApiReferencePage from "./pages/api-reference";
import DocumentationPage from "./pages/documentation";
import BlogListPage from "./pages/blogs";
import BlogDetailPage from "./pages/blogs/BlogDetailPage";

const Routes = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* MainLayour Routes */}
        <Route
          path="/"
          element={
            <MainLayout>
              <LandingPage />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout>
              <LoginPage />
            </MainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <MainLayout>
              <RegisterPage />
            </MainLayout>
          }
        />
        <Route
          path="/blogs"
          element={
            <MainLayout>
              <BlogListPage />
            </MainLayout>
          }
        />
        <Route
          path="/blogs/:title"
          element={
            <MainLayout>
              <BlogDetailPage />
            </MainLayout>
          }
        />
        <Route
          path="/documentation"
          element={
            <MainLayout>
              <DocumentationPage />
            </MainLayout>
          }
        />
        <Route
          path="/api-reference"
          element={
            <MainLayout>
              <ApiReferencePage />
            </MainLayout>
          }
        />
        <Route
          path="/guides"
          element={
            <MainLayout>
              <GuidesPage />
            </MainLayout>
          }
        />
        <Route
          path="/support"
          element={
            <MainLayout>
              <SupportPage />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />
        <Route
          path="/careers"
          element={
            <MainLayout>
              <Careers />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <MainLayout>
              <PrivacyPolicy />
            </MainLayout>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <MainLayout>
              <TermsOfService />
            </MainLayout>
          }
        />
        <Route
          path="/cookies"
          element={
            <MainLayout>
              <Cookie />
            </MainLayout>
          }
        />
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />

        {/* SecondLayout Routes */}
        <Route
          path="/homepage"
          element={
            <SecondLayout>
              <Homepage />
            </SecondLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SecondLayout>
              <Dashboard />
            </SecondLayout>
          }
        />
        <Route
          path="/create-post"
          element={
            <SecondLayout>
              <CreatePost />
            </SecondLayout>
          }
        />
      </RouterRoutes>
    </ErrorBoundary>
  );
};

export default Routes;
