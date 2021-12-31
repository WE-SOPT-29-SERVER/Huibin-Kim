const team = {
  members: [
    {
      name: '김진욱', location: '상도', age: 25, hobby: '기강잡하기',
    },
    {
      name: '손시형', location: '영등포', age: 24, hobby: '탈주하기',
    },
    {
      name: '정설희', location: '상도', age: 23, hobby: '기강잡기',
    },
  ],

  getMemberInfo() {
    this.members.forEach(member => {
      console.log(`${member.name}은(는) ${member.location}에 살고, 나이는 ${member.age}살이며, 취미는 ${member.hobby} 입니다.`);
    });
  },
};

team.getMemberInfo();
