---
title: "[boostcourse] Kotlin의 구조와 자료형"
date: 2021-01-09
categories: [Kotlin, Boost Course, Computer Science]
tags:
- Kotlin
- boostcourse
- 부스트 코스 서포터즈 3기
- 코틀린 프로그래밍 기본 1
- 자료형
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

# Kotlin의 구조
앞서 작성한 코틀린을 설명한 글에서 코틀린과 자바가 100%로 호환된다고 했다. 프로그래밍을 경험해 본 사람이 아니더라도 뭔가 조금 이상한 것을 느낄 것이다. '코틀린'이라는 언어가 있고 '자바'라는 언어가 있는데 어떻게 달라 보이는 두 언어가 100%로 호환이 되는 것일까?  
그 원리는 코틀린의 '바이트 코드(byte code)'에 숨겨져 있다.  
아주 간단한 코틀린 코드를 작성하고 IntelliJ의 메뉴 중 Tools > Kotlin > Show Byte Code를 누르면 아래와 같은 화면이 나타난다.

![](/image/boostcourse/day2/bytecode.png)  


## JVM과 바이트코드(bytecode)
간단하게 바이트코드(bytecode)가 뭔지 설명을 하겠다. 별로 궁금하지 않거나 나는 어려운 내용이 싫으면 스킵해도 상관없다.  
나는 평소에는 맥북으로 프로젝트나 과제들을 한다. 사실 학교에서 과제로 주는 것들이 아키텍처(CPU종류)에 따른 문제를 발생시키는 경우는 크게 없다. 하지만 이를 실제로 겪었던 적이 있는데 1학년 때 객체지향 프로그래밍 과제에서 맥으로 작성해서 결괏값에서 문제가 있었는데 검색을 통해 알아본 결과 맥에서 결과와 윈도우에서 결과가 다르다는 것을 알았다. 그래서 결국 가지고 있는 Windows 노트북으로 작업해서 결과를 낸 기억이 있다.

![](/image/boostcourse/day2/c++.png)  

C++과 같은 많은 언어가 하드웨어의 아키텍처의 영향을 받는다. 이런 경우에는 협업을 진행하는 환경을 동일하게 진행할 필요가 있다. 이 문제는 작업의 자율성을 저해하는 문제가 발생한다. 하지만 자바는 이와 다르게 JVM위에서 코드가 동작하는 언어여서 많은 개발자들에게 사랑받게 된 것이다.

![](/image/boostcourse/day2/java.png)  

코틀린과 자바는 Java Virtual Machine이라는 자바 가상머신 위에서 코드가 돌아간다. 즉 외부환경에서 독립적인 동일한 환경에서 코드가 구동되기 때문에 아키텍쳐 문제없이 돌아가게 된다.이러한 장점으로 인해 Windows에서 작성한 코드가 Mac OS에서 구동하는 데에 큰 문제가 없는 것이다.  
이런 장점이 존재하는 대신 JVM이 처리하는 코드가 존재를 해야 한다. 위에서 언급한 C++과 같은 언어는 해당 아키텍쳐에 맞춰서 알아서 저급언어로 처리를 한다. 하지만 동일한 환경을 장점으로 미는 JVM의 경우 JVM에서 중간처리를 진행하고 해당 아키텍처에 맞춰서 저급언어로 하드웨어에 전달한다. 이때 중간처리를 하는 과정에서 사용되는 중간 코드가 바이트코드(bytecode)이다.

## Kotlin의 호환성 원리

![](/image/boostcourse/day2/bytecode.png)  

다시 원래 하던 이야기로 돌아와서 얘기를 해보자. 위 사진에 있는 바이트코드 창에 있는 Decompile을 누르면 아래와 같은 코드창이 나타난다.

![](/image/boostcourse/day2/decompile.png)  

이 코드를 자세히 보면 그냥 일반적인 자바 코드이다. 여기서 왜 코틀린이 자바와 100%호환이 되는지가 나온다. 즉 코틀린은 기본적으로 자바로 변환이 되어서 구동이 되는 것이다.

# Kotlin의 변수 선언과 자료형
코틀린도 일반적인 언어와 같이 변수 선언방법과 자료형이 존재한다. 이를 자세히 알아보자.

## 변수 선언
자바와 호환이 높으니 자바의 변수 선언방법을 대충 적어보자.  

```java
// 자료형 변수명 = 값;
int it = 1;
final int it2 = 3;
byte bt = 2;
float ft = 2.5;
double db = 3.872;
boolean tf = true;
String str = "hello";
```  
자바는 일반적으로 '자료형 변수명 = 값;'의 형태로 선언을 한다. 이번에는 코틀린의 변수 선언방식을 보자.

```kotlin
// var 변수명: 자료형 = 값
var it: Int = 1
val it2: Int = 3
var it3 = 5
var bt: Byte = 2
var ft: Float = 2.5
var db: Double = 3.872
var tf: Boolean = true
var str: String = "hello"
```
코틀린이 더 쉽다? 라고 말하기는 어렵다고 생각할 수도 있다. 하지만 코틀린의 변수선언에서 최고 장점은 자료형을 꼭 언급할 필요가 없다는 것이다. 따로 자료형을 작성하지 않아도 선언되는 값에 맞춰 알아서 자료형이 할당된다.  
그리고 자바에서는 final 키워드를 활용하면 상수로 선언이 되었지만 코틀린은 val로 작성하면 해당 변수는 상수로 선언된다.

## 자료형
다시 위에 작성된 코드를 가져와 보자.

```java
// 자료형 변수명 = 값;
int it = 1;
final int it2 = 3;
byte bt = 2;
float ft = 2.5;
double db = 3.872;
boolean tf = true;
String str = "hello";
```  
자바에서 자료형을 배울 때 2가지의 자료형이 있다고 배운다. 원시 자료형(Primitive Type)과 참조 자료형(Reference Type)이다. 참조 자료형의 대표적인 것이 String이다. 또한 일반적으로 알고 있는 int 같은 자료형이 바로 원시 자료형이다. 대신 원시 자료형에는 null을 넣을 수가 없다. 이를 해결하기 위해서 참조 자료형에 Wrapper class가 존재한다. 원시 자료형의 첫 글자를 대문자로 바꿔주면 된다. (int는 Integer로 사용한다.)  

이제 코틀린의 자료형을 알아보자.
```kotlin
// var 변수명: 자료형 = 값
var it: Int = 1
val it2: Int = 3
var it3 = 5
var bt: Byte = 2
var ft: Float = 2.5
var db: Double = 3.872
var tf: Boolean = true
var str: String = "hello"
```
코틀린은 원시 자료형을 사용하지 않는다. 모두 참조 자료형을 사용한다. 선언은 모두 참조형으로 작성하지만 JVM 상에서 구동될 때는 성능 최적화를 위해 기본형으로 변경되어 구동된다.  
이렇게 참조 자료형을 활용하면 메모리상에 동적으로 데이터가 저장된다. 이런 이유로 성능을 위해 기본형으로 변경되는 것이다.  
참조 자료형을 사용하면 메모리에서 heap 영역에 저장되기 때문에 더 큰 데이터를 저장하고 활용할 수 있게 된다. 일반적으로 변수를 저장하는 stack 영역에는 heap 영역의 주소가 저장되어 해당 변수를 불러온다. 이러한 것 때문에 좀 특이한 것이 나타난다.

```kotlin
fun main() {
  var str1: String = "Hello"
  var str2 = "World"
  var str3 = "Hello"

  println("str1 === str2: ${str1 === str2}")
  println("str1 === str3: ${str1 === str3}")
}
```
위 코드로 간단하게 String의 특성을 설명해보겠다.  
보통 String을 저장할 때 String Pool이라는 공간에 저장하는데, 데이터 관리의 효율을 위해서 동일한 값은 중복해서 저장하지 않고 해당 값이 저장된 주소를 가리키게 된다.

![](/image/boostcourse/day2/memory.png)  

이런 String Pool을 활용한 방식은 메모리 관리의 효율성을 높여줄 수 있다. 이런 장점이 어떻게 보면 코틀린이 자바보다 효율적인 이유가 아닐까 생각된다. ~~(자바도 이렇게 돌아가는 지는 잘 모릅니다...)~~

![](/image/boostcourse/nametag.png) 
