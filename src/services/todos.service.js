import httpService from './http.service'

const endpoint = 'todos'

const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(endpoint, {
      params: {
        _page: 1,
        _limit: 10,
      },
    })

    return data
  },
  create: async (payload) => {
    const { data } = await httpService.post(endpoint, {
      ...payload,
    })

    return data
  },
}

export default todosService
