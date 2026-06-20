import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders the app title', () => {
  render(<App />);
  expect(screen.getByText(/Task Manager/i)).toBeInTheDocument();
});

test('renders the initial seed tasks', () => {
  render(<App />);
  expect(screen.getByText(/Set up the repository/i)).toBeInTheDocument();
  expect(screen.getByText(/Configure GitHub Actions/i)).toBeInTheDocument();
  expect(screen.getByText(/Deploy to GitHub Pages/i)).toBeInTheDocument();
});

test('adds a new task when the form is submitted', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Add a new task/i);
  const button = screen.getByText(/^Add$/i);

  fireEvent.change(input, { target: { value: 'Write documentation' } });
  fireEvent.click(button);

  expect(screen.getByText(/Write documentation/i)).toBeInTheDocument();
});

test('does not add an empty task', () => {
  render(<App />);
  const button = screen.getByText(/^Add$/i);
  const tasksBefore = screen.getAllByRole('listitem').length;

  fireEvent.click(button);

  const tasksAfter = screen.getAllByRole('listitem').length;
  expect(tasksAfter).toBe(tasksBefore);
});

test('toggles a task as done when its checkbox is clicked', () => {
  render(<App />);
  const taskText = screen.getByText(/Deploy to GitHub Pages/i);
  const checkbox = taskText.closest('label').querySelector('input[type="checkbox"]');

  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test('deletes a task when the delete button is clicked', () => {
  render(<App />);
  const deleteBtn = screen.getByLabelText(/Delete Set up the repository/i);

  fireEvent.click(deleteBtn);

  expect(screen.queryByText(/Set up the repository/i)).not.toBeInTheDocument();
});

test('filters to show only active tasks', () => {
  render(<App />);
  fireEvent.click(screen.getByText('Active'));

  expect(screen.queryByText(/Set up the repository/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Deploy to GitHub Pages/i)).toBeInTheDocument();
});

test('filters to show only done tasks', () => {
  render(<App />);
  fireEvent.click(screen.getByText('Done'));

  expect(screen.getByText(/Set up the repository/i)).toBeInTheDocument();
  expect(screen.queryByText(/Deploy to GitHub Pages/i)).not.toBeInTheDocument();
});

test('shows the correct remaining task count', () => {
  render(<App />);
  expect(screen.getByText(/1 task remaining/i)).toBeInTheDocument();
});
