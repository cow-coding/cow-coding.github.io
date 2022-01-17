---
layout: post
date: 2022-01-18
title: "[BoostCamp AI Tech] Day2 - Module & Package"
categories: [NAVER BoostCamp AI Tech, Python]
tags: [Python, NAVER, BoostCamp, AI Tech, Python, Basic]
math: true
---

# Basic Session Day 2 : Module and Package

---
## Introduction
- 다른 프로그램을 사용하는 방식은 클래스와 모듈방식이 있다.
    - 보통 모듈을 사용하는 것이 더 좋다.
- Module : 대상의 부품 및 조각
- Package : 모듈을 모아놓은 단위

## Module
- `.py`파일을 모듈이라고 함.
- `import` 명령어를 사용하여 해당 모듈을 메모리에 load함
- namespace
    - `from [module_name] import [method]`
    - alias
        - `import pandas as pd` 처럼 `as`명령어를 사용하여 단순하게 명칭을 붙일 수 있음

## Package
- 대형 project를 만드는 코드의 묶음
- module들을 모아놓은 module의 합이라고 할 수 있다.
- `__init__.py`, `__main.py__`와 같은 키워드 파일들을 사용한다.
    - python 3.3전에는 `__init__.py`가 반드시 필요했지만 이후에는 없어도 상관이 없어졌다.
    - `__init__.py`에는 `__all__` keyword를 사용하여 module을 미리 선언한다.

