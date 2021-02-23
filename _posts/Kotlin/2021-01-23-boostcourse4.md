---
layout: post
title: "[boostcourse] Kotlin기본 - Kotlin의 자료형 변환과 확인"
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

# Kotlin의 자료형 저장방식
[앞선 글](https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse2/)에서 코틀린의 변수 선언방식과 자료형의 종류를 알아보았다. 그 글에서 마지막 부분에 String Pool을 설명하면서 메모리 구조를 설명하였는데, 코틀린의 자료형 검사방식을 잘 이해하기위해 코틀린의 변수 저장 방식을 알아보자.  

## 일반적인 메모리 구조
이 부분은 약간의 컴퓨터공학 지식이 들어가는 부분이다. 내용이 지루할 수 있으나 코딩이 아닌 프로그래밍을 할 때 알아두면 좋은 지식이므로 좀 재미없어 보이더라도 교양이라 생각하고 읽으면 나중에 아는 척하기 좋다.  

![](/image/boostcourse/day4/memory.png)  

컴퓨터의 메모리 구조는 위와 같이 크게 4개의 영역으로 구분된다.  
코드영역, 데이터 영역, 힙 영역, 스택 영역으로 구분되는데 영역별로 할당된 공간 크기도 다르고 저장되는 데이터의 종류도 다양하다.

1. 코드 영역은 그냥 우리가 열심히 치는 코드 텍스트가 저장되는 영역이므로 설명은 패스한다.
2. 데이터 영역에는 그림에서 알 수 있듯이 전역변수와 정적(static)변수가 저장된다. 이곳에 할당된 변수들은 프로그램의 가장 마지막까지 메모리에 남는 변수들이다. ~~아주 끈질긴 놈들이다.~~  
데이터 영역도 중요하지만 사실 메모리 구조를 이해해야 하는 가장 중요한 이유는 스택(Stack)과 힙(Heap)영역 때문이다.  
3. 스택(Stack) 영역은 일반적으로 프로그램이 자동으로 사용하는 임시 메모리 영역이다. 지역변수, 매개변수와 같은 변수들이 저장되고 호출이 끝나면 메모리상에서 제거된다. 일반적으로 C++기준으로 main문 내부에 적히는 변수들이 대표적이 예다.  
4. 힙(Heap) 영역은 개발자가 할당해주는 공간이 된다. C++기준 설명으로는 new와 delete명령어를 활용해서 동적 할당을 하게 되면 이 영역을 사용한다. Java는 JVM의 가비지 컬렉터가 자동으로 영역 할당과 해제를 관리해준다. 그래서 이 부분을 사용하는 행위를 동적 할당(Dynamic Memory Allocation)이라고 한다.

영역 크기로는 보통 Heap이 가장 큰 메모리를 차지한다. 사실 정확히 말하면 힙과 스택은 같은 공간을 사용하기 때문에 힙의 양이 커지면 스택이 차지하는 부분이 상대적으로 작아진다.

## Kotlin의 변수 저장방식
대략적인 메모리 구조를 공부했으니 이번에는 코틀린이 변수를 어떻게 메모리에 저장하는지 알아보자. 아래와 같은 코드로 변수를 선언했다고 하자.  
```kotlin
fun main() {
    val a: Int = 128
    val b = a

    val c: Int? = a
    val d: Int? = a
    val e: Int? = c

    println(d == e)
    println(d === e)
    println(c === d)
}
```
이 코드를 보면 엄청 큰 문제는 없어보이는 코드이다. 다만 변수 선언방식이 같아보이는 c, d, e 변수를 코틀린은 메모리에 다르게 저장한다. 우선 코드를 간단하게 리뷰를 해보면, 변수 a에는 Int타입으로 정수를 선언했고 b는 a과 같은 값을 갖는다. 이때, 선언한 타입의 종류는 참조 자료형이지만 코틀린은 성능을 위해 메모리에는 기본 자료형으로 저장한다고 했다. 즉 a와 b가 선언이 된 후에는 메모리에 아래와 같이 저장되어 있다.  

![](/image/boostcourse/day4/mem1.png)  

기본 자료형 int로 stack영역에 변수가 저장된다. 이때, Nullable Int로 변수를 선언할 경우 `Int?`는 객체 형태로 저장되는 참조 자료형이된다. 결국 객체로 선언이 되고 객체 선언을 할 경우 JVM에는 Heap영역에 값을 저장하고 Stack 영역에는 해당 주소를 저장한다. 그래서 c, d, e가 선언된 후의 메모리 구조는 아래와 같이 저장된다.  

![](/image/boostcourse/day4/mem2.png)  

결과적으로 값만 비교하는 이중 등호는 true를 출력하고 값과 참조 주소를 모드 비교하는 삼중 등호는 false를 출력한다. 마지막 부분은 false를 출력한다.  
이 과정은 코틀린의 바이트 코드를 자바로 Decompile한 코드에서도 찾아볼 수 있다. 해당 코드는 접은 글에 넣어두겠다. (일단 코드가 별로 안 예쁘다)

<details markdown="1">
<summary>Decompile 코드 보기</summary>

```java
public final class ValRefCompareKt {
   public static final void main() {
      int a = 128;
      boolean var2 = true;
      boolean var3 = false;
      System.out.println(var2);
      var2 = true;
      var3 = false;
      System.out.println(var2);
      Integer c = Integer.valueOf(a);
      Integer d = Integer.valueOf(a);
      boolean var5 = Intrinsics.areEqual(c, d);
      boolean var6 = false;
      System.out.println(var5);
      var5 = c == d;
      var6 = false;
      System.out.println(var5);
      var5 = c == c;
      var6 = false;
      System.out.println(var5);
   }

   // $FF: synthetic method
   public static void main(String[] var0) {
      main();
   }
}
```

</details><br>

그런데 여기서 이것저것을 만지다보면 이상한 걸 발견하게된다. 아래 코드를 작성하고 출력결과를 확인하면 어떤 결과가 나올까?  
```kotlin
fun main() {
  val num3: Int = 3
  val num4: Int? = 3
  val num5: Int? = num3

  println(num3 == num4)
  println(num3 === num4)
  println(num4 === num5)
}
```
위에서 설명한 것들을 토대로 보면 true, false, false가 나와야한다. 하지만 실제 출력결과는 **true, true, true**이다.  
이게 뭔 일인가 싶다. ~~머리가 띵 해지는 게 손발이 떨린다...~~  
이건 코틀린의 데이터 저장 방식 때문에 발생하는 결과이다. 코틀린은 참조형으로 선언한 변수의 값이 -128 ~ 127이면 캐시에 저장을 한다. 그래서 참조 주소가 동일한 것으로 나타난다. 실제로 이 코드에서 3을 128로 바꾸면 true, false, false가 나온다.

# Kotlin 자료형 변환
이제 자료형을 자세히 알아봤으니 자료형을 바꾸는 방법과 변수의 비교를 알아보자.  
프로그래밍을 하다보면 자료형을 바꾸는 과정인 타입캐스팅을 빈번하게 겪을 수 있다. 특히 안드로이드 개발을 하는 과정에서 많이 사용된다. 코틀린의 자료형 관리방식은 크게 보면 2가지 방식이 있을 수 있다.  

1. 자료형 변환 메서드
2. 넓은 폭의 스마트 캐스트 활용

## 자료형 변환 메서드
자료형 변환 메서드는 일종의 강제 형변환과 같다. 길게 설명할 것 없이 바로 예제코드를 보자.  
```kotlin
fun main() {
  val a: Int = 1
  val b: Double = a.toDouble() // casting method
}
```
쉽다. 그냥 쓰면 된다. 캐스팅 메서드는 자료형 종류별로 다 있다. 그래서 종류별로 골라서 사용하면 된다. 항상 느끼지만 자바기반의 언어는 없는 게 없다.

## 스마트 캐스트
자료형 변환 메서드보다 덜 귀찮은 방식이 있다. 바로 스마트 캐스트이다. 코틀린에는 is연산자와 Number, Any와 같은 자료형으로 스마트 캐스트를 도와준다. 우선 Number와 Any를 알아보자.

## 스마트 캐스트 참조 자료형
```kotlin
fun main() {
  var a: Any = 1 // a는 Int로 선언된다.
  a = 10L        // Long형으로 타입 캐스팅된다.

  var test: Number = 12.2 // 12.2에 의해 test는 Float형으로 스마트 캐스트
  println("$test")

  test = 12 // Int형으로 스마트 캐스트
  println("$test")

  test = 120L // Long형으로 스마트 캐스트
  println("$test")

  test += 12.0f // Float형으로 스마트 캐스트
  println("$test")
}
```
이건 또 무슨 일인가 싶다. 머리가 또 띵해지는 현상이다. 이게 가능한 이유는 참조 자료형으로 선언되는 `Int`, `Double`, `Float`, `Long`은 상위 자료형은 `Number`의 하위 자료형들이다. 결국 Number로 선언된 변수는 자동적으로 값에 맞춰서 캐스팅이 진행된다. Decompile 코드를 보면 그냥 강제 형변환하는 형식을 띄고 있다. ~~이게 은근 Decompile한 코드 보는 재미가 쏠쏠하다. 신기함~~  

## is 연산자
이번엔 is 연산자를 알아보자. 코틀린에는 is 연산자가 존재한다. 일종의 타입 검사 연산자이면서 스마트 캐스트 연산자이기도 하다. 코드를 보면서 설명해보자.
```kotlin
fun main() {
  demo("hello")
  demo(3)
}

fun demo(x: Any) {
  if (x is String) {
    print(x.length) // x is automatically cast to String
  }

  if (x is Int) {
    print("x is ${x.javaClass} type")
  }
}
```
`is`연산자를 활용하면 현재 확인하는 변수가 내가 확인하고자 하는 자료형이 맞는지 혹은 캐스팅이 가능한지를 알려준다. 이 연산자를 스마트 캐스트 자료형과 사용하면 `is`연산자를 통과한 변수는 해당 자료형으로 자료형을 캐스팅해준다.

<div class="txc-textbox" style="border: 1px solid #eeeeee; background-color: #eeeeee; padding: 10px;" markdown="1">
<p style="text-align: center;">&lt; BoostCourse Suppoters 3rd - Kotlin &gt;</p>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourser1/">[boostcourse] Kotlin기본 - Kotlin은 어떤 언어인가?</a><br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse2/">[boostcourse] Kotlin기본 - Kotlin의 구조와 자료형</a><br>
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse3/">[boostcourse] Kotlin기본 - Kotlin의 Null 처리<br>
</div>
<br>


<img src="/image/boostcourse/nametag.png" style="width:500px">
