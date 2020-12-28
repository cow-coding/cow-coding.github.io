---
title: PL - 프로그래밍 언어의 패러다임
date: 2020-10-11
categories: [Programming Language, Computer Scienceence]
excerpt: 프로그래밍 패러다임
tags:
  - Programming-Language
  - Paradigm

---
* TOC
{:toc}
{: .toc }

# 시작하며

Java활용 포스트에서 프로그래밍 방식을 알아봤었다. 이번에 다룰 프로그래밍 언어의 패러다임에서도 비슷한 내용을 좀 더 자세히 다룰 예정이다.  
프로그래밍 언어의 패러다임은 크게 4가지 종류로 나눌 수 있다.

1. 명령형 프로그래밍 (Imperative / procedural programming)
2. 논리형 프로그래밍 (Logical / declarative programming)
3. 함수형 프로그래밍 (Functional programming)
4. 객체-지향형 프로그래밍 (Object-Oriented programming)

# 명령형 프로그래밍

명령형 프로그래밍은 다른 말로는 절차형 프로그래밍이라고도 한다.  
대표적인 언어로는 C, COBOL, Fortran과 같은 언어가 존재한다.

< C >

```c
#include <stdio.h>

int main(void) {
  printf("%s\n", "Hello World~");
  return 0;
}
```

C와 같은 코드들은 코드를 읽는 순서가 항상 일정하다. 위에서 아래(Top-Down)로 읽는 게 일반적이고 일정한 방식으로 읽게 된다. 이러한 프로그래밍 방식을 명령형 프로그래밍이라고 한다.  
어떻게 보면 가장 일반적인 프로그래밍 방식이라고 보면 된다.

# 논리형 프로그래밍

논리형 프로그래밍은 선언적 프로그래밍이라고도 부른다. 절차형 프로그래밍과 다르게 어떠한 문제해결을 특정한 명시적 규칙으로 수행하는 것을 선언적 프로그래밍이라고 한다.  
대표적인 언어로는 Prolog라는 언어가 있다.

> **우리는 지금 커피숍에 와 있다. 커피를 주문하기 위해서는 어떻게 해야 할까?**

절차적 프로그래밍의 접근 방식은 다음과 같다.

1. 커피숍에 들어간다.
2. 바리스타에게 먹고 싶은 커피를 주문하기위해 줄을 선다.
3. 주문을 한다. (자세한 요구 사항을 말하는 것도 포함)
4. 가격 지불을 한다. (포인트 적립이 있다면 한다.)
5. 커피를 받고 마실 장소를 정한다.

선언적 프로그래밍의 접근 방식은 절차형과 다르게 간단하게 주문이 가능하다.

> "Venti 사이즈 아메리카노 하나 주세요."

논리 프로그래밍에서는 문제의 요구사항을 논리식으로 표현하고 논리식의 무결성을 체크하는 것이 중점이다.  
그 후 논리사항을 처리하는 것은 컴퓨터가 해결해야하는 일이다.  
그래서 자료의 처리 과정보다 요구사항을 전달하는 것에 초점이 맞춰져 있으므로 논리형 프로그래밍은 선언적 프로그래밍의 일부이다.

## Prolog

논리형 프로그래밍의 대표적인 언어인 Prolog는 SQL과 비슷하게 2가지 구조적 관점에서 접근을 하게된다. 자료에대한 표현과 질의라는 관점으로 접근하게 된다.

Prolog에서는 3가지 기본문이 사용된다.

1. Facts
2. Rules
3. Queries

Prolog는 Facts(사실들)와 Rules(규칙들)을 제공을 해서 해당 자료들로 데이터베이스를 구축한다.  
그렇게 구성된 데이터베이스에 쿼리질의를 통해서 True False을 제공받는다. 보통 True를 기본으로 세팅한다.  
간단한 예시 코드를 작성해보자.

1. Facts : 소크라테스는 사람이다.
2. Rules : 모든 사람은 죽는다.
3. Queries : 소크라테스는 죽습니까?

이렇게 전체적인 프로그래밍 구조가 잡힌다.

< Prolog >
```prolog
human(socrates). /*Facts*/

mortal(x) :- human(x). /* :- is rule mark */
```
이렇게 코드를 작성하고 저장한 뒤 콘솔에 다음과 같은 질의를 던지면 답을 얻을 수 있다.
```prolog
?- [db].
?- mortal(socrates).
true
```
이렇게 우리가 구성한 자료의 구성과 질의로 답을 얻어낼 수 있다.

# 함수형 프로그래밍

명령형 프로그래밍에서는 주어진 데이터를 원하는 형태로 저장하다보니 메모리 관리에 어려움이 발생한다. 그래서 결과적으로 원하는 문제를 해결하는 것보다 메모리 관리에 더 중점이 가는 문제가 발생했다.  
이를 위해 등장한 것이 함수형 프로그래밍이다.  

함수형 프로그래밍은 주어진 데이터를 값으로 간주하고 새로운 값을 생성하는 함수에 초점을 맞춰서 메모리 관리 부담을 줄였다.

대표적인 언어는 LISP와 Haskell이 있다. 이런 함수형 프로그래밍 방식을 우리가 자주 쓰는 객체지향 언어인 Java와 C++에 추가가 되는 방향으로 발전했다.

# 명령형 방식과 함수형 방식 비교

간단한 예시로 팩토리얼을 명령형과 함수형으로 비교해보겠다.

## 명령형 방식 (Imperative)

```java
public static void main(String[] args) {
  Scanner sc = new Scanner(System.in);
  System.out.println("Number : ");
  int j = sc.nextInt();

  int result = 1;
  for (int i = j; i > 0 ; i--)
    result = result * i;

  System.out.println("Factorial Number : " + result);
}
```

그냥 일반적인 작성방식이다. 따로 설명할건 없고... 함수형으로 넘어가보자.

## 함수형 방식 (Functional)

함수형 방식에서는 옛날 방식과 요즘 방식으로 구분할 수 있다.

< Old Style >
```java
public static int factorial(int n) {
  if (n == 1) return n;
  else return n * factorial(n - 1);
}

public static void main(String[] args) {
  Scanner sc = new Scanner(System.in);
  System.out.println("Number : ");
  int j = sc.nextInt();

  System.out.println("Factorial Number : " + factorial(j));
}
```

< Modern Style >
```java
public static void main(String[] args) {
  Scanner sc = new Scanner(System.in);
  System.out.println("Number : ");
  int j = sc.nextInt();

   System.out.println("Factorial Number : " + IntStream.range(2, j+1)
   .reduce(1, (a, b) -> a * b));
}
```

Old style의 함수형 프로그래밍은 따로 sub program을 만들어서 작성을 했다. 실제로 아직도 많은 함수들이 Old style과 같은 형식으로 작성하고 있다.  
요즘 들어서 가장 많이 지원되고 있는 방식인 람다($$\lambda$$)식 방식을 활용한 것이 Modern Style이다.  
확실하게 명령형과 비교를 해보면 눈에 띄는 것들이 있다. 프로그래밍에서 필요한 부분들만 구현을하고 추가적인 메모리할당을 줄였다. 메모리 관리를 중점으로 두는 Java와 C++같은 언어들도 이제는 람다식을 지원하게 되어서 좀 더 함수형 프로그래밍에 가까운 코딩을 할 수 있게 되었다. 
