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

## 메인페이지
### 마이페이지
1. 달성률, 내 활동 이력
```
query{
  findUser(_id){
    name 
    achievement
    activityLog{ #완료,진행,예정한 Activity의 정보 불러오기
      activityId
      name 
      leader{ #userId와 leader{useId}가 같으면 활동 수정버튼 활성화, 다르면 버튼 보이지 않게
        userId
      }
      days{ #Activity 예정 날짜, 시간, 지점, room 정보 불러오기
        date
        startTime
        endTime
        place{
          name
        }
        room
      }
      status #'recruit', 'pauserecruit', 'ongoing', 'done' 총 4가지의 Activity상태정보
    }
  }
}
```
