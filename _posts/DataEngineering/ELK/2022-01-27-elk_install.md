---
layout: post
date: 2022-01-27
title: "[Elastic Search] WSL을 통한 ELK 설치 및 실행"
categories: [Date Engineering, ELK]
tags: [Data Engineering, ELK, Elastic Search, Search Engine]
math: true
---

## **들어가며...**

오늘부터 본격적으로 ElasticSearch와 Kibana, Logstash를 활용한 Bigdata processing과 visualization을 설명하겠습니다. 블로그 메인에도 있고 전체적인 포스팅의 분포를 보시면 알 수 있듯이 저는 Bigdata와 DataScience에 관심이 많습니다. 그래서 관련 공부도 많이 하고 있죠. 상당히 힘듭니다...ㅠㅠ

사실 작년 초부터 카카오 인재영입을 SNS로 팔로우하며 정보를 모으고 있던 와중 카카오 데이터 사이언티스트/플랫폼 개발자 채용 공고를 보았습니다. ~~(취직을위해 알아봤다기보단 뭐가 필요한지 알기 위해서 입니다.)~~

해당 공고에서 요구했던 사항은 통계 지식, python등 많이 있었고 그 중에도 elasticsearch가 있었습니다. 물론 그때는 이제 막 1학년을 마친 뭣 모르는 때라 모든 게 다 필요할 것이라 생각했지만 지금 생각해보면 ELK는 플랫폼 개발자의 역량에 가까운 것 같네요. 물론 데이터의 시각화와 분석에 ELK를 사이언티스트도 필요하다고 생각합니다. 그래서 아무것도 모르고 "elasticsearch? 이름도 뭔가 멋지고... 알아보니까 카카오, 네이버 같은 검색사이트들이 많이 쓰네?? 공부하자!!!"라는 생각으로 공부에 뛰어 들었습니다.

하지만 아시는 분들은 아시겠지만 이 ELK라는 것이 애초에 연식이 그렇게 오래된 기술이 아닙니다.

~~제 나이보다 어려요..~~

그렇다보니 검색을 해도 자세한 한글 포스트도 많이 없고 이게 또 ELK stack이 원래는 각자 독립적인 개발이었다가 합쳐진 거라 공식 문서도 딱히 그렇게 친절하진 않습니다.

(물론 다양한 OS환경에 따라 코드가 다 적혀있는 건 맘에 들더라구요)

그래서 제가 공부하며 얻은 지식들을 이번 ELK 시리즈에 녹여낼 생각입니다.

---

## **ELK Stack**

ELK Stack, 우선 꽤 낯선 이름입니다. 일반적으로 Elastic Stack이라고도 부릅니다. Elasticsearch, Logstash, Kibana로 이어지는 하나의 데이터의 검색, 분석, 시각화를 도와주는 것을 ELK Stack이라고 합니다. 요즘은 위의 3개에 추가로 Filebeats도 추가해서 많이 사용되는 추세입니다. 엘라스틱 서치는 현재 국내외 많은 기업들이 데이터 로깅과 처리에 사용을 합니다. 요즘처럼 빅데이터가 중요한 시기에 아주 적합한 스택이라고 말합니다. 성능자체가 굉장히 우수하기 때문에 많은 양의 데이터 처리가 용이하고 분산 처리가 가능하다는 장점이 존재하기 때문입니다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc86TLS%2Fbtq85D4JfGw%2Few6ps6fVk19r2KVhMt1i31%2Fimg.png){: w="500"}*네이버 클라우드 플랫폼의 ELK stack*

네이버는 클라우드 플랫폼 자체에 Hadoop Ecosystem과 ELK stack을 활용하고 있습니다. 일반적으로 Hadoop, Kafka, Spark를 통해 데이터를 저장을 하면 logstash를 통해 로그 및 이벤트 데이터를 수집합니다. 이렇게 수집된 로그 데이터를 elasticsearch는 의미있는 방법으로 검색이 가능하게 만들어 줍니다. 그 후 데이터들을 활용해서 데이터 시각화 및 분석을 위해 kibana를 활용하는 파이프라인이 일반적으로 구축됩니다.

<center><b>"그렇다면 왜? 엘라스틱서치를 검색엔진 사이트들은 많이 쓸까요?"</b></center>


이유는 단순합니다. 많은 양의 데이터를 빠르게 처리하기 때문입니다. 엘라스틱서치는 자바루씬을 기반의 엔진이 구동됩니다. 그래서 빠른 검색시간을 추구합니다. 일반적으로 검색에 소요하는 시간을 1초 정도로 추구한다고 알려져있습니다. 또한 log기록을 실시간으로 처리하는 상황에서 상당히 효과가 좋습니다. 엘라스틱서치의 핵심 개념 중 하나가 바로 Near Realtime으로 거의 실시간에 근접하는 검색 시간을 갖습니다. 그리고 클러스터와 노드를 활용한 데이터 관리를 합니다. 이 방식을 통해 연합 인덱싱과 데이터 식별을 할 수 있는 장점이 있습니다.

그리고 무엇보다 빅데이터에 최적화인 JSON형식으로 도큐먼트를 저장하며 RESTful API를 통해 통신합니다.

그렇다면 이제 ELK를 설치하러 가봅시다!

---

## **ELK 설치**

ELK 설치에 앞서 일반적인 윈도우 환경보단 WSL을 활용한 Ubuntu환경에서 진행하겠습니다. 제가 맥북을 갖고 있지만 이전에 맥북에서 잘 돌아갔는데 무슨 이유에서인지 맥북상의 elasticsearch가 자꾸 동작을 못하네요. 결국 윈도우의 WSL환경으로 진행합니다.

WSL 2 설치 및 환경 세팅은 아래 블로그를 참고했기 때문에 링크 남겨둡니다.

[윈도우10에 우분투 설치하는 방법](https://www.wsgvet.com/ubuntu/160)

WSL 세팅이 끝나고 우분투도 잘 설정이 되었다면 우분투 서버를 실행하면 아래 사진처럼 나옵니다.

![](/image/DataEngineering/elk/elasticsearch/post1/elk_install_1.png)

이제 엘라스틱서치를 설치하기 전에 엘라스틱 서치는 자바 기반으로 구동되기 때문에 자바를 설치해줘야 합니다. 아래의 두 명령어를 쳐줍시다.

```shell
$ sudo apt update && sudo apt upgrade
$ sudo apt install deafult-jdk
```

아마 조금 오래된 글이나 강의에서는 자바 8버전이 필요하다고 말이 나옵니다. 하지만 자바 8이 2019년 이후로 지원을 종료했기때문에 다음 LTS버전인 자바 11의 지원여부가 문제였습니다. 찾아본 결과 자바 11으로도 가능하게 업데이트가 이미 되었다고 합니다. 문제 없이 위의 코드로 진행하여 자바 11으로 설치하셔도 괜찮습니다.

[Support for Java 11](https://discuss.elastic.co/t/support-for-java-11/149393)

```shell
$ java --version
openjdk 11.0.11 2021-04-20
OpenJDK Runtime Environment (build 11.0.11+9-Ubuntu-0ubuntu2.20.04)
OpenJDK 64-Bit Server VM (build 11.0.11+9-Ubuntu-0ubuntu2.20.04, mixed mode, sharing)

$ javac --version
javac 11.0.11
```

위의 쉘 코드를 작성했을때 코드 바로 아래에 똑같이 출력이 나타나면 설치가 완료된 것입니다. 보시는 시기에 따라 자바 버전은 변경될 수도 있습니다.

---

이제 본격적으로 elasticsearch, kibana, logstash, filebeats를 설치해봅시다

아래 링크는 엘라스틱서치 다운로드 사이트입니다. 아래로 들어가서 직접 파일을 다운 받지 않고 링크를 통해 다운 받을 겁니다.

[Download Elasticsearch](https://www.elastic.co/kr/downloads/elasticsearch)

![](/image/DataEngineering/elk/elasticsearch/post1/elk_install_2.png)

사진처럼 DEB X86 64를 우클릭해서 링크 주소 복사를 해줍시다. 이건 각 OS와 아키텍쳐에 맞춰서 선택해주셔야 합니다. 만약 본인이 ARM기반의 노트북이면 옆에 있는 AARCH로 설치하셔야합니다. 그 후 아래의 코드를 우분투 쉘에 입력해주세요. 참고로 링크 복붙은 마우스 우클릭하시면 붙여넣기가 됩니다.

```shell
$ wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.13.3-amd64.deb
```

동일한 방식으로 키바나, 로그 스태시, 파일 비츠도 설치합시다. 키바나, 로그 스태시, 비츠는 위의 사이트에서 상단의 제품으로 가시면 아래 처럼 ELK stack부분이 나타납니다. 해당 부분을 클릭하시면 설치가 가능합니다.

![](/image/DataEngineering/elk/elasticsearch/post1/elk_install_3.png)*제품의 ELASTIC (ELK) STACK을 누르면*

![](/image/DataEngineering/elk/elasticsearch/post1/elk_install_4.png)*우측 상단에 ELK Stack이 모두 나옵니다. logstash, kibana는 동일 방식으로 설치합니다.*

파일 비츠의 경우 좀 더 찾아야 합니다. 설치 방법은 동일합니다. 하지만 Beats로 들어가서 아래의 다운로드를 누르면 아래처럼 다양한 비츠들이 나옵니다. 사실 파일 비츠는 비츠의 일종이기 때문에 여기서 Filebeat만 설치를 합니다.

![](/image/DataEngineering/elk/elasticsearch/post1/beat_install_2.png)

위의 사진에서 처럼 FIlebeat를 설치하시면 동일하게 진행이 가능합니다.

---

이제 설치가 모두 끝났다면 제대로 돌아가는지 확인 해야겠죠?

이번엔 우분투 쉘에서 엘라스틱 서치와 키바나를 실행해봅시다.

```shell
$ sudo service elasticsearch start
$ sudo service kibana start
```

엘라스틱 서치가 정상적으로 돌아가는지 확인하는 방법은 2가지가 있습니다. 쉘을 통한 방법과 웹을 통한 방법입니다.

첫번째로 쉘을 통해 확인하는 방법은 쉘에 아래 코드를 입력해봅니다.

```shell
$ curl -X GET localhost:9200
```

엘라스틱서치는 일반적으로 9200 포트에, 키바나는 5601포트에 열리게 됩니다. 위의 코드로 9200포트의 접속 값을 GET방식을 통해 가져왔을 때 아래처럼 나타나면 엘라스틱서치 정상적으로 동작하는 것입니다.

![](/image/DataEngineering/elk/elasticsearch/post1/elk_check.png)

두번째 방법은 웹 페이지 링크에 localhost:9200을 입력해서 위의 사진과 유사하게 나타나면 정상적으로 실행되고 있는겁니다.

---

이제 키바나가 정상적으로 동작하는지 확인해봅시다.

이번엔 웹페이지에 localhost:5601로 접속해봅시다. 아래처럼 어떤 사이트가 나타나면 키바나가 정상적으로 동작하고 있는겁니다.

![](/image/DataEngineering/elk/elasticsearch/post1/kibana_check.png)

이렇게 해서 ELK를 대략적으로 알아봤고 ELK Stack의 설치까지 진행해봤습니다.

본격적인 ELK 활용은 다음 시간부터 해보겠습니다!