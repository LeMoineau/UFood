module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
        extend: {
            boxShadow: {
                'center-md': '0px 0px 10px rgba(0, 0, 0, 0.25)',
                'right-md': '3px 0px 5px rgba(0, 0, 0, 0.25)',
            },
            minWidth: {
                '120px': '120px',
                '300px': '300px',
                '350px': '350px'
            },
            minHeight: {
                '120px': '120px',
            },
            maxHeight: {
                '1/2-screen': '50vh' 
            },
            height: {
                '1/2-screen': '50vh',
                'screen-header': 'calc(100vh - 63px)'
            },
            colors: {
                'light-grey': '#D9D9D9',
            },
            backgroundSize: {
                '25px': '25px',
                '20px': '20px'
            },
            zIndex: {
                '49': '49'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: []
}
