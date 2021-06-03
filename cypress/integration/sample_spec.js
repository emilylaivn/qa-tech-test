describe('Todo list test', () => {
    beforeEach(() => {
        const todoItems = [
            {"title": "Item 1", "completed": false}, 
            {"title": "Item 2", "completed": true}, 
            {"title": "Item 3", "completed": false}];

        cy.loadData(todoItems);
        cy.visit('http://127.0.0.1:8080/');
    });

    it('should enter a new todo', () => {
        cy.get('.new-todo').type('fake@email.com{enter}');
        cy.get('.todo').should('contain.text', 'fake@email.com');
    });

    it('should filter items', () => {
        // "Active" should only display active items
        cy.contains("Active").click();
        cy.get("li.todo").each((todo) => {
            cy.wrap(todo).should("not.have.class", "completed")
        });

        // "Completed" should only display completed items
        cy.contains("Completed").click();
        cy.get("li.todo").each((todo) => {
            cy.wrap(todo).should("have.class", "completed")
        });
    });

    it('should mark a todo as completed', () => {
        // Mark "Item 3" as completed

        //ACT
        cy.get('.todo').contains('Item 3').siblings('input').check({force: true});

        //ASSERT
        cy.get('.todo').contains('Item 3').parents('.todo').should('have.class', 'completed');
        

    });

    it('should toggle all items', () => {
        // ".toggle-all" should mark all items as completed
        // and unmark all items when clicked a second time
        
        //ACT & ASSERT
        //#1 - check all items
        cy.get('#toggle-all').click();
        cy.get("li.todo").each((todo) => {
            cy.wrap(todo).should("have.class", "completed")
        });

        
        //#2 - uncheck all items
        cy.get('#toggle-all').click();
        cy.get("li.todo").each((todo) => {
            cy.wrap(todo).should("not.have.class", "completed")
        });
    });

    it('should display correct remaining items', () => {
        // "x items left" should update correctly
        
        //ACT & ASSERT
        //#1 - check all items
        cy.get('#toggle-all').click();
        cy.get('.todo-count').contains("0 items left");
        
        //#2 - uncheck all items
        cy.get('#toggle-all').click();
        cy.get('.todo-count').contains("3 items left");
    });

    it('should clear completed items', () => {
        // "Clear completed" removes completed items
        
        //ACT
        cy.get('.clear-completed').click();

        //ASSERT
        cy.get('.todo-count').contains("2 items left");
        cy.get('li.todo').should("have.lengthOf", 2);
    });

    it('should delete an item', () => {
        // Delete an item whether it is completed or not

        //ACT
        cy.get('.todo').contains('Item 1').siblings('.destroy').click({force: true});

        //ASSERT
        cy.get('.todo').should('not.contain.text', 'Item 1');
    });
})