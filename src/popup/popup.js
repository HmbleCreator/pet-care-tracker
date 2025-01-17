// src/popup/popup.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PetProfile from './components/PetProfile';
import Reminders from './components/Reminders';
import HealthTracker from './components/HealthTracker';
import Reports from './components/Reports';
import './popup.css';
import './styles/themes/light.css'; // Default theme

class PopupApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'petProfile', // default view
      selectedPetId: null,
      theme: 'light' // default theme
    };
  }

  setView(view) {
    this.setState({ currentView: view });
  }

  setPetId(petId) {
    this.setState({ selectedPetId: petId });
  }

  toggleTheme() {
    const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
    this.setState({ theme: newTheme }, () => {
      document.documentElement.setAttribute('data-theme', newTheme);
      import(`./styles/themes/${newTheme}.css`);
    });
  }

  render() {
    const { currentView, selectedPetId } = this.state;
    return (
      <div>
        <nav>
          <button onClick={() => this.setView('petProfile')}>Pet Profile</button>
          <button onClick={() => this.setView('reminders')}>Reminders</button>
          <button onClick={() => this.setView('healthTracker')}>Health Tracker</button>
          <button onClick={() => this.setView('reports')}>Reports</button>
          <button onClick={() => this.toggleTheme()}>Toggle Theme</button>
        </nav>
        {currentView === 'petProfile' && <PetProfile petId={selectedPetId} onSave={() => this.setView('reminders')} onCancel={() => this.setView('reminders')} />}
        {currentView === 'reminders' && <Reminders petId={selectedPetId} />}
        {currentView === 'healthTracker' && <HealthTracker petId={selectedPetId} />}
        {currentView === 'reports' && <Reports petId={selectedPetId} />}
      </div>
    );
  }
}

ReactDOM.render(<PopupApp />, document.getElementById('app'));
