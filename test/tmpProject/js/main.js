// создаем пространство имен для нашего приложения
var app = {};

app.Todo = Backbone.Model.extend({
   defaults: {
      title: '',
      completed: false
   }
});

app.TodoList = Backbone.Collection.extend({
   model: app.Todo,
   localStorage: new Store("backbone-todo")
});

// экземпляр коллекции
app.todoList = new app.TodoList();

// рендерим индивидуальный todo-элемент списка (li)
    app.TodoView = Backbone.View.extend({
      tagName: 'li',
      template: _.template($('#item-template').html()),
      render: function(){
        console.log(this.model);
        this.$el.html(this.template(this.model.toJSON()));
        return this; // включить цепочку вызовов
      }
    });

todo = app.Todo;
var view = new app.TodoView({model: todo});

// рендер полного списка, вызывающего TodoView для каждого события
app.AppView = Backbone.View.extend({
  el: '#todoapp',
  initialize: function () {
    this.input = this.$('#new-todo');
    // когда новые элементы добавляются в коллекцию, 
    // мы рендерим их с помощью addOne
    app.todoList.on('add', this.addOne, this);
    app.todoList.on('reset', this.addAll, this);
    app.todoList.fetch(); // Загружаем список из local storage
  },
  events: {
    'keypress #new-todo': 'createTodoOnEnter'
  },
  createTodoOnEnter: function(e){// Код клавиши ENTER = 13
    if ( e.which !== 13 || !this.input.val().trim() ) { 
      return;
    }
    app.todoList.create(this.newAttributes());
    this.input.val(''); // Очищаем input
  },
  addOne: function(todo){
    var view = new app.TodoView({model: todo});
    $('#todo-list').append(view.render().el);
  },
  addAll: function(){
    this.$('#todo-list').html(''); // Очищаем список
    app.todoList.each(this.addOne, this);
  },
  newAttributes: function(){
    return {
      title: this.input.val().trim(),
      completed: false
    }
  }
});

app.appView = new app.AppView();