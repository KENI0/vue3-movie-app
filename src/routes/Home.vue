<template>
  <Headline></Headline>
  <Search></Search>
  <MovieList></MovieList>
</template>

<script>
import Headline from "~/components/Headline.vue";
import Search from "~/components/Search";
import MovieList from "~/components/MovieList.vue";

export default {
  components: {
    Headline,
    Search,
    MovieList
  },
};
</script>
