beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{        
        inputValidData('myUsername')       
        cy.get('#confirm').scrollIntoView()
        cy.get('#confirm').clear()
        cy.get('#confirm').type('MyPass123')
        cy.get('h2').contains('Password').click()       
        cy.get('.submit_button').should('be.disabled')    
        cy.get('#success_message').should('not.be.visible')        
        cy.get('#password_error_message').should('be.visible')        
        cy.get('#confirm').scrollIntoView()
        cy.get('#confirm').clear()
        cy.get('#confirm').type('MyPass')
        cy.get('h2').contains('Password').click()        
        cy.get('#password_error_message').should('not.be.visible')        
        cy.get('.submit_button').should('be.enabled')
    })
    
    it('User can submit form with all fields added', ()=>{        
        inputValidData('myUsername')        
        cy.get('#htmlFavLanguage').check()        
        cy.get('#vehicle2').check()
        cy.get('#cars').select(2)
        cy.get('#animal').select(1)      
        cy.get('.submit_button').should('be.enabled')        
        cy.get('.submit_button').click()       
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{        
        inputValidData('myUsername')        
        cy.get('.submit_button').should('be.enabled')             
        cy.get('.submit_button').click()       
        cy.get('#success_message').should('be.visible')       
    })

    it('User cant submit form without filling the username field', ()=>{        
        inputValidData('myUsername')
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()        
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')        
        cy.get('#username').type('newUsername')
        cy.get('h2').contains('Password').click()        
        cy.get('.submit_button').should('be.enabled') 
        cy.get('.submit_button').click()       
        cy.get('#success_message').should('be.visible')       
    })
})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')       
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {
        cy.log('Will check second picture source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')        
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 116)
            .and('be.greaterThan', 80) 
    });

    it('Check navigation part 1', () => {
        cy.get('nav').children().should('have.length', 2)        
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')    
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')     
        cy.go('back')
        cy.log('Back again in registration form 2')
    })
    
    it('Check navigation part 2- the second link', () => {
        cy.get('nav').children().should('have.length', 2)        
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')      
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()       
        cy.url().should('contain', '/registration_form_3.html')      
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {       
        cy.get('input[type="radio"]').should('have.length', 4)       
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')       
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')       
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkbox button list is correct', () => {        
        cy.get('.checkbox.vehicles').should('have.length', 3)        
        cy.get('.checkbox.vehicles').next().eq(0).should('have.text','I have a bike')
        cy.get('.checkbox.vehicles').next().eq(1).should('have.text','I have a car')
        cy.get('.checkbox.vehicles').next().eq(2).should('have.text','I have a boat')   
        cy.get('.checkbox.vehicles').eq(0).should('not.be.checked')
        cy.get('.checkbox.vehicles').eq(1).should('not.be.checked')
        cy.get('.checkbox.vehicles').eq(2).should('not.be.checked')
        cy.get('.checkbox.vehicles').eq(0).check().should('be.checked')
        cy.get('.checkbox.vehicles').eq(1).check().should('be.checked').eq(0).should('be.checked')        
    })

    it('Car dropdown is correct', () => {        
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')        
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)      
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')      
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Favorite animals dropdown is correct', () => {      
        cy.get('#animal').children().should('have.length',6)              
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')   
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat') 
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake') 
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo') 
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow') 
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')    
    })
})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}