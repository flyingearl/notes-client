<template>
    <p>login</p>
</template>

<script>
    import { mapActions } from 'vuex'
    import localforage from 'localforage'
    import { isEmpty } from 'lodash'

    export default {
        data () {
            return {
                email: null,
                password: null,
                errors: []
            }
        },
        methods: {
            ...mapActions({
                login: 'auth/login'
            }),
            submit () {
                this.login({
                    payload: {
                        email: this.email,
                        password: this.password
                    },
                    context: this
                }).then(() => {
                    localforage.getItem('intended').then((name) => {
                        if (isEmpty(name)) {
                            this.$router.replace({ name: 'home' })
                            return
                        }

                        this.$router.replace({ name: name })
                    })
                })
            }
        }
    }
</script>