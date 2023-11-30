import { SimpleFighter } from '../Fighter';

export default class Monster implements SimpleFighter {
  private _lifePoints = 85;
  private _strength = 63;

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  attack(enemy: SimpleFighter): void {
    const damage = this.strength;

    enemy.receiveDamage(damage);
  }

  receiveDamage(attackPoints: number): number {
    const damage = Math.max(0, attackPoints - this.lifePoints);

    const actualDamage = damage > 0 ? damage : 1;

    this._lifePoints -= actualDamage;

    if (this.lifePoints <= 0) {
      this._lifePoints = -1;
    }

    return this._lifePoints;
  }
}