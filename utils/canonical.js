/**
 * Generates a canonical URL for the current page
 * @param {string} path - The current path (e.g., /blog/post-1)
 * @returns {string} The full canonical URL
 */
export function getCanonicalUrl(path) {
    const baseUrl = 'https://aivalanche.com';
    // Remove hash fragments as they shouldn't be in canonical URLs
    const pathWithoutHash = path.split('#')[0];
    // Remove trailing slash except for homepage
    const cleanPath = pathWithoutHash === '/' ? '/' : pathWithoutHash.replace(/\/$/, '');

    return `${baseUrl}${cleanPath}`;
}

/**
 * Creates a React component for rendering the canonical link
 * @param {string} path - The current path
 * @returns {JSX.Element} Canonical link element
 */
export function CanonicalLink({ path }) {
    return (
        <link rel="canonical" href={getCanonicalUrl(path)} />
    );
} 