---
layout: post
title: "[boostcourse] Kotlin기본 - Kotlin의 다형성"
categories: kotlin
tags:
- bc 부스트 코스 서포터즈 3기 코틀린 프로그래밍 기본 1
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

# 다형성 (Polymorphism)
지난 시간에는 객체 지향 프로그래밍의 3요소인 캡슐화, 다형성, 상속 중 상속을 다뤄봤다.
이번 시간에는 3요소 중 다형성(polymorphism)에 대해서 다뤄볼 예정이다.
사실 다형성과 상속을 따로 분리해서 설명하는 것은 전체적인 설명의 맥락이 끊기는 느낌을 준다. 하지만 각각의 특징을 정확히 잡기 위해서 따로 설명하겠다.
객체 지향의 가장 중요한 원칙은 사실 캡슐화(encapsulation)이지만 제일 중요해서 가장 마지막에 다뤄볼 예정이다.
우선 다형성의 개념적 정의를 알아보면 다음과 같다

> 하나의 변수, 또는 함수가 상황에 따라 다른 의미로 해석될 수 있는 것을 말한다.

하나의 메소드 또는 클래스가 다양한 방식으로 동작하는 것을 다형성이라고 한다.
다형성은 다양한 방식으로 확인할 수 있는데, 메소드 다형성과 클래스 다형성을 보여주겠다.

## 클래스 다형성
동물과 관련된 클래스를 작성한다고 생각해보자. 동물 종으로 사자를 만들어서 상속을 진행해보자.

```kotlin
open class Animal(var name:String, var type:String) {
  open fun roar() {
    println("name: $name, type: $type")
  }
}

class Lion(name: String): Animal(name:"Lion") {
  override fun roar() {
    println("name: $name, type: $type, eat meat!")
  }

  fun shout() {
    println("어흥!")
  }
}
```
이렇게 사자 클래스를 동물 클래스에 상속해서 만들었다. 이제 main에서 다음과 같이 선언을 해볼 수 있다.

```kotlin
fun main() {
  var a : Animal = Animal("호랑이", "동물")
  var b : Lion = Lion("사자")
  var c : Animal = Lion("사자자")
}
```
이렇게 선언된 3개의 변수를 각각 살펴보면 첫번째 `a`는 Animal 클래스로 선언이 되었다.
`b`는 Lion 클래스로 선언이 되었다.
그렇다면 `c`는 어떤 클래스로 변수가 선언되었을까?
답은 생각보다 간단하다. Lion클래스를 선언해줬지만 입력받는 자료형의 클래스는 Animal이므로 Animal 클래스의 형태로 선언이 된다. 당연히 사용되는 메소드 함수들도 Animal에 선언된 메소드들로 한정된다.
그렇다면 앞에 선언한 `c`를 Lion으로 바꿀 방법은 없을까?
당연히 존재한다. 그리고 이 과정에서 앞서 배운 타입캐스팅 관련 명령어인 `is`키워드가 사용되기도 한다.

```kotlin
fun main() {
  var a : Animal = Animal("호랑이", "동물")
  var b : Lion = Lion("사자")
  var c : Animal = Lion("사자자")

  if(c is Lion) {
    c.shout()
  }

  c as Lion
  c.shout()
}
```
`is`키워드는 앞서 언급한 것과 같이 해당 자료형으로 변환이 가능한 경우 true를 반환한다. 따라서 `is`키워드를 사용하면 클래스의 다형성을 살릴 수 있다.
또한 `as`라는 키워드를 사용해도 변환 가능한 자료형의 형태로 변환할 수 있다.

## 메소드 다형성
### 오버로딩 (Overloading)
개발자 면접에서 자주 나오는 질문 중 하나가 오버로딩과 오버라이딩을 구분하는 것이다.
지난 시간에 상속을 다루면서 필요한 개념인 오버라이딩을 설명했으니 이번 시간에는 다형성의 대표적인 예인 오버로딩을 설명해보겠다.
출력과 동작이 동일하고 이름이 같은 함수이지만 인자의 형식이 다른 경우를 오버로딩이라고 한다.

```kotlin
fun add(a: Int, b: Int): Int {
  return a + b
}

fun add(a: Double, b: Double): Double {
  return a + b
}
```
이 두개의 함수는 모두 두 숫자를 합한 값을 리턴해주는 함수이다.
하지만 실제로 보면 입력받는 인자의 타입과 반환해주는 반환값이 다르다.
이렇게 인자 값이 다르지만 이름이 같은 함수를 만드는 것을 오버로딩이라고 한다.

<div class="txc-textbox" style="border: 1px solid #eeeeee; background-color: #eeeeee; padding: 10px;" markdown="1">
<p style="text-align: center;">&lt; BoostCourse Suppoters 3rd - Kotlin &gt;</p>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourser1/">[boostcourse] Kotlin기본 - Kotlin은 어떤 언어인가?</a><br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse2/">[boostcourse] Kotlin기본 - Kotlin의 구조와 자료형</a><br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse3/">[boostcourse] Kotlin기본 - Kotlin의 Null 처리<br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse4/">[boostcourse] Kotlin기본 - Kotlin의 자료형 변환과 확인<br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse5/">[boostcourse] Kotlin기본 - Kotlin의 함수형 프로그래밍<br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse6/">[boostcourse] Kotlin기본 - Kotlin의 제어문<br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse7/">[boostcourse] Kotlin기본 - Kotlin의 객체 지향 프로그래밍<br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse8/">[boostcourse] Kotlin기본 - Kotlin의 상속<br>
</div>
<br>

<img src="/image/boostcourse/nametag.png" style="width:500px">
