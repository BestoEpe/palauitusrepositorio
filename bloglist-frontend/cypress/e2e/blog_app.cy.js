describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'TestTester',
      username: 'test123',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('blogs')
    cy.contains('log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('test123')
      cy.get('#password').type('password')
      cy.contains('login').click()
      cy.contains('TestTester logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('TestTester')
      cy.get('#password').type('wrong')
      cy.contains('login').click()
      cy.contains('wrong credentials')

      cy.get('html').should('not.contain', 'TestTester logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test123', password: 'password' })
    })

    it('a blog can be created', function () {
      cy.createBlog({
        title: 'test123',
        author: 'tester',
        url: 'https://www.test.com/',
      })

      cy.contains('test123')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.login({ username: 'test123', password: 'password' })

        cy.createBlog({
          title: 'test1',
          author: 'tester',
          url: 'https://www.test.com/',
        })
        cy.createBlog({
          title: 'test2',
          author: 'tester',
          url: 'https://www.test.com/',
        })
        cy.createBlog({
          title: 'test3',
          author: 'tester',
          url: 'https://www.test.com/',
        })
      })

      it('one of those can be liked', function () {
        cy.contains('test1').find('button').click()
        cy.contains('like').click()
      })

      it('one of those can be deleted', function () {
        cy.contains('test2').find('button').click()
        cy.contains('test2').parent().find('button').contains('delete').click()
        cy.get('html').should('not.contain', 'test2')
      })

      it('only poster can see delete button', function () {
        const failureUser = {
          name: 'FailureTest',
          username: 'failTest',
          password: 'password',
        }
        cy.request('POST', 'http://localhost:3003/api/users/', failureUser)
        cy.login({ username: 'failTest', password: 'password' })
        cy.contains('test2').find('button').click()
        cy.contains('test2').parent().find('button').should('not.contain', 'delete')
      })

      it('they are ordered by the number of likes in descending order', async function () {
        cy.contains('test3').find('button').click()
        cy.contains('test3').parent().find('button').contains('like').click().wait(200).click().wait(200).click()
        cy.contains('test2').find('button').click()
        cy.contains('test2').parent().find('button').contains('like').click().wait(200).click()
        cy.get('.blog').eq(0).should('contain', 'test3')
        cy.get('.blog').eq(1).should('contain', 'test2')
        cy.get('.blog').eq(2).should('contain', 'test1')
      })
    })
  })
})