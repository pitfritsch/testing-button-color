import { useState } from 'react';
import './App.css';

export const getButtonColor = (enabled, clicked) => {
  if (!enabled) return 'gray'
  if (!clicked && enabled) return 'red'
  if (clicked && enabled) return 'blue'
}

function App() {

  const [clicked, setClicked] = useState(false)
  const [isEnabled, setIsEnabled] = useState(true)

  return (
    <div className="App">
      <button
        style={{
          backgroundColor: getButtonColor(isEnabled, clicked)
        }}
        onClick={() => setClicked(oldState => !oldState)}
        disabled={!isEnabled}
      >
        Change to {clicked ? 'red' : 'blue'}
      </button>
      <input
        id='disable-button-checkbox'
        type="checkbox"
        value={!isEnabled}
        onClick={() => setIsEnabled(oldState => !oldState)}
      />
      <label htmlFor="disable-button-checkbox">
        Disable button
      </label>
    </div>
  );
}

export default App;
