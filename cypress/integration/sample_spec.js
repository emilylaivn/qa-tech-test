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
    });

    it('should toggle all items', () => {
        // ".toggle-all" should mark all items as completed
        // and unmark all items when clicked a second time
    });

    it('should display correct remaining items', () => {
        // "x items left" should update correctly
    });

    it('should clear completed items', () => {
        // "Clear completed" removes completed items
    });

    it('should delete an item', () => {
        // Delete an item whether it is completed or not
    });
})