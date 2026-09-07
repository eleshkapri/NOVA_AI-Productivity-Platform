import { BaseModel } from './BaseModel';

/**
 * PricingPlanModel encapsulates tier economics, calculations, and feature access.
 * Demonstrates:
 * - Inheritance: Extends BaseModel.
 * - Encapsulation: Pricing details hidden behind private fields.
 * - Calculations: getEffectivePrice(isAnnual), getAnnualSavingsPercent().
 */
export class PricingPlanModel extends BaseModel {
  #name;
  #badge;
  #description;
  #monthlyPrice;
  #annualPrice;
  #period;
  #isPopular;
  #ctaText;
  #ctaVariant;
  #features;
  #notIncluded;

  constructor({
    id,
    name,
    badge,
    description,
    monthlyPrice = 0,
    annualPrice = 0,
    period = 'per user / month',
    isPopular = false,
    ctaText = 'Get Started',
    ctaVariant = 'primary',
    features = [],
    notIncluded = [],
  }) {
    super(id);
    this.#name = String(name || '');
    this.#badge = String(badge || '');
    this.#description = String(description || '');
    this.#monthlyPrice = Number(monthlyPrice) || 0;
    this.#annualPrice = Number(annualPrice) || 0;
    this.#period = String(period || 'per user / month');
    this.#isPopular = Boolean(isPopular);
    this.#ctaText = String(ctaText || 'Get Started');
    this.#ctaVariant = String(ctaVariant || 'primary');
    this.#features = Object.freeze([...(features || [])]);
    this.#notIncluded = Object.freeze([...(notIncluded || [])]);
  }

  get name() {
    return this.#name;
  }

  get badge() {
    return this.#badge;
  }

  get description() {
    return this.#description;
  }

  get monthlyPrice() {
    return this.#monthlyPrice;
  }

  get annualPrice() {
    return this.#annualPrice;
  }

  get period() {
    return this.#period;
  }

  get isPopular() {
    return this.#isPopular;
  }

  get ctaText() {
    return this.#ctaText;
  }

  get ctaVariant() {
    return this.#ctaVariant;
  }

  get features() {
    return this.#features;
  }

  get notIncluded() {
    return this.#notIncluded;
  }

  /**
   * Returns price based on billing frequency.
   * @param {boolean} isAnnual
   * @returns {number}
   */
  getEffectivePrice(isAnnual) {
    return isAnnual ? this.#annualPrice : this.#monthlyPrice;
  }

  /**
   * Calculates annual savings percentage.
   * @returns {number}
   */
  getAnnualSavingsPercent() {
    if (this.#monthlyPrice <= 0 || this.#annualPrice <= 0) return 0;
    const diff = (this.#monthlyPrice - this.#annualPrice) / this.#monthlyPrice;
    return Math.round(diff * 100);
  }

  override toJSON() {
    return {
      ...super.toJSON(),
      name: this.#name,
      badge: this.#badge,
      description: this.#description,
      monthlyPrice: this.#monthlyPrice,
      annualPrice: this.#annualPrice,
      period: this.#period,
      isPopular: this.#isPopular,
      ctaText: this.#ctaText,
      ctaVariant: this.#ctaVariant,
      features: [...this.#features],
      notIncluded: [...this.#notIncluded],
    };
  }
}

export default PricingPlanModel;
