import { BaseModel } from './BaseModel';
import { smoothScrollService } from '../services/SmoothScrollService';

/**
 * ActivityModel encapsulates live activity notifications.
 * Demonstrates:
 * - Inheritance: Extends BaseModel.
 * - Encapsulation: Uses private fields for activity details.
 * - Polymorphism: Exposes executeRedirection() method for self-contained navigation.
 */
export class ActivityModel extends BaseModel {
  #company;
  #action;
  #time;
  #icon;
  #tab;
  #stage;
  #targetSection;
  #actionBadge;
  #plan;

  /**
   * @param {Object} params
   * @param {string} params.id
   * @param {string} params.company
   * @param {string} params.action
   * @param {string} params.time
   * @param {string} params.icon
   * @param {string} params.tab
   * @param {number} [params.stage=0]
   * @param {string} [params.targetSection='#features']
   * @param {string} [params.actionBadge='Inspect']
   * @param {string} [params.plan='pro']
   */
  constructor({
    id,
    company,
    action,
    time,
    icon = '⚡',
    tab = 'backlog',
    stage = 0,
    targetSection = '#features',
    actionBadge = 'Inspect',
    plan = 'pro',
  }) {
    super(id);
    this.#company = String(company || 'Anonymous Squad').trim();
    this.#action = String(action || 'performed engineering operation').trim();
    this.#time = String(time || 'just now').trim();
    this.#icon = String(icon);
    this.#tab = String(tab);
    this.#stage = typeof stage === 'number' ? Math.max(0, Math.floor(stage)) : 0;
    this.#targetSection = String(targetSection);
    this.#actionBadge = String(actionBadge);
    this.#plan = String(plan);
  }

  get company() {
    return this.#company;
  }

  get action() {
    return this.#action;
  }

  get time() {
    return this.#time;
  }

  get icon() {
    return this.#icon;
  }

  get tab() {
    return this.#tab;
  }

  get stage() {
    return this.#stage;
  }

  get targetSection() {
    return this.#targetSection;
  }

  get actionBadge() {
    return this.#actionBadge;
  }

  get plan() {
    return this.#plan;
  }

  /**
   * Encapsulates the execution logic for redirecting and triggering demo views.
   * @param {Object} options
   * @param {Function} [options.onOpenDemo]
   * @param {Function} [options.playAudio]
   */
  executeRedirection({ onOpenDemo, playAudio } = {}) {
    if (typeof playAudio === 'function') {
      try {
        playAudio();
      } catch {
        // Audio execution non-blocking
      }
    }

    if (this.#targetSection && typeof window !== 'undefined') {
      try {
        const targetElement = document.querySelector(this.#targetSection);
        if (targetElement) {
          smoothScrollService.scrollTo(targetElement, { offset: -80, duration: 1.5 });
        }
      } catch {
        // Element scroll non-blocking fallback
      }
    }

    if (typeof onOpenDemo === 'function') {
      onOpenDemo(this.#tab, {
        plan: this.#plan,
        stage: this.#stage,
      });
    }
  }

  toJSON() {
    return {
      ...super.toJSON(),
      company: this.#company,
      action: this.#action,
      time: this.#time,
      icon: this.#icon,
      tab: this.#tab,
      stage: this.#stage,
      targetSection: this.#targetSection,
      actionBadge: this.#actionBadge,
      plan: this.#plan,
    };
  }
}

export default ActivityModel;
