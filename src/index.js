import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from 'components/auth-context/AuthContext';
import LoadingContext from 'components/loading-context/LoadingContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContext>
      <BrowserRouter>
        <LoadingContext>
          <App />
        </LoadingContext>
      </BrowserRouter>
    </AuthContext>
  </React.StrictMode>,
);
reportWebVitals();
/*
 {
	"info": {
		"_postman_id": "562e0d72-43d4-44b7-8f9a-6c401b72fc43",
		"name": "goscrum-back",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "localhost:3000/auth/data",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:8080/auth/data",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"auth",
						"data"
					]
				}
			},
			"response": []
		},
		{
			"name": "localhost:3000/auth/register",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\"user\": {\n        \"userName\": \"federico\",\n        \"password\": \"123456789\",\n        \"email\": \"federico_puiggros@hotmail.com\",\n        \"teamID\": \"9cdbd108-f924-4383-947d-8f0c651d0dad\",\n        \"role\": \"Team Leader\",\n        \"continent\": \"America\",\n        \"region\": \"Otro\"\n}\t\t\t\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:8080/auth/register",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"auth",
						"register"
					]
				}
			},
			"response": []
		},
		{
			"name": "localhost:3000/auth/login",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n        \"userName\": \"federico\",\n        \"password\": \"123456789\"\n}\t\t\t\n",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:8080/auth/login",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"auth",
						"login"
					]
				}
			},
			"response": []
		},
		{
			"name": "localhost:3000/task/data",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZlZGVyaWNvX3B1aWdncm9zQGhvdG1haWwuY29tIiwicm9sZSI6IlRlYW0gTGVhZGVyIiwidXNlck5hbWUiOiJmZWRlcmljbyIsInRlYW1JZCI6IjljZGJkMTA4LWY5MjQtNDM4My05NDdkLThmMGM2NTFkMGRhZCIsInVzZXJJZCI6IjYyMTc4YjJjMmMwYWM4NTkzY2UwMzkzYiIsImlhdCI6MTY0NTcxMDE0NiwiZXhwIjoxNjQ1Nzk2NTQ2fQ.P1xx5KzLBrVW4-xYywllDMper30MVfwIOUgInNzabW0",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:8080/task/data",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"task",
						"data"
					]
				}
			},
			"response": []
		},
		{
			"name": "localhost:3000/task/",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZlZGVyaWNvX3B1aWdncm9zQGhvdG1haWwuY29tIiwicm9sZSI6IlRlYW0gTGVhZGVyIiwidXNlck5hbWUiOiJmZWRlcmljbyIsInRlYW1JZCI6IjljZGJkMTA4LWY5MjQtNDM4My05NDdkLThmMGM2NTFkMGRhZCIsInVzZXJJZCI6IjYyMTc4YjJjMmMwYWM4NTkzY2UwMzkzYiIsImlhdCI6MTY0NTcxMDE0NiwiZXhwIjoxNjQ1Nzk2NTQ2fQ.P1xx5KzLBrVW4-xYywllDMper30MVfwIOUgInNzabW0",
							"type": "string"
						}
					]
				},
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"task\":{\n      \"title\":\"hola manola\",\n      \"importance\":\"HIGH\",\n      \"status\":\"NEW\",\n      \"description\":\"HOLA\"\n    }\n\n\n\n\n\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:8080/task/",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"task",
						""
					]
				}
			},
			"response": []
		},
		{
			"name": "localhost:3000/task",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZlZGVyaWNvX3B1aWdncm9zQGhvdG1haWwuY29tIiwicm9sZSI6IlRlYW0gTGVhZGVyIiwidXNlck5hbWUiOiJmZWRlcmljbyIsInRlYW1JZCI6IjljZGJkMTA4LWY5MjQtNDM4My05NDdkLThmMGM2NTFkMGRhZCIsInVzZXJJZCI6IjYyMTc4YjJjMmMwYWM4NTkzY2UwMzkzYiIsImlhdCI6MTY0NTcxMDE0NiwiZXhwIjoxNjQ1Nzk2NTQ2fQ.P1xx5KzLBrVW4-xYywllDMper30MVfwIOUgInNzabW0",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:8080/task",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"task"
					]
				}
			},
			"response": []
		},
		{
			"name": "localhost:3000/task/me",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZlZGVyaWNvX3B1aWdncm9zQGhvdG1haWwuY29tIiwicm9sZSI6IlRlYW0gTGVhZGVyIiwidXNlck5hbWUiOiJmZWRlcmljbyIsInRlYW1JZCI6IjljZGJkMTA4LWY5MjQtNDM4My05NDdkLThmMGM2NTFkMGRhZCIsInVzZXJJZCI6IjYyMTc4YjJjMmMwYWM4NTkzY2UwMzkzYiIsImlhdCI6MTY0NTcxMDE0NiwiZXhwIjoxNjQ1Nzk2NTQ2fQ.P1xx5KzLBrVW4-xYywllDMper30MVfwIOUgInNzabW0",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:8080/task/me",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"task",
						"me"
					]
				}
			},
			"response": []
		},
		{
			"name": "localhost:3000/task/6216c54b5ac913216da8940e",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhcm1hbmNpdHlAZ21haWwuY29tIiwicm9sZSI6IlRlYW0gTGVhZGVyIiwidXNlck5hbWUiOiJmZWRleHgiLCJ0ZWFtSWQiOiI5Y2RiZDEwOC1mOTI0LTQzODMtOTQ3ZC04ZjBjNjUxZDBkYWQiLCJ1c2VySWQiOiI2MjE2YjNhMGI2ZjMyMTBlNzUxYjJjMTUiLCJpYXQiOjE2NDU2NTkwNjQsImV4cCI6MTY0NTc0NTQ2NH0.WS3cD9ZdgFUJFhphBwOusYl3fD_3EPHVp1HBtEci9VY",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:8080/task/62178b722c0ac8593ce0393c",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"task",
						"62178b722c0ac8593ce0393c"
					]
				}
			},
			"response": []
		},
		{
			"name": "localhost:3000/task/6216bb6d01088480ffd8783f",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhcm1hbmNpdHlAZ21haWwuY29tIiwicm9sZSI6IlRlYW0gTGVhZGVyIiwidXNlck5hbWUiOiJmZWRleHgiLCJ0ZWFtSWQiOiI5Y2RiZDEwOC1mOTI0LTQzODMtOTQ3ZC04ZjBjNjUxZDBkYWQiLCJ1c2VySWQiOiI2MjE2YjNhMGI2ZjMyMTBlNzUxYjJjMTUiLCJpYXQiOjE2NDU2NTU2MTQsImV4cCI6MTY0NTc0MjAxNH0.b78EyK4SLCsMfvrziKfSCtuD3fCOLPyu5lfDwDflFHc",
							"type": "string"
						}
					]
				},
				"method": "PATCH",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"task\":{\n      \"title\":\"hola de nuevo\",\n      \"importance\":\"HIGH\",\n      \"status\":\"NEW\",\n      \"description\":\"senior semaforo\"\n    }\n\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:8080/task/62178b722c0ac8593ce0393c",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"task",
						"62178b722c0ac8593ce0393c"
					]
				}
			},
			"response": []
		},
		{
			"name": "localhost:3000/task/6216c54b5ac913216da8940e",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhcm1hbmNpdHlAZ21haWwuY29tIiwicm9sZSI6IlRlYW0gTGVhZGVyIiwidXNlck5hbWUiOiJmZWRleHgiLCJ0ZWFtSWQiOiI5Y2RiZDEwOC1mOTI0LTQzODMtOTQ3ZC04ZjBjNjUxZDBkYWQiLCJ1c2VySWQiOiI2MjE2YjNhMGI2ZjMyMTBlNzUxYjJjMTUiLCJpYXQiOjE2NDU2NTkwNjQsImV4cCI6MTY0NTc0NTQ2NH0.WS3cD9ZdgFUJFhphBwOusYl3fD_3EPHVp1HBtEci9VY",
							"type": "string"
						}
					]
				},
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "localhost:8080/task/62178b722c0ac8593ce0393c",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"task",
						"62178b722c0ac8593ce0393c"
					]
				}
			},
			"response": []
		}
	]
}
 */
