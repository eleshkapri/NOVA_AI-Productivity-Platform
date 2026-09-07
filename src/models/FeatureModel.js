import { BaseModel } from './BaseModel';

/**
 * FeatureModel encapsulates architectural feature specifications.
 * Demonstrates:
 * - Inheritance: Extends BaseModel.
 * - Encapsulation: Private state for feature parameters.
 * - Polymorphism: getTargetTab() encapsulates tab mapping logic.
 */
export class FeatureModel extends BaseModel {
  #iconName;
  #badge;
  #title;
  #description;
  #metric;
  #index;

  /**
   * @param {Object} params
   * @param {string} params.id
   * @param {string} params.iconName
   * @param {string} params.badge
   * @param {string} params.title
   * @param {string} params.description
   * @param {string} params.metric
   * @param {number} [params.index=0]
   */
  constructor({ id, iconName, badge, title, description, metric, index = 0 }) {
    super(id);
    this.#iconName = String(iconName || 'Bot');
    this.#badge = String(badge || 'Feature');
    this.#title = String(title || '');
    this.#description = String(description || '');
    this.#metric = String(metric || '');
    this.#index = typeof index === 'number' ? index : 0;
  }

  get iconName() {
    return this.#iconName;
  }

  get badge() {
    return this.#badge;
  }

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description;
  }

  get metric() {
    return this.#metric;
  }

  get index() {
    return this.#index;
  }

  /**
   * Encapsulates the tab resolution policy based on feature characteristics.
   * @returns {string}
   */
  getTargetTab() {
    switch (this.#index) {
      case 0:
        return 'backlog';
      case 1:
        return 'pr';
      case 2:
        return 'velocity';
      case 3:
        return 'pr';
      case 4:
        return 'status';
      case 5:
        return 'docs';
      default:
        return 'backlog';
    }
  }

  override toJSON() {
    return {
      ...super.toJSON(),
      iconName: this.#iconName,
      badge: this.#badge,
      title: this.#title,
      description: this.#description,
      metric: this.#metric,
      index: this.#index,
      targetTab: this.getTargetTab(),
    };
  }
}

export default FeatureModel;
