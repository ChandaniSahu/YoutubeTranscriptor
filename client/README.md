# YouTube Transcriptor Web Application

This is a React web application that fetches transcripts from YouTube videos, summarizes them, generates MCQs from the transcript, and allows users to attempt the quiz with results. The app also supports features to listen to the transcript and copy content.

## Live Link
Check out the live version of the web applicaion here:
https://youtube-transcriptor.netlify.app


## Features

- Fetch YouTube Transcript: Extracts transcripts from YouTube videos using an API.

- Summarize Transcript: Summarizes the transcript into a shorter, more concise form.

- Generate MCQs: Automatically generates multiple-choice questions (MCQs) from the 
  transcript.

- Answer MCQs: Allows users to select answers and submit them.

- Result Calculation: Displays the total, correct, wrong, and unattempted answers.

- Copy Content: Users can copy the transcript or summary content.

- Speaker Icon: Users can listen to the transcript or summary content.

## Installation
To set up the project locally:

- Clone the Repository:
git clone https://github.com/ChandaniSahu/YoutubeTranscriptor.git

- Navigate to the project directory:
cd web-app-name

- Install Dependencies: 
npm install

- Start the development server:
npm start


- Environment Variables: 
Make sure to set up the following environment variable in your .env file:

- VITE_API_KEY: 
Your Google API key for accessing the Generative Language API (used for summarization).

- Run the Application: 
Start the development server by running:
npm run dev
The app should now be accessible at http://localhost:5173.


## Usage

- Enter YouTube URL: Paste the YouTube video URL into the input field to fetch its transcript.

- Summarize Transcript: Click "Summarize" to get a summarized version of the transcript.

- Generate MCQs: Click "Generate MCQs" to generate multiple-choice questions from the transcript.

- Answer Questions: Choose answers and submit them.

- View Results: After submitting, the results will show the total, correct, wrong, and unattempted questions.


## Icons Used

- React Icons: react-icons library is used for icons. Install it with npm install react-icons.

- FaCopy: Used for the copy functionality.

- FaVolumeUp: Used for the speaker (audio) functionality.


## Technologies Used

- React (frontend)

- Nodejs/Expressjs (backend)

- Axios (for API calls)

- Tailwind CSS (for styling)

- react-icons (for icons)

## License
This project is licensed under the MIT License - see the LICENSE file for details.

