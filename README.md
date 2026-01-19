# 💬 Monologue

**Monologue** is a lightweight, self-hosted note-taking application designed for those who find comfort in the familiar interface of a messaging app. Instead of a traditional text editor, Monologue provides a private chat UI where you can "message" yourself to journal, vent, or log thoughts in a chronological stream.

## ✨ Features

* **Chat-Based Journaling:** A familiar, non-intimidating messaging interface for quick note-taking and venting.
* **Multiple Channels:** Organize your thoughts into different categories or "chats" by naming them during creation.
* **Self-Hosted & Private:** Built with Python (Flask) and SQLite, giving you full ownership of your data on your own server.
* **Persistent History:** All messages are stored with timestamps, allowing you to scroll back through your thought history.
* **Clean UI:** A modern, dark-themed interface built with Tailwind-style utility classes.

## 🛠️ Tech Stack

* **Backend:** Python 3, Flask
* **Database:** SQLite
* **Frontend:** Vanilla JavaScript, HTML5, CSS (Tailwind CSS classes)

## 🚀 Installation & Setup

### 1. Prerequisites
Ensure you have Python installed. You will also need the `Flask` library.

```bash
pip install flask

```

### 2. Database Initialization

Create a directory named `database` and an SQLite file named `msgstore.db`. Run the following SQL to set up your tables:

```sql
CREATE TABLE chats (
    chatname TEXT,
    chatid TEXT PRIMARY KEY
);

CREATE TABLE messages (
    msg TEXT,
    timestamp TEXT,
    chatid TEXT,
    FOREIGN KEY(chatid) REFERENCES chats(chatid)
);

```

### 3. Run the Application

```bash
python app.py

```

The app will start on `http://0.0.0.0:4321` (or your local equivalent).

## 📁 Project Structure

* `app.py`: The Flask server handling API requests for fetching chats and sending messages.
* `index.js`: The frontend logic managing UI updates, real-time message rendering, and chat switching.
* `database/`: Directory for your `msgstore.db` SQLite file.
* `templates/`: Contains the `index.html` file.

---

### Why Monologue?

Traditional note-taking apps can feel formal and high-pressure. **Monologue** treats your inner thoughts like a conversation. Whether you're clearing your head after a long day or quickly jotting down a midnight idea, just send a message to yourself.

```