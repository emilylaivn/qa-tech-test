//reuse selectors among test cases
 
import {
    TODO_SELECTORS,
    ACTIONBAR_SELECTORS,
  } from '../support/selector';

describe('Todo list test', () => {
    beforeEach(() => {
        const todoItems = [
            {"title": "Item 1", "completed": false}, 
            {"title": "Item 2", "completed": true}, 
            {"title": "Item 3", "completed": false}];

        cy.loadData(todoItems);
        cy.visit(Cypress.env('baseUrl'));
    });

    it('should enter a new todo', () => {
        cy.get(TODO_SELECTORS.NEW_TODO).type('fake@email.com{enter}');
        cy.get(TODO_SELECTORS.TODO).should('contain.text', 'fake@email.com');
    });

    it('should filter items', () => {
        // "Active" should only display active items
        cy.get(ACTIONBAR_SELECTORS.ACTIVE).click();
        cy.get(TODO_SELECTORS.TODO).each((todo) => {
            cy.wrap(todo).should("not.have.class", "completed")
        });

        // "Completed" should only display completed items
        cy.get(ACTIONBAR_SELECTORS.COMPLETED).click();
        cy.get(TODO_SELECTORS.TODO).each((todo) => {
            cy.wrap(todo).should("have.class", "completed")
        });
    });

    it('should mark a todo as completed', () => {
        // Mark "Item 3" as completed

        //ACT
        cy.get(TODO_SELECTORS.TODO).contains('Item 3').siblings(TODO_SELECTORS.TOGGLE).check({force: true});

        //ASSERT
        cy.get(TODO_SELECTORS.TODO).contains('Item 3').parents(TODO_SELECTORS.TODO).should('have.class', 'completed');
        

    });

    it('should toggle all items', () => {
        // ".toggle-all" should mark all items as completed
        // and unmark all items when clicked a second time
        
        //ACT & ASSERT
        //#1 - check all items
        cy.get(TODO_SELECTORS.TOGGLEALL).click();
        cy.get(TODO_SELECTORS.TODO).each((todo) => {
            cy.wrap(todo).should("have.class", "completed")
        });

        
        //#2 - uncheck all items
        cy.get(TODO_SELECTORS.TOGGLEALL).click();
        cy.get(TODO_SELECTORS.TODO).each((todo) => {
            cy.wrap(todo).should("not.have.class", "completed")
        });
    });

    it('should display correct remaining items', () => {
        // "x items left" should update correctly
        
        //ACT & ASSERT
        //#1 - check all items
        cy.get(TODO_SELECTORS.TOGGLEALL).click();
        cy.get(ACTIONBAR_SELECTORS.COUNT).contains("0 items left");
        
        //#2 - uncheck all items
        cy.get(TODO_SELECTORS.TOGGLEALL).click();
        cy.get(ACTIONBAR_SELECTORS.COUNT).contains("3 items left");
    });

    it('should clear completed items', () => {
        // "Clear completed" removes completed items
        
        //ACT
        cy.get(ACTIONBAR_SELECTORS.CLEAR_COMPLETED).click();

        //ASSERT
        cy.get(ACTIONBAR_SELECTORS.COUNT).contains("2 items left");
        cy.get(TODO_SELECTORS.TODO).should("have.lengthOf", 2);
    });

    it('should delete an item', () => {
        // Delete an item whether it is completed or not

        //ACT
        let itemName = 'Item 1';
        cy.deleteItem(itemName);

        //ASSERT
        cy.get(TODO_SELECTORS.TODO).should('not.contain.text', itemName);
    });
})