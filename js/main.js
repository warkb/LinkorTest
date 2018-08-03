localStorage.clear();
var users = [{
                fio:'Иванов Иван',
                email: 'ivan@gmail.com',
                password:'*******',
                defaultpage:'page1',
                number:'123',
                isAdmin: false,
                isActive: true,
                roles:{
                    'role1':[{page: 'page1', access:['r','w']}, {page: 'page2', access:['r']}],
                    'role2':[{page: 'page1', access:['r']}],
                }
            },
            {
                fio:'Сидоров Георгий',
                email: 'sidorov@gmail.com',
                password:'*******',
                defaultpage:'page1',
                number:'456',
                isAdmin: true,
                isActive: false,
                roles:{
                    'role1':[{page: 'page1', access:['r','w']}, {page: 'page2', access:['r']}],
                    'role2':[{page: 'page1', access:['r']}],
                    }
                },
            {
                fio:'Гольдберг Сергей',
                email: 'goldberg@gmail.com',
                password:'*******',
                defaultpage:'page1',
                number:'789',
                isAdmin: true,
                isActive: true,
                roles:{
                    'role1':[{page: 'page1', access:['r','w']}, {page: 'page2', access:['r']}],
                    'role2':[{page: 'page1', access:['r']}],
                    }
                },
            {
                fio:'Франсист Николай',
                email: 'fransist@gmail.com',
                password:'*******',
                defaultpage:'page1',
                number:'101',
                isAdmin: false,
                isActive: false,
                roles:{
                    'role1':[{page: 'page1', access:['r','w']}, {page: 'page2', access:['r']}],
                    'role2':[{page: 'page1', access:['r']}],
                }
            }];

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
   localStorage: new Store("users")
});

// экземпляр коллекции
app.userList = new app.UserList();

// рендерим индивидуального юзера
app.UserView = Backbone.View.extend({
  tagName: 'div',
  className: 'usercell',
  template: _.template($('#user-template').html()),
  render: function(){
    obj = this.model.toJSON();
    obj.isActiveText = obj.isActive ? 'Активен' : 'Не активен';
    obj.isActiveClass = obj.isActive ? 'isActiveClass' : 'isNotActiveClass';
    obj.role = obj.isAdmin ? 'Администратор' : 'Модератор';
    this.$el.html(this.template(obj));
    // работа фильтра
    var userInFilter = obj.email.indexOf(filterText) != -1 || obj.fio.indexOf(filterText) != -1
      || obj.number.indexOf(filterText) != -1 || filterText === '';
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
    app.userList.fetch(); // Загружаем список из local storage
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
    },
    sortbyfio: function () {
      console.log('fio');
      app.userList.comparator = app.sortByFio;
      app.userList.sort();
      app.appView.addAll();
    },
    sortbynumber: function () {
      console.log('num');
      app.userList.comparator = app.sortByNumber;
      app.userList.sort();
      app.appView.addAll();
    },
    sortbyemail: function () {
      console.log('email');
      app.userList.comparator = app.sortByEmail;
      app.userList.sort();
      app.appView.addAll();
    }
});

app.controller = new Controller(); // Создаём контроллер\
Backbone.history.start();  // Запускаем HTML5 History push    
// app.appView = new app.AppView();

// добавляем пользователей в коллекцию
users.forEach(function (item) {
    app.userList.create(item);
})

