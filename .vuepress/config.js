const days = require('dayjs')
const navbar = require('./navbar.js');
const sidebar = require('./sidebar.js');
const footer = require('./footer');

module.exports = {
    title: '李东阳的笔记',
    description: '李东阳的知识分享和笔记记录平台',
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}],
    ],
    port: 1998,
    dest: 'dist',
    plugins: [
        ['vuepress-plugin-helper-live2d'],
        ['vuepress-plugin-zooming'],
        ['@xiaopanda/vuepress-plugin-code-copy'],
        ['@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    return days(timestamp).format('YYYY-MM-DD HH:mm')
                }
            }
        ]
    ],
    themeConfig: {
        logo: '/favicon.ico',
        repo: 'https://github.com/lidy5436',
        nav: navbar,
        sidebar: sidebar,
        footer:footer,
        sidebarDepth: 0,
        lastUpdated: '最后更新时间',

    }
}
