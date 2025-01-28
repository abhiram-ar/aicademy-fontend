# AIcademy Frontend

AIcademy is an LMS platform similar to Udemy, where students can access high-quality courses at affordable rates, and teachers can earn by selling their courses. AIcademy acts as a bridge between teachers and students, offering unique AI features to enhance the learning experience.

## Overview

### Project Specification
AIcademy leverages Retrieval Augmented Generation (RAG) to address students' doubts by referring to the context of the video, ensuring that answers are contextually relevant to the course content.

### Project Requirements
- **Frontend**: React with Vite for tooling
- **State Management**: Redux Toolkit, RTK Query for fetching and caching
- **Backend**: Express.js, Node.js, Nginx
- **Database**: MongoDB with Mongoose as ODM, Qdrant as Vector Database
- **Storage**: AWS S3 (V3 SDK for Node.js) with Adaptive Bitrate streaming for videos
- **Tech Stack**: MERN (MongoDB, Express.js, React, Node.js), Rabbitmq, Langchain

### Features
- AI-powered doubt resolution using RAG
- High-quality courses from world-class teachers
- Affordable pricing for students
- Secure video storage and Adaptive Bitrate streaming
- Efficient course upload process reducing server load

## Repository Structure
The repository primarily consists of TypeScript code along with some CSS, HTML, and JavaScript files.

### Languages Used
- TypeScript: 98.9%
- CSS
- HTML
- JavaScript

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/abhiram-ar/aicademy-fontend.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Contributing
We welcome contributions to the AIcademy Backend project. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with a clear message.
4. Push your changes to your fork.
5. ubmit a pull request detailing your changes.

## License
This project is licensed under the MIT License.