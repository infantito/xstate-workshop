import { createMachine, interpret } from 'xstate'

const elApp = document.querySelector('#app')
const elOffButton = document.querySelector('#offButton')
const elOnButton = document.querySelector('#onButton')
const elModeButton = document.querySelector('#modeButton')

const displayMachine = createMachine({
  initial: 'hidden',
  states: {
    hidden: {
      on: {
        TURN_ON: 'visible.history',
      },
    },
    visible: {
      // Add parallel states here for:
      type: 'parallel',
      on: {
        TURN_OFF: 'hidden',
      },
      // - mode (light or dark)
      // - brightness (bright or dim)
      states: {
        history: {
          type: 'history',
          history: 'deep',
        },
        mode: {
          initial: 'light',
          states: {
            light: {
              on: {
                SWITCH: 'dark',
              },
            },
            dark: {
              on: {
                SWITCH: 'light',
              },
            },
          },
        },
        brightness: {
          initial: 'bright',
          states: {
            bright: {
              after: {
                2000: 'dim',
              },
            },
            dim: {
              on: {
                SWITCH: 'bright',
              },
            },
          },
        },
      },
    },
  },
})

const displayService = interpret(displayMachine)
  .onTransition(state => {
    console.log(state.value)
    elApp.dataset.state = state.toStrings().join(' ')
  })
  .start()

elOnButton.addEventListener('click', () => {
  displayService.send('TURN_ON')
})

elOffButton.addEventListener('click', () => {
  displayService.send('TURN_OFF')
})

elModeButton.addEventListener('click', () => {
  displayService.send('SWITCH')
})
