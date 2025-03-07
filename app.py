from flask import Flask, render_template

app = Flask(__name__)

# Home page (Index)
@app.route('/')
def index():
    return render_template('index.html')

# Authors page
@app.route('/authors')
def authors():
    return render_template('authors.html')

# Procedure page
@app.route('/procedure')
def procedure():
    return render_template('procedure.html')

# Results page
@app.route('/results')
def results():
    return render_template('results.html')

# Main entry point
if __name__ == '__main__':
    app.run(debug=False, host='192.168.86.31', port=5000)
