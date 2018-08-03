<!DOCTYPE html>
<html>
<head>
    <title>Страница пользователей</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="main.css">
    <!-- подключаем js библиотеки -->
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js" type="text/javascript"></script>
      <script src="backbone-min.js" type="text/javascript"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.16/backbone.localStorage-min.js" type="text/javascript"></script>
</head>
<body>
    <script type="text/template" id="user-template">
                <div class="row">
                    <div class="col-lg-9 name"><%- fio %> (<%- number %>)</div>
                    <div class="role col-lg-3"><%- role %></div>
                </div>
                <div class="row">
                    <div class="email  col-lg-9"><%- email %></div>
                <div class="status col-lg-3 <%- isActiveClass %>"><%- isActiveText %></div>
                </div>
    </script>
    <div class="col-lg-10 maincentraldiv" id="maincentraldiv">
        <div class="row upper-line top-bottom-margin">
            <div class="col-lg-6">
            <input type="text" name="search-user"
            placeholder="Поиск пользователей" id="filterInput">
            </div>
            <div class="col-lg-3"></div>
            <div class="col-lg-3" id="adduserscript"><a href="#">Добавить пользователя</a></div>
        </div>
        <div id="sort-buttons" class="top-bottom-margin">
                Сортировать по: <a href="#!/sort-fio">ФИО</a>
                <span id="midcell"><a href="#!/sort-number"><span class="middle-sort-button">Табельный номер</span></a></span><a href="#!/sort-email">Email</a>
        </div>
        <div id="users">
        </div>
    </div>
  <script type="text/javascript" src="main.js"></script>  

</body>
</html>