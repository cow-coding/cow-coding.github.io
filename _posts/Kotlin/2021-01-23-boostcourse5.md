---
layout: post
title: "[boostcourse] Kotlin기본 - Kotlin의 함수형 프로그래밍"
categories: kotlin
tags:
- bc kotlin '부스트 코스 서포터즈 3기' '코틀린 프로그래밍 기본 1'
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

# Kotlin의 함수 선언방식
## 일반적인 함수 선언
코틀린의 함수 선언 방법은 간단하다.
```kotlin
fun sum(a: Int, b: Int): Int {
  return a + b
}
```
특이한 것은 위의 `fun`키워드는 `main`안에 작성할 수도 있고 바깥에도 작성할 수 있다. 대신 각각 부르는 명칭이 달라지게 되는데, `main`내부에 작성하면 **지역함수** 라고 부르고 외부에 작성하면 **Top-level(최상위)함수** 라고 부른다.  
위의 코드는 가장 일반적인 함수선언 방식이고 이를 축소할 수 있는 방식도 있다.
```kotlin
fun sum(a: Int, b: Int) = a + b
```
이렇게 매우 극단적으로 줄일 수 있다. 등호 우측에는 조건문도 사용할 수 있다. 여기서 반환 자료형이 충분히 유추가 가능하면 생략이 가능하다.  
반환타입을 명시하지 않으면 자동으로 Unit이라는 자료형으로 반환을 한다. 물론 return 타입이 정해져 있는데 명시를 하지 않는다면 에러가 난다.

## 가변인자 함수 선언
parameter의 개수가 불분명하고 가변적이라면 어떻게 선언해야할까? 이를 위한 키워드가 코틀린에 존재한다. (뜬금없지만 요즘 go도 공부하는데, go도 존재한다.)
```kotlin
fun funcVarargs(vararg a: Int) {
  for (num in a) {
    println(num)
  }
}
```
`vararg`키워드를 사용하면 가변인자로 함수 인자값을 받을 수 있다.

# Kotlin의 프로그래밍 패러다임
코틀린은 다중 패러다임 언어이다. 함수형 프로그래밍(FP: Functional Programming)과 객체 지향 프로그래밍(OOP: Object-Oriented Programming)을 모두 지원하고 활용한다. 객체 지향 프로그래밍 방식은 향후에 알아보도록 하고 오늘은 함수형 프로그래밍에 대해서 알아보자.

## 함수형 프로그래밍 (Functional Programming)
함수형 프로그래밍이 순수 함수를 활용하여 프로그래밍을 하는 방식을 말한다. 선언형 프로그래밍 방식에 속하는 프로그래밍 방식이다. '어떻게'를 강조하는 절차지향과 다르게 선언형 방식은 '무엇을'을 강조하여 프로그래밍을 한다. 즉, 내가 하고 싶은게 무엇인지만 알면 나머지는 함수에 맡기고 넘어가는 것이다. 이런 함수형 프로그래밍은 알고리즘을 직접 작성하지 않기 때문에 코드의 길이를 압도적으로 줄이고 가독성을 높여준다.  
이제 함수형 프로그래밍을 이해할 때 필요한 것들을 몇가지 알아보자.

### 1급 객체 (First Class Citizen)
1급 객체란 이름에서 알 수 있듯이 많은 권한을 갖는 최상위 객체를 말한다. 함수형 프로그래밍에서1급 객체의 조건은 다음과 같이 있다.
1. 함수의 인자로 전달할 수 있다.
2. 함수의 반환값에 사용할 수 있다.
3. 변수나 데이터 구조에 담을 수 있다.

함수 자체가 1급 객체가 되는 것이다. 결국 함수자체를 어떤 인자로 활용하거나 데이터로 활용할 수 있다는 것이다.

### 순수함수 (Pure function)
함수형 프로그래밍에서 가장 중요한 단어라고 생각한다. 순수 함수를 한마디로 정의하면 부작용이 없는 함수이다. 부작용이 없다는 뜻은 동일 입력에는 동이 출력이 나와야하는 것이다. 또한 함수 외부에 존재하는 값에 접근을 하면 안된다.  
```kotlin
fun sum(a: Int, b: Int): Int {
  return a + b
}

fun main() {
  println(sum(1,2)) // output 3
}
```
위의 코드가 대표적인 순수함수이다.  
순수함수를 활용하면 모듈화가 가능해지므로 함수의 재사용성을 높여준다. 함수 하나를 잘 만들어두면 코드의 양을 엄청나게 줄일 수 있다. 또한 함수의 값이 결정되어 있으므로 추적하고 예측이 가능하기 때문에 어떤 부분에서 문제가 발생했는 지를 확인하기가 편리하다.

### 람다식 (Lambda function)
람다식이란 익명 함수의 하나이다. 람다식을 사용해도 코드의 양을 압도적으로 줄일 수 있다. 인자와 결과를 매우 간단하게 표시해서 함수를 압축하여 표현하는 방식을 말한다. 람다식은 고차 함수에서 인자로 넘기거나 반환 값으로 사용할 수 있다.
```
{x, y -> x + y}
```
와 같이 작성하며 이 람다식은 합을 진행하는 함수를 압축해서 적어놓은 것이다. 일반적으로 람다식의 구동방식은 람다식 자체가 메모리에 변수처럼 저장되는 형식으로 작동된다. (학부 수업에서 교수님이 자세하게 설명해주셨다.)

### 고차함수 (high-order function)
고차함수는 함수에 함수를 인자로 전달하거나 반환값으로 사용하는 함수를 말한다. 보통 람다식을 활용하는 방식을 쓴다.
```kotlin
fun high(a: Int, b: Int, sum: (Int, Int) -> Int): Int {
  return sum(a, b)
}

fun main() {
  val result = high(1, 3, {x, y -> x + y})
  println(result)
}
```
위에 작성된 `high`함수가 바로 고차함수이다. 내부에 인자로 람다식이 존재하는 것을 알 수 있다. 위에 식에서 람다식을 마지막 인자로 적은 이유가 존재한다. `result`에 넣는 high함수 유형을 아래처럼 변경할 수 있기 때문이다.

```kotlin
fun main() {
  val result = high(1, 3) {x, y -> x + y}
  println(result)
}
```
가독성을 높이도록 인자를 따로 적고 람다식은 외부로 꺼내서 따로 작성할 수 있기 때문이다.

<div class="txc-textbox" style="border: 1px solid #eeeeee; background-color: #eeeeee; padding: 10px;" markdown="1">
<p style="text-align: center;">&lt; BoostCourse Suppoters 3rd - Kotlin &gt;</p>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourser1/">[boostcourse] Kotlin기본 - Kotlin은 어떤 언어인가?</a><br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse2/">[boostcourse] Kotlin기본 - Kotlin의 구조와 자료형</a><br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse3/">[boostcourse] Kotlin기본 - Kotlin의 Null 처리<br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse4/">[boostcourse] Kotlin기본 - Kotlin의 자료형 변환과 확인<br>
</div>
<br>

<img src="/image/boostcourse/nametag.png" style="width:500px">
