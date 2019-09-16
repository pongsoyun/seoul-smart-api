# README
# seoul-smart-api

http://seoul-smart-api.herokuapp.com

# equipments
pc, printer, tv, whiteBoard, mic, headphone, coffeeMachine, microwave, induction, sink, kitchenTools, piano, projector, instrument, game, book

# facility
오픈공간, 회의실, 세미나룸, 녹음실, 부엌, 스터디룸, 연습실, 극장

---
# GraphQL Query, Mutation
## 회원가입 및 개인정보
### 회원가입
```
mutation{
  createUser(name, token){
    name
    token
    achievement
    activityLog
  }
}
```

### 개인정보 수정
: edit User.name
```
mutation{
  modifyUser(userId, name){
    name
    token
    achievement
    activityLog
  }
}
```

### findUser
```
query{
	findUser(_id){
    name
    token
    achievement
    activityLog
  }
}
```

### 로그인
```
//🔥token이 아니라, id, token 모두 들어와야하지않을까요...
query{
  query{
  signIn(token){
    name
    token
    achievement
    activityLog
  }
}
```

---
## Place 
 : 서울시에서 제공하는 모든 청년공간 

### 필터 적용하여 장소 보여주기 
Filter : 시설, 위치, 일시
>#facility
>오픈공간,회의실,세미나룸,녹음실,부엌,스터디룸,연습실,극장

### Place - findPlace
```
query{
  findPlace(_id){
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
    businessHour
    bookLink
    thumbnail
    contact
  }
}
```


### Place - Filter(시설)
>#equipments
>pc,printer,tv,whiteBoard,mic,headphone,coffeeMachine,microwave,induction,sink,kitchenTools,piano,projector,instrument,game,book

```
query{
  getPlaces(page, search, facility, gu){
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
    businessHour
    bookLink
    thumbnail
    contact
  }
}
```

---
## Activity
 : 앱 유저(개인)가 개설한 모든 활동
### findActivity
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
        businessHour
        bookLink
        thumbnail
        contact
      }
      room
    }
    content
    type
    status
  }
}
```
### Activity - Activity 개설하기(개설자)
```
mutation{
  createActivity(name, userId, total, date, startTime, endTime, placeId, room, content, type){
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
        businessHour
        bookLink
        thumbnail
        contact
      }
      room
    }
    content
    type
    status
  }
}
```

### Activity - Activity 신청하기(신청자)
```
mutation{
  applyActivity(activityId, userId, comment){
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
        businessHour
        bookLink
        thumbnail
        contact
      }
      room
    }
    content
    type
    status
  }
}
```

### Activity - Activity 마감하기(개설자)
```

```

### Activity - Activity 삭제하기(개설자)
```
mutation{
  deleteActivity(activityId){
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
        rooms{
          name
          facility
          equipments
          description
          thumbnail
        }
        businessHour
        bookLink
        thumbnail
        contact
      }
      room
    }
    content
    type
    status
  }
}
```

### Activity - Activity 취소하기(신청자)
```
mutation{
  cancelActivity(activityId, userId){
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
        businessHour
        bookLink
        thumbnail
        contact
      }
      room
    }
    content
    type
    status
  }
}
```

### Activity - Activity 수정하기
```
mutation{
  modifyActivity(activityId, name, userId, total, date, startTime, endTime, placeId, room, content, type){
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
        rooms{
          name
          facility
          equipments
          description
          thumbnail
        }
        businessHour
        bookLink
        thumbnail
        contact
      }
      room
    }
    content
    type
    status
  }
}
```

### Activity - type filter 적용하여 모든 Activity 보기
: Activity의 sataus가 recruit(모집중), pauserecruit(모집마감), ongoing(진행중), done(활동완료) 순서대로 정렬되어 표현
```
query{
  getActivities(page, type){
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

### Activity - 활동 상태 변경하기(개발자)
```
mutation{
  changeActivity(activityId, status){
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
        rooms{
          name
          facility
          equipments
          description
          thumbnail
        }
        businessHour
        bookLink
        thumbnail
        contact
      }
      room
    }
    content
    type
    status
  }
}
```

Activity - 활동 종료하기(개설자)
```
mutation{
  changeActivity(activityId, status){
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
        rooms{
          name
          facility
          equipments
          description
          thumbnail
        }
        businessHour
        bookLink
        thumbnail
        contact

      }
      room
    }
    content
    type
    status
  }
}
```

### Activity - 같은 활동 추가로 개설하기(개설자)
: 한번 진행했던 활동을 이어서 개설하고싶은 경우, 이전에 기재했던 활동내용들을 그대로 가지고 갈 수 있는 기능 구현을 위해 만들어졌다. 
```
mutation{
  extendActivity(activityId, date, startTime, endTime, placeId, room){
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
        rooms{
          name
          facility
          equipments
          description
          thumbnail
        }
        businessHour
        bookLink
        thumbnail
        contact
      }
      room
    }
    content
    type
    status
  }
}
```
---
## Program
 :서울시에서 주관하는 모든 프로그램

### Program - 모든 Program 보기
```
query{
    getPrograms{
        title
        image
        link
  }
}
```

### Program - 모든 Program 보기
```
query{
    getProgram(_id){
        title
        image
        link
  }
}
```


