const rawApiUrl = (import.meta.env.VITE_API_URL ?? '').trim();
const rawCdnUrl = (import.meta.env.VITE_CDN_URL ?? '').trim();

export const API_URL = rawApiUrl.length > 0 ? rawApiUrl : '/api/afisha';
export const CDN_URL = rawCdnUrl.length > 0 ? rawCdnUrl : '/content/afisha';