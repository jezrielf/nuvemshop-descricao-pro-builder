
// Ensure the window object includes the Nexo property
interface Window {
  Nexo: {
    create: (config: { clientId: string; log?: boolean }) => any;
    initialize: () => Promise<any>;
  };
}

// Define types for the Nexo responses
interface NexoStoreInfo {
  id: string;
  name: string;
  url: string;
  country: string;
  language: string;
  currency: string;
}

interface NexoNavigateSyncResponse {
  path: string;
  replace?: boolean;
}
