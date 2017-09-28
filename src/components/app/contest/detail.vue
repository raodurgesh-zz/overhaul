<template>
  <div>
    <div class="content">
      <div class="detail">

        <div class="row">
          <div class="left">Name</div>
          <div class="middle">{{contest.contest_name}} </div>
          <div class="right">
              <div class="button-text"  v-if ="!contest.expired && contest.published" >Published </div> 
              <div  class="button-text" v-if ="contest.expired" >Expired </div> 
              <button class="button-secondary pure-button" v-if ="!contest.expired && !contest.published" @click.prevent="editContest"> Edit</button>
              <button class="button-warning pure-button"   @click.prevent="deleteContest"> Delete</button>
              <button class="button-success pure-button"  v-if ="!contest.expired && !contest.published"  @click.prevent="publishContest"> Publish</button>
              <button class="button-success pure-button"  v-if ="!contest.expired && contest.published"  @click.prevent="expireContest"> Expire </button>
          </div>
        </div>

        <div class="row">
          <div class="left">Description</div>
          <div class="middle">{{contest.description}} </div>
          <div class="right"></div>
        </div>

        <div class="row">
          <div class="left">Region</div>
          <div class="middle">{{contest.region}} </div>
          <div class="right"></div>
        </div>

        <div class="row">
          <div class="left">Created On</div>
          <div class="middle">{{contest.create_on}} </div>
          <div class="right"></div>
        </div>


        <div class="row">
          <div class="left">Total Participants</div>
          <div class="middle">{{contest.participant_count}} </div>
          <div class="right"></div>
        </div>

      </div>
      <div>
        <table>
          <tr>
            <th>Rank</tdh>
              <th>Outlet name</th>
              <th>Rating Count</th>
          </tr>
          <tr v-for="outlet in contest.outlet_list" :key="outlet.oid">
            <td>{{outlet.rank}}</td>
            <td>{{outlet.name}}</td>
            <td>{{outlet.rating_count}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  props: ['id'],
  methods: {
    ...mapActions(
      { getDetail: 'contestDetail' }
    ),
    editContest() {
      this.$router.push({ name: 'contestEdit', id: this.id })
    },
    deleteContest(){
      this.$store.dispatch('deleteContest',{id: this.id})
    },
    expireContest(){
      this.$store.dispatch('expireContest',{id: this.id}).then(s=>{
          window.location.reload();
        })
    },
    publishContest(){

    if(confirm('Are sure you want to publish this contest?') == false) return;

    let _contest =  {
        id : this.contest.contest_id,
        name: this.contest.contest_name,
        description: this.contest.description,
        region: this.contest.region,
        published : true,
        participants: this.contest.outlet_list.map(o => ({ name: o.name, id: o.id , owned_by : o.owned_by, address : o.address }))
      }
        this.$store.dispatch('updateContest',_contest).then(s=>{
          window.location.reload();
        })

    }
  },
  computed: {
    contest() {
      return this.$store.getters.contestDetail(this.id) || {};
    }
  },
  mounted() {
    this.getDetail({ id: this.id, skip: 0 });
  }
}
</script>

<style lang="scss" scoped>

.content {

  .detail {
    display: flex;
    flex-direction: column;
    margin: 10;
    padding: 10;
    margin-bottom: 20px;
  }

  .row{
    display: flex;
    align-items: center;
  }
  .middle{
    flex: 3
  }
  .right{
    flex: 3;
    text-align: right;
    margin-right: 10px;
  }
}
</style>

