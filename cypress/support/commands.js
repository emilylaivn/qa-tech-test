import {
    TODO_SELECTORS,
    ACTIONBAR_SELECTORS,
  } from './selector';

Cypress.Commands.add("loadData", (todos) => {
    let data = [];
    todos.forEach(todo => {
        data.push({
            "id": data.length + 1,
            "title": todo.title,
            "completed": todo.completed
        })
    });

    window.localStorage.setItem("todos-vuejs", JSON.stringify(data));
})

Cypress.Commands.add("deleteItem", (name) => {
    cy.get(TODO_SELECTORS.TODO).contains(name).siblings(TODO_SELECTORS.DESTROY).click({force: true});
})