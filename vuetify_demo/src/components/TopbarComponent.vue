
<template>
    <div>
      <v-app-bar fixed dense app class="nav-bar" color="blue lighten-3">
        <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
        <v-toolbar-title class="white--text">
          <router-link to="/dashBoard" style="text-decoration: none">
            <b class="black--text">RV INDUSTRIES</b>
          </router-link></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
  
        <v-menu offset-y>
          <template v-slot:activator="{ attrs, on }">
            <span style="cursor: pointer" v-bind="attrs" v-on="on">
              <v-chip link>
                <v-badge dot bottom color="red" offset-y="12" offset-x="10">
                  <v-avatar size="40">
                    <v-img src="../assets/profile1.jpeg" />
                  </v-avatar>
                </v-badge>
                <span class="ml-3">ADMIN</span>
              </v-chip>
            </span>
          </template>
          <v-list width="250" class="py-0">
            <v-list-item two-line>
              <v-list-item-avatar>
                <img src="../assets/profile1.jpeg" />
              </v-list-item-avatar>
  
              <v-list-item-content>
                <v-list-item-title>ADMIN</v-list-item-title>
                <v-list-item-subtitle>Logged In</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item link v-for="(menu, i) in menus" :key="i">
              <v-list-item-icon>
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ menu.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
  
      <v-main>
        <router-view></router-view>
      </v-main>
    </div>
  </template>
  
  <script>
  export default {
    name: "TopbarComponent",
    data() {
      return {
        drawer: false,
        fixed: false,
        miniVariant: false,
        showMenu: false,
        imageUrl: null,
        menus: [
          { title: "Profile", icon: "mdi-account" },
          { title: "Logout", icon: "mdi-logout" },
        ],
      };
    },
  };
  </script>
  