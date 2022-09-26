<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      type="text"
      placeholder="Search for Movies, Series & more"
      @keyup.enter="apply"
    />
    <div class="selects">
      
      <!-- $data는 data() 안에 내용을 참조할수있게 만들어준다. -->
      <!-- 점표기법이아니라 [] 를 이용하여 반응성을 띄게 만들어줌 ?? 반응성이랑 연관이있는지는 미지수-->
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]" 
        :key="filter.name"
        class="form-select">

        <option 
        v-if="filter.name === 'year'"
        value="">
          All Years
        </option>
        <option
        v-for="item in filter.items"
        :key="item"
        >{{item}}</option> 
        
      </select>
    </div>
      <button
      class="btn btn-primary"
        @click="apply" 
        >
        Apply
      </button>
  </div>
</template>

<script>
import store from '../store';

export default {
  data() {
    return {
      title: "",
      type: "movie",
      number: 10,
      year: "",
      filters: [
        {
          name: "type",
          items: ["movie", "series", "episode"],
        },
        {
          name: "number",
          items: [10, 20, 30],
        },
        {
          name: "year",
          items: (() => {
            const years = [];
            const thisYear = new Date().getFullYear();
            for (let i = thisYear; i >= 1985; i -= 1) {
              years.push(i);
            }
            return years;
          })(),
        },
      ],
    };
  },
  methods: {
    async apply() {
      // store에 있는 movie모듈에 뒤에 객체를 인수로 넘겨줌 
      this.$store.dispatch('movie/searchMovies',{
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
};
</script>
<style lang="scss" scoped>
  .container {
    display: flex;
    > * {
      margin-right: 10px;
      font-size: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
    .selects {
      display: flex;
      select{
        width: 120px;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .btn {
      width: 120px;
      flex-shrink: 0;
      height: 50px;
      font-weight: 700;
    }
  }
</style>