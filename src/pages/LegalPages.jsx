import React from "react";
import LegalPage from "@/components/site/LegalPage";
import Meta from "@/components/site/Meta";
import {
  PRIVACY, TERMS, ADVERTISING_DISCLOSURE, COMMUNICATION_CONSENT, SMS_TERMS,
  COOKIE_POLICY, ACCESSIBILITY, RESULTS_DISCLAIMER, HOW_WE_MATCH, OUR_NETWORK,
  PARTNER_LIST, EDITORIAL_POLICY,
} from "@/lib/legalContent";

const wrap = (content, canonical, noindex) => () => (
  <>
    <Meta title={`${content.title} | Accident Compensation Helper`} description={content.subtitle} canonical={canonical} noindex={noindex} />
    <LegalPage {...content} crumbs={[{ label: "Home", to: "/" }, { label: content.title }]} />
  </>
);

export const Privacy = wrap(PRIVACY, "/privacy");
export const Terms = wrap(TERMS, "/terms");
export const AdvertisingDisclosure = wrap(ADVERTISING_DISCLOSURE, "/advertising-disclosure");
export const CommunicationConsent = wrap(COMMUNICATION_CONSENT, "/communication-consent");
export const SmsTerms = wrap(SMS_TERMS, "/sms-terms");
export const CookiePolicy = wrap(COOKIE_POLICY, "/cookie-policy");
export const Accessibility = wrap(ACCESSIBILITY, "/accessibility");
export const ResultsDisclaimer = wrap(RESULTS_DISCLAIMER, "/results-disclaimer");
export const HowWeMatch = wrap(HOW_WE_MATCH, "/how-we-match");
export const OurNetwork = wrap(OUR_NETWORK, "/our-network");
export const PartnerList = wrap(PARTNER_LIST, "/partner-list");
export const EditorialPolicy = wrap(EDITORIAL_POLICY, "/editorial-policy");