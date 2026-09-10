import { BaseModel } from './BaseModel';
import { securityService } from '../services/SecurityService';

const VALID_STATUSES = Object.freeze(new Set(['backlog', 'in_progress', 'done']));

/**
 * SprintTaskModel encapsulates sprint tasks in Kanban and Burndown components.
 * Demonstrates:
 * - Inheritance: Extends BaseModel.
 * - Encapsulation: Uses private fields for task state.
 * - Robust Validation: Enforces valid Kanban column statuses and non-negative story points.
 * - Security: Sanitizes text fields to prevent injection.
 */
export class SprintTaskModel extends BaseModel {
  #title;
  #points;
  #service;
  #status;
  #branch;
  #details;

  /**
   * @param {Object} params
   * @param {string} params.id
   * @param {string} params.title
   * @param {number} params.points
   * @param {string} params.service
   * @param {'backlog' | 'in_progress' | 'done'} [params.status='backlog']
   * @param {string} [params.branch='']
   * @param {string} [params.details='']
   */
  constructor({
    id,
    title,
    points = 1,
    service = 'General',
    status = 'backlog',
    branch = '',
    details = '',
  }) {
    super(id);

    this.#title = securityService.sanitizeString(title, 150);
    this.#points = typeof points === 'number' && points > 0 ? Math.floor(points) : 1;
    this.#service = securityService.sanitizeString(service, 50);
    this.#status = VALID_STATUSES.has(status) ? status : 'backlog';
    this.#branch = securityService.sanitizeString(branch, 60);
    this.#details = securityService.sanitizeString(details, 300);
  }

  get title() {
    return this.#title;
  }

  get points() {
    return this.#points;
  }

  get service() {
    return this.#service;
  }

  get status() {
    return this.#status;
  }

  get branch() {
    return this.#branch;
  }

  get details() {
    return this.#details;
  }

  /**
   * Returns a new model instance with updated status (immutable mutation).
   * @param {'backlog' | 'in_progress' | 'done'} nextStatus
   * @returns {SprintTaskModel}
   */
  withStatus(nextStatus) {
    if (!VALID_STATUSES.has(nextStatus)) {
      throw new TypeError(`Invalid sprint task status: ${nextStatus}`);
    }
    return new SprintTaskModel({
      id: this.id,
      title: this.#title,
      points: this.#points,
      service: this.#service,
      status: nextStatus,
      branch: this.#branch,
      details: this.#details,
    });
  }

  /**
   * Determines if the task is finished.
   * @returns {boolean}
   */
  isCompleted() {
    return this.#status === 'done';
  }

  /**
   * Safe serialization of task state.
   * @returns {Record<string, unknown>}
   */
  toJSON() {
    return {
      ...super.toJSON(),
      title: this.#title,
      points: this.#points,
      service: this.#service,
      status: this.#status,
      branch: this.#branch,
      details: this.#details,
    };
  }
}

export default SprintTaskModel;
