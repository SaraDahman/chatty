# Chatty

Chatty is a real-time chat application built with **React**, **Express**, **MongoDB**, and **Socket.IO**. It allows users to join chat rooms and communicate with others in real-time.

![Chatty Screenshot](https://i.ibb.co/jvsdv3XH/screencapture-localhost-5173-2025-03-09-16-17-00.png/800x400) <!-- Add a screenshot of your app here -->

## Features

- Real-time messaging using **Socket.IO**
- User authentication
- Create chat rooms
- Persistent message history with **MongoDB**
- User-friendly UI built with **React**

## Technologies Used

- **Frontend**: React
- **Backend**: Express (Node.js)
- **Database**: MongoDB
- **Real-time Communication**: Socket.IO
- **Styling**: CSS, Bootstrap

## Installation

Follow these steps to set up and run Chatty locally on your machine.

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud-based)
- npm or yarn

### Steps

1. **Clone the repository**

```bash
   git clone https://github.com/your-username/chatty.git
```

2. **Install dependencies**

```bash
cd chatty
cd client
npm install
cd ../server
npm install
```

2. **Set up environment variables in your server folder**

```.env
ATLAS_URI=mongodb://localhost:27017/chatty
SECRET_KEY=your_jwt_secret_key
```

3. **Start the servers in all folders**

```
npm run dev
```

4. **Open the app**

Visit `http://localhost:5173` in your browser to start using Chatty.

### Usage

- Sign up or log in to your account (if applicable).

- Create a new chat room or join an existing one.

- Start chatting with other users in real-time.
