import os
import json

import bson
from bson import json_util, BSON
import pymongo
from bottle import (route, template, get, static_file, run, post, request, put)

usersArray = [{
                'fio':'Иванов Иван',
                'email': 'ivan@gmail.com',
                'password':'*******',
                'defaultpage':'page1',
                'number':'123',
                'isAdmin': False,
                'isActive': True,
                'roles':{
                    'role1':[{'page': 'page1', 'access':['r','w']}, {'page': 'page2', 'access':['r']}],
                    'role2':[{'page': 'page1', 'access':['r']}],
                    'role3':[{'page': 'page1', 'access':['r','w']}, {'page': 'page2', 'access':['r']}],
                    'role4':[{'page': 'page1', 'access':['r']}],
                }
            },
            {
                'fio':'Сидоров Георгий',
                'email': 'sidorov@gmail.com',
                'password':'*******',
                'defaultpage':'page1',
                'number':'456',
                'isAdmin': True,
                'isActive': False,
                'roles':{
                    'role1':[{'page': 'page1', 'access':['r','w']}, {'page': 'page2', 'access':['r']}],
                    'role2':[{'page': 'page1', 'access':['r']}],
                    'role3':[{'page': 'page1', 'access':['r','w']}, {'page': 'page2', 'access':['r']}],
                    'role4':[{'page': 'page1', 'access':['r']}],
                    }
                },
            {
                'fio':'Гольдберг Сергей',
                'email': 'goldberg@gmail.com',
                'password':'*******',
                'defaultpage':'page1',
                'number':'789',
                'isAdmin': True,
                'isActive': True,
                'roles':{
                    'role1':[{'page': 'page1', 'access':['r','w']}, {'page': 'page2', 'access':['r']}],
                    'role2':[{'page': 'page1', 'access':['r']}],
                    'role3':[{'page': 'page1', 'access':['r','w']}, {'page': 'page2', 'access':['r']}],
                    'role4':[{'page': 'page1', 'access':['r']}],
                }
            },
            {
                'fio':'Франсист Николай',
                'email': 'fransist@gmail.com',
                'password':'*******',
                'defaultpage':'page1',
                'number':'101',
                'isAdmin': False,
                'isActive': False,
                'roles':{
                    'role1':[{'page': 'page1', 'access':['r','w']}, {'page': 'page2', 'access':['r']}],
                    'role2':[{'page': 'page1', 'access':['r']}],
                    'role3':[{'page': 'page1', 'access':['r','w']}, {'page': 'page2', 'access':['r']}],
                    'role4':[{'page': 'page1', 'access':['r']}],
                    }
            }]

client = pymongo.MongoClient('localhost', 27017)
db = client.linkordb
coll = db.users

def createdb():
    """Очищает и создает заново базу данных пользователей в mongo"""
    coll.remove({}) # очищаю коллекцию
    # наполняем базу данных
    for x in usersArray:
        coll.save(x)



# статические файлы
@get(r'/<filename:re:.*\.css>') 
def stylesheets(filename): 
    rootPath=os.path.join(os.getcwd(), 'css') 
    return static_file(filename, root=rootPath) 

@get(r'/<filename:re:.*\.js>') 
def stylesheets(filename): 
    rootPath=os.path.join(os.getcwd(), 'js') 
    return static_file(filename, root=rootPath)

@get(r'/<filename:re:.*\.png>') 
def stylesheets(filename): 
    rootPath=os.path.join(os.getcwd(), 'png') 
    return static_file(filename, root=rootPath)

@route("/")
def mainpage():
    return template('users')

@route("/db")
def mainpage():
    return json_util.dumps(list(coll.find()))

@post("/db")
def mainpage():
    print(request.body.readlines()[0])
    x = json.loads(request.body.readlines()[0])
    print('------------------')
    coll.insert_one(x)

@put("/db")
def mainpage():
    print('put!')
    print('put!')
    print('put!')
    print('put!')
    print('put!')

# запускаемся
createdb()
run(host='localhost', port=8080, debug=True)