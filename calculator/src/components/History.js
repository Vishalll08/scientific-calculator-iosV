import React from 'react';

const History = ({ history }) => {
    return (
        <div className="history">
            {history.map((item, index) => (
                <div key={index} className="history-item">
                    {item}
                </div>
            ))}
        </div>
    );
};

export default History;