class parent {
  foo() {}
}

// extends
class child extends parent {
  bar() {
    this.foo()
  }
}

// decorator
function addbar(target) {
  target.prototype.bar = function() {
    target.prototype.foo()
  }
}
@addbar
class parent {
  foo() {}
}
