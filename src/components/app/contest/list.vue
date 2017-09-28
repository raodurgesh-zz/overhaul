<template>
  <div>
    <nav id="navbar">
      <ul>
        <li> <a :class="{selected : filter == 'all'}" @click.prevent="selectFilter('all')">All</a></li>|
        <li> <a :class="{selected : filter == 'published'}" @click.prevent="selectFilter('published')">Published</a></li>|
        <li> <a :class="{selected : filter == 'unpublished'}" @click.prevent="selectFilter('unpublished')">Unpublished</a></li>|
        <li> <a :class="{selected : filter == 'expired'}" @click.prevent="selectFilter('expired')">Expired</a></li>
      </ul>
    </nav>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <table>
        <tr class="contest" v-for="contest in contestList" :key="contest.contest_id" @click="getDetail(contest.contest_id)">
          <td> {{contest.contest_name}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {debounce as _debounce}  from 'lodash';

export default {
  computed: {
    ...mapGetters({
      inProgress: 'contestInProgress',
      error: 'contestError',
      contestList: 'contestList',
      loadNext: 'moreContest',
      skip: 'contestListLength',
      filter: 'contestFilter',
      loaded: 'contestLoaded'
    }),
    busy() {
      return this.loaded && (this.inProgress || !this.loadNext);
    }
  },
  methods: {
    loadMore: _debounce(function() {
      let params = { skip: this.skip, filter: this.filter };
      this.$store.dispatch('loadcontest', params);
    },300),
    getDetail: function(id) {
      this.$router.push({ name: 'contestDetail', params: { id } })
    },
    selectFilter : function(filter){
      this.$store.dispatch('filter', filter);
      this.loadMore();
    },
    dispatchFilterAction : function(filter){
       this.$store.dispatch('filter', filter);
    }
  },
  mounted(){
    if(!this.filter)
    this.dispatchFilterAction('all');
  }
}
</script>

<style lang="scss" scoped>
.contest {
  display: block;
  padding: 2px 0px 5px 0px;
  cursor: pointer;
  &:hover {
    background-color: #dedede;
  }
}

  #navbar{ 
    float: right;
    font-size: 15px;

    .selected{
    font-weight: bold;
    }
  }

  tr:nth-child(even){
    background-color: white;
  }

  tr:nth-child(odd) {
    background-color: #f2f2f2
  }

</style>
