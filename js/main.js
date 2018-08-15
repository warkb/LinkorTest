localStorage.clear();

var app = {}; // пространство имен нашего приложения
// функции сортировки для коллекции UserList
app.sortByFio = function (user) {
  // по имени
  return user.get('fio');
}
app.sortByNumber = function (user) {
  // сортировка по табельному номеру
  return user.get('number');
}
app.sortByEmail = function (user) {
  // сортировка по emeil
  return user.get('email');
}
var filterText = ''; // текст, который будет использоваться фильтром
app.User = Backbone.Model.extend({
    defaults: {
            fio:'Noname',
            email: '',
            password:'',
            defaultpage:'',
            number:'',
            isAdmin: false,
            isActive: true,
            roles:{}
            }
});
app.UserList = Backbone.Collection.extend({
   model: app.User,
   //localStorage: new Store("users"),
   url: 'http://localhost:8080/db', //url по которому можно обратиться к базе данных
});

// экземпляр коллекции
app.userList = new app.UserList();

// рендерим индивидуального юзера
app.UserView = Backbone.View.extend({
  tagName: 'div',
  className: 'usercell',
  template: _.template($('#user-template').html()),
  events: {
    "click": "editUser",
  },

  editUser: function () {
    // покажем форму редактирования
    $('html, body').animate({
        scrollTop: 0
    }, 100);

    document.location.replace("#");

    // чекбоксы в нужное состояние
    $("#pass").prop("disabled", false);
    $("#ackpass").prop("disabled", false);

    $("input[type=checkbox]").prop('checked', false);
    $("#add-change-user").removeClass("hidden");
    // заполняем форму согласно используемой модели
    document.getElementById('fio').value = this.model.attributes.fio;
    document.getElementById('number').value = this.model.attributes.number;
    document.getElementById('defpage').value = this.model.attributes.defaultpage;
    document.getElementById('email').value = this.model.attributes.email;
    document.getElementById('pass').value = this.model.attributes.pass;
    document.getElementById('ackpass').value = this.model.attributes.ackpass;
    // чекбоксы
    $("#box-1").prop('checked', this.model.attributes.isAdmin);
    $("#box-2").prop('checked', this.model.attributes.isActive);
    console.log(this.model.attributes.roles.role1[0].access);
    console.log(this.model.attributes.roles.role1[0].access === ['r','w']);
    $("#box-3").prop('checked', this.model.attributes.roles.role1[0].access.toString() == ['r','w'].toString());
    $("#box-4").prop('checked', this.model.attributes.roles.role2[0].access.toString() == ['r','w'].toString());
    $("#box-5").prop('checked', this.model.attributes.roles.role3[0].access.toString() == ['r','w'].toString());
    $("#box-6").prop('checked', this.model.attributes.roles.role4[0].access.toString() == ['r','w'].toString());

    // делаем форму изменения email недоступной для редактирования
    $("#email").prop("disabled", true);

    // если почта от гугла - делаем изменение пароля невозможным
    if (this.model.attributes.email.indexOf("@gmail.com") != -1) {
      $("#pass").prop("disabled", true);
      $("#ackpass").prop("disabled", true);
    }
  },
  render: function(){
    obj = this.model.toJSON();
    obj.isActiveText = obj.isActive ? 'Активен' : 'Не активен';
    obj.isActiveClass = obj.isActive ? 'isActiveClass' : 'isNotActiveClass';
    obj.role = obj.isAdmin ? 'Администратор' : 'Модератор';
    this.$el.html(this.template(obj));
    // работа фильтра
    var userInFilter = obj.email.toLowerCase().indexOf(filterText) != -1 || obj.fio.toLowerCase().indexOf(filterText) != -1
      || obj.number.toLowerCase().indexOf(filterText) != -1 || filterText === '';
    if (userInFilter) {
      return this; // включить цепочку вызовов
    }
    return '';
  }
});

///////////////-центральное View всего приложения-///////////////
user = app.User;
var view = new app.UserView({model: user});
app.AppView = Backbone.View.extend({
  el: '#maincentraldiv',
  initialize: function () {
    this.input = this.$('#filterInput');
    // когда новые элементы добавляются в коллекцию, 
    // мы рендерим их с помощью addOne
    app.userList.on('add', this.addOne, this);
    app.userList.on('reset', this.addAll, this);
    app.userList.fetch(); // Загружаем список из базы данных
  },

  // тут будет работа фильтра
  events: {
    'keyup #filterInput': 'doFilter'
  },
  addOne: function(mod){
    var view = new app.UserView({model: mod});
    $('#users').append(view.render().el);
  },
  addAll: function(){
    this.$('#users').html(''); // Очищаем список
    app.userList.each(this.addOne, this);
  },
  newAttributes: function(){
    return {
      title: this.input.val().trim(),
      completed: false
    }
  },
  doFilter: function (e) {
    filterText = this.input.val().trim();
    this.addAll();
  }
});
    
app.appView = new app.AppView();
///////////////////////////////////////////////////////////////////////////////////
///////////////-маршруты-///////////////
var Controller = Backbone.Router.extend({
    routes: {
        "!/sort-fio": "sortbyfio",
        "!/sort-number": "sortbynumber",
        "!/sort-email": "sortbyemail",
        "!/add-user": "addUser",
        "!/cancel-user": "cancelUser",
        "!/select-all-roles": "selectAllRoles",
        "!/save-user": "saveUser"
    },
    sortbyfio: function () {
      app.userList.comparator = app.sortByFio;
      app.userList.sort();
      app.appView.addAll();
    },
    sortbynumber: function () {
      app.userList.comparator = app.sortByNumber;
      app.userList.sort();
      app.appView.addAll();
    },
    sortbyemail: function () {
      app.userList.comparator = app.sortByEmail;
      app.userList.sort();
      app.appView.addAll();
    },
    addUser: function () {
      $('#add-change-user')[0].reset();
      // чекбоксы в нужное состояние
      $("#email").prop("disabled", false);
      $("#pass").prop("disabled", false);
      $("#ackpass").prop("disabled", false);

      $("input[type=checkbox]").prop('checked', false);
      $("#add-change-user").removeClass("hidden");
    },
    cancelUser: function () {
      $('#add-change-user')[0].reset();
      $("#add-change-user").addClass("hidden");
    },
    selectAllRoles: function () {
      $(".role-box").prop('checked', true);
      document.location.replace("#");
    },
    saveUser: function () {
      // добавление/сохранение пользователей
      var user = {};
      $('#add-change-user').find('input, textearea, select').each(function() {
        // добавим новое свойство к объекту user
        // имя свойства – значение атрибута name элемента
        // значение свойства – значение свойство value элемента
        user[this.name] = $(this).val();
      });
      user.isAdmin = document.getElementById('box-1').checked;
      user.isActive = document.getElementById('box-2').checked;
      user.isBookkeep = document.getElementById('box-3').checked;
      user.isDepot = document.getElementById('box-4').checked;
      user.isProduct = document.getElementById('box-5').checked;
      user.isManage = document.getElementById('box-6').checked;
      // проверяем, что табельный номер числами
      var re = /^[0-9]+$/;
      if (!re.test(user.number)) {
        alert("Табельный номер не цифрами!");
        document.location.replace("#");
        return;  
      }
      // проверяем email
      var re = /^[\d\w\-]{1,}\@[\d\w\-]{1,}\.\w+$/;
      if (!re.test(user.email)) {
        alert("Неправильный email!");
        document.location.replace("#");
        return;  
      }
      // проверяем, что email отсутствует в базе
      if (app.userList.pluck('email').indexOf(user.email) != -1 && !$("#email").prop("disabled")) {
        alert("Такой email уже есть в базе!");
        document.location.replace("#");
        return;  
      }
      // проверяем, что пароли совпадают
      if (user.pass != user.ackpass) {
        alert("Пароли не совпали!");
        document.location.replace("#");
        return;  
      }
      // json с новым юзером
      var newUser = {
        fio: user.fio,
        email: user.email,
        password: user.pass,
        defaultpage: user.defpage,
        number: user.number,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
        roles: {
          role1: [
          {
            page: 'page1',
            access: user.isBookkeep ? ['r','w'] : ['r']
          },
          {
            page: 'page2',
            access: user.isBookkeep ? ['r','w'] : ['r']
          }],
          role2: [
          {
            page: 'page1',
            access: user.isDepot ? ['r','w'] : ['r']
          },
          {
            page: 'page2',
            access: user.isDepot ? ['r','w'] : ['r']
          }],
          role3: [
          {
            page: 'page1',
            access: user.isProduct ? ['r','w'] : ['r']
          },
          {
            page: 'page2',
            access: user.isProduct ? ['r','w'] : ['r']
          }],
          role4: [
          {
            page: 'page1',
            access: user.isManage ? ['r','w'] : ['r']
          },
          {
            page: 'page2',
            access: user.isManage ? ['r','w'] : ['r']
          }],
        }
      }
      // добавляем нового пользователя в коллекцию
      if (!$("#email").prop("disabled")) {
        // добавляем пользователя
        app.userList.create(newUser);
      }
      else {
        var filteredCollection = app.userList.filter(function (item) {
          return item.get('email') == document.getElementById('email').value;
        });
        var curModel = filteredCollection[0];
        console.log('obj');
        console.log(curModel);
        curModel.set(newUser);
        curModel.save();
        // перерисовываем
        app.appView.addAll();
      }
      $("#add-change-user").addClass("hidden");
      document.location.replace("#");  
    }
});

app.controller = new Controller(); // Создаём контроллер
Backbone.history.start();  // Запускаем HTML5 History push    
// app.appView = new app.AppView();

// добавляем пользователей в коллекцию
// users.forEach(function (item) {
//     app.userList.create(item);
// })
