

export default function AddTodoForm({todo, onAddFormSubmit, onAddInputChange }){
    return (
        <form onSubmit={onAddFormSubmit}>
            <h2>Add Todo</h2>
            <label htmlFor="todo">Create Todo:  </label>
            <input
                type="text"
                name='todo'
                placeholder={"write and click enter"}
                value={todo}
                onChange={onAddInputChange}
            />
        </form>
    )
}