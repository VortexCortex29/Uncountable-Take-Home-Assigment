from flask import Flask, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
db_path = 'experiments.db'

def execute_query(query, parameters=None):
    with sqlite3.connect(db_path) as connection:
        cursor = connection.cursor()
        if parameters:
            cursor.execute(query, parameters)
        else:
            cursor.execute(query)

        cols = [column[0] for column in cursor.description]

        rows = cursor.fetchall()

    return cols, rows

@app.route('/api/allExperiments')
def get_all_experiments():
    query = '''
        SELECT inputs.*, outputs.*
        FROM inputs
        JOIN outputs ON inputs.experiment_name = outputs.experiment_name;
    '''
    columns, results = execute_query(query)
    data = [dict(zip(columns, row)) for row in results]
    return jsonify(data)

@app.route('/api/inputAttributeNames')
def get_input_columns():
    query = 'SELECT * FROM inputs LIMIT 1'
    cols, _ = execute_query(query)
    return jsonify(cols[1:])

@app.route('/api/outputAttributeNames')
def get_output_columns():
    query = 'SELECT * FROM outputs LIMIT 1'
    cols, _ = execute_query(query)
    return jsonify(cols[1:])

@app.route('/api/experiment/inputs/<string:experiment_name>')
def get_experiment_inputs(experiment_name):
    query = '''
        SELECT * from inputs WHERE inputs.experiment_name = ?;
    '''
    cols, rows = execute_query(query, [experiment_name])
    data = [dict(zip(cols, row)) for row in rows][0]
    data.pop('experiment_name')
    data = [{"attName": key, "attValue": value} for key, value in data.items()]
    return jsonify(data)

@app.route('/api/experiment/outputs/<string:experiment_name>')
def get_experiment_outputs(experiment_name):
    query = '''
        SELECT * from outputs WHERE outputs.experiment_name = ?;
    '''
    cols, rows = execute_query(query, [experiment_name])
    data = [dict(zip(cols, row)) for row in rows][0]
    data.pop('experiment_name')    
    data = [{"attName": key, "attValue": value} for key, value in data.items()]
    return jsonify(data)

@app.route('/api/experimentNames')
def get_all_experiment_names():
    query = 'SELECT experiment_name FROM inputs;'
    _, rows = execute_query(query)
    experiment_names = [row[0] for row in rows]
    return jsonify(experiment_names)

if __name__ == '__main__':
    app.run(port=3001)
