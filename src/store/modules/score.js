export default {
    actions: {
        getScore(ctx) {
            let userScore = localStorage.getItem('userscore');
            let pcScore = localStorage.getItem('pcscore');
            if (!userScore) {
                userScore = 0
            }
            if (!pcScore) {
                pcScore = 0
            }
            ctx.commit('updateUserScore', userScore);
            ctx.commit('updatePcScore', pcScore)
        }
    },
    mutations: {
        updateUserScore(state, count) {
            count = parseInt(count)
            state.userScore = count
        },
        updatePcScore(state, count) {
            count = parseInt(count)
            state.pcScore = count
        },
        incrementScore(state,model) {
            if (model == 'user') {
                state.userScore++
                localStorage.setItem('userscore', state.userScore)
            } else {
                state.pcScore++
                localStorage.setItem('pcscore', state.pcScore)
            }
        },
        refresh(state) {
            state.userScore = 0;
            state.pcScore =0;
            localStorage.setItem('userscore', 0);
            localStorage.setItem('pcScore', 0);
        }
    },
    state: {
        userScore: 0,
        pcScore: 0,
    },
    getters: {
        showUserScore (state) {
            return state.userScore
        },
        showPcScore (state) {
            return state.pcScore
        }
    }
}