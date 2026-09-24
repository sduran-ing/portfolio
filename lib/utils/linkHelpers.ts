// Shared by Button and IconLink: both need to tell an external link
// (http/https/mailto, needing a plain <a> with target/rel) apart from an
// internal route (needing next/link for client-side navigation).
export function getSmartLinkProps(href: string) {
  const isExternal = /^(https?:|mailto:)/.test(href);
  const isMailto = href.startsWith("mailto:");
  return {
    isExternal,
    anchorTarget: isMailto ? undefined : "_blank",
    anchorRel: isMailto ? undefined : "noopener noreferrer",
  };
}