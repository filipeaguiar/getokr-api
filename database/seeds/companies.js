'use strict';

const
    _ = require('lodash'),
    Company = require('../../src/models/companyModel').Company

module.exports = () => (

    [
        new Company({
            fantasyName: 'SGPTI',
            plan: {
                name: 'Business'
            },
            phone: '',
            isActive: true
        }),
        new Company({
            fantasyName: 'Superintendencia',
            plan: {
                name: 'Business'
            },
            phone: '',
            isActive: true
        })
    ]

)
