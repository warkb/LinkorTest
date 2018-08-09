import os
import json
from bson import json_util

import pymongo
from bottle import route, template, get, static_file, run

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
    print(list(coll.find()))
    return json_util.dumps(list(coll.find()))

# запускаемся
createdb()
run(host='localhost', port=8080, debug=True)