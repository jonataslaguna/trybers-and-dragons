import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;
  private _name: string;
  
  constructor(name: string) {
    const randomNumber = getRandomInt(1, 10);

    this._name = name;
    this._dexterity = randomNumber;
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this.maxLifePoints;
    this._strength = randomNumber;
    this._defense = randomNumber;
    this._energy = {
      type_: this._archetype.energyType,
      amount: randomNumber,
    };
  }

  get race(): Race {
    return this._race;
  }

  get archetype(): Archetype {
    return this._archetype;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energy(): Energy {
    return { ...this._energy };
  }

  get name(): string {
    return this._name;
  }

  attack(enemy: Fighter): void {
    const damage = this.strength;

    enemy.receiveDamage(damage);
  }

  special(enemy: Fighter): void {
    const specialDamage = getRandomInt(7, 15);
    enemy.receiveDamage(this.strength + specialDamage);
  }

  levelUp(): void {
    const increment = getRandomInt(1, 10);
    const newMaxLifePoints = Math.min(this.race.maxLifePoints, this.maxLifePoints + increment);
    this._maxLifePoints = newMaxLifePoints;
    this._strength += increment;
    this._dexterity += increment;
    this._defense += increment;
    this._energy.amount = 10;
    this._lifePoints = this._maxLifePoints;
  }

  receiveDamage(attackPoints: number): number {
    const damage = Math.max(0, attackPoints - this.defense);
    
    const actualDamage = damage > 0 ? damage : 1;

    this._lifePoints -= actualDamage;

    if (this.lifePoints <= 0) {
      this._lifePoints = -1;
    }

    return this._lifePoints;
  }  
}