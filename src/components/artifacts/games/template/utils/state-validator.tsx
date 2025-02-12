import { GameState } from "../game-state";

export interface StateValidator<T extends GameState = GameState> {
  validateScreen(screen?: string): boolean;
  validateState(state?: Partial<T>): boolean;
  validateStep(step: number, screen: string): boolean;
}

export abstract class BaseStateValidator<T extends GameState = GameState> implements StateValidator<T> {
  protected validScreens: string[];
  protected maxSteps: Record<string, number>;

  constructor(validScreens: string[], maxSteps: Record<string, number>) {
    this.validScreens = validScreens;
    this.maxSteps = maxSteps;
  }

  validateScreen(screen?: string): boolean {
    return screen ? this.validScreens.includes(screen) : false;
  }

  validateStep(step: number, screen: string): boolean {
    if (typeof step !== 'number' || step < 0) return false;
    return step <= (this.maxSteps[screen] || 0);
  }

  abstract validateState(state?: Partial<T>): boolean;
} 