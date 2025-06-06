// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "ScopeDB";
export const SITE_DESCRIPTION =
  "ScopeDB is a database that runs directly on top of any commodity object storage. It is designed explicitly for data workloads with massive writes, any-scale analysis, and flexible schema.";

// Contact form webhook URL from environment variable
export const CONTACT_WEBHOOK_URL = import.meta.env.PUBLIC_CONTACT_WEBHOOK_URL || '';

// cal.com booking link
export const CAL_COM_BOOKING_LINK = import.meta.env.PUBLIC_CAL_COM_BOOKING_LINK || 'zili-chen-qnhnon/product-walkthrough';
