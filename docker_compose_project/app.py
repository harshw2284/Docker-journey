from flask import Flask
import mysql.connector
import redis
import os
import time

app = Flask(__name__)

# Wait for MySQL to start
time.sleep(10)

# MySQL connection
db = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)

cursor = db.cursor()

# Create table if not exists
cursor.execute("""
CREATE TABLE IF NOT EXISTS visits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    visit_count INT
)
""")

db.commit()

# Redis connection
redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST"),
    port=6379,
    decode_responses=True
)

@app.route("/")
def home():
    # Redis counter
    hits = redis_client.incr("hits")

    return f"""
    <h1>Hello from Flask + MySQL + Redis!</h1>
    <p>Redis Hits: {hits}</p>
    <p>MySQL Connected Successfully</p>
    """

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
