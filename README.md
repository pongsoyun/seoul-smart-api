# 개발] README
## seoul-smart-api

http://seoul-smart-api.herokuapp.com

# equipments
pc, printer, tv, whiteBoard, mic, headphone, coffeeMachine, microwave, induction, sink, kitchenTools, piano, projector, instrument, game, book

# facility
오픈공간, 회의실, 세미나룸, 녹음실, 부엌, 스터디룸, 연습실, 극장

---
# GraphQL Query, Mutation
## 회원가입
```
mutation{
  createUser(name, token){
    name
    token
  }
}
```

## 로그인 페이지
```
query{
  signIn(token){
    id
    name
    token
  }
}
```

## 메인페이지 - 메인
1. 메인페이지 - 메인
### 달성률, 내 활동이력
: `activityLog{ activityId }` 로 `3. 신청자 리스트` 구현
: findUser{ activityLog{ activityId{ leader {userId} } } } } 가져온 후 본인(userId) 와 같은 값이면 수정 버튼 활성화
```
query{
  findUser(_id){
    name 
    achievement
    activityLog{
      activityId
      name 
      leader{
        userId
      }
      days{ 
        date
        startTime
        endTime
        place{
          name
        }
        room
      }
      status
    }
  }
}
```

2. 메인페이지 - 상단 수정버튼
### 이름 수정
```
mutation{
  modifyUser(userId, name){ #name 수정가능
    name
  }
}
```

### 탈퇴하기
```
//🔥????
```

3. 메인페이지 - 신청자 리스트
**: 개설자만 볼 수 있는 화면**
: 활동명, 이름, 신청인사말
```
query{
  findActivity(_id){
    name
    participants{
      name
      comment
    }
  }
}
```

---

## 장소페이지
1. 장소페이지  - 메인
: 장소명, 상세주소, 사진 보여주기
```

```

2. 장소페이지 - 필터(시설, 위치) 선택 페이지
### 시설, 위치 필터
> 시설 : 오픈공간, 회의실, 세미나룸, 녹음실, 부엌, 스터디룸, 연습실, 극장
> 위치 : 강북구, 강서구, 양천구, 동작구 등…
```

```

3. 장소 페이지 - 장소 선택시 보여지는 장소 상세페이지
: 사진, 장소명(공간 전체 이름 ex. 무중력지대 G밸리), 상세주소, 장소설명, 시설 아이콘, 링크
🔥db에는 운영시간이랑 연락처 다 적혀있는데 와이어프레ㅁ에는 없네여 그래서 일단 리드미쿼리에도 뻈습니다
> 기자재 종류
> pc, printer, tv, whiteBoard, mic, headphone, coffeeMachine, microwave, induction, sink, kitchenTools, piano, projector, instrument, game, book
```
query{
  findPlace(_id: "5d7e28d3e7179a084efd7136"){
    name
    rooms{
      name
      facility
      equipments
      description
      thumbnail
    }
    location{
      address
      gu
    }
    bookLink
  }
}

```


---
## 활동 페이지
## 1. 개인
1. 활동페이지 - 개인
### 필터(활동 유형) 기능
> 활동 유형
> mentoring, study, conference, networking, lifestyle
: ex. `type: “study"`
```
query{
	getActivities(type){
    name
    leader{
      userId
      name
    }
    participants{
      userId
      name
      comment
    }
    total
    days{
      date
      startTime
      endTime
      place
      room
    }
    content
    type
    status
  }
}
```

2. 활동페이지 - 개설페이지
### 개설페이지
: `1. 활동페이지 - 개인` 의 floating 되어있는 `+` button의 event
: 활동 이름, 장소, 일시, 인원, 내용 입력, 활동유형 선택 후 확인버튼press -> 개설페이지로 돌아감
🙌🏻{$활동이름}을 성공적으로 개설했습니다!
```
mutation{
  createActivity(name, userId, total, date, startTime, endTime, placeId, room, content, type){
    name
  }
}
```

### 개설페이지 - 장소 선택 [ 장소페이지와 동일 ]
- 검색창
```

```
- 필터 - 시설
 : 오픈공간, 회의실, 세미나룸, 녹음실, 부엌, 스터디룸, 연습실, 극장
```

```
- 필터 - 위치
 : 강북구, 강서구, 양천구, 동작구 등…
```

```

3. 활동페이지 - 활동설명페이지
```
query{
	findActivity(_id){
    name
    leader{
      userId
      name
    }
    participants{
      userId
      name
      comment
    }
    total
    days{
      date
      startTime
      endTime
      place{
        name
      }
      room
    }
    content
    type
    status
  }
}
```

### 신청자
- 신청자 - 활동 신청하기 버튼 눌렀을 시
```
mutation{
  applyActivity(activityId, userId, comment){
    name
  }
}
```

- 신청자 - 활동신청취소하기 버튼 눌렀을 시
```
mutation{
  cancelActivity(activityId, userId){
    name
  }
}
```

### 개설자
: 신청자와 달리 편집버튼 활성화, 개설취소버튼 활성화
: 활동 사진, 제목, 인원, 날짜, 장소, status, 참여자, 참여자 comment
`findActivity{ leader { userId} }` 가져온 후 `본인(userId)` 와 같은 값이면 편집, 개설취소, 마감하기 버튼 활성화

- 개설자 - 편집 버튼 press 시
```
mutation{
  modifyActivity(activityId, name, userId, total, date, startTime, endTime, placeId, room, content, type){
    name
    total
    days{
      date
      startTime
      endTime
      place{
        name
      }
      room
    }
    content
    type
    status
  }
}
```

- 개설자 - 개설 취소 버튼 press 시
```
mutation{
  deleteActivity(activityId){
    name
  }
}
```

- 개설자 - 마감하기 버튼 press 시
: 무조건 `status: “pauserecruit”`
```
mutation{
  changeActivity(activityId, status){
		id
    name
    leader{
      userId
    }
    participants{
      userId
    }
    status
  }
}
```

### 활동이 전부 마감되고 실행 될 함수
: 무조건 `status: “done”`
: 리워드 지급을 위해 실행
```
mutation{
  changeActivity(activityId, status){
		id
    name
    leader{
      userId
    }
    participants{
      userId
    }
  }
}
```


## 2. 서울시
1. 활동페이지 - 서울시
: 필터 없이 서울시의 모든 프로그램 show
```
query{
	getPrograms{
    title
    image
    link
  }
}
```

2. 서울시 활동 상세페이지
: 서울시 활동 버튼 선택 시 보여지는 상세 페이지
: 서울시 활동 사진, 제목, 링크
```
query{
	getProgram(_id){
    title
    image
    link
  }
}
```
