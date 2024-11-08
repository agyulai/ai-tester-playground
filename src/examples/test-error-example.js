import fetch from 'node-fetch';
import fs from 'fs/promises';

const errorMessage = `

`;

async function analyseTestError() {
    try {
        const response = await fetch('http://localhost:23500/ai/test-error/analyse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userMessage: errorMessage
            })
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }

        const responseJson = await response.json();
        const analysis = responseJson.analysis;

        await fs.writeFile('test-error.md', `<code>${analysis}<code>`);
        console.log('Response successfully saved to response.md');

    } catch (error) {
        console.error('Error:', error);
    }
}

analyseTestError();
