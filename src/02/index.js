import { createMachine, interpret } from 'xstate'

const elBox = document.querySelector('#box')

const machine = createMachine({
  // Add your object machine definition here
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        CLICK: {
          target: 'active',
        },
      },
    },
    active: {
      on: {
        CLICK: {
          target: 'inactive',
        },
      },
    },
  },
})

// Change this to the initial state
let currentState = machine.initialState

function send(event) {
  // Determine and update the `currentState`
  const nextState = machine.transition(currentState, event)

  currentState = nextState

  elBox.dataset.state = currentState.value
}

elBox.addEventListener('click', () => {
  // Send a click event
  send('CLICK')
})
