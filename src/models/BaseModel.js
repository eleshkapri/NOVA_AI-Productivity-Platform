/**
 * Abstract Base Model representing core Object-Oriented Principles (OOP):
 * - Encapsulation: Private internal state (#id, #createdAt) accessible only via validated getters.
 * - Abstraction: Exposes clean public contracts (validate, toJSON, clone) while hiding internal implementation.
 */
export class BaseModel {
  #id;
  #createdAt;

  /**
   * @param {string} id - Unique identifier
   */
  constructor(id) {
    if (new.target === BaseModel) {
      throw new TypeError('Cannot construct BaseModel instances directly. Subclass must extend BaseModel.');
    }
    if (!id || typeof id !== 'string') {
      throw new TypeError('Model ID must be a non-empty string.');
    }
    this.#id = id.trim();
    this.#createdAt = Object.freeze(new Date());
  }

  get id() {
    return this.#id;
  }

  get createdAt() {
    return this.#createdAt;
  }

  /**
   * Abstract validation hook to be overridden by concrete models.
   * @returns {boolean}
   */
  validate() {
    return Boolean(this.#id);
  }

  /**
   * Safe serialization of model state.
   * @returns {Record<string, unknown>}
   */
  toJSON() {
    return {
      id: this.#id,
      createdAt: this.#createdAt.toISOString(),
    };
  }

  /**
   * Clones model with defensive freezing.
   * @returns {BaseModel}
   */
  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}

export default BaseModel;
