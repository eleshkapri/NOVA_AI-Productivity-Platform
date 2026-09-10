import { BaseModel } from './BaseModel';
import { securityService } from '../services/SecurityService';

/**
 * VelocityRhythmModel encapsulates sprint velocity cadence and telemetry data.
 * Demonstrates:
 * - Inheritance: Extends BaseModel.
 * - Encapsulation: Private state (#label, #fullLabel, #icon, #statusText, #badgeSymbol, #badgeText, #badgeColor, #metrics).
 * - Security: All text inputs are sanitized via securityService against XSS.
 * - Immutability: Deeply freezes metrics payload.
 */
export class VelocityRhythmModel extends BaseModel {
  #label;
  #fullLabel;
  #icon;
  #statusText;
  #badgeSymbol;
  #badgeText;
  #badgeColor;
  #metrics;

  /**
   * @param {Object} params
   * @param {string} params.id
   * @param {string} params.label
   * @param {string} params.fullLabel
   * @param {any} params.icon
   * @param {string} params.statusText
   * @param {string} params.badgeSymbol
   * @param {string} params.badgeText
   * @param {string} [params.badgeColor='text-[#FF5500]']
   * @param {Array<{ id: string, value: string, label: string, accent: string, sub: string }>} params.metrics
   */
  constructor({
    id,
    label,
    fullLabel,
    icon,
    statusText,
    badgeSymbol,
    badgeText,
    badgeColor = 'text-[#FF5500]',
    metrics = [],
  }) {
    super(id);

    this.#label = securityService.sanitizeString(label, 30);
    this.#fullLabel = securityService.sanitizeString(fullLabel || label, 50);
    this.#icon = icon;
    this.#statusText = securityService.sanitizeString(statusText, 60);
    this.#badgeSymbol = securityService.sanitizeString(badgeSymbol, 5);
    this.#badgeText = securityService.sanitizeString(badgeText, 60);
    this.#badgeColor = securityService.sanitizeString(badgeColor, 40);

    this.#metrics = Object.freeze(
      (Array.isArray(metrics) ? metrics : []).map((m) =>
        Object.freeze({
          id: securityService.sanitizeString(m.id || m.label, 30),
          value: securityService.sanitizeString(m.value, 20),
          label: securityService.sanitizeString(m.label, 40),
          accent: securityService.sanitizeString(m.accent || 'text-slate-900 dark:text-white', 50),
          sub: securityService.sanitizeString(m.sub || '', 40),
        })
      )
    );

    Object.freeze(this);
  }

  get label() {
    return this.#label;
  }

  get fullLabel() {
    return this.#fullLabel;
  }

  get icon() {
    return this.#icon;
  }

  get statusText() {
    return this.#statusText;
  }

  get badgeSymbol() {
    return this.#badgeSymbol;
  }

  get badgeText() {
    return this.#badgeText;
  }

  get badgeColor() {
    return this.#badgeColor;
  }

  get metrics() {
    return this.#metrics;
  }

  /**
   * Safe serialization of model state.
   * @returns {Record<string, unknown>}
   */
  toJSON() {
    return {
      ...super.toJSON(),
      label: this.#label,
      fullLabel: this.#fullLabel,
      statusText: this.#statusText,
      badgeSymbol: this.#badgeSymbol,
      badgeText: this.#badgeText,
      badgeColor: this.#badgeColor,
      metrics: this.#metrics,
    };
  }
}

export default VelocityRhythmModel;
