---
layout: post
date: 2022-01-17
title: "[BoostCamp AI Tech] Day1 - Pythonic code"
categories: [NAVER BoostCamp AI Tech, Python]
tags: [Deep Learning, NAVER, BoostCamp, AI Tech, Basic, Python]
math: true
---

# Python : Pythonic code

---

## split, join
- `split` 
    - string을 특정기준으로 분리하여 리스트로 반환
    - example
        ```python
        s = "Today is good day"
        s.split()       # ["Today", "is", "good", "day"]
        ```
- `join`
    - 분리된 리스트 data를 특정 기준으로 합침
    - example
        ```python
        ' '.join(s)     # "Today is good day"
        ```

## list comprehension
- 파이썬에서 리스트를 가장 효율적으로 다룰 수 있는 방법
- list를 활용해 list를 생성하는 방식
- example
    ```python
    [i for i in range(4)]      # [0, 1, 2, 3, 4]
    ```
- 반복문 + 조건문을 활용한 응용이 많이 사용됨

## enumerate, zip
- `enumerate`
    - 데이터에 개수에 맞춰 정수도 함께 생성
    - example
        ```python
        for i, v in enumerate("ABC"):
            print(i, v)
        '''
        < output >
        0 A
        1 B
        2 C
        '''
        ```
- `zip`
    - 여러 데이터를 병렬적으로 추출
    - example
        ```python
        ls1 = [1, 2, 3, 4]
        ls2 = ["a", "b", "c", "d"]

        for a, b in zip(ls1, ls2):
            print(a, b)

        '''
        < output >
        1 a
        2 b
        3 c
        4 d
        '''
        ```
    - 만약 두 데이터의 길이가 다르면 적은쪽 데이터까지만 출력
- 두 함수를 활용하여 dict type 생성에 활용됨

## lambda, map, reduce
- `lambda` : 익명함수
    - 람다 함수는 함수를 매우 간단한 형식인 약식으로 작성한 것
    - 약식으로 작성한만큼 간단한 처리에서 활용이 많이 됩니다.
    - example
        ```python
        def plus(a, b):
            return a + b
        
        plus2 = lambda x, y : x + y
        # 두 함수는 같은 역할을 한다.
        ```
- `map` : sequence data에 정해진 함수를 mapping
    - example
        ```python
        a = list(map(str, range(10)))
        a      # ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        ```
- `reduce` : 데이터 대용량 처리에 사용되며 누적계산에 많이 사용함
    - `functools` 모듈에 존재
    - 평소 사용할 일은 별로 없지만 하둡, 스파크처럼 빅데이터 처리에서 자주 사용됨

## asterisk
- arguments나 keyword arguments의 길이가 가변적일 때 사용한다.
- `*args` : argument list
- `**kwargs` : keyword argument list
    - `**kwargs`를 사용할 때는 unpacking형태를 사용하는 것이 좋다. unpacking하기 위해서는 인자로 넘겨줄 때 앞에 *이나 **을 붙이면 된다.
- example
    ```python
    def plus(*args, **kwargs):
        return args
    
    plus(1,2,3,4, num1=1)
    
    kwar = {"num2":100, "num3":200}
    data = [1, 2, 3]
    plus(*data, **kwar)
    ```
- 함수에 들어가는 parameter를 작성하는 순서는 다음과 같다.
    - `function(arg, kwarg, *args, **kwargs)`
    - example
        ```python
        def func(a, b=1, *args, **kwargs):
            pass
        ```