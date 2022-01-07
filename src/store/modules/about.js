
export const about= {
    state: () => ({ 
        team: {
            'Scripps Research': [
                {
                    'name': 'Chunlei Wu, PI',
                    'picture': 'https://www.gravatar.com/avatar/108605daee6b3c24d02db9753637a66b.png?s=128',
                    'social': {
                        'github': 'https://github.com/newgene',
                    },
                    
                },
                {
                    'name': 'Ginger Tsueng',
                    'picture': '',
                    'social': {
                        'github': 'https://github.com/marcodarko',
                    },
                    
                },
                {
                    'name': 'Marco A. Cano',
                    'picture': 'https://avatars.githubusercontent.com/u/23092057?v=4',
                    'social': {
                        'github': 'https://github.com/marcodarko',
                    },
                    
                },
                {
                    'name': 'Nichollette Acosta',
                    'picture': '/assets/img/default.jpeg',
                    'social': {
                        'github': 'https://github.com/newgene',
                    },
                    
                },
            ],
            'Sage': [
                {
                    'name': 'James Edy, PI',
                    'picture': '',
                    'social': {
                        'github': 'https://github.com/newgene',
                    },
                    
                },
                {
                    'name': 'Thomas Schaffter',
                    'picture': '',
                    'social': {
                        'github': 'https://github.com/marcodarko',
                    },
                    
                },
                {
                    'name': 'Jiaxin Zheng',
                    'picture': '',
                    'social': {
                        'github': 'https://github.com/newgene',
                    },
                    
                },
            ],
            'University of Iowa': [
                {
                    'name': 'Dave Eichmann, PI',
                    'picture': '',
                    'social': {
                        'github': 'https://github.com/newgene',
                    },
                    
                },
                {
                    'name': 'Elizabeth Zak',
                    'picture': '',
                    'social': {
                        'github': 'https://github.com/marcodarko',
                    },
                    
                },
                {
                    'name': 'Arman Mikaili',
                    'picture': '',
                    'social': {
                        'github': 'https://github.com/newgene',
                    },
                    
                },
                {
                    'name': 'Alexis Graves',
                    'picture': '',
                    'social': {
                        'github': 'https://github.com/newgene',
                    },
                    
                },
                {
                    'name': 'Will Cooper',
                    'picture': '',
                    'social': {
                        'github': 'https://github.com/newgene',
                    },
                    
                },
            ]
        }
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