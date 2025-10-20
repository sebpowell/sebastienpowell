function formatDomain(url: string) {
  try {
    const hostname = new URL(url).hostname;

    const parts = hostname.split('.');

    const domainParts = parts.length > 2 ? parts.slice(-2) : parts;

    return domainParts.join('.');
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
}

export { formatDomain };
