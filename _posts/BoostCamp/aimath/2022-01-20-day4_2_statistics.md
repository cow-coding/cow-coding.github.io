---
layout: post
date: 2022-01-20 02:00:00 PM
title: "[BoostCamp AI Tech / Level 1 - AI Math] Day4 - 통계학 맛보기"
categories: [NAVER BoostCamp AI Tech, Level 1 - AI Math]
tags: [NAVER, BoostCamp, AI Tech, AI Math, math, Statistics]
math: true
---
# AI Math : 통계학 맛보기

---

## 모수

- 통계적 모델링이란 가정을 통해 확률분포를 추정하는 것이 목표이다.
- 하지만 유한한 data로 모집단의 분포를 알아내는 것은 어렵기 때문에 "근사적"추정을 하는데 이때 방법으로는 2가지 방법이 있다.
    - parametric : 선험적으로 분포를 가정하고 모수를 추정한다.
    - non-parametric : 모델구조 + 모수개수를 활용

### 1. Parametric

1. 확률분포가정
    - 데이터가 2개의 case만 존재 : 베르누이 분포 ($Bernoulli$)
    - n개의 이산 데이터 : 카테고리 분포 (categorical)
    - \[0, 1\]사이의 값 : 베타분포 ($\text{Beta}(\alpha, \beta)$)
    - 0 이상의 값 : 감마분포 ($\text{Gamma}$), 로그정규분포
    - $\mathbb{R}$ 전체의 값 : 정규분포, 라플라스 분포

2. 모수추정

    $$
    \begin{aligned}
    \bar{X} = \frac{1}{N}\sum_{i=1}^{N} x_{i} \quad,\quad \mathbb{E}[\bar{X}] = \mu \quad\quad\quad\\
    s^2 = \frac{1}{N-1}\sum_{i=1}^{N}(X_i - \bar{X})^2 \quad,\quad \mathbb{E}[S^2] =\sigma^2
    \end{aligned}
    $$  

    - 표집분포 (Sampling distribution)
        - 통계량들이 존재하는 확률분포이다.
        - sample distribution이랑은 다르다! 주의!!
        - 표집분포는 N이 클수록 정규분포에 근사한다.

### 최대가능도추정법 (Maximum Likelihood Estimator, MLE)

$$
\begin{aligned}
\hat{\theta}_{MLE} = \text{argmax}_{\theta} L(\theta ; \mathbf{x}) = \text{argmax} P(\mathbf{x} | \theta) \quad\quad\quad \\
L(\theta ; \mathbf{x}) = \prod_{i=1}^{n}P(\mathbf{x}_{i} | \theta) \Rightarrow \log L(\theta ; \mathbf{x}) = \sum\log P(\mathbf{x}_{i} |\theta)
\end{aligned}

$$

- 이론적으로 가장 가능성이 높은 모수를 추정
- Likelihood에 로그를 연산한 log likelihood를 일반적으로 많이 활용
    - 데이터 규모가 커질경우 계산이 어려워짐
    - 곱셈보다 덧셈이 오차율이 더 적음.

## 딥러닝의 MLE

- 가중치 $\theta = (\mathbf{W}^{(1)}, ..., \mathbf{W}^{(L)})$
- 분류문제에서 softmax는 categorical distribution의 모수를 모델링함
    - 원핫 벡터형태의 정답 레이블 $\mathbf{y} = (y_1, ..., y_k)$ 를 관찰 data로 활용하면 softmax MLE계산  

    $$
    \hat{\theta}_{MLE} = \underset{\theta}{\text{argmax}}\frac{1}{n}\sum_{i=1}^{n}\sum_{k=1}^{K}y_{i,k}\log(MLP_{\theta}(\mathbf{x}_{i})_{k})
    $$

## 확률분포의 거리
- 기계학습의 손실함수들은 **model의 학습확률분포**와 **데이터의 관찰 확률분포**의 거리로 유도한다.
- 거리 계산 함수
    - 총 변동거리
    - 쿨백-라이블러 발산
    - 바슈타인 거리

### 1. 쿨백-라이블러 발산 (KL Divergence)

$$
\begin{aligned}
\mathbb{KL}(P||Q) = \sum_{\mathbf{x}\in\chi} P(\mathbf{x})\log\left( \frac{P(\mathbf{x})}{Q(\mathbf{x})} \right) \quad,\quad (\text{discrete}) \\ 
\mathbb{KL}(P||Q) = \int_{\mathbf{x}} P(\mathbf{x})\log\left( \frac{P(\mathbf{x})}{Q(\mathbf{x})} \right) \quad,\quad (\text{continuos})
\end{aligned}
$$  

쿨백-라이블러 발산을 분해할 수 있는데, 이를 분해하면 다음과 같다.  

$$
\begin{aligned}
\begin{matrix}
\mathbb{KL}(P || Q) &=& -\mathbb{E}_{\mathbf{x} \sim P(\mathbf{x})}[\log Q(\mathbf{x})] &+& \mathbb{E}_{\mathbf{x} \sim P(\mathbf{x})}[\log Q(\mathbf{x})] \\
&&\text{cross entropy}&& \text{entropy}
\end{matrix}
\end{aligned}
$$

여기서 정답레이블을 $P$, 모델의 예측을 $Q$라 두면 MLE는 쿨백-라이블러 발산을 최소화하는 것과 같음