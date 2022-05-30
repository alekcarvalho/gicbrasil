<template>
  <div class="authentication__title">Cadastrar conta</div>
  <div class="authentication__text">Cadastre aqui sua nova conta</div>
  <form class="form" @submit.prevent="submitForm()">
    <div class="form__field">
      <div
        :class="[
          'form__input',
          { 'form__input-error': errors.name || errorSignup },
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
          { 'form__input-error': errors.phone || errorSignup },
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
          { 'form__input-error': errors.email || errorSignup },
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
          { 'form__input-error': errors.password || errorSignup },
        ]"
      >
        <input
          id="password"
          v-model="form.password"
          :type="inputType"
          placeholder="Senha"
          @keyup="validatePassword"
          @blur="validatePassword"
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
          { 'form__input-error': errors.confirmPassword || errorSignup },
        ]"
      >
        <input
          id="confirmPassword"
          v-model="form.confirmPassword"
          :type="inputType"
          placeholder="Confirmar Senha"
          @keyup="validateConfirmPassword"
          @blur="validateConfirmPassword"
        />
        <div class="form__icon icon--clickable" @click="changeInputType">
          <component :is="iconType" />
        </div>
      </div>
      <div v-if="errors.confirmPassword" class="form__error">
        {{ errors.confirmPassword }}
      </div>
      <div v-if="errorSignup" class="form__error">
        {{ errorSignup }}
      </div>
    </div>
    <button
      id="submit-button"
      :disabled="errors.form.length ? true : false"
      :class="[
        'form__submit button button--primary',
        { 'button--loading': isLoading },
      ]"
      type="submit"
    >
      Cadastrar
    </button>
    <router-link
      id="register-button"
      to="/login"
      class="form__submit button button--alt"
    >
      Login
    </router-link>
  </form>
</template>

<route>
{
  name: "signup",
  meta: {
    layout: "authentication"
  },
}
</route>

<script setup>
import { userStore } from '~/stores/user'
import { handlePhone } from '~/utils/common'
import useFormValidation from '~/utils/form/useFormValidation'
import IconEye from '~icons/eva/eye-outline'
import IconEyeOff from '~icons/eva/eye-off-outline'

//injects
const $http = inject('$http')
const router = useRouter()
const user = userStore()

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
const errorSignup = ref(null)
const isLoading = ref(false)

//call functions
const {
  validateEmptyField,
  validateNameField,
  validateEmailField,
  validatePasswordField,
  errors,
} = useFormValidation()

const validateName = () => {
  errorSignup.value = null
  validateNameField('name', form.name)
}
const validateEmail = () => {
  errorSignup.value = null
  validateEmailField('email', form.email)
}
const validatePhone = () => {
  errorSignup.value = null
  validateEmptyField('phone', form.phone)
}
const validatePassword = () => {
  errorSignup.value = null
  validatePasswordField('password', form.password)
}
const validateConfirmPassword = () => {
  errorSignup.value = null
  validatePasswordField('confirmPassword', form.confirmPassword)
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

const handleSignup = async () => {
  isLoading.value = true
  errorSignup.value = null
  await $http
    .post(`/user`, {
      name: form.name,
      email: form.email,
      password: form.password,
      phones: [
        {
          ddd: handlePhone(form.phone).ddd,
          number: handlePhone(form.phone).tel,
        },
      ],
    })
    .then((res) => {
      user.add(res.data)
      router.push('/')
      isLoading.value = false
    })
    .catch((err) => {
      isLoading.value = false
      errorLogin.value = err.response.data.mensagem
    })
}
const submitForm = () => {
  validateName()
  validatePhone()
  validateEmail()
  validatePassword()
  validateConfirmPassword()
  if (!errors.form.length) {
    handleSignup()
  }
}
</script>

<style lang="scss" scoped></style>
