import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    message: '',
    loading: false
  }),
  mutations: {
    updateState(state,payload){
      // object.keys(payload)를 조지면 moives 라는 키가 나옴
      Object.keys(payload).forEach(key => {
        state[key]= payload[key]
      })
    },
    
    resetMovies(state){
      state.movies = []
    }

  },
  
  actions: {
    async searchMovies({ state, commit }, payload) {
      try{
        
      const res = await _fetchMovie({
        ...payload,
        page: 1
      })
         

        // res의 data속성안에 내용을 객체구조분해하는 모습. 
        // Search와 totalResults는 movie omdbi 에서 제공하는 문법이다. 
        const { Search, totalResults} = res.data
        commit('updateState', {
          movies: _uniqBy(Search,'imdbID') 
        })
        // totalResults라는 string 데이터를 10진수의 숫자로 변환! 
        const total = parseInt(totalResults,10)
        // math 내장함수의 ceil(올림처리)메서드를 통해서 총 페이지의 개수 유추 
        const pageLength = Math.ceil(total / 10)

        //추가 요청 로직 
        if(pageLength > 1 ) {
          for( let page = 2 ; page <= pageLength; page += 1) {
            //사용자가 지정한 number 수대로 반복문을 설정해주는 로직이다
            if(page > ( payload.number / 10 ))  break      //  === if(page > ( number / 10 )) { break }       
            const res = await _fetchMovie({
              ...payload,
              page // page: page
            })
            const { Search } = res.data 
            // 배열안에서 전개연산자를 통해서, 기존에 배열안에있던 데이터를 전개해줌 
            // 그래서 새로운 배열을 만들어서 다시 새로운 값들이 추가될때마다 할당해주는 로직 이다. 
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search,'imdbID')]
            })

            // 아래처럼 작성하면 배열데이터가 덮어씌워지는 대참사가 벌어짐
            // commit ('updateState',{
            //   movie: Search
            // })

          }
        }
      } catch(message) {
        commit('updateState', {
          movies: [],
          message
        })
    }
  }
}
}
 //fetchMovie앞에 언더바 (movie.js에서만 쓴다는 의미)
 function _fetchMovie(payload){
  const {title, type, year, page} = payload
  const OMBD_API_KEY = '7035c60c' 
  const url = `https://www.omdbapi.com/?apikey=${OMBD_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        
        if(res.data.Error) {
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch((err) => {
        reject(err.message)
      })
  })
}