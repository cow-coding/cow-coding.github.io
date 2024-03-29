---
layout: post
date: 2022-01-18
title: "[BoostCamp AI Tech / Level 1 - Python/PyTorch] Day2 - Python OOP"
categories: [NAVER BoostCamp AI Tech, Level 1 - Python/PyTorch]
tags: [Python, NAVER, BoostCamp, AI Tech, OOP, Python, Basic]
math: true
---
# Python : Object-Oriented Programming

---
## OOP 기본 개념
- 객체 : 속성(attribute) + 행동(action)으로 구성되어있음
    - 속성(attribute)는 일반적으로 변수
    - 행동(action)은 method
- 클래스 : 객체의 설계도
    - 흔히들 많이 쓰는 비유는 붕어빵틀을 클래스, 붕어빵을 객체라 하는데 개인적으로 좋아하진 않는 비유이다. 그거 하나로는 뒤에 오는 내용들을 통틀어 설명하기 어려움.
    - 그래서 나는 보통 제품 사용설명서 혹은 제품 조립설명서라고 비유한다.

## Rule
파이썬의 표준 작성법인 PEP-8에 따르면 변수, 함수명은 Snake case로 작성하고 클래스명은 Camel case로 작성한다. 

- 변수(variable) / 함수(function)
    ```python
    person_name = "park"

    def add_number(a, b):
        return a+b
    ```
    - 변수와 함수는 snake case로 작성함이 원칙이다.

- 클래스(class)
    ```python
    class Person(object):
        def __init__(self):
            self.name = "park"

        def about_me(self):
            print(f"My name is {self.name}.")

        def __str__(self):
            return f"My name is {self.name}."
    ```
    - 클래스는 camel case로 작성함을 원칙으로 한다.
    - 변수 및 함수에 `__`(double underscore)가 붙는 경우를 mangling이라고 한다.  
    이는 특수 예약 함수에 자주 사용되며 private 변수의 역할로도 사용한다. 자세한 내용을 언급한 블로그 글을 참고하길 바란다.  
    [파이썬 더블 언더스코어:Magic Method - corikachu blog](https://corikachu.github.io/articles/python/python-magic-method)
    - `__str__`은 출력문의 값을 결정한다.
    - 클래스에 `(object)`는 상속하는 객체를 넣는다. 따로 상속하지 않는 클래스면 적지않아도 무방하다.

## OOP의 특징
객체지향프로그래밍의 핵심 요소는 상속(Inheritance), 다형성(Polymorphism), 가시성(Visibility)가 있다.

### 상속(Inheritance)
- 부모 클래스로부터 attribute, method를 물려받는 것
    - `super()`명령어를 사용하여 부모 class의 값을 가져올 수 있다.
    - 상속을 할 때는 클래스 선언부에 `class 클래스명(부모 클래스)`의 형태로 작성한다.

- 상속 예시
    ```python
    class Person:
        def __init__(self, name, age, gender):
            self.name = name
            self.age = age
            self.gender = gender

        def about_me(self):
            print(f"저의 이름은 {self.name}입니다. 나이는 {self.age}입니다.")
        
        def __str__(self):
            return f"저의 이름은 {self.name}입니다. 나이는 {self.age}입니다."
    ```  
    ```python
    class Korean(Person):
        pass

    class Employee(Person):
        def __init__(self, name, age, gender, salary, hire_date):
            super().__init__(name, age, gender)
            self.salary = salary
            self.hire_date = hire_date
        
        def do_work(self):
            print("열심히 일을 합니다.")
        
        def about_me(self):
            super().about_me()
            print(f"제 급여는 {self.salary}원 이구요. 제 입사일은 {self.hire_date}입니다.")
    ```  

### 다형성(Polymorphism)
- 같은 이름 method의 내부로직을 다르게 작성하는 것을 말한다.

- 다형성 예시
    ```python
    class Animal:
        def __init__(self, name):
            self.name = name

        def talk(self):
            raise NotImplementedError("Subclass must implement abstract method")
    ```
    ```python
    class Cat(Animal):
        def talk(self):
            return 'Meow!'
    
    class Dog(Animal):
        def talk(self):
            return 'Woof! Woof!'
    ```

### 가시성(Visibility)
- 객체 내부 변수의 접근을 막는 것을 말함
- encapsulation이라고도 한다.
- class간의 간섭/정보공유를 최소하하는 것이 목적이다.
- 내부의 attribute들을 직접 활용하는 것이 아닌 interface만 사용한다.
    - 이를 위해 `__`를 붙인 manglin 변수를 사용한다.
    - private 변수는 decorator인 `@property`를 사용하면 접근이 가능하다.

- 가시성 예시
    ```python
    class Inventory:
        def __init__(self):
            self.items = []
            self.test = "abc"

        def add_new_item(self, product):
            if type(product) == Product:
                self.items.append(product)
                print('new item added')
            else:
                raise ValueError("Invalid Item")

        def get_number_of_items(self):
            return len(self.items)
    ```
- decorator 활용
    ```python
    # visibility
    class Inventory:
        def __init__(self):
            self.__items = []

        def add_new_item(self, product):
            if type(product) == Product:
                self.__items.append(product)
                print('new item added')
            else:
                raise ValueError("Invalid Item")
    
        # use decorator
        @property
        def items(self):
            return self.__items

        def get_number_of_items(self):
            return len(self.__items)
    ```

## Decorate
### First-class objects
- 변수나 data 구조에 슬 수 있는 객체를 일급객체라고 한다.
    - 일급객체는 parameter나 return value로 사용이 가능하다.
- python의 모든 함수는 일급객체이다.

- 일급객체 예시
    ```python
    def square(x):
        return x * x

    def cube(x):
        return x * x * x

    def formula(method, argument_list):
        return [method(value) for value in argument_list]

    f = square
    f(5)
    ```

### Inner-function
- 함수내에 함수가 존재하는 것
- closure : inner function을 return value로 반환하는 것
    - 다양한 변형을 생성할 수 있다.
- Inner-function 예시
    ```python
    def print_msg(msg):
        def printer():
            print(msg)
        printer()

    print_msg("Hello, Python")
    ```
    ```python
    # closure 1
    def print_msg(msg):
        def printer():
            print(msg)
        return printer

    another = print_msg("Hello, Python")
    another()
    ```
    ```python
    # closuer 2
    def tag_func(tag, text):
        text = text
        tag = tag

        def inner_func():
            return f'<{tag}>{text}</{tag}>'

        return inner_func

    h1_func = tag_func('title', 'This is Python Class')
    h1_func()
    ```

### Decorator
- function을 꾸며주는(decorate) 역할을 한다.
- closure를 좀 더 간단하게 구현한 것
- Decorator 예시
    ```python
    def star(func):
        def inner(*args, **kwargs):
            print('*' * 30)
            func(*args, **kwargs)
            print('*' * 30)
        return inner

    @star
    def printer(msg):
        print(msg)

    printer("Hello")
    ```
