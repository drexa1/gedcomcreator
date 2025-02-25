import React from 'react';

function App() {
    return (
        <div className="body">
            <h1>Digitalize your family records into a family file</h1>
            <div className="instructions-wrapper">
                <h2>How to use the converter:</h2>
                <div className="instructions-container">
                    <div className="instruction-box">
                        <h3>Download</h3>
                        <p>Download the templates to fill-in.</p>
                    </div>
                    <div className="instruction-box">
                        <h3>Fill-in</h3>
                        <p>Fill-in each template with the family records.</p>
                    </div>
                    <div className="instruction-box">
                        <h3>Use</h3>
                        <p>Download your family file so you can visualize it anywhere.</p>
                    </div>
                </div>
            </div>
            <div className="upload-container">
                <div className="upload-box">
                    <input type="file" accept=".csv" />
                    <label>Upload individuals file</label>
                </div>
                <div className="upload-box">
                    <input type="file" accept=".csv" />
                    <label>Upload parents file</label>
                </div>
                <div className="upload-box">
                    <input type="file" accept=".csv" />
                    <label>Upload relationships file</label>
                </div>
            </div>
        </div>
    );
}

export default App;
