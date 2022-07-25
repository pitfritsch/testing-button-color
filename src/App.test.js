import { fireEvent, render, screen } from '@testing-library/react';
import App, { getButtonColor } from './App';

test('the button has the correct initial color', () => {
  render(<App/>)
  
  const button = screen.getByRole('button', { name: 'Change to blue' })
  expect(button).toHaveStyle({
    backgroundColor: 'red'
  })

  fireEvent.click(button)
  expect(button).toHaveStyle({
    backgroundColor: 'blue'
  })
  expect(button.textContent).toBe('Change to red')
})

test('initial conditions', () => {
  render(<App/>)

  const button = screen.getByRole('button', { name: 'Change to blue' })
  expect(button).toBeEnabled()

  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()
})

test('the button disables after click checkbox', () => {
  render(<App/>)

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const button = screen.getByRole('button', { name: 'Change to blue' })

  fireEvent.click(checkbox)
  expect(button).toBeDisabled()

  fireEvent.click(checkbox)
  expect(button).toBeEnabled()
})

test('the button turns gray when disabled then back to red', () => {
  render(<App/>)

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const button = screen.getByRole('button', { name: 'Change to blue' })

  fireEvent.click(checkbox)
  expect(button).toBeDisabled()
  expect(button).toHaveStyle({ backgroundColor: 'gray' })
  
  fireEvent.click(checkbox)
  expect(button).toBeEnabled()
  expect(button).toHaveStyle({ backgroundColor: 'red' })
})

test('the button turns gray when disabled then back to blue if clicked', () => {
  render(<App/>)

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const button = screen.getByRole('button', { name: 'Change to blue' })

  fireEvent.click(button)
  expect(button).toHaveStyle({ backgroundColor: 'blue' })

  fireEvent.click(checkbox)
  expect(button).toBeDisabled()
  expect(button).toHaveStyle({ backgroundColor: 'gray' })

  fireEvent.click(checkbox)
  expect(button).toBeEnabled()
  expect(button).toHaveStyle({ backgroundColor: 'blue' })
})

describe('returning correct button color', () => {
  test('if button is enabled, but not clicked, must return red', () => {
    expect(getButtonColor(true, false)).toBe('red')
  })
  test('if button is enabled, and clicked, must return blue', () => {
    expect(getButtonColor(true, true)).toBe('blue')
  })
  test('if button is disabled, must return grey, independent if button is clicked or not', () => {
    expect(getButtonColor(false, true)).toBe('gray')
    expect(getButtonColor(false, false)).toBe('gray')
  })
})