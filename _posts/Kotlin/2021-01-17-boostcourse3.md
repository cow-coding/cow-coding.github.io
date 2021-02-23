---
layout: post
title: "[boostcourse] Kotlin기본 - Kotlin의 Null 처리"
categories: kotlin
tags:
- bc 부스트_코스_서포터즈_3기 코틀린_프로그래밍_기본_1
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

# Null이란?
오늘은 코틀린의 장점인 Null처리를 다뤄볼 것이다. 그 전에 Null이란 뭘까?
Null은 개발자들을 끊임없이 괴롭혀 온 징글징글한 녀석이다.  
이름 그대로 아무것도 없는 걸 말한다. 이 Null값이 존재하거나 인자값으로 주어지게 된다면 실제로 구동되는 프로그램에서 치명적인 에러를 발생시킬 수 있다.  
그래서 많은 IDE들이 변수를 선언할 때 기본적인 값들로 초기화하는 것을 추천한다. 그렇지 않다면 Null이나 예상치 못한 쓰레기 값이 들어가게 되어 예상치 못한 문제를 일으키기 때문이다.

![](/image/boostcourse/day3/npe.png)

이런 끔찍한 에러를 보기 싫다면 Null 처리를 확실하게 해줘야한다. 위의 에러는 Null로 발생하는 대표적인 에러인 Null Pointer Exception(NPE)이다.

# Kotlin의 Nullable
[첫번째 포스트](https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourser1/)에서 코틀린의 최고 장점을 Nullable이라고 했었다. 즉 null값 발생시 자동적으로 null처리를 하는 방식을 지원해준다.  
하지만 그 전에 코틀린은 변수를 선언할 때, null을 허용하지 않는다. 변수를 선언하면 반드시 초기화를 해줘야한다. 만약 초기화를 하지 않는다면 기본적으로 에러로 나타내어 컴파일이 되지 않는다.  
```kotlin
// 변수 선언 예
val a: Int = 30
var b: String = "Hello"
```

하지만 null로 가능하게 선언을 할 수 있다. 아래와 같은 문법으로 작성하면 null값을 허용하게 해준다.

```kotlin
val a: Int? = null
val b: String? = null
```

그렇다면 코틀린은 null로 추정되는 코드의 멤버함수를 접근한다면 어떤 방식으로 대처를 할까? 아래와 같은 코드를 작성했다고 하자.

```kotlin
fun main() {
    var str1: String?
    str1 = null
    println("str1: $str1, length: ${str1.length}")
}
```

위의 코드를 작성하면 `str1.length`에서 에러가 난다.

![](/image/boostcourse/day3/err1.png)
즉 코틀린은 nullable로 표현(`?`)을 하거나 null이든 말든 무시(`!!`)를 하게 표시를 적어달라고 에러를 보낸다. 여기서 이 두가지가 어떤 차이가 있는지 비교해보자.

## Safe-call
우선 `?`를 사용하는 방식을 Safe-call(세이프 콜)이라고 한다. 이 방식을 활용하면 해당 변수가 null값을 갖는지 아닌지 확인을 하고 경우에 맞춰서 실행을 해준다.

```kotlin
fun main() {
  var str1: String?
  str1 = null
  println("str1: $str1, length: ${str1?.length}")
}
```
세이프 콜을 하고 실행을 해보면 아래와 같은 결과를 출력한다.

![](/image/boostcourse/day3/safecall.png)

즉 만약 해당 변수가 null값을 갖는다면 모든 return값을 null처리를 해서 에러를 미연에 방지해준다. 이렇게 된다면 개발자가 하나하나 null을 신경쓰면서 코딩을 짜야하는 부담감을 확실히 줄여준다.  
당연히 해당 변수값이 null이 아니라면 원래의 동작방식으로 구동된다.

## non-null
`!`를 사용하는 방식을 non-null이라고 한다. 즉 코틀린에게 이 변수는 반드시 null이 아니라고 확정을 지어주는 문법이다. 이 방식은 최대한 피하는 것이 좋다. 남발하게 된다면 감당하지 못할 NPE의 요청을 받게 될 것이다.

```kotlin
fun main() {
  var str1: String?
  str1 = null
  println("str1: $str1, length: ${str1!!.length}")
}
```

이번에 같은 코드를 non-null로 바꾸고 출력값을 확인해보자.

![](/image/boostcourse/day3/npe.png)

똑같이 NPE가 난다. 즉, 기존의 코드와 다를 바가 없게 되는 것이다.

## elvis operation(엘비스 연산자)
위에서 다룬 Safe-call과 Elvis Operation(엘비스 연산자)을 활용하면 조건문을 간결하게 다룰 수 있다. 아래와 같은 코드가 있다고 하자.

```kotlin
fun main() {
  var str1: String? = "Hello Kotlin"
  str1 = null
  val len = if(str1 != null) str1.length else -1
}
```
이 코드는 일반적인 조건문의 코드이다. 이렇게 작성해도 큰 문제없이 돌아가고 매우 정상적인 코드이다. 하지만 코틀린은 엘비스 연산자를 활용하여 이 코드를 더 간결하게 만들어준다.

```kotlin
fun main() {
  var str1: String? = "Hello Kotlin"
  str1 = null
  val len = str1?.length ?: -1
}
```
어떤가? 매우 간결하지 않은가? 약간 삼항 연산자와도 비슷한 느낌이라고 생각된다.

이렇게 코틀린의 Null처리 방식을 알아봤다. 다음에는 자료형 변환과 연산자 조합을 통한 다양한 식을 만들어 볼 예정이다.

<div class="txc-textbox" style="border: 1px solid #eeeeee; background-color: #eeeeee; padding: 10px;" markdown="1">
<p style="text-align: center;">&lt; BoostCourse Suppoters 3rd - Kotlin &gt;</p>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourser1/">[boostcourse] Kotlin기본 - Kotlin은 어떤 언어인가?</a><br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse2/">[boostcourse] Kotlin기본 - Kotlin의 구조와 자료형</a><br>
</div>
<br>

<img src="/image/boostcourse/nametag.png" style="width:500px">
