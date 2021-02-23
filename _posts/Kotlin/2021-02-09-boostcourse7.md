---
layout: post
title: "[boostcourse] Kotlin기본 - Kotlin의 객체 지향 프로그래밍"
categories: kotlin
tags:
- boostcourse kotlin '부스트 코스 서포터즈 3기' '코틀린 프로그래밍 기본 1'
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

# 코틀린의 객체 지향
요즘은 흐름이 많이 함수형 프로그래밍으로 넘어가고 있다. 하지만 이전에 존재하는 트랜드는 객체 지향 프로그래밍(OOP)였다.  
코틀린이 자바와의 호환성이 있다고 마르고 닳도록 말을 했는데, 자바!하면 바로 객체 지향 끝판왕이다. 그렇기 때문에 코틀린도 당연히 객체 지향 프로그래밍을 지원한다.  
그 전에 우선 객체 지향 프로그래밍이 무엇인지를 간단하게 말해보겠다.

# 객체 지향 프로그래밍 (Object Oriented Programming)
## 클래스 (class)
내가 학교에서 객체 지향을 공부할 때나 아니면 좀 잘 쓴 책들은 아마 대부분은 첫페이지에 클래스가 나올 것이다. 그리고 이어서 클래스를 간단하게 말하면서 '붕어빵틀'이라고 말을 할 것이다.  
개인적으로는 이 비유를 별로 좋아하지는 않는다. 왜냐하면 우리는 '붕어빵'이나 잘 알지 '붕어빵틀'에는 별로 관심이 없기 때문이다.  
그래서 개인적으로 객체 지향을 사용하면서 느낀 점은 '사용 설명서'라는 단어가 정확하다고 생각한다.  
만약에 당신이 어떤 물품을 구매했는데 사용 설명서를 봐도 이 제품을 어떻게 사용해야하는 지를 모르겠다면 그건 아마 최악일 것이다.  
클래스는 결과적으로 어떤 객체(Object)라는 물품의 사용 설명서를 짜는 것이라고 생각하면 된다.  
Bird라는 클래스로 예시를 들어보겠다.  
```kotlin
class Bird {

}
```
이렇게하면 클래스가 선언이 된 것이다.

## 필드 (field)
필드는 클래스에서 사용되는 부품들이 필드이다.  
해당 클래스에서 사용되는 부품들을 우리는 제품에 넣어줘야 한다.  
예를 들어 계속 만들던 Bird class를 만들어보자.
```kotlin
class Bird {
  var name:String = ""
  var wing:Int = 2
  var beak:String = "short"
  var color:String = "blue"

}
```
코틀린은 앞선 글에서 초기화를 반드시 해야한다고 언급했었다. 그래서 필드만 사용한다면 이렇게 초기화 선언을 반드시 해야한다.  
하지만 뒤에 언급될 생성자가 있다면 초기화를 진행하지 않아도 된다.

## 메소드 (method)
메소드는 해당 클래스의 기능을 만드는 것이다. 즉 해당 제품에서 사용가능한 함수들을 만들어주면 된다.
계속해서 언급한 Bird class를 구성해보자.  
```kotlin
class Bird {
  var name:String = ""
  var wing:Int = 2
  var beak:String = "short"
  var color:String = "blue"

  fun fly() = println("Fly wing:$wing")
  fun sing(vol: Int) = println("Sing vol: $vol")
}
```
새가 가진 기능? 중 하나인 나는 것과 노래부를 것을 만들어준 것이다.  
이렇게 해당 클래스가 가진 기능을 메소드라고 한다.

## 생성자 (constructor)
클래스에는 생성자라는 것이 존재한다.  
이 클래스에는 이런 것들을 설정해서 만들겠다!라는 의미를 갖는다고 생각해도 된다.  
그래서 생성자는 여러가지의 형태를 띌 수 있다. 하지만 대부분 모든 필드 값들을 설정을 해준다.  
```kotlin
class Bird {
  var name:String
  var wing:Int
  var beak:String
  var color:String

  constructor(_name:String, _wing:Int, _beak:String, color:String) {
    name = _name
    wing = _wing
    beak = _beak
    color = _color
  }

  fun fly() = println("Fly wing:$wing")
  fun sing(vol: Int) = println("Sing vol: $vol")
}
```  
이렇게 생성자로 모든 변수를 설정하면 필드를 초기화하지 않아도 에러가 없이 돌아간다. 이런 생성자를 만들면 후에 객체를 만들때 생성자에 맞춰서 설정을 해주면 된다.  

## 객체(object)
클래스가 설명서라면 객체는 제품이다. 지금까지 Bird class를 만들었으니 이제 Bird 객체를 만들어보자.  
```kotlin
class Bird {...}

fun main() {
  var coco = Bird("coco", 2, "long", "red")
}
```
이렇게 할 경우 Bird에 맞춰서 coco라는 객체가 만들어지게 된 것이다!  
이제 객체 지향의 세계로 들어가보자.  

<div class="txc-textbox" style="border: 1px solid #eeeeee; background-color: #eeeeee; padding: 10px;" markdown="1">
<p style="text-align: center;">&lt; BoostCourse Suppoters 3rd - Kotlin &gt;</p>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourser1/">[boostcourse] Kotlin기본 - Kotlin은 어떤 언어인가?</a><br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse2/">[boostcourse] Kotlin기본 - Kotlin의 구조와 자료형</a><br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse3/">[boostcourse] Kotlin기본 - Kotlin의 Null 처리<br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse4/">[boostcourse] Kotlin기본 - Kotlin의 자료형 변환과 확인<br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse5/">[boostcourse] Kotlin기본 - Kotlin의 함수형 프로그래밍<br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse6/">[boostcourse] Kotlin기본 - Kotlin의 제어문<br>
</div>
<br>

<img src="/image/boostcourse/nametag.png" style="width:500px">
