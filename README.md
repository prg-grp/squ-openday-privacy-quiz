# Raspberry Quiz

## Overview

Raspberry Quiz is an interactive quiz application built with Next.js. The quiz focuses on data privacy topics and is designed to be engaging and educational.

## Features

- Interactive quiz questions about data privacy
- Integration with Raspberry Pi for physical button interactions

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/raspberry-quiz.git
   ```
2. Install dependencies:
   ```bash
   cd raspberry-quiz
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Usage with Raspberry Pi

To use this quiz interactively with a Raspberry Pi:

1. Connect physical buttons to the Raspberry Pi GPIO pins.
2. Run the provided Python script on the Raspberry Pi. This script will send keyboard inputs (1-4) for the respective GPIO ports.
3. Open the quiz in a web browser on the Raspberry Pi.
4. Use the physical buttons to interact with the quiz.

## License

This project is licensed under the AGPL License.
