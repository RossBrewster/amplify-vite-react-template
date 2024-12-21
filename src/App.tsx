import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [fourOMiniResponse, setFourOMiniResponse] = useState("");
  const [promptValue, setPromptValue] = useState("");
  const { user, signOut } = useAuthenticator();

  // Fetch (observe) Todo records
  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
    return () => subscription.unsubscribe();
  }, []);

  // Create a new Todo
  function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      client.models.Todo.create({ content });
    }
  }

  // Delete a Todo by id
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  // Call the 4o-mini custom query
  async function testFourOMini() {
    // If the user hasn't typed anything, show an error or do nothing
    if (!promptValue.trim()) {
      setFourOMiniResponse("Please enter a prompt before submitting.");
      return;
    }

    try {
      const response = await client.queries.fourOMini({ prompt: promptValue });
      // GraphQL responses typically have a 'data' field with the actual value
      setFourOMiniResponse(response.data ?? "");
    } catch (err) {
      console.error("Error calling fourOMini:", err);
      setFourOMiniResponse("Error occurred. Check console for details.");
    }
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
            {todo.content}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>

      {/* Section to test the 4o-mini function */}
      <section style={{ marginTop: "2rem" }}>
        <h2>Test 4o-mini</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder="Enter your prompt..."
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            style={{ flex: 1 }}
          />
          <button onClick={testFourOMini}>Send Prompt</button>
        </div>
        {fourOMiniResponse && (
          <div style={{ marginTop: "1rem" }}>
            <h3>Response:</h3>
            <pre>{fourOMiniResponse}</pre>
          </div>
        )}
      </section>

      <button onClick={signOut} style={{ marginTop: "2rem" }}>
        Sign out
      </button>
    </main>
  );
}

export default App;
