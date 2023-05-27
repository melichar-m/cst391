import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

dotenv.config({ path: '.env'});

// Create an instance of the Express application.
const app = express();

// Set the port number for the application.
const port = 3000;

// Handle GET requests to the root path ('/').
app.get('/', (req: Request, res: Response) => {
    // Send the response with the string 'Hello World from TypeScript!' as the content.
    res.send('Hello World from TypeScript!');
});

// Start the application and listen for incoming requests on the specified port.
app.listen(port, () => {
    // Display a message in the console to indicate that the application is running.
    console.log(`Example app listening at http://localhost:${port}`);
});
