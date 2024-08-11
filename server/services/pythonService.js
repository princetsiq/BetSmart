import { spawn } from 'child_process';

export const callPythonScript = (scriptName, args = []) => {
  return new Promise((resolve, reject) => {
    const process = spawn('python', [scriptName, ...args]);
    let data = '';

    process.stdout.on('data', (chunk) => {
      data += chunk.toString();
    });

    process.stderr.on('data', (chunk) => {
      console.error(`Error: ${chunk}`);
    });

    process.on('close', (code) => {
      if (code !== 0) {
        reject(`Process exited with code ${code}`);
      } else {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (error) {
          reject(`Error parsing JSON: ${error.message}`);
        }
      }
    });
  });
};