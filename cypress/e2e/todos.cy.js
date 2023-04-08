/// <reference types="cypress" />

describe("To-Dos Form and Followers", () => {

    it("To-Dos Form and To-do Table test", () => {
        cy.visit('/todos')
        cy.get('#task').should('be.visible')
        cy.get('#timeinterval').should('be.visible')

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
    })
    
    it("Followers button and list test - mock - for JSON-SEREVER", () => {
        cy.visit('/todos')
        cy.get('#followers-btn').should('have.class', '')

        cy.intercept("GET", "http://localhost:8000/followerss", { fixture: "followers.json" })
        cy.get('#followers-btn').click()

        cy.get('#followers-btn').should('have.class', 'activee')

        cy.get('[data-testid="follower-item-0"] > span').should("be.visible")
        cy.get('[data-testid="follower-item-0"] > img').should("be.visible")
        cy.get('[data-testid="follower-item-0"] > span').should('have.text', 'Shai')
        cy.get('[data-testid="follower-item-0"] > img').should('have.attr', 'src').should('include','1.jpg')

        cy.get('*[data-testid^="follower-item-"]').should('have.length', 3)  

        cy.get('#followers-btn').click()
        cy.get('*[data-testid^="follower-item-"]').should('have.length', 0)  

    })

    it("Followers button and list test - without mock - for EXPRESS app backend", () => {
        cy.visit('/todos')
        cy.get('#followers-btn').click()

        cy.get('[data-testid="follower-item-0"] > span', {timeout: 15000}).should("be.visible")
        cy.get('[data-testid="follower-item-0"] > img').should("be.visible")
        cy.get('[data-testid="follower-item-0"] > span').should('have.text', 'Shai')
        cy.get('[data-testid="follower-item-0"] > img').should('have.attr', 'src').should('include','1.jpg')

        cy.get('*[data-testid^="follower-item-"]').should('have.length', 3)  

        cy.get('#followers-btn').click()
        cy.get('*[data-testid^="follower-item-"]').should('have.length', 0)  
    })
})    