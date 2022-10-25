import { dehydrate, QueryClient, useQuery } from 'react-query';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

import { AppBar, Toolbar, Typography, Paper } from '@material-ui/core';
import { queryKeys } from '../types/TodoQuery';
import { request } from '../utils/axios-utils';

import { AxiosError, AxiosResponse } from 'axios';

function Todo() {
  console.log('TODO INDEX RENDERING');

  return (
    <Paper
      style={{
        // padding: 0,
        // margin: 0,
        height: '100vh',
        backgroundColor: '#f3f2ef',
      }}
      elevation={0}
    >
      <AppBar color="primary" position="sticky" style={{ height: '64px' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            style={{
              fontFamily: "'Indie Flower', cursive",
              fontSize: '1.5rem',
            }}
            color="inherit"
          >
            🔥FIRE TODOS🔥
          </Typography>
        </Toolbar>
      </AppBar>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TodoForm />
        <TodoList />
      </main>
    </Paper>
  );
}

export default Todo;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.todos, async () => {
    const result: AxiosResponse | AxiosError = await request({ method: 'get' });

    return (result as AxiosResponse).data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
