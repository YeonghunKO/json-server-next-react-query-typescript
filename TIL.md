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

## 느낀점

- react-query는 미쳤다... 내가 inflearn 과제할때 client/server data sync맞춘다고 애먹었는데 이건 data가 stale되면 알아서 맞춰준다.
- 그리고 optimistic update랑 infinite scroll까지 지원해준다. 코드의 양이 현저히 줄어든다.(context api, reducer, useEffect를 사용하지 않아도 된다)
- SSR까지 지원! 한마디로 server에서 prefetcher할 수 있다. 그리고 html 문서에 data가 이미 포함되어져서 client로 넘어온다.
- mutation시에 , 에러가 났을 경우 데이터를 rollback하는 기능까지 갖추고 있어 안전하다.
- loading기능까지 제공!
- request를 날렸을때 error가 올경우 default로 request를 3번 `retry`함. 물론 `retry` 횟수는 option으로 변경가능
- 개발하면서 이정도 까지 전율은 느낀적은 너가 처음일꺼야.... 격하게 애정하는 라이브러리
