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