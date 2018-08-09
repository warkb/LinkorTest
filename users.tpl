<!DOCTYPE html>
<html>
<head>
    <title>Страница пользователей</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="main.css">
    <!-- подключаем js библиотеки -->
      <script src="jquery-3.3.1.min.js" type="text/javascript"></script>
      <script src="underscore-min.js" type="text/javascript"></script>
      <script src="backbone-min.js" type="text/javascript"></script>
      <script src="backbone.localStorage-min.js" type="text/javascript"></script>
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
    <!-- главный див с контентом -->
    <div class="col-lg-10 maincentraldiv" id="maincentraldiv">
        <!-- пользователи -->
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
        <!-- форма для добавления/изменения пользователей -->
        <form id="add-change-user" hidden>
            <div class="row">
                <div class="col-lg-3 fieldname">ФИО:</div>
                <input type="textfield" class="text col-lg-9 textfield" name="fio">
            </div>
            <div class="row">
                <div class="col-lg-3 fieldname">Табельный номер:</div>
                <input type="textfield" class="text col-lg-9 textfield" name="number">
            </div><div class="row">
                <div class="col-lg-3 fieldname">Страница по умолчанию:</div>
                <input type="textfield" class="text col-lg-9 textfield" name="defpage">
            </div><div class="row">
                <div class="col-lg-3 fieldname">Email:</div>
                <input type="textfield" class="text col-lg-9 textfield" name="email">
            </div><div class="row">
                <div class="col-lg-3 fieldname">Пароль:</div>
                <input type="password" class="text col-lg-9 textfield" name="pass">
            </div><div class="row">
                <div class="col-lg-3 fieldname">Повторите пароль:</div>
                <input type="password" class="text col-lg-9 textfield" name="ackpass">
            </div>
        </form>
        <div id="users">
        </div>
    </div>
  <script type="text/javascript" src="main.js"></script>  

</body>
</html>