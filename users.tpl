<!DOCTYPE html>
<html>
<head>
    <title>Страница пользователей</title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="source.css">
    <!-- подключаем js библиотеки -->
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
            <div class="col-lg-3" id="adduserscript"><a href="#!/add-user">Добавить пользователя</a></div>
        </div>
        <div id="sort-buttons" class="top-bottom-margin">
                Сортировать по: <a href="#!/sort-fio">ФИО</a>
                <span id="midcell"><a href="#!/sort-number"><span class="middle-sort-button">Табельный номер</span></a></span><a href="#!/sort-email">Email</a>
        </div>
        <!-- форма для добавления/изменения пользователей -->
        <form id="add-change-user" class="hidden">
            <div class="row">
                <div class="col-lg-3 fieldname">ФИО:</div>
                <input type="textfield" class="text col-lg-9 textfield" name="fio" id="fio">
            </div>
            <div class="row">
                <div class="col-lg-3 fieldname">Табельный номер:</div>
                <input type="textfield" class="text col-lg-9 textfield" name="number" id="number">
            </div><div class="row">
                <div class="col-lg-3 fieldname">Страница по умолчанию:</div>
                <select class="text col-lg-9 textfield" name="defpage" id="defpage">
                    <option value="page1">CRM</option>
                    <option value="page2">Rolepage</option>
                </select>
            </div><div class="row">
                <div class="col-lg-3 fieldname">Email:</div>
                <input type="textfield" class="text col-lg-9 textfield" name="email" id="email">
            </div><div class="row">
                <div class="col-lg-3 fieldname">Пароль:</div>
                <input type="password" class="text col-lg-9 textfield" name="pass" id="pass">
            </div><div class="row">
                <div class="col-lg-3 fieldname">Повторите пароль:</div>
                <input type="password" class="text col-lg-9 textfield" name="ackpass" id="ackpass">
            </div>
            <div class="row" id="admin-checkboxes">
                <div class="col-lg-3 fieldname"></div>
                <div class="col-lg-2">
                    <input type="checkbox" id="box-1" name="isAdmin">
                    <label for="box-1">Адмнистратор</label>
                </div>
                <div class="col-lg-2">
                    <input type="checkbox" id="box-2" name="isActive">
                    <label for="box-2">Активен</label>
                </div>
            </div>
            <!-- область формы с ролями -->
            <div class="row" id="roles-checkboxes">
                <div class="col-lg-3 fieldname"></div>
                <fieldset class="col-lg-9 fieldname">
                    <legend> Роли</legend>
                    <input type="checkbox" id="box-3" class="role-box" name="isBookkeep">
                    <label for="box-3">Бухгалтерия</label>

                    <input type="checkbox" id="box-4" class="role-box" name="isDepot">
                    <label for="box-4">Склад</label>

                    <input type="checkbox" id="box-5" class="role-box" name="isProduct">
                    <label for="box-5">Производство</label>

                    <input type="checkbox" id="box-6" class="role-box" name="isManage">
                    <label for="box-6">Менеджер</label>
                </fieldset>
            </div>
            <div class="row">
                <div class="col-lg-3 fieldname"></div>
                <a href="#!/select-all-roles" class="button">Выбрать все</a>
            </div>
            <div class="row">
                <div class="col-lg-3 fieldname"></div>
                <div class="col-lg-9 save-and-cancel-buttons">
                    <a href="#!/save-user" class="button">Сохранить</a>
                    <a href="#!/cancel-user" class="button">Отменить</a>
                </div>
            </div>
        </form>
        <div id="users">
        </div>
    </div>
        <script src="jquery-3.3.1.min.js" type="text/javascript"></script>
      <script src="underscore-min.js" type="text/javascript"></script>
      <script src="backbone-min.js" type="text/javascript"></script>
      <script src="backbone.localStorage-min.js" type="text/javascript"></script>
      <script type="text/javascript" src="main.js"></script>  

</body>
</html>