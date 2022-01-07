
export const about= {
    state: () => ({ 
        team: [
            {
                'name': 'Marco A. Cano',
                'picture': 'https://avatars.githubusercontent.com/u/23092057?v=4',
                'social': {
                    'github': 'https://github.com/marcodarko',
                },
                'institution': 'Scripps Research'
            },
            {
                'name': 'Chunlei Wu',
                'picture': 'https://www.gravatar.com/avatar/108605daee6b3c24d02db9753637a66b.png?s=128',
                'social': {
                    'github': 'https://github.com/newgene',
                },
                'institution': 'Scripps Research'
            },
        ]
    }),
    mutations: {
        
    },
    actions: {

    },
    getters: {
        team: (state) => {
            return state.team;
        }
    }
}