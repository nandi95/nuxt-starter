import { defineNuxtConfig } from 'nuxt/config';
import environment from './nuxt/utils/environment';
import pkg from './package.json' assert {type: 'json'};
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { execSync, exec } from 'child_process';

let gitInstalled = false;
exec('git --version', (error, stdout, stderr) => {
    if (error ?? stderr) {
        return;
    }

    gitInstalled = true;
});

export default defineNuxtConfig({
    srcDir: 'nuxt/',

    compatibilityDate: '2024-07-23',

    devtools: {
        enabled: environment('development'),

        timeline: {
            enabled: true
        }
    },

    runtimeConfig: {
        public: {
            // used by sitemap and schema.org
            siteUrl: process.env.FRONTEND_URL,

            // used by $fetch
            apiBase: process.env.APP_URL,

            version: {
                deployedAt: process.env.APP_DEPLOYED_AT,
                commit: process.env.APP_COMMIT_SHA
            },

            stripe: {
                key: process.env.STRIPE_KEY
            },

            recaptcha: {
                v3SiteKey: process.env.RECAPTCHA_SITE_KEY
            },

            sentry: {
                dsn: process.env.NUXT_PUBLIC_SENTRY_DSN,
                tracesSampleRate: parseFloat(process.env.NUXT_SENTRY_TRACES_SAMPLE_RATE ?? '0.1'),
                enabled: process.env.NUXT_NO_SENTRY ? !Boolean(process.env.NUXT_NO_SENTRY) : environment('production'),
                environment: process.env.NUXT_SENTRY_ENVIRONMENT ?? environment()
            }
        }
    },

    app: {
        head: {
            title: 'Lash Brill',
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            link: [
                // https://realfavicongenerator.net
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
                { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#8d6558' },
                { rel: 'shortcut icon', href: '/favicon.ico' },
                { rel: 'manifest', href: '/site.webmanifest' }
            ],
            noscript: [
                { innerHTML: 'This website requires JavaScript.' }
            ],
            script: [
                {
                    defer: true,
                    src: 'https://analytics.kraszlan.dev/savoury.js',
                    tagPosition: 'head',
                    /* eslint-disable @typescript-eslint/naming-convention */
                    'data-website-id': 'ac2e6e4c-8982-4dc0-bf6f-72ca04ea4720',
                    'data-domains': 'lashbrill.co.uk'
                    /* eslint-enable @typescript-eslint/naming-convention */
                }
            ]
        },
        pageTransition: {
            name: 'fade',
            mode: 'out-in'
        }
    },

    icon: {
        provider: 'server',
        clientBundle: { scan: true, includeCustomCollections: true },
        customCollections: [
            {
                prefix: 'local',
                dir: './src/assets/icon'
            }
        ]
    },

    imports: {
        dirs: ['utils'],
        presets: [
            {
                from: 'vue-toastify',
                imports: ['useToast']
            }
        ]
    },

    css: [
        '@/assets/css/main.css',
        'vue-toastify/index.css',
        'vue-toastify/themes/light.css'
    ],

    routeRules: {
        /* eslint-disable @typescript-eslint/naming-convention */
        '/**': {
            headers: {
                // sentry requirement from browser profiling
                'Document-Policy': 'js-profiling'
            }
        },
        '/': { prerender: true },
        '/about': { prerender: true },
        '/contact': { prerender: true },
        /* eslint-enable @typescript-eslint/naming-convention */
    },

    modules: [
        '@nuxt/image',
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@morev/vue-transitions/nuxt',
        // 'nuxt-security',
        'nuxt-headlessui',
        '@nuxt/fonts',
        '@vueuse/nuxt',
        'vue-recaptcha/nuxt',
        '@nuxtjs/sitemap',
        'nuxt-schema-org',
        '@nuxtjs/robots',
        'vue3-carousel-nuxt',
        '@nuxt/icon',
        '@nuxt/scripts'
    ],

    robots: {
        // provide simple disallow rules for all robots `user-agent: *`
        disallow: ['/auth', '/admin'],
        allow: ['/auth/login', '/auth/register'],
        blockNonSeoBots: true,
        credits: false,
        mergeWithRobotsTxtPath: false
    },

    site: {
        url: process.env.FRONTEND_URL,
        name: 'Lashbrill UK',
        currency: 'GBP'
    },

    image: {
        domains: [
            process.env.APP_URL || 'http://127.0.0.1:8000'
        ],
        alias: {
            api: process.env.APP_URL || 'http://127.0.0.1:8000'
        },
        dir: 'assets/images'
    },

    recaptcha: {
        installPlugin: environment('production')
    },

    sitemap: {
        exclude: [
            '/admin/**',
            '/auth/verify',
            '/auth/forgot',
            '/auth/deletion-status',
            'auth/reset/**',
            'settings/**',
            '/unsubscribe'
        ],
        credits: false,
        sitemaps: {
            courses: {
                sources: [
                    process.env.APP_URL + '/sitemap/courses'
                ]
            },
            blog: {
                sources: [
                    process.env.APP_URL + '/sitemap/posts'
                ]
            }
        }
    },

    fonts: {
        provider: 'bunny',
        families: [
            { name: 'Poppins', weights: [400, 600, 700], display: 'swap' },
            { name: 'Great Vibes', display: 'swap' }
        ],
        defaults: {
            subsets: ['latin']
        }
    },

    sourcemap: {
        server: true,
        client: true
    },

    // security: {
    //     headers: {
    //         crossOriginEmbedderPolicy: 'require-corp',
    //         crossOriginOpenerPolicy: 'same-origin-allow-popups',
    //         contentSecurityPolicy: {
    //             // eslint-disable-next-line @typescript-eslint/naming-convention
    //             'img-src': ['\'self\'', 'data:', 'https://lashbrill.b-cdn.net', 'https://lashbrill.s3.eu-central-003.backblazeb2.com'],
    //             // eslint-disable-next-line @typescript-eslint/naming-convention
    //             'script-src': [
    //                 "'self'",
    //                 'https:',
    //                 "'unsafe-inline'",
    //                 "'strict-dynamic'",
    //                 "'nonce-{{nonce}}'",
    //                 "'unsafe-eval'"
    //             ]
    //         }
    //     }
    // },

    experimental: {
        typedPages: true,
        payloadExtraction: true,
        renderJsonPayloads: true,
        inlineRouteRules: true,
        buildCache: true
        // todo - enable
        // writeEarlyHints: true
    },

    nitro: {
        compressPublicAssets: {
            brotli: true,
            gzip: true
        }
    },

    vue: {
        compilerOptions: {
            isCustomElement: (tag) => ['mux-player'].includes(tag)
        }
    },

    vite: {
        build: {
            sourcemap: true,
            // rollupOptions: {
            //     output: {
            //         // enable when you want to see the names of the chunks
            //         chunkFileNames: '_nuxt/[name]-[hash].js',
            //         assetFileNames: '_nuxt/[name]-[hash][extname]',
            //         entryFileNames: '_nuxt/[name]-[hash].js'
            //     }
            // }
        },
        plugins: [
            sentryVitePlugin({
                authToken: process.env.SENTRY_AUTH_TOKEN,
                org: 'nandor-kraszlan',
                project: 'lashbrill-web',
                telemetry: false,
                disable: !(process.env.NUXT_NO_SENTRY
                    ? !Boolean(process.env.NUXT_NO_SENTRY)
                    : environment('production')),
                release: {
                    setCommits: {
                        auto: true,
                        ignoreMissing: true
                    },
                    dist: pkg.version,
                    deploy: {
                        env: process.env.SENTRY_ENV ??
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                            (gitInstalled && execSync('git rev-parse --abbrev-ref HEAD').toString().trim() === 'main'
                                ? 'production'
                                : environment()),
                        name: gitInstalled
                            ? execSync('git log -1 --pretty=format:"%s"', { encoding: 'utf-8' }).toString().trim()
                            : 'N/A'
                    }
                },
                sourcemaps: {
                    assets: ['./.nuxt/dist/**/**'],
                    filesToDeleteAfterUpload: [
                        '.output/**/*.map'
                    ]
                },
                // eslint-disable-next-line @typescript-eslint/naming-convention
                _experiments: {
                    injectBuildInformation: true
                }
            })
        ]
    }
});
