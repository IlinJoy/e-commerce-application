export function getProductIdFromUrl(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const segments = window.location.pathname.split('/');
  return segments[segments.length - 1];
}
