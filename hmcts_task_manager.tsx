import React, { useState } from 'react';
import { Trash2, Plus, Search } from 'lucide-react';

const STATUSES = ['To Do', 'In Progress', 'Completed', 'Cancelled'];

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [dueDate, setDueDate] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [nextId, setNextId] = useState(1);
  const [titleError, setTitleError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const showMessage = (msg, type = 'info') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const createTask = () => {
    if (!title.trim() || !dueDate) {
      setTitleError(!title.trim());
      setDateError(!dueDate);
      showMessage('Please fill in all required fields', 'error');
      return;
    }
    
    const newTask = { 
      id: nextId, 
      title, 
      description, 
      status, 
      dueDate,
      createdAt: new Date().toISOString() 
    };
    
    setTasks([...tasks, newTask]);
    setNextId(nextId + 1);
    setTitle('');
    setDescription('');
    setStatus('To Do');
    setDueDate('');
    setTitleError(false);
    setDateError(false);
    showMessage('Task created successfully', 'success');
  };

  const deleteTask = (id) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (deleteConfirm !== null) {
      const filtered = tasks.filter(t => t.id !== deleteConfirm);
      setTasks(filtered);
      showMessage(`Task #${deleteConfirm} deleted`, 'success');
      setDeleteConfirm(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const updateStatus = (id, newStatus) => {
    const updated = tasks.map(t => t.id === id ? {...t, status: newStatus} : t);
    setTasks(updated);
    showMessage('Status updated', 'success');
  };

  const searchTask = () => {
    const found = tasks.find(t => t.id === parseInt(searchId));
    if (found) {
      setSearchResult(found);
      showMessage('Task found', 'success');
    } else {
      setSearchResult(null);
      showMessage('Task not found', 'error');
    }
  };

  const counts = {
    'To Do': tasks.filter(t => t.status === 'To Do').length,
    'In Progress': tasks.filter(t => t.status === 'In Progress').length,
    'Completed': tasks.filter(t => t.status === 'Completed').length,
    'Cancelled': tasks.filter(t => t.status === 'Cancelled').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Delete Confirmation Modal */}
        {deleteConfirm !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete task #{deleteConfirm}? This action cannot be undone.</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Delete Task
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">HMCTS Task Manager</h1>
          <p className="text-gray-600 mt-1">Total Tasks: {tasks.length}</p>
          {message && (
            <div className={`mt-3 p-3 rounded font-medium ${
              messageType === 'error' ? 'bg-red-100 text-red-700 border-2 border-red-300' :
              messageType === 'success' ? 'bg-green-100 text-green-700 border-2 border-green-300' :
              'bg-blue-50 text-blue-700'
            }`}>
              {message}
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <div className="text-yellow-700 font-semibold text-sm">TO DO</div>
            <div className="text-3xl font-bold text-yellow-900">{counts['To Do']}</div>
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="text-blue-700 font-semibold text-sm">IN PROGRESS</div>
            <div className="text-3xl font-bold text-blue-900">{counts['In Progress']}</div>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="text-green-700 font-semibold text-sm">COMPLETED</div>
            <div className="text-3xl font-bold text-green-900">{counts['Completed']}</div>
          </div>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
            <div className="text-gray-700 font-semibold text-sm">CANCELLED</div>
            <div className="text-3xl font-bold text-gray-900">{counts['Cancelled']}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Plus size={20} /> Create Task
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setTitleError(false);
                  }}
                  className={`w-full px-3 py-2 border-2 rounded-lg ${
                    titleError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Task title"
                />
                {titleError && <p className="text-red-600 text-xs mt-1">Title is required</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg"
                  placeholder="Optional description"
                  rows="2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Status <span className="text-red-600">*</span>
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg"
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Due Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => {
                    setDueDate(e.target.value);
                    setDateError(false);
                  }}
                  className={`w-full px-3 py-2 border-2 rounded-lg ${
                    dateError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {dateError && <p className="text-red-600 text-xs mt-1">Due date is required</p>}
              </div>
              <button
                onClick={createTask}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Create Task
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Search size={20} /> Retrieve by ID
            </h2>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="number"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg"
                  placeholder="Enter task ID"
                />
                <button
                  onClick={searchTask}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Search
                </button>
              </div>

              {searchResult && (
                <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs bg-blue-200 px-2 py-1 rounded">ID: {searchResult.id}</span>
                      <h3 className="font-bold text-lg mt-1">{searchResult.title}</h3>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      searchResult.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      searchResult.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      searchResult.status === 'Cancelled' ? 'bg-gray-100 text-gray-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {searchResult.status}
                    </span>
                  </div>
                  {searchResult.description && <p className="text-sm text-gray-700 mb-2">{searchResult.description}</p>}
                  <p className="text-xs text-gray-600">Due: {new Date(searchResult.dueDate).toLocaleString()}</p>
                </div>
              )}

              {tasks.length > 0 && (
                <div className="p-3 bg-gray-50 border rounded-lg">
                  <p className="text-xs font-medium text-gray-700 mb-2">Available IDs:</p>
                  <div className="flex flex-wrap gap-2">
                    {tasks.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setSearchId(t.id.toString())}
                        className="px-2 py-1 bg-white border rounded text-sm hover:bg-gray-100"
                      >
                        #{t.id}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">All Tasks ({tasks.length})</h2>

          {tasks.length === 0 ? (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
              <p>No tasks yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id} className="p-4 border-2 rounded-lg hover:shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded font-mono font-bold">ID: {task.id}</span>
                        <h3 className="font-bold text-lg">{task.title}</h3>
                      </div>
                      {task.description && <p className="text-sm text-gray-600 mb-2">{task.description}</p>}
                      <p className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <select
                        value={task.status}
                        onChange={(e) => updateStatus(task.id, e.target.value)}
                        className={`px-3 py-1 border rounded-lg text-sm font-medium ${
                          task.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-300' :
                          task.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-300' :
                          task.status === 'Cancelled' ? 'bg-gray-50 text-gray-700 border-gray-300' :
                          'bg-yellow-50 text-yellow-700 border-yellow-300'
                        }`}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}