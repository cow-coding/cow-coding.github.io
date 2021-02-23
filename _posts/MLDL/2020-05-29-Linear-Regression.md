---
title: "[ML/DL] Linear Regression (선형회귀)"
categories: mldl
tags: ml Deep_Learning Linear_Regression Gradient_descent 선형회귀 경사하강법
---

# Linear Regression (선형회귀)
## Linear Regression (선형회귀)란?
- 보통 딥러닝 최적화 학습 알고리즘 중 가장 기초가 되는 알고리즘이다.

- **선형회귀(Linear Regression)** 라는 이름에서 알 수 있듯이 데이터를 통해 예상되는 그래프가 직선의 그래프인 경우에서 사용을 한다.  
실제의 데이터는 여러가지 변수를 가지고 있기 때문에 3차원은 기본이고 n차원의 형태인 그래프로 나타내어진다. 하지만 고차원의 그래프로는 데이터의 경향성 예측이 어렵기때문에 일반적으로 1~2개의 데이터 그래프로 변수를 다루게 된다. 보통 다른 변수들과 독립적으로 이뤄져 있기보다는 종속적으로 연결되어 있는 경우가 많기때문이다.

- 다음과 같은 수식이 우리에게 주어져있는 상황이다.  
\\[ y = ax + b \\]  
일반적으로 a는 기울기(gradient)라고 하고 b는 절편(interceptor)이라고 한다. 직선의 방정식의 그래프는 일반적으로 기울기와 절편값에 의해서 모양이 바뀐다. 특정 데이터에 알맞는 선형방정식을 찾기 위해서 기울기와 절편을 바꿔주면서 그래프를 맞춰나가야한다.  
보통의 수학문제는 기울기와 절편이 주어지고 특정 x값 혹은 y값이 들어왔을 때 해당 입력 값의 쌍을 이루는 답을 찾는 식으로 해결한다. 하지만 머신러닝 과정에서는 데이터를 통한 학습을 하는 것이므로 이미 x-y쌍의 데이터는 주어져 있다. 주어진 데이터 셋을 통해서 역으로 기울기와 절편을 맞춰나가는 과정을 하는 것이다.

## Gradient Descent (경사하강법)란?
- 아래 3개의 그림 중 어떤 그림이 더 데이터를 잘 대변해주는 지 고른다면 뭘 고를까?  
![gd1](/image/gd1.png)![gd2](/image/gd2.png)![gd3](/image/gd3.png)  
데이터의 경향성을 가장 잘 나타내주는 그림은 아마도 1번일 것이다.  2번 그림은 기울기의 경향성은 대략 비슷하지만 너무 완만하며 절편이 맞지 않는다. 3번 그림은 아예 그래프의 경향성이 반대인 상황이다. 2번과 3번과 같은 경우에는 기울기와 절편을 조절해주면서 1번으로 가까워지게 만들어줘야한다. 이때 사용을 하는 것이 **경사하강법(Gradient Descent)** 이다.   
경사하강법을 간단하게 요약해서 말해본다면 **어떤 손실함수(loss function)가 주어졌을 때, 해당 손실함수의 최소가 되는 지점을 찾아가는 방법이다.**

- 위에서 주어졌던 함수를 아래와 같이 다시 정의를 해주자.  
\\[ y = wx + b \\]  
w는 가중치, b는 절편이라고 한다. 우리에게 주어진 데이터인 타겟(target / label)을 y라고 하고 예측한 그래프에 입력을 넣어줬을 때 나온 예측값을 y hat이라고 하자.   
컴퓨터는 주어진 데이터와의 오차를 줄여나가는 방향으로 접근을 해야한다. w값인 가중치가 얼마나 변하냐에 따라서 y hat이 어떻게 바뀌는 지를 확인해야한다. (이는 b의 변화에 따라서 y hat의 변화도 해당된다). 이 과정에서 손실함수(비용함수)를 구하게 된다. 일반적으로 손실함수는 예측값과 타겟(라벨)간의 오차를 이용한다.  
선형회귀 방식에서는 손실함수로 **평균제곱오차(MSE, Mean Squared Error)** 를 사용한다.  
\\[ MSE = \sum_{i=1}^n (y - \widehat{y})^2 \\]  
우리는 이 손실함수를 w에 대해서, b에 대해서 변화하는 정도를 확인하면서 각각 w와 b를 수정해줘야한다. 이를 위해서 MSE를 각각 w와 b에 대해서 편미분을 해준다. MSE를 w와 b에 대해서 각각 편미분한 값은 아래와 같다.  
\\[
\frac{\partial MSE}{\partial w}  
= \frac{\partial}{\partial w}(y - \widehat{y})^2  
= 2(y - \widehat{y})(-\frac{\partial}{\partial w}\widehat{y})  
= 2(y - \widehat{y})(-x)
= -2(y - \widehat{y})x
\\]

\\[
\frac{\partial MSE}{\partial b}  
= \frac{\partial}{\partial b}\frac12(y - \widehat{y})^2  
= (y - \widehat{y})(-\frac{\partial}{\partial b}\widehat{y})  
= 2(y - \widehat{y})(-1)
= -2(y - \widehat{y})
\\]  
이렇게 구해진 두 변수에 대한 변화율을 각각의 변수에 모두 적용을 시켜준다.  
이때 손실함수의 낮은 쪽으로 이동해야 하기 때문에 빼주는 계산을 해줘야한다.   
\\[
w = w - \frac{\partial MSE}{\partial w}  
= w + (y - \widehat{y})x \\]

\\[ b = b - \frac{\partial MSE}{\partial b}  
= b + (y - \widehat{y}) \\]  
이렇게 손실함수에 대해서 변화율을 처리해주는 것을 **그래디언트(Gradient)** 라고 한다.

# Linear Regression implementation
## Initialized Code
```python
class LinearRegression:

  def __init__(self):
    self.w = 1.0
    self.b = 1.0
```

## Forward Propagation (정방향 전파) Code
```python
class LinearRegression:

  def __init__(self):
    self.w = 1.0
    self.b = 1.0

  def forward(self, x):
    y_hat = x * self.w + self.b
    return y_hat
```
이 과정은 데이터 셋에서 들어오는 x, 우리가 예측하는 w와 b로 y_hat인 예측값을 계산하는 과정이다.

## Back Propagation (역방향 전파) Code
```python
class LinearRegression:

  def __init__(self):
    self.w = 1.0
    self.b = 1.0

  def forward(self, x):
    y_hat = x * self.w + self.b
    return y_hat

  def backprop(self, x, err):
    w_grad = x * err
    b_grad = 1 * err
    return w_grad, b_grad
```
이 과정은 예측값을 통해서 오차를 알아내고 손실함수를 통해서 그래디언트를 입력해주는 함수를 구현해준다. 보통 가중치와 절편의 갱신은 훈련과정에서 이뤄지므로 이 과정에서는 그래디언트만 계산해주는 것이다.

## Training Function Code
```python
class LinearRegression:

  def __init__(self):
    self.w = 1.0
    self.b = 1.0

  def forward(self, x):
    y_hat = x * self.w + self.b
    return y_hat

  def backprop(self, x, err):
    w_grad = x * err
    b_grad = 1 * err
    return w_grad, b_grad

  def train(self, x, y, epochs=100):
    for i in range(epochs):
      for x_i, y_i in zip(x, y):
        y_hat = self.forward(x_i)
        err = -(y_i - y_hat)
        w_grad, b_grad = self.backprop(x_i, err)
        self.w -= w_grad
        self.b -= b_grad
```
이 부분은 데이터 셋을 통해서 가중치와 절편을 계속 갱신을 해서 최소의 손실함수 값을 찾아주게 된다.
