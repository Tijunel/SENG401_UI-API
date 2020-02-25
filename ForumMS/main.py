from flask import Flask
#Start command, query, and event handler from here
#Use SocketIO from python
app = Flask(__name__)

@app.route("/")
def hello():
  return "Hello World!"

if __name__ == "__main__":
  app.run()