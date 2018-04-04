routes = [
    {
        path: '/',
        name: 'home',
        url: 'index.html'
    },
    {
        path: '/about/',
        url: './pages/about.html'
    },
    {
        path: '/tips/',
        url: './pages/tips.html'
    },
    {
        path: '/test/',
        url: './pages/blog.html'
    },
    {
        path: '/some-page/',
        componentUrl: './some-page.html'
    },
    {
        path: '/lessons/',
        name: 'lessons',
        url: './pages/lessons/lessons.html',
        routes: [
            {
                path: 'musical_alphabet/',
                name: 'musical_alphabet',
                url: './pages/lessons/musical_alphabet.html'
            }, {
                path: 'first_frets/',
                name: 'first_frets',
                url: './pages/lessons/first_frets.html'
            }

        ]
    },
    {
        path: '/page-loader-component/',
        componentUrl: './pages/page-loader-component.html'
    },
    {
        path: '/options/',
        name: 'options',
        templateUrl: './pages/options.html',
        options: {
            animate: true,
            context: userTrainerOptions
        }
    },
    {
        path: '(.*)',
        url: './pages/404.html'
    }
]