---
layout: post
title: "[Data Structure] Linked List (연결 리스트)"
categories: [DataStructure, C++]
tags:
- DataStructure
- Linked list
---
<style>
img {
  width:300px;
  display:block;
  margin:0px auto;
}
</style>

 

# Linked list (연결 리스트)
## 링크드 리스트와 배열
Linked list (연결 리스트)와 가장 많이 비교되는 자료구조에는 Array (배열)가 있다. 두 자료구조 모두 linear order data structure로, 선형 저장구조를 갖고 있다. 선형 저장구조를 갖고 있다는 의미는 데이터 간의 전후관계가 존재한다는 의미와도 같다.  
두 자료구조의 차이점에는 데이터 접근성과 size의 변동성이 있다.  
- Array (배열)
  - 배열은 임의의 인덱스에 빠르게 접근이 가능하다. 접근하고자 하는 index를 알기만 하면 O(1)시간에 접근이 가능하다.
  - 배열을 선언할 때 memory를 선언하고 할당하기 때문에 제한된 메모리 크기를 갖는다. 그로인해 한 번 선언한 배열의 크기는 변경 할 수 없다는 단점이 있다.
- Linked list (링크드 리스트)
  - 링크드 리스트는 새로운 데이터가 추가될 때, 메모리를 새롭게 할당해주므로 메모리 크기가 동적으로 변화할 수 있다.
  - 데이터를 탐색할 때, 제일 앞의 노드부터 탐색을 하기때문에 특정 값을 찾기 위해서는 O(n)의 시간이 걸린다.
<br>

## Singly Linked list (단순 연결 리스트)
단순 연결 리스트는 **노드들의 연속** 으로 구성되어있다. 각 각의 노드들은 Element(원소)와 Next(다음 노드 포인터)로 구성되어 있고 원소에는 저장하고자하는 object가 들어간다.  
연결 리스트는 가장 앞의 노드를 가리키는 head와 가장 마지막 노드를 가리키는 tail이 존재하고 가장 마지막 노드의 next포인터의 주소 값은 NULL값을 가진다.  
![node](/image/DS/node.png)  
- object가 저장되는 곳인 element와 다음 노드를 가리키는 node pointer인 next가 존재한다. element를 데이터필드, next를 주소필드라고 한다.
<br>

# Singly Linked list implementation (단순 연결리스트 구현)
## Singly Linked list code
  ```cpp
  #include <iostream>
  #include <string>
  using namespace std;

  typedef string Elem;

  class StringNode {
  private:
    Elem elem;
    StringNode* next;

    friend class StringLinkedList;
  }

  class StringLinkedList {
  private:
    StringNode* head;
    StringNode* tail;

  public:
    StringLinkedList(Elem e);
    ~StringLinkedList();
    bool empty();
    Elem front();
    void addFront(Elem e);
    void removeFront();
    void addBack(Elem e);
    void removeBack();
  };
  ```
  Linked list class의 prototype은 위의 코드와 같다. 자세한 함수 내용은 각각의 함수 설명과 함께 작성한다. 여기서 node의 자료형은 string으로 했는데, 원하는 값에 맞춰서 자료형을 변경해주면된다.

## Empty function
  ```cpp
  bool empty() {
    retrun head == NULL;
  }
  ```

  list가 비어있는 지를 확인하는 함수이다. 가장 간단한 방법은 head가 가리키는 포인터가 NULL인지를 확인하는 것이다.

## Inserting at the Head
  ```cpp
  void StringLinkedList::addFront(Elem e) {
    StringNode* v = new StringNode(e);

    if (empty()) {
      tail = v;
    }

    v->elem = e;
    v->next = NULL;
    head = v;
  }
  ```  

  list의 가장 앞 부분에 데이터를 추가하는 함수이다. 기본 원리의 순서는 아래와 같다.
  1. 데이터를 추가할 새로운 노드 v를 만들어주고 값들을 지정해준다.
  2. 만약 리스트가 비어있다면, tail node는 새로 생성된 노드를 할당해준다.
  3. 이전에 있던 head node를 새로 만들어진 노드 v를 할당해준다. (데이터 삽입)

## Removing at the Head
  ```cpp
  void StringLinkedList::removeFront() {
    if (empty()) {
      tail = NULL;
      return;
    }

    StringNode* old = head;
    head = old->next;
    delete old;
  }
  ```  
  list 가장 앞의 값을 제거해주는 함수이다. 삽입 함수에서 empty조건 확인은 있냐 없냐가 크게 문제가 되지 않지만 제거 함수에서는 반드시 empty조건 확인으로 예외처리를 진행해줘야한다.
  1. 리스트가 비어있는 지 확인한다. 만약 비어있다면 함수를 종료시켜준다.
  2. 리스트가 비어있지 않으면 기존의 head node를 새로 만드는 old node에 할당해준다. 이렇게 되면 old node와 현재의 head node는 동일하게 된다.
  3. 그 후 head node를 기존의 head node 다음 노드로 이동시켜준다. 이때, 기존의 head node 역할은 old node가 대체한다. (데이터 제거)    4. 기존의 head node역할을 하던 node인 old node를 메모리에서 제거한다. (실제로 메모리에서 제거)

  여기서 7번째 줄에서 어차피 head 지우는데 굳이 old를 만들어서 head를 옮겨야하나?라는 생각이 들 수 있는데, 여기서 old를 안 만들고 코드를 짜면 ```head = head->next;```로 하게 된다. 이렇게 되면 기존에 존재하던 head node 역할을 하는 node를 메모리에서 지워줄 수 없게 된다.

## Inserting at the Tail
  ```cpp
  void StringLinkedList::addBack(Elem e) {
      StringNode* v = new StringNode;

      v->elem = e;
      v->next = NULL;

      if (empty()) {
        head = tail = v;
      }else {
        tail->next = v;
        tail = v;
      }
  }
  ```
  이번에는 tail에 값을 삽입해주는 함수이다.
  1. 삽입할 값을 가지고 있는 새로운 노드 v를 만들어준다. 이때, v의 next node는 NULL이다. (마지막 노드 역할이기 때문이다.)
  2. 리스트가 비어있다면 head와 tail은 새로 만들어진 노드가 된다.
  3. 비어있지않다면 기존의 tail node의 다음 노드는 새로 만든 v노드로 해준다. (데이터 삽입)
  4. tail node를 삽입한 노드 v로 해준다. (실제로 데이터 삽입)

## Removing at the Tail
  ```cpp
  void StringLinkedList::removeBack() {
    if (empty()) return;

    StringNode* current = head;

    if (current == tail) {
      head = tail = NULL;
      delete current;
    }else {
      while (current->next != tail) {
        current = current->next;
      }
      tail = current;
      delete til->next;
      tail->next = NULL;
    }
  }
  ```  
  링크드 리스트에서 데이터를 제거할 때는 위에서 언급한 링크드 리스트의 성질에 의해서 head부터 시작해서 tail의 바로 앞 노드까지 이동해야한다. 배열처럼 바로 인덱스로 이동할 수 없기때문에 tail의 remove는 $ O(n)$ 시간이 걸리게 된다.  
  head에서 데이터를 제거해줄 때처럼 예외처리를 진행해줘야한다.
  1. 리스트가 비어있는 지 확인한다. 만약 비어있다면 함수를 종료시켜준다.
  2. tail node의 바로 앞까지 이동할 노드의 역할인 current node를 만들고 head node와 동일하게 만들어준다.
  3. 만약 시작부터 current와 tail이 같으면 리스트의 길이가 1이라는 의미기때문에 head가 곧 tail의 역할이다. 그래서 head node와 tail node를 둘 다 NULL로 바꾸고 current node(기존의 head이자 tail)를 메모리 제거해준다.
  4. 그 외의 경우는 current node를 이동시기는데, 반복기준은 curren node의 next node가 tail node가 되기 전까지만 반복해서 이동을 해준다.
  5. tail node 바로 전까지 이동을 했다면, tail node를 current node로 바꿔준다.
  6. 이렇게 이동한 tail node의 next node는 기존의 tail node이므로 새롭게 바꾼 tail node의 next node를 메모리 제거해준다.
  7. 마지막으로 새롭게 지정된 tail node의 next node를 NULL로 지정해준다.
