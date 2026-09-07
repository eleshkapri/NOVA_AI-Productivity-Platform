import { BaseModel } from './BaseModel';

/**
 * TaskModel encapsulates sprint engineering tasks and tickets.
 * Demonstrates:
 * - Inheritance: Extends BaseModel.
 * - Encapsulation: Private fields for task metadata.
 * - Validation: Validates Fibonacci points and priority classification.
 */
export class TaskModel extends BaseModel {
  #title;
  #status;
  #points;
  #priority;
  #squad;
  #branch;
  #details;

  constructor({
    id,
    title,
    status = 'Open',
    points = 1,
    priority = 'Medium',
    squad = 'Core Platform',
    branch = 'main',
    details = '',
  }) {
    super(id);
    this.#title = String(title || 'Untitled Task').trim();
    this.#status = String(status);
    this.#points = typeof points === 'number' ? Math.max(1, points) : 1;
    this.#priority = String(priority);
    this.#squad = String(squad);
    this.#branch = String(branch);
    this.#details = String(details || '');
  }

  get title() {
    return this.#title;
  }

  get status() {
    return this.#status;
  }

  get points() {
    return this.#points;
  }

  get priority() {
    return this.#priority;
  }

  get squad() {
    return this.#squad;
  }

  get branch() {
    return this.#branch;
  }

  get details() {
    return this.#details;
  }

  isHighPriority() {
    return this.#priority.toLowerCase() === 'high' || this.#priority.toLowerCase() === 'critical';
  }

  toJSON() {
    return {
      ...super.toJSON(),
      title: this.#title,
      status: this.#status,
      points: this.#points,
      priority: this.#priority,
      squad: this.#squad,
      branch: this.#branch,
      details: this.#details,
    };
  }
}

export default TaskModel;
