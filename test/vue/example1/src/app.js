new Vue({
  el: '#app',
  data: {
    sortparam: "",
    book: {
      id: 0,
      author: '',
      name: '',
      price: ''
    },
    books: [{
      id: 1,
      author: '曹雪芹',
      name: '红楼梦',
      price: 32.0
    }, {
      id: 2,
      author: '施耐庵',
      name: '水浒传',
      price: 30.0
    }, {
      id: '3',
      author: '罗贯中',
      name: '三国演义',
      price: 24.0
    }, {
      id: 4,
      author: '吴承恩',
      name: '西游记',
      price: 20.0
    }]
  },
  computed: {
      total: function(){
        var arr = this.books;
        var sum = 0
        for(var i = 0 ; i < arr.length ; i++){
          sum += arr[i].price
        }
        return sum
      }
  },
  methods: {
    addBook: function() {
      //计算书的id
      if(isNaN(this.book.price)){
        alert("请输入正确的价格！");
      }else{
        this.book.id = this.books.length + 1;
        this.books.push(this.book);
        //将input中的数据重置
        this.book = '';
      }
    },
    delBook: function(book) {
      this.books.$remove(book);
    },
    sortBy: function(sortparam) {
      this.sortparam = sortparam;
    }
  }
})
