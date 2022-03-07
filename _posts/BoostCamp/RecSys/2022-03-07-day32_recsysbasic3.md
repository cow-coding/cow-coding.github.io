---
layout: post
date: 2022-03-07 05:22:00 PM
title: "[BoostCamp AI Tech / RecSys] Day32 - 추천 시스템 종류와 연관 분석"
categories: [NAVER BoostCamp AI Tech, Recommender System]
tags: [Deep Learning, NAVER, BoostCamp, AI Tech, Recommender System]
math: true
---
# RecSys : 추천 시스템 종류와 연관 분석

---

## 추천 시스템 종류

1. Simple Aggregation (popularity, average score, recent)
2. Association Analysis
   - Content-based Recommendation
3. Collaborative Filtering
4. Item2Vec Recommendationn and ANN
5. Deep Learning-based Recommendation
6. Contex-aware Recommendation
7. Multi-Armed Bandit(MAB)-based Recommnedation

- 여기서 1~4는 일반적으로 classic method고 5~7은 DL을 사용하는 방식인데 현재 추천 시스템에서는 DL이 드라마틱한 성능을 보이지는 않고 있음
- 또한 추천이라는 컨셉상 inference time이 길면 오히려 만족도가 떨어질 수 있으므로 DL을 자주 사용하진 않음

---

## 연관 분석 (association analysis)

- 연관 분석이란 **장바구니 분석** 혹은 **서열 분석**이라 함
- 상품 구매, 조회 등 **연속적인 거래에서 규칙을 발견**하기 위해 적용

### 연관 규칙 분석

$$
X \rightarrow Y \text{가 존재할 때, (X, Y: itemset, N: 전체 transaction 수)}
$$

- 연관 규칙
  - 주어진 transaction에서 **하나의 상품이 등장시 다른 상품의 등장 규칙을 찾는 것**
  - 규칙 (rule)의 구조  
    IF (condition) THEN (result) : {condition} $\rightarrow$ {result}
  - 연관 규칙 (association rule)의 구조  
    IF (antecendent) THEN (consequent)  
    특정 사건이 발생했을 때 함께 **빈번하게 발생하는 또 다른 사건 규칙**을 의미
- Itemset
  - antecedent와 consequent 각각을 구성하는 상품들의 집합
  - antecedent와 consequent는 서로소를 만족함  
    ex) antecedent: {빵, 버터}, consequent: {우유}
- support count($\sigma$)
  - 전체 transaction data에서 itemset이 등장하는 횟수
- **support**
  - itemset이 전체 transaction data에서 등장하는 비율
  - 공식은 일반적으로 $\text{support count}/\text{\# of transaction}$
- 빈발 집합 (Frequent Itemset)
  - **유저가 지정한 minimum support (threshold) 이상의 itemset을 의미**
  - 반대 성향은 infrequent itemset이라 함

### support

$$
\begin{aligned}
    s(X) = \frac{n(X)}{N}=P(X) \geq s(X \rightarrow Y) = \frac{n(X \cup Y)}{N} = P(X \cap Y)
\end{aligned}
$$

- 연관 규칙에서 자주 사용되는 척도 중 하나
- **두 itemset X, Y를 모두 포함하는 transaction의 비율**  
  = 전체 transaction에 대한 itemset의 확률값
- 좋은 규칙을 찾거나, 불필요한 연산을 줄일 때 사용

### confidence

$$
c(X \rightarrow Y) = \frac{n(X \cup Y)}{n(X)} = \frac{s(X\rightarrow Y)}{s(X)} = \frac{P(X \cap Y)}{P(X)} = P(Y|X)
$$

- X가 포함된 transaction 중 Y도 초함하는 transaction 비율
- **confidence가 높을수록 유용한 규칙**

### lift

$$
l(X \rightarrow Y) = \frac{P(Y|X)}{P(Y)} = \frac{P(X \cap Y)}{P(X)P(Y)} = \frac{s(X\rightarrow Y)}{s(X)s(Y)} = \frac{c(X \rightarrow Y)}{s(Y)}
$$

- support와 confidence와 다르게 1을 기준으로 비교
- lift = 1 : X, Y는 독립
- lift가 1보다 크면 양의 상관관계, 작으면 음의 상관관계

### 연관 규칙 사용

- item 수가 많아질수록 rule의 수가 너무 많아지므로 유의미한 rule만 사용

1. minimum support, minimum confidence로 의미 없는 rule filtering
2. lift 값의 내림차순으로 의미있는 rule 평가
    - 이는 lift가 antencedent와 consequent의 연관분석 값을 의미하므로 큰 값일수록 둘의 상관관계가 높음
    - lift는 user의 질적 만족도와 관련성이 높음

---

## 연관 규칙 탐색

- transaction이 주어진 경우에 가능한 연관 규칙을 찾는 방법
- Brute-force approach
  - 가능한 모든 연관 규칙에 대해 support와 confidence를 계산
  - 모든 case를 탐색하므로 계산량이 상당함
  - $Complexity \sim O(NW M), M = 2^d \text{(d: \# of unique items)}$
- brute-force 방식의 문제점을 해결하고자 다양한 방법이 도입
- rule mining 과정에서 많은 cost가 들어가는 부분은 **minimum support 이상의 모든 itemset을 생성하는 것**이므로 이 부분의 cost를 줄일 필요가 있음
  - Apriori 알고리즘 : 가지치기를 활용하여 탐색하는 M을 줄임
  - Direct Hashing & Pruning (DHP) 알고리즘 : itemset 크기가 커지면 전체 N개 transaction보다 적은 개수 탐색
  - FP-Growth 알고리즘 : 호율적 자료구조를 활용하여 후보 Itemset과 transaction 저장