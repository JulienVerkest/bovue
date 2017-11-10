<template>
  <div>
    <b-navbar toggleable type="inverse" variant="success">

      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-link class="navbar-brand" to="/dashboard">
        <span >Le BO de Paris.fr v2</span>
      </b-link>

      <b-collapse is-nav id="nav_collapse">
        
        <b-nav is-nav-bar>
          <b-nav-item to="/homemodule">Home & sous-home</b-nav-item>
        </b-nav>
        
        <b-nav is-nav-bar class="ml-auto">

          <b-nav-item-dropdown text="Rédaction" right-alignment>
            <b-dropdown-item to="#">actualité</b-dropdown-item>
            <b-dropdown-item to="#">document</b-dropdown-item>
            <b-dropdown-item to="#">fiche élu</b-dropdown-item>
            <b-dropdown-item to="#">FAQ</b-dropdown-item>
            <b-dropdown-item to="#">page statique</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Gestion" right-alignment>
            <b-dropdown-item to="/rubriques">Rubriques</b-dropdown-item>
            <b-dropdown-item to="/rubriques-vue-tables-2">Rubriques vue-tables-2</b-dropdown-item>
            <b-dropdown-item to="#">RU</b-dropdown-item>
            <b-dropdown-item to="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
          
          <b-nav-item-dropdown right-alignment>
            
            <!-- Using text slot -->
            <template slot="text">
              <span style="font-weight: bold;">User</span>
            </template>
            
            <b-dropdown-item to="#">Profile</b-dropdown-item>
            <b-dropdown-item to="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
         
        </b-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>