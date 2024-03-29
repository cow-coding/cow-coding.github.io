---
layout: post
date: 2022-02-14 01:00:00 PM
title: "[BoostCamp AI Tech / Level 3 - Product Serving] Day18 - ML Project Life Cycle"
categories: [NAVER BoostCamp AI Tech, Level 3 - Product Serving]
tags: [NAVER, BoostCamp, AI Tech, Product Serving, MLOps]
math: true
---
# Product Serving : ML Project Life Cycle

---

## 문제 정의의 중요성

- 문제 정의 : 특정 현상을 파악하고 현상에 있는 **문제(Problem)**를 정의하는 과정
- **문제를 잘 풀기 위해서는 문제 정의(Probelm Decision)가 매우 중요**
- 기본적으로 문제 인식을 잘 해야 이후 프로세스를 짤 수 있음
- ML project에서는 **How 보다는 Why에 집중**하는 것이 중요

---

## 프로젝트 Flow

### 1. 현상파악

- 발생한 현상을 분석하고 현재 상황을 파악
  - 어떤 일이 발생하는가?
  - 문제의 어려움이 무엇인가?
  - 추가적으로 무엇을 해볼 수 있을까?
  - 어떤 가설을 만들어 볼 수 있을까?
  - 어떤 데이터가 있을까?

### 2. 구체적 문제 정의

- 무엇을 해결하고 싶은가?
- 무엇을 알고 싶은가?
- 앞서 발생한 현상을 좀 더 **구체적이고 명확한 용어로 재정의**
- 해결 방안을 고려할 때, **비용적 측면**과 **시간적 제약** 등 현실적인 방안을 잘 고려해야 함
- 데이터로 할 수 있는 일을 진행하되 **무조건 알고리즘이 최고의 접근은 아닐 수 있음**
- 원인을 파고들면 구체적 해결책이 나올 수 있음
  - 문제를 쪼개서 분석
  - 여러 해결방안을 확인
  - 점진적 실행

### 3. 프로젝트 설계

- 문제 정의에 기반해서 프로젝트를 설계
- 해결하고자 하는 문제 구체화
- 머신러닝 문제 타당성 확인
  - **흥미성**보다는 **제품, 회사 비즈니스에서 어떤 가치를 줄 수 있느냐**가 중요
  - 필요한 데이터 종류, 기존 모델이 있는지를 고려
  - 반드시 머신러닝만이 답이 아닐 수도 있음
  - 머신러닝이 사용되면 좋은 경우
    - **특정 패턴**이 존재하거나 발견되는 경우
    - **목적 함수** : 학습을 위한 목적함수를 만들 수 있어야함
    - **복잡성** : 어느정도 패턴이 복잡함을 가져야함  
        너무 간단한 문제라면 오히려 과한 사용일 수 있음
    - **데이터 존재 여부** : 데이터가 존재하거나 수집 가능해야 함
    - **반복** : 사람이 반복적인 수행을 하는 경우 = 패턴이 존재
  - 머신러닝을 사용하면 좋지 않은 경우
    - 비윤리적 문제
    - 간단한 case
    - 좋은 데이터 수집이 어려운 경우
    - 예측 오류가 치명적인 결과를 내는 경우
- target과 metric을 설정하는 것이 중요
  - Goal : 프로젝트의 큰 목적
  - Objectives : 목적 달성을 위한 세부단계 목표
  - NSFW (Not Safe For Work)는 사용자에게 불쾌감을 주므로 조심해야함
  - 윤리적인 문제를 반드시 고려해야함 (극단적 클릭 유도로 자극적 컨텐츠 노출)
  - Multiple Objective Optimization은 서로 충돌이 발생할 수 있으므로 선정 기준을 잘 선택해야함
- 데이터의 value와 품질에 충돌이 일어나는 경우
  - 방법 1 : 두 loss를 하나의 loss로 결합한 loss를 최소화하기 위해 단일모델을 학습
    - $\alpha \text{ qualty loss} + \beta \text{ engagement loss} = \text{loss}$  
    에서 $\alpha$, $\beta$를 조정해야하지만 매 조정때마다 재학습을 해야하는 문제가 있음
  - 방법 2 : **2개 모델**로 각 loss를 학습
    - 각 loss에 대해 $\alpha$, $\beta$를 따로 조정이 가능하고 이미 각 loss가 최소이므로 모델을 재학습하지 않아도 됨
- 베이스라인을 설정해야 비교가 가능
  - 간단한 모델부터 시작해야 모델의 위험을 낮추는 방향으로 갈 수 있음
  - 가장 좋은 방법은 최악 성능인 랜덤 픽을 진행하는 허수아비 모델로 시작하는 것
  - 유사한 문제를 해결하고 있는 SOTA 논문을 파가하는 것이 좋음
- Voila, Streamlit, Gradio 같은 방식으로 프로토타입 웹페이지를 구현하는 것이 좋음
- Metric 설점
  - 모델의 성능지표는 크게 보면 **비즈니스의 지표**일 수도 있음
  - 지표를 잘 설정해야 **기존보다 더 성과가 있는지를 확인**할 수 있음
  - 이를 위해 **A/B Test**를 진행

### 4. 배포 & 모니터링

- 정의된 지표를 배포후 지속적인 모니터링을 하는 것이 중요
- 현재 모델의 결과 파악
- 잘못 예측하고 있다면 문제점 파악
- 예측 기반 파악
- Feature 사용시 어떤 부분을 특히 잘못 예측하는가?

---

## 비즈니스 모델 파악

- 회사의 비즈니스 이해도가 높을수록 문제 정의를 잘 할 가능성이 높음
- 비즈니스 모델에서 어떤 데이터가 존재하는지 알아야 기반 비즈니스 모델을 파악하기 좋음
- **회사가 어던 서비스, 가치를 제공하고 있는가?**
- 다양한 서비스 구조를 파악하고 가치 창출을 관점으로 파악하는 것이 중요
