---
layout: post
date: 2022-03-08 02:22:00 PM
title: "[BoostCamp AI Tech / RecSys] Day33 - Collaborative Filtering"
categories: [NAVER Boostcamp AI Tech, 추천 시스템 이론]
tags: [Deep Learning, NAVER, BoostCamp, AI Tech, Recommender System, Collaborative Filtering, CF]
math: true
---
# RecSys : Collaborative Filtering

---

## 협업필터링 : Collaborative Filtering

![](/image/boostcamp/recsys/basic/cf1.png)

- 이름의 의미대로 다른 유저들의 정보를 활용하여 특정 유저의 관심사를 예측
- **많은 유저/아이템 데이터가 축적**될수록 높은 정확도를 보여줄 것이라는 아이디어
  - DL에서 학습 데이터 양이 많아지면 성능이 좋아진다는 개념에서 착안
- 유저 A와 비슷한 취향의 유저들이 선호/비선호하는 정보를 활용하여 유저 A에게 추천하는 원리

---

## Neighborhood-based CF

- 특정 유저가 선택하지 않은 아이템 i에 어떤 평가를 내릴지를 예측하는 것이 목표
- 직관적인 아이디어이므로 **구현이 간단**하고 **이해하기 쉽다**는 장점이 있음
- 문제점
  - Scalability
    - 아이템이나 유저가 증가하면 확장성이 떨어짐
    - 메모리에 로드할 수 있는 테이블의 크기 한도가 존재함
  - Sparsity
    - 추천 시스템의 근본적인 문제인 sparse matrix에 취약함
    - NBCF는 sparsity ratio(전체 행렬 중 비어있는 원소 비율)가 99.5%를 넘지 않는 것이 좋음
- 두가지 문제점을 해결하고자 Model-based CF인 Matrix Factorization이 등장함

### 유저 기반 협업 필터링 : User-based CF

![](/image/boostcamp/recsys/basic/user_table.png)

- **두 유저가 얼마나 유사한 아이템을 선호하는가?** 가 기준
- 유저간의 유사도를 활용하여 유사도가 특정 유저와 유사도가 높은 유저들의 선호 아이템을 추천
- 위의 테이블에서는 User A가 유사도가 높은데 이런 경우 User B도 5.0을 평점으로 줄 확률이 높다고 본다.

### 아이템 기반 렵업 필터링 : Item-based CF

![](/image/boostcamp/recsys/basic/item_table.png)

- **두 아이템이 유저들에게 얼마나 유사한 평가**를 받았는가?를 기준
- 아이템간의 유사도를 활용하여 유사도가 높은 아이템을 기반으로 타겟 아이템을 추천

---

## K-Nearest Neighbors CF (KNN CF)

- NBCF는 모든 유저와의 유사도를 구해야 하는 시간적, 자원적 문제가 존재
- 유저가 많아지는 경우 연산이 늘어나고 성능이 감소함
- 유사도가 높은 특정 K명만 추출해서 활용하자는 KNN 아이디어에서 착안
- 여기서 K는 일반적으로 25~50을 많이 사용하지만 조정하는 하이퍼파라미터

### Mean Squared Difference Similarity

$$
\begin{aligned}
msd(u, v) = \frac{1}{|I_{uv}|}\cdot \sum_{i\in I_{uv}}(r_{ui}-r_{vi})^2 , \qquad msd_{sim(u, v)} = \frac{1}{msd(u,v) \color{red}{+ 1}} \\\\
msd(i, j) = \frac{1}{|U_{ij}|}\cdot \sum_{u\in U_{ij}}(r_{ui}-r_{uj})^2, \qquad msd_{sim(i,j)} = \frac{1}{msd(i,j) \color{red}{+ 1}}
\end{aligned}
$$

- mean squared의 특징에 따라 유클리드 거리에 반비례하는 특성을 보임
  - 거리가 멀수록 유사도는 떨어진다는 아이디어

## Cosine Similarity

$$
\cos(\theta) = \cos(X, Y) = \frac{X \cdot Y}{|X| |Y|} = \frac{\sum_{i=1}^{N} X_iY_i}{\sqrt{\sum_{i=1}^{N} X_{i}^2} \sqrt{\sum_{i=1}^{N}Y_i^2}}
$$

- MSD의 문제점인 두 벡터의 크기가 유사도에 영향을 준다는 것을 해결하고자 등장
  - cosine은 단순 각도의 개념만 갖게되므로 크기가 영향을 주지 않음
- 두 벡터의 방향성이 곧 유사도의 지표
- 가장 많이 사용하는 유사도 지표
- 자세한 설명은 [링크 참조](https://cow-coding.github.io/posts/day32_recsysbasic4/#cosine-similarity)

### Pearson Similarity (Pearson Correlation)

$$
\text{pearson\_sim}(X, Y) = \frac{\sum_{i=1}^{N} (X_i - \bar{X})(Y_i - \bar{Y})}{\sqrt{\sum_{i=1}^{N} (X_i - \bar{X})^2}\sqrt{\sum_{i=1}^{N} (Y_i - \bar{Y})^2}}
$$

- 각 벡터의 표본평균으로 정규화하고 코사인 유사도를 구한 것
- 정규화하는 과정을 통해 유저의 평가 기준을 통일시킬 수 있음
  - 특정 유저는 평가범위가 1 ~ 3, 다른 유저는 3 ~ 5일 수 있음
  - 각 vector rating의 크기차를 고려 가능

### Jacard Similarity

$$
J(A, B) = \frac{|A\cap B|}{|A\cup B|} = \frac{|A \cap B|}{|A| + |B| - |A\cap B|}
$$

- 앞의 유사도들과 다르게 벡터가 아닌 **집합**에 대한 유사도 연산
- 집합의 유사도를 계산하는 특성상 다른 유사도들과 달리 **차원이 달라도** 이론적 유사도가 계산이 가능
- 두 집합의 아이템의 공유 정도를 의미하는 유사도

---

## Prediction

![](/image/boostcamp/recsys/basic/table.png)

### Average

$$
\hat{r}(u, i) = \frac{\sum_{u'\in\Omega_{i}}r(u',i)}{|\Omega_i|}
$$

- 가장 일반적으로 많이 하는 방법
- 다른 유저들의 평점의 평균치를 활용하는 것
- **자신과 성향이 다른 유저도 동일한 비율로** 적용된다는 문제 점이 존재

### Weighted Average

$$
\hat{r}(u, i) = \frac{\sum_{u'\in\Omega_i}sim(u, u')r(u', i)}{\sum_{u'\in\Omega_i}sim(u, u')}
$$

- 유저간의 유사도를 가중치로 활용
- rating의 평균을 활용하는 것은 동일하지만 가중치를 활용한 **가중평균**을 사용
- **유저의 성향을 반영**한 정보 활용
- 단순히 평점의 수치를 **그대로 활용**하므로 각 유저의 평점 분포를 반영하지 못한다는 단점 존재

### Relative Rating

$$
\begin{aligned}
dev(u, i) = r(u,i) - \bar{r_u} \quad for \; known \; rating \quad \\\\
\widehat{dev}(u, i) = \frac{\sum_{u'\in\Omega_i}dev(u', i)}{|\Omega_i|} = \frac{\sum_{u'\in\Omega_i}r(u', i) - \bar{r_{u'}}}{|\Omega_i|} \\\\
\hat{r}(u, i) = \bar{r_u} + \widehat{dev}(u, i) \qquad\qquad\qquad
\end{aligned}
$$

- Average나 Weighted Average 같은 방식은 Absolute Rating방식으로 유저의 평점을 그대로 사용하는 방식
- 이런 Absolute Rating 방식은 **유저의 평점 분포**를 고려하지 않는다는 문제점이 존재함
- 이를 해결하고자 유저의 평점 편차( $dev(u,i)$ )를 활용한 상대적 평점이 등장
- 특정 유저의 평균 평점에 다른 유저들의 예측 아이템에 대한 평점 편차를 더해서 유저 평점을 보정하는 방식
- 추가적으로 weighted average 방식도 함께 고려한 최종 식은 아래와 같음

$$
\hat{r}(u, i) = \bar{r_u} + \frac{\sum_{u'\in\Omega_i}sim(u, u')\{r(u',i) - \bar{r_{u'}}\}}{\sum_{u'\in\Omega_i}sim(u,u')}
$$


