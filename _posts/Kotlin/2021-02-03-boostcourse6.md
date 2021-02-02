---
title: "[boostcourse] Kotlin기본 - Kotlin의 제어문"
date: 2021-02-03
categories: [Kotlin, Boost Course, Computer Science]
tags:
- Kotlin
- boostcourse
- 부스트 코스 서포터즈 3기
- 코틀린 프로그래밍 기본 1
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

# Kotlin의 제어문
다른 언어들과 마찬가지로 코틀린도 제어문이 존재한다. 대부분은 다른 언어들과 비슷하게 돌아가지만 몇가지 다른 점들도 있고 새롭게 만나는 친구들도 있기 때문에 자세히 알아보자.  
사용방식이 똑같은 친구들은 설명을 생략하겠다.  
(do~while, try~catch 생략)

## 조건문 (if statement)
### if statement
아마 모든 언어의 제어문의 시작은 조건문이지 않을까 싶다.  
코틀린의 조건문도 다른 조건문들과 다르지 않다. 조금 다른 점이라면 조건문의 값을 변수에 바로 할당할 수 있다. 이 기능은 JDK14부터 자바에도 추가된 것으로 알고 있다.

```kotlin
fun main() {
  val a = 17
  val b = 8

  val result = if (a > b) {
    println("a: $a")
    a
  }else {
    println("b: $b")
    b
  }

  println(result)
}
```
이렇게 코드로 작성할 수 있다. 그렇다면 각 조건문 마지막에 적힌 a, b 단일 코드는 뭘까?  
저 코드들은 일종의 할당연산과 동일하다. 사실 저 형태는 일종의 람다식 형태이기 때문에 가장 마지막에 있는 값을 변수에 반환한다.

### in .. statement
이번에는 위의 코드를 응용하고 조건식 내부에 조금 색다른 것을 사용해보자.
```kotlin
fun main() {
  val score = 77.5
  val grade: Char = 'F'

  grade = if (score >= 90.0) {
    'A'
  }else if (score >= 80.0 && score <= 89.0) {
    'B'
  }else if (score >= 70.0 && score <= 79.0) {
    'C'
  }

  println(grade)
}
```
이런 코드가 있을 때 조건식 내부를 간단하게 작성할 수 있다.

```kotlin
fun main() {
  val score = 77.5
  val grade: Char = 'F'

  grade = if (score >= 90.0) {
    'A'
  }else if (score in 80.0..89.9) {
    'B'
  }else if (score in 70.0..79.9) {
    'C'
  }

  println(grade)
}
```
위의 코드처럼 `in ..`구문을 사용하면 범위 지정 효과를 나타낸다. `in ..`은 for문에서도 사용되므로 알아두면 유용하다.  
하지만 for문에서는 추가적으로 사용가능한 구문이 있으므로 같이 알아두면 유용하다.  

### when statement
코틀린에는 switch~case문이 없다. 그렇다면 긴 조건문을 하나하나 작성해야하는가? 라고 묻는다면 아니다. 라고 답할 수 있다.  
switch~case문 대신에 when 구문이 존재하기 때문이다.  
위에서 작성한 grade 코드를 when으로 바꿔보겠다.
```kotlin
fun main() {
  val score = 77.5
  val grade: Char = 'F'

  when(score) {
    in 90.0..100.0 -> grade = 'A'
    in 80.0..89.0 -> grade = 'B'
    in 70.0..79.0 -> grade = 'C'
    else grade->'F'
  }

  println(grade)
}
```
코틀린의 when은 따로 break문이 필요없다. 대입 연산이 진행되는 순간 종료되는 것이다.  
when 구문은 switch-case와 다르게 인자를 없이 사용할 수도 있다. 이 경우 대신 내부에서 조건을 구현해줘야한다.

## 반복문 (loop statement)
### for statement
반복문을 배우면 가장 먼저 만나는 구문이 for구문이다.  
코틀린에도 마찬가지로 for구문이 존재한다. 다만 다른 언어와 사용방식이 조금 다르다.
```kotlin
fun main() {
    var total = 0
    var totla2 = 0

    for (num in 1..100 step 2) { // odd
        total += num
    }

    for (num in 0..99 step 2) { // even
        total2 += num
    }

    println("total: $total, total2: $total2")
}
```
앞서 말했듯이 `in ..`구문이 for문에 사용된다고 하였다. 코틀린에서 사용하는 for문은 형태가 range based for문과 비슷하게 형태가 유지된다.  
이게 무슨 말이냐면 for의 선언 방식은 아래와 같다.  
`for(요소 변수 in 컬렉션 or 범위) {본문}`  
즉 내부에 in 다음에 컬렉션이 들어간다면 range based for의 형태로 동작하고 범위가 들어간다면 일반적인 for문으로 동작한다.  
이때 범위 이후에 step을 사용하면 증가량을 조절할 수 있다. 여기서 문제가 발생하는데, `in ..`구문은 증가만 할 수 있다. 그렇다면 감소하면서 반복하는 방법은 없을까? 당연히 있다.  
일반적으로 `in ..`을 사용하면 **상행구문** 이라고한다. 반대로 **하행구문** 은 다음과 같이 작성하면 된다.  
```kotlin
fun main() {
  for(i in 5 downTo 1) print(i)
}
```
마찬가지로 마지막에 step을 적으면 감소량을 조절할 수 있다.  
근데... 보통 C++나 JAVA를 사용하던 개발자들이라면 for문에 보통 '<' 를 사용해서 미만으로 조건을 처리하는 경우가 많았을 것이다. 코틀린도 이렇게 나타내는 방법이 존재한다.
```kotlin
fun main() {
  for(i in 0 until 10) print(i)
}
```
위와 같이 `until`을 사용하면 미만으로 범위를 지정할 수 있다. ~~아쉽게도 하행구문은 없는거 같다...~~

## 라벨 (label)
코틀린에는 라벨이라는 기능이 존재한다. 내가 기억하기론 다른 언어에도 있던걸로 기억하는데 무슨 언어였는지 기억이 안난다.  
라벨을 사용하면 break를 사용하거나, return으로 반복문이나 함수를 종료시켜도 원하는 곳으로 이동해서 종료를 시킬 수 있다.  
```kotlin
fun main() {
    retFunc()
}

inline fun inlineLambda(a: Int, b: Int, out: (Int, Int) -> Unit) {
    out(a, b)
}

fun retFunc() {
    println("Start of Func")
    inlineLambda(12, 3) { a, b ->
        val result = a + b
        if (result > 10) return
        println("result: $result")
    }

    println("End of Func")
}
```
이 코드를 읽어보고 코드를 많이 짜본 사람이라면 대충 결과물이 어떻게 나올지 예상이 가능하다.  

![](/image/boostcourse/day5/nolabel.png)

결과물을 보면 당연히 함수가 중간에 종료되므로 이후의 출력은 실행되지 않는다. 여기서 뒤에 있는 End of Func을 실행시키기 위해 라벨을 사용해보겠다.
```kotlin
fun main() {
    retFunc()
}

inline fun inlineLambda(a: Int, b: Int, out: (Int, Int) -> Unit) {
    out(a, b)
}

fun retFunc() {
    println("Start of Func")
    inlineLambda(12, 3) lit@{ a, b ->
        val result = a + b
        if (result > 10) return@lit // return@inlineLambda 도 가능 (암묵적 라벨)
        println("result: $result")
    }

    println("End of Func")
}
```
return 뒤와 람다함수 앞에 `@lit`이라고 마치 자바 어노테이션처럼 붙은 걸 볼 수 있다. 저렇게 할 경우 return의 종료반환점을 지정한 라벨로 정할 수 있다. 이렇게하면 break문도 자유자재로 사용이 가능하다.  

<div class="txc-textbox" style="border: 1px solid #eeeeee; background-color: #eeeeee; padding: 10px;" markdown="1">
<p style="text-align: center;">&lt; BoostCourse Suppoters 3rd - Kotlin &gt;</p>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourser1/">[boostcourse] Kotlin기본 - Kotlin은 어떤 언어인가?</a><br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse2/">[boostcourse] Kotlin기본 - Kotlin의 구조와 자료형</a><br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse3/">[boostcourse] Kotlin기본 - Kotlin의 Null 처리<br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse4/">[boostcourse] Kotlin기본 - Kotlin의 자료형 변환과 확인<br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse5/">[boostcourse] Kotlin기본 - Kotlin의 함수형 프로그래밍<br>
</div>
<br>

<img src="/image/boostcourse/nametag.png" style="width:500px">
