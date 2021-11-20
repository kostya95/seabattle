export default {
    actions: {
        getName(ctx) {
            let name = localStorage.getItem('username');
            if (name!=undefined) {
                name.trim();
            }
            if (name) {
                ctx.commit('updateName', name)
            }
        },
        setName(ctx, name) {
            localStorage.setItem('username',name)
            ctx.commit('updateName',name)
        }
    },
    mutations: {
        updateName (state,name) {
            state.name = name
        }
    },
    state: {
        name: '',
    },
    getters: {
        myName(state) {
            return state.name
        }
    }
}