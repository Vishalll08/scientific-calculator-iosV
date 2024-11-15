import React from 'react';

const ThemeSwitcher = ({ onToggleTheme }) => (
    <div className="theme-switcher">
        <button onClick={onToggleTheme}>Toggle Theme</button>
    </div>
);

export default ThemeSwitcher;