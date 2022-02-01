
export const about= {
    state: () => ({ 
        team: {
            'Scripps Research': [
                {
                    'name': 'Chunlei Wu, PI',
                    'picture': '/assets/img/team/chunlei.jpeg',
                    'social': {
                        'linkedin': 'https://www.linkedin.com/in/chunleiwu',
                        'github': 'https://github.com/newgene',
                    },
                    
                },
                {
                    'name': 'Ginger Tsueng',
                    'picture': '/assets/img/team/ginger.jpeg',
                    'social': {
                        'linkedin': 'https://www.linkedin.com/in/ginger-tsueng-36884348',
                        'github': 'https://github.com/marcodarko',
                    },
                    
                },
                {
                    'name': 'Marco A. Cano',
                    'picture': '/assets/img/team/marco.jpeg',
                    'social': {
                        'linkedin': 'https://www.linkedin.com/in/',
                        'github': 'https://github.com/marcodarko',
                    },
                    
                },
                {
                    'name': 'Nichollette Acosta',
                    'picture': '/assets/img/team/nicholette.jpeg',
                    'social': {
                        'linkedin': 'https://www.linkedin.com/in/nichollette-acosta/',
                        'github': 'https://github.com/newgene',
                    },
                    
                },
            ],
            'Sage': [
                {
                    'name': 'James Edy, PI',
                    'picture': '/assets/img/team/james.jpeg',
                    'social': {
                        'linkedin': 'https://www.linkedin.com/in/jamesaeddy/',
                        'github': 'https://github.com/newgene',
                    },
                    
                },
                {
                    'name': 'Thomas Schaffter',
                    'picture': '/assets/img/team/thomas.jpeg',
                    'social': {
                        'linkedin': 'https://www.linkedin.com/in/tschaffter/',
                        'github': 'https://github.com/marcodarko',
                    },
                    
                },
                {
                    'name': 'Jiaxin Zheng',
                    'picture': '/assets/img/team/jiaxin.jpeg',
                    'social': {
                        'linkedin': 'https://www.linkedin.com/in/jiaxin-zheng-18922a54/',
                        'github': 'https://github.com/newgene',
                    },
                    
                },
            ],
            'University of Iowa': [
                {
                    'name': 'Dave Eichmann, PI',
                    'picture': '/assets/img/team/dave.jpeg',
                    'social': {
                        'github': 'https://github.com/newgene',
                        'linkedin': 'https://www.linkedin.com/in/davideichmann/'
                    },
                    
                },
                {
                    'name': 'Elizabeth Zak',
                    'picture': '/assets/img/team/elizabeth.jpeg',
                    'social': {
                        'github': 'https://github.com/marcodarko',
                        'linkedin': 'https://www.linkedin.com/in/elizabeth-zak-m-s-486a30ab/'
                    },
                    
                },
                {
                    'name': 'Arman Mikaili',
                    'picture': '/assets/img/team/arman.jpeg',
                    'social': {
                        'github': 'https://github.com/newgene',
                    },
                    
                },
                {
                    'name': 'Alexis Graves',
                    'picture': '/assets/img/team/alexis.png',
                    'social': {
                        'github': 'https://github.com/newgene',
                        'website': 'https://myweb.uiowa.edu/grves/'
                    },
                    
                },
                {
                    'name': 'Will Cooper',
                    'picture': '/assets/img/team/will.jpeg',
                    'social': {
                        'github': 'https://github.com/newgene',
                        'linkedin': 'https://www.linkedin.com/in/william-cooper-8b55861b9/'
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