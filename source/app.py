import sqlite3
import re
from flask import Flask, render_template, request, jsonify

app = Flask('Monologue')
DB = 'database/msgstore.db'

@app.route('/')
def home():
    return render_template('index.html')

# -- API --

@app.route('/api/getchats',methods=['GET'])
def getchats():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    rows = c.execute(
        "SELECT chatname, chatid FROM chats"
    ).fetchall()
    return rows

@app.route('/api/getmsgs',methods=['GET'])
def getmsgs():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    rows = c.execute(
        "SELECT msg, timestamp FROM messages WHERE chatid = ?",
        (request.args.get('chatid'),)
    ).fetchall()
    return rows

@app.route('/api/newchat', methods=['POST'])
def newchat():
    print(request.get_json().get('chatid'))
    # if not re.match(r'^[a-zA-Z0-9_]+$', request.get_json().get('chatid')):
    #     return {"error": "invalid chat id"}, 400

    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute(
        f"INSERT INTO chats (chatid, chatname) VALUES (?, ?)",
        (request.get_json().get('chatid').split('@')[0],request.get_json().get('chatid').split('@')[1])
    )
    conn.commit()
    conn.close()

    return jsonify({"status": "ok"})

@app.route('/api/msgsend', methods=['POST'])
def msgsend():
    data = request.get_json()

    text1 = data.get("msg")
    text2 = data.get("timestamp")
    text3 = data.get("chatid")

    if not text1 or not text2 or not text3:
        return jsonify({"error": "missing fields"}), 400

    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute(
        "INSERT INTO messages (msg, timestamp, chatid) VALUES (?, ?, ?)",
        (text1, text2, text3)
    )
    conn.commit()
    conn.close()

    return jsonify({"status": "ok"})

# app.run(debug=True,host='0.0.0.0',port=4321)
