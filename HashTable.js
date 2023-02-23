const person = {};
person['firstName'] = 'Mark';
person['lastName'] = 'Kim';

class HashTable {
  table = new Array(3);
  // 해시 테이블 사이즈에 바로 접근 할 수 있도록 변수 생성, setItem 할 때마다
  // numItem++되어 table에 들어있는 개수를 그때 그때 반영
  //  이 값을 활용하여, table의 길이 대비 현재 들어있는 값의 개수를 연산해
  // 특정 수준 이상으로 값이 할당이 되면 table의 길이를 늘림

  numItems = 0;

  setItem = (key, value) => {
    this.numItems++;

    // table 원소 개수가 80%이상 차있는 경우 resize()
    const loadFactor = this.numItems / this.table.length;
    if (loadFactor >= 0.8) {
      this.resize();
    }

    const idx = hashStringToInt(key, this.table.length);
    if (this.table[idx]) {
      this.table[idx].push([key, value]);
    } else {
      this.table[idx] = [[key, value]];
    }
  };

  // 만약 배열의 크기를 3에서 6으로 두 배를 했다면, 그보다 큰 소수인 7을 새로운 table의 크기로 설정해주는 것.

  resize = () => {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach((item) => {
      if (item) {
        item.forEach(([key, value]) => {
          const idx = hashStringToInt(key, newTable.length);
          if (newTable[idx]) {
            newTable[idx].push([key, value]);
          } else {
            newTable[idx] = [[key, value]];
          }
        });
      }
    });
    this.table = newTable;
  };

  // getItem에서도 값을 가져오기 원하는 key를 해시 함수로 변환해서 table[3]의 값을 리턴하도록 한다.
  getItem = (key) => {
    const idx = hashStringToInt(key, this.table.length);
    // 값이 없는 경우 null;
    if (!this.table[idx]) return null;

    // 단순히 전체 table의 index로 접근 = O(1) but array.find를 사용하면 O(n)으로 증가함
    return this.table[idx].find((el) => el[0] === key)[1];
  };
}

// 2.  해시 함수(Hash Function)가 필요한 이유
function hashStringToInt(s, tableSize) {
  let hash = 17;
  // return 3; 항상 table[3] index 중복 해시 충돌 발생

  for (let i = 0; i < s.length; i++) {
    hash = (13 * hash * s.charCodeAt(i)) % tableSize;
  }

  return hash;
}

//resize 함수로 배열이크기가 80%가 차면 새로운 배열을 만들어주어  table.length가 두배로 변한 것을 볼 수 있다.

// 생성자 함수 생성 new HashTable();
// const myTable = new HashTable();
// myTable.setItem("firstName", "Mark");
// console.log(myTable.table.length); // 3
// console.log(myTable.getItem("firstName")); // Kelly

// myTable.setItem("lastName", "Kim");
// console.log(myTable.table.length); // 3
// console.log(myTable.getItem("lastName"));

// myTable.setItem("age", 29);
// console.log(myTable.table.length); // 6
// console.log(myTable.getItem("age"));

// myTable.setItem("birth", "2000-00-00");
// console.log(myTable.table.length); // 6
// console.log(myTable.getItem("birth"));
