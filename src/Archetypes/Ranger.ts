import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Ranger extends Archetype {
  readonly _energyType: EnergyType = 'stamina';
  private static _instances = 0;
      
  constructor(name: string) {
    super(name);
    Ranger._instances += 1;
  }
    
  get energyType(): EnergyType {
    return this._energyType;
  }
    
  static createdArchetypeInstances(): number {
    return Ranger._instances;
  }
}