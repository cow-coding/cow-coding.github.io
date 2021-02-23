---
layout: post
title: "[boostcourse] Kotlin기본 - Kotlin의 캡슐화"
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

# 캡슐화(Encapsulation)
객체 지향 프로그래밍의 3요소 중 마지막으로 가장 중요한 캡슐화를 설명하겠다.
객체 지향이 존재하는 이유 중 하나인 정보 은닉성과 가장 밀접한 것이 캡슐화이다.
캡슐화를 왜 해야 하고 왜 정보를 은닉해야 하는 지 잘 느낌이 안 올 수 있다.
간단한 예시로 은행 입출금 시스템을 만들어 본다고 생각해보자.
설명의 편의를 위해서 C++로 코드를 설명해보겠다.

```cpp
class BankSystem {
  public:
    string userName;
    int balance;

    void deposit(int money) {
      balance += money;
    }

    void withdraw(int money) {
      if (balance < money) {
        cout << "잔액이 부족합니다\n";
      }else {
        balance -= money;
        cout << "잔액은 " << balance << " 입니다."
      }
    }
};
```
`deposit`은 입금과 관련된 함수, `withdraw`는 출금과 관련된 함수이다.
이렇게 클래스를 만들고 진행을 하면 문제가 발생한다. 그 이유는 바로 **접근 제어자**가 `public`으로 되어있기 때문이다.
이렇게 될 경우 해당 클래스 외부에서 내부에 존재하는 변수에 접근이 가능해진다. 만약 돈을 관리하는 시스템의 잔고와 관련된 변수를 돈을 입출금하는 기계 외부에서 조작이 가능하다면 굉장히 큰 문제가 발생할 것이다.
이를 위해 기능을 정의하는 클래스 내부의 메소드들을 제외하고 멤버 변수에는 접근을 못하게 막아줘야한다.
```cpp
class BankSystem {
private:
    string userName;
    int balance;

public:

    void deposit(int money) {
      balance += money;
    }

    void withdraw(int money) {
      if (balance < money) {
        cout << "잔액이 부족합니다\n";
      }else {
        balance -= money;
        cout << "잔액은 " << balance << " 입니다."
      }
    }

    void setName(string name) {
      userNmae = name;
    }

    void setBalance(int money) {
      balance = money;
    }

    string getName() {return userName;}
    int getBalance() {return balance;}
};
```
이렇게 멤버변수의 접근 제어자를 `private`로 지정해주면 외부에서는 클래스 내부의 변수에 접근할 수 없다.
그렇다면 멤버변수에 접근을 하기 위해서는 어떻게 해야할까?
이를 위해서 클래스에는 set함수와 get함수를 만들어준다. 이렇게 set, get함수를 만들면 중간 매개자의 역할을 set, get함수가 맡게된다.
즉 개발을 할 때, 혹은 특정상황에서 멤버변수에 접근을 하기 위해서 set과 get이라는 도구를 통해서 간접적으로 접근을 하는 것이다.

즉 간단하게 말해서 캡슐화는 클래스의 정보를 안전하게 보호하기 위해서 필요한 작업이라고 생각하면 된다.

# Koltin의 캡슐화
우선 코틀린의 캡슐화를 설명하기 이전에 코틀린에서 사용되는 가시성 지시자(visibility modifier)의 종류를 알아보겠다.

- private : 이 지시자가 붙은 요소는 외부에서 접근할 수 없다.
- public : 이 지시자가 붙은 요소는 어디서든 접근할 수 있다. (default)
- protected : 이 지시자가 붙으면 외부에서는 접근할 수 없지만 하위 상속 요소에서는 접근이 가능하다.
- internal : 같은 정의의 모듈에서는 접근이 가능하다.

코틀린에서는 멤버 변수 뿐 아니라 클래스, 메소드에도 지시자를 붙여서 활용할 수 있다.

# private, public 접근 지시자
## 예시 코드 1
```kotlin
private class PrivateClass {
  private var i = 1

  private fun privateFunc() {
    i += 1
  }

  fun access() {
    privateFunc()
  }
}

fun main() {
  val pc = PrivateClass() // 최상위 함수에서는 private객체 클래스를 생성가능
  // pc.i = 3
  // pc.privateFunc()
  pc.access()
}
```
이렇게 작성을 하면 `pc.i = 3`에 빨간줄이 그어질 것이다. 이뉴는 간단한데, private로 선언된 변수는 해당 클래스 외부에서는 접근할 수 없기 때문이다.
이런 경우에는 `privateCLass`에서 `private var i`를 `var i`로 변경해주면 외부에서 접근이 가능하다.
마찬가지로 `privateFunc()`도 외부에서 사용할 수 없는 함수이므로 빨간줄이 나오게 된다.
이를 해결하기 위해 클래스 내부에 `access()`함수를 만들어 접근을 하게 해준다.

## 예시 코드 2
```kotlin
private class PrivateClass {
  private var i = 1

  private fun privateFunc() {
    i += 1
  }

  fun access() {
    privateFunc
  }
}

class OtherClass {
  // val opc = PrivateClass() // opc는 private로 선언되어야해서 외부에 노출시키면 안된다.
  fun test() {
    val pc = PrivateClass()
  }
}

fun main() {
  val pc = PrivateClass() // 최상위 함수에서는 private객체 클래스를 생성가능
  // pc.i = 3
  // pc.privateFunc()
  pc.access()
}
```
이렇게 다른 클래스에서 private 클래스를 외부에 노출되는 형식으로 선언할 수가 없다.
함수 내부에 넣어서 선언을 해주면 사용이 가능해진다.

# protected 접근 지시자
## 예시 코드
```kotlin
open class Base {
  protected vat i = 1

  protected fun protectedFunc() {

  }
}

class Derived : Base() {
  var i = i + 1

  fun derivedFunc() : Int {
    protectedFunc()
    return i
  }
}

class Other {
  fun other() {
    val base = Base()
    // base.i = 3 // 불가능
  }
}
```
두 개의 클래스가 있는데 상속된 클래스에서는 `protected` 접근 제어자 함수와 멤버 변수에 자유롭게 접근이 가능하다.
하지만 상속이 되지 않은 `Other`클래스에서는 `Base`클래스의 멤버변수에 접근할 수 없다.

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
<a href="https://cow-coding.github.io/kotlin/boost%20course/computer%20science/boostcourse9/">[boostcourse] Kotlin기본 - Kotlin의 다형성<br>
</div>
<br>

<img src="/image/boostcourse/nametag.png" style="width:500px">
