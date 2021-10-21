const fs = require('fs')
const pug = require('pug')

const age = require('./age')

const users = []

fs.readdirSync('users').forEach((filename) => {
  const id = filename.replace('.json', '')
  const userData = JSON.parse(fs.readFileSync('users/' + filename, 'utf-8'))

  users.push({ ...{ id: id }, ...userData })
})

function buildUserList () {
  const data = {
    base: {
      title: 'Моя Соцсеть',
      pageClass: 'list'
    },
    users: users
  }

  const html = pug.renderFile('layout/index.pug', data)
  fs.writeFileSync('dist/index.html', html)
}

function buildUsers () {
  const compileFunc = pug.compileFile('layout/user.pug')

  users.forEach((userData) => {
    const data = {
      base: {
        title: userData.name,
        pageClass: 'user'
      },
      calcAge: age,
      user: userData
    }

    const html = compileFunc(data)
    fs.writeFileSync('dist/' + userData.id + '.html', html)
  })
}

buildUserList()
buildUsers()
