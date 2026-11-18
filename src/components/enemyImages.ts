import { ImageSourcePropType } from 'react-native';
import { EnemyType } from '../logic/characters';

export type EnemyPose = 'idle' | 'thrust' | 'swing' | 'block' | 'hurt' | 'defeated';

export const ENEMY_IMAGES: Record<EnemyType, Record<EnemyPose, ImageSourcePropType>> = {
  goblin: {
    idle: require('@assets/images/goblin_idle.png'),
    thrust: require('@assets/images/goblin_thrust.png'),
    swing: require('@assets/images/goblin_swing.png'),
    block: require('@assets/images/goblin_block.png'),
    hurt: require('@assets/images/goblin_hurt.png'),
    defeated: require('@assets/images/goblin_defeated.png'),
  },
  orc: {
    idle: require('@assets/images/orc_idle.png'),
    thrust: require('@assets/images/orc_thrust.png'),
    swing: require('@assets/images/orc_swing.png'),
    block: require('@assets/images/orc_block.png'),
    hurt: require('@assets/images/orc_hurt.png'),
    defeated: require('@assets/images/orc_defeated.png'),
  },
  troll: {
    idle: require('@assets/images/troll_idle.png'),
    thrust: require('@assets/images/troll_thrust.png'),
    swing: require('@assets/images/troll_swing.png'),
    block: require('@assets/images/troll_block.png'),
    hurt: require('@assets/images/troll_hurt.png'),
    defeated: require('@assets/images/troll_defeated.png'),
  },
};
