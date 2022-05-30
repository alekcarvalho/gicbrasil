<template>
  <div class="authentication__title">Acessar sua conta</div>
  <div class="authentication__text">
    Você pode acessar sua conta da GIC Brasil ou criar uma nova
  </div>
  <form class="form" @submit.prevent="submitForm()">
    <div class="form__field">
      <div
        :class="[
          'form__input',
          { 'form__input-error': errors.email || errorLogin },
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
          { 'form__input-error': errors.password || errorLogin },
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
      <div v-if="errorLogin" class="form__error">
        {{ errorLogin }}
      </div>
    </div>
    <div class="form__link">
      <router-link id="forget-password-link" to="/"
        >Esqueceu sua senha?</router-link
      >
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
      Entrar
    </button>
    <router-link
      id="register-button"
      to="/signup"
      class="form__submit button button--alt"
    >
      Cadastrar-se
    </router-link>
  </form>
</template>

<route>
{
  name: "login",
  meta: {
    layout: "authentication"
  },
}
</route>

<script setup>
import { userStore } from '~/stores/user'
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
  email: '',
  password: '',
})
const errorLogin = ref(null)
const isLoading = ref(false)

//call functions
const { validateEmailField, validatePasswordField, errors } =
  useFormValidation()

const validateEmail = () => {
  errorLogin.value = null
  validateEmailField('email', form.email)
}
const validatePassword = () => {
  errorLogin.value = null
  validatePasswordField('password', form.password)
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

const handleLogin = async () => {
  isLoading.value = true
  errorLogin.value = null
  await $http
    .post(`/login`, form)
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
  validateEmail()
  validatePassword()
  if (!errors.form.length) {
    handleLogin()
  }
}
</script>

<style lang="scss" scoped></style>
