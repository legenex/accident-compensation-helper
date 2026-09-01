import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';

// Auth pages
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';

// Public site
import PublicLayout from '@/components/site/PublicLayout';
import Home from '@/pages/Home';
import HowItWorks from '@/pages/HowItWorks';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Faq from '@/pages/Faq';
import AccidentTypes from '@/pages/AccidentTypes';
import AccidentTypePage from '@/pages/AccidentTypePage';
import Resources from '@/pages/Resources';
import ResourceDetail from '@/pages/ResourceDetail';
import Blog from '@/pages/Blog';
import BlogDetail from '@/pages/BlogDetail';
import PrivacyChoices from '@/pages/PrivacyChoices';
import ClaimCheck from '@/pages/ClaimCheck';
import ClaimResult from '@/pages/ClaimResult';

// Legal & transparency pages
import {
  Privacy, Terms, AdvertisingDisclosure, CommunicationConsent, SmsTerms,
  CookiePolicy, Accessibility, ResultsDisclaimer, HowWeMatch, OurNetwork,
  PartnerList, EditorialPolicy,
} from '@/pages/LegalPages';

// Admin
import AdminLayout from '@/components/admin/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import Leads from '@/pages/admin/Leads';
import Claims from '@/pages/admin/Claims';
import Messages from '@/pages/admin/Messages';
import Testimonials from '@/pages/admin/Testimonials';
import Attorneys from '@/pages/admin/Attorneys';
import PrivacyRequests from '@/pages/admin/PrivacyRequests';
import ConsentRecords from '@/pages/admin/ConsentRecords';
import SiteSettingsAdmin from '@/pages/admin/SiteSettings';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Public site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/accident-types" element={<AccidentTypes />} />
        <Route path="/accident-types/:slug" element={<AccidentTypePage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:slug" element={<ResourceDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/advertising-disclosure" element={<AdvertisingDisclosure />} />
        <Route path="/communication-consent" element={<CommunicationConsent />} />
        <Route path="/sms-terms" element={<SmsTerms />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/privacy-choices" element={<PrivacyChoices />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/results-disclaimer" element={<ResultsDisclaimer />} />
        <Route path="/how-we-match" element={<HowWeMatch />} />
        <Route path="/our-network" element={<OurNetwork />} />
        <Route path="/partner-list" element={<PartnerList />} />
        <Route path="/editorial-policy" element={<EditorialPolicy />} />
      </Route>

      {/* Claim engine */}
      <Route path="/claim" element={<ClaimCheck />} />
      <Route path="/claim/result" element={<ClaimResult />} />

      {/* Admin */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/leads" element={<Leads />} />
          <Route path="/admin/claims" element={<Claims />} />
          <Route path="/admin/messages" element={<Messages />} />
          <Route path="/admin/testimonials" element={<Testimonials />} />
          <Route path="/admin/attorneys" element={<Attorneys />} />
          <Route path="/admin/privacy-requests" element={<PrivacyRequests />} />
          <Route path="/admin/consent-records" element={<ConsentRecords />} />
          <Route path="/admin/settings" element={<SiteSettingsAdmin />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App