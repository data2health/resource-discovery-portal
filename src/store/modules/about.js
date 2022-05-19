
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
                        'github': 'https://github.com/gtsueng',
                    },
                    
                },
                {
                    'name': 'Marco A. Cano',
                    'picture': '/assets/img/team/marco.jpeg',
                    'social': {
                        'linkedin': 'https://www.linkedin.com/in/marco-alvarado-cano/',
                        'github': 'https://github.com/marcodarko',
                    },
                    
                },
                {
                    'name': 'Nichollette Acosta',
                    'picture': '/assets/img/team/nicholette.jpeg',
                    'social': {
                        'linkedin': 'https://www.linkedin.com/in/nichollette-acosta/',
                        'github': 'https://github.com/nikkibytes',
                    },
                    
                },
            ],
            'Sage': [
                {
                    'name': 'James Edy, PI',
                    'picture': '/assets/img/team/james.jpeg',
                    'social': {
                        'twitter': 'https://twitter.com/jamesaeddy',
                        'github': 'https://github.com/jaeddy',
                    },
                    
                },
                {
                    'name': 'Thomas Schaffter',
                    'picture': '/assets/img/team/thomas.jpeg',
                    'social': {
                        'linkedin': 'https://www.linkedin.com/in/tschaffter/',
                        'github': 'https://github.com/tschaffrer',
                    },
                    
                },
                {
                    'name': 'Jiaxin Zheng',
                    'picture': '/assets/img/team/jiaxin.jpeg',
                    'social': {
                        'linkedin': 'https://www.linkedin.com/in/jiaxin-zheng-18922a54/',
                        // 'github': 'https://github.com/',
                    },
                    
                },
            ],
            'University of Iowa': [
                {
                    'name': 'Dave Eichmann, PI',
                    'picture': '/assets/img/team/dave.jpeg',
                    'social': {
                        'github': 'https://github.com/eichmann',
                        'linkedin': 'https://www.linkedin.com/in/davideichmann/'
                    },
                    
                },
                {
                    'name': 'Elizabeth Zak',
                    'picture': '/assets/img/team/elizabeth.jpeg',
                    'social': {
                        'github': 'https://github.com/ezak101',
                        'linkedin': 'https://www.linkedin.com/in/elizabeth-zak-m-s-486a30ab/'
                    },
                    
                },
                {
                    'name': 'Arman Mikaili',
                    'picture': '/assets/img/team/arman.jpeg',
                    'social': {
                        // 'github': 'https://github.com/',
                    },
                    
                },
                {
                    'name': 'Alexis Graves',
                    'picture': '/assets/img/team/alexis.png',
                    'social': {
                        'github': 'https://github.com/alexisgraves',
                        'linkedin': 'http://www.linkedin.com/in/alexis-graves'
                    },
                    
                },
                {
                    'name': 'Will Cooper',
                    'picture': '/assets/img/team/will.jpeg',
                    'social': {
                        // 'github': 'https://github.com/',
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