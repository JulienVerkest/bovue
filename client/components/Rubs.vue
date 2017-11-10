<template>
  <div class="page">
  	<div id="page-rubriques" class="container-fluid">
  	  <div class="page-header">
  	    <h2>Gestion des rubriques avec vue-tables-2</h2>
  	  </div>
      <div style="float:right;margin:10px;">
        <b-button size="mm" variant="primary" @click="$root.$emit('show::modal','modal1');$store.commit('ADD_RUBRIQUE');">+</b-button>
      </div>
      <v-client-table :data="rubriques" :columns="fields" :options="options">
        <template slot="idRubriques" scope="item">
          
        </template>
        <template slot="actions" scope="item">
          <button type="button" class="btn btn-primary btn-sm rubrique-edit" @click="$root.$emit('show::modal','modal1');$store.commit('EDIT_RUBRIQUE', item);">
            <span aria-hidden="true" class="fa fa-pencil" tooltip="Modifier la rubrique"></span>
            <icon name="pencil" label="Modifier la rubrique"></icon>
            <span class="sr-only">Modifier</span>
          </button>
          <!-- ngIf: isAuthorized(userAccess.admin) -->
          <click-confirm   placement="left" :messages="{title: 'Êtes-vous sûr de supprimer cette rubrique ?', yes: 'Oui', no: 'Non'}" >
            <button type="button" class="btn btn-danger btn-sm rubrique-delete" ng-click="deleteRubrique(rubrique)" ng-if="isAuthorized(userAccess.admin)" @click="$store.commit('DELETE_RUBRIQUE', item)">
              <span aria-hidden="true" class="fa fa-trash-o" tooltip="Supprimer la rubrique"></span>
              <icon name="trash" label="Supprimer la rubrique"></icon>
              <span class="sr-only">Supprimer</span>
            </button>
          </click-confirm>
            <!-- end ngIf: isAuthorized(userAccess.admin) -->
        </template> 

      </v-client-table>
      </b-table>
      <!-- Modal Component -->
      <b-modal id="modal1" v-bind:title="modalTitle" @ok="$store.commit('SUBMIT_RUBRIQUE', current);" @shown="closeModal" close-title="Annuler" @cancel="closeModal"> 
        <form @submit.stop.prevent="submitRubrique">
          <b-form-input type="text" placeholder="Titre" v-model="current.titre"></b-form-input>
          <small class="text-muted">Titre</small>
          <br><br>
          <b-form-input textarea placeholder="Description" v-model="current.description"></b-form-input>
          <small class="text-muted">Description</small>
          <br><br>
          <b-form-input type="text" placeholder="idMedia" v-model="current.idMedia"></b-form-input>
          <small class="text-muted">idMedia</small>
        </form>
      </b-modal>
	  </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import 'vue-awesome/icons'
  import Icon from 'vue-awesome/components/Icon'
  import ClickConfirm from 'click-confirm'
  import {ServerTable, ClientTable, Event} from 'vue-tables-2';
  Vue.use(ClientTable, {}, false);


  const data = { 
    fields: ['titre', 'slug', 'description', 'idMedia', 'actions'],
    options: {
      perPage: 50,
      perPageValues: [5,10,50,100,150,200],
      texts:{
        count:'Afficher {from} - {to} sur {count} rubriques|{count} rubriques|rubrique',
        filter:'Filtrer par',
        filterPlaceholder:'',
        limit:'Résultats:',
        noResults:'Aucune rubriques trouvées',
        page:'Page:', // for dropdown pagination 
        filterBy: 'Filtrer par {column}', // Placeholder for search fields when filtering by column
        loading:'Chargement...', // First request to server
        defaultOption:'Tous {column}' // default option for list filters
      },
      filterByColumn:true,
      listColumns:{
        idRubriques: [
          {id:1, text:'1'},
          {id:2, text:'2'},
        ]
      }
    
    },
    currentPage: 1,
    perPage: 20,
    filter: null,
    editedRubrique: null
  }
  export default {
    data:function() {
      return data
    },
    computed: mapGetters({
      rubriques: 'allRubriques',
      current: 'current',
      modalTitle: 'modalTitle'
    }),
    methods: mapActions([
      'addRubrique',
      'editRubrique',
      'deleteRubrique',
      'submitRubrique',
      'closeModal'
    ]),
    created () {
      this.$store.dispatch('getAllRubriques')
    },
    components: {
      Icon,
      ClickConfirm,
      ClientTable
    }
  }

</script>
