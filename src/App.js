// import React, {useRef, useState, useMemo, useCallback, useReducer} from "react";
import React, {useRef, useReducer, useMemo, useCallback} from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? {...user, active: !user.active} : user
        )
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

function App() {
  // const [inputs, setInputs] = useState({
  //   username: '',
  //   email: ''
  // });

  // const {username, email} = inputs;

  // // const onChange = e => {
  // //   const {name, value} = e.target;
  // //   setInputs({
  // //     ...inputs,
  // //     [name]: value
  // //   });
  // // };
  // // const onChange = useCallback(
  // //   e => {
  // //     const {name, value} = e.target;
  // //     setInputs({
  // //       ...inputs,
  // //       [name]: value
  // //     });
  // //   }, [inputs]
  // // );
  // const onChange = useCallback(e => {
  //   const {name, value} = e.target;
  //   setInputs(inputs => ({
  //     ...inputs,
  //     [name]: value
  //   }));
  // }, []);

  // const [users, setUsers] = useState([
  //   {
  //       id: 1,
  //       username: 'velopert',
  //       email: 'public.velopert@gmail.com',
  //       active: true
  //   },
  //   {
  //       id: 2,
  //       username: 'tester',
  //       email: 'tester@example.com',
  //       active: false
  //   },
  //   {
  //       id: 3,
  //       username: 'liz',
  //       email: 'liz@example.com',
  //       active: false
  //   }
  // ]);

  // const nextId = useRef(4);
  // // const onCreate = () => {
  // //   const user = {
  // //     id: nextId.current,
  // //     username,
  // //     email
  // //   };
  // //   // setUsers([...users, user]); // spread 연산자를 사용하여 유저 추가
  // //   setUsers(users.concat(user)); // concat 함수를 사용하여 유저 추가

  // //   setInputs({
  // //     username: '',
  // //     email: ''
  // //   });

  // //   nextId.current += 1;
  // // };
  // // const onCreate = useCallback(() => {
  // //   const user = {
  // //     id: nextId.current,
  // //     username,
  // //     email
  // //   };
  // //   setUsers(users.concat(user));

  // //   setInputs({
  // //     username: '',
  // //     email: ''
  // //   });
  // //   nextId.current += 1;
  // // }, [users, username, email]);
  // const onCreate = useCallback(() => {
  //   const user = {
  //     id: nextId.current,
  //     username,
  //     email
  //   };
  //   setUsers(users => users.concat(user));

  //   setInputs({
  //     username: '',
  //     email: ''
  //   });
  //   nextId.current += 1;
  // }, [username, email]);

  // // const onRemove = id => {
  // //   // user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
  // //   // = user.id가 id인 것을 제거함
  // //   setUsers(users.filter(user => user.id !== id));
  // // };
  // // const onRemove = useCallback(
  // //   id => {
  // //     setUsers(users.filter(user => user.id !== id));
  // //   }, [users]
  // // );
  // const onRemove = useCallback(id => {
  //   setUsers(users => users.filter(user => user.id !== id));
  // }, []);

  // // const onToggle = id => {
  // //   setUsers(
  // //     users.map(user => user.id === id ? {...user, active: !user.active} : user)
  // //   );
  // // };
  // // const onToggle = useCallback(
  // //   id => {
  // //     setUsers(
  // //       users.map(user => user.id === id ? {...user, active: !user.active} : user)
  // //     );
  // //   }
  // // );
  // const onToggle = useCallback(id => {
  //   setUsers(users =>
  //     users.map(user =>
  //       user.id === id ? {...user, active: !user.active} : user
  //     )
  //   );
  // }, []);

  // // const count = countActiveUsers(users);
  // const count = useMemo(() => countActiveUsers(users), [users]);

  // return (
  //   <>
  //     <CreateUser
  //       username={username}
  //       email={email}
  //       onChange={onChange}
  //       onCreate={onCreate}
  //     />
  //     <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
  //     <div>활성 사용자 수 : {count}</div>
  //   </>
  // );

  const [state, dispacth] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const {users} = state;
  const {username, email} = state.inputs;

  const onChange = useCallback(e => {
    const {name, value} = e.target;
    dispacth({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispacth({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback(id => {
    dispacth({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispacth({
      type: 'REMOVE_USER',
      id
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
