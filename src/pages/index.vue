<template>
  <div class="container">
    <h1 class="h5 page__title">Controle de usuários</h1>
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody v-if="!loading">
          <tr v-for="(item, index) in userListComputed" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>
              <router-link :to="`/user/edit/${item.id}`">Editar</router-link>
              |
              <a @click="deleteUser(item.id)">Deletar</a>
            </td>
          </tr>
          <tr v-if="userListComputed && !userListComputed.length">
            <td>Nenhum usuário cadastrado para editar</td>
            <td></td>
          </tr>
        </tbody>
        <tbody v-else class="placeholder">
          <tr v-for="index in 4" :key="index">
            <td>
              <content-loader
                class="table-loader"
                :image="false"
                :header="false"
                :text="true"
                :lines="1"
              />
            </td>
            <td>
              <content-loader
                class="table-loader"
                :image="false"
                :header="false"
                :text="true"
                :lines="1"
              />
            </td>
            <td>
              <content-loader
                class="table-loader"
                :image="false"
                :header="false"
                :text="true"
                :lines="1"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <Modal v-if="isModal" @close="isModal = false">
    <template #title> Deletar usuário </template>
    <template #text>
      Você tem certeza que deseja deletar o usuário
      <b>{{ userDeleted.email }}</b
      >?
    </template>
    <template #action>
      <button
        :class="[
          'button button--danger button--block button--sm',
          { 'button--loading': isLoadingDelete },
        ]"
        @click="deleteUserConfirm(userDeleted.id)"
      >
        Deletar
      </button>
      <button
        class="button button--alt button--block button--sm mt-2"
        @click="isModal = false"
      >
        Cancelar
      </button>
    </template>
  </Modal>
</template>

<route>
{
  name: "dasboard"
}
</route>

<script setup>
import { userStore } from '~/stores/user'
import { customHead } from '~/utils/head'

//head
customHead({
  title: 'Dasboard',
})

//injects
const $https = inject('$https')
const user = userStore()

// computed
const userInfo = computed(() => {
  return user.get
})

// data
const loading = ref(false)
const isLoadingDelete = ref(false)
const userList = ref([])
const isModal = ref(false)
const userDeleted = ref(null)

// computed
const userListComputed = computed(() => {
  return (
    userInfo.value &&
    userList.value.filter((item) => item.id !== userInfo.value.id)
  )
})

// methods
const getUserList = async () => {
  loading.value = true
  await $https.get(`/user`).then((res) => {
    userList.value = res.data
    loading.value = false
  })
}

const deleteUser = async (id) => {
  userDeleted.value = userList.value.filter((item) => item.id === id)[0]
  isModal.value = true
}

const deleteUserConfirm = async (id) => {
  isLoadingDelete.value = true
  await $https.delete(`/user/${id}`).then(() => {
    getUserList()
    isLoadingDelete.value = false
    isModal.value = false
  })
}

// mounted
onMounted(() => {
  getUserList()
})
</script>

<style lang="scss" scoped>
table {
  a {
    @apply text-blue-600 cursor-pointer;
    &:hover {
      @apply underline;
    }
  }
}
</style>
