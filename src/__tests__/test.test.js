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



test('O parágrafo existe', () => {
  const list = screen.getAllByText("Me altere, por favor!");
  expect(list.length).toBe(1)
})

test('O botão existe', () => {
  const list = screen.getAllByText("Editar parágrafo");
  expect(list.length).toBe(1)
})

test('Ao clicar no botão o parágrafo se tornar editável', () => {
  const button = screen.getByText("Editar parágrafo");
  const paragrafo = screen.getByText("Me altere, por favor!");
  button.click()
  expect(paragrafo.contentEditable).toBe(true)  
})


test('Ao clicar no botão quando o parágrafo estiver editável deve torná-lo não editável', () => {
  const button = screen.getByText("Editar parágrafo");
  const paragrafo = screen.getByText("Me altere, por favor!");
  button.click()
  expect(paragrafo.contentEditable).toBe(true)  
  button.click()
  expect(paragrafo.contentEditable).toBe(false)  
})


test('Alterando o conteúdo do parágrafo', () => {
  let button = screen.getByText("Editar parágrafo");
  const paragrafo = screen.getByText("Me altere, por favor!");
  button.click()
  expect(paragrafo.contentEditable).toBe(true)
  button = screen.getByText('Salvar mudança')
  paragrafo.innerHTML = "AA"
  button.click()
  expect(paragrafo.contentEditable).toBe(false)  
  expect(paragrafo.innerHTML).toBe("AA")
  button = screen.getByText("Editar parágrafo")
  expect(button).not.toBeNull()
})