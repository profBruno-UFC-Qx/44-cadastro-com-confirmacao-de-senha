const fs = require('fs');
import {screen, fireEvent} from '@testing-library/dom'

beforeEach(() => {
  const fileContent = fs.readFileSync('src/index.html', 'utf8');
  const cssContent = fs.readFileSync('src/css/estilo.css', 'utf-8')
  

  const style = document.createElement("style")
  style.innerHTML = cssContent

  
  document.head.appendChild(style)

  document.body.innerHTML = fileContent
  
  const jsContent = fs.readFileSync('src/js/script.js', 'utf-8')
  const f = new Function('', `${jsContent}`)
  f()

});

afterEach(() => {
  // cleanup on exiting
   document.body.innerHTML = ""
   document.head.innerHTML = ""
});



test('O campo para o nome do usuário existe', () => {
  const textInputs = document.querySelectorAll('input[type="text"]');
  expect(textInputs.length).toBe(1)
})

test('O campo para o email do usuário existe', () => {
  const emailInputs = document.querySelectorAll('input[type="email"]');
  expect(emailInputs.length).toBe(1)
})

test('O campo para o senha e confirmação de senha existem', () => {
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  expect(passwordInputs.length).toBe(2)
})

test('O botão existe', () => {
  const button = document.querySelectorAll('[type="submit"]');
  expect(button.length).toBe(1)
})

test('O botão deve estar incialmente desabilitado', () => {
  const button = document.querySelector('[type="submit"]');
  expect(button.disabled).toBeDefined()
})

test('O botão deve estar habilitado somente quando todos os campos forem preenchidos', () => {
  const button = document.querySelector('[type="submit"]');
  expect(button.disabled).toBe(true)


  const textInput = document.querySelector('input[type="text"]');
  fireEvent.input(textInput, { target: { value: 'Bruno'}})
  expect(button.disabled).toBeDefined()

  const emailInput = document.querySelector('input[type="email"]');
  fireEvent.input(emailInput, { target: { value: 'Bruno@mail.com'}})
  expect(button.disabled).toBeDefined()

  const passwordInputs = document.querySelectorAll('input[type="password"]');
  fireEvent.input(passwordInputs[0], { target: { value: '123'}})
  expect(button.disabled).toBeDefined()

  fireEvent.input(passwordInputs[1], { target: { value: '123456'}})
  expect(button.disabled).toBeFalsy()
})


test('Uma mensagem deve ser mostrada quando as senhas não coincidem', () => {
  const button = document.querySelector('[type="submit"]');
  expect(button.disabled).toBe(true)


  const textInput = document.querySelector('input[type="text"]');
  fireEvent.input(textInput, { target: { value: 'Bruno'}})
  expect(button.disabled).toBeDefined()

  const emailInput = document.querySelector('input[type="email"]');
  fireEvent.input(emailInput, { target: { value: 'Bruno@mail.com'}})
  expect(button.disabled).toBeDefined()

  const passwordInputs = document.querySelectorAll('input[type="password"]');
  fireEvent.input(passwordInputs[0], { target: { value: '123'}})
  expect(button.disabled).toBeDefined()

  fireEvent.input(passwordInputs[1], { target: { value: '123456'}})
  expect(button.disabled).toBeFalsy()

  const invalid = document.querySelectorAll("input:invalid")
  expect(invalid.length).toBe(1)
  
})