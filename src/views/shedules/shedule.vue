
<template>
    <div id="home">
        <div class="user-info">
            <h2>Olá, {{token}} </h2>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'shedule',
    computed: {
        ...mapState('auth', ['token']),
    }
}
</script>