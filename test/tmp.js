var express = require('express');
var bodyParser = require('body-parser');

var app = express();
// создаем парсер данных в формате json
var jsonParser = bodyParser.json();

app.use(express.static(__dirname));
console.log(1);
app.post("/user", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.json(`${request.body.userName} - ${request.body.userAge}`);
});
console.log(2);
app.get("/", function (request, response) {
    response.send("<h1>Главная страница</h1>");
});
console.log(3);

app.listen(3000);