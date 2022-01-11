---
layout: post
title: "[Data Structure] Analysis of Algorithms (알고리즘 분석)"
categories: [DataStructure, C++]
tags:
- DataStructure
- Algorithm Anlaysis
- Big-O notation
- pseudocode
---
<style>
img {
  width:300px;
  display:block;
  margin:0px auto;
}
</style>

 

# Algorithm Analysis (알고리즘 분석)
## Asymtotic Analysis (점근적 분석)
알고리즘을 비교, 분석할 때는 일반적으로 점근적 분석방법을 따른다. 점근적 분석방법은 아래의 과정들로 진행된다.
1. 의사코드 (pseudo code)
2. 연산자 개수 카운트 (primitive operation counting)
3. input size n에 대한 함수로 표현
4. Big-O notation으로 표기

위 순서에 있는 내용을 기준으로 이번 글을 다루겠다.

## Running time (실행시간)
알고리즘의 개념적 정의는 아래와 같다.
> 0개 이상의 입력값이 주어질 때, 1개 이상의 출력이 나오는 절차나 방법  

이런 정의에서 알 수 있듯이 우리는 특정 입력 값의 크기에따른 출력의 결과를 계산해야한다. 출력결과가 나오기까지 걸리는 시간을 가장 최소로 만들어주는 것이 가장 이상적인 알고리즘 해결방식이다.  
일반적으로 알고리즘 구동시간은 Best case, Average case, Worst case로 구분을 한다.  
여기서 프로그래밍을 할 때 가장 중점적으로 바라보는 시간은 **Worst case의 경우** 이다.  
Worst case를 중점적으로 바라보는 이유는 **그 어떤 시간보다도 가장 오래 걸리는 경우의 시간** 이기때문이다. 이러한 접근은 알고리즘을 보수적으로 접근하는 것인데, 이렇게 보수적으로 알고리즘을 접근하면 알고리즘의 구동시간을 보장할 수 있다.  
쉽게 말하면 Worst case time은 **"아무리 못해도 이 시간은 걸린다"** 라는 의미를 담고있다.

## Pseudocode (의사코드)
알고리즘을 작성하기 이전에 일반적으로 의사코드를 작성하는 순서를 갖는다.  
의사코드란 일반적인 문장보다는 구조적으로 적으며 실제 programming 보다는 덜 자세하게 적는 방식을 말한다. 아래가 그 예시이다.

```
Algorithm arryMax(A, n)
  Input array A of n integers
  Output maximum element of A

  currentMax <- A[0]

  for i <- 1 to n - 1 do
    if A[i] > currentMax then
      currentMax <- A[i]
  return currentMax
```  
확실히 일반적인 코드보다는 간단한 구성을 취하고있다. 하지만 일반적인 문장을 풀어쓴 것보다는 프로그래밍 코드에 가깝게 보인다.

## Counting primitive operation (연산자 카운팅)
의사코드로 코드를 구성했으니 이제 해당 코드가 어느정도의 시간이 걸릴지 계산을 해야한다. 계산을 하는 과정에서 연산자들을 카운팅 하게되는데, 대입연산, 계산연산, 비교연산 등이 있다. 위에 작성한 의사코드를 예시로 연산자 카운트를 해보겠다.
```
Algorithm arryMax(A, n)
  currentMax <- A[0]

  for i <- 1 to n - 1 do
    if A[i] > currentMax then
      currentMax <- A[i]
  return currentMax
```  
- `currentMax <- A[0]`에는 총 1번의 연산이 있는 것 같지만 사실 2번의 연산이 수행된다. 우선 **대입연산 1번** 과 **Array index에 접근하는 연산 1번** 이 있으므로 총 2번의 연산을 활용한다.
- `for i <- 1 to n - 1 do`에는 2n번의 연산이 수행된다. i가 1부터 n-1까지 진행을 하면 총 n-1번의 연산이 있는 것으로 착각할 수 있는데, 이것은 for문의 수행순서를 잘 뜯어보면 그렇지 않다는 것을 알 수 있다.  
for문의 구성은 `for(int i = 1; i <= n-1; i++)`과 같은 식으로 작성을 하는데, `i = 1`에서 **대입연산 1번** , `i <= n-1`은 n-1까지 i를 비교하고 n에 와서 1번 더 비교를 한다. 결국 **비교연산을 n번** 수행한다. 그리고 `i++`인 i의 증가 연산이 총 i가 1에서 n-1까지 증가시키므로 **n-1번 증가 연산** 이 수행된다. 결국 총 2n번의 수행연산이 이루어진다.
- 그 다음 `if A[i] > currentMax then`은 index 연산 1번, 비교연산 1번으로 2번의 연산을 반복 횟수 n-1만큼 진행하므로 2(n-1)의 연산횟수를 가진다. 그 다음의 `
currentMax <- A[i]`도 마찬가지로 작동한다.
- 마지막으로 `return currentMax`에서 1번의 연산이 수행되므로 이 알고리즘의 **총 수행연산은 6n-1번** 이다.

## Growth Rate
그래프의 증가율은 매우 중요한 포인트이다. 증가율은 알고리즘의 연산 수에 달려있는데, 그 시간이 어떠냐에 따라 압도적인 차이를 보여주기도한다.  

|if runtime is...|time for n + 1|time for 2n|time for 4n|
|:---:|:---:|:---:|:---:|
|$$c \log{n}$$|$$c \log{(n+1)}$$|$$c (\log{n}+1)$$|$$c(\log{n}+2)$$|
|$$cn$$|$$c(n+1)$$|$$2c n$$|$$4c n$$|
|$$c n \log{n}$$|$$c n \log{n}+cn$$|$$2c n \log{n}+2cn$$|$$4c n \log{n}+4cn$$|
|$$cn^2$$|$$cn^2 + 2cn$$|$$4cn^2$$|$$16cn^2$$|
|$$cn^3$$|$$cn^3+3cn^2$$|$$8cn^3$$|$$64cn^3$$|
|$$c2^n$$|$$c2^{n+1}$$|$$c2^{2n}$$|$$c2^{4n}$$|

위에서 볼 수 있듯이 로그연산에서는 큰 증가를 보이지 않지만 다항연산과 지수연산에서는 굉장히 큰 증가폭을 보여주게된다.

## Constant Factors
상수요소들인 단순 산수연산이나 대입연산과 같은 것들은 곱하기 연산들에 큰 영향을 미치지 못한다. 예를 들어 $$10n^2 + 10^5$$이라는 식이 있으면 아무리 10^5이 큰 수라고 해도 $$n^2$$에 들어가는 수가 어떻게 변하냐에 따라 더 영향이 크게된다.  
고등학교때 배운 극한에서 n을 무한대로 보낼때 최고차항만 고려해도 되는 것과 같은 이치이다.

## Big-O notation
프로그래밍에서 시간이 얼마나 걸리냐를 나타내는 시간복잡도(time complexity)를 빅오 표기법으로 나타낸다. 우리가 계산하고자하는 함수를 $$f(n)$$이라고 하고 비교기준 함수역할을 $$g(n)$$이라고하면, $$f(n) \in O(g(n))$$이다. 정확하게 수식으로 나타내면 아래와 같다.  

$$f(n) \leq cg(n) \text{ for } n \geq n_0$$  

수식으로 볼 수 있듯이 $$f(n)$$이 가지는 upper-bound(상한)를 나타내주는 것이 바로 빅오 표기법이다. 그냥 단순히 위의 수식을 만족하는 c와 n이 존재하기만 하면 된다.

## 효율적인 계산 아이디어 구상
같은 역할을 하는 알고리즘이라도 우리는 이제 시간복잡도를 고려해야 할 필요가 있다. 사실 시간복잡도 뿐 아니라 공간복잡도(space complexity)도 있는데, 공간복잡도는 현대 기술력으로 어느정도 마무리가 되었다. 그래서 보통 시간복잡도에 공간복잡도가 따라온다고 한다.  
효율적인 계산을 고려하는 예시는 접두사 평균계산이 있다.  
```
Algorithm prefixAverages1(X, n)
  Input array X of n integers
  Output array A of prefix averages of X
                                  # operations
  A <- new array of n integers    #   n
  for i <- 0 to n - 1 do          #   n
    s <- X[0]                     #   n
    for j <- 1 to i do            # 1+2+...+(n-1)
      s <- s + X[j]               # 1+2+...+(n-1)
    A[i] <- s/(i + 1)             #   n
  return A                        #   1
```
위 의사코드는 1까지의 평균, 2까지의 평균, 3까지의 평균을 계산해주는 알고리즘이다.  
의사코드를 빅오 표기법으로 나타내면, $$O(n^2)$$이다. ($$\sum_{i=1}^{n}i=\frac{n(n+1)}{2}$$) 이 알고리즘은 현재 2차식의 시간을 가지고 있는데, 아이디어를 바꿔보면 선형시간으로 변경할 수 있다.  
```
Algorithm prefixAverages2(X, n)
  Input array X of n integers
  Output array A of prefix averages of X
                                  # operations
  A <- new array of n integers    #   n
  s <- 0                          #   1
  for i <- 0 to n - 1 do          #   n
    s <- s + X[i]                 #   n
    A[i] <- s / (i + 1)           #   n
  return A                        #   1
```  
맨 처음의 의사코드는 2중 for문을 활용해서 합을 구한다. 하지만 두번째 의사코드는 이전까지의 합을 s에 저장해놓고 불러오는 식으로 계산을 하기때문에 for문 1개를 아낄 수 있어서 선형시간이 나타나게된다. 결국 $$O(n)$$의 시간이 걸린다.

## Big-Omega and Big-Theta
Big-O이외에도 시간복잡도를 나타내는 함수는 2가지가 더 있다. 바로 빅 오메가와 빅 세타 표기법이다.  
- 우선 Big-Omega는 Big-O의 반대격인 lower-bound(하한)를 나타낸다. 수식으로 나타내면 $$f(n) \geq cg(n) \text{ for } n \geq n_0$$이다.
- Big-Theta는 Big-O와 Big-Omega를 합쳐놓은 형태의 시간복잡도이다. 일반적으로 Big-O표기법으로 나타낸다고하는데 사실 우리가 사용하는 Big-O는 Big-Theta를 나타내는 것이다.  
수식으로 나타내면 $$c'g(n)\leq f(n)\leq c''g(n)$$이다.
