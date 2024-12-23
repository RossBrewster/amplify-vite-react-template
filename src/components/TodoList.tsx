import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

interface TodoListProps {
  username: string;
}

export function TodoList({ username }: TodoListProps) {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
    return () => subscription.unsubscribe();
  }, []);

  function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      client.models.Todo.create({ content });
    }
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            {username}'s todos
          </h1>
        </div>
          <button 
            onClick={createTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            + New Todo
          </button>

        <ul className="space-y-2">
          {todos.length === 0 ? (
            <li className="text-gray-400 text-center py-4">No todos yet</li>
          ) : (
            todos.map((todo) => (
              <li 
                key={todo.id}
                onClick={() => deleteTodo(todo.id)}
                className="p-3 bg-gray-700 rounded-lg text-gray-100 cursor-pointer hover:bg-gray-600 transition-colors flex items-center group"
              >
                <span className="flex-1">{todo.content}</span>
                <span className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                  Click to delete
                </span>
              </li>
            ))
          )}
        </ul>

        <div className="mt-8 p-4 bg-gray-700 rounded-lg text-gray-300 text-sm">
          <p className="flex items-center gap-2 mb-2">
            <span className="text-xl">🥳</span>
            App successfully hosted. Try creating a new todo.
          </p>
          <a 
            href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Review next step of this tutorial →
          </a>
        </div>
      </div>
    </div>
  );
}