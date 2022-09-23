import axios from 'axios'
export default {
  namespaced: true,
  state: () => {
    return {
      movies: [],
      message:'',
      loading: false 
    }
  }, // () => ({ movies: [] }) 생략 쌉가능 
  getters: {},
  mutations: {
    updateState(state,payload){
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
      // Object.keys > 객체데이터의속성이름들을 가지고 새로운 배열을 만들어줌.
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  actions: {
   async searchMovies(context, payload) {
      const {title, type, number, year} = payload
    

      const OMBD_API_KEY = '7035c60c'
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMBD_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)     
      const { Search, totalResults} = res.data
      context.commit('updateState',{
        movies: Search,
        message: 'Hello world',
        loading: true
      })
    }
  }

}

state.movies = playload.movies
state.message = playload.message
state.loading = playload.loading 

//점표기법을 제거하고 대괄호로 표현 쌉가능 
state['movies'] = playload['movies']
state['message'] = playload['message']
state['loading'] = playload['loading'] 

//foreach 의 반복을 이용하여, 화살표함수를 조져줌 

state[key] = playload[key]
