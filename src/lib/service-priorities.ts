// Commercial priorities set by Devisgon; canonical routes stay stable.
export const PRIORITY_SERVICE_PATHS = [
  "/services/ai-agent-development-automation-services",
  "/services/ai-powered-business-automation-services",
  "/services/business-process-automation-services",
  "/services/ai-software-development-automation-services",
  "/services/ai-integration-automation-services",
  "/services/rag-system-development-ai-search-services",
  "/services/saas-development-cloud-application-services",
  "/services/mvp-development-startup-services",
  "/services/web-application-development-services",
  "/services/website-development-design-services",
] as const;

export function servicePriority(href: string): number {
  const index = PRIORITY_SERVICE_PATHS.findIndex((path) => path === href);
  return index < 0 ? PRIORITY_SERVICE_PATHS.length : index;
}
