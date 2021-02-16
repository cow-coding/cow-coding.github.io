---
title: "[boostcourse] Kotlin기본 - Kotlin의 상속"
date: 2021-02-16
categories: [Kotlin, Boost Course, Computer Science]
tags:
- Kotlin
- boostcourse
- 부스트 코스 서포터즈 3기
- 코틀린 프로그래밍 기본 2
---

<style>
img {
  display:block;
  margin:0px auto;
}
</style>

* TOC
{:toc}
{: .toc }

**이 글은 부스트코스 3기 코틀린 활동으로 작성된 글입니다.**

# 상속 (Inheritance)
객체 지향 프로그래밍의 3요소에는 캡슐화, 상속, 다형성에서 오늘은 상속(inheritance)을 말해보겠다.  
상속을 일반적으로 간단하게 설명하는 경우 A is a B(A는 B다)라고 한다. 쉽게 말하면 student is a person이 상속관계를 나타낸다.  
상속을 활용하면 **사람이라** 하는 실수를 방지할 수 있다. 예를 들어 인기 게임 리그오브레전드를 만든다고 생각을 해보자.  

```cpp
class 자르반 {
  체력
  마나
  방어력
  마법저항력
  공격속도
  대격변
  ...
};

class 제이스 {
  체력
  마나
  방어력
  마법저항력
  공격속도
  폼
  하늘로
  ...
};
```  
클래스를 갓 배운 사람에게 챔피언을 코딩하라면 이렇게 할 것이다. 문제는 지금 리그오브레전드에 나온 챔피언이 154개의 챔피언인데 모든 챔피언 정보를 저렇게 만든다면 코드를 너무 많이 작성해야하는 단점이 존재한다.  
또한 복사 붙여넣기를 해서 해결할 수 있지만 그렇게되면 문제가 일어날 수도 있다. **사람** 이라 실수를 하기때문이다.  
실수를 줄이고 코드의 양을 굉장히 줄일 수 있는 방법으로 상속이 있다.  
상속을 사용하면 다음과 같이 활용할 수 있다.

```cpp
class 캐릭터 {
  체력
  마나
  방어력
  마법저항력
  공격속도
  ...
};

class 자르반 : 캐릭터 {
  용의 일격
  ...
};

class 제이스 : 캐릭터 {
  폼
  하늘로
  ...
};
```
이렇게하면 해당 캐릭터의 특징만 살려서 코딩을 할 수 있고 실수를 현저히 줄일 수 있다. 한 번에 2개의 클래스를 상속받는 경우가 가능한 언어가 있는데, 이런 경우에 '죽음의 다이아몬드'라는 문제가 발생할 수 있어서 자바는 다중상속을 제한하고 있다.  

# Kotlin의 상속
코틀린도 다른 언어들과 마찬가지로 상속을 할 수 있다. `open`키워드를 사용해서 상속과 오버라이드 선언을 해줄 수 있다. 오버라이드는 상속을 설명하고 설명하겠다.  
```kotlin
open class Character(var name: String, var HP: Int, var Consumption: Int) {
  fun attack() {
    println("Basic Attack")
  }
}

class Jarvan(name: String, HP: Int, Consumption: Int) : Character(name, HP, Consumption) {
  fun Cataclysm() {
    println("For the king!")
  }
}

class Jayce {
  var form: String

  constructor(name: String, HP: Int, Consumption: Int, form: String) : super(name, HP, Consumption) {
    this.form = form
  }

  fun formCheck() {
    println("Now form is $form")
  }

  fun ToTheSkies() {
    println("To The Skies!")
  }
}
```
위에서 진행한 예시를 코드로 구현하면 이렇게 코드로 나타낼 수 있다. 부모 클래스가 되는 클래스 앞에 `open`키워드를 붙여주면 상속을 해주는 부모 클래스라는 의미이다.

## 오버로딩과 오버라이드
### Overloading
개발자 면접에서 가장 기본적이면서 가끔씩 나오는 질문인 오버로딩과 오버라이딩의 차이점을 설명하겠다.  
출력과 동작이 동일하고 이름이 같은 함수이지만 인자의 형식이 다른 경우를 오버로딩이라고 한다.

```kotlin
fun add(a: Int, b: Int): Int {
  return a + b
}

fun add(a: Double, b: Double): Double {
  return a + b
}
```  

### Overriding
오버라이딩은 이름은 비슷하지만 완전히 느낌이 다르다. 상위 클래스에 있는 동일한 메소드를 하위 클래스에서 재정의하는 것을 오버라이딩이라한다. 즉 기능을 다시 설정?하는 것을 오버라이딩이라고 생각하면된다.

```kotlin
open class Character(var name: String, var HP: Int, var Consumption: Int) {
  open fun attack() {
    println("Basic Attack")
  }
}

class Jarvan(name: String, HP: Int, Consumption: Int) : Character(name, HP, Consumption) {
  override fun attack() {
    println("Jarvan Hit!")
  }

  fun Cataclysm() {
    println("For the king!")
  }
}

class Jayce {
  var form: String

  constructor(name: String, HP: Int, Consumption: Int, form: String) : super(name, HP, Consumption) {
    this.form = form
  }

  override fun attack() {
    println("Jayce Hit!")
  }

  fun formCheck() {
    println("Now form is $form")
  }

  fun ToTheSkies() {
    println("To The Skies!")
  }
}
```
메소드에도 `open`키워드를 붙이면 override를 선언해주는 것이다.  
파생 클래스에서 더이상 오버라이딩을 금지시킬 수 있다.  
`override`키워드 앞에 `final`을 붙이면 하위 클래스에서 재정의를 금지시킬 수 있다.
