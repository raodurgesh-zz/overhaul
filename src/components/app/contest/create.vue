
<template>
  <div>
    <div>
      <div class="row">
        <div class="left"></div>
        <div class="middle">
        </div>
        <div class="right">
          <button class="button-success pure-button" @click.prevent="saveContest({published:false})">{{ editContest ? 'Update': 'Save'}}</button>
          <button class="button-success pure-button" @click.prevent="saveContest({published:true})">Publish Now</button>
        </div>
      </div>
      <div class="row">
        <div class="left">Name</div>
        <div class="middle">
          <input type="text" v-model="contest.name">
        </div>
        <div class="right"></div>
      </div>

      <div class="row">
        <div class="left">Description</div>
        <div class="middle">
          <input type="text" v-model="contest.description">
        </div>
        <div class="right"></div>
      </div>

      <div class="row">
        <div class="left">Region</div>
        <div class="middle">
          <input type="text" v-model="contest.region">
        </div>
        <div class="right"></div>
      </div>

      <div class="row">
        <div class="left">Participants</div>
        <div class="middle">
          <multiselect class="multiselect__box width100" v-model="contest.participants" id="selectbox" label="name"  track-by="id" placeholder="Type to search outlets" open-direction="bottom" :options="outlets" :multiple="true" :searchable="true" :loading="isLoading" :internal-search="false" :clear-on-select="true" :close-on-select="false" :options-limit="300" :hide-selected="true" :limit="100" :limit-text="limitText" :max-height="600" :show-no-results="showNoResult" @search-change="asyncFind">
            <template slot="clear" scope="props">
              <div class="multiselect__clear" v-if="selectedOutletsLength" @mousedown.prevent.stop="clearAll(props.search)"></div>
            </template>
            <span slot="noResult">Oops! No outlet found. Consider changing the search query.</span>
          </multiselect>
        </div>
        <div class="right"></div>
      </div>
      <div class="row">
        <div class="left"></div>
        <div class="middle error">
          <div v-for="error in errors" :key="error">
            {{error}}
          </div>
        </div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import _ from 'lodash';
import { findOutlet } from '../../../services/index';
import Vue from 'vue';

export default {
  components: { Multiselect },
  props: ['id'],
  data() {
    return {
      outlets: [],
      isLoading: false,
      query: '',
      errors: []
    }
  },
  methods: {
    limitText(count) {
      return ` ${count} outlet(s) selected.`
    },
    asyncFind: _.debounce(function(query) {
      this.query = query;
      if (!query || query.length < 2) return;
      this.isLoading = true
      findOutlet({ query }).then(response => {
        if (!response || !response.data) return;
        this.outlets = response.data.result;
        this.isLoading = false;
      })
    }, 500),
    clearAll() {
      this.contest.participants = []
    },
    validContest() {
      let isValid = true;
      this.errors = [];

      if (this.contest.name.trim().length == 0) {
        isValid = false;
        this.errors.push("name is required!");
      }
      if (this.contest.participants.length == 0) {
        this.errors.push("participants are required!!");
        isValid = false;
      }

      setTimeout(()=>{ this.errors =[] },5000);


      return isValid;
    },
    saveContest(published) {
      if (!this.validContest()) return;
      let contest = { ...this.contest, ...published };
      if (this.editContest)
        this.$store.dispatch('updateContest', contest);
      else
        this.$store.dispatch('createContest', contest);
    }
  },
  computed: {
    showNoResult() {
      return this.query.length > 3;
    },
    selectedOutletsLength() {
      return this.contest.selectedOutlets ? this.contest.selectedOutlets.length : 0;
    },
    editContest() {
      return this.id;
    },
    contest() {
      let createContest = {
        name: '',
        description: '',
        region: '',
        participants: [],
        published: false
      };
      let editContest = this.$store.getters.contestDetail(this.id);
      if (this.id && !editContest) {
        Vue.toast("No contest to edit!", { horizontalPosition: "center" });
        this.$router.push({ name: 'contestDetail', id: this.id });

      }
      if (!editContest) {
        return createContest;
      }
      return {
        id: editContest.contest_id,
        name: editContest.contest_name,
        description: editContest.description,
        region: editContest.region,
        published: editContest.published,
        participants: editContest.outlet_list.map(o => ({ name: o.name, id: o.id, owned_by: o.owned_by, address: o.address }))
      }

    }
  }

}
</script>

<style lang="scss" scoped>
.middle {
  input {
    width: 100%;
  }
  ;
  .width100 {
    width: 100%;
  }
}

.error {
  display: block !important;
  color: red;
}

.button-success {
  // margin-left: 20px;
}
</style>



