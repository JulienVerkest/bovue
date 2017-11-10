<template>
  <div class="dashboard container-fluid">
    <div class="justify-content-centermy-1 row">
      <form class="form-inline">
        <b-form-fieldset horizontal  >
          <b-form-input  placeholder="rechercher par #id / titre / auteur" v-model="query" v-on:keyup="search"></b-form-input>
        </b-form-fieldset>
        <b-form-fieldset horizontal   >
          <b-form-select :options="facetFilters.idTypesPages" v-model="selectedTypesPages"  >
          </b-form-select>
        </b-form-fieldset>
        <b-form-fieldset horizontal >
          <b-form-select :options="facetFilters.idStatuts" v-model="selectedIdStatuts" >
          </b-form-select>
        </b-form-fieldset>
        <b-form-fieldset horizontal >
          <selectize v-model="selectedIdHubs" :settings="hubsSettings"  > 
            <option v-for="hub in hubs" :value="hub.idHubs">{{hub.text}}</option>
          </selectize>
        </b-form-fieldset>
        
        
      </form>
     <!--  <b-form-fieldset horizontal label="Hub" class="col-3" :label-size="6">
        <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="perPage">
        </b-form-select>
      </b-form-fieldset> -->
    </div>

<!--      <b-table striped hover :items="hits" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter">
        <template slot="idTypesPages" scope="item">
            {{item.value | typePage}} 
        </template>
        <template slot="idTypesPages" scope="item">
            {{item.value | typePage}} 
        </template>
        <template slot="created_at" scope="item">
            {{item.value * 1000 | date("DD/MM/YYYY à H:mm")}}
        </template>
        <template slot="updated_at" scope="item">
            {{item.value * 1000 | date("DD/MM/YYYY à H:mm")}}
        </template>
    </b-table> -->
    

<!--     <table class="table table-hover" id="dashboard-table">
      <tr class="row" v-for="doc in hits" v-on:click="">
        <td data-title="'#id'">{{doc.objectID}}</td>
        <td data-title="'Titre'">{{doc.titre}}</td>
        <td class="actions-cell">
        <div class="btn-group dashboard-actions" role="group">
          <button type="button" class="btn btn-link"
                  v-if="doc.isLocked > 0" v-click="lockerClicked($event)"
                  tooltip-html="lockedPage(doc.locker)" tooltip-trigger="focus">
            <i class="fa fa-lock"></i>
          </button>
          <button type="button" class="btn btn-link"
                  v-click="openLiveWindow($event, doc.objectID, doc.titre)"
                  tooltip-html="'prévisualiser : <br><em>{{doc.titre}}</em>'">
            <i class="fa fa-eye"></i>
          </button>
        </div>
        </td>
        <td data-title="'Type'">{{doc.idTypesPages | typePage}}</td>
        <td data-title="'Date création'">{{doc.created_at * 1000 | date("DD/MM/YYYY à H:mm")}}</td>
        <td data-title="'Date MAJ'">{{doc.updated_at * 1000 | date("DD/MM/YYYY à H:mm")}}</td>
        <td data-title="'Auteur'">{{doc.user}}</td>
        <td data-title="'Statut'" v-html="pageStatut(doc.idStatuts, doc.publishAt, doc.unpublishAt)"></td>
      </tr>
    </table> -->

    </button>
    <v-client-table :data="hits" :columns="fields2" :options="options">
    </v-client-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import algoliasearch from 'algoliasearch'
  import { mapGetters } from 'vuex'
  import typePage from 'filters/TypePage'
  import date from 'filters/Date'
  import statuts from 'filters/Statuts'
  import {ServerTable, ClientTable, Event} from 'vue-tables-2';
  import Selectize from 'vue2-selectize'
  Vue.use(ClientTable, {}, false);
  const client = algoliasearch('QGS0I5WCQR', '678db0f50bf08bea08338365ba61cd22');
  const index = client.initIndex('recette_ParisBack');
  const data = { 
    query: '', 
    hits: [],
    fields: {
      objectID : { label: '#id' },
      titre: { label: 'Titre' },
      idTypesPages: { label: 'Type' },
      created_at: { label: 'Date création' },
      updated_at: { label: 'Date MAJ' },
      user: { label: 'Auteur' },
      idStatuts: { label: 'Statut' } 
    },
    selectedTypesPages: null,
    selectedIdStatuts: null,
    selectedIdHubs: 1,
    hubsSettings: { 

    },
    fields2: ['objectID','titre','idTypesPages','created_at','updated_at','user','idStatuts'],
    facetFilters: {
      idTypesPages: [
        {text:'Type de document', value:null},
        {text:'Actualités', value:1},
        {text:'Document pérenne', value:2},
        {text:'Fiche élus', value:3},
        {text:'FAQ', value:4},
        {text:'Page statique', value:5}
      ],
      idStatuts: [
        {text:'Statut', value:null},
        {text:'En ligne', value:1},
        {text:'Publication programmée', value:2},
        {text:'Hors ligne', value:3},
        {text:'A valider', value:4}
      ],
      idHubs: []
    },
    options: {
      perPage: 50,
      perPageValues: [5,10,50,100,150,200],
      texts:{
        count:'Page {from} - {to} sur {count} pages|{count} pages|page',
        filter:'Filtrer par',
        filterPlaceholder:'',
        limit:'Résultats:',
        noResults:'Aucune page trouvée',
        page:'Page:', // for dropdown pagination 
        filterBy: 'Filtrer par {column} ', // Placeholder for search fields when filtering by column
        loading:'Chargement...', // First request to server
        defaultOption:'Tous {column}' // default option for list filters
      },
      customFilters: [{
            name:'alphabet',
            callback: function(row, query) {
                return row.name[0] == query;
            }
        }
      ],
      filterByColumn:false,
      filterable: false 
    },
    currentPage: 1,
    perPage: 10,
    filter: null
  }
  export default {
    data:function() {
      return data
    },
    watch: {
      selectedTypesPages: function () { this.search() },
      selectedIdStatuts: function () { this.search() },
    },
    methods: {
      search: function() {
          let facetFilters = [];
          let numericFilters = [];
          if(this.selectedTypesPages) {
            facetFilters.push('idTypesPages:' + this.selectedTypesPages);
          }
          if(this.selectedIdStatuts) {
            facetFilters.push('idStatuts:' + this.selectedIdStatuts);
          }
          if(this.selectedIdHubs) {
            facetFilters.push('idHubs:' + this.selectedIdHubs);
          }
          index.search(this.query, {facetFilters}, function(error, results) {
              this.hits = results.hits; 

          }.bind(this));
          // index
          //   .search(this.query, {facetFilters:[]}, function(error, results))
          //   .then(function(content) {
          //       // params.total(content.nbHits);
          //       // $scope.totalPages = content.nbPages;
          //       // $defer.resolve(content.hits);
               
          //       this.hits = content.hits;
          //       console.log(content.hits);
          //     }, function(err) {
          //       flash.error = "Erreur lors de la recherche : " + err.message;
          //     }.bind(this));
      },
      changeTypesPages() {
        
      },
      applyFilter(letter) {
        this.selectedLetter = letter;
        Event.$emit('vue-tables.filter::alphabet', letter);
      },
      pageStatut: function(idStatuts, publishAt, unpublishAt) {
        let html = statuts(idStatuts);
        if (idStatuts === 2 && publishAt) {
          html += '<br>';
          html += date(publishAt*1000, "'le' dd/MM/yyyy 'à' H:mm");
        }

        if (unpublishAt) {
          html += '<br>';
          html += '<small>dépublication<br>' + date(unpublishAt*1000, "'le' dd/MM/yyyy 'à' H:mm") + '</small>';
        }
        return html;
      }
    },
    created () {
      this.search();
      this.$store.dispatch('getHubs');
    },
    computed: mapGetters({
      hubs: 'hubs'
    }),
    filters: {
      typePage, date
    },
    components: {
      Selectize
    }
  }
</script>