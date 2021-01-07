import { createMachine, interpret } from 'xstate'

/**
 * Creating a machine
 * - It's a stateless pure object
 * - It's immutable
 * - It's a blueprint
 */
const feedbackMachine = createMachine({
  initial: 'question',
  states: {
    question: {
      on: {
        /**
         * Adding transitions
         */
        // object syntax
        CLICK_GOOD: {
          target: 'thanks',
        },
        // shorthand syntax
        CLICK_BAD: 'form',
      },
    },
    form: {
      on: {
        SUBMIT: 'thanks',
      },
    },
    thanks: {
      on: {
        CLOSE: 'closed',
      },
    },
    closed: {
      type: 'final',
    },
  },
})

// Create a 'service' instance
const feedbackService = interpret(feedbackMachine)

// listener that receives the current state on every transition
feedbackService.onTransition(state => {
  console.log(state.value)
})

// Start service because It didn't start yet
feedbackService.start()

feedbackService.send({
  type: 'CLICK_GOOD',
})
