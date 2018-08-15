import os
import json

import bson
from bson import json_util, BSON
import pymongo
from bottle import (route, template, get, static_file, run, post, request, put)


# получаем первоначальные данные из файла
with open('initialBase.json', 'r', encoding='utf-8') as usersFile:
    usersArray = json.load(usersFile)['data']

# получаем конфиг
with open('config.json', 'r', encoding='utf-8') as configFile:
    configStr = configFile.read()
    print(configStr)
    configData = json.loads(configStr)


MONGO_ADDR = configData['mongo_addr']
MONGO_PORT = configData['mongo_port']
RUN_HOST = configData['run_host']
RUN_PORT = configData['run_port']

client = pymongo.MongoClient(MONGO_ADDR, MONGO_PORT)
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
    return template('users', config=configStr + ';')

@route("/db")
def mainpage():
    return json_util.dumps(list(coll.find()))

@post("/db")
def mainpage():
    x = json.loads(request.body.readlines()[0])
    # print(list(coll.find({'email': x['email']}))[0])
    if not '_id' in x:
        # добавляем элемент
        coll.insert_one(x)
    else:
        # модифицируем элемент
        del x['_id']
        coll.update_one({'email': x['email']}, {'$set': x})


# запускаемся
createdb()
run(host=RUN_HOST, port=RUN_PORT, debug=True)