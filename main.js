var users = [{
                fio:'Иванов Иван',
                email: 'ivan@gmail.com',
                password:'*******',
                defaultpage:'page1',
                number:'123',
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
                number:'123',
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
                    number:'123',
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
                    number:'123',
                    roles:{
                        'role1':[{page: 'page1', access:['r','w']}, {page: 'page2', access:['r']}],
                        'role2':[{page: 'page1', access:['r']}],
                        }
                    }];

var app = {};
app.User = Backbone.Model.extend({
    defaults: {
            fio:'Noname',
            email: '',
            password:'',
            defaultpage:'',
            number:'',
            roles:{}
            }
});
app.UserList = Backbone.Collection.extend({
   model: app.User,
   localStorage: new Store("users")
});

// экземпляр коллекции
app.userList = new app.UserList();
app.UserView = Backbone.View.extend({
    tagName: 'div',
    template: _.template($('#user-template').html()),
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this; // включить цепочку вызовов
    }
});

   //--------------
   // Инициализация
   //--------------   

app.userView = new app.UserView();
