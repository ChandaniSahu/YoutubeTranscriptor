# YouTube Transcriptor Web Application

## Overview
This is a React-based web application that accepts YouTube URLs, paragraphs, or topic names. It summarizes or explains the content, generates multiple-choice questions (MCQs), lets users take a quiz, and allows them to send the result to their Gmail. Users can also listen to and copy the content.

## Live Link
https://youtube-transcriptor.netlify.app

## Features

### Smart Input Support
- Accepts three types of inputs: YouTube video URLs, custom paragraphs, and topic names.
- Detects whether to summarize a paragraph or explain a topic.
- Shows error if the input is invalid or meaningless.

### Transcript and Summary
- Fetches transcript from YouTube videos.
- Summarizes paragraphs or explains topics using AI.

### Quiz Generation and Result
- Generates MCQs from the transcript or explanation.
- Users can answer questions and submit the quiz.
- Shows total, correct, wrong, and unattempted questions.

### Send Results to Gmail
- Users can send their quiz results via email.
- Email content includes greeting, questions, user answers, and a friendly layout.

### Content Interaction
- Listen to the transcript or summary using speaker icon.
- Copy content using copy icon.

## Installation

### Clone the Repository
git clone https://github.com/ChandaniSahu/YoutubeTranscriptor.git

### Navigate to the Project Folder
cd YoutubeTranscriptor/client

### Install Dependencies
npm install

### Setup Environment Variable
Create a `.env` file in the root and add the following:

VITE_API_KEY=your_google_api_key

### Run the Application
npm run dev  
Visit http://localhost:5173 to view the app locally.

## Technologies Used
- React  
- Axios  
- Tailwind CSS  
- React Icons  
- Google Generative AI API (Gemini)  
- YouTube Transcript API

## Icons Used
- FaCopy – for copy button  
- FaVolumeUp – for speaker button  
- FaEnvelope – for sending result to email  

## How to Use
1. Enter a YouTube URL, paragraph, or topic.
2. Click on "Summarize" to get results.
3. Click "Generate MCQs" to create quiz.
4. Select answers and submit.
5. See your results.
6. Click "Send to Gmail" to receive the result in your inbox.

## License
This project is licensed under the MIT License. See the LICENSE file for more information.
