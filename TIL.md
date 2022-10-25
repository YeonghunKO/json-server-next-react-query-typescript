# next js

## 오류

### NEXT JS

1. TypeError: Converting circular structure to JSON starting at object with constructor clientrequest

- getStaticProps에서 return 값이 circular structure일때 나타나는 오류
- circular structure는 부모 obj에 존재하는 자손중에 부모를 참조하는 형태의 obj
- 나같은 경우 axios.get의 리턴값을 통째로 넘겨줘서 그렇다.
- result.data를 넘겨줘야 했음.

3. env.local을 client에서 쓰고싶다면?

- `NEXT_PUBLIC`을 변수명앞에 붙이자

### REACT

2. Property 'children' does not exist on type 'IntrinsicAttributes

- children을 받을 수 없는데 children을 받아서 생긴 에러.

<오류>

```jsx
<ReactQueryDevtools initialIsOpen={false}>
  <Component {...pageProps} />
</ReactQueryDevtools>
```

<해결>

```jsx
  <ReactQueryDevtools initialIsOpen={false}/>
  <Component {...pageProps} />
```

### ETC

4. 유튜버 , 스택오버플로우를 맹신하지 말자

- version이 다를 수 있다. 그러므로 공식문서, 소스코드를 가장 먼저 참고하자!(usemutation, optimistic)

### REACT-QUERY

5. Missing queryFn

- form 에서 useMutation을 이용해서 optimistic update를 하였다.
- 그러나 Missing queryFn에러가 뜨면서 refetchWindowOnFocus가 먹히지 않았다.
- 부모 컴포넌트에서 useQuery에 queryFn을 pass하지 않아서이다... 너무 당연하다
- 데이터를 받아오는 곳에서는 반드시 axios.get이 담긴 함수를 useQuery에 넣어주자

6. notifyOnChangeProps: string[] | "all"

- 랜더링 최적화에 쓰이는 useQuery의 api이다. 배열이나 스트링형태의 input이 pass된다.
- useQuery에서 extract된 prop을 스트링형태로 배열안에 담긴다.
- 예를들어 `['data','error']` 라고 하면 data,error가 바뀌었을때만 랜더링 된다.
- `tracked`이라고 하면, destructuring된 prop을 자동으로 감지한다.(v4버전부터는 default이다.)

예를 들어보자, 나는 todoList/index.ts 에서 useQuery로 todos를 get하고 있었고, todoList/todo.ts에서는 useMutation으로 낙관적 업데이트를 하고 있었다.

```tsx
//  todoList/index.ts
export default function TodoList() {
  const { data: todos } = useQuery<ITodo[]>(queryKeys.todos, getTodos);
  console.log('TODO LIST RENDERING');
}

//  todoList/todo.ts
function Todo({ id, isCompleted, todo }: ITodo) {
  console.log('TODO RENDERING', id);

  const { mutate: mutateEdit } = useTodoEditMutationQuery();
  const { mutate: deleteEdit } = useTodoDeleteMutationQuery();
}
```

그랬더니 로그가 아래처럼 나왔다.

근데 notifyOnChangeProps를 `tracked` 또는 `['data']`로 적용했더니 아래와같이 로그결과가 출력되었다.

```tsx
//  todoList/index.ts
export default function TodoList() {
  const { data: todos } = useQuery<ITodo[]>(queryKeys.todos, getTodos, {
    notifyOnChangeProps: 'tracked', // ['data']
  });
  console.log('TODO LIST RENDERING');
}
```

index가 mutation에 의해서 한 번 바뀌고 나서 랜더링이 안되는 것을 확인할 수 있다. 아마도 useMutation에서 onMutate할때 setQueryData에 의해서 queryKeys.todos에 해당되는 data가 바뀌어서 그런것 같다.

이후에 rendering되는 todo는 stale되고나서 다시 한 번 랜더링 되는 것 같다.

## 느낀점

- react-query는 미쳤다... 내가 inflearn 과제할때 client/server data sync맞춘다고 애먹었는데 이건 data가 stale되면 알아서 맞춰준다.
- 그리고 optimistic update랑 infinite scroll까지 지원해준다. 코드의 양이 현저히 줄어든다.(context api, reducer, useEffect를 사용하지 않아도 된다)
- SSR까지 지원! 한마디로 server에서 prefetcher할 수 있다. 그리고 html 문서에 data가 이미 포함되어져서 client로 넘어온다.
- mutation시에 , 에러가 났을 경우 데이터를 rollback하는 기능까지 갖추고 있어 안전하다.
- loading기능까지 제공!
- request를 날렸을때 error가 올경우 default로 request를 3번 `retry`함. 물론 `retry` 횟수는 option으로 변경가능
- notifyOnChangeProps를 통해 리랜더링 최적화까지 가능...(optimization)
- 개발하면서 이정도 까지 전율은 느낀적은 너가 처음일꺼야.... 격하게 애정하는 라이브러리
