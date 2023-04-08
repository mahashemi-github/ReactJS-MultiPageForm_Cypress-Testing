/// <reference types="cypress" />

describe("Subscription Form", () => {

    it.only("Testing the whole application in one go", () => {
        cy.visit('/')
        cy.contains('Subscription Form').should('be.visible')

        cy.get('#username').should('have.value', '')
        cy.get('#email').should('have.value', '')
        cy.get('#password').should('have.value', '')
        cy.get('#confirm-password').should('have.value', '')
        cy.get('#skills').should('have.value', 'Select...')
        cy.get('#skills').children().first().then(option1 => {expect(option1).to.be.selected})
        cy.get('#skills').children().first().should('have.text', 'Select...')
        cy.get('#checkbox').should('not.be.checked')

        cy.get('form > :nth-child(5)').should('not.be.visible')
        cy.get('form > :nth-child(9)').should('not.be.visible')
        cy.get('form > :nth-child(13)').should('not.be.visible')
        cy.get('form > :nth-child(16)').should('not.be.visible')
        cy.get('form > :nth-child(20)').should('not.be.visible')

        cy.contains('Valid Username').should('not.be.visible')
        cy.contains('Valid Email').should('not.be.visible')
        cy.contains('Valid Password').should('not.be.visible')
        cy.contains('Password confirmed').should('not.be.visible')
        cy.contains('A skill is selected').should('not.be.visible')

        cy.get('#info1').should('have.class', 'hideIns')
        cy.get('#done1').should('have.class', 'hide')
        cy.get('#info2').should('have.class', 'hideIns')
        cy.get('#done2').should('have.class', 'hide')
        cy.get('#info3').should('have.class', 'hideIns')
        cy.get('#done3').should('have.class', 'hide')
        cy.get('#done4').should('have.class', 'hide')
        cy.get('#info4').should('have.class', 'hideIns')
        cy.get('#done5').should('have.class', 'hide')

        cy.get('[for="username"]')
        cy.get('#username').type('Mari').clear().type('Maria')
        cy.get('[for="email"]')
        cy.get('#email').clear().type('mari@email.com')
        cy.get('[for="password"]')
        cy.get('#password').clear().type('Q!1qqqqq')
        cy.get('[for="confirm-password"]')
        cy.get('#confirm-password').clear().type('Q!1qqqqq')
        cy.get('[for="skills"]')
        cy.get('#skills').select('Select...')
        cy.get('#skills').select('React')

        cy.get('#checkbox').check().uncheck()
        cy.get('.checkbox-lable')

        cy.get('form > :nth-child(5)').should('be.visible')
        cy.get('form > :nth-child(9)').should('be.visible')
        cy.get('form > :nth-child(13)').should('be.visible')
        cy.get('form > :nth-child(16)').should('be.visible')
        cy.get('form > :nth-child(20)').should('be.visible')

        cy.contains('Valid Username').should('be.visible')
        cy.contains('Valid Email').should('be.visible')
        cy.contains('Valid Password').should('be.visible')
        cy.contains('Password confirmed').should('be.visible')
        cy.contains('A skill is selected').should('be.visible')

        cy.get('#info1').should('have.class', 'hideIns')
        cy.get('#done1').should('have.class', 'show')
        cy.get('#info2').should('have.class', 'hideIns')
        cy.get('#done2').should('have.class', 'show')
        cy.get('#info3').should('have.class', 'hideIns')
        cy.get('#done3').should('have.class', 'show')
        cy.get('#done4').should('have.class', 'show')
        cy.get('#info4').should('have.class', 'hideIns')
        cy.get('#done5').should('have.class', 'show')

        cy.get('.subscribe-btn').click()

        cy.get('#task').should('be.visible')
        cy.get('#timeinterval').should('be.visible')

        cy.get('.logout').should('be.visible')
        cy.get('.logout').should('have.text', 'Log out')

        //-------------------------------------------------------------

        cy.get('#task').should('have.text', '')
        cy.get('#timeinterval').should('have.text', '')

        cy.get("tr").should('have.length', '1')
        cy.get('*[data-testid^="todo-item-"]').should('not.exist')

        cy.get('form > button').click()
        cy.get('#task').then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
        cy.get('#task').type('Hit the Gym')

        cy.get('form > button').click()
        cy.get('#timeinterval').then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
        cy.get('#timeinterval').type('8-10')
        
        cy.get('form > button').click()

        cy.get('[data-testid="todo-item-0"] > :nth-child(1)').should('have.text', 'Hit the Gym')
        cy.get('[data-testid="todo-item-0"] > :nth-child(2)').should('have.text', '8-10')
        cy.get('.delete')

        cy.get('#task').should('have.text', '')
        cy.get('#timeinterval').should('have.text', '')

        cy.get('*[data-testid^="todo-item-"]').should('exist')
        cy.get('.number-of-tasks').should('have.text', '1 task left')

        cy.get('#task').type('Web development')
        cy.get('#timeinterval').type('10-12')
        cy.get('form > button').click()

        cy.get('*[data-testid^="todo-item-"]').should('have.length', '2')
        cy.get('.number-of-tasks').should('exist')
        cy.get('.number-of-tasks').should('be.visible')
        cy.get('.number-of-tasks').should('have.text', '2 tasks left')

        cy.get('[data-testid="todo-item-0"] > :nth-child(3)').click()
        cy.get('[data-testid="todo-item-0"] > :nth-child(1)').should('not.have.text', 'Hit the Gym')

        cy.get('[data-testid="todo-item-0"] > :nth-child(1)').click()
        cy.get('.number-of-tasks').should('have.text', '0 task left')

        cy.get('[data-testid="todo-item-0"] > :nth-child(1)').click()
        cy.get('.number-of-tasks').should('have.text', '1 task left')

        cy.get('[data-testid="todo-item-0"] > :nth-child(2)').click()
        cy.get('.number-of-tasks').should('have.text', '0 task left')

        cy.get('[data-testid="todo-item-0"] > :nth-child(2)').click()
        cy.get('.number-of-tasks').should('have.text', '1 task left')  

        //-------------------------------------------------------------
        cy.get('#followers-btn').click()

        cy.get('[data-testid="follower-item-0"] > span', {timeout: 15000}).should("be.visible")
        cy.get('[data-testid="follower-item-0"] > img').should("be.visible")
        cy.get('[data-testid="follower-item-0"] > span').should('have.text', 'Shai')
        cy.get('[data-testid="follower-item-0"] > img').should('have.attr', 'src').should('include','1.jpg')

        cy.get('*[data-testid^="follower-item-"]').should('have.length', 3)  

        cy.get('#followers-btn').click()
        cy.get('*[data-testid^="follower-item-"]').should('have.length', 0)

        //--------------------------------------------------------------
        cy.get('.logout').should('be.visible')
        cy.get('.logout').should('have.text', 'Log out')
        cy.get('.logout').click()
        cy.contains('Subscription Form').should('be.visible')
    }) 
})

