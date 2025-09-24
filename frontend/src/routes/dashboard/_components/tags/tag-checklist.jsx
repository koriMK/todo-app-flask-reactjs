import { useState } from "react";
import { CheckCircle, Clock, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const TagChecklist = ({ tag }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, {
        id: Date.now(),
        text: newItem.trim(),
        completed: false,
        completedAt: null
      }]);
      setNewItem("");
      setIsAddingItem(false);
    }
  };

  const toggleItem = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            completed: !item.completed,
            completedAt: !item.completed ? new Date().toLocaleString() : null
          }
        : item
    ));
  };

  const removeItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const completedCount = items.filter(item => item.completed).length;

  return (
    <div className="border rounded-lg p-4 bg-background">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{tag.name}</h3>
        <div className="text-sm text-muted-foreground">
          {completedCount}/{items.length} completed
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2 mb-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-3 border rounded-md transition-colors ${
              item.completed ? 'bg-green-50 border-green-200' : 'bg-muted/30'
            }`}
          >
            <div className="flex items-center space-x-3 flex-1">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItem(item.id)}
                className="h-4 w-4"
              />
              <span className={`${
                item.completed ? 'line-through text-muted-foreground' : ''
              }`}>
                {item.text}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              {item.completed ? (
                <div className="flex items-center text-xs text-green-600">
                  <CheckCircle className="size-3 mr-1" />
                  <span>{item.completedAt}</span>
                </div>
              ) : (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="size-3 mr-1" />
                  <span>Pending</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.id)}
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
              >
                <X className="size-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Item */}
      {isAddingItem ? (
        <div className="flex space-x-2">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Add new ${tag.name.toLowerCase()} item...`}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            className="flex-1"
          />
          <Button onClick={addItem} size="sm">Add</Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setIsAddingItem(false);
              setNewItem("");
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => setIsAddingItem(true)}
          className="w-full"
        >
          <Plus className="size-4 mr-2" />
          Add {tag.name} Item
        </Button>
      )}
    </div>
  );
};