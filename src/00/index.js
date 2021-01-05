const elOutput = document.querySelector('#output')

function output(object) {
  object.createdAt = Date.now()

  elOutput.innerHTML = JSON.stringify(object, null, 2)
}

console.log('Welcome to the XState workshop!')

const user = {
  name: 'Daniel Infante',
  company: 'infantito',
  interests: ['video games', 'action and drama series'],
}

const elButton = document.querySelector('#button')

output(user)

elButton.addEventListener('click', event => {
  output(user)

  event.target.setAttribute('disabled', 'true')
})
