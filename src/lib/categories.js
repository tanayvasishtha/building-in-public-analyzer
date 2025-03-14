export const BUILDER_CATEGORIES = {
    STEALTH_BUILDER: {
      name: 'Stealth Builder',
      description: 'You build quietly but consistently. Time to share more!'
    },
    EMERGING_BUILDER: {
      name: 'Emerging Builder',
      description: 'You\'re starting to build in public. Keep the momentum going!'
    },
    CONSISTENT_BUILDER: {
      name: 'Consistent Builder',
      description: 'You regularly share your building journey. You\'re on the right track!'
    },
    ENGAGED_BUILDER: {
      name: 'Engaged Builder',
      description: 'You build and engage actively with the community.'
    },
    INFLUENTIAL_BUILDER: {
      name: 'Influential Builder',
      description: 'Your building journey inspires others in the community.'
    },
    BIP_CONQUEROR: {
      name: 'Building in Public Conqueror',
      description: 'You\'re a master of building in public. Others look up to you!'
    }
  };
  
  export function getCategoryColor(category) {
    switch(category) {
      case 'STEALTH_BUILDER': return 'gray';
      case 'EMERGING_BUILDER': return 'green';
      case 'CONSISTENT_BUILDER': return 'blue';
      case 'ENGAGED_BUILDER': return 'purple';
      case 'INFLUENTIAL_BUILDER': return 'orange';
      case 'BIP_CONQUEROR': return 'red';
      default: return 'blue';
    }
  }
  