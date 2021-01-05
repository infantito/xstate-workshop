const elBox = document.querySelector('#box')

const machine = {
  initialState: 'inactive',
  states: {
    inactive: {
      on: {
        CLICK: 'active',
      },
    },
    active: {
      on: {
        CLICK: 'inactive',
      },
    },
  },
}

// Pure function that returns the next state,
// given the current state and sent event
function transition(state, event) {
  const nextState = machine.states[state].on?.[event] || state

  return nextState
}

// Keep track of your current state
let currentState = machine.initialState

function send(event) {
  // Determine the next value of `currentState`
  currentState = transition(currentState, event)

  console.log(currentState)

  elBox.dataset.state = currentState
}

elBox.addEventListener('click', () => {
  send('CLICK')
})
