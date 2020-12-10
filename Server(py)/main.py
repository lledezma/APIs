from flask import Flask
from flask_restful import Api, Resource, reqparse, abort
import json

app = Flask(__name__)
api = Api(app)

with open('MOCK_DATA.json') as f:
	allRecords = json.load(f)

def abort_noRecord(id):
	abort(404, message="id is not valid...")


def abort_existsRecord(id):
	if id in allRecords:
		abort(409, message="id already exists with that id..." )

class Records(Resource):

	def get(self,id):
		for record in allRecords:
			if record['id'] == id:
				return record

		abort_noRecord(id)
		

api.add_resource(Records, "/search/<int:id>")

app.run(port=3000, host="localhost")

if __name__ == "__main__":
	app.run(debug=True)