function myDecorator(target: Function) {
    console.log(target());
}


@myDecorator
class Myclass {
    
    public myMethod() {
        return "Hello World";
    }
}

let myTest = new Myclass();
myTest.myMethod();
