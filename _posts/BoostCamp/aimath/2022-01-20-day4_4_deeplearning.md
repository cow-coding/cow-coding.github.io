---
layout: post
date: 2022-01-20 04:00:00 PM
title: "[BoostCamp AI Tech] Day4 - 딥러닝 학습방법 이해하기"
categories: [NAVER BoostCamp AI Tech, AI Math]
tags: [NAVER, BoostCamp, AI Tech, AI Math, math, Statistics, Deep Learning]
math: true
---
# AI Math : 딥러닝 학습방법 이해하기

---

## 신경망 (Neural Network)

$$
\begin{aligned}
\begin{matrix}
\begin{bmatrix}
- & \mathbf{o}_{1} & - \\
- & \mathbf{o}_{2} & - \\
& \vdots & \\
- & \mathbf{o}_{n} & -
\end{bmatrix}
& = &
\begin{bmatrix}
- & \mathbf{x}_{1} & - \\
- & \mathbf{x}_{2} & - \\
& \vdots & \\
- & \mathbf{x}_{n} & -
\end{bmatrix} &
\begin{bmatrix}
w_{11} & w_{12} & \cdots &  w_{1p} \\
w_{21} & w_{22} & \cdots &  w_{2p} \\
\vdots & \vdots & & \vdots \\
w_{d1} & w_{d2} & \cdots &  w_{dp}
\end{bmatrix}
&+&
\begin{bmatrix}
| & | & \cdots & | \\
b_{1} & b_{2} & \cdots & b_{p} \\
| & | & \cdots & |
\end{bmatrix} \\\\
\mathbf{O} && \mathbf{X} & \mathbf{W} && \mathbf{b} \\
(n \times p) && (n \times d) & (d \times p) && (n \times p)
\end{matrix}
\end{aligned}
$$

- 행렬의 연산원리에 따르면 d차원의 입력이 w를 통해 p차원 출력으로 나오게된다.  
- 이런 형태의 선형모델을 비선형 방식으로 표현하면 신경망의 형태로 표현하면된다. 위의 식은 d개의 변수로 **p개의 선형 모델** 을 만들어서 p개의 잠재변수를 설명하는 모델이라 생각할 수 있다.   

![](/image/boostcamp/aimath/nn.png){: w="400"}  

- 위의 식을 층의 형태로 표현하면 각 $x$들과 $o$들에 연결된 화살표들은 $W_{ij}$라고 생각하면된다.  
이렇게 나타난 출력 ($O$)를 비선형 함수인 softmax 함수에 넣게되면 신경망의 구성이 완성된다.  

$$
\text{softmax}(\mathbf{o}) = \left( \frac{exp(o_{1})}{\sum_{k=1}^p exp(o_{k})}, \cdots , \frac{exp(o_{p})}{\sum_{k=1}^p exp(o_{k})} \right)
$$  

- $\text{softmax}(\mathbf{o}) = \text{softmax}(\mathbf{Wx} + \mathbf{b})$

## softmax

![](/image/boostcamp/aimath/softmax.png){: w="500"}  

- softmax 함수는 모델의 출력을 확률로 해석하게 변환하는 역할을 함
- 분류문제를 풀 때 선형모델과 softmax를 결합한 함수로 예측
    - 학습과정에는 softmax로 학습
    - 추론과정에서는 one_hot 함수를 활용 $\text{onehot}(\mathbf{o})$

- softmax  
```python
def softmax(vec):
    denumerator = np.exp(vec - np.max(vec, axis=-1, keepdims=True))
    numerator = np.sum(denumerator, axis=-1, keepdims=True)
    val = denumerator / numerator
    return val

vec = np.array([[1, 2, 0], [-1, 0, 1], [-10, 0, 10]])
softmax(vec)

"""
array([[2.44728471e-01, 6.65240956e-01, 9.00305732e-02],
       [9.00305732e-02, 2.44728471e-01, 6.65240956e-01],
       [2.06106005e-09, 4.53978686e-05, 9.99954600e-01]])
"""
```

- one_hot  
```python
def one_hot(val, dim):
    return [np.eye(dim)[_] for _ in val]

def one_hot_encoding(vec):
    vec_dim = vec.shape[1]
    vec_argmax = np.argmax(vec, axis=-1)
    return one_hot(vec_argmax, vec_dim)

def softmax(vec):
    denumerator = np.exp(vec - np.max(vec, axis=-1, keepdims=True))
    numerator = np.sum(denumerator, axis=-1, keepdims=True)
    val = denumerator / numerator
    return val

vec = np.array([[1, 2, 0], [-1, 0, 1], [-10, 0, 10]])
print(one_hot_encoding(vec))
print(one_hot_encoding(softmax(vec)))

"""
[array([0., 1., 0.]), array([0., 0., 1.]), array([0., 0., 1.])]
[array([0., 1., 0.]), array([0., 0., 1.]), array([0., 0., 1.])]
"""
```


## 신경망을 수식으로 분해해보자

$$
\mathbf{H} = (\sigma(\mathbf{z}_1), \cdots, \sigma(\mathbf{z}_n)) \quad \sigma(\mathbf{z}) = \sigma\left(\mathbf{Wx} + \mathbf{b}\right)
$$

- **신경망 = 선형모델 + activation function**

### Activation function $\sigma$

- $\mathbb{R}$위에 정의된 **비선형 함수** 딥러닝의 개념에서 가장 중요
    - 활성함수를 활용하지 않으면 선형모형과 차이가 없기 때문에 반드시 사용해야한다.
- 각 출력값 $\mathbf{z}$ 에 적용하여 새로운 잠재벡터 $\mathbf{H}$ 를 생성함
- softmax도 활성함수의 일종
- sigmoid, tanh는 전통적으로 많이 사용한 활성함수지만 딥러닝에선 ReLU를 많이 쓴다.
- 활성함수의 종류  

![](/image/boostcamp/aimath/activation.png)  

### 1-Layer NN

![](/image/boostcamp/aimath/1layer.png)  

- 단일층을 활용하는 신경망이다.
- 각 출력에 대해 비선형 활성함수를 적용한다.
- $\mathbf{H}$는 활성함수 출력의 집합이다.

### 2-Layer NN

![](/image/boostcamp/aimath/2layer.png)  

- 1개의 층을 더 쌓아올린 신경망이다.
- 1차로 쌓은 층에서 나온 잠재벡터 $\mathbf{H}$에서 가중치 행렬 $\mathbf{W}^{(2)}$와 $\mathbf{b}^{(2)}$를 통해 선형변환을 진행
- 파라미터는 $(\mathbf{W}^{(2)}, \mathbf{W}^{(1)})$

### Multi-Layer Perceptro (MLP)

![](/image/boostcamp/aimath/mlp.png){: w="450"}

- MLP의 파라미터는 $L$개의 가중치 행렬 $\mathbf{W}^{(L)}, ..., \mathbf{W}^{(1)}$로 구성된다.
- $l = 1, ...L$까지 순차적인 신경망의 계산을 순전파 (forward propagation)라고 한다.

### 층을 여러개 쌓는 이유
- 이론상 2층 신경망으로도 연속함수를 근사하는 것이 가능함 (universal approximation theorem)
- 층이 싶을수록 **목적함수를 근사하는데 필요한 뉴런(노드)으 숫자가 훨씬 빨리 줄어** 들어 효율적 학습이 가능
- 층이 얇으면 뉴런의 수가 기하급수적으로 늘어나서 넓은 (wide) 신경망이 필요

## 역전파 알고리즘 (Back propagation)

![](/image/boostcamp/aimath/backprop.png)

- 딥러닝은 **역전파(backpropagation) 알고리즘**을 이용하여 각 층에 사용된 파라미터 $ \\{ \mathbf{W}^{(l)}, \mathbf{b}^{(l)} \\}^{L}_{l=1} $ 를 학습
- 경사하강법을 사용해 학습을 진행하는데, 각 가중치의 gradien vector를 계산해서 적용한다.
- 손실함수는 $\mathcal{L}$이라 했을때 역전파는 $\sigma\mathcal{L}/\sigma\mathbf{W}^{(l)}$ 정보를 계산할 때 사용된다.
- 각 층 parameter의 gradient vector는 윗층부터 역순으로 계산한다.
- 이전 층에서 계산된 gradient를 밑으로 전달한다.
    - 편미분의 연쇄법칙 원리에의해 이전 층의 gradient값이 필요하다.

### 역전파 알고리즘 원리

![](/image/boostcamp/aimath/backprop2.png){: w="500"}

- 역전파 알고리즘은 합성함수 미분법인 연쇄법칙(chain-rule)기반 자동미분(auto-differentiation)을 사용
- 각 뉴런에 해당하는 값을 텐서(tensor)라고 한다.
- 각 텐서는 메모리에 저장되어야 역전파 알고리즘이 동작이 가능하다.
    - 각 노드의 텐서 값을 컴퓨터가 기억해야 미분 계산이 가능하다.




