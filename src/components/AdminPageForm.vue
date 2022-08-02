<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="users"
    :search="search"
    :single-select="singleSelect"
    item-key="name"
    show-select
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <!-- <v-toolbar-title>Users</v-toolbar-title> -->
        <!-- <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer> -->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-icon
              color="primary"
              dark
              class="mr-2 icon"
              v-bind="attrs"
              v-on="on"
            >
              mdi-account-plus
            </v-icon>
            <v-icon
              color="primary"
              dark
              class="mr-2 icon"
              @click="deleteSelectedItems"
            >
              mdi-delete
            </v-icon>
            <v-icon color="primary" dark class="mr-2" @click="refresh">
              {{ icons.mdiRefresh }}
            </v-icon>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="username"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.password"
                      label="password"
                    ></v-text-field>
                  </v-col>

                  <!-- <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.user_id"
                      label="user_id"
                    ></v-text-field>
                  </v-col> -->
                  <!-- <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="name"
                    ></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.surname"
                      label="surname"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.address"
                      label="address"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.phoneNumber"
                      label="phone number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.email"
                      label="email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.dob"
                      label="dob"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.gender"
                      label="gender"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.history"
                      label="history"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.details"
                      label="details"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.postcode"
                      label="postcode"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                <span>Cancel</span>
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                <span class="text">{{ conButton }}</span>
              </v-btn>
              <!-- <v-btn v-if='0' color="blue darken-1" text @click="save">
                Update
              </v-btn> -->
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete this user?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                OK
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mdiAccount, mdiRefresh, mdiDelete } from "@mdi/js";
import UserService from "../service/api/userService";

export default {
  data: () => ({
    icons: {
      mdiAccount,
      mdiRefresh,
      mdiDelete
    },
    dialog: false,
    dialogDelete: false,
    search: "",
    selected: [],
    headers: [
      {
        text: "user",
        align: "start",
        sortable: false,
        value: "fullname"
        //{{ userProfile.name }}&nbsp;{{ userProfile.surname }}
      },
      { text: "Date of created", value: "created_at" },
      { text: "Date of modified", value: "updated_at" },
      // { text: "Carbs (g)", value: "carbs" },
      // { text: "Protein (g)", value: "protein" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      role: "ROLE_USER",
      password: "",
      surname: "",
      address: "",
      phoneNumber: "",
      email: "",
      dob: "",
      gender: "",
      history: "",
      details: "",
      postcode: "",
      createdDate: "",
      updatedDate: ""
    },
    defaultItem: {
      name: "",
      password: "",
      surname: "",
      address: "",
      phoneNumber: "",
      email: "",
      dob: "",
      gender: "",
      history: "",
      details: "",
      postcode: "",
      role: "ROLE_USER",
      createdDate: "",
      updatedDate: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Create User" : "Edit User";
    },
    conButton() {
      return this.editedIndex === -1 ? "Save" : "Update";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  mounted() {
    UserService.getAll()
      .then(
        res =>
          (this.users =
            res.map(item => ({
              ...item,
              fullname: item.name + " " + item.surname
            })) || [])
      )
      .catch(err => console.log(err));
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.users = [
        {
          name: "",
          fullname: "",
          password: "",
          surname: "",
          address: "",
          phoneNumber: "",
          email: "",
          dob: "",
          gender: "",
          history: "",
          details: "",
          postcode: "",
          createdDate: "",
          updatedDate: ""
        }
      ];
    },

    refresh() {
      UserService.getAll()
        .then(
          res =>
            (this.users =
              res.map(item => ({
                ...item,
                fullname: item.name + " " + item.surname
              })) || [])
        )
        .catch(err => console.log(err));
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      const tmp = item;
      tmp.dob = item["date_of_birth"];
      tmp.phoneNumber = item["phone_number"];
      this.editedItem = Object.assign({}, tmp);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const user = this.users[this.editedIndex];
      UserService.delete(user.id).then(() => {
        this.users.splice(this.editedIndex, 1);
        this.closeDelete();
      });
    },

    deleteSelectedItems() {
      console.log(this.selected);
      const ids = this.selected.map(item => item.id);
      UserService.deleteSelected(ids).then(res => {
        const tmp = this.users.filter(item => !ids.includes(item.id));
        this.users = tmp;
      });
      // this.editedIndex = this.users.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      // this.dialogDelete = true;
    },

    deleteSelectedItemsConfirm() {
      // const user = this.users[this.editedIndex]
      // UserService.deleteSelected(user.id)
      // .then((res) => {
      //   this.users.splice(this.editedIndex, 1);
      //   this.closeDelete();
      // })
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex === -1) {
        UserService.create({
          address: this.editedItem.address,
          details: this.editedItem.details,
          // eslint-disable-next-line @typescript-eslint/camelcase
          date_of_birth: this.editedItem.dob,
          email: this.editedItem.email,
          name: this.editedItem.name,
          fullname: this.editedItem.name + " " + this.editedItem.surname,
          history: this.editedItem.history,
          password: this.editedItem.password,
          role: this.editedItem.role,
          // eslint-disable-next-line @typescript-eslint/camelcase
          phone_number: this.editedItem.phoneNumber,
          postcode: this.editedItem.postcode,
          gender: this.editedItem.gender,
          surname: this.editedItem.surname,
          // eslint-disable-next-line @typescript-eslint/camelcase
          created_date: this.created_date,
          // eslint-disable-next-line @typescript-eslint/camelcase
          modified_date: this.updated_date
        }).then(() => {
          this.close();
        });
      } else {
        const user = this.users[this.editedIndex];
        const id = user.id;
        UserService.update(id, {
          address: this.editedItem.address,
          details: this.editedItem.details,
          // eslint-disable-next-line @typescript-eslint/camelcase
          date_of_birth: this.editedItem.dob,
          email: this.editedItem.email,
          name: this.editedItem.name,
          fullname: this.editedItem.name + " " + this.editedItem.surname,
          history: this.editedItem.history,
          password: this.editedItem.password,
          role: this.editedItem.role,
          // eslint-disable-next-line @typescript-eslint/camelcase
          phone_number: this.editedItem.phoneNumber,
          postcode: this.editedItem.postcode,
          gender: this.editedItem.gender,
          surname: this.editedItem.surname,
          // eslint-disable-next-line @typescript-eslint/camelcase
          created_date: this.created_date,
          // eslint-disable-next-line @typescript-eslint/camelcase
          modified_date: this.updated_date
        }).then(() => {
          this.close();
        });
      }
    }
  }
};
</script>
<style lang="scss">
// .login-form {
//   .v-card__title {
//     color: #115293;
//   }
//   .title {
//     margin-left: 4px;
//     font-family: termina, sans-serif;
//     font-weight: 700;
//     font-style: normal;
//   }
// }
tr > th.text-center {
  color: #115293 !important;
  background-color: lightgray;
  border: 1px solid white;
  opacity: 0.8;
}

.container {
  max-width: 100% !important;
}
.elevation-1 {
  width: 100% !important;
}
.icon {
  margin-left: 20px;
}
</style>
