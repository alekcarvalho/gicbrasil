<template>
  <div class="container">
    <h1 class="h5 page__title">Editar usuário</h1>
    <form class="form" @submit.prevent="submitForm()">
      <div class="form__field">
        <div
          :class="[
            'form__input',
            { 'form__input-error': errors.name || errorEdit },
          ]"
        >
          <input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="Nome"
            @keyup="validateName"
            @blur="validateName"
          />
        </div>
        <div v-if="errors.name" class="form__error">
          {{ errors.name }}
        </div>
      </div>
      <div class="form__field">
        <div
          :class="[
            'form__input',
            { 'form__input-error': errors.phone || errorEdit },
          ]"
        >
          <input
            id="phone"
            v-model="form.phone"
            v-maska="'(##) #####-####'"
            type="tel"
            placeholder="Telefone"
            @keyup="validatePhone"
            @blur="validatePhone"
          />
        </div>
        <div v-if="errors.phone" class="form__error">
          {{ errors.phone }}
        </div>
      </div>
      <div class="form__field">
        <div
          :class="[
            'form__input',
            { 'form__input-error': errors.email || errorEdit },
          ]"
        >
          <input
            id="email"
            v-model="form.email"
            type="username"
            placeholder="E-mail"
            @keyup="validateEmail"
            @blur="validateEmail"
          />
        </div>
        <div v-if="errors.email" class="form__error">
          {{ errors.email }}
        </div>
      </div>
      <div class="form__field">
        <div
          :class="[
            'form__input',
            { 'form__input-error': errors.password || errorEdit },
          ]"
        >
          <input
            id="password"
            v-model="form.password"
            :type="inputType"
            placeholder="Senha"
            @keyup="validatePassword"
          />
          <div class="form__icon icon--clickable" @click="changeInputType">
            <component :is="iconType" />
          </div>
        </div>
        <div v-if="errors.password" class="form__error">
          {{ errors.password }}
        </div>
      </div>
      <div class="form__field">
        <div
          :class="[
            'form__input',
            { 'form__input-error': errors.confirmPassword || errorEdit },
          ]"
        >
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            :type="inputType"
            placeholder="Confirmar Senha"
            @keyup="validateConfirmPassword"
          />
          <div class="form__icon icon--clickable" @click="changeInputType">
            <component :is="iconType" />
          </div>
        </div>
        <div v-if="errors.confirmPassword" class="form__error">
          {{ errors.confirmPassword }}
        </div>
        <div v-if="errorEdit" class="form__error">
          {{ errorEdit }}
        </div>
      </div>
      <div class="form__action">
        <button
          id="submit-button"
          :disabled="errors.form.length ? true : false"
          :class="[
            'form__submit button button--primary',
            { 'button--loading': isLoading },
          ]"
          type="submit"
        >
          Editar
        </button>
        <router-link
          id="back-button"
          to="/"
          class="form__submit button button--alt"
        >
          Voltar
        </router-link>
      </div>
    </form>
    <Alert v-if="dataAlert" :data="dataAlert" />
  </div>
</template>

<route>
{
  name: "editUser"
}
</route>

<script setup>
import { handlePhone } from '~/utils/common'
import useFormValidation from '~/utils/form/useFormValidation'
import IconEye from '~icons/eva/eye-outline'
import IconEyeOff from '~icons/eva/eye-off-outline'

//injects
const $https = inject('$https')
const route = useRoute()

//data
const inputType = ref('password')
const iconType = shallowRef(IconEyeOff)
const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
})
const errorEdit = ref(null)
const isLoading = ref(false)
const dataAlert = ref(null)

//call functions
const { validateNameField, validateEmailField, validatePasswordField, errors } =
  useFormValidation()

const validateName = () => {
  errorEdit.value = null
  validateNameField('name', form.name)
}
const validateEmail = () => {
  errorEdit.value = null
  validateEmailField('email', form.email)
}
const validatePhone = () => {
  errorEdit.value = null
}
const validatePassword = () => {
  errorEdit.value = null
  validatePasswordField('password', form.password)
}
const validateConfirmPassword = () => {
  errorEdit.value = null
  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'As senhas não conferem'
  } else {
    errors.confirmPassword = null
  }
}

//methods
const changeInputType = () => {
  if (inputType.value === 'password') {
    inputType.value = 'text'
    iconType.value = IconEye
  } else {
    inputType.value = 'password'
    iconType.value = IconEyeOff
  }
}

const getUserEdit = async () => {
  await $https.get(`/user/${route.params.id}`).then((res) => {
    form.name = res.data.name
    form.email = res.data.email
    form.phone = `(${res.data.phones[0].ddd}) ${res.data.phones[0].number}`
  })
}

const handleEdit = async () => {
  isLoading.value = true
  errorEdit.value = null
  await $https
    .put(`/user/${route.params.id}`, {
      id: route.params.id,
      name: form.name,
      email: form.email,
      password: form.password ? form.password : null,
      phones: [
        {
          ddd: handlePhone(form.phone).ddd,
          number: handlePhone(form.phone).tel,
        },
      ],
    })
    .then(() => {
      isLoading.value = false
      dataAlert.value = {
        type: 'success',
        message: 'Usuário editado com sucesso',
      }
    })
    .catch(() => {
      isLoading.value = false
      dataAlert.value = {
        type: 'error',
        message:
          'Não foi possível editar o usuário. Tente novamente mais tarde',
      }
    })
  setTimeout(() => {
    dataAlert.value = null
  }, 4000)
}
const submitForm = () => {
  validateName()
  validatePhone()
  validateEmail()
  validateConfirmPassword()
  if (!errors.form.length && !errors.confirmPassword) {
    handleEdit()
  }
}

// mounted
onMounted(() => {
  getUserEdit()
})
</script>

<style lang="scss" scoped>
.form {
  @apply max-w-160;
  &__action {
    @apply flex flex-col md:flex-row;
    button {
      @apply mr-0 md:mr-4;
    }
  }
}
</style>
