import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Plus, X, Trophy, Sparkles, Star } from 'lucide-react';

export default function TaskRewardsApp() {
  const [tasks, setTasks] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [points, setPoints] = useState(0);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPoints, setNewTaskPoints] = useState(10);
  const [newRewardText, setNewRewardText] = useState('');
  const [newRewardCost, setNewRewardCost] = useState(50);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showRewardForm, setShowRewardForm] = useState(false);

  // Load data from storage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await window.storage.get('task-rewards-data');
        if (storedData) {
          const data = JSON.parse(storedData.value);
          setTasks(data.tasks || []);
          setRewards(data.rewards || []);
          setPoints(data.points || 0);
        }
      } catch (error) {
        console.log('No previous data found, starting fresh');
      }
    };
    loadData();
  }, []);

  // Save data to storage whenever it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await window.storage.set('task-rewards-data', JSON.stringify({
          tasks,
          rewards,
          points
        }));
      } catch (error) {
        console.error('Failed to save data:', error);
      }
    };
    saveData();
  }, [tasks, rewards, points]);

  const addTask = () => {
    if (newTaskText.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTaskText,
        points: newTaskPoints,
        completed: false,
        completedAt: null
      }]);
      setNewTaskText('');
      setNewTaskPoints(10);
      setShowTaskForm(false);
    }
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newCompleted = !task.completed;
        if (newCompleted) {
          setPoints(points + task.points);
        } else {
          setPoints(points - task.points);
        }
        return {
          ...task,
          completed: newCompleted,
          completedAt: newCompleted ? new Date().toISOString() : null
        };
      }
      return task;
    }));
  };

  const deleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task.completed) {
      setPoints(points - task.points);
    }
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const addReward = () => {
    if (newRewardText.trim()) {
      setRewards([...rewards, {
        id: Date.now(),
        text: newRewardText,
        cost: newRewardCost
      }]);
      setNewRewardText('');
      setNewRewardCost(50);
      setShowRewardForm(false);
    }
  };

  const purchaseReward = (rewardId) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (points >= reward.cost) {
      setPoints(points - reward.cost);
      // Show a brief success message
      alert(`Reward claimed: ${reward.text}! Enjoy! 🎉`);
    }
  };

  const deleteReward = (rewardId) => {
    setRewards(rewards.filter(r => r.id !== rewardId));
  };

  const incompleteTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Task Quest</h1>
          </div>
          <p className="text-gray-600">Complete tasks, earn points, claim rewards</p>
        </div>

        {/* Points Display */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-center gap-3">
            <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
            <div className="text-center">
              <div className="text-5xl font-bold text-white">{points}</div>
              <div className="text-indigo-100 text-sm">Available Points</div>
            </div>
            <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Tasks Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                Tasks
              </h2>
              <button
                onClick={() => setShowTaskForm(!showTaskForm)}
                className="p-2 bg-indigo-100 hover:bg-indigo-200 rounded-lg transition"
              >
                <Plus className="w-5 h-5 text-indigo-600" />
              </button>
            </div>

            {showTaskForm && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  placeholder="Task description"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Points"
                    value={newTaskPoints}
                    onChange={(e) => setNewTaskPoints(parseInt(e.target.value) || 0)}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    onClick={addTask}
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {incompleteTasks.length === 0 && completedTasks.length === 0 && (
                <p className="text-gray-400 text-center py-8">No tasks yet. Add one to get started!</p>
              )}
              
              {incompleteTasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="text-gray-400 hover:text-indigo-600 transition"
                  >
                    <Circle className="w-6 h-6" />
                  </button>
                  <div className="flex-1">
                    <div className="text-gray-800">{task.text}</div>
                    <div className="text-sm text-indigo-600 font-medium">+{task.points} pts</div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}

              {completedTasks.length > 0 && (
                <>
                  <div className="text-sm text-gray-500 font-medium mt-4 mb-2">Completed</div>
                  {completedTasks.map(task => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                    >
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="text-green-600 hover:text-green-700 transition"
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </button>
                      <div className="flex-1">
                        <div className="text-gray-500 line-through">{task.text}</div>
                        <div className="text-sm text-green-600 font-medium">+{task.points} pts</div>
                      </div>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Rewards Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-purple-600" />
                Rewards
              </h2>
              <button
                onClick={() => setShowRewardForm(!showRewardForm)}
                className="p-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition"
              >
                <Plus className="w-5 h-5 text-purple-600" />
              </button>
            </div>

            {showRewardForm && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  placeholder="Reward description"
                  value={newRewardText}
                  onChange={(e) => setNewRewardText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addReward()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Cost"
                    value={newRewardCost}
                    onChange={(e) => setNewRewardCost(parseInt(e.target.value) || 0)}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={addReward}
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    Add Reward
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {rewards.length === 0 && (
                <p className="text-gray-400 text-center py-8">No rewards yet. Add some motivation!</p>
              )}
              
              {rewards.map(reward => {
                const canAfford = points >= reward.cost;
                return (
                  <div
                    key={reward.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition ${
                      canAfford ? 'bg-purple-50 hover:bg-purple-100' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex-1">
                      <div className={canAfford ? 'text-gray-800' : 'text-gray-400'}>
                        {reward.text}
                      </div>
                      <div className={`text-sm font-medium ${canAfford ? 'text-purple-600' : 'text-gray-400'}`}>
                        {reward.cost} pts
                      </div>
                    </div>
                    <button
                      onClick={() => purchaseReward(reward.id)}
                      disabled={!canAfford}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        canAfford
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Claim
                    </button>
                    <button
                      onClick={() => deleteReward(reward.id)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          Your progress is automatically saved
        </div>
      </div>
    </div>
  );
}
