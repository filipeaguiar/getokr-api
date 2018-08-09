'use strict';

const
  _ = require('lodash'),
  bcrypt = require('bcryptjs'),
  User = require('../../src/models/userModel').User

module.exports = (companies, oauthClients) => (
  [
    new User({
      username: 'filipe.cavalcanti@ebserh.gov.br',
      password: bcrypt.hashSync('acidrain', bcrypt.genSaltSync(8), null),
      firstName: 'Filipe',
      lastName: 'Aguiar',
      isAdministrator: true,
      insertDate: new Date(),
      updateDate: new Date(),
      isActive: true,
      companies: companies,
      company: _.find(companies, company => company.fantasyName === 'SGPTI')._id,
      oauthClients: [_.find(oauthClients, oauthClient => oauthClient.clientId === 'site')]
    })
    
  ]
)
