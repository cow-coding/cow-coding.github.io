---
layout: post
date: 2022-01-20 04:00:00 PM
title: "[BoostCamp AI Tech / AI Math] Day4 - 베이즈 통계학 맛보기"
categories: [NAVER BoostCamp AI Tech, AI Math]
tags: [NAVER, BoostCamp, AI Tech, AI Math, math, Statistics, Bayesian]
math: true
---
# AI Math : 베이즈 통계학 맛보기

---

## 조건부확률

$$
\begin{aligned}
P(A \cap B) = P(B)P(A|B) \quad\quad\quad\quad\\
P(B | A) = \frac{P(A \cap B)}{P(A)} = P(B)\frac{P(A \cap B)}{P(A)}
\end{aligned}
$$  

- 베이즈 정리 : 조건부확률을 이용하여 정보를 갱신한다.
- A라는 신규정보가 주어지면, $P(B)$로부터 $P(B\|A)$를 계산

## 베이즈 정리
### 1. 개념

$$
P(\theta | D) = P(\theta)\frac{P(D | \theta)}{P(D)}
$$  

- $P(\theta\|D)$ : 사후확률 (posterior)
    - data 관찰시 이 가설이 성립할 확률이다.
- $P(\theta)$ : 사전확률 (prior)
    - modeling 이전에 주어진 확률
- $P(D \| \theta)$ : likelihood
- $P(D)$ : evidence = 관측상태


<center>
<table>
    <tr align="center">
        <td colspan="4">Real</td>
    </tr>
    <tr align="center">
        <td></td>
        <td></td>
        <td><b>True</b></td>
        <td><b>False</b></td>
    </tr>
    <tr rowspan="2" align="center">
        <td>Predict</td>
        <td><b>True</b></td>
        <td>True Positive (TP)</td>
        <td>False Positive (FP)</td>
    </tr>
    <tr align="center">
        <td></td>
        <td><b>False</b></td>
        <td>False Negative (FN)</td>
        <td>True Negative (TN)</td>
    </tr>
</table>
</center>

- 민감도 (Recal) = $\frac{\text{TP}}{\text{TP + FN}}$  
- 특이도 (Specificity) = $\frac{\text{TN}}{\text{TN + FN}}$
- 1종오류 : False Positive
    - 실제로는 거짓인데 참이라고 판단하는 경우
    - 1종오류는 당장의 위험성은 적은 오류이다. 예를 들어 암에 걸렸다고 판단했더니 암에 걸리지 않았던 것이다. 물론 병원은 병원비로 고소 좀 먹겠지만 사람 목숨 하나 살아났으니 그나마 다행이다.
- 2종오류 : False Negative
    - 실제로는 참인데 거짓이라 판단하는 경우
    - 2종오류는 상당히 심각한 오류이다. 예를 들어 암에 걸린 환자가 있는데 암이 아니라고 판단한 것이다. 이 환자는 초기에 암을 발견하여 치료를 하여 충분히 살 수 있었음에도 시간이 흘러 말기암이 되어 발견하게 되어 손 쓸수도 없을 수 있는 것이다. 그래서 의료분야는 2종오류를 최소화하는 것을 목적으로 한다.

### 2. 예시를 통한 베이즈 정리 이해

> COVID-99 발병률이 10%이다. 어떤 진단키트의 성능이 실제 질병에 걸렸을 때 검진확률은 99%, 걸리지 않았을 때 오진할 확률이 1%이다. 만약 환자 A가 양성이 나왔을 때 실제 COVID-99에 걸렸을 확률은?  

$D$는 covid-99에 걸렸다고 밝혀진 집단, $\theta$는 실제로 걸린 집단을 생각하면된다.  
여기서 발병률은 이미 우리에게 주어진 데이터이다. 즉, 사전에 주어진 데이터 ($P(\theta)$) 이다. 이 정보를 기반으로 우리는 걸렸다고 판단한 집단 중 **실제로 걸린 집단**일 확률을 업데이트할 것이다.  
여기서 실제 걸린 경우에 확진이라고 판단하는 경우는 조건부확률로는 $P(D\|\theta)$, 걸리지 않은 환자에 대해 양성이라고 판단하는 경우는  $P(D\|\neg\theta)$ (위양성율)이다.  
이때 이 검진키트에 기반한 evidence, 즉 우리가 확인하고자 하는 집단은 다음과 같은 확률을 같게된다.  

$$
P(D) = \sum P(D|\theta)P(\theta) = 0.99 \times 0.01 + 0.01 \times 0.9 = 0.108
$$  

이를 활용해 베이즈 정리를 통해 이 진단키트가 양성이라고 한 경우 실제 환자가 양성인 확률을 계산하면 다음과 같다.  

$$
P(\theta | D) = 0.1 \times \frac{0.99}{0.108} \approx 0.916
$$  

이때 만약 $P(D)$에서 $P(D \| \neg\theta)$ 의 값이 증가하면 베이즈 정리의 분모값이 작아지므로 진단키트의 전체 정확도는 현저히 떨어진다. 예를 들어 $P(D \| \neg\theta)$ 이 10%라면 $P(\theta\| D)$ 의 값은 0.524로 떨어진다.

### 3. 정보의 갱신과정

$$
\begin{aligned}
P(\theta | D) = P(\theta)\frac{P(D|\theta)}{P(D)} \rightarrow P(\theta | D') = P(\theta)\frac{P(D'|\theta)}{P(D')}
\end{aligned}
$$  

앞에서 수행한 문제를 가져와보자. $P(D\|\neg\theta)$ (위양성율)이 10%인 경우 $P(D \| \neg\theta)$ 는 0.524였다. 이 환자를 한번 더 검사를 했는데 양성이 나왔다. 그렇다면 이 환자가 진짜 covid-99에 걸렸을 확률은 얼마나 될까?  
의미가 있는 행동일까?라고 생각이 들 수 있으나 이는 의미가 있는 행동이다. 왜냐면 우리에게 주어진 evidence 상황이 바뀌었기 때문이다. 앞선 case는 발병률이 99%인 상황이지만 이제는 기반 Data의 분포가 변경되었기 때문이다. 우리가 확인하는 데이터 분포는 1차 검사에서 양성이 나온 경우로 변경되었다. 즉 $P(\theta)$ = 0.524가 되었기 때문에 $P(D')$를 다시 계산해야한다.  

$$
P(D') = 0.99 \times 0.524 + 0.1 \times 0.476 \sim 0.566
$$  

이를 활용해 다시 베이즈 정리에 기반해서 환자가 2차 검사결과에서 진짜 양성인 확률을 구해보자  

$$
P(\theta | D) = 0.524 \times \frac{0.99}{0.566} \approx 0.917
$$  

무려 0.917까지 올라갔다. 이게 수식을 따라가면서 보면 이해가 조금 어려울 수 있다. 좀 더 간단하게 설명하면 한 진단키트가 있을때 이 진단키트로 여러번 검사했을때 양성이 많이 나온다면 우리는 직감적으로 양성이라고 판단하는 것과 비슷하다. ~~(물론 엄밀히 말하면 좀 다르긴한데 대충 느낌상....)~~  

