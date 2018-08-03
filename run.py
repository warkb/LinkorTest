import os
from bottle import route, template, get, static_file, run

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

run(host='localhost', port=8080, debug=True)