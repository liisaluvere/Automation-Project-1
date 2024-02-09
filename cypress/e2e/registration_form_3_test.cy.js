beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */
describe('Visual tests for registration form 3', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')        
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('Check that radio button list is correct', () => {  

        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')
        
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')    
 
    }) 

    it('Check that dropdown and dependencies between 2 dropdowns are correct', () => {   
       
        cy.get('#country').children().should('have.length', 4)
        cy.get('#country').find('option').then(options => {
                const actual = [...options].map(option => option.label)
                expect(actual).to.deep.eq(['', 'Spain', 'Estonia', 'Austria'])
            })
            cy.get('#country').select('Spain')
            cy.get('#city.ng-empty').should('be.visible')
            cy.get('#city').select('Malaga')
            cy.get('#city.ng-empty').should('not.exist')
            cy.get('#country').select('Estonia')
            cy.get('#city.ng-empty').should('be.visible')
            cy.get('#city').select('Tallinn')
            cy.get('#city.ng-empty').should('not.exist')
            cy.get('#country').select('Austria')
            cy.get('#city.ng-empty').should('be.visible')
            cy.get('#city').select('Vienna')
            cy.get('#city.ng-empty').should('not.exist')
        })  

        it('Check that checkboxes, their content and links are correct', () => {

            cy.get('input[type="checkbox"]').should('have.length', 2)
            cy.get('input[type="checkbox"]').parent().should('contain', 'Accept our privacy policy')
            cy.get('input[type="checkbox"]').siblings('button').should('have.text', 'Accept our cookie policy')
            cy.get('a[href]').should('have.attr', 'href', 'cookiePolicy.html').click()  
            cy.url().should('contain', '/cookiePolicy.html')  
            
            cy.go('back')
            cy.log('Back again in registration form 3')  
                   
            //Verify default state of radio buttons
            cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
            cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
                    
            // Selecting one will remove selection from the other radio button
            cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
            cy.get('input[type="checkbox"]').eq(1).check().should('be.checked').eq(0).should('be.checked')  
    })        
     
})         



/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */

describe('Functional tests for registration form 3', () => {    
    
    it('User can submit form with all fields added', ()=>{        
        inputAllData('nameTest')
        cy.get('input[type="submit"]').should('be.enabled') 
        cy.get('input[type="submit"]').click()
        //cy.get('#successFrame').should('contain', 'Successful registration')  
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{        
        inputMandatoryData('myName')       
        cy.get('input[type="submit"]').should('be.enabled') 
        cy.get('input[type="submit"]').click()
        //cy.get('#successFrame').should('be.visible').should('contain', 'Successful registration')    
    })

    it('User cant submit form without filling the email field', ()=>{  
        inputMandatoryData('myName') 
        cy.get('input[name="email"]').scrollIntoView()
        cy.get('input[name="email"]').clear()
        cy.get('input[type="submit"]').should('not.be.enabled') 
        cy.get('input[name="email"]').type('test@test.ee')
        cy.get('input[type="submit"]').should('be.enabled') 
        cy.get('input[type="submit"]').click()
        //cy.get('#successFrame').should('contain', 'Successful registration')       
    })
})
function inputAllData(name) {
    cy.log('Name will be filled')
    cy.get('#name').type(name)    
    cy.get('input[name="email"]').type('test@test.ee')
    cy.get('#country').select('Estonia')
    cy.get('#city').select('Tallinn')
    cy.get('input[type="date"]').first().type('2000-11-22')
    cy.get('input[type="radio"]').check('Daily')   
    cy.get('#birthday').first().type('1980-11-22')
    cy.get('input[type="checkbox"]').eq(0).check()
    cy.get('input[type="checkbox"]').eq(1).check()   
}
function inputMandatoryData(name) {
       
    cy.get('input[name="email"]').type('test@test.ee')
    cy.get('#country').select('Estonia')
    cy.get('#city').select('Tallinn')  
    cy.get('#birthday').first().type('1980-11-22')
    cy.get('input[type="checkbox"]').eq(0).check()       
}
