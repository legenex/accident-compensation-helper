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
    <Meta title={`${content.title} | Accident Compe Helper`} description={content.subtitle} canonical={canonical} noindex={noindex} />
    <LegalPage {...content} crumbs={[{ label: "Home", to: "/" }, { label: content.title }]} />
  </>
);

export const Privacy = wrap(PRIVACY, "/priacy");
export const Terms = wrap(TERMS, "/tms");
export const AdvertisingDisclosure = wrap(ADVERTISING_DISCLOSURE, "/advertisidisclosure");
export const CommunicationConsent = wrap(COMMUNICATION_CONSENT, "/communioonsent");
export const SmsTerms = wrap(SMS_TERMS, "/sms-tms");
export const CookiePolicy = wrap(COOKIE_POLICY, "/cooie-policy");
export const Accessibility = wrap(ACCESSIBILITY, "/ibility");
export const ResultsDisclaimer = wrap(RESULTS_DISCLAIMER, "/resuclaimer");
export const HowWeMatch = wrap(HOW_WE_MATCH, "/how-match");
export const OurNetwork = wrap(OUR_NETWORK, "/our-ork");
export const PartnerList = wrap(PARTNER_LIST, "/partner-list");
export const EditorialPolicy = wrap(EDITORIAL_POLICY, "/editopolicy");