# -*- coding: utf-8 -*-
{
    'name': 'Chatter Toggle',
    'version': '17.0.1.0.0',
    'category': 'Web',
    'summary': 'Add toggle functionality to show/hide chatter section',
    'description': """
    This module adds a toggle button to show/hide the chatter section in form views.
    Users can easily toggle the visibility of the chatter section to focus on the main content.
    """,
    'author': 'Sajjad',
    'website': 'https://sajjadjuel.github.io/',
    'depends': ['base', 'mail', 'web'],
    'data': [],
    'assets': {
        'web.assets_backend': [
            'chatter_toggle/static/src/components/chatter_toggle/chatter_toggle.esm.js',
            'chatter_toggle/static/src/components/chatter_toggle/chatter_toggle.xml',
            'chatter_toggle/static/src/components/chatter_toggle/chatter_toggle.scss',
        ],
    },
    'installable': True,
    'auto_install': False,
    'application': False,
    'license': 'LGPL-3',
} 