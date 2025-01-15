import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2, CheckCircle, Circle } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (session) {
      fetchTodos();
    }
  }, [session]);

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch todos",
      });
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const { error } = await supabase
        .from("todos")
        .insert([{ title: newTodo.trim(), user_id: session.user.id }]);

      if (error) throw error;

      setNewTodo("");
      fetchTodos();
      toast({
        title: "Success",
        description: "Todo added successfully",
      });
    } catch (error) {
      console.error("Error adding todo:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not add todo",
      });
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from("todos")
        .update({ completed: !completed })
        .eq("id", id);

      if (error) throw error;

      setTodos(todos.map((todo) => 
        todo.id === id ? { ...todo, completed: !completed } : todo
      ));
    } catch (error) {
      console.error("Error toggling todo:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not update todo",
      });
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);

      if (error) throw error;

      setTodos(todos.filter((todo) => todo.id !== id));
      toast({
        title: "Success",
        description: "Todo deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not delete todo",
      });
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Todo List</h1>
          
          <form onSubmit={addTodo} className="flex gap-2 mb-6">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1"
            />
            <Button type="submit">Add Todo</Button>
          </form>

          {loading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : todos.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No todos yet. Add one above!</p>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between gap-2 p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => toggleTodo(todo.id, todo.completed)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {todo.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </button>
                    <span
                      className={`flex-1 ${
                        todo.completed ? "line-through text-gray-400" : "text-gray-700"
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;