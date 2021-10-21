const fs = require('fs')
const pug = require('pug')

const age = require('./age')

const users = [] // данные юзеров

// 1 шаг - формируем данные юзеров
fs.readdirSync('users').forEach((filename) => {
  const id = filename.replace('.json', '')
  const userData = JSON.parse(fs.readFileSync('users/' + filename, 'utf-8'))

  users.push({ ...{ id: id }, ...userData })
})

// ф-ия строит страницу списка юзеров
function buildUsersList () {
  const data = {
    base: {
      title: 'Моя Соцсеть',
      pageClass: 'list'
    },
    users: users
  }

  const html = pug.renderFile('layout/usersList.pug', data)
  fs.writeFileSync('dist/usersList.html', html)
}

// ф-ия строит страницу карточки юзера
function buildUserCard () {
  const compileFunc = pug.compileFile('layout/userCard.pug')

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

buildUsersList() // 2 шаг - генерируем страницу списка юзеров
buildUserCard() // 3 шаг - генерируем страницы карточек юзеров
