import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2, CheckCircle, Circle } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
}

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
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
        title: "خطأ",
        description: "حدث خطأ أثناء جلب المهام",
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
        .insert([{ title: newTodo.trim() }]);

      if (error) throw error;

      setNewTodo("");
      fetchTodos();
      toast({
        title: "تم بنجاح",
        description: "تمت إضافة المهمة بنجاح",
      });
    } catch (error) {
      console.error("Error adding todo:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة المهمة",
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

      fetchTodos();
      toast({
        title: "تم بنجاح",
        description: "تم تحديث حالة المهمة",
      });
    } catch (error) {
      console.error("Error toggling todo:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث المهمة",
      });
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);

      if (error) throw error;

      fetchTodos();
      toast({
        title: "تم بنجاح",
        description: "تم حذف المهمة بنجاح",
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء حذف المهمة",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">قائمة المهام</h1>
          </div>
          
          <form onSubmit={addTodo} className="flex gap-2 mb-6" dir="rtl">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="أضف مهمة جديدة..."
              className="flex-1"
            />
            <Button type="submit" disabled={!newTodo.trim()}>
              إضافة
            </Button>
          </form>

          {loading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : todos.length === 0 ? (
            <p className="text-center text-gray-500 py-4">لا توجد مهام حالياً</p>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between gap-2 p-3 bg-gray-50 rounded-lg"
                  dir="rtl"
                >
                  <div className="flex items-center gap-2 flex-1">
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
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}