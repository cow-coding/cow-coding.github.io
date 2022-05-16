---
layout: post
date: 2022-03-07 02:40:00 PM
title: "[BoostCamp AI Tech / RecSys] Day32 - 추천 시스템 개념"
categories: [NAVER BoostCamp AI Tech, Level 2 - 추천 시스템 이론]
tags: [Deep Learning, NAVER, BoostCamp, AI Tech, Recommender System]
math: true
---
# RecSys : 추천 시스템 개념

---

## 추천 시스템이란?

- 현재 많은 서비스들은 다양하고 많은 item으로 구성
- item을 소비자에게 제공하는 것이 핵심이고 제공 방법은 크게 2가지 방식이 존재
  - pull 방식 : 소비자가 직접 서비스에 searching과 같은 방식을 통해 자신의 의도를 전달하여 item을 탐색
  - push 방식 : 서비스가 소비자에게 어울리는 item을 추천 및 제공하는 방식
- 과거에 비해 현재는 **정보가 과다하게 많은** 시대라 사용자가 직접 item을 탐색하는 방식은 시간이 오래 걸림  
  $\rightarrow$ 사용자의 만족도 감소

![](/image/boostcamp/recsys/basic/longtail.png){: w="500"}*Long tail phenomenon*

- 많은 정보 속에 인기있는 소수의 item만 선택적으로 소비되기 때문에 **Long tail phenomenon**이 발생하고 이는 item의 수가 늘어날 수록 꼬리의 길이는 길어짐
- 이런 long-tail 부분의 item을 추천해주는 것이 추천 시스템의 본질이자 **개인화 추천**의 핵심 목적 (long-tail recommendation)
- long-tail recommendation이 잘 될수록 소비자는 개인화 추천이 잘 되었다고 느끼고 높은 만족도를 느낌  
  ex1) 알 수 없는 유튜브 알고리즘이 적은 조회수의 영상을 추천해주는 경우  
  ex2) SNS는 유명인을 추천해주는 것도 좋지만 자신과 실제로 관련있는 사람들만 추천해주는 것이 더 만족도가 높음

---

## 추천 시스템의 데이터 구조

### 유저 관련 정보
- 유저 profiling : 유저에 관련된 정보를 구축하여 개별 혹은 그룹으로 추천 제공
- 식별자 (identifier) : 유저 ID, device ID (광고추천), 브라우저 쿠키 (비로그인 상태)
- 데모그래픽 정보 : 성별, 연령, 지역, 관심사 등 유저에 직접적으로 관련이 깊은 정보
  - 직접 수집을 하는 것이 가장 좋지만 최근에는 개인정보 issue로 수집이 어려움
  - 성별, 연령은 다른 데이터를 통해 추정값으로 사용하는 경우도 있음
- 유저 행동 정보
  - 페이지 방문 기록, 아이템 평가, 구매 등의 feedback 기록

### 아이템 관련 정보
- 추천 아이템 종류 : 포탈, 광고, 미디어 등 사용되는 환경에 따라 아이템의 종류는 달라짐
- 아이템 profiling : 아이템도 유저처럼 profiling을 진행
  - Item ID : 아이템 구분을 위한 식별자
  - Item metadata : 아이템의 고유 정보이며 영화 장르, 상품 카테고리 등 해당하는 아이템이 갖고 있는 고유한 특성과 정보를 의미

### 유저-아이템 상호작용 정보 (Feedback)
- Explicit Feedback
  - 유저가 직접 아이템에 대한 평가(만족도)를 기록한 경우  
    ex) 평점
- Implicit Feedback
  - 유저가 직접적으로 아이템에 대한 선호 강도를 표시하진 않았지만 아이템을 클릭, 접속 시간, 구매와 같이 선호와 관련된 행동을 보여준 경우  
    ex) 유저의 상품 구매 여부가 Y로 설정되는 경우
- 일반적으로 explicit보다 implicit data가 더 많기 때문에 implicit data에 대한 연구가 많이 이뤄지고 있음
