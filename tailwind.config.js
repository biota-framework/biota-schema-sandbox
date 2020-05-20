const defaultTheme = require('tailwindcss/defaultTheme')

const animationsTheme = {
  animations: {
    float: {
      '0%': {
        // 'box-shadow': '0 5px 15px 0px rgba(0,0,0,0.6)',
        filter: "grayscale(1)",
        transform: 'translatey(0px)'
      },
      '50%': {
        // 'box-shadow': '0 25px 15px 0px rgba(0,0,0,0.2)',
        filter: "grayscale(0)",
        transform: 'translatey(-10px)'
      },
      '100%': {
        // 'box-shadow': '0 5px 15px 0px rgba(0,0,0,0.6)',
        filter: "grayscale(1)",
        transform: 'translatey(0px)'
      }
    },
    spin: {
      from: {
        transform: 'rotate(0deg)'
      },
      to: {
        transform: 'rotate(360deg)'
      }
    },
    jump: {
      '0%': {
        transform: 'translateY(0%)'
      },
      '50%': {
        transform: 'translateY(-100%)'
      },
      '100%': {
        transform: 'translateY(0%)'
      }
    }
  },
  animationDuration: {
    // defaults to these values
    default: '1s',
    '0s': '0s',
    '1s': '1s',
    '2s': '2s',
    '3s': '3s',
    '4s': '4s',
    '5s': '5s',
    '6s': '6s',
    '7s': '7s',
  },
  animationTimingFunction: {
    // defaults to these values
    default: 'ease',
    linear: 'linear',
    ease: 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out'
  },
  animationDelay: {
    // defaults to these values
    default: '0s',
    '0s': '0s',
    '1s': '1s',
    '2s': '2s',
    '3s': '3s',
    '4s': '4s',
    '5s': '5s'
  },
  animationIterationCount: {
    // defaults to these values
    default: 'infinite',
    once: '1',
    infinite: 'infinite'
  },
  animationDirection: {
    // defaults to these values
    default: 'normal',
    normal: 'normal',
    reverse: 'reverse',
    alternate: 'alternate',
    'alternate-reverse': 'alternate-reverse'
  },
  animationFillMode: {
    // defaults to these values
    default: 'none',
    none: 'none',
    forwards: 'forwards',
    backwards: 'backwards',
    both: 'both'
  },
  animationPlayState: {
    // defaults to these values
    running: 'running',
    paused: 'paused'
  }
}

module.exports = {
  purge: false,
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#FF2F24',
          "100":"#FFCFCC",
          "200":"#FF928C",
          "300":"#FF6259",
          "400":"#FF473D",
          "500":"#FF2F24",
          "600":"#FA1B0F",
          "700":"#E60B00",
          "800":"#CC0A00",
          "900":"#B30900",
        }
      },
      fontFamily: {
        display: ['Inter Var', ...defaultTheme.fontFamily.sans],
        sans: ['Inter Var', ...defaultTheme.fontFamily.sans]
      }
    },
    ...animationsTheme
  },
  variants: {
    // all the following default to ['responsive']
    animations: ['responsive'],
    animationDuration: ['responsive'],
    animationTimingFunction: ['responsive'],
    animationDelay: ['responsive'],
    animationIterationCount: ['responsive'],
    animationDirection: ['responsive'],
    animationFillMode: ['responsive'],
    animationPlayState: ['responsive']
  },
  plugins: [require('@tailwindcss/ui'), require('tailwindcss-animations')]
}
