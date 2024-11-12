import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import ThemeSwitcher from './ThemeSwitcher';
import History from './History';
import ConfettiExplosion from 'react-confetti-explosion';

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [memory, setMemory] = useState(0);
    const [confetti, setConfetti] = useState(false);
    const [theme, setTheme] = useState('light');
    const [history, setHistory] = useState([]);
    const [angleUnit, setAngleUnit] = useState('deg'); // State to track angle unit

    const handleButtonClick = (label) => {
        if (label === 'C') {
            setDisplayValue('0');
            return;
        }

        if (label === 'Clear History') {
            setHistory([]);
            return;
        }

        if (label === '=') {
            try {
                // Replace custom operators with JavaScript operators
                const sanitizedInput = displayValue
                    .replace(/×/g, '*')
                    .replace(/÷/g, '/')
                    .replace(/±/g, '+')
                    .replace(/−/g, '-')
                    .replace(/√/g, 'Math.sqrt')
                    .replace(/\^/g, '**')
                    .replace(/(\d+)%/g, '($1/100)');

                const result = eval(sanitizedInput);
                if (displayValue.includes('2') && displayValue.includes('6')) {
                    setConfetti(true);
                    setTimeout(() => setConfetti(false), 3000);
                }
                setHistory([...history, `${displayValue} = ${result}`]);
                setDisplayValue(String(result));
            } catch (error) {
                setDisplayValue('Error');
            }
            return;
        }

        if (label === '%') {
            try {
                const result = parseFloat(displayValue) / 100;
                setDisplayValue(String(result));
            } catch (error) {
                setDisplayValue('Error');
            }
            return;
        }

        // Ensure we don't start with multiple zeros
        if (displayValue === '0' && label === '0') {
            return;
        }

        setDisplayValue(prev => (prev === '0' ? label : prev + label));
    };

    // Handle memory buttons operations
    const handleMemoryClick = (label) => {
        switch (label) {
            case 'mc':
                setMemory(0);
                break;
            case 'm+':
                setMemory(memory + parseFloat(displayValue));
                break;
            case 'm-':
                setMemory(memory - parseFloat(displayValue));
                break;
            case 'mr':
                setDisplayValue(String(memory));
                break;
            default:
                break;
        }
    };

    // Handle scientific functions and special operators
    const handleScientificClick = (label) => {
        switch (label) {
            case '2nd':
                // Toggle between primary and secondary functions
                // Implement logic here if needed
                break;
            case 'x²':
                setDisplayValue(String(Math.pow(parseFloat(displayValue), 2)));
                break;
            case 'x³':
                setDisplayValue(String(Math.pow(parseFloat(displayValue), 3)));
                break;
            case 'xʸ':
                setDisplayValue(prev => prev + '^');
                break;
            case 'eˣ':
                setDisplayValue(String(Math.exp(parseFloat(displayValue))));
                break;
            case '10ˣ':
                setDisplayValue(String(Math.pow(10, parseFloat(displayValue))));
                break;
            case '1/x':
                setDisplayValue(String(1 / parseFloat(displayValue)));
                break;
            case '2√x':
                setDisplayValue(String(Math.sqrt(parseFloat(displayValue))));
                break;
            case '3√x':
                setDisplayValue(String(Math.pow(parseFloat(displayValue), 1 / 3)));
                break;
            case 'y√x':
                setDisplayValue(prev => prev + '√');
                break;
            case 'ln':
                setDisplayValue(String(Math.log(parseFloat(displayValue))));
                break;
            case 'log₁₀':
                setDisplayValue(String(Math.log10(parseFloat(displayValue))));
                break;
            case 'x!':
                setDisplayValue(String(factorial(parseFloat(displayValue))));
                break;
            case 'sin':
                setDisplayValue(String(Math.sin(convertAngle(parseFloat(displayValue)))));
                break;
            case 'cos':
                setDisplayValue(String(Math.cos(convertAngle(parseFloat(displayValue)))));
                break;
            case 'tan':
                setDisplayValue(String(Math.tan(convertAngle(parseFloat(displayValue)))));
                break;
            case 'e':
                setDisplayValue(String(Math.E));
                break;
            case 'EE':
                setDisplayValue(prev => prev + 'e');
                break;
            case 'Rad':
                // Toggle between radians and degrees
                setAngleUnit(prev => (prev === 'deg' ? 'rad' : 'deg'));
                break;
            case 'sinh':
                setDisplayValue(String(Math.sinh(parseFloat(displayValue))));
                break;
            case 'cosh':
                setDisplayValue(String(Math.cosh(parseFloat(displayValue))));
                break;
            case 'tanh':
                setDisplayValue(String(Math.tanh(parseFloat(displayValue))));
                break;
            case 'π':
                setDisplayValue(String(Math.PI));
                break;
            case 'Rand':
                setDisplayValue(String(Math.random()));
                break;
            default:
                break;
        }
    };

    // Toggle between light and dark theme
    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    // Convert angle between radians and degrees
    const convertAngle = (angle) => {
        return angleUnit === 'deg' ? angle * (Math.PI / 180) : angle;
    };

    // List of buttons on the calculator with labels and classNames
    const buttons = [
        { label: '(', className: 'special' },
        { label: ')', className: 'special' },
        { label: 'mc', className: 'special' },
        { label: 'm+', className: 'special' },
        { label: 'm-', className: 'special' },
        { label: 'mr', className: 'special' },
        { label: 'C', className: 'special' },
        { label: '+/-', className: 'special' },
        { label: '%', className: 'special' },
        { label: '÷', className: 'orange' },
        { label: '2nd', className: 'special' },
        { label: 'x²', className: 'special' },
        { label: 'x³', className: 'special' },
        { label: 'xʸ', className: 'special' },
        { label: 'eˣ', className: 'special' },
        { label: '10ˣ', className: 'special' },
        { label: '7', className: 'light' },
        { label: '8', className: 'light' },
        { label: '9', className: 'light' },
        { label: '×', className: 'orange' },
        { label: '1/x', className: 'special' },
        { label: '2√x', className: 'special' },
        { label: '3√x', className: 'special' },
        { label: 'y√x', className: 'special' },
        { label: 'ln', className: 'special' },
        { label: 'log₁₀', className: 'special' },
        { label: '4', className: 'light' },
        { label: '5', className: 'light' },
        { label: '6', className: 'light' },
        { label: '−', className: 'orange' },
        { label: 'x!', className: 'special' },
        { label: 'sin', className: 'special' },
        { label: 'cos', className: 'special' },
        { label: 'tan', className: 'special' },
        { label: 'e', className: 'special' },
        { label: 'EE', className: 'special' },
        { label: '1', className: 'light' },
        { label: '2', className: 'light' },
        { label: '3', className: 'light' },
        { label: '+', className: 'orange' },
        { label: 'Rad', className: 'special' },
        { label: 'sinh', className: 'special' },
        { label: 'cosh', className: 'special' },
        { label: 'tanh', className: 'special' },
        { label: 'π', className: 'special' },
        { label: 'Rand', className: 'special' },
        { label: '0', className: 'light' },
        { label: '.', className: 'light' },
        { label: 'Clear History', className: 'light' },
        { label: '=', className: 'orange' }
    ];

    // Function to calculate factorial
    const factorial = (n) => {
        if (n === 0 || n === 1)
            return 1;
        for (let i = n - 1; i >= 1; i--) {
            n *= i;
        }
        return n;
    };

    // Render the calculator components
    return (
        <div className={`calculator ${theme === 'dark' ? 'dark-theme' : ''}`}>
            {confetti && <ConfettiExplosion />}
            <Display value={displayValue} />
            <div className="button-container">
                {buttons.map(({ label, className }) => (
                    <Button
                        key={label}
                        label={label}
                        onClick={
                            ['mc', 'm+', 'm-', 'mr'].includes(label) ? handleMemoryClick :
                            ['2nd', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '1/x', '2√x', '3√x', 'y√x', 'ln', 'log₁₀',
                                'x!', 'sin', 'cos', 'tan', 'e', 'EE', 'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand']
                                .includes(label) ? handleScientificClick :
                            handleButtonClick
                        }
                        className={className}
                    />
                ))}
            </div>
            <ThemeSwitcher onToggleTheme={toggleTheme} />
            <History history={history} />
        </div>
    );
};

export default Calculator;
