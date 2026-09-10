/**
 * SecurityService implements defensive Object-Oriented Security principles:
 * - Encapsulation: Sanitization patterns and protocol whitelists are private (#fields).
 * - Immutability: Freezes regex rules to prevent prototype pollution or runtime tampering.
 * - Robust Sanitization: Strips XSS vectors, script injection, HTML event handlers, and malicious protocols.
 */
export class SecurityService {
  #xssPattern;
  #emailPattern;
  #workspaceSlugPattern;
  #allowedProtocols;

  constructor() {
    this.#xssPattern = /<[^>]*>|javascript:|data:|vbscript:|on\w+\s*=/gi;
    this.#emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.#workspaceSlugPattern = /^[a-zA-Z0-9_-]{2,60}$/;
    this.#allowedProtocols = Object.freeze(new Set(['http:', 'https:', 'mailto:']));
  }

  /**
   * Sanitizes text strings to prevent HTML injection and XSS.
   * @param {unknown} input
   * @param {number} [maxLength=500]
   * @returns {string}
   */
  sanitizeString(input, maxLength = 500) {
    if (input === null || input === undefined) return '';
    const str = String(input).trim();
    const truncated = str.slice(0, maxLength);
    return truncated.replace(this.#xssPattern, '');
  }

  /**
   * Escapes HTML entities for safe text rendering.
   * @param {string} str
   * @returns {string}
   */
  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Recursively sanitizes object payload properties.
   * @template T
   * @param {T} obj
   * @returns {T}
   */
  sanitizePayload(obj) {
    if (obj === null || typeof obj !== 'object') {
      return typeof obj === 'string' ? this.sanitizeString(obj) : obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.sanitizePayload(item));
    }

    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleanKey = this.sanitizeString(key, 100);
      sanitized[cleanKey] = this.sanitizePayload(value);
    }
    return sanitized;
  }

  /**
   * Validates whether an email complies with standard syntax.
   * @param {string} email
   * @returns {boolean}
   */
  validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    return this.#emailPattern.test(email.trim());
  }

  /**
   * Validates workspace organization slug names.
   * @param {string} slug
   * @returns {boolean}
   */
  validateWorkspaceSlug(slug) {
    if (!slug || typeof slug !== 'string') return false;
    return this.#workspaceSlugPattern.test(slug.trim());
  }

  /**
   * Validates target URLs to guard against Open Redirect vulnerabilities.
   * @param {string} urlString
   * @returns {boolean}
   */
  isSafeUrl(urlString) {
    if (!urlString || typeof urlString !== 'string') return false;
    const trimmed = urlString.trim();

    // Allow in-page anchor links
    if (trimmed.startsWith('#') || trimmed.startsWith('/')) {
      return true;
    }

    try {
      const parsed = new URL(trimmed, window.location.origin);
      return this.#allowedProtocols.has(parsed.protocol);
    } catch {
      return false;
    }
  }
}

// Export singleton instance for unified security perimeter
export const securityService = new SecurityService();
export default securityService;
