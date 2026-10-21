# Trivia CLI Game

A Command Line Interface (CLI) trivia application built with Node.js.

## Overview
This project  presents multiple-choice questions sequentially, carries out a timer per question, provides immediate answer feedback, and shows a final breakdown of performance.

## Features
- Interactive terminal prompt using Node.js readline.
- Sequential questions stored as an array of objects.
- Asynchronous timer applying a 10-second countdown per question.
- Array iteration using .forEach() to summarize results.
- Input validation for choices 1 through 4.

## Getting Started

### Prerequisites
- Node.js installed on your machine.

### Installation & Run
1. Clone the repository:
2. Navigate into the directory:
3. Run the application:
   npm start
   # or
   node index.js

## Project Design
- **Data Structures**: Questions and options are maintained in an array of objects. Answers and state history are recorded in a separate array during execution.
- **Asynchronous Flow**: Uses `setTimeout` to limit question response time and `clearTimeout` when an answer is provided before expiration.